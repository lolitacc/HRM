<template>
  <el-dialog
    title="新增部门"
    :visible="dialogVisible"
    width="width"
    center
    @close="cancelForm"
  >
    <el-form
      ref="addDeptForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item prop="manager" label="负责人">
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getStaffSimple"
        >
          <!-- 在select框得到焦点时再去动态获取数据，循环生成选项 -->
          <el-option
            v-for="item in staffs"
            :key="item.id"
            :label="item.usename"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门简介">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          rows="3"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="checkFormCommit">确 定</el-button>
      <!-- 点击确定按钮以后调用新增接口，并且通知index组件重新拉取数据显示 -->
    </div>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments } from '@/api/departments'
import { getStaffSimple } from '@/api/employees'
export default {
  props: {
    // 控制整个窗口显示的关键变量，由父亲传过来的参数决定
    dialogVisible: {
      type: Boolean,
      default: false
    },
    operationNode: {
      // props接受父亲传递过来正在操作的节点，拿到这个节点数据（id、pid）进行校验
      type: Object,
      default: null
    }
  },
  data() {
    // 添加子部门是不予许它和其他资本名称一致
    const checkDataRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments() // 每次校验之前我们要请求一下最新的数据
      const isRepeat = depts
        .filter((item) => item.pid === this.operationNode.id)
        .some((item) => item.name === value)
      isRepeat ? callback(new Error('该子部门名称已存在')) : callback()
    }
    // 添加子部门的code只用校验整个模块里是否有同名的
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some((item) => item.code === value && value)
      isRepeat ? callback(new Error('该子部门编码已存在')) : callback()
    }
    return {
      formData: {
        code: '',
        name: '',
        manager: '',
        introduce: ''
      },
      rules: {
        // 表单的基础校验
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: checkDataRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
      },
      staffs: []
    }
  },
  methods: {
    async getStaffSimple() {
      this.staffs = await getStaffSimple()
    },
    checkFormCommit() {
      this.$refs.addDeptForm.validate(async(isOK) => {
        if (isOK) { // 在表单检验完毕之后调用添加接口，添加数据、然后再重新拉取
          await addDepartments({ ...this.formData, pid: this.operationNode.id })
          this.$emit('getDeptAgain')
          this.$message('添加成功')
          this.$emit('update:dialogVisible', false) // 这里不需要重置表单的校验,因为监听close事件会自动帮我们重置
        }
      })
    },
    cancelForm() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
    }
  }
}
</script>

<style>
</style>
