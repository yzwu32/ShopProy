import App from '@/App'

import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../page/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const miste = r => require.ensure([], () => r(require('../page/miste/miste')), 'miste')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')

// import home from '@/page/home'
// import login from '@/page/login/login'
// import city from '@/page/city/city'
// import miste from '@/page/miste/miste'
// import search from '@/page/search/search'
// import order from '@/page/order/order'
// import profile from '@/page/profile/profile'
// import shop from '@/page/shop/shop'
// import shopDetail from '@/page/shop/children/shopDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path: '',
          redirect: '/home',
        },
        {
          path: '/home',
          component: home,
        },
        {
          path: '/login',
          component: login,
        },
        {
          path: '/city',
          component: city,
        },
        {
          path: '/miste',
          component: miste,
        },
        {
          path: '/search',
          component: search,
        },
        {
          path: '/order',
          component: order,
        },
        {
          path: '/profile',
          component: profile,
        },
        {
          path: '/shop',
          component: shop,
          children:[
            {path:'shopDetail',component:shopDetail}
          ]
        }
      ]
    }
  ]
})
