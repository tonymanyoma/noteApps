import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '../components/HelloWorld.vue'

Vue.use(VueRouter)
/*eslint-disable */
const routes = [
  {
    path: '/',
    name: 'home',
    component: Hello
  }


]

const router = new VueRouter({
  routes
})

export default router