import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box, CircularProgress
} from '@material-ui/core';

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

  return (
    <Box className={classes.root}>
      <CircularProgress color="secondary" />
    </Box>
  )
}