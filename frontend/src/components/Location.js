import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import { locationData_Home, locationData_MKS } from '../testcases';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';

const defaultData = {
  title: "Loading...",
  locationList: [],
  itemList: [],
  path: "/loading",
  template: "Location"
}

const useStyles = makeStyles((theme) => ({
  card: {
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
  // const path = props.path;
  const [locationData, setLocationData ] = useState(defaultData);

  const getData = ()=>{
    // console.log(props.path);
    // const data = await instance.post(props.path)
    // console.log(data);
    // // return data
    console.log(props.path);
    switch (props.path) {
      case "/mks":
        setLocationData(locationData_MKS);
        break;
      case "/home":
        setLocationData(locationData_Home);
        break
      default:
        setLocationData(locationData_MKS);
        console.log("Error! locationData Not found.")
        break;
    }
  }

  useEffect(()=>{
    getData();
  }, [props.path, getData])

  return (
    <div className={classes.card}>
      {locationData.locationList.map((location, index)=>(
        <Card key={index} component={Link} elevation={3} to={location.path}>
          <CardActionArea>
            <CardContent>
              <Typography >{location.title}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}