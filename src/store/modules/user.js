import { getToken, setToken, removeToken, setTokenTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserBaseById } from '@/api/user'
const state = {
  token: getToken(), // 初始化vuex时，优先从缓存中读取token
  userInfo: {} // 用户信息
}
const mutations = {
  SetToken(state, token) {
    state.token = token // 将读取到的token设置给vuex
    setToken(token)// 如果修改了state中的token就把它同步给缓存
  },
  // 删除token
  RemoveToken(state) {
    state.token = null// 删除vuex里面的token
    removeToken()// 删除缓存里面的token
  },
  // 用户信息相关
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo() {
    state.userInfo = {} // 退出或切换时换成空
  }

}
const actions = {
  // 登录的Action 给组件使用 登录成功了就把token设置给vuex
  async Login(context, data) {
    const result = await login(data)// 调用api接口 因为我们封装的login其实是返回了拦截器之后的axios对象，
    // 所以加一个await，只有那边resolve，拿到data以后我们这边才继续执行 await异常处理只能使用 try catch
    // 在login里面return好data了这里就不用result.data.success再判断了
    context.commit('SetToken', result)
    // 在调用登录actions的时候设置token时间戳
    setTokenTimeStamp() // 不用穿参
  },
  // 获取用户信息的action
  async getUserInfo(context) {
    const userInfo = await getUserInfo() // 使用axios请求接口 这里返回的只有data了，其他数据在响应拦截器里已经被解构
    const userBaseInfo = await getUserBaseById(userInfo.userId)
    context.commit('setUserInfo', { ...userInfo, ...userBaseInfo })// 把个人信息保存在vuex里面
    return userInfo // 做权限
  },
  logout(context) {
    context.commit('RemoveToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
