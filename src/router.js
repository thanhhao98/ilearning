import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuickLookCourse from './views/QuickLookCourse.vue'

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
    }
  ]
})
