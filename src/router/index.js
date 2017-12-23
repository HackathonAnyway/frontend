import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Markdown from '@/components/Markdown'
import test from '@/components/test'
import login from '@/components/login'
import register from '@/components/register'
import Element from 'element-ui'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'Welcome',
      component: test
    },
    {
      path: '/register',
      name: 'Markdown',
      component: register
    }
  ]
})
