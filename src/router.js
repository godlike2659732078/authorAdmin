import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('./views/Index.vue'),
      meta: {
        title: '书籍列表'
      },
      redirect: '/Home',
      children: [{
          path: '/bookList',
          name: 'bookList',
          component: () => import('./views/book/bookList.vue'),
          meta: {
            title: '书籍列表'
          }
        },
        {
          path: '/bookPartList',
          name: 'bookPartList',
          component: () => import('./views/book/bookPartList.vue'),
          meta: {
            title: '书籍章节'
          }
        },
        {
          path: '/bookPartAdd',
          name: 'bookPartAdd',
          component: () => import('./views/book/bookPartAdd.vue'),
          meta: {
            title: '章节添加'
          }
        },
        {
          path: '/bookContent',
          name: 'bookContent',
          component: () => import('./views/book/bookContent.vue'),
          meta: {
            title: '章节详情'
          }
        },
        {
          path: '/Home',
          name: 'Home',
          component: () => import('./views/Home/Home.vue'),
          meta: {
            title: '平台首页'
          }
        },

      ]
    },
    {
      path: '/lock',
      name: 'lock',
      component: () => import('./views/Lock.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/logo/Login')
    },
    {
      path: '*',
      name: 'Nofind',
      component: () => import('./views/404')
    }
  ]
  // mode: "history"
})



export default router