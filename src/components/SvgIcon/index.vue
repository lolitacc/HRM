// 每个svg图标都是以一个小组件的形式展示的 这是定义svg图片原始的组件的文件
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
    <!-- 生成svg图片，地址是从文件解析的 -->
  </svg>
</template>

<script>
// svgicon的组件
import { isExternal } from '@/utils/validate' // 引入对svg图片地址的校验规则

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      // itemvue组件传递给svg-icon组件的icon-class即该svg图片地址
      type: String,
      required: true
    },
    className: {
      // icon的类名
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      // 截取 分解svg里的地址
      return isExternal(this.iconClass)
    },
    iconName() {
      // 分解svg里的名称
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
