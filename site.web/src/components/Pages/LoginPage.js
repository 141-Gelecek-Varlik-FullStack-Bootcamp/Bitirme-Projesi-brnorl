import axios from "axios";
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [loggedResident,setloggedResident]=useState(null);
  let navigate = useNavigate();
  const theme = createTheme();

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //send the request
    const loginRequest = {TcNo:data.get("TcNo"),password:data.get("password")};
     await axios.post("https://localhost:5001/api/Resident/Login",loginRequest).then(
      (response) =>setloggedResident(response));

      
}


React.useEffect(() => {
  if(loggedResident!=null){
    loggedResident?.data?.isAdmin===true ? navigate("/Admin") : navigate('/Resident')
    localStorage.setItem("resident", JSON.stringify(loggedResident));

  }
    }, [loggedResident])

    

    
    
    
    

  
  return (
    <div className="Login">
      <header className="Login-header">
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="TcNo"
              label="Tc No."
              name="TcNo"
              autoComplete="TcNo"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      </header>
    </div>
  );
}

export default LoginPage;
