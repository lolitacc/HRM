import myAxios from '@/utils/request'
// 获取考勤列表
export function getAttendancesList(params) {
  return myAxios({
    url: '/attendances',
    params
  })
}
// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return myAxios({
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  })
}
export function updateAttendance(data) {
  return myAxios({
    url: `/attendances/${data.userId}`,
    method: 'put',
    data
  })
}
export function getArchivingList(params) {
  return myAxios({
    url: '/attendances/reports/year',
    params
  })
}
export function getArchivingCont(params) {
  return myAxios({
    url: `/attendances/reports/${params.atteArchiveMonthlyId}`,
    params
  })
}

export function importArchive(data) {
  return myAxios({
    url: '/archive/atte/export',
    method: 'post',
    data
  })
}
// 提醒接口
export function notify() {
  return myAxios({
    url: '/notify/mail',
    method: 'post'
  })
}
export function archives(params) {
  return myAxios({
    url: '/attendances/archives',
    params
  })
}
export function newReports(params) {
  return myAxios({
    url: '/attendances/newReports',
    params
  })
}
export function information() {
  return myAxios({})
}

export function pay() {
  return myAxios({})
}
export function reportFormList(params) {
  return myAxios({
    url: '/attendances/reports',
    params
  })
}

// 请假保存
export function leaveSave(data) {
  return myAxios({
    url: '/cfg/leave',
    method: 'put',
    data
  })
}
// 请假获取
export function getLeave(data) {
  return myAxios({
    url: '/cfg/leave/list',
    method: 'post',
    data
  })
}
// 扣款设置保存
export function deductionsSave(data) {
  return myAxios({
    url: '/cfg/deduction',
    method: 'put',
    data
  })
}
// 获取扣款设置
export function getDeductions(data) {
  return myAxios({
    url: '/cfg/ded/list',
    method: 'post',
    data
  })
}

// 加班配置保存
export function overtimeSave(data) {
  return myAxios({
    url: '/cfg/extDuty',
    method: 'put',
    data
  })
}

// 获取加班配置
export function getOvertime(data) {
  return myAxios({
    url: '/cfg/extDuty/item',
    method: 'post',
    data
  })
}
// 考勤数据保存
export function attendanceSave(data) {
  return myAxios({
    url: '/cfg/atte',
    method: 'put',
    data
  })
}
// 考勤数据保存
export function getAttendance(data) {
  return myAxios({
    url: '/cfg/atte/item',
    method: 'post',
    data
  })
}
export function fileUpdate(data) {
  return myAxios({
    url: `/employees/archives/${data.month}`,
    method: 'put',
    data
  })
}
