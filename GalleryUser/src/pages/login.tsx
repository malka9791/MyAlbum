import {
  Button,
  Stack,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginIcon from "@mui/icons-material/Login";
import Header from "../components/header";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../hook/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../hook/authStore";

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
  // const { SetName, SetUserId } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data: any) => {
    console.log("in submit ", data);
    const res = await dispatch(login(data));
    if (res.token) {
      console.log(res?.payload?.token);
      nav("/");
    }
    if (!res.token) {
      console.log(res.errorRes);
      setErrorMessage(res.errorRes);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        <Typography variant="h4" color="#e93345" gutterBottom>
          Login
        </Typography>

        {/* שדה אימייל */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#e93345" } }}
            InputProps={{
              style: { color: "black" },
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#e93345" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errors.email ? "red" : "#e93345",
                },
                "&:hover fieldset": { borderColor: "#f1ede9" },
                "&.Mui-focused fieldset": {
                  borderColor: "#f1ede9 !important",
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
            InputLabelProps={{ style: { color: "#e93345" } }}
            InputProps={{
              style: { color: "black" },
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#e93345" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{
                      color: "#e93345", // צבע ברירת מחדל - ורוד
                      "&:hover": {
                        color: "#f1ede9", // צבע צהוב כאשר מרחפים מעל
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
                  borderColor: errors.password ? "red" : "#e93345",
                },
                "&:hover fieldset": { borderColor: "#f1ede9" },
                "&.Mui-focused fieldset": {
                  borderColor: "#f1ede9 !important",
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
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#e93345",
                color: "#fff",
                fontSize: "18px",
                margin: "normal",
                mt: 3,
                "&:hover": {
                  bgcolor: "#f1ede9",
                },
              }}
              size="large"
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
          </Stack>
        </form>
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
              color: "#e93345",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            sign up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
