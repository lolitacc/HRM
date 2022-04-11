import PageTool from './PageTool'
import UploadExcel from './UploadExcel'
import PictureImp from './PictureImp'
// 所有公共组件全局注册的文件
export default {
  install(Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('PictureImp', PictureImp)
  }
}
