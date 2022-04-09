<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部那一条 -->
      <page-tool :show-before="true">
        <span slot="before">共{{ params.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="info">excel导出</el-button>
          <el-button size="small" type="primary" @click="dialogVisible=true">新增员工</el-button>
        </template>
      </page-tool>
      <!-- 表格和分页器 -->
      <el-card>
        <el-table :data="satffList" border>
          <el-table-column label="序号" align="center" sortable="" type="index" />
          <el-table-column label="姓名" align="center" prop="username" sortable="" />
          <el-table-column label="工号" align="center" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatterStaff"
            sortable
            align="center"
          />
          <el-table-column align="center" label="部门" prop="departmentName" sortable="" />
          <el-table-column align="center" label="入职时间" sortable>
            <template slot-scope="{row}">
              <!-- 作用域插槽取到对象 -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="账户状态" sortable="">
            <template slot-scope="{row}">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delStaff(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="params.total"
            :page-size="params.size"
            :current-page="params.page"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <!-- 添加弹层 -->
      <add-employee :dialog-visible.sync="dialogVisible" />
    </div>
  </div>
</template>

<script>
// 引入获取员工列表接口，除此挂载在created钩子上
import { getStaff, delStaff } from '@/api/employees'
import staffEnum from '@/api/constant/employees'
import AddEmployee from './component/AddEmployee.vue'
export default {
  components: { AddEmployee },
  data() {
    return {
      loading: false,
      satffList: [],
      params: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false
    }
  },
  created() {
    this.getStaff() // 初始化时先挂载上数据
  },
  methods: {
    async getStaff() {
      this.loading = true // 打开加载条
      const { total, rows } = await getStaff(this.params) // 换页面时page会变，就携带新的 page重新请求
      this.satffList = rows
      this.params.total = total
      this.loading = false // 关闭加载条
    },
    // 点击分页器页面切换的时候
    changePage(newPage) {
      this.params.page = newPage
      this.getStaff()
    },
    formatterStaff(row, column, cellValue, index) {
      const hireType = staffEnum.hireType.find(item => item.id === cellValue)
      return hireType ? hireType.value : '未知'
    },
    async delStaff(id) {
      try {
        await this.$confirm('您确定要删除该员工吗')
        await delStaff(id)
        this.getStaff()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>
</style>
