import {
  Button,
  Stack,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Header from "../components/header";
import { useForm } from "react-hook-form";
import { UserContext } from "../hook/login_context";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { SetName, SetUserId } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:5028/api/auth/login",
        data
      );      
      
      SetName(res.data.user.firstName);
      SetUserId(res.data.user.userId);
      alert("success");
      sessionStorage.setItem("token", res.data.token);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <br />
      <Box
        sx={{
          padding: 3,
          width: 400,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          textAlign: "center",
          opacity: 0.95,
        }}
      >
        <Typography variant="h4" color="rgb(249, 4, 91)" gutterBottom>
          Login
        </Typography>

        {/* שדה אימייל */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          InputLabelProps={{ style: { color: "rgb(249, 4, 91)" } }}
          InputProps={{
            style: { color: "black" },
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "rgb(249, 4, 91)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.email ? "red" : "rgb(249, 4, 91)",
              },
              "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(235, 255, 0) !important",
              },
            },
          }}
        />

        {/* שדה סיסמה עם כפתור הצגה/הסתרה */}
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          InputLabelProps={{ style: { color: "rgb(249, 4, 91)" } }}
          InputProps={{
            style: { color: "black" },
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: "rgb(249, 4, 91)" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{
                    color: "rgb(249, 4, 91)", // צבע ברירת מחדל - ורוד
                    "&:hover": {
                      color: "rgb(235, 255, 0)", // צבע צהוב כאשר מרחפים מעל
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.password ? "red" : "rgb(249, 4, 91)",
              },
              "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(235, 255, 0) !important",
              },
            },
          }}
        />

        {message && <p style={{ color: "red" }}>{message}</p>}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "rgb(235, 255, 0)",
              "&:hover": { backgroundColor: "rgb(235, 255, 0)", opacity: 0.9 },
            }}
          >
            Send
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ margin: "10px  10px" }}>Are you new?</p>
          <Link
            to="/signup"
            style={{
              color: "rgb(249, 4, 91)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            sign up
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default Login;
