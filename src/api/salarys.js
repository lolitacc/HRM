import myAxios from '@/utils/request'

export function getSalarysList(data) {
  return myAxios({
    url: '/salarys/list',
    data,
    method: 'post'
  })
}

export function getTips(yearMonth) {
  return myAxios({
    url: `/salarys/tips/${yearMonth}`
  })
}
export function getSettings() {
  return myAxios({
    url: '/salarys/settings'
  })
}

export function getCompanySetting() {
  return myAxios({
    url: '/salarys/company-settings'
  })
}
export function saveSettings(data) {
  return myAxios({
    url: '/salarys/settings',
    method: 'post', data
  })
}

export function getSalaryDetail(userId) {
  return myAxios({
    url: `/salarys/modify/${userId}`
  })
}
export function changeSalary(data) {
  return myAxios({
    url: `/salarys/modify/${data.userId}`,
    method: 'post',
    data
  })
}
export function initSalary(data) {
  return myAxios({
    url: `/salarys/init/${data.userId}`,
    method: 'post',
    data
  })
}
export function getArchivingList(params) {
  return myAxios({
    url: `/salarys/reports/${params.year}`,
    params
  })
}
export function getArchivingCont(params) {
  return myAxios({
    url: `/salarys/reports/${params.yearMonth}`,
    params
  })
}
export function newReport(data) {
  return myAxios({
    url: `/salarys/reports/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getArchivingExport(params) {
  return myAxios({
    url: `/salarys/reports/${params.yearMonth}/export`,
    params
  })
}
export function getArchivingFirst(params) {
  return myAxios({
    url: `/salarys/reports/${params.yearMonth}/first`,
    params
  })
}
export function getArchivingArchive(data) {
  return myAxios({
    url: `/salarys/reports/${data.yearMonth}/archive`,
    data,
    method: 'post'
  })
}
