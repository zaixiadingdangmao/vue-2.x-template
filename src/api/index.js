/*
 * @Description: 封装请求方式
 * @Author: zhangxuelong
 * @Date: 2022-04-18 09:38:50
 */
import { axios } from './request';

// 创建一个get请求
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(errorHandler);
  });
};

// 创建一个post请求
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        if (res.data.code == 200) {
          resolve(res.data.result);
        } else {
          console.error(url, res.data.result);
          reject(res.data.result);
        }
      })
      .catch(errorHandler);
  });
};

// 异常拦截处理器
const errorHandler = error => {
  console.error(error);
  return Promise.reject(error);
};

export { get, post };
