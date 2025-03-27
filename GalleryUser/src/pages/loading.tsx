import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#rgb(249, 4, 91)",
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
