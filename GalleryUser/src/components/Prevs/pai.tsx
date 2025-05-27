import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../hook/user_context";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Grid,
  Container,
  Avatar,
  Divider,
  Collapse,
  CircularProgress,
  Paper,
  Stack,
  Fade,
  Zoom,
  Alert,
  AlertTitle,
  Badge,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import {
  Psychology as PsychologyIcon,
  AutoStories as AutoStoriesIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Analytics as AnalyticsIcon,
  Mood as MoodIcon,
  MoodBad as MoodBadIcon,
  SentimentNeutral as SentimentNeutralIcon,
  Camera as CameraIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";

type Image = {
  id: number;
  name: string;
  description: string;
  emotions: string;
  imgUrl: string;
  imgType: string;
  createdAt: Date;
  tag: any;
};

interface AiAnalysisResult {
  story: string;
  emotions: string[];
  sentiment: string;
}

// Custom animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(3),
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 280,
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
    transform: "translateX(-100%)",
    transition: "transform 0.6s",
  },
  "&:hover::after": {
    transform: "translateX(100%)",
  },
});

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  borderRadius: theme.spacing(3),
  border: 0,
  color: "white",
  height: 56,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  fontWeight: "bold",
  fontSize: "1.1rem",
  "&:hover": {
    background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 10px 4px rgba(33, 203, 243, .3)",
  },
  "&:disabled": {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)",
  borderRadius: theme.spacing(2),
  border: 0,
  color: "white",
  minWidth: "44px",
  height: "44px",
  boxShadow: "0 2px 4px rgba(255, 152, 0, .3)",
  "&:hover": {
    background: "linear-gradient(45deg, #F57C00 30%, #FF9800 90%)",
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(255, 152, 0, .4)",
  },
}));

const getEmotionStyle = (emotion: string) => {
  const styles = {
    שמח: { bg: "linear-gradient(45deg, #FFD700, #FFA500)", color: "#fff" },
    עצוב: { bg: "linear-gradient(45deg, #4FC3F7, #29B6F6)", color: "#fff" },
    כועס: { bg: "linear-gradient(45deg, #FF5722, #F44336)", color: "#fff" },
    מפחד: { bg: "linear-gradient(45deg, #9C27B0, #673AB7)", color: "#fff" },
    מופתע: { bg: "linear-gradient(45deg, #4CAF50, #8BC34A)", color: "#fff" },
    גאה: { bg: "linear-gradient(45deg, #FF9800, #FFB74D)", color: "#fff" },
    אוהב: { bg: "linear-gradient(45deg, #E91E63, #F06292)", color: "#fff" },
    מרגש: { bg: "linear-gradient(45deg, #3F51B5, #5C6BC0)", color: "#fff" },
  };
  return (
    styles[emotion as keyof typeof styles] || {
      bg: "linear-gradient(45deg, #757575, #9E9E9E)",
      color: "#fff",
    }
  );
};

const AnalysisCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
}));

