import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Dialog, TextField, DialogTitle,
  List, ListItem, Button, DialogActions
} from '@material-ui/core';
import { addItemToServer } from '../Connection'

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

export function AddItemDialog(props){
  const { onClose, open, currentPath } = props;
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("ric");
  const [discription, setDiscription] = useState("");
  const classes = useStyles();

  const getTimeString = ()=>{
    const a = new Date();
    console.log(a);
    return a.toISOString()
  }

  const handleConfirm = async ()=>{
    const item = {
      name: name, 
      path: currentPath,
      owner: owner,
      time: getTimeString(),
      discription: discription
    };
    console.log(item);
    console.log(await addItemToServer(item));
    onClose();
  }

  return (
    <Dialog onClose={()=>{onClose()}} open={open} className={classes.dialog}>
      <DialogTitle id="addlocation">Add Item Here!</DialogTitle>
      <List>
        <ListItem>
          <TextField fullWidth id="name" label="Name" onChange={(event)=>{setName(event.target.value)}} />
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
          >Add</Button>
      </DialogActions>
    </Dialog>
  )
}