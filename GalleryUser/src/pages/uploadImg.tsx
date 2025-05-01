import {
  Button,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { UserContext } from "../hook/user_context";
type Tag = {
  id: number;
  name: string;
};
const UploadImage = ({ albumId }: { albumId: number | undefined }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [imgName, setImgName] = useState("");
  // const { albumId } = useParams();
  const [tags, setTags] = useState<Tag[] | null>();
  const [message, setErrorMessage] = useState<string>("");

  const [tagIdTOSend, setTagIdToSend] = useState<number | null>();
  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get(`${api}/tag`);
        setTags(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("error fetching album", error);
      }
    };
    getTags();
  }, [albumId]);
  //userId from useContext in storage
  const userContext = useContext(UserContext);
  const userId = userContext?.userId ?? null;
  // const api = "https://myalbum-api.onrender.com/api";
  const api = "http://localhost:5028/api";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId || !imgName) {
      setErrorMessage("Missing data! please, try again");
      return;
    }

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      console.log(file.name, file.type);
      console.log(
        `${api}/s3/presigned-url?fileName=${file.name}&fileType=${file.type}`
      );

      const response = await axios.get(`${api}/s3/presigned-url`, {
        params: { fileName: file.name, fileType: file.type },
      });

      console.log(response.data.url);
      console.log("here in s3");

      const presignedUrl = response.data.url;
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      try {
        console.log({
          name: imgName,
          userId: userId,
          albumId: Number(albumId),
          tagId: tagIdTOSend,
          imgUrl: presignedUrl,
          imgType: file.type,
        });
        const url = `https://albumaws-testpnoren.s3.us-east-1.amazonaws.com/${file.name}`;
        const res = await axios.post(`${api}/image`, {
          name: imgName,
          userId: userId,
          albumId: Number(albumId),
          tagId: tagIdTOSend,
          imgUrl: url,
          imgType: file.type,
        });

        console.log(res.data);
      } catch (error) {
        console.error("error fetching image", error);
      }
      alert(`הקובץ הועלה בהצלחה! `);
    } catch (error) {
      setErrorMessage("error in upload img");
    }
  };

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 4,
          width: 400,
          margin: "auto",
        }}
      > */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={imgName}
          onChange={({ target }) => setImgName(target.value)}
          helperText={imgName == "" ? "name is reduired" : ""}
          margin="normal"
          InputLabelProps={{ style: { color: "#e93345" } }}
          InputProps={{
            style: { color: "black" },
            startAdornment: (
              <InputAdornment position="start">
                <AddAPhotoOutlinedIcon sx={{ color: "#e93345" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#f1ede9" },
              "&.Mui-focused fieldset": {
                borderColor: "#f1ede9 !important",
              },
            },
          }}
        />
        <InputLabel id="tag-label" sx={{ color: "rgb(249, 4, 91)" }}>
          Tag
        </InputLabel>
        <Select
          fullWidth
          labelId="tag-label"
          id="demo-simple-select-helper"
          onChange={(e) => setTagIdToSend(Number(e.target.value) || null)}
          sx={{
            mb: 3,
            color: "black",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345 !important",
            },
          }}
        >
          {tags ? (
            tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>other</MenuItem>
          )}
        </Select>

        <TextField
          type="file"
          onChange={handleFileChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {message && <p style={{ color: "red" }}>{message}</p>}
        <Button
          onClick={handleUpload}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e93345",
            "&:hover": {
              backgroundColor: "#d0283b",
            },
          }}
        >
          העלה קובץ
        </Button>
        {progress > 0 && (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: "100%", marginTop: 2 }}
            />
            <div style={{ marginTop: 10 }}>התקדמות: {progress}%</div>
          </>
        )}
      {/* </Box> */}
    </>
  );
};
export default UploadImage;
