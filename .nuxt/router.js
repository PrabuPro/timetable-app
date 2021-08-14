import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2f2a7e55 = () => interopDefault(import('..\\pages\\course.vue' /* webpackChunkName: "pages/course" */))
const _4f03db90 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _f4a6afc2 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _56f992bd = () => interopDefault(import('..\\pages\\place.vue' /* webpackChunkName: "pages/place" */))
const _4a0d5271 = () => interopDefault(import('..\\pages\\student.vue' /* webpackChunkName: "pages/student" */))
const _20a57098 = () => interopDefault(import('..\\pages\\teacher.vue' /* webpackChunkName: "pages/teacher" */))
const _05b18252 = () => interopDefault(import('..\\pages\\timetable.vue' /* webpackChunkName: "pages/timetable" */))
const _73c1daf6 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _87f5f5f0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/course",
    component: _2f2a7e55,
    name: "course"
  }, {
    path: "/inspire",
    component: _4f03db90,
    name: "inspire"
  }, {
    path: "/login",
    component: _f4a6afc2,
    name: "login"
  }, {
    path: "/place",
    component: _56f992bd,
    name: "place"
  }, {
    path: "/student",
    component: _4a0d5271,
    name: "student"
  }, {
    path: "/teacher",
    component: _20a57098,
    name: "teacher"
  }, {
    path: "/timetable",
    component: _05b18252,
    name: "timetable"
  }, {
    path: "/user",
    component: _73c1daf6,
    name: "user"
  }, {
    path: "/",
    component: _87f5f5f0,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
