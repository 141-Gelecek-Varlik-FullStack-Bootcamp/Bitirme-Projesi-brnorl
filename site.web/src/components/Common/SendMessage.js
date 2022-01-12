import React from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function SendMessage() {

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //send the request
        const messageRequest = {
        message:data.get("message")
    };
    console.log(messageRequest);
        await axios.post("https://localhost:5001/api/Resident/SendMessage",messageRequest).then(
            window.location.reload()
        );
    }
    
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                Send Message
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="message"
              label="message"
              name="message"
              type="text"
              autoComplete="current-message"
              autoFocus
              fullWidth
            />

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message To Admin
            </Button>
            </Grid>
            </Box>
        </div>
    )
}
