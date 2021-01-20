import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  DataGrid
} from '@material-ui/data-grid'
import { Typography, Button } from '@material-ui/core'
import { AddItemDialog } from './AddItem';
import { defaultData } from '../Connection';

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

export function ShelfGrid(props){
  const classes = useStyles();
  let pageData = props.pageData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'owner', headerName: 'Owner', width: 130 },
    {
      field: 'time',
      headerName: 'Time',
      type: 'dateTime',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      width: 160,
    },
    { field: 'id', headerName: 'ID', width: 70, description: 'Unique id for each item' },
  ];

  const getData = async ()=>{
    props.setData(await props.getData(props.path));
    console.log(pageData);
  }

  useEffect(()=>{
    getData(props.path);
  }, [props.path, dialogOpen])

  return (
    <div>
      <div>
        <Typography variant="h3">{pageData.title}</Typography>
        <Typography >{pageData.description}</Typography>
        <Button onClick={()=>{setDialogOpen(true)}}>Add item</Button>
        <AddItemDialog 
          onClose={()=>{setDialogOpen(false)}} 
          open={dialogOpen} 
          currentPath={pageData.path} />
      </div>
        <DataGrid 
          rows={pageData.itemlist} 
          columns={columns} 
          checkboxSelection 
          autoHeight 
          autoPageSize />
    </div>
  )
}