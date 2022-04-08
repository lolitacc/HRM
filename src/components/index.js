import PageTool from './PageTool'
// 所有公共组件全局注册的文件
export default {
  install(Vue) {
    Vue.component('PageTool', PageTool)
  }
}
