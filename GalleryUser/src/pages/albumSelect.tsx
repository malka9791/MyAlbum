import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../hook/user_context";

type Album = {
  id: number;
  name: string;
};

const api = import.meta.env.REACT_APP_API_URL;

export const AlbumSelect = ({
  selectedAlbumId,
  setSelectedAlbumId,
}: {
  selectedAlbumId: number | null;
  setSelectedAlbumId: (id: number) => void;
}) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const { token, userId } = useContext(UserContext);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${api}/album/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlbums(res.data);
      } catch (err) {
        console.error("Failed to fetch albums", err);
      }
    };

    if (userId) {
      fetchAlbums();
    }
  }, [userId, token]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedAlbumId(Number(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="album-label"
        sx={{
          color: "#e93345",
          fontWeight: 500,
          "&.Mui-focused": {
            color: "#e93345",
          },
        }}
      >
        Album
      </InputLabel>
      <Select
        labelId="album-label"
        id="album-select"
        value={selectedAlbumId ?? ""}
        label="Album"
        onChange={handleChange}
        sx={{
          mb: 1,
          borderRadius: "12px",
          backgroundColor: "#fafafa",
          color: "black",
          fontSize: "15px",
          transition: "all 0.3s ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "&:hover": {
            backgroundColor: "#f5f5f5",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345",
              borderWidth: "2px",
            },
          },
          "&.Mui-focused": {
            backgroundColor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e93345 !important",
              borderWidth: "2px",
            },
          },
        }}
      >
        {albums.length > 0 ? (
          albums.map((album) => (
            <MenuItem key={album.id} value={album.id}>
              {album.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>אין אלבומים זמינים</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
