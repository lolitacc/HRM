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
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // 404 通配报错页面
  { path: '*', redirect: '/404', hidden: true }
]
// 动态路由
export const asyncRoutes = [
  approvalsRoute,
  departmentsRoute,
  employeesRoute,
  permissionRoute,
  attendancesRoute,
  salarysRoute,
  settingRoute,
  socialRoute
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]// 临时合并
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
