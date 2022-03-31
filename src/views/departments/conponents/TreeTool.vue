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
          <el-dropdown>
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right" style="color: pink" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" divided>编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" divided>删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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

  }
}
</script>

<style>

</style>
