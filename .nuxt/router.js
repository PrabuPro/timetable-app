import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1a01fab7 = () => interopDefault(import('..\\pages\\course.vue' /* webpackChunkName: "pages/course" */))
const _81c82924 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _19a3177d = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _2a1ffbca = () => interopDefault(import('..\\pages\\place.vue' /* webpackChunkName: "pages/place" */))
const _8bb53b62 = () => interopDefault(import('..\\pages\\student.vue' /* webpackChunkName: "pages/student" */))
const _9448986c = () => interopDefault(import('..\\pages\\studentCourse.vue' /* webpackChunkName: "pages/studentCourse" */))
const _de84ff14 = () => interopDefault(import('..\\pages\\teacher.vue' /* webpackChunkName: "pages/teacher" */))
const _710a6196 = () => interopDefault(import('..\\pages\\timetable.vue' /* webpackChunkName: "pages/timetable" */))
const _700e3f67 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
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
    path: "/course",
    component: _1a01fab7,
    name: "course"
  }, {
    path: "/inspire",
    component: _81c82924,
    name: "inspire"
  }, {
    path: "/login",
    component: _19a3177d,
    name: "login"
  }, {
    path: "/place",
    component: _2a1ffbca,
    name: "place"
  }, {
    path: "/student",
    component: _8bb53b62,
    name: "student"
  }, {
    path: "/studentCourse",
    component: _9448986c,
    name: "studentCourse"
  }, {
    path: "/teacher",
    component: _de84ff14,
    name: "teacher"
  }, {
    path: "/timetable",
    component: _710a6196,
    name: "timetable"
  }, {
    path: "/user",
    component: _700e3f67,
    name: "user"
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
