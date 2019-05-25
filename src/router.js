import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuickLookCourse from './views/QuickLookCourse.vue'
import AlreadyCourse from './views/AlreadyCourse.vue'
import WaitingCourse from './views/WaitingCourse.vue'
import LearnCourse from './views/LearnCourse.vue'
import TeacherMyCourse from './views/TeacherMyCourse.vue'
import TeacherDetailCourse from './views/TeacherDetailCourse.vue'
import TeacherAddDoc from './views/TeacherAddDoc.vue'
import TeacherAddVideo from './views/TeacherAddVideo.vue'

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
      path: '/teacher/myCourse',
      name: 'teacherMyCourse',
      component: TeacherMyCourse
    },
    {
      path: '/teacher/detailCourse/:id',
      props: true,
      name: 'detailCourse',
      component: TeacherDetailCourse
    },
    {
      path: '/teacher/addDoc/:id',
      props: true,
      name: 'addDoc',
      component: TeacherAddDoc
    },
    {
      path: '/teacher/addVideo/:id',
      props: true,
      name: 'addVideo',
      component: TeacherAddVideo
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
