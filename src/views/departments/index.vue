<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 总公司的组件 -->
        <tree-tool :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!--每一行tree-tool的数据是从上面el-tree里面循环获得的，取里面的data传递给tree-node 就是获取到的分别每一项节点信息-->
          <tree-tool slot-scope="{ data }" :tree-node="data" @getDeptAgain="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
          <!-- 绑定重新请求接口的自定义事件 -->
        </el-tree>
      </el-card>
      <!-- 添加窗体组件 operation-node是prop穿参正在被点击的子部门，由被点击的每个treeNode传入给index，index再传给add-Depts组件-->
      <!-- TreeTool=>index.vue=>AddDepts -->
      <add-depts ref="addDepts" :dialog-visible.sync="dialogVisible" :operation-node="node" @getDeptAgain="getDepartments" />
    </div>
  </div>
</template>

<script>
import TreeTool from './conponents/TreeTool.vue'
import { getDepartments } from '@/api/departments.js'
import { turnTreeData } from '@/utils'
import AddDepts from './conponents/AddDepts.vue'
export default {
  components: {
    TreeTool,
    AddDepts
  },
  data() {
    return {
      dialogVisible: false, // index.vue作为父亲把控制弹窗是否展示传给 add-depts 但是修改这个值需要在tree-tool组件里面触发
      company: { name: '北京科技有限公司', manager: '负责人', id: '' },
      departs: [],
      defaultProps: {
        label: 'name' // element-ui从label和childern读取数据
      },
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = turnTreeData(result.depts, '')
      console.log(result)
    },
    addDepts(treenode) { // treeNode 形参接受事件在Tree-tool组件触发时传入的node节点
      this.dialogVisible = true// 显示弹层
      // 记录当前点击的组件
      this.node = treenode// 并且把得到的参数存入自己的node中
    },
    editDepts(id) {
      //  在AddDepts组件调接口，因为那个组件需要数据渲染，这里用ref获取vc实例，从父组件调用子组件方法
      this.dialogVisible = true// 显示弹层
      this.$refs.addDepts.getDeptsById(id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
