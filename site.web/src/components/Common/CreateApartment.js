import axios from "axios";
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function CreateApartment() {
    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //send the request
        const createRequest = {
        occupied:false,
        block:data.get("block"),
        type:data.get("type"),
        floor:parseInt(data.get("floor")),
        no:parseInt(data.get("no")),
    };
    console.log(createRequest);
    
        await axios.post("https://localhost:5001/api/Apartment",createRequest).then(
            window.location.reload()
        );
        
    }
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                Create Apartment
            <Grid container spacing={1}>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="block"
              label="Block"
              name="block"
              autoComplete="block"
              autoFocus
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="type"
              label="type"
              type="type"
              id="type"
              autoComplete="current-type"
            />
          </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="floor"
              label="Floor"
              name="floor"
              type="number"
              autoComplete="floor"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="no"
              label="no"
              type="number"
              id="no"
              autoComplete="current-no"
            />
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Apartment
            </Button>
            </Grid>
          </Box>
        </div>
    )
}
