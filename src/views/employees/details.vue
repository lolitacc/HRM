<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="账户设置">
            <!-- 放置表单 -->
            <el-form ref="userBaseForm" :model="userBase" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userBase.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="userBase.password2" style="width:300px" show-password />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="putUserBase">修改</el-button>
                <el-button type="primary">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 放置个人详情 -->
            <component :is="userComponent" />
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <!-- 放置岗位详情 -->
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
// 引入根据id获取用户信息的接口 修改密码的接口
import { getUserBaseById, putUserBase } from '@/api/user'
import UserInfo from '@/views/employees/component/UserInfo.vue'
import JobInfo from '@/views/employees/component/JobInfo.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: 'user-info',
      JobComponent: 'job-info',
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      userBase: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getUserBaseById()
  },
  methods: {
    async getUserBaseById() {
      this.userBase = await getUserBaseById(this.userId)
    },
    async putUserBase() {
      try {
        await this.$refs.userBaseForm.validate()// 先验证校验规则
        this.$confirm('确定要修改吗')
        await putUserBase({ ...this.userBase, password: this.userBase.password2 })
        this.$message.success('修改成功，请重新登录')
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
