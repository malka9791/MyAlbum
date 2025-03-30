import { useEffect, useState } from "react";
import {
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
import {  Person } from "@mui/icons-material";
import {  useNavigate, useParams } from "react-router";
import axios from "axios";
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
        <Typography variant="h4" color="#e93345" gutterBottom>
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
          InputLabelProps={{ style: { color: "#e93345" } }}
          InputProps={{
            style: { color: "black" },
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#e93345" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.name ? "red" : "#e93345",
              },
              "&:hover fieldset": { borderColor: "#d0d0d0" },
              "&.Mui-focused fieldset": {
                borderColor: "#d0d0d0 !important",
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
          InputLabelProps={{ style: { color: "#e93345" } }}
          InputProps={{
            style: { backgroundColor: "#ffff", color: "black" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errors.description ? "red" : "#e93345",
              },
              "&:hover fieldset": { borderColor: "#d0d0d0" },
              "&.Mui-focused fieldset": {
                borderColor: "#d0d0d0 !important",
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
              backgroundColor: "#d0d0d0",
              "&:hover": { backgroundColor: "#d0d0d0", opacity: 0.9 },
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
