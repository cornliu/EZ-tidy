import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

let tmp_columns = [
  { field: "id", headerName: "ID", minWidth: 70 },
  { field: "item_name", headerName: "Item", minWidth: 150 },
  { field: "store_time", headerName: "Since", minWidth: 100, align: "right",  },
  { field: "owner", headerName: "Owner", minWidth: 100 }
]
let tmp_list = [
  {id: 1, item_name: "牛奶", store_time: "2021-01-01", owner: "吳沛林"},
  {id: 2, item_name: "蛋糕", store_time: "2021-01-12", owner: "羅才淵"},
  {id: 3, item_name: "冰淇淋", store_time: "2021-01-13", owner: "吳沛林"},
  {id: 4, item_name: "抹茶鮮奶", store_time: "2021-01-15", owner: "劉玉米"},
  {id: 5, item_name: "茶裏王", store_time: "2021-01-15", owner: "劉玉米"},
  {id: 6, item_name: "醬油", store_time: "2021-01-17", owner: "羅才淵"}
  ]

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

export function Member(){
  const classes = useStyles();

  return (
    <TableContainer component = {Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>item</TableCell>
            <TableCell align="middle">time</TableCell>
            <TableCell align="middle">owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tmp_list.map((row)=>(
            <TableRow>
              <TableCell>{row.item_name}</TableCell>
              <TableCell align="middle">{row.store_time}</TableCell>
              <TableCell align="middle">{row.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}