import { BrowserRouter as Router, Routes, Route, NavLink, RouterProvider } from "react-router-dom";
import "./App.css";
import MyRouter from "./Router";


function App() {
  return (
    <>

      {/* <Box
      sx={{
        background: "linear-gradient(135deg, rgb(235, 255, 0), rgb(249, 4, 91))",
        height: "95vh",
        width: "95vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    > */}
      {/* <Provider store={store}>
          <SignUp/>
    </Provider> */}
     
      {/* </Box> */}
 <RouterProvider router={MyRouter} />
    </>
  );
}

export default App;



  



