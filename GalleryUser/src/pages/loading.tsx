import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // height: "",
      color: "#e93345",
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
