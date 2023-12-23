import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axiosInstance from './axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueScheduler from 'v-calendar-scheduler';
import Vuesax from 'vuesax'
import momentPlugin from './moment';
import VueCountryCode from "vue-country-code";


import './assets/stylesheets/application.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'v-calendar-scheduler/lib/main.css';

import 'vuesax/dist/vuesax.css'


Vue.use(momentPlugin);

Vue.use(VueCountryCode);

Vue.use(Vuesax, {
 
})

Vue.use(VueScheduler,{
  locale: 'es'
});

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$http = axiosInstance;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
