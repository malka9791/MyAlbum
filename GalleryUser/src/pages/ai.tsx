import { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Chip,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AutoAwesome,
  PhotoCamera,
  ContentCopy,
  Close,
  CloudUpload,
} from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../hook/user_context";
import UploadImage from "./uploadImg";
import { Image } from "../models/image";

const GRADIENT_PRIMARY =
  "linear-gradient(135deg, #e52d27 0%,rgb(246, 176, 179) 100%)"; // אדום כהה
const GRADIENT_SECONDARY =
  "linear-gradient(135deg,rgb(255, 0, 132) 0%, #f5576c 100%)"; // אדום ורדרד
const GRADIENT_ACCENT = "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)"; // כתום-אדמדם

const TEXT_PRIMARY = "#8b0000"; // אדום כהה (DarkRed)
const TEXT_SECONDARY = "#b22222"; // FireBrick

const SUCCESS_COLOR = "#d63031"; // אדום חי (כמו הצלחה דרמטית)

// Enhanced Styled Card with glassmorphism effect
const StyledCard = styled(Card)(({}) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: 20,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.15)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: GRADIENT_PRIMARY,
    borderRadius: "20px 20px 0 0",
  },
}));

// Enhanced Media with overlay effects

// Gradient Button with modern styling
const GradientButton = styled(Button)(({}) => ({
  background: GRADIENT_PRIMARY,
  color: "white",
  fontWeight: 600,
  borderRadius: 12,
  textTransform: "none",
  padding: "12px 24px",
  boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: GRADIENT_SECONDARY,
    transform: "translateY(-2px)",
    boxShadow: "0 12px 24px rgba(102, 126, 234, 0.4)",
  },
  "&:disabled": {
    background: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)",
    color: "white",
    transform: "none",
    boxShadow: "none",
  },
}));

// Secondary action button
const SecondaryButton = styled(Button)(({}) => ({
  background: "rgba(255, 255, 255, 0.9)",
  color: TEXT_PRIMARY,
  fontWeight: 500,
  borderRadius: 12,
  textTransform: "none",
  padding: "10px 20px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 1)",
    transform: "translateY(-1px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  },
}));

// Enhanced TextField
const StyledTextField = styled(TextField)(({}) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.9)",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 1)",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(102, 126, 234, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#667eea",
      borderWidth: 2,
    },
  },
}));

// Enhanced Dialog
const StyledDialog = styled(Dialog)(({}) => ({
  "& .MuiDialog-paper": {
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
  },
}));

// Loading overlay component
const LoadingOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 20,
  zIndex: 2,
});

type ImageItem = Image & {
  loading?: boolean;
  decoratedUrl?: string;
  uploaded?: boolean;
};

type resAnalizeAi = {
  decoratedUrl: string;
  suggestion?: string;
};

