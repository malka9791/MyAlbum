import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/signup'
import {store} from "./components/authStore"
import { Provider } from 'react-redux';
import { Box } from '@mui/material'

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
      <Provider store={store}>
          <SignUp/>
    </Provider>
    {/* </Box> */}
    
    </>
  )
}

export default App
