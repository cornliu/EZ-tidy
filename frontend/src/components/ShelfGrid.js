import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  DataGrid
} from '@material-ui/data-grid'
import { Typography, Button, Fab } from '@material-ui/core'
import { AddItemDialog } from './AddItem';
import { defaultData } from '../Connection';
import { Add, Delete } from '@material-ui/icons';

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
  fabs: {
    position: 'absolute',
    bottom: theme.spacing(0),
    right: theme.spacing(0),
  },
  fab:{
    margin: theme.spacing(1),
  },
}));

export function ShelfGrid(props){
  const classes = useStyles();
  let pageData = props.pageData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null);
  const [selection, setSelection] = useState([])

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'owner', headerName: 'Owner', width: 130 },
    {
      field: 'time',
      headerName: 'Time',
      type: 'dateTime',
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      width: 300,
    },
    // { field: 'id', headerName: 'ID', width: 70, description: 'Unique id for each item' },
  ];

  const getData = async ()=>{
    props.setData(await props.getData(props.path));
    console.log(pageData);
  }

  const handleDelete = async () => {
    const req = {
      path: props.path,
      itemlist: selection.map((e)=>{return {id: e}})
    }
    console.log(req);

  }

  useEffect(()=>{
    getData(props.path);
  }, [props.path, dialogOpen])

  return (
    <div>
      <div>
        <Typography variant="h3">{pageData.title}</Typography>
        <Typography >{pageData.description}</Typography>
        <AddItemDialog 
          onClose={()=>{setDialogOpen(false)}} 
          open={dialogOpen} 
          currentPath={pageData.path} />
      </div>
      <div className={classes.fabs}>
        <Fab onClick={()=>{setDialogOpen(true)}} className={classes.fab} color="primary" >
          <Add />
        </Fab>
        <Fab onClick={handleDelete} className={classes.fab} color="secondary" disabled={!selection.length} >
          <Delete />
        </Fab>
      </div>
      <DataGrid 
        rows={pageData.itemlist} 
        columns={columns} 
        checkboxSelection 
        autoHeight 
        onSelectionChange={(newSelection) => {
          setSelection(newSelection.rowIds);
        }} />
    </div>
  )
}