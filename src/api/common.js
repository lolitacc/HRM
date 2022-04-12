import myAxios from '@/utils/request'
export function imgDownload(data) {
  debugger
  return myAxios({
    url: `/system/upfile/${data.id}`
  })
}
export function imgUpload(data) {
  return myAxios({
    url: '/system/upfile',
    data,
    type: 'post'
  })
}

export function getCityJSON() {
  return myAxios({
    url: '../../static/json/map.json'
  })
}
export function getCityList() {
  return myAxios({
    url: '/sys/city'
  })
}

