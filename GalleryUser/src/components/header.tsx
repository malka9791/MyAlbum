import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "../images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hook/user_context";
import { Button } from "@mui/material";

const Header = () => {
  const {name,isLogin} = useContext(UserContext);
  
  // const [isLogin, setIsLogin] = useState<string | null>();
  // const [name,setName] =useState<string>();
  // console.log("h",isLogin);

  // const updateSessionData = () => {
  //   console.log("🔄 Updating session data...");
    
  //   setIsLogin(userContext?.isLogin ?? null);
  //   setName(userContext?.name ?? "?"); 
  //      console.log("in header",isLogin,name);

  // };

  // useEffect(() => {
  //   updateSessionData(); // טוען מחדש כאשר הנתיב משתנה
  // }, [location.pathname,isLogin]);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#e93345",
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
                width: "150px",
                height: "auto",
                margin: "0px 5px 0px 20px",
                cursor: "pointer",
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* Login Button */}
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

              {/* Share Album Button */}

              {isLogin!="true" ? (
                <>{isLogin}</>
              ) : (
                <>
                  <Box sx={{ my: 2, px: 2 }}>
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
                  </Box>

                  {/* Albums Button */}
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
                backgroundColor: "#f1ede9",
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
