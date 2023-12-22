import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axiosInstance from './axios';

import './assets/stylesheets/application.scss'

Vue.prototype.$http = axiosInstance;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
