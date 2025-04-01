import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#e93345",
    }}
  >
    <CircularProgress disableShrink sx={{ color: "#e93345" }} />
    <h2>Loading your Albums...</h2>
  </Box>
);

export default LoadingSpinner;
