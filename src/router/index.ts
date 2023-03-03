import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    redirect: '/choose1-1',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/choose1-1',
        component: () => import('@/views/choose1.1.vue'),
      },
      {
        path: '/choose1-2',
        component: () => import('@/views/choose1.2.vue'),
      },
      {
        path: '/choose2-1',
        component: () => import('@/views/choose2.1.vue'),
      },
      {
        path: '/choose2-2',
        component: () => import('@/views/choose2.2.vue'),
      },
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
