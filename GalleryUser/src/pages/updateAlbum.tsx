import { useContext, useEffect, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Description, Person } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { UserContext } from "../hook/user_context";
type Album = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  userId: number;
  images: any[];
};
const schema = yup.object().shape({
  name: yup.string(),
  description: yup.string().max(15, "Description can be max 15 characters"),
});
const UpdateAlbum = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const api = "http://localhost:5028/api";
  const nav=useNavigate();
  useEffect(() => {
    if (albumId) {
      const getAlbum = async () => {
        console.log("here");

        try {
          const res = await axios.get(`${api}/album/${albumId}`);
          setAlbum(res.data);
          console.log(res.data);
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
      const res = await axios.put(`${api}/album/${albumId}`, sendData);
      console.log(res);
      nav("/myAlbums");
    } catch (error: any) {
      console.error("Error fetching albums:", error);
    }
  };
  return (
    <>
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
          Update {album?.name} Album
        </Typography>
        <TextField
          label="Name"
          placeholder={album?.name ? album.name : ""}
          variant="outlined"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          InputLabelProps={{ style: { color: "rgb(249, 4, 91)" } }}
          InputProps={{
            style: { color: "black" },
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "rgb(249, 4, 91)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.name ? "red" : "rgb(249, 4, 91)",
              },
              "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(235, 255, 0) !important",
              },
            },
          }}
        />

        <TextField
          label="Description"
          id="filled-multiline-static"
          fullWidth
          multiline
          placeholder={album?.description ? album.description : ""}
          rows={2}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          InputLabelProps={{ style: { color: "rgb(249, 4, 91)" } }}
          InputProps={{
            style: { backgroundColor: "#ffff", color: "black" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.description ? "red" : "rgb(249, 4, 91)",
              },
              "&:hover fieldset": { borderColor: "rgb(235, 255, 0)" },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(235, 255, 0) !important",
              },
            },
          }}
        />


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
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};
export default UpdateAlbum;
