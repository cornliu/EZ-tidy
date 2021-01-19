import { locationData, locationData_MKS, locationData_Freezer, pathList } from './testcases'
import { Redirect, Route } from "react-router-dom"
import { message } from 'antd'
import { ShelfTable1 } from './components/ShelfTable1'
import { useState } from 'react'
import { Overview } from './components'
import { Container } from '@material-ui/core'
import { Location } from './components/Location'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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


export default function MainArea(){
  const [pathlist, setPathlist] = useState(pathList)
  const classes = useStyles();
  

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {/* <h1>This is Title</h1> */}
      <Route path="/">
        <Redirect to="/home" />
      </Route>
      {/* <Route exact path="/" /> */}
      {pathlist.map((option, index)=>(
        option.template === "Overview" ? (
          <Route exact key={index} path={option.path} title={option.title}>
            <Overview path={option.path}/>
          </Route>
        ): option.template === "ShelfTable"? (
          <Route exact key={index} path={option.path} title={option.title}>
            <ShelfTable1 path={option.path}/>
          </Route>
        ): option.template === "Location"? (
          <Route exact key={index} path={option.path} title={option.title}>
            <Location path={option.path}/>
          </Route>
        ): (
          <p>Unrecognize template.</p>
        )
      ))}
    </div>
  )
}
