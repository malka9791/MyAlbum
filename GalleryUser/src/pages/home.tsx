import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Camera,
  Cloud,
  Palette,
  Share,
  Security,
  Speed,
  Upload,
  PlayArrow,
  Check,
  ArrowForward,
  Star,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router";

// יצירת תמה מותאמת עם הצבע שלך
const theme = createTheme({
  palette: {
    primary: {
      main: "#e93345",
      light: "#ff6b7a",
      dark: "#d12b3a",
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  direction: "rtl",
});

export default function MyAlbumHomepage() {
  const features = [
    {
      icon: <Cloud sx={{ fontSize: 40, color: "#2196f3" }} />,
      title: "Secure Cloud Storage",
      description:
        "Your photos are safely stored in the cloud with automatic backup",
      bgColor: "#e3f2fd",
    },
    {
      icon: <Palette sx={{ fontSize: 40, color: "#9c27b0" }} />,
      title: "AI Album Design",
      description:
        "Give a description and let AI generate a beautifully designed album",
      bgColor: "#f3e5f5",
    },
    {
      icon: <Share sx={{ fontSize: 40, color: "#4caf50" }} />,
      title: "Album Sharing",
      description: "Easily share albums with family and friends (coming soon)",
      bgColor: "#e8f5e8",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#ff9800" }} />,
      title: "Full Privacy",
      description:
        "Complete control over who sees what, with advanced privacy protection",
      bgColor: "#fff3e0",
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: "#f44336" }} />,
      title: "Lightning Fast",
      description: "Fast uploads and smooth browsing through all your albums",
      bgColor: "#ffebee",
    },
    {
      icon: <Camera sx={{ fontSize: 40, color: "#607d8b" }} />,
      title: "Easy Management",
      description:
        "A simple and intuitive interface to manage your albums and photos",
      bgColor: "#eceff1",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #e93345 0%, #ff6b7a 100%)",
            color: "white",
            py: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                  <Chip
                    icon={<Palette />}
                    label="New: Album design with AI"
                    sx={{
                      mb: 3,
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "4rem" },
                      mb: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    MYALBUM
                    <br />
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        fontWeight: 400,
                        opacity: 0.9,
                      }}
                    >
                      keep the beautiful moments
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ mb: 4, opacity: 0.95, lineHeight: 1.6 }}
                  >
                    Save your beautiful moments in the cloud with smart album
                    design using AI
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Upload />}
                      sx={{
                        bgcolor: "white",
                        color: "primary.main",
                        "&:hover": { bgcolor: "grey.100" },
                        py: 1.5,
                        px: 4,
                      }}
                    >
                      Upload Images
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      component={Link}
                      to="/login"
                      sx={{
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          color: "white",
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                        py: 1.5,
                        px: 4,
                      }}
                    >
                      Log in to your account
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      gap: 3,
                      flexWrap: "wrap",
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Check sx={{ fontSize: 20 }} />
                      <Typography variant="body2">
                        Free during website launch
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Check sx={{ fontSize: 20 }} />
                      <Typography variant="body2">Secure website</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Check sx={{ fontSize: 20 }} />
                      <Typography variant="body2">
                        Setup in 30 seconds
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    transform: { md: "rotate(3deg)" },
                    transition: "transform 0.3s",
                    "&:hover": { transform: { md: "rotate(0deg)" } },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "#e93345",
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "#ffc107",
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "#4caf50",
                        }}
                      />
                    </Box>
                    <Chip label="AI Designer" color="primary" size="small" />
                  </Box>
                  <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Description for AI:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      " Picture of a child playing "
                    </Typography>
                  </Paper>
                  <Grid container spacing={1}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Grid item xs={4} key={i}>
                        <Paper
                          sx={{
                            aspectRatio: "1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
                          }}
                        >
                          <Camera sx={{ color: "#e93345", fontSize: 24 }} />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Features you’ll find only here
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              MYALBUM brings you advanced technology that makes photo management
              fun and simple
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        bgcolor: feature.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* How it Works */}
        <Box sx={{ bgcolor: "grey.50", py: 10 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h2"
                sx={{ mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
              >
                How does it work?
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Three simple steps to perfect albums
              </Typography>
            </Box>

            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        mx: "auto",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <Upload sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Chip
                      label="1"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: "calc(50% - 40px)",
                        bgcolor: "#ffc107",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Upload photos
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Easily upload your photos from the computer. Your photos are
                    safely stored in the cloud.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        mx: "auto",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <Palette sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Chip
                      label="2"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: "calc(50% - 40px)",
                        bgcolor: "#ffc107",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Give AI a description
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Write a short description for the uploaded photo –
                    "Wedding", "Family Trip", or any other idea.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "primary.main",
                        mx: "auto",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    >
                      <Star sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Chip
                      label="3"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: "calc(50% - 40px)",
                        bgcolor: "#ffc107",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Get the perfect album
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    The AI will create a designed photo with a custom element,
                    beautiful layout, and all the small details.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #e93345 0%, #ff6b7a 100%)",
            color: "white",
            py: 10,
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                sx={{ mb: 3, fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Ready to start saving your moments?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of users already creating amazing albums with
                MYALBUM
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  size="large"
                  startIcon={<Camera />}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "grey.100",
                      color: "primary.main",
                      borderColor: "white",
                    },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Sign up for free now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowForward />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Already have an account?
                </Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
                Free • Photo Security
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, opacity: 0.8 }}>
                © MyAlbum System by m. Elkayam {new Date().getFullYear()} | All
                rights reserved
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
