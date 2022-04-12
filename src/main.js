import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme/index.css'

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由鉴权文件
import * as directives from '@/directives'// 引入自定义指令
import * as filters from '@/filters'// 引入自定义指令
import Component from '@/components'
import checkPermission from '@/mixin/checkPermission'

// 迭代  注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// 迭代  注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Component)
Vue.use(ElementUI)
Vue.mixin(checkPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

