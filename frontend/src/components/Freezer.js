import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { TableBody, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'


let tmp_Title = "Freezer"
let tmp_columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "item_name", headerName: "Item", width: 300 },
  { field: "store_time", headerName: "Since", width: 150},
  { field: "owner", headerName: "Owner", width: 100 }
]
let tmp_list = [
  {id: 1, item_name: "牛奶", store_time: "2021/01/01", owner: "吳沛林"},
  {id: 2, item_name: "蛋糕", store_time: "2021/01/12", owner: "羅才淵"},
  {id: 3, item_name: "冰淇淋", store_time: "2021/01/13", owner: "吳沛林"},
  {id: 4, item_name: "抹茶鮮奶", store_time: "2021/01/15", owner: "劉玉米"},
  {id: 5, item_name: "茶裏王", store_time: "2021/01/15", owner: "劉玉米"},
  {id: 6, item_name: "醬油", store_time: "2021/01/17", owner: "羅才淵"}
  ]

const useStyles = makeStyles({
  table: {

    minWidth: 650,
  },
});

export function Freezer(){
  const classes = useStyles();

  return (
    <div style={{ height: 800, width:"100%"}}>
      <DataGrid rows={tmp_list} columns={tmp_columns} pageSize={20} checkboxSelection />
    </div>

  )
}