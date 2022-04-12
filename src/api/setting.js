import myAxios from '@/utils/request'
// 获取角色列表的接口
export function getRoleList(params) {
  return myAxios({
    url: '/sys/role',
    params
    // 携带一个params参数对象包括请求页数page和每页条数pageSize
  })
}
// 根据公司id获取公司信息
export function getCompanyInfo(id) {
  return myAxios({
    url: `/company/${id}`
  })
}
// 根据id删除职位角色
export function delRole(id) {
  return myAxios({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 根据id获取职位角色详情接口
export function getRoleById(id) {
  return myAxios({
    url: `/sys/role/${id}`
  })
}
// 根据id修改角色信息接口
export function putRole(data) {
  return myAxios({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 新增角色信息接口、
export function addRole(data) {
  return myAxios({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
