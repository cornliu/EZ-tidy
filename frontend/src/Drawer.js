// 網頁的模板
// 包括AppBar及SideMenu
// 主要內容在MainArea中

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { 
  Drawer, AppBar, Toolbar, List, CssBaseline, Typography, 
  Divider, IconButton, ListItem, ListItemIcon, ListItemText ,
  Avatar, DialogTitle, Dialog, ListItemAvatar, 
} from '@material-ui/core';
import { Menu, ChevronLeft, ChevronRight, Add, Home, Room, FormatListNumbered, Error } from '@material-ui/icons'
import { Link, Switch, Route } from "react-router-dom"
// import { sendData } from './useSend'
import { message ,Button ,Input } from 'antd'
import MainArea from './MainArea'
import { pathList } from './testcases'
import PropTypes from 'prop-types';
// import { UserAvatar } from './login';


import { defaultData, getLocationData } from './Connection';
import { Location } from './components';
// import { pathList } from './testcases'

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pathList, setPathList] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  };
  const updatePathList = async ()=>{
    const tmp_Data = await getLocationData("/");
    if (tmp_Data.locationlist){
      console.log("Get pathList!");
      console.log(tmp_Data.locationlist);
      setPathList(tmp_Data.locationlist);
    }
    else{
      console.log("Error! can't find location Data!");
      console.log(tmp_Data);
    }
  }

  useEffect(()=>{
    updatePathList();
  }, [])

  return (
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
          <Typography variant="h6" noWrap>
            EZ Tidy
          </Typography>
          {/* <UserAvatar style="float:right" setLogin={setLogin}/> */}
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
          <ListItem button component={Link} key="/" to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pathList.map((option) => option.template === "Location" ? (
            <ListItem button component={Link} key={option.path} to={option.path} >
              <ListItemIcon><Room /></ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItem>
          ): option.template === "ShelfTable" ? (
            <ListItem button component={Link} key={option.path} to={option.path} >
              <ListItemIcon><FormatListNumbered /></ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItem>
          ): (
            <ListItem button component={Link} key={option.path} to={option.path} >
              <ListItemIcon><Error /></ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Switch>
        <Route exact path="/">
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Location path="/" getData={getLocationData} />
          </div>
        </Route>
        <Route path="/:currentPath" children={
          <MainArea className={classes.content} />
        } />
      </Switch>
    </div>
  );
}


