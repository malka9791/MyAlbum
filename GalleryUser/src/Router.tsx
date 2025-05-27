import { createBrowserRouter } from "react-router";
import AppLayOut from "./components/AppLayout";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import MyAlbums from "./pages/myAlbums";
import AddAlbum from "./pages/addAlbum";
import UpdateAlbum from "./pages/updateAlbum";
import UploadImage from "./pages/uploadImg";
import ShowImages from "./pages/showImages";
import ImageAIPage from "./pages/ai";
import Home from "./pages/home";

const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "myAlbums", element: <MyAlbums /> },
      { path: "addAlbum", element: <AddAlbum /> },
      { path: "updateAlbum/:albumId", element: <UpdateAlbum /> },
      {
        path: "uploadImg",
        element: <UploadImage albumId={undefined} imgUrl={undefined} />,
      },
      { path: "showImages/:albumId", element: <ShowImages /> },
      { path: "ai", element: <ImageAIPage /> },
    ],
  },
]);

export default MyRouter;
