import React,{useState} from "react";
import SendMessage from "../Common/SendMessage";
import Payment from "../Common/Payment";
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckIcon from '@mui/icons-material/Check';

export default function ResidentPage() {
    const data = localStorage.getItem("resident");
    const resident = JSON.parse(data);
    const total = resident?.data?.dues + resident?.data?.bill?.electric + resident?.data?.bill?.gas + resident?.data?.bill?.water;
    console.log(resident);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return (
        <div>
            <h1>RESİDENT</h1>
            <Container maxWidth="lg">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Send Message To Admin
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                      <SendMessage/>
                      </AccordionDetails>
                  </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        Bill Payment
                      </Typography>
                    </AccordionSummary>
                      <AccordionDetails>
                      <Payment total = {total} />
                      </AccordionDetails>
                  </Accordion>
                  <List sx={{width: '75%',bgcolor: 'background.paper',margin:"2rem auto" }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <HomeIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Apartment" secondary = "Block and Apartment No"/>
                        {resident?.data?.apartment?.block}--
                        {resident?.data?.apartment?.no}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AccountCircleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Resident" secondary="Resident Info" />
                        {resident?.data?.email}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <ReceiptIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Total Due"/>
                        {total}TL
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AccountCircleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Message" secondary="Message Status" />
                        {resident?.data?.messageIsRead ? <CheckIcon color="primary"/> : <CheckIcon/>}
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
            </Container>
        </div>
    )
}
