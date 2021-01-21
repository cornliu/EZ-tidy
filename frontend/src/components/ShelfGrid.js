import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  DataGrid
} from '@material-ui/data-grid'
import {
  Typography, Button, Fab, Divider, Box, Card,
  Tabs, Tab, Tooltip
} from '@material-ui/core'
import { AddItemDialog } from './AddItem';
import { defaultData, deleteItems } from '../Connection';
import { Add, Delete, DoubleArrow } from '@material-ui/icons';
import { AuthContext } from '../contexts';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(1),
  },
  root: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    height: "100%",
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  tabs: {
    width: "100%",
    height: "auto",
  },
  fabs: {
    position: 'fixed',
    display: "flex",
    flexDirection: "column",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    width: "auto",
    height: "auto",
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

export function ShelfGrid(props) {
  const classes = useStyles();
  let pageData = props.pageData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null);
  const [privateSelection, setPrivateSelection] = useState([])
  const [commonSelection, setCommonSelection] = useState([])
  const auth = useContext(AuthContext);
  const [tabChoise, setTabChoise] = useState("private")

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

  const getData = async () => {
    props.setData(await props.getData(props.path));
    console.log(pageData);
  }

  const handleDelete = async () => {
    const req = {
      path: props.path,
      itemlist: privateSelection,
      username: auth.name,
      identity: auth.identity
    }
    console.log(req);
    await deleteItems(req);
    props.getData();
  }

  const handleBorrow = async () => {
    const req = {
      path: props.path,
      itemlist: commonSelection,
      username: auth.name,
      identity: auth.identity
    }
    console.log(req);
    await deleteItems(req);
    props.getData();
  }

  useEffect(() => {
    props.getData();
  }, [props.path, dialogOpen])

  return (
    <div>
      <Box className={classes.title}>
        <Typography variant="h3" align='left' >{pageData.title}</Typography>
        <Typography paragraph align='left' gutterBottom >{pageData.description}</Typography>
        <AddItemDialog
          onClose={() => { setDialogOpen(false) }}
          open={dialogOpen}
          currentPath={pageData.path} />
      </Box>
      <Divider />
      <Box className={classes.root}>
        <Tabs value={tabChoise} className={classes.tabs}
          onChange={(event, newValue) => setTabChoise(newValue)} >
          <Tab label="Private Items" value="private" />
          <Tab label="Common Items" value="common" />
        </Tabs>
        {tabChoise === "private" ? (
          <DataGrid
            rows={pageData.itemlist}
            columns={columns}
            checkboxSelection
            autoHeight
            onSelectionChange={(newSelection) => {
              setPrivateSelection(newSelection.rowIds);
            }} />
        ) : (
            <DataGrid
              rows={pageData.itemlist}
              columns={columns}
              checkboxSelection
              autoHeight
              onSelectionChange={(newSelection) => {
                setCommonSelection(newSelection.rowIds);
              }} />
          )}
      </Box>
      <Box className={classes.fabs}>
        {tabChoise === "common" && (
          <Tooltip title="Borrow" >
            <Fab onClick={handleBorrow} className={classes.fab} color="primary" disabled={!privateSelection.length} >
              <DoubleArrow />
            </Fab>
          </Tooltip>
        )}
        <Tooltip title="Add a item">
          <Fab onClick={() => { setDialogOpen(true) }} className={classes.fab} color="primary" >
            <Add />
          </Fab>
        </Tooltip>
        {auth.identity === "Admin" && (
          <Tooltip title="Remove">
            <Fab onClick={handleDelete} className={classes.fab} color="secondary" disabled={!privateSelection.length} >
              <Delete />
            </Fab>
          </Tooltip>
        )}
      </Box>
    </div>
  )
}