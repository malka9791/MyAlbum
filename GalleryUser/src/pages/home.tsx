import { Card, CardContent, CardMedia, Typography, Grid, Container } from "@mui/material";
import album from  "../images/album.png"
import shared from "../images/shared.png"
import signUp from "../images/signup.png"
import upload from "../images/upload.png"
const Home = () => {
  const boxes = [
    { id: 1, image: album ,p:"My Albums"},
    { id: 2, image: signUp ,p:"Sign Up"},
    { id: 3, image: shared ,p:"Shared Images"},
    { id: 4, image: upload,p:"Upload Image" },
  ];

  return (
    <Container maxWidth="lg" style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center",marginTop:65 }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {boxes.map((box) => (
          <Grid item xs={12} md={6} key={box.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", p: 3, boxShadow: 3,backgroundColor:"#ffffff91" }}>
              <CardMedia component="img" image={box.image} alt={`תמונה ${box.id}`} sx={{ width: 200, height: 165, objectFit: "cover", marginTop: 2 }} />
              <CardContent>
                <Typography variant="h5" align="center">{box.p}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
