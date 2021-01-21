import axios from 'axios'

const API_ROOT = ''
const instance = axios.create({
  baseURL: API_ROOT
})

export const defaultData = {
  title: "Loading...",
  locationlist: [],
  itemlist: [],
  commonlist: [],
  path: "/loading",
  template: ""
}

export const getLocationData = async (path) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/query", { path: path });
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const addItemToServer = async (item) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/add/item", item);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const addLocationToServer = async (location) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/add/location", location);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const loginToServer = async (user) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/check", user);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
    if (data === false) {
      data = " Failed: Wrong Password. ";
    }
  } finally {
    if (data === true) {
      data = "Login Successfully.";
    }
    return {
      status: status,
      data: data
    }
  }
}

export const addUserToServer = async (user) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/add/user", user);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const deleteItems = async (req) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/remove/item", req);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const deleteLocation = async (req) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/remove/location", req);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}

export const returnItemToServer = async (req) => {
  let data = null;
  let status = "success";
  try {
    const res = await instance.post("/add/returnitem", req);
    data = res.data;
  } catch (err) {
    status = "error";
    data = err.response.data;
  } finally {
    return {
      status: status,
      data: data
    }
  }
}
