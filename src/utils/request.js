// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui' // 引入element-ui的错误提示
// 引入store注入token
import store from '@/store'
const myAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 解决生产环境变量问题
  timeout: 5000
}) // 创建一个axios的实例
// 请求拦截器
myAxios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 请求的配置信息，需要return
}, error => {
  return Promise.reject(error)// 请求失败终止promise链
})

// 响应拦截器
myAxios.interceptors.response.use(response => {
  const { success, data, message } = response.data// 解构赋值我们需要的内容，这里axios包了一层data
  if (success) { // 服务器响应为success，才返回数据
    return data
  } else {
    Message.error(message)// 提示错误消息
    return Promise.reject(new Error(message))// 中断后面的promise链
  }
}, error => { // 内部响应失败
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

export default myAxios // 导出axios实例
