import axios from 'axios'

const API_ROOT = 'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
})

export const defaultData = {
  title: "Loading...",
  locationlist: [],
  itemlist: [],
  path: "/loading",
  template: ""
}

export const getLocationData = async (path) => {
  const {data} = await instance.post("/query", {path: path});
  if (data.title){
    return data;
  }
  else{
    console.log("Data request Error!");
    console.log(data);
    return defaultData;
  }
}

export const addItemToServer = async (item) =>{
  const {data} = await instance.post("/add/item", item);
  console.log(data);
  return data
}

export const addLocationToServer = async (location) =>{
  const {data} = await instance.post("/add/location", location);
  console.log(data);
  return data
}