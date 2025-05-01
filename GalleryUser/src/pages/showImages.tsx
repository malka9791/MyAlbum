import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";
import UploadImage from "./uploadImg";
import InfoIcon from "@mui/icons-material/Info";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
type Album = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
  userId: number;
  images: Image[];
};
type Image = {
  id: number;
  name: string;
  imgUrl: string;
  imgType: string;
  createdAt: Date;
  tag: any;
};
const ShowImages = () => {
  const { albumId } = useParams();
  const [imagesUrl, setImageUrls] = useState<Image[]>();
  const [openUpload, setopenUpload] = useState(false); //open add album dialog
  const [brokenImages, setBrokenImages] = useState<number[]>([]);

  const handleImageError = (id: number) => {
    setBrokenImages((prev) => [...prev, id]);
  };
  const api = "http://localhost:5028/api";
  useEffect(() => {
    const getAlbum = async () => {
      try {
         const albumResponse = await axios.get<Album>(`${api}/album/${albumId}`);
     setImageUrls(albumResponse.data?.images) ; // הנחה שה-API מחזיר מערך של imageKeys
      } catch (error) {
        console.error("error fetching album", error);
      }
    };
    if(albumId)
    {
        getAlbum();
    }
  }, [albumId]);

  return (
    <>
   
   <Box sx={{ 
    // width: "100%",
     maxWidth: 1200, 
     mx: "auto",
      p: 2 }}>
      {imagesUrl && imagesUrl.length > 0 ? (
        <ImageList variant="standard" 
     cols={5} gap={16}
        // cols={{ xs: 1, sm: 2, md: 3 }} 
        // gap={16}
        >
          {imagesUrl.map((image) => (
            <ImageListItem key={image.id} sx={{ borderRadius: 2, overflow: "hidden" }}>
              {!brokenImages.includes(image.id) ? (
                <img
                  src={image.imgUrl}
                  alt={image.name}
                  loading="lazy"
                  onError={() => handleImageError(image.id)}
                  style={{ 
                    // width: "100%", 
                    height: "auto", borderRadius: 8 }}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#eee",
                  }}
                >
                  <BrokenImageIcon sx={{ fontSize: 60, color: "#ccc" }} />
                </Box>
              )}
              <ImageListItemBar
                title={image.name}
                actionIcon={
                  <IconButton sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    <InfoIcon />
                  </IconButton>
                }
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No images to display
        </Typography>
      )}
    </Box>
    <Button
          onClick={() => setopenUpload(true)}
          variant="contained"
          // startIcon={<CreateNewFolderIcon />}
          sx={{
            backgroundColor: "#e93345",
            color: "#fff",
            fontSize: "18px",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f1ede9",
              color: "black",
            },
          }}
        >
          Upload Image
        </Button>
        {/* modal of uploadImage */}
        <Modal open={openUpload} onClose={() => setopenUpload(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
             left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* add component here*/}
          <UploadImage albumId={Number(albumId)}/>

          <Button
            onClick={() => setopenUpload(false)}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
  </>);
};

export default ShowImages;
