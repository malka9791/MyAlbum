import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch } from "../hook/authStore";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../hook/authAction";
import { Send, Person, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
type FormValues = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

// סכמת ולידציה עם כל השדות חובה
const schema = Yup.object().shape({
  fullName: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required(),
});

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setErrorMessage] = useState<string>("");
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "user",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const res = await dispatch(registerUser(data));
    console.log(res?.payload?.token);
    nav("/");

    if (!res?.payload?.token) {
      setErrorMessage(res.errorRes);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Box
          sx={{
            padding: 3,
            width: 400,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#e93345" mb={3}>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("fullName")}
              label="Full Name"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors?.fullName?.message}
              InputLabelProps={{ style: { color: " #e93345" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#e93345" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#e93345" },
                  "&:hover fieldset": { borderColor: "#f1ede9" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f1ede9 !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#e93345 !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#e93345" },
              }}
            />
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.email}
              helperText={errors?.email?.message}
              InputLabelProps={{ style: { color: " #e93345" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#e93345" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#e93345" },
                  "&:hover fieldset": { borderColor: "#f1ede9" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f1ede9 !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#e93345 !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#e93345" },
              }}
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.password}
              helperText={errors?.password?.message}
              InputLabelProps={{ style: { color: " #e93345" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#e93345" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#e93345" },
                  "&:hover fieldset": { borderColor: "#f1ede9" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e93345 !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#e93345 !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#e93345" },
              }}
            />

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
              endIcon={<Send />}
            >
              Sign Up
            </Button>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: "10px  10px" }}>Do you have an account?</p>
            <Link
              to="/login"
              style={{
                color: "#e93345",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
