import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hook/login_context";
import axios from "axios";
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, Typography } from "@mui/material";
import { Link } from "react-router";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddAlbum from "./addAlbum";

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
  const [open, setOpen] = useState(false);

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
    onClick={() => setOpen(true)}

    //   component={Link}
    //   to="/addAlbum"
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
    {/* modal to add album */}
    <Modal open={open} onClose={() => setOpen(false)}>
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
          {/* כאן מוצגת קומפוננטה אחרת */}
          <AddAlbum/>

          <Button
            onClick={() => setOpen(false)}
            sx={{ mt: 2, color: "rgb(249, 4, 91)" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MyAlbums;
