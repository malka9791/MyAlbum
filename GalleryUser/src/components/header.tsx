import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Logo from "../images/Logo2.png";
import { Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ShareIcon from "@mui/icons-material/Share";

const Header = () => {
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "rgb(249, 4, 91)",
        //   boxShadow: "0 2px 8px rgba(253, 229, 229, 0.1)",
          boxShadow:3,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              onClick={() => {
                // nav("/home");
              }}
              src={Logo}
              alt="Logo"
              style={{
                width: "100px",
                height: "auto",
                margin: "0px 20px 0px 20px",
                cursor: "pointer",
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* Login Button */}
              <Box sx={{ my: 2, display: "block", px: 1 }}>
                <Button
                  sx={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={<LoginIcon sx={{ color: "rgb(249, 4, 91)" }} />}
                >
                  Login
                </Button>
              </Box>

              {/* Sign Up Button */}
              <Box sx={{ my: 2, display: "block", px: 1 }}>
                <Button
                  sx={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={
                    <PersonAddIcon sx={{ color: "rgb(249, 4, 91)" }} />
                  }
                >
                  Sign Up
                </Button>
              </Box>

              {/* Share Album Button */}
              <Box sx={{ my: 2, display: "block", px: 1 }}>
                <Button
                  sx={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={<ShareIcon sx={{ color: "rgb(249, 4, 91)" }} />}
                >
                  Share Album
                </Button>
              </Box>

              {/* Albums Button */}
              <Box sx={{ my: 2, display: "block", px: 1 }}>
                <Button
                  sx={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={
                    <PhotoAlbumIcon sx={{ color: "rgb(249, 4, 91)" }} />
                  }
                >
                  My Albums
                </Button>
              </Box>
            </Box>

            {/* Profile Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="User Profile" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
