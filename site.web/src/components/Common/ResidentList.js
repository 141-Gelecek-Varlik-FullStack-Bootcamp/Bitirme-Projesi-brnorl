import React from "react";
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const theme = createTheme();


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow  {...otherProps}>
        <TableCell  padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow >
          <TableCell  padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

  
export default function ResidentList({residents}) {

  function deleteHandler(tcNo) {
    axios.delete(`https://localhost:5001/api/Resident?TcNo=${tcNo}`)
        .then(() => window.location.reload());
  }
  function markRead(row) {
    const putRequest ={
      email:row.email,
      phone:row.phone,
      vecihlePlate:row.vecihlePlate,
      dues:row.dues,
      dueIsPaid:row.dueIsPaid,
      message:row.message,
      messageIsRead:true,
      isOwner:row.isOwner,
      isAdmin:row.isAdmin,
    };
    axios.put(`https://localhost:5001/api/Resident?TcNo=${row.tcNo}`,putRequest)
        .then(() => window.location.reload());
  }
  function markUnread(row) {
    const putRequest ={
      email:row.email,
      phone:row.phone,
      vecihlePlate:row.vecihlePlate,
      dues:row.dues,
      dueIsPaid:row.dueIsPaid,
      message:row.message,
      messageIsRead:false,
      isOwner:row.isOwner,
      isAdmin:row.isAdmin,
    };
    axios.put(`https://localhost:5001/api/Resident?TcNo=${row.tcNo}`,putRequest)
        .then(() => window.location.reload());
  }
    return (
        <div >
             <ThemeProvider theme={theme}>
              <Paper  >
              <Table size="small"  aria-label="collapsible table">
              <TableHead >
              <TableRow >
              <TableCell/>
              <TableCell >Tc No</TableCell>
              <TableCell align="right">E-Mail</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Dues</TableCell>
              <TableCell align="right">Owner Status</TableCell>
              <TableCell align="right">Admin Status</TableCell>
              </TableRow>
              </TableHead>
              <TableBody >
              {residents?.map(row => (
              <ExpandableTableRow

                key={row?.tcNo}
                expandComponent={
                  <Table size="small">
                    <TableHead>
                    <TableCell align="left">Apartment Block</TableCell>
                    <TableCell align="left">Apartment Type</TableCell>
                    <TableCell align="left">Apartment Floor</TableCell>
                    <TableCell align="left">Apartment No</TableCell>
                    <TableCell align="left">Water Debt</TableCell>
                    <TableCell align="left">Electric Debt</TableCell>
                    <TableCell align="left">Gas Debt</TableCell>
                    </TableHead>
                  <TableBody>
                <TableCell  colSpan="1">{row?.apartment?.block}</TableCell>
                <TableCell colSpan="1">{row?.apartment?.type}</TableCell>
                <TableCell colSpan="1">{row?.apartment?.floor}</TableCell>
                <TableCell  colSpan="1">{row?.apartment?.no}</TableCell>
                <TableCell  colSpan="1">{row?.bill?.water}TL
                {row?.bill?.waterIsPaid ? <CheckIcon/> : <ClearIcon/>}
                </TableCell>
                <TableCell  colSpan="1">{row?.bill?.electric}TL
                {row?.bill?.electricIsPaid ? <CheckIcon/> : <ClearIcon/>}
                </TableCell>
                <TableCell  colSpan="1">{row?.bill?.gas}TL
                {row?.bill?.gasIsPaid ? <CheckIcon/> : <ClearIcon/>}
                </TableCell>
                </TableBody>
                </Table>
              }
              >
                <TableCell>
                  {row?.tcNo}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.phone}</TableCell>
                <TableCell align="right">{row?.message}
                {row?.messageIsRead ? 
                <Button onClick={() => { markUnread(row) }}> 
                  <MarkunreadIcon  color="primary"/>
                </Button>
                : 
                <Button onClick={() => { markRead(row) }}>
                  <MarkunreadIcon  color="disabled"/>
                </Button>
                }
                 </TableCell>
                <TableCell align="right">{row?.password}</TableCell>
                <TableCell align="right">{row?.dues}TL{row?.dueIsPaid ? <CheckIcon/> : <ClearIcon/>}</TableCell>
                <TableCell align="right">{row?.isAdmin ? <CheckIcon/> : <ClearIcon/>}</TableCell>
                <TableCell align="right">{row?.isOwner ? <CheckIcon/> : <ClearIcon/>}</TableCell>
                <TableCell align="right"><Button  onClick={() => { deleteHandler(row?.tcNo) }} startIcon={<DeleteIcon />} variant="contained" color="error"></Button></TableCell>
              </ExpandableTableRow>
              ))}
              </TableBody>
              </Table>
              </Paper>
              </ThemeProvider> 
        </div>
    )
}

