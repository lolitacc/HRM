// request是我对axios进一步封装好的用来发送请求的api
import myAxios from '@/utils/request'
// 登录接口
export function login(data) {
  // 返回一个axios对象（promise对象）
  return myAxios({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 获取用户资料接口
export function getUserInfo() {
  return myAxios({
    url: '/sys/profile',
    method: 'post'
    // 这里需要传递token 采用拦截器统一注入
  })
}
// 获取用户基本信息接口，头像在这里
export function getUserBaseById(id) {
  return myAxios({
    url: `/sys/user/${id}`// axios默认get请求，可以不写请求方式 这里的id是传入的参数
  })
}
export function logout() {

}
