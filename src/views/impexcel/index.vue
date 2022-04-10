// excel加载页面
<template>
  <upload-excel :on-success="success" />
</template>
<script>
import { impExcelStaff } from '@/api/employees'
export default {

  methods: {
    async success({ header, results }) {
    // 定义数据中英文转换关系
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '姓名': 'username',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '转正日期': 'correctionTime'
      }
      const newStaff = results.map(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      try {
        await this.$confirm('确定要添加吗')
        await impExcelStaff(newStaff)
        this.$message.success('批量添加成功')
        this.$router.back()// 回到上一个页面
      } catch (error) {
        this.$router.back()
        console.log(error)
      }
    },
    // 格式化excel里面的时间为现代时间
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }

}
</script>

<style>

</style>
