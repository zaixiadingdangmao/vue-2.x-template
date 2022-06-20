/*
 * @Description: 注册全局组件
 * @Author: zhangxuelong
 * @Date: 2022-04-18 09:35:43
 */

import { firstLetter } from '../utils/tool.js';

export default {
  install(Vue) {
    const componentsList = require.context('./', true, /\w+\/index\.js$/);

    componentsList.keys().forEach(fileName => {
      const componentName = firstLetter(fileName.split('/')[1].replace(/\.\w+$/, ''));

      const componentConfig = componentsList(fileName);

      Vue.component(componentName, componentConfig.default || componentConfig);
    });
  }
};
