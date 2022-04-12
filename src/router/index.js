import Vue from 'vue'
import Router from 'vue-router'
// 引入多个模块的规则
import approvalsRoute from './modules/approvals'
import departmentsRoute from './modules/departments'
import employeesRoute from './modules/employees'
import permissionRoute from './modules/permission'
import attendancesRoute from './modules/attendances'
import salarysRoute from './modules/salarys'
import settingRoute from './modules/setting'
import socialRoute from './modules/social'

Vue.use(Router)

/* 布局 */
import Layout from '@/layout'
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人首页', icon: 'dashboard' }
    }]
  },

  // 点击到excel路由页面 需要布局所以要在layout组件下面二级路由
  {
    path: '/import',
    component: Layout,
    hidden: 'true', // 隐藏在左侧siderbar不显示
    children: [{
      path: '', // path为空表示默认二级路由
      component: () => import('@/views/impexcel/index')// 引入导入excel组件
    }]
  }

]
// 动态路由
export const asyncRoutes = [
  settingRoute,
  departmentsRoute,
  approvalsRoute,
  employeesRoute,
  permissionRoute,
  socialRoute,
  salarysRoute,
  attendancesRoute
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes]
})
const router = createRouter()
// 此方法用于退出时还原初始化的路由配置，避免进入不该进的页面
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
