import { CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../hook/user_context";

type Album = {
  id: number;
  name: string;
};

const api = "http://localhost:5028/api"; // או כל כתובת שלך

export const AlbumSelect = ({
  selectedAlbumId,
  setSelectedAlbumId,
}: {
  selectedAlbumId: number | null;
  setSelectedAlbumId: (id: number) => void;
}) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
    const {userId}=useContext(UserContext);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${api}/album/user/${userId}`);
        setAlbums(res.data);
      } catch (err) {
        console.error("Failed to fetch albums", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <>
      <InputLabel sx={{ mt: 2, mb: 1, color: "rgb(249, 4, 91)" }}>
        בחר אלבום
      </InputLabel>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Select
          fullWidth
          value={selectedAlbumId ?? ""}
          onChange={(e) => setSelectedAlbumId(Number(e.target.value))}
          sx={{
            mb: 2,
            color: "black",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345",
            },
          }}
        >
          {albums.map((album) => (
            <MenuItem key={album.id} value={album.id}>
              {album.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};
