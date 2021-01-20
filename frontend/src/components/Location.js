import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar, Card, CardActionArea, CardActions, CardContent,
  CardHeader, IconButton, Typography, Box
} from '@material-ui/core';
import { AddLocationDialog } from './AddLocation';
import { defaultData, deleteLocation } from '../Connection';
import { Add, Delete, Folder } from '@material-ui/icons';
import { AuthContext } from '../contexts';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center",
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  card: {
    minWidth: 100,
  },
  cardrow: {
    display: "flex",
  }
}));

export function Location(props) {
  const classes = useStyles();
  let locationData = props.pageData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {enqueueSnackbar} = useSnackbar()

  useEffect(()=>{
    props.getData();
  }, [props.path, dialogOpen])

  const handleDelete = async (path) => {
    const req = {
      path: path,
      parentpath: history.location.pathname,
      username: auth.name,
    }
    const {status, data} = await deleteLocation(req)
    enqueueSnackbar(data, {variant: status})
    console.log("delete location");
    console.log(req)
  }

  return (
    <div>
      <div>
        <Typography variant="h3">{locationData.title}</Typography>
        <Typography >{locationData.description}</Typography>
      </div>
      <Box className={classes.root}>
        {locationData.locationlist.map((location) => (
          <Card key={location.path} elevation={3} className={classes.card}
            onClick={() => history.push(location.path)} >
            <CardHeader
              // avatar={
              //   <Avatar>
              //     <Folder />
              //   </Avatar>
              // }
              action={
                <IconButton onClick={()=>handleDelete(location.path)}>
                  <Delete />
                </IconButton>
              } ></CardHeader>
            <CardActionArea >
              <Avatar>
                <Folder />
              </Avatar>
              <CardContent className={classes.cardrow}>
                <Typography component="h4">{location.title}</Typography>
              </CardContent>
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p" >
                  {location.description ? (
                    location.description
                  ) : (
                      ""
                    )}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Card key="newlocation" elevation={3} onClick={() => { setDialogOpen(true) }} className={classes.card} >
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar>
                  <Add />
                </Avatar>
              }
              title="Add New Location"
            ></CardHeader>
          </CardActionArea>
        </Card>
        <AddLocationDialog
          ref={dialogRef}
          onClose={() => { setDialogOpen(false) }}
          open={dialogOpen} />
      </Box>
    </div>
  )
}