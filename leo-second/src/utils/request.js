import axios from "axios";

const request = axios.create({
  baseURL: "/",
  timeout: 5000 // 请求超时时间
});

// request.get("/db.json").then(responce => {
//     console.log(responce.data);
// });

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default request; // 导出对象
