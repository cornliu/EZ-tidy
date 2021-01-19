import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  TableBody, Table, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Typography 
} from '@material-ui/core'

const defaultData = {
  title: "Loading...",
  locationlist: [],
  itemlist: [],
  path: "/loading",
  template: "ShelfTable"
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export function ShelfTable1(props){
  const classes = useStyles();
  const [pageData, setPageData] = useState(defaultData);

  const getData = async ()=>{
    setPageData(await props.getData(props.path));
    console.log(pageData);
  }

  useEffect(()=>{
    getData(props.path);
  }, [props])

  return (
    <div>
      <div>
        <Typography variant="h3">{pageData.title}</Typography>
      </div>
      <TableContainer component = {Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.itemlist.map((row, index)=>(
              <TableRow  key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}