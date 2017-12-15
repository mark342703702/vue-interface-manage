import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import login from '@/page/login'

const routes = [
    {
      path : '/',
      component: login
    }
]

export default new Router({
  routes
})
