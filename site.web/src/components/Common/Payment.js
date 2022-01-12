import React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Payment({total}) {

    async function handleSubmit(event){
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //send the request
        const payRequest = {
        name:data.get("name"),
        surname:data.get("surname"),
        amount:parseFloat(total),
        creditCardNumber:data.get("creditCardNumber"),
        expirationDate:data.get("expirationDate"),
        paymentDate:date,
    };
        await axios.post("https://localhost:5001/api/Resident/Pay",payRequest).then(
            window.location.reload()
        );
    }
    
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                Pay
            <Grid container spacing={1}>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="name"
              label="name"
              name="name"
              type="text"
              autoComplete="current-name"
              autoFocus
              fullWidth
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="surname"
              label="surname"
              name="surname"
              type="text"
              autoComplete="current-surname"
              fullWidth
            />
            </Grid>
            <Grid item xs={8}>
                Credit Card Number
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="creditCardNumber"
              label="creditCardNumber"
              name="creditCardNumber"
              type="number"
              autoComplete="current-creditCardNumber"
              fullWidth
            />
            </Grid>
            <Grid item xs={4}>
            expirationDate
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="expirationDate"
              name="expirationDate"
              type="date"
              fullWidth
              autoComplete="current-expirationDate"
            />
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Pay {total} TL
            </Button>
            </Grid>
            </Box>
        </div>
    )
}
