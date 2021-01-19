import { locationData, locationData_MKS, locationData_Freezer, pathList } from './testcases'
import { Redirect, Route, Switch, useParams } from "react-router-dom"
import { message } from 'antd'
import { ShelfTable1 } from './components/ShelfTable1'
import { useEffect, useState } from 'react'
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

export default function MainArea() {
  const classes = useStyles();
  const { currentPath } = useParams();
  const [pageData, setPageData] = useState(defaultData);

  const updatePageData = async (path) => {
    console.log("Getting Data for path:", "/" + path)
    setPageData(await getLocationData("/" + path));
    console.log(pageData.locationlist)
  }

  useEffect(() => {
    updatePageData(currentPath)
  }, [currentPath])

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {pageData.template === "Location" ? (
        <Location path={"/" + currentPath} getData={getLocationData} />
      ) : pageData.template === "ShelfTable" ? (
        <ShelfTable1 path={"/" + currentPath} getData={getLocationData} />
      ) : (
            <p>Unrecognize template.</p>
          )}
      {/* {pageData.locationlist.map((option)=>(
        option.template === "ShelfTable"? (
          <Route exact key={option.path} path={option.path} >
            <ShelfTable1 path={option.path} getData={getLocationData} />
          </Route>
        ): option.template === "Location"? (
          <Route exact key={option.path} path={option.path} >
            <Location path={option.path} getData={getLocationData} />
          </Route>
        ): (
          <p>Unrecognize template.</p>
        )
      ))} */}
    </div>
  )
}

// function Child() {
//   let { path } = useParam();

//   useEffect(()=>{
//     getLocationData(path);
//   })
// }