const UserImagesWithAi = () => {
  const [images, setImages] = useState<Image[]>([]);
  const { userId } = useContext(UserContext);
  const [loadingImageId, setLoadingImageId] = useState<number>();
  const [results, setResults] = useState<{ [key: string]: AiAnalysisResult }>(
    {}
  );
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditImage, setCurrentEditImage] = useState<Image | null>(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [savingDescription, setSavingDescription] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const api = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${api}/image/user/${userId}`);
        setImages(
          Array.isArray(response.data)
            ? response.data
            : response.data.images || []
        );
      } catch (error) {
        console.error("שגיאה בטעינת התמונות:", error);
      }
    };

    fetchImages();
  }, [userId]);

  const analyzeImage = async (image: Image) => {
    setLoadingImageId(image.id);
    try {
      const response = await axios.post(`${api}/Ai/analyze-description`, {
        description: image.description,
      });

      setResults((prev) => ({
        ...prev,
        [image.id]: {
          story: response.data.story || response.data.description,
          emotions: Array.isArray(response.data.emotions)
            ? response.data.emotions
            : response.data.emotions?.split(",").map((e: string) => e.trim()) ||
              [],
          sentiment: response.data.sentiment || "נייטרלי",
        },
      }));
    } catch (error) {
      console.error("שגיאה בניתוח AI:", error);
    }
    setLoadingImageId(undefined);
  };

  const toggleExpand = (imageId: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [imageId]: !prev[imageId],
    }));
  };

  const openEditDialog = (image: Image) => {
    setCurrentEditImage(image);
    setEditedDescription(image.description);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentEditImage(null);
    setEditedDescription("");
  };

  const saveDescription = async () => {
    if (!currentEditImage || !editedDescription.trim()) return;

    setSavingDescription(true);
    setErrorMessage("");

    try {
      // שליחת בקשת עדכון לשרת
      const response = await axios.put(`${api}/image/${currentEditImage.id}`, {
        name: currentEditImage.name,
        description: editedDescription.trim(),
      });

      console.log("תיאור עודכן בהצלחה:", response.data);

      // עדכון התמונה במצב המקומי
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === currentEditImage.id
            ? { ...img, description: editedDescription.trim() }
            : img
        )
      );

      // אם יש תוצאות ניתוח קיימות, נמחק אותן כדי שהמשתמש יצטרך לרוץ ניתוח מחדש
      setResults((prev) => {
        const newResults = { ...prev };
        delete newResults[currentEditImage.id];
        return newResults;
      });

      setSuccessMessage("התיאור עודכן בהצלחה!");
      closeEditDialog();
    } catch (error: any) {
      console.error("שגיאה בעדכון התיאור:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "שגיאה לא ידועה";
      setErrorMessage(`שגיאה בעדכון התיאור: ${errorMsg}`);
    } finally {
      setSavingDescription(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "חיובי":
        return <MoodIcon sx={{ color: "#4CAF50" }} />;
      case "שלילי":
        return <MoodBadIcon sx={{ color: "#F44336" }} />;
      case "נייטרלי":
        return <SentimentNeutralIcon sx={{ color: "#FF9800" }} />;
      default:
        return <MoodIcon sx={{ color: "#9C27B0" }} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "חיובי":
        return "#4CAF50";
      case "שלילי":
        return "#F44336";
      case "נייטרלי":
        return "#FF9800";
      default:
        return "#9C27B0";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        // width: "90%",
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #e93345, #ff6b6b, #fcb045)",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 6,
            overflowX: "hidden", // ✅ מונע גלישה פנימית
            maxWidth: "100%", // ✅ מבטל padding חורג אם יש
            paddingInline: "16px", // ✅ שוליים אחידים
          }}
        >
          <Stack alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                animation: `${pulse} 2s infinite`,
              }}
            >
              <PsychologyIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              sx={{
                background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ניתוח AI מתקדם
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              // sx={{ opacity: 0.9, maxWidth: 600 }}
            >
              גלה את הסיפורים והרגשות המוסתרים מאחורי התמונות שלך בעזרת בינה
              מלאכותית מתקדמת
            </Typography>
            <Typography
              variant="h3"
              textAlign="center"
              // sx={{ opacity: 0.9, maxWidth: 600 }}
            >
              בקרוב!!! עריכת קולאז' ושינוי תמונה
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          py: 6,
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {images.length === 0 ? (
          <Fade in timeout={1000}>
            <Box
              textAlign="center"
              py={10}
              sx={{
                maxWidth: "100%",
                overflowX: "hidden",
                px: 2, // מוסיף רווח פנימי בצדדים כדי למנוע שבירה במובייל
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: "primary.main",
                  mx: "auto",
                  mb: 4,
                }}
              >
                <CameraIcon sx={{ fontSize: 60 }} />
              </Avatar>

              <Typography
                variant="h4" // היה h3 — קטן יותר כדי שיתאים למסכים קטנים
                gutterBottom
                fontWeight="bold"
                color="text.primary"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                אין תמונות להצגה
              </Typography>

              <Typography
                variant="body1" // היה h6 — קטן יותר
                color="text.secondary"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                העלה תמונות כדי לראות את קסם הניתוח
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={4} sx={{ margin: 2, width: "95%" }}>
            {images.map((image, index) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                sx={{ overflow: "hidden", maxWidth: "100%" }} // ✅ חשוב
                key={image.id}
              >
                <Zoom in timeout={300 + index * 100}>
                  <StyledCard>
                    {/* Image Section */}
                    <Box sx={{ position: "relative" }}>
                      <StyledCardMedia
                        image={image.imgUrl}
                        title={image.name}
                      />
                      <Chip
                        label={new Date(image.createdAt).toLocaleDateString(
                          "he-IL"
                        )}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          right: 16,
                        }}
                      >
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="white"
                          sx={{
                            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                          }}
                        >
                          {image.name}
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={3}>
                        {/* Original Description with Edit Button */}
                        <Alert
                          icon={<AutoStoriesIcon />}
                          severity="info"
                          sx={{ borderRadius: 2 }}
                          action={
                            <Tooltip title="ערוך תיאור">
                              <EditButton
                                size="small"
                                onClick={() => openEditDialog(image)}
                              >
                                <EditIcon />
                              </EditButton>
                            </Tooltip>
                          }
                        >
                          <AlertTitle>התיאור המקורי</AlertTitle>
                          <Typography
                            variant="body2"
                            sx={{ fontStyle: "italic" }}
                          >
                            "{image.description}"
                          </Typography>
                        </Alert>

                        {/* Analysis Button */}
                        <GradientButton
                          variant="contained"
                          fullWidth
                          size="large"
                          onClick={() => analyzeImage(image)}
                          disabled={loadingImageId === image.id}
                          startIcon={
                            loadingImageId === image.id ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              <AnalyticsIcon />
                            )
                          }
                        >
                          {loadingImageId === image.id
                            ? "מנתח..."
                            : "הפעל ניתוח AI"}
                        </GradientButton>

                        {/* Analysis Results */}
                        {results[image.id] && (
                          <Fade in timeout={800}>
                            <Stack spacing={3}>
                              {/* Story Section */}
                              <AnalysisCard elevation={3}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                  mb={2}
                                >
                                  <Avatar sx={{ bgcolor: "primary.main" }}>
                                    <AutoStoriesIcon />
                                  </Avatar>
                                  <Typography variant="h6" fontWeight="bold">
                                    הסיפור מאחורי התמונה
                                  </Typography>
                                </Stack>
                                <Divider sx={{ mb: 2 }} />
                                <Collapse
                                  in={
                                    expandedCards[image.id] ||
                                    results[image.id].story.length <= 150
                                  }
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{ lineHeight: 1.7 }}
                                  >
                                    {results[image.id].story}
                                  </Typography>
                                </Collapse>
                                {!expandedCards[image.id] &&
                                  results[image.id].story.length > 150 && (
                                    <Typography
                                      variant="body1"
                                      sx={{ lineHeight: 1.7 }}
                                    >
                                      {results[image.id].story.substring(
                                        0,
                                        150
                                      )}
                                      ...
                                    </Typography>
                                  )}
                                {results[image.id].story.length > 150 && (
                                  <Box textAlign="center" mt={2}>
                                    <Button
                                      onClick={() => toggleExpand(image.id)}
                                      endIcon={
                                        expandedCards[image.id] ? (
                                          <ExpandLessIcon />
                                        ) : (
                                          <ExpandMoreIcon />
                                        )
                                      }
                                    >
                                      {expandedCards[image.id]
                                        ? "הצג פחות"
                                        : "הצג עוד"}
                                    </Button>
                                  </Box>
                                )}
                              </AnalysisCard>

                              {/* Emotions Section */}
                              <AnalysisCard elevation={3}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                  mb={2}
                                >
                                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                                    <FavoriteIcon />
                                  </Avatar>
                                  <Typography variant="h6" fontWeight="bold">
                                    רגשות שזוהו
                                  </Typography>
                                </Stack>
                                <Divider sx={{ mb: 2 }} />
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                  {results[image.id].emotions.map(
                                    (emotion, idx) => {
                                      const style = getEmotionStyle(emotion);
                                      return (
                                        <Tooltip
                                          key={idx}
                                          title={`רגש: ${emotion}`}
                                        >
                                          <Chip
                                            label={emotion}
                                            sx={{
                                              background: style.bg,
                                              color: style.color,
                                              fontWeight: "bold",
                                              borderRadius: "20px",
                                              height: "36px",
                                              fontSize: "0.9rem",
                                              "&:hover": {
                                                transform: "scale(1.05)",
                                                boxShadow:
                                                  "0 4px 8px rgba(0,0,0,0.2)",
                                              },
                                              transition:
                                                "all 0.2s ease-in-out",
                                            }}
                                          />
                                        </Tooltip>
                                      );
                                    }
                                  )}
                                </Stack>
                              </AnalysisCard>

                              {/* Sentiment Section */}
                              <AnalysisCard elevation={3}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: getSentimentColor(
                                          results[image.id].sentiment
                                        ),
                                      }}
                                    >
                                      {getSentimentIcon(
                                        results[image.id].sentiment
                                      )}
                                    </Avatar>
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        הרגש הכללי
                                      </Typography>
                                      <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                      >
                                        {results[image.id].sentiment}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                  <Badge
                                    badgeContent="AI"
                                    color="primary"
                                    sx={{
                                      "& .MuiBadge-badge": {
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                      },
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: getSentimentColor(
                                          results[image.id].sentiment
                                        ),
                                        width: 60,
                                        height: 60,
                                      }}
                                    >
                                      {getSentimentIcon(
                                        results[image.id].sentiment
                                      )}
                                    </Avatar>
                                  </Badge>
                                </Stack>
                              </AnalysisCard>
                            </Stack>
                          </Fade>
                        )}
                      </Stack>
                    </CardContent>
                  </StyledCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorMessage("")}
          severity="error"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Edit Description Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <DescriptionIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                עריכת תיאור התמונה
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentEditImage?.name}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="תיאור התמונה"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="הזן תיאור מפורט של התמונה..."
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              },
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            תיאור מפורט יותר יעזור לבינה המלאכותית לספק ניתוח מדויק יותר
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={closeEditDialog}
            startIcon={<CancelIcon />}
            sx={{ borderRadius: 2 }}
          >
            ביטול
          </Button>
          <GradientButton
            onClick={saveDescription}
            disabled={savingDescription || !editedDescription.trim()}
            startIcon={
              savingDescription ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            sx={{ height: 40 }}
          >
            {savingDescription ? "שומר..." : "שמור"}
          </GradientButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserImagesWithAi;
