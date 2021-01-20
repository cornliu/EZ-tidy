import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Dialog, TextField, DialogTitle,
  List, ListItem, InputAdornment, Button, DialogActions
} from '@material-ui/core';
import { addLocationToServer } from '../Connection'

const useStyles = makeStyles((theme) => ({
  dialog: {
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  }
}));

export function AddLocationDialog(props){
  const { onClose, open } = props;
  const currentPath = (props.currentPath === "/")? ("") : (props.currentPath);
  const [title, setTitle] = useState("");
  const [subpath, setSubPath] = useState("");
  const [discription, setDiscription] = useState("");
  const classes = useStyles();

  const getTimeString = ()=>{
    const a = new Date();
    const year = ("0000" + String(a.getFullYear())).slice(-4)
    const month = ("0000" + String(a.getMonth()+1)).slice(-2)
    const day = ("0000" + String(a.getDay())).slice(-2)
    const hour = ("0000" + String(a.getHours())).slice(-2)
    const minute = ("0000" + String(a.getMinutes())).slice(-2)
    const str = year + "/" +month+"/"+day+" "+hour+":"+minute;
    console.log(str);
    return str
  }

  const handleConfirm = async ()=>{
    const location = {
      title: title, 
      path: currentPath + "/" + subpath,
      discription: discription,
      template: "",
      time: getTimeString(),
      parentpath: currentPath===""? "/":currentPath
    };
    console.log(location);
    console.log(await addLocationToServer(location));
    onClose();
  }

  return (
    <Dialog onClose={()=>{onClose()}} open={open} className={classes.dialog}>
      <DialogTitle id="addlocation">Add Location Here!</DialogTitle>
      <List>
        <ListItem>
          <TextField fullWidth id="title" label="Title" onChange={(event)=>{setTitle(event.target.value)}} />
        </ListItem>
        <ListItem>
          <TextField 
            id="path" 
            label="Path" 
            onChange={(event)=>{setSubPath(event.target.value)}} 
            InputProps={{
              startAdornment: <InputAdornment position="start">{currentPath + "/"}</InputAdornment>
            }} />
        </ListItem>
        <ListItem>
          <TextField 
            fullWidth 
            id="discription" 
            label="Discription" 
            multiline 
            onChange={(event)=>{setDiscription(event.target.value)}} />
        </ListItem>
      </List>
      <DialogActions>
        <Button 
          onClick={()=>{handleConfirm()}} 
          color="primary"
          >Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}