<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tool :show-before="true">
        <span slot="before">  权限点管理</span>
        <template slot="after">
          <el-button type="primary" @click="addPermission(1,'0')">添加权限</el-button>
        </template>
      </page-tool>
      <!-- 表格 树状表格需要配row-key-->
      <el-table border :data="list" row-key="id">
        <el-table-column align="left" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增权限点弹层 -->
      <el-dialog
        :title="`${textType}权限`"
        :visible.sync="dialogVisible"
        :before-close="cancel"
      >
        <el-form ref="permissionForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <!-- 为switch指定绑定number的关闭开启规则 -->
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="checkCommit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
// 获取权限点接口
import { getPermissionList, delPermission, addPermission, putPermission, getPermissionDetail } from '@/api/permission'
// 树形结构转化方法
import { turnTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    textType() { // 弹层的title
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = turnTreeData(await getPermissionList(), '0')
    },
    async delPermission(id) {
      try {
        await this.$confirm('您确定要删除吗')
        await delPermission(id)
        await this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // type=1的添加根节点，type=2添加子节点 添加时传入要添加的节点的pid，pid=0就是根节点，pid=1就是一级子节点
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.dialogVisible = true
    },
    async  checkCommit() {
      try {
        await this.$refs.permissionForm.validate()
        if (this.formData.id) { // 调get接口返回的数据有ID，所以如果有id就是编辑权限
          await putPermission(this.formData)
          this.$message.success('编辑成功')
        } else { // 没有id就是重新增加权限
          await addPermission(this.formData)
          this.$message.success('新增成功')
        }
        await this.getPermissionList()
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    async editPermission(id) {
      // 根据获取id获取详情在编辑时进行数据回写 在取到数据之后再弹层
      this.formData = await getPermissionDetail(id)
      this.dialogVisible = true
    },
    cancel() {
      // 取消时表单数据置空
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.permissionForm.resetFields()// 移除校验数据置空
      this.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
