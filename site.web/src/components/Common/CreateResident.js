import {React,useState} from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function CreateResident() {
    const [isOwner,setisOwner] = useState(false);
    const [isAdmin,setisAdmin] = useState(false);


    function handleOwnerCheck(e) {
        setisOwner(e.target.checked);
      }
    function handleAdminCheck(e) {
        setisAdmin(e.target.checked);
      }


    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //send the request
        const createRequest = {
        tcNo:data.get("tcNo"),
        email:data.get("email"),
        phone:data.get("phone"),
        vecihlePlate:data.get("vecihlePlate"),
        dues:parseFloat(data.get("dues")),
        dueIsPaid:false,
        message:"",
        messageIsRead:false,
        isOwner:isOwner,
        isAdmin:isAdmin,
    };
    console.log(createRequest);
    await axios.post(`https://localhost:5001/api/Resident?block=${data.get("block")}&no=${data.get("no")}`,createRequest).then(
        window.location.reload()
        );
}
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                Create Resident
            <Grid container spacing={0.5}>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              id="block"
              label="Apartment Block"
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
              name="no"
              label="Apartment No"
              type="number"
              id="no"
              autoComplete="current-no"
            />
          </Grid>
            <Grid item xs={4}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="tcNo"
              label="tcNo"
              type="number"
              id="tcNo"
              autoComplete="current-tcNo"
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="email"
              label="email"
              type="email"
              id="email"
              autoComplete="current-tcNo"
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="phone"
              label="phone"
              type="phone"
              id="phone"
              autoComplete="current-phone"
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              margin="normal"
              size="small"
              variant="filled"
              name="vecihlePlate"
              label="vecihlePlate"
              type="vecihlePlate"
              id="vecihlePlate"
              autoComplete="current-vecihlePlate"
            />
            </Grid>
            <Grid item xs={4}>
            <TextField
              margin="normal"
              required
              size="small"
              variant="filled"
              name="dues"
              label="dues"
              type="number"
              id="dues"
              autoComplete="current-dues"
            />
            </Grid>
            <Grid item xs={4}>
            <FormControlLabel
            control={
              <Checkbox  onChange={handleOwnerCheck} />
            }
            label="Owner Status"
          />
            <FormControlLabel
            control={
              <Checkbox  onChange={handleAdminCheck} />
            }
            label="Admin Status"
          />
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Resident
            </Button>
            </Grid>
          </Box>
        </div>
    )
}
