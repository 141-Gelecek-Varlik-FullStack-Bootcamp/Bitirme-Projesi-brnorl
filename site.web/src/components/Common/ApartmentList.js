import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const theme = createTheme();
  
export default function ApartmentList({apartments}) {
  function deleteHandler(block,no) {
    axios.delete(`https://localhost:5001/api/Apartment?block=${block}&no=${no}`)
        .then(() => window.location.reload());
  }
    return (
        <div>
            <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
      <Table size="small"   aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Apartment Block</TableCell>
            <TableCell align="right">Apartment Type</TableCell>
            <TableCell align="right">Apartment Floor</TableCell>
            <TableCell align="right">Apartment No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apartments?.map((row) => (
            <TableRow
              key={row?.no}
            >
              <TableCell component="th" scope="row">
                {row?.block}
              </TableCell>
              <TableCell align="right">{row?.type}</TableCell>
              <TableCell align="right">{row?.floor}</TableCell>
              <TableCell align="right">{row?.no}</TableCell>
              <TableCell align="right">
              <Button size="small"  onClick={() => { deleteHandler(row?.block,row?.no) }} startIcon={<DeleteIcon />} variant="contained" color="error"></Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
        </div>
    )
}
