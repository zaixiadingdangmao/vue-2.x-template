/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 16:18:36
 */
/*
 * @Description: echarts 工具
 * @Author: zhangxuelong
 * @Date: 2022-04-19 13:55:35
 */

import * as echarts from 'echarts';

export default {
  install(Vue) {
    Vue.echarts = echarts;
    window.echarts = echarts;

    Object.defineProperties(Vue.prototype, {
      echarts: {
        get() {
          return echarts;
        }
      },
      $echarts: {
        get() {
          return echarts;
        }
      }
    });
  }
};
