import React from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
})


export default function test(){
  
  const getData = async ()=>{
    console.log(await instance.get("/bl"))
    const data = await instance.post("/bl", {path : "/bl"})
    // console.log("/");
    // const data = await instance.post("/")
    console.log(data);
    // return data
  }
  return(
    <div>
      {getData()}
      <p>施工中</p>
    </div>
  )
}