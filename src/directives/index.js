export const imagerror = {
  inserted(dom, options) {
    // 因为给图片绑定了这个指令，所以dom在这里指的就是图片
    dom.onerror = function() { // 图片的onerror事件就是当图片本身存在的src加载不成功时触发的默认时间
      dom.src = options.value // 当图片请求src出现异常，将默认src配置给图片
    }
  }
}
