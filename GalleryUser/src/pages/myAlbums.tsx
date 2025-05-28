import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import AddAlbum from "./addAlbum";
import { UserContext } from "../hook/user_context";
import LoadingSpinner from "../components/loading";
import { Album } from "../models/album";




const MyAlbums = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const userContext = useContext(UserContext);
  const UserId = userContext?.userId ?? null;
  const { token } = useContext(UserContext);
  const api = import.meta.env.VITE_API_URL;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [albumIdToDelete, setAlbumIdToDelete] = useState<number | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);

  const nav = useNavigate();

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await axios.get(`${api}/album/user/${UserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setAlbums(res.data);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };
    if (UserId) {
      getAlbums();
    }
  }, [UserId, loading]);

  const handleDeleteClick = (id: number) => {
    const album = albums.find((a) => a.id === id) || null;
    setAlbumIdToDelete(id);
    setAlbumToDelete(album);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/album/${albumIdToDelete}`);
      setLoading(true);
      setOpenDelete(false);
    } catch (error) {
      console.error("Error delete album:", error);
    }
  };

  // Generate a gradient based on album name
  const getAlbumGradient = (name: string) => {
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 80%, 55%), hsl(${hue2}, 80%, 45%))`;
  };

  // Generate placeholder image colors
  // const getPlaceholderColors = (index: number) => {
  //   const colors = [
  //     ["#FF9AA2", "#FFB7B2"],
  //     ["#FFDAC1", "#E2F0CB"],
  //     ["#B5EAD7", "#C7CEEA"],
  //     ["#E2F0CB", "#FFDAC1"],
  //     ["#C7CEEA", "#FF9AA2"],
  //   ]
  //   return colors[index % colors.length]
  // }

  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: "100%",
        margin: 0,
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
          mt: 3.5,
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: { xs: "24px 16px", sm: "32px 24px", md: "40px 32px" },
        }}
      >
        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {" "}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                // mb: { xs: 4, sm: 5 },
                width: "100%",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "#e93345",
                    // width: { xs: 48, sm: 56 },
                    // height: { xs: 48, sm: 56 },
                    // mr: 2,
                    boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                  }}
                >
                  <CollectionsRoundedIcon
                    sx={{ fontSize: { xs: 28, sm: 32 } }}
                  />
                </Avatar>
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
                    My Albums
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#666",
                      // mt: 0,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    {albums.length} {albums.length === 1 ? "album" : "albums"}{" "}
                    in your collection
                  </Typography>
                </Box>
              </Box>

              <Button
                onClick={() => setOpenAdd(true)}
                variant="contained"
                startIcon={<AddIcon />}
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
                Create New Album
              </Button>
            </Box>
          </>
        )}

        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          {albums.map((album, index) => {
            // const [color1, color2] = getPlaceholderColors(index)
            return (
              <Grid
                container
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={album.id}
                sx={{
                  paddingTop: "24px",
                  paddingLeft: { xs: "0px", sm: "24px" },
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <Fade in={true} timeout={300 + index * 100}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                      },
                      position: "relative",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        height: "140px",
                        background: getAlbumGradient(album.name),
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {album.images.length ?? 0 ? (
                        <AvatarGroup
                          max={4}
                          sx={{
                            position: "absolute",
                            bottom: "16px",
                            right: "16px",
                            "& .MuiAvatar-root": {
                              width: 40,
                              height: 40,
                              fontSize: "1rem",
                              border: "2px solid white",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          {Array.from({
                            length: Math.min(4, album.images.length),
                          }).map((_, i) => (
                            <Avatar
                              key={i}
                              sx={
                                {
                                  // bgcolor: i % 2 === 0 ? color1 : color2,
                                }
                              }
                            >
                              <ImageRoundedIcon />
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      ) : null}

                      <Typography
                        variant="h5"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          px: 3,
                          textAlign: "center",
                          zIndex: 1,
                        }}
                      >
                        {album.name}
                      </Typography>

                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          // background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
                          zIndex: 0,
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: alpha("#e93345", 0.1),
                            color: "#e93345",
                            py: 0.5,
                            px: 1.5,
                            borderRadius: "12px",
                          }}
                        >
                          <PhotoLibraryRoundedIcon
                            sx={{ fontSize: "1rem", mr: 0.5 }}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {album.images?.length ?? 0}{" "}
                            {album.images?.length === 1 ? "photo" : "photos"}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          minHeight: "60px",
                          fontStyle: album.description ? "normal" : "italic",
                          lineHeight: 1.6,
                        }}
                      >
                        {album.description
                          ? album.description
                          : "No description available"}
                      </Typography>

                      <Stack spacing={1.5} sx={{ mb: 2, mt: "auto" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <CalendarTodayRoundedIcon
                            sx={{ fontSize: "0.9rem", mr: 1, color: "#888" }}
                          />
                          <Typography variant="body2">
                            Created:{" "}
                            {new Date(album.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                          }}
                        >
                          <UpdateRoundedIcon
                            sx={{ fontSize: "0.9rem", mr: 1, color: "#888" }}
                          />
                          <Typography variant="body2">
                            Updated:{" "}
                            {new Date(album.updateAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Tooltip title="Edit Album">
                            <IconButton
                              onClick={() => nav(`/updateAlbum/${album.id}`)}
                              size="medium"
                              sx={{
                                color: "#555",
                                mr: 1,
                                "&:hover": {
                                  color: "#e93345",
                                  bgcolor: alpha("#e93345", 0.08),
                                },
                              }}
                            >
                              <EditRoundedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Album">
                            <IconButton
                              onClick={() => handleDeleteClick(album.id)}
                              size="medium"
                              sx={{
                                color: "#555",
                                "&:hover": {
                                  color: "#e93345",
                                  bgcolor: alpha("#e93345", 0.08),
                                },
                              }}
                            >
                              <DeleteRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Button
                          onClick={() => nav(`/showImages/${album.id}`)}
                          variant="contained"
                          startIcon={<PhotoLibraryRoundedIcon />}
                          sx={{
                            background:
                              "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                            color: "#fff",
                            textTransform: "none",
                            borderRadius: "10px",
                            boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              boxShadow: "0 6px 14px rgba(233, 51, 69, 0.3)",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          Open Album
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}

          {albums.length === 0 && !loading && (
            <Grid item xs={12}>
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
                    <CollectionsRoundedIcon
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
                    Your Album Collection is Empty
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}
                  >
                    Start creating beautiful photo albums to organize and
                    showcase your memories. It's easy to get started!
                  </Typography>
                  <Button
                    onClick={() => setOpenAdd(true)}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      background:
                        "linear-gradient(45deg, #e93345 30%, #ff6b6b 90%)",
                      color: "#fff",
                      fontSize: "16px",
                      textTransform: "none",
                      padding: "14px 32px",
                      borderRadius: "12px",
                      boxShadow: "0 6px 16px rgba(233, 51, 69, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 8px 20px rgba(233, 51, 69, 0.4)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    Create Your First Album
                  </Button>
                </Box>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Add Album Dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        // maxWidth="sm"
        // fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <AddAlbum />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenAdd(false)}
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
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
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
          Delete Album
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1, px: 3 }}>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete the album{" "}
            <strong>{albumToDelete?.name}</strong>?
            {albumToDelete && albumToDelete?.images?.length > 0 && (
              <span>
                {" "}
                This will also delete {albumToDelete.images.length} photos
                inside this album.
              </span>
            )}
          </DialogContentText>
          <DialogContentText sx={{ color: "error.main", fontWeight: 500 }}>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDelete(false)}
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
            startIcon={<DeleteRoundedIcon />}
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
            Delete Album
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAlbums;
