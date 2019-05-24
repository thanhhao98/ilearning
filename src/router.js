import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuickLookCourse from './views/QuickLookCourse.vue'
import AlreadyCourse from './views/AlreadyCourse.vue'
import WaitingCourse from './views/WaitingCourse.vue'
import LearnCourse from './views/LearnCourse.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quickLookCourse/:id',
      props: true,
      name: 'quickLookCourse',
      component: QuickLookCourse
    },
    {
      path: '/user/learnCourse/:id',
      props: true,
      name: 'learCourse',
      component: LearnCourse
    },
    {
      path: '/user/alreadyCourse',
      name: 'alreadyCourse',
      component: AlreadyCourse
    },
    {
      path: '/user/waitingCourse',
      name: 'waitingCourse',
      component: WaitingCourse
    }
  ]
})
