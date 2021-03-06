import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, AppBar, Toolbar, List, CssBaseline, Typography,
  Divider, IconButton, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { 
  Menu, ChevronLeft, ChevronRight, Home, Room, 
  FormatListNumbered, Error, ArrowBack 
} from '@material-ui/icons'
import { Switch, Route, useHistory } from "react-router-dom"
import { message, Button, Input } from 'antd'
import MainArea from './MainArea'
import { UserAvatar } from './components/Login';
import { defaultData, getLocationData } from './Connection';
import { AuthContext, SetReloadContext } from './contexts'
import { useSnackbar } from 'notistack';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pathList, setPathList] = useState([]);
  const [pageData, setPageData] = useState(defaultData);
  const auth = useContext(AuthContext)
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updatePathList = async () => {
    const {status, data} = await getLocationData("/");
    if(status === "error"){
      enqueueSnackbar( data, {variant: "error"} )
    }
    else {
      // console.log("Get pathList!");
      setPathList(data.locationlist);
    }
  }

  useEffect(() => {
    updatePathList();
  }, [])

  return (
    <AuthContext.Provider value={auth}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <Menu />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => { history.push("/") }}>
              <Home />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => { history.goBack() }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              EZ Tidy
            </Typography>
            {auth && (
              <UserAvatar className={classes.avatar} auth={auth} setAuth={props.setAuth} />
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <ListItem button key="/" onClick={() => history.push("/")} >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {pathList.map((option) => option.template === "Location" ? (
              <ListItem button key={option.path} onClick={() => history.push(option.path)} >
                <ListItemIcon><Room /></ListItemIcon>
                <ListItemText primary={option.title} />
              </ListItem>
            ) : option.template === "ShelfTable" ? (
              <ListItem button key={option.path} onClick={() => history.push(option.path)} >
                <ListItemIcon><FormatListNumbered /></ListItemIcon>
                <ListItemText primary={option.title} />
              </ListItem>
            ) : (
                  <ListItem button key={option.path} onClick={() => history.push(option.path)} >
                    <ListItemIcon><Error /></ListItemIcon>
                    <ListItemText primary={option.title} />
                  </ListItem>
                ))}
          </List>
        </Drawer>
        <Switch>
          <Route path="/" children={
            <MainArea className={classes.content} reNew={()=> updatePathList()} />
          } />
        </Switch>
      </ div>
    </AuthContext.Provider>
  );
}


