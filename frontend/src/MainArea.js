import { locationData, locationData_MKS, locationData_Freezer, pathList } from './testcases'
import { Redirect, Route, Switch, useLocation, useParams } from "react-router-dom"
import { message } from 'antd'
import { ShelfTable1 } from './components/ShelfTable1'
import { useEffect, useState } from 'react'
import { Overview } from './components'
import { Container } from '@material-ui/core'
import { Location } from './components/Location'
import { makeStyles } from '@material-ui/core/styles';
import { defaultData, getLocationData } from './Connection'
import { Empty } from './components/Empty'
import { ShelfGrid } from './components/ShelfGrid'

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
  // const { currentPath } = useParams();
  let location = useLocation();
  const [pageData, setPageData] = useState(defaultData);
  const [path, setPath] = useState(location.pathname);

  const updatePageData = async (path) => {
    console.log("Getting Data for path:", path)
    setPageData(await getLocationData(path));
    console.log(pageData.locationlist)
  }

  useEffect(()=>{
    setPath(location.pathname);
  }, [location])

  useEffect(() => {
    updatePageData(path);
  }, [])

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {pageData.template === "Location" ? (
        <Location 
          path={path} 
          pageData={pageData} 
          getData={getLocationData}
          setData={setPageData} />
      ) : pageData.template === "ShelfTable" ? (
        <ShelfGrid 
          path={path} 
          pageData={pageData} 
          getData={getLocationData}
          setData={setPageData} />
      ) : (
        <Empty 
          path={path} 
          pageData={pageData} 
          getData={getLocationData}
          setData={setPageData} />
      )}
    </div>
  )
}
