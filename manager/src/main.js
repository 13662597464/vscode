import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '../src/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios';
import '../api/mock';

Vue.use(ElementUI);

Vue.prototype.$http = http;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({
      name: "login"
    })
  } else if (token && to.name === 'login') {
    next({
      name: "Home"
    })
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router);
    store.commit('clearTag');
  }
}).$mount('#app')