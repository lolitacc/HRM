import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// 引入svg的组件

// 全局注册这个组件
Vue.component('svg-icon', SvgIcon)
// 将svg文件下所有.svg后缀的文件都引入
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)// req是所有svg图片的数组，遍历这个数组，为每个svg注册全局组件
