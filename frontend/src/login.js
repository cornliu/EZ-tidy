import React, { useState } from 'react';
import {
  List, ListItem, ListItemText,
  Avatar, DialogTitle, Dialog, ListItemAvatar, TextField, InputAdornment, DialogActions, Button
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons'
import PropTypes from 'prop-types';
import { check } from '../backend/route';

const emails = ['username@gmail.com', 'user02@gmail.com'];
export function LoginDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [formState, setFormState] = useState({
    haslogin: false,
    password: '',
    name: '',
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {formState.haslogin ? (
        <DialogTitle id="simple-dialog-title">
          {formState.name}
        </DialogTitle>
      ) : (
          <DialogTitle id="simple-dialog-title">
            登入
          </DialogTitle>
        )}
      {formState.haslogin ? (
        <List>
        </List>
      ) : (
          <List>
            <ListItem>
              <TextField
                fullwidth={true}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                lebal="Username"
                placeholder="Username"
              />
            </ListItem>
            <ListItem>
              <TextField
                fullwidth={true}
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                lebal="password"
                placeholder="password"
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="No account?" />
            </ListItem>
          </List>
        )
      }

      {
        formState.haslogin ? (
          <DialogActions>
            <Button
              onClick={async () => {
                setFormState({
                  ...formState,
                  haslogin: false,
                  password: '',
                  name: ''
                })
                handleClose(true);
              }} >
              sign out
            </Button>
          </DialogActions>
        ) : (
            <DialogActions>
              <Button
                onClick={async () =>
                  setFormState({
                    ...formState,
                    haslogin: true,
                  })}
              >
                log in
            </Button>
            </DialogActions>
          )
      }

    </Dialog >
  );
}

LoginDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export function UserAvatar(props) {
  const [openn, setOpenn] = useState(false)
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = (() => {
    setOpenn(true);
  });

  const handleClose = ((value) => {
    setOpenn(false);
    setSelectedValue(value);
  });
  return (
    <div>
      <AccountCircle
        onClick={async () =>
          handleClickOpen()
        }
      />
      <LoginDialog selectedValue={selectedValue} open={openn} onClose={handleClose} />
    </div>
  )
}