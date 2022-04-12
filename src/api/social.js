import myAxios from '@/utils/request'

export function getArchivingCont(params) {
  return myAxios({
    url: `/social_securitys/historys/${params.month}`,
    params
  })
}

export function getArchivingList(data) {
  return myAxios({
    url: `/social_securitys/historys/${data.year}/list`,
    data
  })
}
export function newReport(data) {
  return myAxios({
    url: `/social_securitys/historys/${data.yearMonth}/newReport`,
    method: 'put',
    data
  })
}
export function getHistorysData(data) {
  return myAxios({
    url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`,
    data
  })
}
export function getArchivingExport(data) {
  return myAxios({
    url: `/social_securitys/historys/${data.yearMonth}/export`,
    data
  })
}
export function getArchivingFirst(data) {
  return myAxios({
    url: `/social_securitys/historys/${data.yearMonth}/first`,
    data
  })
}
export function getSocialList(data) {
  return myAxios({
    url: '/social_securitys/list',
    method: 'post',
    data
  })
}
export function getArchivingArchive(data) {
  return myAxios({
    url: `/social_securitys/historys/${data.yearMonth}/archive`,
    method: 'post',
    data
  })
}

export function getTips(yearMonth) {
  return myAxios({
    url: `/social_securitys/tips/${yearMonth}`
  })
}
export function saveContent(data) {
  return myAxios({
    url: `/social_securitys/${data.userId}`,
    method: 'put',
    data
  })
}
export function getContent(userId) {
  return myAxios({
    url: `/social_securitys/${userId}`
  })
}
export function getPaymentItemList(id) {
  return myAxios({
    url: `/social_securitys/payment_item/${id}`
  })
}
export function getSettings() {
  return myAxios({
    url: '/social_securitys/settings'
  })
}
export function saveSettings(data) {
  return myAxios({
    url: '/social_securitys/settings',
    data,
    method: 'post'
  })
}
