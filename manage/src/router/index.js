import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '@/page/home'
import login from '@/page/login'
import manage from '@/page/manage'
import productList from '@/page/list/productList'
import memberList from '@/page/list/memberList'
import addMember from '@/page/add/addMember'
import addProduct from '@/page/add/addProduct'
import addAdmin from '@/page/add/addAdmin'
import addGirl from '@/page/add/addGirl'
import addShop from '@/page/add/addShop'
import editOrder from '@/page/edit/editOrder'
import setting from '@/page/setting'

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
          path : '',
          component : home
        },
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
        },
        {
          path : '/editOrder',
          component : editOrder
        },{
          path : '/setting',
          component : setting
        }
      ]
    }
]

export default new Router({
  routes
})
