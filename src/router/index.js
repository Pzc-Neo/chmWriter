import Vue from 'vue'
import VueRouter from 'vue-router'
import WritingPanel from '@/views/WritingPanel/'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  } else {
    return originalPush.call(this, location).catch(err => err)
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/writing'
  },
  {
    path: '/writing',
    name: 'WritingPanel',
    component: WritingPanel
  },
  {
    path: '/setting',
    name: 'SettingPanel',
    component: () => import('@/views/SettingPanel')
  },
  {
    path: '/data',
    name: 'DataPanel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DataPanel')
  },
  {
    path: '/world',
    name: 'WorldPanel',
    component: () => import('@/views/WorldPanel')
  },
  {
    path: '/character',
    name: 'CharacterPanel',
    component: () => import('@/views/CharacterPanel')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
