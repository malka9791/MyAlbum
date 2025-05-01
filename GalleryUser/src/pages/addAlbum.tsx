import { useContext } from "react";
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person } from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../hook/user_context";
const schema = yup.object().shape({
  name: yup.string().required("AlbumName is required"),
  description: yup.string().max(50, "Description can be max 50 characters"),
});
const AddAlbum = () => {
  const userContext = useContext(UserContext);
  const UserId = userContext?.userId ?? null;

  // const [messege, SetMessege] = useState<string>("");
  const api = "https://myalbum-api.onrender.com/api";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data: any) => {
    console.log(data);

    const albumData = {
      UserId: UserId,
      Name: data.name,
      Description: data.description,
    };
    // console.log(albumData);

    try {
      const res = await axios.post(`${api}/album`, albumData);
      console.log(res);
      alert("add album success");
    } catch (error: any) {
      console.error("Error fetching albums:", error);
    }
  };
  return (
    <>
      <Typography variant="h4" color="#e93345" gutterBottom>
        Add New Album
      </Typography>

      {/* שדה אימייל */}
      <TextField
        label="Name"
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
            "&:hover fieldset": { borderColor: "#f1ede9" },
            "&.Mui-focused fieldset": {
              borderColor: "#f1ede9 !important",
            },
          },
        }}
      />

      <TextField
        label="Description"
        id="filled-multiline-static"
        fullWidth
        multiline
        rows={4}
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
            "&:hover fieldset": { borderColor: "#f1ede9" },
            "&.Mui-focused fieldset": {
              borderColor: "#f1ede9 !important",
            },
          },
        }}
      />

      {/* {messege && <p style={{ color: "red" }}>{messege}</p>} */}

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
            backgroundColor: "#f1ede9",
            "&:hover": { backgroundColor: "#f1ede9", opacity: 0.9 },
          }}
        >
          Add
        </Button>
      </Stack>
    </>
  );
};
export default AddAlbum;
