/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 16:18:17
 */
/*
 * @Description: 类型工具函数
 * @Author: zhangxuelong
 * @Date: 2022-04-21 22:10:46
 */

/**
 * 判断是否为对象
 * @param {object} obj
 * @return {boolean}
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
