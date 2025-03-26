import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Logo from "../images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../hook/user_context";

const Header = () => {
    const userContext=useContext(UserContext);    
    const token = userContext?.token ?? null;
    const name = userContext?.name ?? "?";
console.log("header",name,"token ",token);


  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "rgb(249, 4, 91)",
          //   boxShadow: "0 2px 8px rgba(253, 229, 229, 0.1)",
          boxShadow: 3,
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
              <Box sx={{ my: 2, px: 2 }}>
                <Link
                  to="/login"
                  style={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.target as HTMLAnchorElement).style.backgroundColor =
                      "rgb(235, 255, 0)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  <LoginIcon sx={{ color: "rgb(249, 4, 91)" }} />
                  Login
                </Link>
              </Box>

              {/* Sign Up Button */}
              <Box sx={{ my: 2, px: 2 }}>
                <Link
                  to="/signup"
                  style={{
                    color: "rgb(249, 4, 91)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.target as HTMLAnchorElement).style.backgroundColor =
                      "rgb(235, 255, 0)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  <PersonAddIcon sx={{ color: "rgb(249, 4, 91)", mr: 1 }} />
                  Sign Up
                </Link>
              </Box>

              {/* Share Album Button */}

              {!token ? (
                <></>
              ) : (
                <>
                  <Box sx={{ my: 2, px: 2 }}>
                    <Link
                      to="/sharedImages"
                      style={{
                        color: "rgb(249, 4, 91)",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(
                        e: React.MouseEvent<HTMLAnchorElement>
                      ) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor =
                          "rgb(235, 255, 0)";
                      }}
                      onMouseLeave={(
                        e: React.MouseEvent<HTMLAnchorElement>
                      ) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <ShareIcon sx={{ color: "rgb(249, 4, 91)" }} />
                      Shared Images
                    </Link>
                  </Box>

                  {/* Albums Button */}
                  <Box sx={{ my: 2, px: 2 }}>
                    <Link
                      to="/myAlbums"
                      style={{
                        color: "rgb(249, 4, 91)",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(
                        e: React.MouseEvent<HTMLAnchorElement>
                      ) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor =
                          "rgb(235, 255, 0)";
                      }}
                      onMouseLeave={(
                        e: React.MouseEvent<HTMLAnchorElement>
                      ) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <PhotoAlbumIcon sx={{ color: "rgb(249, 4, 91)" }} />
                      My Albums
                    </Link>
                  </Box>
                </>
              )}
            </Box>

            {/* Profile Avatar */}
            <Box
              sx={{
                color: "#rgb(249, 4, 91)",
                fontFamily: "cursive",
                fontSize: "25px",
                borderRadius: "50%",
                backgroundColor: "rgb(235, 255, 0)",
                width: "45px",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 3px rgb(249, 4, 91)",
              }}
            >
              <p>
                {name?.at(0)}
                </p>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
