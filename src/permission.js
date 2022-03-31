// 引入路由 和token
import router from '@/router'
import store from '@/store'
// 引入进度条 及其样式
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 不受token限制的白名单
const whiteList = ['/404', '/login']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  Nprogress.start() // 开启进度条
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') { // 有token情况 如果去登录页，免登录跳到主页
      next('/')
    } else { // 有token且在非登录页面，才获取用户信息
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
      next() // 其他直接放行
    }
  } else {
    if (whiteList.includes(to.path)) { // 没有token情况，如果在白名单里面直接放行
      next()
    } else { // 不在白名单里面则需要去登录页面请求权限
      next('/login')
    }
  }
  Nprogress.done() // 手动切换地址时进度条也需要关闭
})
router.afterEach((to, from) => {
  Nprogress.done() // 进入路由之后进度条关闭
})
