import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Avatar, Card, CardActionArea, CardActions, CardContent, CardMedia,
  CardHeader, IconButton, Typography, Box, Button, Divider
} from '@material-ui/core';
import { AddLocationDialog } from './AddLocation';
import { defaultData, deleteLocation } from '../Connection';
import { Add, Delete, Folder } from '@material-ui/icons';
import { AuthContext } from '../contexts';
import { useSnackbar } from 'notistack';
import { AutoComplete } from 'antd';


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
    display: "flex",
    flexDirection: "column",
    width: 275,
    minHeight: 180,
    height: 'auto'
  },
  carddescription: {
    height: 20,
    width: "auto",
    flexGrow: 1,
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
  cardmedia: {
    height: 0,
    paddingTop: '56.25%',
    // flexShrink: 0,
  },
  cardactionarea: {
    flexGrow: 1,
  },
  cardbutton: {
    margin: theme.spacing(1),
  },
}));

export function Location(props) {
  const { getData } = props
  const classes = useStyles();
  let locationData = props.pageData;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const hookLocation = useLocation();

  useEffect(() => {
    getData();
  }, [dialogOpen])

  const handleDelete = async (path) => {
    const req = {
      path: path,
      parentpath: hookLocation.pathname,
      username: auth.name,
    }
    console.log("delete location");
    console.log(req)
    const { status, data } = await deleteLocation(req)
    enqueueSnackbar(data, { variant: status })
    props.getData();
  }

  return (
    <div>
      <Box className={classes.title}>
        <Typography variant="h3" align='left'>{locationData.title}</Typography>
        <Typography paragraph align='left' gutterBottom >{locationData.description}</Typography>
      </Box>
      <Divider />
      <Box className={classes.root}>
        {locationData.locationlist.map((location) => (
          <Card key={location.path} className={classes.card} component="div" >
            <CardHeader
              avatar={
                <Avatar>
                  <Folder />
                </Avatar>
              }
              titleTypographyProps={{ variant: 'h4', align: 'left' }}
              title={location.title}
            ></CardHeader>
            <CardMedia className={classes.cardmedia}
              image="https://media.ethicalads.io/media/images/2020/12/ea-logo.png"
              title="Folder Img"
            >
            </CardMedia>
            <CardContent >
              <Typography
                variant="body2"
                color="textSecondary"
                align='left'
                paragraph
                className={classes.carddescription} >
                {location.description ? (
                  location.description
                ) : (
                    "  "
                  )}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button size="small" variant="contained" color="primary"
                onClick={() => { history.push(location.path); props.getData() }}
                className={classes.cardbutton} >Enter</Button>
              {auth.identity === "Admin" && (
                <Button size="small" variant="text" color="secondary"
                  onClick={() => { handleDelete(location.path) }}
                  className={classes.cardbutton} >DELETE</Button>
              )}
            </CardActions>
          </Card>
        ))}
        {auth.identity === "Admin" && (
          <Card key="newlocation" elevation={3}
            onClick={() => { setDialogOpen(true) }}
            className={classes.addcard}
          >
            <CardActionArea className={classes.addcardarea}>
              <CardMedia className={classes.addcardmedia}>
                <Avatar sizes="Large">
                  <Add />
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
          onClose={() => { setDialogOpen(false) }}
          open={dialogOpen} />
      </Box>
    </div>
  )
}