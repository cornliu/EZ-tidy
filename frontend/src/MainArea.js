import { useLocation, useHistory } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Location } from './components/Location'
import { makeStyles } from '@material-ui/core/styles';
import { defaultData, getLocationData } from './Connection'
import { Empty } from './components/Empty'
import { ShelfGrid } from './components/ShelfGrid'
import { Loading } from './components/Loading'
import { useSnackbar } from 'notistack'

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

export default function MainArea(props) {
  const classes = useStyles();
  // const { currentPath } = useParams();
  let location = useLocation();
  const [pageData, setPageData] = useState(defaultData);
  const [path, setPath] = useState(location.pathname);
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  const updatePageData = async () => {
    props.reNew();
    setPath(history.location.pathname);
    console.log("UpdatePageData:", history.location.pathname)
    // enqueueSnackbar("Loading ...");
    const {status, data} = await getLocationData(history.location.pathname);
    if (status === "success") {
      setPageData(data);
    }
    else {
      console.log("error in update pageData")
      console.log(JSON.stringify(data));
      enqueueSnackbar(data, { variant: "error" });
      enqueueSnackbar("Redirected to home.", { variant: "info" })
      history.push("/")
    }
  }

  // useEffect(() => {
  // }, [])

  useEffect(() => {
    setPath(history.location.pathname);
    updatePageData();
    history.listen(()=>{
      updatePageData()
    })
  }, [])

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {pageData.template === "Location" ? (
        <Location
          path={path}
          pageData={pageData}
          getData={() => {updatePageData()}}
          setData={setPageData} />
      ) : pageData.template === "ShelfTable" ? (
        <ShelfGrid
          path={path}
          pageData={pageData}
          getData={() => {updatePageData()}}
          setData={setPageData} />
      ) : pageData.template === "Empty" ? (
        <Empty
          path={path}
          pageData={pageData}
          getData={() => {updatePageData()}}
          setData={setPageData} />
      ) : (
        <Loading
          path={path}
          pageData={pageData}
          getData={() => {updatePageData()}}
          setData={setPageData} />
      )}
    </div>
  )
}
