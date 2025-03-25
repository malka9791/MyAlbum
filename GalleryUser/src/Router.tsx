import { createBrowserRouter } from "react-router";
import AppLayOut from "./components/AppLayout";
import Header from "./components/header";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SharedImages from "./pages/shredImage";
import MyAlbums from "./pages/myAlbums";
import AddAlbum from "./pages/addAlbum";





const MyRouter = createBrowserRouter([{

    path: '/',
    element: <AppLayOut/>,
    children: [
        { path: 'home', element: <Header /> },
    {path:'login',element:<Login/>},
    {path:'signup',element:<SignUp/>},
     {path:'sharedImages',element:<SharedImages/>}, 
     {path:'myAlbums',element:<MyAlbums/>},
     {path:'addAlbum',element:<AddAlbum/>}
    //  {path:"songs", element:<Songs />, children:[{path:"uploadSong", element:<UploadSong/>}
// ]},{path:'newSongs',element:<NewSongs/>}
]}])

export default MyRouter;