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

// axiosApi.defaults.headers.common["Authorization"] = token

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token, "api helper")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
