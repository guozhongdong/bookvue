import Vue from 'vue'
import Router from 'vue-router'
import bookmanage from '@/view/bookmanage'
import PageThree from '@/view/pageThree'
import PageFour from '@/view/pageFour'
import Index from '@/view/index'
import Login from '@/view/login/index'
import User from '@/view/user'

Vue.use(Router)
export default new Router({
  'mode': 'history',
  routes: [
    {
      path: '/login',
      name: '登录页',
      hidden:true,
      component: Login
    },
    {
      path: '/book/bookmanage',
      name: '登录页',
      hidden:true,
      component: bookmanage
    },
    {
      path: '/',
      name: '图书管理',
      component: Index,
      redirect:'bookmanage',
      children: [
        {
          path: '/bookmanage',
          name: '图书列表',
          component: bookmanage
        },
        {
          path: '/user',
          name: '用户列表',
          component: User
        }
      ]
    },
    {
      path: '/navigation',
      name: '菜单管理',
      component: Index,
      children: [
        {
          path: '/pageThree',
          name: '角色管理',
          component: PageThree
        },
        {
          path: '/pageFour',
          name: '权限管理',
          component: PageFour
        }
      ]
    },

  ]
})
