import myAxios from '@/utils/request'
export function getStaffSimple() {
  return myAxios({
    url: '/sys/user/simple'

  })
}
