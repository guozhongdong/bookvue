import Vue from 'vue'
import Router from 'vue-router'
import bookmanage from '@/view/bookmanage'
import PageTwo from '@/view/pageTwo'
import PageThree from '@/view/pageThree'
import PageFour from '@/view/pageFour'
import Index from '@/view/index'

Vue.use(Router)
export default new Router({
  'mode': 'history',
  routes: [
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
          path: '/pageTwo',
          name: '用户列表',
          component: PageTwo
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
