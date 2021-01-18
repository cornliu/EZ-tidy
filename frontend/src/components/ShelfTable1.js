import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import axios from 'axios'

// let tmp_columns = [
//   { field: "id", headerName: "ID", minWidth: 70 },
//   { field: "item_name", headerName: "Item", minWidth: 150 },
//   { field: "store_time", headerName: "Since", minWidth: 100, align: "right" },
//   { fleld: "location", headerName: "Location", minWidth: 150, align: "right" },
//   { field: "owner", headerName: "Owner", minWidth: 100 }
// ]

const API_ROOT = 'http://localhost:4000/'
const instance = axios.create({
  baseURL: API_ROOT
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function ShelfTable1(props){
  const [pageData, setPageData] = useState([])
  const classes = useStyles();

  const getData = async ()=>{
    console.log(props.path);
    const data = await instance.post(props.path)
    console.log(data);
    // return data
  }

  return (
    <TableContainer component = {Paper}>
      {/* {console.log(props.path)} */}
      {/* {getData()} */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.item_list.map((row, index)=>(
            <TableRow  key={index}>
              <TableCell>{row.item_name}</TableCell>
              <TableCell align="right">{row.store_time}</TableCell>
              <TableCell align="right">{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}