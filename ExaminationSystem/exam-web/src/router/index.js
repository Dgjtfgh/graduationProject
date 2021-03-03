import Vue from 'vue'
import Router from 'vue-router'
// import MainView from '@/components/Main/Main'

Vue.use(Router)


let router = new Router({
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
              component: () => import('@/components/Index/index'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'accountlist',
              name: 'AccountList',
              component: () => import('@/components/AccountList/index'),
              meta: {
                requireAuth: true, role: '管理员'
              }
            },
            {
              path: 'addaccount',
              name: 'AddAccount',
              component: () => import('@/components/AddAccount/index'),
              meta: {
                requireAuth: true, role: '管理员'
              }
            },
            {
              path: 'exam',
              name: 'Exam',
              component: () => import('@/components/Exam/index'),
              meta: {
                requireAuth: true, role: '学生'
              }
            },
            {
              path: 'practice',
              name: 'Practice',
              component: () => import('@/components/PracticeView/index'),
              meta: {
                requireAuth: true, role: '学生'
              }
            },
            // {
            //   path: 'exampaper',
            //   name: 'ExamPaper',
            //   component: () => import('@/components/ExamPaper/index'),
            //   meta: {
            //     requireAuth: true, role: '学生'
            //   }
            // },
            {
              path: 'achievement',
              name: 'Achievement',
              component: () => import('@/components/Achievement/index'),
              meta: {
                requireAuth: true, role: '学生'
              }
            },
            {
              path: 'makepaper',
              name: 'MakePaper',
              component: () => import('@/components/MakePaper/index'),
              meta: {
                requireAuth: true, role: '老师'
              }
            },
            {
              path: 'mangerpaper',
              name: 'MangerPaper',
              component: () => import('@/components/MangerPaper/index'),
              meta: {
                requireAuth: true, role: '老师'
              }
            },
            {
              path: 'correctpaper',
              name: 'CorrectPaper',
              component: () => import('@/components/CorrectPaper/index'),
              meta: {
                requireAuth: true, role: '老师'
              }
            }
          // ]
        // }
      ]
    },
    {
      path: '/exampaper',
      name: 'ExamPaper',
      component: () => import('@/components/ExamPaper/index'),
      meta: {
        requireAuth: true, role: '学生'
      }
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
    },
    {
      path: '/404',
      name: 'Error',
      component: () => import('@/components/Error')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('username')) { // 通过vuex state获取当前的token是否存在
      if(to.meta.role) {
        if(localStorage.getItem('sf') == to.meta.role) {
          next();
        } else {
          next({
            path: '/404'
          })
        }
      }
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }  
});

export default router