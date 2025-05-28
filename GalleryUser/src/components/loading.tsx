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
<CircularProgress
  disableShrink
  size={80} // ברירת מחדל היא 40
  sx={{ color: "#e93345" }}
/>
  </Box>
);

export default LoadingSpinner;
