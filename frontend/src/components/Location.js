import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom';
import { locationData_Home } from '../testcases';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    height: 240,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function Location(props){
  const classes = useStyles();
  const path = props.path;
  // const locationlist = props.locationlist

  return (
    <div className={classes.paper}>
      {locationData_Home.locationList.map((location, index)=>(
        <Paper key={index} component={Link} elevation={3} to={location.path}>
          {location.title}
        </Paper>
      ))}
    </div>
  )
}