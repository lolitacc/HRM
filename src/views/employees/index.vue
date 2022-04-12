<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部那一条 -->
      <page-tool :show-before="true">
        <span slot="before">共{{ params.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="info" @click="expExcel">excel导出</el-button>
          <el-button size="small" type="primary" @click="dialogVisible=true">新增员工</el-button>
        </template>
      </page-tool>
      <!-- 表格和分页器 -->
      <el-card>
        <el-table :data="satffList" border>
          <el-table-column label="序号" align="center" sortable="" type="index" />
          <el-table-column label="姓名" align="center" prop="username" sortable="" />
          <el-table-column label="头像" align="center">
            <template slot-scope="{row}">
              <img
                slot="reference"
                v-imagerror="require('@/assets/common/bigUser.png')"
                :src="row.staffPhoto "
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                alt=""
              >
            </template>
          </el-table-column>
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
              <el-button type="text" size="small" :disabled="!checkPermission('POINT-USER-UPDATE')" @click="$router.push(`/employees/details/${row.id}`)">查看</el-button>
              <el-button type="text" size="small" @click="assignRole(row.id)">职位角色</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
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
      <assign-role ref="assignRoles" :role-visible.sync="roleVisible" :user-id="userId" />
    </div>
  </div>
</template>

<script>
// 引入获取员工列表接口，除此挂载在created钩子上
import { getStaff, delStaff } from '@/api/employees'
import staffEnum from '@/api/constant/employees'
import AddEmployee from './component/AddEmployee.vue'
// 引入格式化时间后面0的方法
import { formatDate } from '@/filters'
// 引入分配角色的弹层组件
import AssignRole from './component/AssignRole.vue'
export default {
  components: {
    AddEmployee,
    AssignRole

  },
  data() {
    return {
      loading: false,
      satffList: [],
      params: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false,
      roleVisible: false,
      userId: ''
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
    },
    expExcel() {
      const headers = {
        '姓名': 'username',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '转正日期': 'correctionTime',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getStaff({ page: 1, size: this.params.total })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 正常表头
          data,
          filename: '员工信息表',
          multiHeader, // 复杂表头
          merges// 合并表头
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => { // map返回一个二维数组 遍历rows里面每一个对象
        return Object.keys(headers).map(key => { // map返回一个数组 遍历得到每一个headers【key】
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // item里面值对应的是英文key 所以从headers【key】headers数组的值对应 时间需要格式化
          } else if (headers[key] === 'formOfEmployment') {
            const obj = staffEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知类型'
          } else {
            return item[headers[key]]
          }
        })
      })
    },
    async assignRole(id) {
      this.userId = id// props赋值是异步的，assign组件在在调用API的时候拿不到这个id，所以在父组件这里调用这个方法
      await this.$refs.assignRoles.getUserRole(id)
      this.roleVisible = true
    }

  }
}
</script>

<style>
</style>
