import {
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  FormHelperText,
  Select,
  InputLabel,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { AppDispatch } from "./authStore";
import { useDispatch, UseDispatch } from "react-redux";
import { signUp } from "./authSlice";
import Header from "./header";
import { useState } from "react";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
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
  role: Yup.string().required("Role is required"),
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
      role: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const res = dispatch(
      signUp({
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
        },
      })
    );
    if (res.payload.token == "") {
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
            backgroundColor: "#ffffff",
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
              InputLabelProps={{
                style: { color: " rgb(249, 4, 91)" }, // צבע הכיתוב תמיד יהיה שחור
              }}
              InputProps={{
                style: { color: " black" }, // צבע הטקסט בשדה גם יהיה שחור
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(249, 4, 91)", // גבול ורוד
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(235, 255, 0)", // לא יהיה תכלת, רק ורוד
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(235, 255, 0) !important", // צבע מסגרת כשהשדה בפוקוס
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת במקרה של שגיאה
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgb(249, 4, 91)", // צבע הודעת השגיאה
                },
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
              InputLabelProps={{
                style: { color: " rgb(249, 4, 91)" }, // צבע הכיתוב תמיד יהיה שחור
              }}
              InputProps={{
                style: { color: " black" }, // צבע הטקסט בשדה גם יהיה שחור
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(249, 4, 91)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(235, 255, 0)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת כשהשדה בפוקוס
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת במקרה של שגיאה
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgb(249, 4, 91)", // צבע הודעת השגיאה
                },
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
              InputLabelProps={{
                style: { color: " rgb(249, 4, 91)" }, // צבע הכיתוב תמיד יהיה שחור
              }}
              InputProps={{
                style: { color: " black" }, // צבע הטקסט בשדה גם יהיה שחור
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(249, 4, 91)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(235, 255, 0)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת כשהשדה בפוקוס
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת במקרה של שגיאה
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgb(249, 4, 91)", // צבע הודעת השגיאה
                },
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
              InputLabelProps={{
                style: { color: " rgb(249, 4, 91)" }, // צבע הכיתוב תמיד יהיה שחור
              }}
              InputProps={{
                style: { color: " black" }, // צבע הטקסט בשדה גם יהיה שחור
              }}
              helperText={errors?.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(249, 4, 91)", // צבע מסגרת רגיל
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(235, 255, 0)", // צבע מסגרת כשמרחפים
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת כשהשדה בפוקוס
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "rgb(249, 4, 91) !important", // צבע מסגרת במקרה של שגיאה
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgb(249, 4, 91)", // צבע הודעת השגיאה
                },
              }}
            />

            <InputLabel sx={{ color: "rgb(249, 4, 91)" }}>Role</InputLabel>
            <Select
            fullWidth
            
              {...register("role")}
              defaultValue="" // הגדרה לערך ברירת מחדל ריק
              sx={{
                color: "black",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(249, 4, 91)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(235, 255, 0)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(235, 255, 0) !important",
                },
                "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(249, 4, 91) !important",
                },
              }}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="GUEST">Guest</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText 
               sx={{color: "rgb(249, 4, 91) !important"}} 
                >{errors.role.message}</FormHelperText>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "rgb(249, 4, 91)",
                color: "#fff",
                fontSize: "18px",
                margin:"normal",
                "&:hover": {
                  bgcolor: "rgb(235, 255, 0)",
                },
              }}
              size="large"
              endIcon={<SendIcon />}
            >
              Sign Up
            </Button>
            {notLogin ? <h1>error!!!</h1> : <></>}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
