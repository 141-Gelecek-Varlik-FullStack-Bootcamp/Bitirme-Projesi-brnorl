import {React,useState} from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



export default function CreateBill() {
    const [waterIsPaid,setwaterIsPaid] = useState(false);
    const [electricIsPaid,setelectricIsPaid] = useState(false);
    const [gasIsPaid,setgasIsPaid] = useState(false);

    function handleWaterPaid(e) {
        setwaterIsPaid(e.target.checked);
      }
    function handleGasPaid(e) {
        setgasIsPaid(e.target.checked);
      }
    function handleElectricPaid(e) {
        setelectricIsPaid(e.target.checked);
      }


    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //send the request
        const createRequest = {
        water:parseFloat(data.get("water")),
        electric:parseFloat(data.get("electric")),
        gas:parseFloat(data.get("gas")),
        waterIsPaid:waterIsPaid,
        electricIsPaid:electricIsPaid,
        gasIsPaid:gasIsPaid,
    };
        await axios.post(`https://localhost:5001/api/Resident/Bill?TcNo=${data.get("tcNo")}`,createRequest).then(
            window.location.reload()
        );
        
    }

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                Create Bill
            <Grid container spacing={1}>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="tcNo"
              label="tcNo"
              name="tcNo"
              type="number"
              autoComplete="current-tcNo"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="water"
              label="water"
              name="water"
              autoComplete="current-water"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="electric"
              label="electric"
              id="electric"
              autoComplete="current-electric"
            />
          </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="gas"
              label="gas"
              name="gas"
              autoComplete="current-gas"
            />
            </Grid>
            <Grid item xs={6}>
            <FormControlLabel
            control={
              <Checkbox  onChange={handleGasPaid} />
            }
            label="Gas Paid"
          />
            <FormControlLabel
            control={
              <Checkbox  onChange={handleElectricPaid} />
            }
            label="Electric Paid"
          />
            <FormControlLabel
            control={
              <Checkbox  onChange={handleWaterPaid} />
            }
            label="Water Paid"
          />
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Bill
            </Button>
            </Grid>
            </Box>
        </div>
    )
}
