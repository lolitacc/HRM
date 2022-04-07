<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 角色管理标签页内容 表格-->
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
              >新增角色</el-button>
            </el-row>
            <el-table :data="roleList" border>
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="角色名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" prop="prop" label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                  <!-- 利用el-table的作用域插槽属性 -->
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
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :current-page="params.page"
                :page-size="params.pagesize"
                :total="params.total"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <!-- 公司信息标签页内容 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
            />
            <el-form
              ref="form"
              label-width="120px"
              style="margin-top: 50px; width: 800px"
              disabled
            >
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" placeholder="" />
              </el-form-item>
            </el-form></el-tab-pane>
        </el-tabs>
        <el-dialog
          title="编辑角色"
          :visible="dialogVisible"
          @close="cancel"
        >
          <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="80px">
            <el-form-item label="角色名称" prop="name">
              <!-- 双向数据绑定在input上，校验规则绑定在item上 -->
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="checkCommit">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getRoleList, getCompanyInfo, delRole, getRoleById, putRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {},
      roleList: [], // 承接请求回来的数组
      params: {
        page: 1, // 请求的页数
        pagesize: 10, // 每页的请求条数
        total: 0 // 请求的总数
      },
      roleForm: {}, // 接收新增或编辑数据的容器
      rules: { // 校验规则
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.params)
      this.roleList = rows
      this.params.total = total
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.params.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
      this.getCompanyInfo()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
      console.log(this.formData)
    },
    async delRole(id) {
      try {
        await this.$confirm('您确定要删除该角色吗')
        await delRole(id)// 删除角色
        await getRoleList()// 删除成功以后重新拉取
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑数据的方法
    async editRole(id) {
      this.roleForm = await getRoleById(id)// 点击编辑先实现数据回写
      this.dialogVisible = true
    },
    // 提交编辑数据
    async checkCommit() {
      try {
        await this.$refs.roleForm.validate()// 通过校验执行下一步=》判断是否为编辑或者新增，
        // 编辑则调用编辑接口
        if (this.roleForm.id) {
          await putRole(this.roleForm)
        } else {
          // 否则调用新增接口
          await addRole(this.roleForm)
        }
        // 重新拉取数据
        this.getRoleList()
        this.$message.success('操作成功')
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.roleForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

<style>
</style>
