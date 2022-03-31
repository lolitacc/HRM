<script>
export default {
  name: 'MenuItem',
  functional: true, // 该组件为函数式组件 没有data状态、响应式数据、this 只会接收props属性，
  props: {
    // 接收SiderbarItem传递过来的props参数并限制类型
    icon: {
      // 从SiderbarItem那里接收过来的route下meta里的icon名称
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // 如果有icon
      // 如果是element带带icon就生成i标签，class值为两个
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else { // 如果用自己的svg图片就生成svg-icon组件，并且把icon-class即svg图片的名称告诉改组件
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
