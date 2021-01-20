import React, { useState } from 'react';
import {
  List, ListItem, ListItemText,
  Avatar, DialogTitle, Dialog, ListItemAvatar, TextField, InputAdornment, DialogActions, Button
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import PropTypes from 'prop-types';

export function LoginDialog(props) {
  const { auth, setAuth, open, onClose } = props;
  const [login, setLogin] = useState(auth.haslogin);
  const [name, setName] = useState(auth.name);
  const [password, setPassword] = useState(auth.password);

  const tryLogin = () => {
    const user = {
      name: name,
      password: password,
    }
    if (name && password) {
      console.log("try login")
      console.log(user)
    }
  }

  const trySignOut = () => {
    const user = {
      name: name,
      password: password,
    }
    console.log("try sign out")
    console.log(user)
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
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