import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const token = accessToken

//apply base url for axios
// const API_URL = ""

// const axiosApi = axios.create({
//   baseURL: API_URL,
// })

axios.defaults.baseURL = "http://65.0.98.102:7005";

// const token = localStorage.getItem("token");
// const removequote = JSON.parse(token)
// const test = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WzJdLCJhcHBBZG1pbiI6ZmFsc2UsInRlbmFudEFkbWluIjp0cnVlLCJ0ZW5hbnRJZCI6MSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlRFTkFOVF9BRE1JTiJ9XSwiYXV0aElkIjoxNDMsInN1YiI6ImJhYmlzdW1pdEBnbWFpbC5jb20iLCJpYXQiOjE3MDE4NjA5NjUsImV4cCI6MTcwMjcyNDk2NX0.yf3B3xobra7OlFK4kE-J2K2yk9wFy9XSTQwp1bxR8ngJiZeVep_6Xjt_AG-2mHrD8F3-VSQ5_7VTxU4Liu3DDQ"
// console.log(removequote, "token");
// console.log(test, "test");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `${token}`
// }
// axios.defaults.headers.common["Authorization"] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WzJdLCJhcHBBZG1pbiI6ZmFsc2UsInRlbmFudEFkbWluIjp0cnVlLCJ0ZW5hbnRJZCI6MSwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlRFTkFOVF9BRE1JTiJ9XSwiYXV0aElkIjoxNDMsInN1YiI6ImJhYmlzdW1pdEBnbWFpbC5jb20iLCJpYXQiOjE3MDE4NjA5NjUsImV4cCI6MTcwMjcyNDk2NX0.yf3B3xobra7OlFK4kE-J2K2yk9wFy9XSTQwp1bxR8ngJiZeVep_6Xjt_AG-2mHrD8F3-VSQ5_7VTxU4Liu3DDQ"

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const removequote = JSON.parse(token)
    if (token) {
      config.headers["Authorization"] = removequote;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosInstance.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosInstance
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosInstance
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosInstance
    .delete(url, { ...config })
    .then(response => response.data)
}
