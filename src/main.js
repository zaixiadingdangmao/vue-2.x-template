import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/index';
import { VueAxios } from './api/request';
Vue.use(VueAxios);
import components from './components/index';
Vue.use(components);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
