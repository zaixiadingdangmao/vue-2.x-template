/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 16:18:24
 */

const filterList = [
  {
    label: '',
    callback(value) {
      return value 
    }
  }
];

export default {
  install(Vue) {
    filterList.forEach(item => {
      const { label, callback } = item;
      Vue.filter(label, callback);
    });
  }
};
