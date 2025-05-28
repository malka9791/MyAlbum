import { useContext, useState } from "react";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../hook/user_context";

const schema = yup.object().shape({
  name: yup.string().required("AlbumName is required"),
  description: yup.string().max(50, "Description can be max 50 characters"),
});

const AddAlbum = () => {
  const userContext = useContext(UserContext);
  const UserId = userContext?.userId ?? null;
  const api = import.meta.env.REACT_APP_API_URL;
  const { token } = useContext(UserContext);
  
  // State for success alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data:any) => {
    const albumData = {
      userId: Number(UserId),
      name: data.name,
      description: data.description,
    };
    console.log(albumData);
    try {
      const res = await axios.post(`${api}/album`, albumData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res);
      setShowSuccess(true);
      reset(); // Clear form after success
      
      // Navigate to albums page after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (error) {
      console.error("Error fetching albums:", error);
      setErrorMessage("Failed to add album. Please try again.");
      setShowError(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Box sx={{ maxWidth: "500", margin: "0 auto", padding: 3 }}>
    
        <Typography 
          variant="h3" 
          color="#e93345" 
          gutterBottom 
          textAlign="center"
          sx={{ 
            fontWeight: "bold",
            marginBottom: 4,
            textShadow: "0 2px 8px rgba(233, 51, 69, 0.2)",
            background: "linear-gradient(45deg, #e93345, #d82d42)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Add New Album
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Album Name"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            InputLabelProps={{ 
              style: { 
                color: "#e93345",
                fontWeight: "600",
                fontSize: "18px"
              } 
            }}
            InputProps={{
              style: { 
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#e93345", fontSize: 28 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(233, 51, 69, 0.1)",
                transition: "all 0.3s ease",
                "& fieldset": {
                  borderColor: errors.name ? "#d32f2f" : "#e93345",
                  borderWidth: "2px"
                },
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                  transform: "translateY(-2px)"
                },
                "&:hover fieldset": { 
                  borderColor: "#f1ede9",
                  borderWidth: "2px"
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(233, 51, 69, 0.3)",
                  transform: "translateY(-2px)"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "3px"
                },
              },
            }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
            InputLabelProps={{ 
              style: { 
                color: "#e93345",
                fontWeight: "600",
                fontSize: "18px"
              } 
            }}
            InputProps={{
              style: { 
                backgroundColor: "#fff", 
                color: "black",
                fontSize: "16px",
                fontWeight: "500"
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(233, 51, 69, 0.1)",
                transition: "all 0.3s ease",
                "& fieldset": {
                  borderColor: errors.description ? "#d32f2f" : "#e93345",
                  borderWidth: "2px"
                },
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                  transform: "translateY(-2px)"
                },
                "&:hover fieldset": { 
                  borderColor: "#f1ede9",
                  borderWidth: "2px"
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(233, 51, 69, 0.3)",
                  transform: "translateY(-2px)"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "3px"
                },
              },
            }}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 4 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                background: "linear-gradient(45deg, #e93345, #d82d42)",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "16px 0",
                borderRadius: "16px",
                textTransform: "none",
                boxShadow: "0 6px 20px rgba(233, 51, 69, 0.4)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": { 
                  background: "linear-gradient(45deg, #d82d42, #c22d42)",
                  boxShadow: "0 8px 25px rgba(233, 51, 69, 0.5)",
                  transform: "translateY(-3px) scale(1.02)"
                },
                "&:active": {
                  transform: "translateY(-1px) scale(0.98)"
                }
              }}
            >
              Add Album
            </Button>
          </Stack>
        </Box>

      {/* Success Alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          icon={<CheckCircle sx={{ fontSize: 28 }} />}
          sx={{
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "600",
            padding: "16px 24px",
            minWidth: "350px",
            boxShadow: "0 8px 32px rgba(76, 175, 80, 0.4)",
            background: "linear-gradient(45deg, #4caf50, #66bb6a)",
            "& .MuiAlert-message": {
              fontSize: "18px",
              fontWeight: "600"
            }
          }}
        >
          Album added successfully! 🎉 Redirecting to albums...
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "600",
            padding: "16px 24px",
            minWidth: "350px",
            boxShadow: "0 8px 32px rgba(244, 67, 54, 0.4)",
            background: "linear-gradient(45deg, #f44336, #e57373)",
            "& .MuiAlert-message": {
              fontSize: "18px",
              fontWeight: "600"
            }
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddAlbum;