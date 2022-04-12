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
/** *
 *  获取员工详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return myAxios({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新员工详情的基础信息
 * **/
export function putPersonal(data) {
  return myAxios({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取员工的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return myAxios({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 更新员工岗位信息
 * ****/
export function putJob(data) {
  return myAxios({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
/**
 * 分配角色
 */
export function assignRoles(data) {
  return myAxios({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
