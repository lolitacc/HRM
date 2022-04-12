import myAxios from '@/utils/request'
// 获取权限
export function getPermissionList() {
  return myAxios({
    url: '/sys/permission'
  })
}
// 新增权限
export function addPermission(data) {
  return myAxios({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 更新权限
export function putPermission(data) {
  return myAxios({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 删除权限
export function delPermission(id) {
  return myAxios({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// 获取权限详情
export function getPermissionDetail(id) {
  return myAxios({
    url: `/sys/permission/${id}`
  })
}
