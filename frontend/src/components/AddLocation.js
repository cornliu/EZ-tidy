import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Container, Dialog, TextField, Typography, DialogTitle,
  List, ListItem, ListItemText
} from '@material-ui/core';

export function AddLocationDialog(props){
  const { onClose, open, currentPath } = props;
  const [title, setTitle] = useState("");
  const [subpath, setSubPath] = useState("");

  const handleClose = ()=>{
    onClose();
  }
  const handleConfirm = ()=>{
    console.log({add: true, title: title, path: currentPath+subpath});
    onClose()
  }

  return (
    // <div>
    //   <Typography variant="h3">Add Location!</Typography>
    //   <Container>
    //     <Typography>The title of the location: </Typography>
    //     <TextField id="title" label="title" />
    //   </Container>
      
    //   <Typography>Add Location!</Typography>
    //   <Typography>Add Location!</Typography>
    // </div>
    <Dialog onClose={()=>{onClose()}} open={open}>
      <DialogTitle id="addlocation">Add Location Here!</DialogTitle>
      <List>
        <ListItem>
          <TextField id="title" label="title" onChange={(event)=>{setTitle(event.target.value)}} />
        </ListItem>
        <ListItem>
          <Typography>props.currentPath</Typography>
          <TextField id="path" label="path" onChange={(event)=>{setSubPath(event.target.value)}} />
        </ListItem>
        <ListItem button onClick={()=>{handleConfirm()}}>
          <ListItemText primary="Confirm"></ListItemText>
        </ListItem>
      </List>
    </Dialog>
  )
}