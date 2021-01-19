import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import { locationData_Home, locationData_MKS } from '../testcases';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import { AddLocationDialog } from './AddLocation';

const defaultData = {
  title: "Loading...",
  locationlist: [],
  itemlist: [],
  path: "/loading",
  template: "Location"
}

const useStyles = makeStyles((theme) => ({
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
  }
}));

export function Location(props){
  const classes = useStyles();
  const [locationData, setLocationData ] = useState(defaultData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)

  const getData = async ()=>{
    setLocationData(await props.getData(props.path));
    // console.log(locationData);
  }

  useEffect(()=>{
    getData(props.path);
  }, [props, dialogOpen])

  return (
    <div>
      <div>
        <Typography variant="h3">{locationData.title}</Typography>
      </div>
      <div className={classes.card}>
        {locationData.locationlist.map((location)=>(
          <Card key={location.path} component={Link} elevation={3} to={location.path}>
            <CardActionArea>
              <CardContent width={1} height={1}>
                <Typography >{location.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Card key="newlocation" elevation={3} onClick={()=>{setDialogOpen(true)}}>
          <CardActionArea>
            <CardContent>
              <Typography>Add New Location Here.</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <AddLocationDialog 
          ref={dialogRef} 
          onClose={()=>{setDialogOpen(false)}} 
          open={dialogOpen} 
          currentPath={locationData.path} />
      </div>
    </div>
  )
}