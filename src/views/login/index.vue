<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="请输入您的手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="loginBtn"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;"账号: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '手机号长度不能为空' },
          { trigger: 'blur', validator: validateMobile }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { trigger: 'blur', min: 6, max: 16, message: '密码应该为6-16位' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    ...mapActions({ Login: 'user/Login' }),
    handleLogin() {
      // 点击登录按钮触发路由跳转到主页
      // 表单的手动校验 el组件自带的方法
      this.$refs.loginForm.validate(async(isOK) => {
        if (isOK) {
          try {
            this.loading = true
            await this.Login(this.loginForm) // 这个user/Login函数和本来就是一个promise对象
            // 把这里经过校验收集到的表单数据传递给api里面的request（axios），request再传递给vuex
            // 等这一步异步操作成功以后，再跳转主页（登录失败就不跳转，因为在Login方法里对登录失败中断了promise链）
            this.$router.push('/')// 跳转主页
          } catch (error) {
            console.log(error)// 在Login里面已经写了弹出错误的逻辑，不用再弹出
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: rgba(230, 8, 149, 0.564);
$cursor: deeppink;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: rgb(255 255 255 / 0);
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #f56c6c3b inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: white;
    .el-form-item__error {
      color: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-image: url(~@/assets/common/login.webp);
  background-size: 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .loginBtn {
    background: rgba(250, 9, 101, 0.632);
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    border-color: #f563a7;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