const ImageAIPage = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [dialogIndex, setDialogIndex] = useState<number | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [imageToCopy, setImageToCopy] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>();

  const api = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);
  const userContext = useContext(UserContext);
  const userId = userContext?.userId ?? null;
  useEffect(() => {
    if (!userId) return;
    axios
      .get<Image[]>(`${api}/image/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setImages(res.data))
      .catch(console.error);
  }, [userId]);

  const handleAnalyze = async (i: number) => {
    const imgs = [...images];
    imgs[i].loading = true;
    setImages(imgs);
    try {
      const res = await axios.post<resAnalizeAi>(
        `${api}/images/decorate`,
        {
          imageUrl: imgs[i].imgUrl,
          description: imgs[i].description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuggestion(res.data.suggestion);
      setDialogIndex(i);
      imgs[i].decoratedUrl = res.data.decoratedUrl;
      imgs[i].loading = false;
      setImages(imgs);
    } catch (e) {
      console.error(e);
    } finally {
      imgs[i].loading = false;
    }
  };

  const handleChoice = (index: number, action: "copy" | "overwrite") => {
    if (action === "copy") {
      const image = images[index];
      if (image?.decoratedUrl) {
        setImageToCopy(image.decoratedUrl);
        setShowUploadDialog(true);
        setDialogIndex(null);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
        py: 4,
      }}
    >
      {/* Hero Section */}
      {images.length > 0 && (
        <Box sx={{ textAlign: "center", mb: 6, px: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              background: GRADIENT_PRIMARY,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mt: 7,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Advanced AI Analysis
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: TEXT_SECONDARY,
              mb: 3,
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Analyze your image description and add smart AI-based elements
          </Typography>

          <Chip
            icon={<AutoAwesome />}
            label="Powered by Artificial Intelligence"
            sx={{
              background: GRADIENT_ACCENT,
              color: "white",
              fontWeight: 600,
              px: 2,
              py: 1,
            }}
          />
        </Box>
      )}

      {/* Images Grid */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 } }}>
        {images.length > 0 ? (
          images.map((img, i) => (
            <Grid item xs={12} sm={6} lg={4} key={img.id}>
              <StyledCard>
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={img.decoratedUrl || img.imgUrl}
                    alt={img.name}
                    sx={{ objectFit: "cover" }}
                  />

                  {img.decoratedUrl && (
                    <Chip
                      icon={<AutoAwesome />}
                      label="AI Enhanced"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: SUCCESS_COLOR,
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  {img.loading && (
                    <LoadingOverlay>
                      <Box sx={{ textAlign: "center" }}>
                        <CircularProgress
                          size={40}
                          sx={{
                            color: "#667eea",
                            mb: 2,
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          Processing with AI...
                        </Typography>
                      </Box>
                    </LoadingOverlay>
                  )}
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <StyledTextField
                    fullWidth
                    label="Image Description"
                    variant="outlined"
                    size="medium"
                    multiline
                    rows={2}
                    value={img.description}
                    onChange={(e) => {
                      const copy = [...images];
                      copy[i].description = e.target.value;
                      setImages(copy);
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <GradientButton
                      fullWidth
                      onClick={() => handleAnalyze(i)}
                      disabled={img.loading}
                      startIcon={!img.loading && <AutoAwesome />}
                    >
                      {img.loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "AI Analyze"
                      )}
                    </GradientButton>

                    {img.decoratedUrl && (
                      <IconButton
                        onClick={() => setDialogIndex(i)}
                        sx={{
                          background: GRADIENT_ACCENT,
                          color: "white",
                          "&:hover": {
                            background: GRADIENT_SECONDARY,
                          },
                        }}
                      >
                        <PhotoCamera />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "400px",
                textAlign: "center",
                p: 4,
              }}
            >
              <PhotoCamera
                sx={{
                  fontSize: 80,
                  color: "text.secondary",
                  mb: 2,
                  opacity: 0.5,
                }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 2, color: "text.secondary" }}
              >
                No images to display
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary", maxWidth: 400 }}
              >
                Upload images to start working with AI analysis and smart
                enhancements
              </Typography>
              <GradientButton
                variant="contained"
                startIcon={<CloudUpload />}
                onClick={() => {
                  setShowUploadDialog(true);
                }}
              >
                Upload Images
              </GradientButton>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Enhanced Result Dialog */}
      {dialogIndex !== null && images[dialogIndex]?.decoratedUrl && (
        <StyledDialog
          open
          onClose={() => setDialogIndex(null)}
          maxWidth="md"
          fullWidth
          TransitionComponent={Fade}
          BackdropComponent={Backdrop}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
            },
          }}
        >
          <DialogTitle
            sx={{
              background: GRADIENT_PRIMARY,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#3f51b5", fontWeight: 700 }}
              >
                GPT Suggestion:
              </Typography>
              <Typography variant="body2">{suggestion}</Typography>
              <AutoAwesome />
              Enhanced Image
            </Box>
            <IconButton
              onClick={() => setDialogIndex(null)}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0, position: "relative" }}>
            <Box
              component="img"
              src={images[dialogIndex].decoratedUrl}
              alt="Enhanced Image"
              sx={{
                width: "100%",
                display: "block",
                maxHeight: "60vh",
                objectFit: "contain",
              }}
            />

            <Box sx={{ p: 3, background: "rgba(255, 255, 255, 0.9)" }}>
              <Typography
                variant="h6"
                sx={{
                  color: TEXT_PRIMARY,
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                What would you like to do with this image?
              </Typography>
              <Typography variant="body2" sx={{ color: TEXT_SECONDARY }}>
                Choose your preferred option to continue
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{ p: 3, gap: 2, background: "rgba(248, 249, 250, 0.8)" }}
          >
            <GradientButton
              onClick={() => handleChoice(dialogIndex, "copy")}
              startIcon={<ContentCopy />}
            >
              Create New Copy
            </GradientButton>
            <SecondaryButton onClick={() => setDialogIndex(null)}>
              Cancel
            </SecondaryButton>
          </DialogActions>
        </StyledDialog>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <StyledDialog
          open
          onClose={() => setShowUploadDialog(false)}
          // maxWidth="sm"
          fullWidth
          // TransitionComponent={Fade}
        >
          <DialogContent 
          >
            <UploadImage
              imgUrl={imageToCopy ?? undefined}
              albumId={undefined}
            />
          </DialogContent>

          {/* <DialogActions sx={{ p: 3, background: "rgba(248, 249, 250, 0.8)" }}>
            <SecondaryButton onClick={() => setShowUploadDialog(false)}>
              Close
            </SecondaryButton>
          </DialogActions> */}
        </StyledDialog>
      )}
    </Box>
  );
};

export default ImageAIPage;
