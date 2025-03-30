import { Box, Button, LinearProgress, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const api = "http://localhost:5028/api";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // שלב 1: קבלת Presigned URL מהשרת
     
      
      const response = await axios.get(`${api}/s3/presigned-url`, {
        params: { fileName: file.name },
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
      alert(`הקובץ הועלה בהצלחה! ${presignedUrl}`);
    } catch (error) {
        
      console.error("שגיאה בהעלאה:", error);
    }
  };

  return (
    <>
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 4,
        width: 400,
        margin: 'auto',
      }}
    >
      <TextField
        type="file"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        onClick={handleUpload}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#e93345',
          '&:hover': {
            backgroundColor: '#d0283b',
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
            sx={{ width: '100%', marginTop: 2 }}
          />
          <div style={{ marginTop: 10 }}>התקדמות: {progress}%</div>
        </>
      )}
    </Box>
    </>
  );
};
export default UploadImage;
