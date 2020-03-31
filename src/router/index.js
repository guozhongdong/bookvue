import Vue from 'vue'
import Router from 'vue-router'
import PageOne from '@/view/pageOne'
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
      name: '导航一',
      component: Index,
      children: [
        {
          path: '/pageOne',
          name: '页面一',
          component: PageOne
        },
        {
          path: '/pageTwo',
          name: '页面二',
          component: PageTwo
        }
      ]
    },
    {
      path: '/navigation',
      name: '导航二',
      component: Index,
      children: [
        {
          path: '/pageThree',
          name: '页面三',
          component: PageThree
        },
        {
          path: '/pageFour',
          name: '页面四',
          component: PageFour
        }
      ]
    },

  ]
})
