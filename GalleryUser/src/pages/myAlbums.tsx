import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hook/login_context";
import axios from "axios";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import { Link } from "react-router";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

type Album = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  userId: number;
  images: any[];
};
// type Image={
//     id :number,
//     imgUrl :string,
//     imgType :string,
//     createdAt :Date,
//      tag :any,
// }

const MyAlbums = () => {
  const api = "http://localhost:5028/api";
  const [albums, setAlbums] = useState<Album[]>([]);
  const { name } = useContext(UserContext);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await axios.get(`${api}/album`);
        setAlbums(res.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    getAlbums();
  }, []);

  return (
    <>
    <Grid container spacing={3} sx={{ m: 3 }}>
      {albums.map((album) => (
        <Grid 
         key={album.id}>
          <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {album.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {album.description}
              </Typography>
              <Typography variant="body2" color="primary">
                Files: {album.images?.length ?? 0}
              </Typography>
              <Typography variant="caption" color="gray">
                Created: {new Date(album.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      
    </Grid>
    <Button
      component={Link}
      to="/addAlbum"
      variant="contained"
      startIcon={<CreateNewFolderIcon />}
      sx={{
        backgroundColor: "rgb(249, 4, 91)",
        color: "#fff",
        fontSize: "18px",
        textTransform: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "rgb(235, 255, 0)",
          color: "black",
        },
      }}
    >
      Add Album
    </Button>
    
    </>
  );
};

export default MyAlbums;
