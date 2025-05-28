
import type React from "react"
import { Box, Button, Container, Paper, Typography, Fade } from "@mui/material"
import {
  ErrorOutline as ErrorIcon,
  SentimentVeryDissatisfied as SadIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  LockOutlined as LockIcon,
  CloudOff as CloudOffIcon,
} from "@mui/icons-material"

const ErrorPage: React.FC = () => {

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <Container maxWidth="md">
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            py: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "24px",
              background: "linear-gradient(145deg, #ffffff, #f0f4f8)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              maxWidth: "100%",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Background decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(239, 83, 80, 0.08)",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(239, 83, 80, 0.05)",
                zIndex: 0,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              {/* Error Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ef5350 0%, #e53935 100%)",
                    boxShadow: "0 15px 30px rgba(239, 83, 80, 0.3)",
                    mb: 3,
                  }}
                >
                  <ErrorIcon
                    sx={{
                      fontSize: { xs: 50, md: 60 },
                      color: "white",
                    }}
                  />
                </Box>
              </Box>

              {/* Error Code */}
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#e53935",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "0 2px 10px rgba(239, 83, 80, 0.2)",
                }}
              >
                Oops!
              </Typography>

              {/* Main Error Message */}
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "#424242",
                  mb: 3,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Server Error or Permission Issue
              </Typography>

              {/* Error Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "#757575",
                  mb: 4,
                  maxWidth: "500px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                We're sorry, but something went wrong on our server or you might not have permission to access this
                resource. Please try again later or contact support if the problem persists.
              </Typography>

              {/* Error Details */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "12px",
                  backgroundColor: "rgba(239, 83, 80, 0.05)",
                  border: "1px dashed rgba(239, 83, 80, 0.3)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <CloudOffIcon sx={{ color: "#e53935" }} />
                  <Typography sx={{ color: "#616161", fontWeight: 500 }}>Server Connection Issue</Typography>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                    width: "1px",
                    height: "30px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <LockIcon sx={{ color: "#e53935" }} />
                  <Typography sx={{ color: "#616161", fontWeight: 500 }}>Permission Denied</Typography>
                </Box>
              </Paper>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    backgroundColor: "#e53935",
                    boxShadow: "0 8px 20px rgba(239, 83, 80, 0.3)",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      boxShadow: "0 10px 25px rgba(239, 83, 80, 0.4)",
                    },
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderColor: "#e53935",
                    color: "#e53935",
                    "&:hover": {
                      borderColor: "#d32f2f",
                      backgroundColor: "rgba(239, 83, 80, 0.05)",
                    },
                  }}
                >
                  Go to Homepage
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Footer */}
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1 }}>
            <SadIcon sx={{ color: "#9e9e9e", fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
              If you need assistance, please contact our support team.
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Container>
  )
}

export default ErrorPage
