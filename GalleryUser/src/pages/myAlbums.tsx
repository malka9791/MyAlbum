import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddAlbum from "./addAlbum";
import { UserContext } from "../hook/user_context";
import EditIcon from "@mui/icons-material/Edit";
import FolderDeleteIcon from "@mui/icons-material/FolderDeleteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import LoadingSpinner from "./loading";
type Album = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
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
  const userContext = useContext(UserContext);
  const UserId = userContext?.userId ?? null;
  const api = "http://localhost:5028/api";
  const [albums, setAlbums] = useState<Album[]>([]); //list of albums
  const [openAdd, setopenAdd] = useState(false); //open add album dialog
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await axios.get(`${api}/album/user/${UserId}`);
        if(res.status==200)
        {setLoading(false)}
        setAlbums(res.data)
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };
    if (UserId) {
      getAlbums();
    }
  }, [UserId, loading]);
  // delete album
  const [openDeleten, setOpenDelete] = useState(false);
  const [albumIdToDelete, setAlbumIdToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setAlbumIdToDelete(id);
    setOpenDelete(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/album/${albumIdToDelete}`);
      alert("delete success");
      setLoading(true);
      setOpenDelete(false);
    } catch (error) {
      console.error("Error delete album:", error);
    }
  };
  return (
    <>
      {loading ? <LoadingSpinner /> : ""}

      <Grid 
      container 
      sx={{ 
        mt:8
      }}

      >
        {albums.map((album) => (
          <Grid key={album.id}>
            
            <Card
              sx={{ maxWidth: 250, borderRadius: 2, boxShadow: 3, p: 1, 
                m: 2
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {album.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {album.description
                    ? album.description
                    : "there isn't description"}
                </Typography>
                <Typography variant="body2" color="primary">
                  Files: {album.images?.length ?? 0}
                </Typography>
                <Typography variant="caption" color="gray">
                  Created: {new Date(album.createdAt).toLocaleDateString()}
                </Typography>
                <br />
                <Typography variant="caption" color="gray">
                  update At: {new Date(album.updateAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              {/* update button */}
              <Button
                onClick={() => {
                  nav(`/updateAlbum/${album.id}`);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#e93345",
                  color: "#fff",
                  fontSize: "18px",
                  textTransform: "none",
                  padding: "7px",
                  borderRadius: "8px",
                  transition: "0.3s",
                  mr: 2,
                  "&:hover": {
                    backgroundColor: "#f1ede9",
                    color: "black",
                  },
                }}
              >
                <EditIcon />
              </Button>
              {/* <Modal open={openUpdate} onClose={() => setopenUpdate(false)}>
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
                  {<UpdateAlbum albumId={albumIdToUpdate} />}

                  <Button
                    onClick={() => setopenUpdate(false)}
                    sx={{ mt: 2, color: "#e93345" }}
                  >
                    Close
                  </Button>
                </Box>
              </Modal> */}
              {/* delete album */}
              <Button
                onClick={() => {
                  handleDeleteClick(album.id);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#e93345",
                  color: "#fff",
                  fontSize: "18px",
                  textTransform: "none",
                  padding: "7px",
                  borderRadius: "8px",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#f1ede9",
                    color: "black",
                  },
                }}
              >
                <FolderDeleteIcon />
              </Button>
              {/* end delete */}
              {/* show pictures button */}
              {!loading ? (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#e93345",
                    color: "#fff",
                    fontSize: "12px",
                    mt: 3,
                    "&:hover": {
                      bgcolor: "#f1ede9",
                      color:"black"
                    },
                  }}
                  size="small"
                  endIcon={<PermMediaOutlinedIcon />}
                >
                  Show Pictures
                </Button>
              ) : (
                ""
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* add album modal */}
      {!loading ? (
        <Button
          onClick={() => setopenAdd(true)}
          variant="contained"
          startIcon={<CreateNewFolderIcon />}
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
          Add Album
        </Button>
      ) : (
        ""
      )}
      {/* modal to add album */}
      <Modal open={openAdd} onClose={() => setopenAdd(false)}>
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
          <AddAlbum />

          <Button
            onClick={() => setopenAdd(false)}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Modal open={openDeleten} onClose={() => setOpenDelete(false)}>
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
          <Typography variant="h4" color="#e93345" gutterBottom>
            Are you sure you want delete this album?
          </Typography>
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Close
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ mt: 2, color: "#e93345" }}
          >
            Yes
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MyAlbums;
