// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router'
import Mint from './mintUi'

// Inject Global Css And Themes Css
import animate from 'animate.css'
import './sass/index.scss'
import './sass/themes/default.scss'

//数据请求--修改VUE原型链
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
