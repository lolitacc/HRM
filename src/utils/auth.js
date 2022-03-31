import Cookies from 'js-cookie'

const TokenKey = 'hrsass-lolita-token'// 设置一个key
const timeStamp = 'htsass-time-token'
// 对我cookie上的方法进行封装
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getTokenTimeStamp() {
  return Cookies.get(timeStamp)
}
export function setTokenTimeStamp() {
  return Cookies.set(timeStamp, Date.now())
}
export function removeTokenTimeStamp() {
  return Cookies.remove(timeStamp)
}
