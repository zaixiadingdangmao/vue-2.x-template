/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 15:30:03
 */
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import routes from "./router";
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

const whitelist = ['viewPage', 'login'];
// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  
  if (to.name === "login") {
    removeSession();
  }

  if (sessionStorage.token || whitelist.includes(to.name)) {
    next();
  } else {
    next("/login");
    NProgress.done();
  }

  next();
});

function removeSession() {
  ["activeProjectId", "token"].forEach(key => {
    sessionStorage.removeItem(key);
  });
}

// 后置守卫
router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
