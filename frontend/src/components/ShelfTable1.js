import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import axios from 'axios'
import { locationData_Freezer } from '../testcases'

// let tmp_columns = [
//   { field: "id", headerName: "ID", minWidth: 70 },
//   { field: "name", headerName: "Item", minWidth: 150 },
//   { field: "time", headerName: "Since", minWidth: 100, align: "right" },
//   { fleld: "location", headerName: "Location", minWidth: 150, align: "right" },
//   { field: "owner", headerName: "Owner", minWidth: 100 }
// ]

const defaultData = {
  title: "Loading...",
  locationList: [],
  itemList: [],
  path: "/loading",
  template: "ShelfTable"
}


// const API_ROOT = 'http://localhost:4000/'
// const instance = axios.create({
//   baseURL: API_ROOT
// })

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
  // const [pageData, setPageData] = useState([])
  const classes = useStyles();
  const [locationData, setLocationData ] = useState(defaultData);

  const getData = ()=>{
    // console.log(props.path);
    // const data = await instance.post(props.path)
    // console.log(data);
    // // return data
    console.log(props.path);
    switch (props.path) {
      case "/freezer":
        setLocationData(locationData_Freezer);
        break;
      default:
        setLocationData(locationData_Freezer);
        console.log("Error! locationData Not found.")
        break;
    }
  }

  useEffect(()=>{
    getData();
  }, [props.path, getData])

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
          {locationData.itemList.map((row, index)=>(
            <TableRow  key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}