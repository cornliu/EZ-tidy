import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid'
import {
  Typography, Fab, Divider, Box, Tabs, Tab, Tooltip
} from '@material-ui/core'
import { AddItemDialog } from './AddItem';
import { deleteItems, returnItemToServer } from '../Connection';
import { Add, ArrowBack, Delete, DoubleArrow } from '@material-ui/icons';
import { AuthContext } from '../contexts';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar()

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'owner', headerName: 'Owner', flex: 1 },
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
      flex: 3.5,
    },
    // { field: 'id', headerName: 'ID', width: 70, description: 'Unique id for each item' },
  ];

  const commonitemcolumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'owner', headerName: 'Owner', flex: 1 },
    {
      field: 'borrower',
      headerName: 'Borrower',
      flex: 1,
    },
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
      flex: 2.5,
    },
    // { field: 'id', headerName: 'ID', width: 70, description: 'Unique id for each item' },
  ];


  const getData = async () => {
    props.setData(await props.getData(props.path));
    console.log(pageData);
  }

  const handlePrivateDelete = async () => {
    const req = {
      path: props.path,
      itemlist: privateSelection,
      username: auth.name,
      identity: auth.identity
    }
    console.log(req);
    const { data, status } = await deleteItems(req);
    enqueueSnackbar(data, { variant: status });
    props.getData();
  }
  const handleCommonDelete = async () => {
    const req = {
      path: props.path,
      itemlist: commonSelection,
      username: auth.name,
      identity: auth.identity
    }
    console.log(req);
    const { data, status } = await deleteItems(req);
    enqueueSnackbar(data, { variant: status });
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
    const { data, status } = await deleteItems(req);
    enqueueSnackbar(data, { variant: status });
    props.getData();
  }
  const handleReturn = async () => {
    const req = {
      path: props.path,
      id: commonSelection[0],
      username: auth.name,
      identity: auth.identity
    }
    console.log(req);
    const { data, status } = await returnItemToServer(req);
    enqueueSnackbar(data, { variant: status });
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
              rows={pageData.commonitemlist}
              columns={commonitemcolumns}
              checkboxSelection={false}
              autoHeight
              onSelectionChange={(newSelection) => {
                setCommonSelection(newSelection.rowIds);
              }} />
          )}
      </Box>
      {tabChoise === "private" ? (
        <Box className={classes.fabs}>
          <Tooltip title="Add a item">
            <Fab onClick={() => { setDialogOpen(true) }} className={classes.fab} color="primary" >
              <Add />
            </Fab>
          </Tooltip>
          <Tooltip title="Remove">
            <Fab onClick={handlePrivateDelete} className={classes.fab} color="secondary" disabled={!privateSelection.length} >
              <Delete />
            </Fab>
          </Tooltip>
        </Box>
      ) : (
          <Box className={classes.fabs}>
            {auth.identity === "Admin" && (
              <Tooltip title="Add a common item">
                <Fab onClick={() => { setDialogOpen(true) }} className={classes.fab} color="primary" >
                  <Add />
                </Fab>
              </Tooltip>
            )}
            {auth.identity === "Admin" && (
              <Tooltip title="Remove Selected">
                <Fab onClick={handleCommonDelete} className={classes.fab} color="secondary" disabled={!commonSelection.length} >
                  <Delete />
                </Fab>
              </Tooltip>
            )}
            {auth.identity !== "Admin" && (
              <Tooltip title="Borrow Selected">
                <Fab onClick={handleBorrow} className={classes.fab} color="secondary" disabled={!commonSelection.length} >
                  <DoubleArrow />
                </Fab>
              </Tooltip>
            )}
            <Tooltip title="Return Selected" >
              <Fab onClick={handleReturn} className={classes.fab} color="primary" disabled={!commonSelection.length} >
                <ArrowBack />
              </Fab>
            </Tooltip>
          </Box>

        )}
    </div>
  )
}