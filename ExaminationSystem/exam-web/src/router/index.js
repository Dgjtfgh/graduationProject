import Vue from 'vue'
import Router from 'vue-router'
// import MainView from '@/components/Main/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/index'),
      children: [
        // {
          // path: '/',
          // name: 'Main',
          // component: () => import('@/components/Main/Main'),
          // children: [
            {
              path: '/',
              name: 'Index',
              component: () => import('@/components/Index/index')
            },
            {
              path: 'exam',
              name: 'Exam',
              component: () => import('@/components/Exam/index')
            },
            {
              path: 'practice',
              name: 'Practice',
              component: () => import('@/components/PracticeView/index')
            },
            {
              path: 'exampaper',
              name: 'ExamPaper',
              component: () => import('@/components/ExamPaper/index')
            },
            {
              path: 'achievement',
              name: 'Achievement',
              component: () => import('@/components/Achievement/index')
            }
          // ]
        // }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/Register')
    }
  ]
})
