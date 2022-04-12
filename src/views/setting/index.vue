<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="职位管理">
            <!-- 职位管理标签页内容 表格-->
            <!-- 新增职位按钮 -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
              >新增职位</el-button>
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
                label="职位名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" prop="prop" label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
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
          :title="`${roleType}职位`"
          :visible="dialogVisible"
          @close="cancel"
        >
          <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="80px">
            <el-form-item label="职位名称" prop="name">
              <!-- 双向数据绑定在input上，校验规则绑定在item上 -->
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="职位描述">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="checkCommit">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
      <!-- 给职位分配权限 -->
      <el-dialog
        title="为此职位分配权限点"
        :visible.sync="permVisible"
        :before-close="permCancel"
      >
        <el-tree
          ref="permTree"
          :data="permData"
          :props="permProp"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="checkedPerm"
          node-key="id"
        />
        <div slot="footer">
          <el-button @click="permCancel">取 消</el-button>
          <el-button type="primary" @click="permCommit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>
import { getRoleList, getCompanyInfo, delRole, getRoleById, putRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { assignPerm, getPermissionList } from '@/api/permission'
import { turnTreeData } from '@/utils'
export default {
  data() {
    return {
      formData: {}, // 公司信息表单
      roleList: [], // 承接请求回来的职位数组
      params: {
        page: 1, // 请求的页数
        pagesize: 10, // 每页的请求条数
        total: 0 // 请求的总数
      },
      roleForm: {}, // 接收新增或编辑数据的容器
      rules: { // 校验规则
        name: [{ required: true, message: '职位名称不能为空', trigger: 'blur' }]
      },
      dialogVisible: false, // 编辑职位信息弹层的显示
      permVisible: false, // 给职位分配权限弹层的显示
      permData: [], // tree接收的多维数组
      permProp: { label: 'name' }, // tree展示的prop配置不写就是默认
      checkedPerm: [], // 该角色读取到的权限点
      roleId: ''//  记录一个id，提交的时候存到一个id里

    }
  },
  computed: {
    roleType() {
      return this.roleForm.id ? '编辑' : '新增'
    },
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
    },
    async delRole(id) {
      try {
        await this.$confirm('您确定要删除该职位吗')
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
        // validate不传参数就是返回一个promise对象
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
    },
    async assignPerm(id) {
      this.permData = turnTreeData(await getPermissionList(), '0') // 在分配角色展示树形可选择框的数结构
      const { permIds } = await getRoleById(id) // 获取到改职位角色数据库里已被写的权限点，进行数据回写
      this.checkedPerm = permIds
      this.roleId = id
      this.permVisible = true
    },
    async permCommit() {
    // getgetCheckedKeys是el的方法，获取此时被选择的权限
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.permVisible = false
    },
    permCancel() {
      this.checkedPerm = []
      this.permVisible = false
    }
  }
}
</script>

<style>
</style>
