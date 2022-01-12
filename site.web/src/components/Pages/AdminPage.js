import React,{useState} from "react";
import ResidentList from "../Common/ResidentList";
import ApartmentList from "../Common/ApartmentList";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid';
import CreateApartment from "../Common/CreateApartment";
import CreateResident from "../Common/CreateResident";
import CreateBill from "../Common/CreateBill";
import UpdateResident from "../Common/UpdateResident";
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function AdminPage() {
    
    const [residents,setResidents]=useState(null);
    const [apartments,setApartments]=useState(null);
    const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

   React.useEffect(() => {
    axios.get("https://localhost:5001/api/Resident").then((response)=>
    {
      setResidents(response?.data?.residentList);
    })
      }, [])
   React.useEffect(() => {
    axios.get("https://localhost:5001/api/Apartment").then((response)=>
    {
      setApartments(response?.data?.apartmentList);
    })
      }, [])


    if(!residents&&!apartments)
    {
        return <CircularProgress />
    }

    return (
        <div>
          <Container maxWidth="lg">
          <Grid container spacing={1}>
              <Grid item xs={4}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Create Apartment
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                          <CreateApartment/>
                      </AccordionDetails>
                  </Accordion>
              </Grid>
              <Grid item xs={8}>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Create Resident
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                      <CreateResident/>
                      </AccordionDetails>
                  </Accordion>
              </Grid>
              <Grid item xs={6}>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Assign Bill
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                      <CreateBill/>
                      </AccordionDetails>
                  </Accordion>
              </Grid>
              <Grid item xs={6}>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Update Resident
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                      <UpdateResident/>
                      </AccordionDetails>
                  </Accordion>
              </Grid>
              <Grid item xs={12}>
                <ResidentList residents = {residents} />
              </Grid>
                <Grid item xs={12}>
                  <ApartmentList apartments = {apartments} />
                </Grid>
            </Grid>
            </Container>
            
        </div>
    )
}

