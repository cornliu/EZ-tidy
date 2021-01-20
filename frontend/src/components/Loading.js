import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import {
  Avatar, Card, CardActionArea, CardActions, CardContent,
  CardHeader, IconButton, Typography, Box, CircularProgress
} from '@material-ui/core';
import { AddLocationDialog } from './AddLocation';
import { defaultData } from '../Connection';
import { Add, Delete, Folder } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center",
    alignContent: "center",
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function Loading(props) {
  const classes = useStyles();
  const [dialogRef, setDialogRef] = useState(null)

  // const getData = async () => {
  //   props.setData(await props.getData(props.path));
  //   // console.log(locationData);
  // }

  // useEffect(() => {
  //   getData(props.path);
  // }, [props.path, dialogOpen])

  return (
    <Box className={classes.root}>
      <CircularProgress color="secondary" />
    </Box>
  )
}