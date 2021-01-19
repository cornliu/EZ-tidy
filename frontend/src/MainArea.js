import { pathList } from './testcases'
import { Route } from "react-router-dom"
import { ShelfTable1 } from './components/ShelfTable1'
import { useState } from 'react'
import { Location } from './components/Location'
import { makeStyles } from '@material-ui/core/styles';
import { getLocationData, defaultData } from './Connection'

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
  const [path, setPath] = useState("")
  const [locationData, setLocationData] = useState(defaultData);
  // const getLocationData = async (path) => {
  //   const {data} = await instance.post("/", {path: path});
  //   if (data.title){
  //     return data;
  //   }
  //   else{
  //     console.log("Data request Error!");
  //     console.log(data);
  //     return defaultData;
  //   }
  // }

  // useEffect(()=>{
  //   setLocationData(getLocationData("/"));
  // }, [])

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {pathlist.map((option, index)=>(
        option.template === "ShelfTable"? (
          <Route exact key={index} path={option.path} title={option.title}>
            <ShelfTable1 path={option.path} getData={getLocationData}/>
          </Route>
        ): option.template === "Location"? (
          <Route exact key={index} path={option.path} title={option.title}>
            <Location path={option.path} getData={getLocationData}/>
          </Route>
        ): (
          <p>Unrecognize template.</p>
        )
      ))}
      {/* <Route exact key="addlocation" path="/addlocation">
        <AddLocation />
      </Route> */}
    </div>
  )
}
