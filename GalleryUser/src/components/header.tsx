import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "../images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../hook/user_context";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../hook/authStore";
import { logout } from "../hook/authAction";

const Header = () => {
  const { name, token } = useContext(UserContext);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const handleLogOut = () => {
    try {
      dispatch(logout());
      nav("/");
    } catch (err) {
      console.error("failed", err);
    }
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#e93345",
          boxShadow: 3,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              onClick={() => {
                nav("/");
              }}
              src={Logo}
              alt="Logo"
              style={{
                width: "150px",
                height: "auto",
                margin: "0px 5px 0px 20px",
                cursor: "pointer",
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* Login Button */}

              {/* Share Album Button */}

              {token && token !== "undefined" && token.trim() !== "" ? (
                <>
                  {/*ahared <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      component={Link}
                      to="/sharedImages"
                      sx={{
                        color: "#e93345",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1ede9",
                          color: "#e93345",
                        },
                      }}
                    >
                      <ShareIcon sx={{ color: "#e93345" }} />
                      Shared Images
                    </Button>
                  </Box> */}

                  {/* Albums Button */}
                  <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      onClick={() => handleLogOut()}
                      sx={{
                        color: "#e93345",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1ede9",
                          color: "#e93345",
                        },
                      }}
                    >
                      <LogoutIcon sx={{ color: "#e93345" }} />
                      LogOut
                    </Button>
                  </Box>
                  <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      to="/myAlbums"
                      component={Link}
                      sx={{
                        color: "#e93345",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1ede9",
                          color: "#e93345",
                        },
                      }}
                    >
                      <PhotoAlbumIcon sx={{ color: "#e93345" }} />
                      My Albums
                    </Button>
                  </Box>

                  <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      component={Link}
                      to="/ai"
                      startIcon={<AutoAwesomeIcon sx={{ color: "#fff" }} />}
                      sx={{
                        background:
                          "linear-gradient(135deg, #e93345, #ff6b6b, #fcb045)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "10px 24px",
                        borderRadius: "50px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        boxShadow: "0 0 15px rgba(233, 51, 69, 0.4)",
                        transition: "all 0.4s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 0 25px rgba(233, 51, 69, 0.6)",
                          background:
                            "linear-gradient(135deg, #ff6b6b, #fcb045, #e93345)",
                          color: "white",
                        },
                      }}
                    >
                      Smart AI
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      component={Link}
                      to="/login"
                      sx={{
                        color: "#e93345",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1ede9",
                          color: "#e93345",
                        },
                      }}
                    >
                      <LoginIcon sx={{ color: "#e93345" }} />
                      Login
                    </Button>
                  </Box>

                  {/* Sign Up Button */}
                  <Box sx={{ my: 2, px: 2 }}>
                    <Button
                      component={Link}
                      to="/signup"
                      sx={{
                        color: "#e93345",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1ede9",
                          color: "#e93345",
                        },
                      }}
                    >
                      <PersonAddIcon sx={{ color: "#e93345", mr: 1 }} />
                      Sign Up
                    </Button>{" "}
                  </Box>
                </>
              )}
            </Box>

            {/* Profile Avatar */}
            <Box
              sx={{
                color: "#e93345",
                fontFamily: "cursive",
                fontSize: "25px",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 3px #e93345",
              }}
            >
              <p>{name?.at(0)}</p>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
