<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 总公司的组件 -->
        <tree-tool :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!--每一行tree-tool的数据是从上面el-tree里面循环获得的，取里面的data传递给tree-node-->
          <tree-tool slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from './conponents/TreeTool.vue'
export default {
  components: { TreeTool },
  data() {
    return {
      company: { name: '北京科技股份有限公司', manager: '负责人' },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // element-ui从label和childern读取数据
      }
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding: 30px  140px;
  font-size:14px;
}
</style>
