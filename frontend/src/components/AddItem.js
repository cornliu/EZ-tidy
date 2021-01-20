import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Dialog, TextField, DialogTitle,
  List, ListItem, Button, DialogActions
} from '@material-ui/core';
import { addItemToServer } from '../Connection'
import { AuthContext } from '../contexts';
import { useSnackbar } from 'notistack'

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
  const [description, setDescription] = useState("");
  const classes = useStyles();
  const auth = React.useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()

  const getTimeString = ()=>{
    const a = new Date();
    const year = ("0000" + String(a.getFullYear())).slice(-4)
    const month = ("0000" + String(a.getMonth()+1)).slice(-2)
    const day = ("0000" + String(a.getDate())).slice(-2)
    const hour = ("0000" + String(a.getHours())).slice(-2)
    const minute = ("0000" + String(a.getMinutes())).slice(-2)
    const str = year + "/" +month+"/"+day+" "+hour+":"+minute;
    console.log(str);
    return str
  }

  const handleConfirm = async ()=>{
    const item = {
      name: name, 
      path: currentPath,
      owner: owner,
      time: getTimeString(),
      username: auth.name,
      description: description
    };
    const {status, data} = await addItemToServer(item);
    enqueueSnackbar(data, {variant: status});
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
            id="description" 
            label="Description" 
            multiline 
            onChange={(event)=>{setDescription(event.target.value)}} />
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