<template>
  <!-- 使用行列布局 -->
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right" style="color: pink" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" divided>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit" divided>编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del" divided>删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        this.$emit('addDepts', this.treeNode)
        // 当commnd为add的item被点击时触发 调用添加方法并且把当前的treeNode节点信息传给父亲
      } else if (command === 'edit') {
        // 点击编辑部门，我们要数据回写，要用id调接口，所以在这个组件用自定义事件把数据子传父
        this.$emit('editDepts', this.treeNode.id)
      } else {
        this.$confirm('您确定要删除此部门吗？').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('getDeptAgain')
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'warning'
          })
        })
        // 当删除事件结束以后，触发重新请求事件，用全局事件总线$emit取触发自定义事件
      }
    }
  }
}

</script>

<style>

</style>
