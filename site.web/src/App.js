import './App.css';
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPage from "./components/Pages/AdminPage";
import LoginPage from "./components/Pages/LoginPage";
import ResidentPage from "./components/Pages/ResidentPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0d47a1',
      },
      secondary: {
        main: '#01579b',
      },
    }
  
  });
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<LoginPage/>}/>
                <Route  path="/Admin" element={<AdminPage/>} />
                <Route  path="/Resident" element={<ResidentPage/>} />
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
