import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  FormHelperText,
  Select,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch } from "../hook/authStore";
import { useDispatch, UseDispatch } from "react-redux";
import { setUser } from "../hook/authSlice";
import Header from "../components/header";
import { useState } from "react";
import { registerUser } from "../hook/authAction";
import { PersonAdd,Send,Person,Email,Lock } from "@mui/icons-material";
import { Link } from "react-router";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// סכמת ולידציה עם כל השדות חובה
const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [notLogin, SetNotLogin] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const res = await dispatch(registerUser(data));
    console.log(res?.payload?.token);

    if (!res?.payload?.token) {
      SetNotLogin(true);
    }
  };

  return (
    <>
      <Header />
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
          <Typography
            variant="h5"
            fontWeight="bold"
            color="rgb(249, 4, 91)"
            mb={3}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
  {...register("firstName")}
  label="First Name"
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.firstName}
  helperText={errors?.firstName?.message}
  InputLabelProps={{ style: { color: " rgb(249, 4, 91)" } }}
  InputProps={{
    style: { color: " black" },
    startAdornment: (
      <InputAdornment position="start">
        <Person sx={{ color: "rgb(249, 4, 91)" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgb(249, 4, 91)" },
      "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
      "&.Mui-focused fieldset": { borderColor: "rgb(235, 255, 0) !important" },
      "&.Mui-error fieldset": { borderColor: "rgb(249, 4, 91) !important" },
    },
    "& .MuiFormHelperText-root": { color: "rgb(249, 4, 91)" },
  }}
/>
<TextField
  {...register("lastName")}
  label="Last Name"
  fullWidth
  margin="normal"
  variant="outlined"
  error={!!errors.lastName}
  helperText={errors?.lastName?.message}
  InputLabelProps={{ style: { color: " rgb(249, 4, 91)" } }}
  InputProps={{
    style: { color: " black" },
    startAdornment: (
      <InputAdornment position="start">
        <Person sx={{ color: "rgb(249, 4, 91)" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgb(249, 4, 91)" },
      "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
      "&.Mui-focused fieldset": { borderColor: "rgb(249, 4, 91) !important" },
      "&.Mui-error fieldset": { borderColor: "rgb(249, 4, 91) !important" },
    },
    "& .MuiFormHelperText-root": { color: "rgb(249, 4, 91)" },
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
  InputLabelProps={{ style: { color: " rgb(249, 4, 91)" } }}
  InputProps={{
    style: { color: " black" },
    startAdornment: (
      <InputAdornment position="start">
        <Email sx={{ color: "rgb(249, 4, 91)" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgb(249, 4, 91)" },
      "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
      "&.Mui-focused fieldset": { borderColor: "rgb(235, 255, 0) !important" },
      "&.Mui-error fieldset": { borderColor: "rgb(249, 4, 91) !important" },
    },
    "& .MuiFormHelperText-root": { color: "rgb(249, 4, 91)" },
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
  InputLabelProps={{ style: { color: " rgb(249, 4, 91)" } }}
  InputProps={{
    style: { color: " black" },
    startAdornment: (
      <InputAdornment position="start">
        <Lock sx={{ color: "rgb(249, 4, 91)" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgb(249, 4, 91)" },
      "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
      "&.Mui-focused fieldset": { borderColor: "rgb(249, 4, 91) !important" },
      "&.Mui-error fieldset": { borderColor: "rgb(249, 4, 91) !important" },
    },
    "& .MuiFormHelperText-root": { color: "rgb(249, 4, 91)" },
  }}
/>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "rgb(249, 4, 91)",
                color: "#fff",
                fontSize: "18px",
                margin: "normal",
                mt: 3,
                "&:hover": {
                  bgcolor: "rgb(235, 255, 0)",
                },
              }}
              size="large"
              endIcon={<Send />}
            >
              Sign Up
            </Button>
            {notLogin ? <h1>error!!!</h1> : <></>}
          </form>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <p style={{margin:"10px  10px"}}>Do you have an account?</p>
          <Link
            to="/login"
            style={{
              color: "rgb(249, 4, 91)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
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
