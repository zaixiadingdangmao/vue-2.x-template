/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-04-18 09:35:43
 */
import { firstLetter } from '../utils/tool.js';
// 注册全局组件
export default {
  install(Vue) {
    // 所有组件
    const componentsList = require.context('./', false, /.(vue)$/);
    componentsList.keys().forEach(fileName => {
      // 组件名称
      const componentName = firstLetter(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      );
      const componentConfig = componentsList(fileName);
      Vue.component(componentName, componentConfig.default || componentConfig);
    });
  }
};
