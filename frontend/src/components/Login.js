import React, { useEffect, useState } from 'react';
import {
  List, ListItem, ListItemText, Avatar, DialogTitle, 
  Dialog, ListItemAvatar, TextField, DialogActions, Button
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import { loginToServer } from '../Connection';

export function LoginDialog(props) {
  const [login, setLogin] = useState(props.auth.haslogin);
  const [name, setName] = useState(props.auth.name);
  const [password, setPassword] = useState(props.auth.password);

  const tryLogin = async () => {
    const user = {
      name: name,
      password: password,
    }
    if (name && password) {
      const msg = (await loginToServer(user));
      console.log("try login:", msg)
      if (msg===true){
        props.setAuth({
          haslogin: true,
          name: name,
          password: password
        })
        props.onClose();
      }
    }
  }

  useEffect(()=>{
    setLogin(props.auth.haslogin);
    setName(props.auth.name);
    setPassword(props.auth.password);
  }, [props.auth])

  const trySignOut = () => {
    console.log("try sign out")
    props.setAuth({
      haslogin: false,
      name: name,
      password: ""
    })
  }

  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      {login ? (
        <DialogTitle id="dialog-title">
          {name}
        </DialogTitle>
      ) : (
          <DialogTitle id="dialog-title">
            Login
          </DialogTitle>
        )}
      {!login && (
        <List>
          <ListItem>
            <TextField
              required
              fullwidth={true}
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              label="Username"
            />
          </ListItem>
          <ListItem>
            <TextField
              required
              fullwidth={true}
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              label="password"
            />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="No account?" />
          </ListItem>
        </List>
      )
      }
      { login ? (
        <DialogActions>
          <Button onClick={() => { trySignOut() }} >Sign out</Button>
        </DialogActions>
      ) : (
          <DialogActions>
            <Button onClick={() => tryLogin()} >Login</Button>
          </DialogActions>
        )
      }
    </Dialog >
  );
}

// LoginDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

export function UserAvatar(props) {
  const [open, setOpen] = useState(false);
  const { auth, setAuth } = props;

  return (
    <div>
      <AccountCircle
        onClick={() => { setOpen(true) }}
      />
      <LoginDialog
        auth={auth}
        setAuth={setAuth}
        open={open}
        onClose={() => { setOpen(false) }} />
    </div>
  )
}