// excel加载页面
<template>
  <upload-excel :on-success="success" />
</template>
<script>
import impExcelStaff from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
    // 定义数据中英文转换关系
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      var newStaff = results.map(item => {
        const staffInfo = {}
        Object.keys(item).forEach(key => {
          staffInfo[userRelations[key]] = item[key]// 把对应中文key的数据赋值给英文key
        })
        return staffInfo
      })
      await impExcelStaff(newStaff)
      this.$message.success('导入员工信息成功')
      this.$router.back()// 回到上一个页面
    }
  }

}
</script>

<style>

</style>
