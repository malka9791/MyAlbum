import {  RouterProvider } from "react-router-dom";
import "./App.css";
import MyRouter from "./Router";


function App() {
  
  // useEffect(() => {
  //   const handleUnload = () => {
  //     sessionStorage.clear();
  //   };
  
  //   window.addEventListener("beforeunload", handleUnload);
    
  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);
  
  
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



  



