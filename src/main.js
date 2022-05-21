/*
 * @Description: 项目主文件
 * @Author: zhangxuelong
 * @Date: 2022-04-17 18:17:48
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/index';

import { VueAxios } from './api/request';
Vue.use(VueAxios);
import components from './components/index';
Vue.use(components);

import directives from './utils/directives';
Vue.use(directives);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
