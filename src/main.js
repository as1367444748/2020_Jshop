import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios;

import { Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Button.name, Button)

import loading from '../public/img/loading.gif'

//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading
})

import './mock/mockServe.js'//加载mockServe即可
import './filter'//加载过滤器

import '../public/css/reset.css'
import '../public/stylus/mixins.styl'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
