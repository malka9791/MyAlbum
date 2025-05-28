import {
  Alert,
  Box,
  Button,
  Chip,
  Fade,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { UserContext } from "../hook/user_context";
import { Tag } from "../models/tag";
import { CheckCircle, CloudUpload, Description } from "@mui/icons-material";
import { AlbumSelect } from "./albumSelect";

const UploadImage = ({
  albumId,
  imgUrl,
}: {
  albumId: number | undefined;
  imgUrl: string | undefined;
}) => {
  //userId from useContext in storage
  const userContext = useContext(UserContext);
  const userId = userContext?.userId ?? null;
  const { token } = useContext(UserContext);
  const api = import.meta.env.VITE_API_URL;

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [imgName, setImgName] = useState("");
  const [imgDescription, setImgDescription] = useState("");
  // const { albumId } = useParams();
  const [tags, setTags] = useState<Tag[] | null>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const [tagIdTOSend, setTagIdToSend] = useState<number | null>();
  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get(`${api}/tag`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(res.data);
      } catch (error) {
        console.error("error fetching album", error);
      }
    };
    getTags();
  }, [albumId]);

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if ((!file && !imgUrl) || !userId || !imgName) {
      setErrorMessage("Missing data! please, try again");
      return;
    }
    const handleReset = () => {
      setFile(null);
      setImgName("");
      setImgDescription("");
    };
    let finalImgUrl = imgUrl;

    if (!imgUrl && file) {
      // when uploading from computer
      try {
        const response = await axios.get(`${api}/s3/presigned-url`, {
          params: {
            fileName: file.name,
            fileType: file.type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const presignedUrl = response.data.url;
        await axios.put(presignedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percent);
          },
        });

        finalImgUrl = `https://albumaws-testpnoren.s3.us-east-1.amazonaws.com/${file.name}`;
      } catch (error) {
        setErrorMessage("Error uploading image");
        return;
      }
    } else if (imgUrl && !file) {
      // new case: there's imgUrl (from Cloudinary) and no local file
      try {
        const filename = `cloudinary_${Date.now()}.jpg`;

        // download the image from the URL
        const imageResponse = await axios.get(imgUrl, {
          responseType: "blob",
        });

        const blobFile = new File([imageResponse.data], filename, {
          type: imageResponse.data.type,
        });

        // request S3 upload URL
        const response = await axios.get(`${api}/s3/presigned-url`, {
          params: { fileName: filename, fileType: blobFile.type },
        });

        const presignedUrl = response.data.url;

        // upload to S3
        await axios.put(presignedUrl, blobFile, {
          headers: {
            "Content-Type": blobFile.type,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percent);
          },
        });

        finalImgUrl = `https://albumaws-testpnoren.s3.us-east-1.amazonaws.com/${filename}`;
      } catch (error) {
        setErrorMessage("Error uploading image from Cloudinary to S3");
        return;
      }
    }

    try {
      await axios.post(
        `${api}/image`,
        {
          name: imgName,
          userId: userId,
          albumId: Number(albumId),
          description: imgDescription || "",
          tagId: tagIdTOSend,
          imgUrl: finalImgUrl,
          imgType: file?.type ?? "image/jpeg",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSuccess(true);
      handleReset(); // Clear form after success
    } catch (error) {
      console.error("Error fetching image", error);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
      }}
    >
      {/* <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
          border: "1px solid rgba(233, 51, 69, 0.08)",
        }}
      > */}
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "0 8px 20px rgba(233, 51, 69, 0.25)",
          }}
        >
          <AddAPhotoOutlinedIcon sx={{ fontSize: 35, color: "white" }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1a1a2e",
            mb: 1,
            letterSpacing: "-0.3px",
          }}
        >
          Upload Image
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "14px",
          }}
        >
          Add your beautiful image to the album
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={imgName}
          onChange={({ target }) => setImgName(target.value)}
          helperText={imgName == "" ? "name is required" : ""}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#e93345",
              fontWeight: 500,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <AddAPhotoOutlinedIcon sx={{ color: "#e93345" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                "& fieldset": {
                  borderColor: "#e93345",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "2px",
                },
              },
            },
            "& .MuiFormHelperText-root": {
              fontSize: "13px",
              marginLeft: 0,
              marginTop: "6px",
            },
          }}
        />

        <TextField
          label="Description (Optional)"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={imgDescription}
          onChange={({ target }) => setImgDescription(target.value)}
          margin="normal"
          InputLabelProps={{
            style: {
              color: "#e93345",
              fontWeight: 500,
            },
          }}
          InputProps={{
            style: {
              color: "black",
              fontSize: "15px",
            },
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ alignSelf: "flex-start", mt: 1 }}
              >
                <Description sx={{ color: "#e93345" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                "& fieldset": {
                  borderColor: "#e93345",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "2px",
                },
              },
            },
          }}
        />
        {!albumId && (
          <AlbumSelect
            selectedAlbumId={selectedAlbumId}
            setSelectedAlbumId={setSelectedAlbumId}
          />
        )}
        <FormControl fullWidth>
          <InputLabel
            id="tag-label"
            sx={{
              color: "#e93345",
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#e93345",
              },
            }}
          >
            Tag
          </InputLabel>
          <Select
            fullWidth
            labelId="tag-label"
            label="Tag"
            id="demo-simple-select-helper"
            onChange={(e) => setTagIdToSend(Number(e.target.value) || null)}
            sx={{
              mb: 1,
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              color: "black",
              fontSize: "15px",
              transition: "all 0.3s ease",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "&:hover": {
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e93345",
                  borderWidth: "2px",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e93345 !important",
                  borderWidth: "2px",
                },
              },
            }}
          >
            {tags ? (
              tags.map((tag) => (
                <MenuItem
                  key={tag.id}
                  value={tag.id}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "rgba(233, 51, 69, 0.08)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(233, 51, 69, 0.12)",
                      "&:hover": {
                        backgroundColor: "rgba(233, 51, 69, 0.16)",
                      },
                    },
                  }}
                >
                  <Chip
                    label={tag.name}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(233, 51, 69, 0.1)",
                      color: "#e93345",
                      fontWeight: 500,
                    }}
                  />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No tags available</MenuItem>
            )}
          </Select>
        </FormControl>

        {!imgUrl && (
          <Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload-button"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload-button">
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  border: "2px dashed #e93345",
                  backgroundColor: "rgba(233, 51, 69, 0.02)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(233, 51, 69, 0.05)",
                    borderColor: "#d62b3c",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 15px rgba(233, 51, 69, 0.12)",
                  },
                }}
              >
                <CloudUpload
                  sx={{
                    fontSize: 40,
                    color: "#e93345",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#e93345",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Choose Image File
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: "13px",
                  }}
                >
                  Click to select an image
                </Typography>
              </Paper>
            </label>
          </Box>
        )}

        {errorMessage && (
          <Fade in={Boolean(errorMessage)}>
            <Alert
              severity="error"
              sx={{
                borderRadius: "10px",
                backgroundColor: "rgba(244, 67, 54, 0.08)",
                border: "1px solid rgba(244, 67, 54, 0.2)",
                "& .MuiAlert-message": {
                  fontWeight: 500,
                  fontSize: "14px",
                },
              }}
            >
              {errorMessage}
            </Alert>
          </Fade>
        )}

        <Button
          onClick={handleUpload}
          variant="contained"
          fullWidth
          size="large"
          startIcon={<CloudUpload />}
          sx={{
            py: 1.8,
            borderRadius: "12px",
            background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
            fontSize: "15px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 6px 18px rgba(233, 51, 69, 0.25)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #d62b3c 30%, #e55a5a 90%)",
              boxShadow: "0 8px 22px rgba(233, 51, 69, 0.35)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "#ccc",
              boxShadow: "none",
              transform: "none",
            },
          }}
          disabled={progress > 0 && progress < 100}
        >
          {progress > 0 && progress < 100 ? "Uploading..." : "Upload File"}
        </Button>

        {progress > 0 && (
          <Fade in={progress > 0}>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontWeight: 500, fontSize: "13px" }}
                >
                  Upload Progress
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#e93345", fontWeight: 600, fontSize: "13px" }}
                >
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(233, 51, 69, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 3,
                    background:
                      "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                  },
                }}
              />
            </Box>
          </Fade>
        )}
      </Box>
      {/* </Paper> */}

      {/* Success Alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          icon={<CheckCircle sx={{ fontSize: 28 }} />}
          sx={{
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "600",
            padding: "16px 24px",
            minWidth: "350px",
            boxShadow: "0 8px 32px rgba(76, 175, 80, 0.4)",
            background: "linear-gradient(45deg, #4caf50, #66bb6a)",
            "& .MuiAlert-message": {
              fontSize: "16px",
              fontWeight: "600",
            },
          }}
        >
          Image uploaded successfully! 🎉
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "600",
            padding: "16px 24px",
            minWidth: "350px",
            boxShadow: "0 8px 32px rgba(244, 67, 54, 0.4)",
            background: "linear-gradient(45deg, #f44336, #e57373)",
            "& .MuiAlert-message": {
              fontSize: "16px",
              fontWeight: "600",
            },
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default UploadImage;
