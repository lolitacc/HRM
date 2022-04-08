
<template>
  <el-dialog
    title="新增员工"
    :visible.sync="dialogVisible"
    :before-close="btnCancel"
  >
    <el-form ref="addStaff" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <!-- 遍历只能遍历组件的数据 -->
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="showDept" />
        <el-tree
          v-if="showTree"
          :data="deptTree"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="chooseDept"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="checkCommit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
// 引入部门组织架构信息接口
import { getDepartments } from '@/api/departments'
// 引入转换树形结构的方法
import { turnTreeData } from '@/utils'
import { addStaff } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum, // 在data中定义数据
      // 表单数据
      deptTree: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async showDept() {
      this.loading = true
      this.showTree = true
      const { depts } = await getDepartments()
      // 把数组转化成树形结构
      this.deptTree = turnTreeData(depts, '')
      this.loading = false
    },
    chooseDept(node) { // 绑定tree组件的nodeclick事件，拿到树形被点击的node的数据
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async checkCommit() {
      try {
        await this.$refs.addStaff.validate() // 确定校验成功
        await addStaff(this.formData) // 调用新增接口
        await this.$parent.getStaff() // 重新拉取数据
        this.$parent.dialogVisible = false // 关闭弹层
      } catch (error) { // 校验失败会报错，所以要使用trycatch错误处理
        console.log(error)
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addStaff.resetFields() // 重置校验结果
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>

</style>
