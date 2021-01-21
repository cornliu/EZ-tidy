import React, { useContext, useEffect, useState } from 'react';
import {
  List, ListItem, ListItemText, Avatar, DialogTitle,
  Dialog, ListItemAvatar, TextField, DialogActions, Button,
  Box, Card, CardHeader, CardActionArea, CardMedia, CardContent, Typography, makeStyles, CardActions
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons'
import { loginToServer, addUserToServer } from '../Connection';
import { AuthContext } from '../contexts'
import { useSnackbar } from 'notistack';

export function LoginDialog(props) {
  const auth = useContext(AuthContext)
  const [login, setLogin] = useState(auth.haslogin);
  const [name, setName] = useState(auth.name);
  const [password, setPassword] = useState(auth.password);

  const tryLogin = async () => {
    const user = {
      name: name,
      password: password,
    }
    if (name && password) {
      const msg = (await loginToServer(user));
      console.log("try login:", msg)
      if (msg === true) {
        props.setAuth({
          haslogin: true,
          name: name,
          password: password,
          identity: name === "Admin" ? "Admin" : "User"
        })
        props.onClose();
      }
    }
  }

  useEffect(() => {
    setLogin(auth.haslogin);
    setName(auth.name);
    setPassword(auth.password);
  }, [auth])

  const trySignOut = () => {
    console.log("try sign out")
    props.setAuth({
      haslogin: false,
      name: name,
      password: "",
      identity: "User"
    })
  }

  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      {!login && (
        <DialogTitle id="dialog-title">
          Login
        </DialogTitle>
      )}
      {login && (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        </List>
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

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    minHeight: "100%",
    height: "100%",
    width: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: theme.spacing(8),
  },
  cardcontent: {
    display: 'flex',
    flexDirection: 'column',
  },
  textfield: {
    margin: theme.spacing(1),
  },
  cardactions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex_end",
  },
}))

export function Login(props) {
  const { setAuth } = props;
  const classes = useStyle();
  const auth = useContext(AuthContext);
  const [login, setLogin] = useState(auth.haslogin);
  const [name, setName] = useState(auth.name);
  const [password, setPassword] = useState(auth.password);
  const { enqueueSnackbar } = useSnackbar();

  const tryLogin = async () => {
    const user = {
      name: name,
      password: password,
    }
    if (name && password) {
      const { status, data } = await loginToServer(user);
      if (status === "success") {
        props.setAuth({
          haslogin: true,
          name: name,
          password: password,
          identity: name === "Admin" ? "Admin" : "User"
        })
      }
      enqueueSnackbar(data, { variant: status });
    }
  }

  const createUser = async () => {
    const user = {
      name: name,
      password: password,
      identity: "User"
    }
    if (name && password) {
      const { status, data } = await addUserToServer(user);
      enqueueSnackbar(data, { variant: status });
      if (status === "success") {
        setName("");
        setPassword("");
      }
    }
  }

  useEffect(() => {
    setName(auth.name);
    setPassword(auth.password);
  }, [auth])

  const trySignOut = () => {
    console.log("try sign out")
    props.setAuth({
      haslogin: false,
      name: name,
      password: "",
      identity: "User"
    })
  }

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardMedia>
          <Lock />
        </CardMedia>
        <CardContent className={classes.cardcontent}>
          <Typography gutterBottom>
            登入
          </Typography>
          <TextField label="username" variant='outlined'
            value={name}
            className={classes.textfield}
            onChange={(e) => { setName(e.target.value) }} />
          <TextField label="password" variant='outlined'
            value={password}
            className={classes.textfield} type='password'
            onChange={(e) => { setPassword(e.target.value) }} />
        </CardContent>
        <CardActions>
          <Button variant="text" color="primary"
            onClick={() => createUser()} >
            Register
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => tryLogin()} >
            Log in
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}