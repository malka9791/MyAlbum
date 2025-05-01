import { createBrowserRouter } from "react-router";
import AppLayOut from "./components/AppLayout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SharedImages from "./pages/shredImage";
import MyAlbums from "./pages/myAlbums";
import AddAlbum from "./pages/addAlbum";
import UpdateAlbum from "./pages/updateAlbum";
import Home from "./pages/home";
import UploadImage from "./pages/uploadImg";
import ShowImages from "./pages/showImages";

const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "sharedImages", element: <SharedImages /> },
      { path: "myAlbums", element: <MyAlbums /> },
      { path: "addAlbum", element: <AddAlbum /> },
      { path: "updateAlbum/:albumId", element: <UpdateAlbum /> },
      { path: "uploadImg", element: <UploadImage albumId={undefined}/> },
      { path: "showImages/:albumId", element: <ShowImages /> },
      //  {path:"songs", element:<Songs />, children:[{path:"uploadSong", element:<UploadSong/>}
      // ]},{path:'newSongs',element:<NewSongs/>}
    ],
  },
]);

export default MyRouter;
