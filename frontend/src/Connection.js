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
  const {data} = await instance.post("/", {path: path});
  if (data.title){
    return data;
  }
  else{
    console.log("Data request Error!");
    console.log(data);
    return defaultData;
  }
}