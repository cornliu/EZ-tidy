import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card, CardActionArea, CardActions, CardContent, Typography,
  Avatar, CardMedia, Divider, Box
} from '@material-ui/core';
import { AddBox, AddLocation } from '@material-ui/icons'
import { AddLocationDialog } from './AddLocation';
import { AddItemDialog } from './AddItem'
import { defaultData } from '../Connection';
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
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "left",
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  card: {
    display: 'flex',
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    justifyContent: "center",
    minHeight: 200,
    minWidth: 300,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  addcard: {
    display: "flex",
    width: 275,
    minHeight: 275,
    height: 'auto',
    justifyContent: 'center'
  },
  addcardarea: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
  addcardmedia: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
}));

export function Empty(props) {
  const classes = useStyles();
  let locationData = props.pageData;
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [addLocationDialogOpen, setAddLocationDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)
  const auth = useContext(AuthContext);
  // const getData = async ()=>{
  //   console.log("Query from Empty");
  //   props.setData(await props.getData(props.path));
  // }

  useEffect(() => {
    props.getData();
  }, [props.path, addItemDialogOpen, addLocationDialogOpen])

  return (
    <div>
      <Box className={classes.title}>
        <Typography variant="h3" align='left'>{locationData.title}</Typography>
        <Typography paragraph align='left' gutterBottom >{locationData.description}</Typography>
      </Box>
      <Divider />
      <Box className={classes.root}>
        <Card key="newlocation" elevation={3}
          onClick={() => { setAddItemDialogOpen(true) }}
          className={classes.addcard}
        >
          <CardActionArea className={classes.addcardarea}>
            <CardMedia className={classes.addcardmedia}>
              <Avatar sizes="Large">
                <AddBox />
              </Avatar>
            </CardMedia>
            <CardContent>
              <Typography>
                Add New Item
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {auth.identity === "Admin" && (
          <Card key="newlocation" elevation={3}
            onClick={() => { setAddLocationDialogOpen(true) }}
            className={classes.addcard}
          >
            <CardActionArea className={classes.addcardarea}>
              <CardMedia className={classes.addcardmedia}>
                <Avatar sizes="Large">
                  <AddLocation />
                </Avatar>
              </CardMedia>
              <CardContent>
                <Typography>
                  Add New Location
              </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
        <AddLocationDialog
          ref={dialogRef}
          onClose={() => { setAddLocationDialogOpen(false) }}
          open={addLocationDialogOpen}
          currentPath={locationData.path} />
        <AddItemDialog
          onClose={() => { setAddItemDialogOpen(false) }}
          open={addItemDialogOpen}
          currentPath={locationData.path} />
      </Box>
    </div>
  )
}