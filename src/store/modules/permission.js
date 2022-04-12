// 设置权限相关的vuex，处理应该被显示的路由  静态路由 + 当前用户的 权限路由
import { asyncRoutes, constantRoutes } from '@/router' // index.js里面的静态路由
const state = {
  routes: constantRoutes // 所有人默认拥有静态路由 这里routes是控制侧边栏显示的
}
const mutations = {
  // newRoutes可以认为是 用户登录 通过权限所得到的动态路由的部分
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]// 修改routes
  }
}
const actions = {
  // 筛选权限路由 menu接收拦截器调接口传的data里面的menu数组，里面是不同权限点的key【permiss，salary。。。】
  filterRoutes(context, menus) {
    const permroutes = []
    menus.forEach(key => {
      // asyncRoutes是个对象数组[{}] 对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
      permroutes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 有可能 有元素 也有可能是空数组
    })
    // permroutes就是当前用户所拥有的 动态路由的权限
    context.commit('setRoutes', permroutes) // 将动态路由提交给mutations
    return permroutes // 在这里做返回，在拦截器页面调用action的时候才能拿到动态路由数组
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
