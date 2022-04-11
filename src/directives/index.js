export const imagerror = {
  inserted(dom, options) {
    dom.src = dom.src || options.value
    // 因为给图片绑定了这个指令，所以dom在这里指的就是图片
    dom.onerror = function() { // 图片的onerror事件就是当图片本身存在的src加载不成功时触发的默认时间
      dom.src = options.value // 当图片请求src出现异常，将默认src配置给图片
    }
  },
  // 这个钩子在指令组件更新数据完毕之后执行 给img赋值为空的节点不能执行onerror时间
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
