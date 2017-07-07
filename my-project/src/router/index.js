import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import List from '@/components/List'
import Detail from '@/components/Detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login/Home/List',
      name: 'List',
      component: List
    },
    {
      path: '/Login/Home/List/Detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
