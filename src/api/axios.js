 const VueAxios = {
  vm: {},
  install(Vue, instance) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      console.error('You have to install axios');
      return;
    }

    Vue.axios = instance;
    window.axios = instance;

    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return instance;
        }
      },
      $http: {
        get() {
          return instance;
        }
      }
    });
  }
};

export { VueAxios };
