<template>
  <el-dialog
    title="分配职位权限"
    :visible="roleVisible"
    width="800px"
    :before-close="cancel"
  >
    <el-checkbox-group v-model="roles">
      <!-- 选项  label在这里是要存储的值-->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{
          item.name
        }}
      </el-checkbox>
    </el-checkbox-group>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="checkCommit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserBaseById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    roleVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 职位角色列表
      roles: [] // 被选择的角色
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    //  获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserRole(id) {
      const { roleIds } = await getUserBaseById(id)
      this.roles = roleIds // 赋值本用户的角色
    },
    async checkCommit() {
      await assignRoles({ id: this.userId, roleIds: this.roles })
      //   关闭窗体
      this.$emit('update:roleVisible', false)
    },
    cancel() {
      this.roles = [] // 清空原来的数组
      this.$emit('update:roleVisible', false)
    }
  }
}
</script>

<style>

</style>
