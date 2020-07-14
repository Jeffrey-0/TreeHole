import { request } from './request'
// 查看关注的用户
export function getFriends (userid) {
  return request({
    url: '/friendship/' + userid
  })
}
