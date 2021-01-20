import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import { AddLocationDialog } from './AddLocation';
import { AddItemDialog } from './AddItem'
import { defaultData } from '../Connection';

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

export function Empty(props){
  const classes = useStyles();
  let locationData = props.pageData;
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [addLocationDialogOpen, setAddLocationDialogOpen] = useState(false);
  const [dialogRef, setDialogRef] = useState(null)

  // const getData = async ()=>{
  //   console.log("Query from Empty");
  //   props.setData(await props.getData(props.path));
  // }

  useEffect(()=>{
    props.getData();
  }, [props.path, addItemDialogOpen, addLocationDialogOpen])

  return (
    <div>
      <div>
        <Typography variant="h3">{locationData.title}</Typography>
        <Typography >{locationData.description}</Typography>
      </div>
      <div className={classes.card}>
        <Card key="newitem"  elevation={3} onClick={()=>{setAddItemDialogOpen(true)}}>
          <CardActionArea>
            <CardContent>
              <Typography>Add the first item</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card key="newlocation" elevation={3} onClick={()=>{setAddLocationDialogOpen(true)}}>
          <CardActionArea>
            <CardContent>
              <Typography>Add the first location</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <AddLocationDialog 
          ref={dialogRef} 
          onClose={()=>{setAddLocationDialogOpen(false)}} 
          open={addLocationDialogOpen} 
          currentPath={locationData.path} />
        <AddItemDialog 
          onClose={()=>{setAddItemDialogOpen(false)}} 
          open={addItemDialogOpen} 
          currentPath={locationData.path} />
      </div>
    </div>
  )
}