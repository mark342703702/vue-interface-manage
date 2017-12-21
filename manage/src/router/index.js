import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import productList from '@/page/productList'
import login from '@/page/login'
import manage from '@/page/manage'
import memberList from '@/page/memberList'
import addMember from '@/page/addMember'
import addProduct from '@/page/addProduct'
import addAdmin from '@/page/addAdmin'
import addGirl from '@/page/addGirl'
import addShop from '@/page/addShop'

const routes = [
    {
      path : '/',
      component: login
    },
    {
      path : '/manage',
      component : manage,
      children : [
        {
          path : '/productList',
          component : productList
        },
        {
          path : '/memberList',
          component : memberList
        },
        {
          path : '/addMember',
          component : addMember
        },
        {
          path : '/addProduct',
          component : addProduct
        },
        {
          path : '/addAdmin',
          component : addAdmin
        },
        {
          path : '/addGirl',
          component : addGirl
        },
        {
          path : '/addShop',
          component : addShop
        }
      ]
    }
]

export default new Router({
  routes
})
