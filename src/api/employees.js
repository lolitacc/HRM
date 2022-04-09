import myAxios from '@/utils/request'
// 获取员工简单列表接口
export function getStaffSimple() {
  return myAxios({
    url: '/sys/user/simple'

  })
}
// 获取与员工列表接口
export function getStaff(params) {
  return myAxios({
    url: '/sys/user',
    params
  })
}
// 根据id删除员工接口
export function delStaff(id) {
  return myAxios({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 新增员工接口
export function addStaff(data) {
  return myAxios({
    method: 'post',
    url: '/sys/user',
    data
  })
}
// excel批量导入员工接口
export function impExcelStaff(data) {
  return myAxios({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
