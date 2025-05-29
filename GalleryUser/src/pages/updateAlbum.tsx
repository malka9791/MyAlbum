import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../hook/user_context";
import { Album } from "../models/album";

//validation
const schema = yup.object().shape({
  name: yup.string(),
  description: yup.string().max(15, "Description can be max 15 characters"),
});
const UpdateAlbum = () => {
  //get albumId from params
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const api = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);
  const nav = useNavigate();
  //when there is albumId getalbum to Update
  useEffect(() => {
    if (albumId) {
      const getAlbum = async () => {
        try {
          const res = await axios.get(`${api}/album/${albumId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAlbum(res.data);
        } catch (error) {
          console.error("error fetching album", error);
        }
      };
      getAlbum();
    }
  }, [albumId]);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data: any) => {
    const sendData = {
      name: data.name ? data.name : album?.name,
      description: data.description ? data.description : "",
    };
    try {
      await axios.put(`${api}/album/${albumId}`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      nav("/myAlbums");
    } catch (error: any) {
      console.error("Error fetching albums:", error);
    }
  };
  return (
    // <Box
    //   sx={{
    //     minHeight: "100vh",
    //     backgroundColor: "#f3f3f3",
    //     paddingTop: 6,
    //     paddingBottom: 6,
    //   }}
    // >
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
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
            WebkitTextFillColor: "transparent",
          }}
        >
          Update {album?.name} Album
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Album Name"
            variant="outlined"
            fullWidth
            defaultValue={album?.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            InputLabelProps={{
              style: {
                color: "#e93345",
                fontWeight: "600",
                fontSize: "18px",
              },
            }}
            InputProps={{
              style: {
                color: "black",
                fontSize: "16px",
                fontWeight: "500",
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
                  borderWidth: "2px",
                },
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                  transform: "translateY(-2px)",
                },
                "&:hover fieldset": {
                  borderColor: "#f1ede9",
                  borderWidth: "2px",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(233, 51, 69, 0.3)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "3px",
                },
              },
            }}
          />

          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            defaultValue={album?.description}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
            InputLabelProps={{
              style: {
                color: "#e93345",
                fontWeight: "600",
                fontSize: "18px",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: "#fff",
                color: "black",
                fontSize: "16px",
                fontWeight: "500",
              },
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(233, 51, 69, 0.1)",
                transition: "all 0.3s ease",
                "& fieldset": {
                  borderColor: errors.description ? "#d32f2f" : "#e93345",
                  borderWidth: "2px",
                },
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(233, 51, 69, 0.2)",
                  transform: "translateY(-2px)",
                },
                "&:hover fieldset": {
                  borderColor: "#f1ede9",
                  borderWidth: "2px",
                },
                "&.Mui-focused": {
                  boxShadow: "0 6px 20px rgba(233, 51, 69, 0.3)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e93345 !important",
                  borderWidth: "3px",
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
                  transform: "translateY(-3px) scale(1.02)",
                },
                "&:active": {
                  transform: "translateY(-1px) scale(0.98)",
                },
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
    // </Box>
  );
};
export default UpdateAlbum;
