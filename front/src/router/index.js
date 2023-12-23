import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexCalendar from '../Home/IndexCalendar'
import IndexNotes from '../Notes/IndexNotes'

Vue.use(VueRouter)
/*eslint-disable */
const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexCalendar
  },
  {
    path: '/note_list',
    name: 'notes',
    component: IndexNotes
  }


]

const router = new VueRouter({
  routes
})

export default router