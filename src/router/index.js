import Vue from 'vue'
import VueRouter from 'vue-router'
import WritingPanel from '@/views/WritingPanel/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WritingPanel',
    component: WritingPanel
  },
  {
    path: '/data',
    name: 'DataPanel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DataPanel')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
