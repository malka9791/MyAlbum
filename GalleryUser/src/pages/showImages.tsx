import type React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import UploadImage from "./uploadImg";
import LoadingSpinner from "../components/loading";
import { UserContext } from "../hook/user_context";
import type { Image } from "../models/image";
import type { Album } from "../models/album";

type UpdateImageData = {
  id: number;
  name: string;
};

// View mode type
type ViewMode = "grid" | "gallery";

const ShowImages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const { albumId } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);
  const [brokenImages, setBrokenImages] = useState<number[]>([]);

  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Delete image state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<Image | null>(null);

  // Update image state
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [imageToUpdate, setImageToUpdate] = useState<UpdateImageData | null>(
    null
  );
  const [newImageName, setNewImageName] = useState("");

  // Image preview state
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<Image | null>(null);

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  // Add a new state for search query after the other state declarations (around line 70)
  const [searchQuery, setSearchQuery] = useState("");

  const api = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);

  // Add a function to filter images based on search query after the getTags function (around line 95)
  const filteredImages = images.filter((image) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();

    // Search by image name
    if (image.name.toLowerCase().includes(query)) return true;

    // Search by image description (if available)
    if (image.description && image.description.toLowerCase().includes(query))
      return true;

    // Search by single tag
    if (image.tag && image.tag.name.toLowerCase().includes(query)) return true;

    return false;
  });

  useEffect(() => {
    const getAlbum = async () => {
      try {
        setLoading(true);
        const albumResponse = await axios.get<Album>(
          `${api}/album/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbum(albumResponse.data);
        setImages(albumResponse.data?.images || []);
      } catch (error) {
        console.error("Error fetching album", error);
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      getAlbum();
    }
  }, [albumId, openUpload]);

  const handleImageError = (id: number) => {
    setBrokenImages((prev) => [...prev, id]);
  };

  // View mode handlers
  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
      // Reset to first image when switching to gallery view
      if (newMode === "gallery") {
        setCurrentImageIndex(0);
      }
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Menu handlers
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    image: Image
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedImage(image);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Delete handlers
  const handleDeleteClick = (image: Image) => {
    setImageToDelete(image);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;

    try {
      await axios.delete(`${api}/image/${imageToDelete.id}`);
      try {
        await axios.delete(`${api}/s3/by-url/${imageToDelete.imgUrl}`);
      } catch (err) {
        console.error("Error deleting image from s3", err);
      }
      setImages((prevImages) =>
        prevImages.filter((img) => img.id !== imageToDelete.id)
      );

      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting image from data", error);
    }
  };

  // Update handlers
  const handleUpdateClick = (image: Image) => {
    setImageToUpdate({ id: image.id, name: image.name });
    setNewImageName(image.name);
    setOpenUpdateDialog(true);
    handleMenuClose();
  };

  const handleConfirmUpdate = async () => {
    if (!imageToUpdate) return;
    try {
      await axios.put(
        `${api}/image/${imageToUpdate.id}`,
        {
          name: newImageName,
          description: imageToDelete?.description || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === imageToUpdate.id ? { ...img, name: newImageName } : img
        )
      );

      setOpenUpdateDialog(false);
    } catch (error) {
      console.error("Error updating image", error);
    }
  };

  // Preview handlers
  const handlePreviewClick = (image: Image) => {
    setPreviewImage(image);
    setOpenPreview(true);
    handleMenuClose();
  };

  // Calculate columns based on screen size
  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isLargeScreen) return 4;
    return 3;
  };

  // Replace the currentImage assignment in the gallery view to use filteredImages (around line 380)
  // Change this line:
  // const currentImage = images.length > 0 ? images[currentImageIndex] : null;
  // To:
  const currentImage =
    filteredImages.length > 0 ? filteredImages[currentImageIndex] : null;

  return (
    <Box
      sx={{
        width: "100%",
        padding: 0,
        // boxSizing: "border-box",
        // bgcolor: "#f8f9fa",
        // minHeight: "100vh",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #f0f0f0 2%, transparent 2.5%), radial-gradient(circle at 75px 75px, #f0f0f0 2%, transparent 2.5%)",
        backgroundSize: "100px 100px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: { xs: "24px 16px", sm: "32px 24px", md: "40px 32px" },
        }}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Box
              sx={{
                mt: 3.5,
                // mb: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                // mb: { xs: 3, sm: 4 },
                width: "100%",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    // mr: 2,
                    bgcolor: alpha("#e93345", 0.1),
                    color: "#e93345",
                    "&:hover": {
                      bgcolor: alpha("#e93345", 0.2),
                    },
                  }}
                >
                  <ArrowBackRoundedIcon />
                </IconButton>
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      color: "#1a1a2e",
                      fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {album?.name || "Album"}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#666",
                      // mt: 0.5,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    {images.length} {images.length === 1 ? "photo" : "photos"}{" "}
                    in this album
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {images.length > 0 && (
                  // Add a search input field in the UI after the view mode toggle buttons (around line 350)
                  // Find the Box that contains the ToggleButtonGroup and add this before the Upload Image button
                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 0.5,
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        display: "flex",
                        alignItems: "center",
                        width: { xs: "100%", sm: "250px" },
                      }}
                    >
                      <Box
                        component="input"
                        type="text"
                        placeholder="Search by tag, name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                          border: "none",
                          outline: "none",
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "12px",
                          fontSize: "14px",
                        }}
                      />
                    </Paper>
                  </Box>
                )}

                {images.length > 0 && (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 0.5,
                      borderRadius: "12px",
                      // bgcolor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={handleViewModeChange}
                      aria-label="view mode"
                      size={isMobile ? "small" : "medium"}
                    >
                      <ToggleButton
                        value="grid"
                        aria-label="grid view"
                        sx={{
                          px: { xs: 1.5, sm: 2 },
                          py: { xs: 0.75, sm: 1 },
                          "&.Mui-selected": {
                            bgcolor: alpha("#e93345", 0.1),
                            color: "#e93345",
                            "&:hover": {
                              bgcolor: alpha("#e93345", 0.15),
                            },
                          },
                        }}
                      >
                        <GridViewRoundedIcon sx={{ mr: { xs: 0.5, sm: 1 } }} />
                        <Typography
                          variant="body2"
                          sx={{
                            display: { xs: "none", sm: "block" },
                            fontWeight: 500,
                          }}
                        >
                          Grid
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        value="gallery"
                        aria-label="gallery view"
                        sx={{
                          px: { xs: 1.5, sm: 2 },
                          py: { xs: 0.75, sm: 1 },
                          "&.Mui-selected": {
                            bgcolor: alpha("#e93345", 0.1),
                            color: "#e93345",
                            "&:hover": {
                              bgcolor: alpha("#e93345", 0.15),
                            },
                          },
                        }}
                      >
                        <ViewCarouselRoundedIcon
                          sx={{ mr: { xs: 0.5, sm: 1 } }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            display: { xs: "none", sm: "block" },
                            fontWeight: 500,
                          }}
                        >
                          Gallery
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Paper>
                )}

                <Button
                  onClick={() => setOpenUpload(true)}
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                    background:
                      "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                    color: "#fff",
                    fontSize: { xs: "14px", sm: "16px" },
                    textTransform: "none",
                    padding: { xs: "10px 16px", sm: "12px 24px" },
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(233, 51, 69, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(233, 51, 69, 0.4)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Upload Image
                </Button>
              </Box>
            </Box>

            {images.length > 0 ? (
              <Fade in={true} timeout={500}>
                <Box
                  sx={{
                    // width: "100%",
                    // bgcolor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  {viewMode === "grid" ? (
                    // Grid View
                    <ImageList
                      variant="quilted"
                      cols={getColumnCount()}
                      gap={16}
                      rowHeight={240}
                      sx={{ width: "100%", m: 0 }}
                    >
                      {/* Replace the images.map in the grid view with filteredImages.map (around line 400) */}
                      {filteredImages.map((image) => (
                        <ImageListItem
                          key={image.id}
                          sx={{
                            overflow: "hidden",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          {!brokenImages.includes(image.id) ? (
                            <Box
                              sx={{
                                position: "relative",
                                cursor: "pointer",
                                height: 240,
                                width: "100%",
                                "&:hover .MuiImageListItemBar-root": {
                                  opacity: 1,
                                },
                                "&:hover .zoom-icon": {
                                  opacity: 1,
                                },
                              }}
                              onClick={() => handlePreviewClick(image)}
                            >
                              <img
                                src={image.imgUrl || "/placeholder.svg"}
                                alt={image.name}
                                loading="lazy"
                                onError={() => handleImageError(image.id)}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                  borderRadius: "12px 12px 0 0",
                                }}
                              />
                              <Box
                                className="zoom-icon"
                                sx={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  bgcolor: "rgba(255,255,255,0.8)",
                                  borderRadius: "50%",
                                  width: 50,
                                  height: 50,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  opacity: 0,
                                  transition: "opacity 0.3s ease",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                }}
                              >
                                <ZoomInRoundedIcon
                                  sx={{ color: "#e93345", fontSize: 28 }}
                                />
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                height: 240,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "#f5f5f5",
                                borderRadius: "12px 12px 0 0",
                              }}
                            >
                              <BrokenImageRoundedIcon
                                sx={{ fontSize: 60, color: "#ccc", mb: 1 }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Image could not be loaded
                              </Typography>
                            </Box>
                          )}
                          <ImageListItemBar
                            title={`${image.name}-${image.description}`}
                            // Add tags display to the ImageListItemBar in grid view (around line 450)
                            // After the subtitle line in ImageListItemBar:
                            subtitle={
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 0.5,
                                }}
                              >
                                <Typography variant="caption"></Typography>
                                <Typography variant="caption">
                                  {new Date(
                                    image.createdAt
                                  ).toLocaleDateString()}
                                </Typography>

                                {image.tag && (
                                  // <Box
                                  //   sx={{
                                  //     display: "flex",
                                  //     flexWrap: "wrap",
                                  //     gap: 0.5,
                                  //     mt: 0.5,
                                  //   }}
                                  // >
                                  <Box
                                    sx={{
                                      bgcolor: "rgba(255,255,255,0.2)",
                                      px: 1,
                                      py: 0.25,
                                      borderRadius: 1,
                                      fontSize: "10px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {image.tag.name}
                                  </Box>
                                  // </Box>
                                )}
                              </Box>
                            }
                            sx={{
                              borderRadius: "0 0 12px 12px",
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                              opacity: 0.9,
                              transition: "opacity 0.3s ease",
                              "& .MuiImageListItemBar-title": {
                                fontWeight: 500,
                                fontSize: "1rem",
                              },
                            }}
                            actionIcon={
                              <Box sx={{ display: "flex" }}>
                                <Tooltip title="Image Info">
                                  <IconButton
                                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePreviewClick(image);
                                    }}
                                  >
                                    <InfoRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Image Options">
                                  <IconButton
                                    sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMenuOpen(e, image);
                                    }}
                                  >
                                    <MoreVertRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            }
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  ) : (
                    // Gallery View
                    <Box sx={{ width: "100%" }}>
                      {currentImage && (
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {/* Navigation controls */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: 0,
                              right: 0,
                              display: "flex",
                              justifyContent: "space-between",
                              px: { xs: 1, sm: 2, md: 3 },
                              transform: "translateY(-50%)",
                              zIndex: 2,
                            }}
                          >
                            <IconButton
                              onClick={handlePrevImage}
                              sx={{
                                bgcolor: "rgba(255,255,255,0.8)",
                                color: "#e93345",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.9)",
                                },
                              }}
                            >
                              <ArrowBackIosRoundedIcon />
                            </IconButton>
                            <IconButton
                              onClick={handleNextImage}
                              sx={{
                                bgcolor: "rgba(255,255,255,0.8)",
                                color: "#e93345",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.9)",
                                },
                              }}
                            >
                              <ArrowForwardIosRoundedIcon />
                            </IconButton>
                          </Box>

                          {/* Image container */}
                          <Box
                            sx={{
                              width: "100%",
                              height: { xs: "300px", sm: "400px", md: "500px" },
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              bgcolor: "#f5f5f5",
                              borderRadius: "12px",
                              overflow: "hidden",
                            }}
                          >
                            {!brokenImages.includes(currentImage.id) ? (
                              <img
                                src={currentImage.imgUrl || "/placeholder.svg"}
                                alt={currentImage.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  padding: "16px",
                                  boxSizing: "border-box",
                                }}
                                onError={() =>
                                  handleImageError(currentImage.id)
                                }
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  // height: "100%",
                                  width: "100%",
                                }}
                              >
                                <BrokenImageRoundedIcon
                                  sx={{ fontSize: 80, color: "#ccc", mb: 2 }}
                                />
                                <Typography
                                  variant="body1"
                                  color="text.secondary"
                                >
                                  Image could not be loaded
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {/* Image info */}
                          <Box
                            sx={{
                              width: "100%",
                              mt: 2,
                              p: 2,
                              bgcolor: "#f5f5f5",
                              borderRadius: "12px",
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              justifyContent: "space-between",
                              alignItems: { xs: "flex-start", sm: "center" },
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography variant="h5" fontWeight={600}>
                                {currentImage.name}
                              </Typography>
                              <Typography variant="h6" fontWeight={200}>
                                {currentImage.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Uploaded on{" "}
                                {new Date(
                                  currentImage.createdAt
                                ).toLocaleDateString()}
                              </Typography>
                              {/* Add tags display to the gallery view (around line 530) */}
                              {currentImage.tag && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: alpha("#e93345", 0.1),
                                      color: "#e93345",
                                      px: 1.5,
                                      py: 0.5,
                                      borderRadius: 2,
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {currentImage.tag.name}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                variant="outlined"
                                startIcon={<EditRoundedIcon />}
                                onClick={() => handleUpdateClick(currentImage)}
                                sx={{
                                  borderColor: "#e93345",
                                  color: "#e93345",
                                  "&:hover": {
                                    borderColor: "#d62b3c",
                                    bgcolor: alpha("#e93345", 0.05),
                                  },
                                }}
                              >
                                Rename
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteOutlineRoundedIcon />}
                                onClick={() => handleDeleteClick(currentImage)}
                                sx={{
                                  borderColor: "#e93345",
                                  color: "#e93345",
                                  "&:hover": {
                                    borderColor: "#d62b3c",
                                    bgcolor: alpha("#e93345", 0.05),
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>

                          {/* Pagination indicator */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mt: 3,
                              gap: 0.5,
                            }}
                          >
                            {/* Update the pagination indicator to use filteredImages (around line 580) */}
                            {filteredImages.map((_, index) => (
                              <Box
                                key={index}
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  bgcolor:
                                    index === currentImageIndex
                                      ? "#e93345"
                                      : "#ccc",
                                  transition: "all 0.3s ease",
                                  cursor: "pointer",
                                }}
                                onClick={() => setCurrentImageIndex(index)}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Fade>
            ) : (
              <Fade in={true} timeout={500}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    px: 4,
                    bgcolor: "white",
                    borderRadius: "24px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    maxWidth: "700px",
                    mx: "auto",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "60px",
                      background:
                        "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 4,
                      boxShadow: "0 10px 20px rgba(233, 51, 69, 0.3)",
                    }}
                  >
                    <AddPhotoAlternateIcon
                      sx={{ fontSize: 60, color: "white" }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight={700}
                    color="#1a1a2e"
                    sx={{ mb: 2, letterSpacing: "-0.5px" }}
                  >
                    "No Images in This Album"
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}
                  >
                    "Start uploading photos to this album to showcase your
                    memories. It's easy to get started!"
                  </Typography>
                </Box>
              </Fade>
            )}
          </>
        )}
      </Box>
      {searchQuery && filteredImages.length === 0 && !loading ? (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 4,
              bgcolor: "white",
              borderRadius: "24px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              maxWidth: "700px",
              mx: "auto",
              mt: 2,
            }}
          >
            <Box
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "60px",
                background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
                boxShadow: "0 10px 20px rgba(233, 51, 69, 0.3)",
              }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 60, color: "white" }} />
            </Box>
            {/* Update the "No Images" message to reflect search results (around line 600) */}
            {/* Replace the Typography that says "No Images in This Album" with: */}
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={700}
              color="#1a1a2e"
              sx={{ mb: 2, letterSpacing: "-0.5px" }}
            >
              "No Images Match Your Search"
            </Typography>
            {/* Update the message below it: */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}
            >
              ? "Try adjusting your search terms or clear the search to see all
              images."
            </Typography>
            {/* Add a clear search button if there's a search query: */}
            <Button
              onClick={() => setSearchQuery("")}
              variant="outlined"
              sx={{
                color: "#666",
                borderColor: "#ddd",
                borderRadius: "12px",
                textTransform: "none",
                mb: 2,
                "&:hover": {
                  borderColor: "#bbb",
                  backgroundColor: "rgba(0,0,0,0.03)",
                },
              }}
            >
              Clear Search
            </Button>
          </Box>
        </Fade>
      ) : (
        <></>
      )}
      {/* Image Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
            width: 200,
          },
        }}
      >
        <MenuItem
          onClick={() => selectedImage && handleUpdateClick(selectedImage)}
          sx={{
            py: 1.5,
            "&:hover": { bgcolor: alpha("#e93345", 0.08) },
          }}
        >
          <EditRoundedIcon sx={{ mr: 1.5, color: "#555" }} />
          <Typography variant="body2">Rename Image</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => selectedImage && handleDeleteClick(selectedImage)}
          sx={{
            py: 1.5,
            color: "#e93345",
            "&:hover": { bgcolor: alpha("#e93345", 0.08) },
          }}
        >
          <DeleteOutlineRoundedIcon sx={{ mr: 1.5 }} />
          <Typography variant="body2">Delete Image</Typography>
        </MenuItem>
      </Menu>

      {/* Upload Image Modal */}
      <Dialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
            color: "white",
            py: 2.5,
            px: 3,
            fontWeight: 700,
          }}
        >
          Upload New Image
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <UploadImage albumId={Number(albumId)} imgUrl={undefined} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenUpload(false)}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ddd",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#bbb",
                backgroundColor: "rgba(0,0,0,0.03)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
            color: "white",
            py: 2.5,
            px: 3,
            fontWeight: 700,
          }}
        >
          Delete Image
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete the image{" "}
            <strong>{imageToDelete?.name}</strong>?
          </DialogContentText>
          <DialogContentText sx={{ color: "error.main", fontWeight: 500 }}>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ddd",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#bbb",
                backgroundColor: "rgba(0,0,0,0.03)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            startIcon={<DeleteOutlineRoundedIcon />}
            sx={{
              background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
              color: "#fff",
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 14px rgba(233, 51, 69, 0.3)",
              },
            }}
          >
            Delete Image
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Image Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
            color: "white",
            py: 2.5,
            px: 3,
            fontWeight: 700,
            mb: 2,
          }}
        >
          Rename Image
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <DialogContentText sx={{ mb: 1 }}>
            Enter a new name for this image:
          </DialogContentText>
          <Box
            component="input"
            type="text"
            value={newImageName}
            onChange={(e) => setNewImageName(e.target.value)}
            sx={{
              width: "90%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              "&:focus": {
                borderColor: "#e93345",
                boxShadow: "0 0 0 2px rgba(233, 51, 69, 0.2)",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenUpdateDialog(false)}
            variant="outlined"
            sx={{
              color: "#666",
              borderColor: "#ddd",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                borderColor: "#bbb",
                backgroundColor: "rgba(0,0,0,0.03)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmUpdate}
            variant="contained"
            startIcon={<EditRoundedIcon />}
            sx={{
              background: "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
              color: "#fff",
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 14px rgba(233, 51, 69, 0.3)",
              },
            }}
          >
            Update Name
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
            bgcolor: "black",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={() => setOpenPreview(false)}
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ✕
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              flexGrow: 1,
              minHeight: "400px",
            }}
          >
            {previewImage && !brokenImages.includes(previewImage.id) ? (
              <img
                src={previewImage.imgUrl || "/placeholder.svg"}
                alt={previewImage.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "50vh",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <BrokenImageRoundedIcon sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h6">Image could not be loaded</Typography>
              </Box>
            )}
          </Box>

          {previewImage && (
            <Box
              sx={{
                p: 3,
                bgcolor: "rgba(0,0,0,0.8)",
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {previewImage.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Uploaded on{" "}
                {new Date(previewImage.createdAt).toLocaleDateString()}
              </Typography>
              {/* Add tags to the image preview dialog (around line 900) */}
              {previewImage.tag && (
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)", mr: 1 }}
                  >
                    Tag:
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "12px",
                    }}
                  >
                    {previewImage.tag.name}
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  onClick={() => {
                    setOpenPreview(false);
                    handleUpdateClick(previewImage);
                  }}
                  variant="outlined"
                  startIcon={<EditRoundedIcon />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Rename
                </Button>
                <Button
                  onClick={() => {
                    setOpenPreview(false);
                    handleDeleteClick(previewImage);
                  }}
                  variant="outlined"
                  startIcon={<DeleteOutlineRoundedIcon />}
                  sx={{
                    color: "#ff6b6b",
                    borderColor: "rgba(255,107,107,0.3)",
                    "&:hover": {
                      borderColor: "#ff6b6b",
                      bgcolor: "rgba(255,107,107,0.1)",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default ShowImages;
