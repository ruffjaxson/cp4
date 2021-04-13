import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Testimony from '../views/Testimony.vue'
import Browse from '../views/Browse.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/testimony',
    name: 'Testimony',
    component: Testimony
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
