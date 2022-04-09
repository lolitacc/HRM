import PageTool from './PageTool'
import UploadExcel from './UploadExcel'
// 所有公共组件全局注册的文件
export default {
  install(Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadExcel', UploadExcel)
  }
}
