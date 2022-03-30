// request是我对axios进一步封装好的用来发送请求的api
import request from '@/utils/request'
// 登录接口
export function login(data) {
  // 返回一个axios对象（promise对象）
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 获取用户资料接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
    // 这里需要传递token 采用拦截器统一注入
  })
}

export function logout() {

}
