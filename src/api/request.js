import axios from 'axios';
import { VueAxios } from './axios';
import { BASE_URL } from '@/config/index';

// 创建 axios 实例
const request = axios.create({
  baseURL: BASE_URL.api,
  timeout: 20000,
  withCredentials: false
});

// 异常拦截处理器
const errorHandler = error => {
  return Promise.reject(error);
};
// 添加请求拦截器
request.interceptors.request.use(config => {
  return config;
}, errorHandler);

// 添加响应拦截器
request.interceptors.response.use(res => {
  // 响应处理
  return res;
}, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request);
  }
};

export { installer as VueAxios, request as axios };
