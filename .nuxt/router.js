import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _81c82924 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _19a3177d = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _8bb53b62 = () => interopDefault(import('..\\pages\\student.vue' /* webpackChunkName: "pages/student" */))
const _de84ff14 = () => interopDefault(import('..\\pages\\teacher.vue' /* webpackChunkName: "pages/teacher" */))
const _710a6196 = () => interopDefault(import('..\\pages\\timetable.vue' /* webpackChunkName: "pages/timetable" */))
const _4ffb7466 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _81c82924,
    name: "inspire"
  }, {
    path: "/login",
    component: _19a3177d,
    name: "login"
  }, {
    path: "/student",
    component: _8bb53b62,
    name: "student"
  }, {
    path: "/teacher",
    component: _de84ff14,
    name: "teacher"
  }, {
    path: "/timetable",
    component: _710a6196,
    name: "timetable"
  }, {
    path: "/",
    component: _4ffb7466,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
