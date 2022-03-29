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

export function getInfo(token) {

}

export function logout() {

}
