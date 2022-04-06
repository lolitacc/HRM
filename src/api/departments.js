import myAxios from '@/utils/request'
// 获取组织架构信息的api
export function getDepartments() {
  return myAxios({
    url: '/company/department'
  })
}
// 根据id删除部门的接口
export function delDepartments(id) {
  return myAxios({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 新增部门的接口
export function addDepartments(data) {
  return myAxios({
    url: '/company/department',
    method: 'post',
    data // 这里data对应的是传入的body参数，恰好是函数的形参同名
  })
}
// 根据id拿到部门数据
export function getDeptsById(id) {
  return myAxios({
    url: `/company/department/${id}`
  })
}
// 根据id更改部门数据
export function putDepts(data) {
  return myAxios({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
