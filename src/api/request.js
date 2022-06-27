/*
 * @Description: 封装 axios 及其请求拦截器
 * @Author: zhangxuelong
 * @Date: 2022-04-18 09:38:50
 */
import axios from 'axios';
import { VueAxios } from './axios';
import { BASE_URL } from '@/config/index';

const pendingMap = new Map();

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
  removePending(config);
  addPending(config);
  return config;
}, errorHandler);

// 添加响应拦截器
request.interceptors.response.use(response => {
  removePending(response.config);
  return response;
}, errorHandler);

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
  const { url, method, data } = config;
  let _data;

  if (data instanceof FormData) {
    _data = {};
    data.forEach((value, key) => {
      _data[key] = value;
    });
  } else {
    _data = '';
  }

  return [url, method, JSON.stringify(_data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(`重复点击：${pendingKey}`);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 去除所有列表里的请求（用于跳转路由等需要清空请求的情况）
 */
function clearPending() {
  //遍历map对象，用每个取消令牌逐一取消请求，起到清空所有请求的作用
  for (const [pendingKey, cancelToken] of pendingMap) {
    cancelToken(pendingKey);
  }
  //清空map对象
  pendingMap.clear();
}

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request);
  }
};

export { installer as VueAxios, request as axios, clearPending };
