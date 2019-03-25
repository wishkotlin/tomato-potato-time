import axios from "axios";

const appid = "";
const appsecrect = "";

const instance = axios.create({
  baseURL: "https://gp-server.hunger-valley.com/",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "t-app-id": appid,
    "t-app-secret": appsecrect
  }
});

//拦截器
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = `Bearer ${xToken}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(response.headers["x-token"]){
        localStorage.setItem("x-token",response.headers["x-token"])
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
