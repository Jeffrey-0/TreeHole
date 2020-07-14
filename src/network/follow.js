import { request } from './request'
// 点赞
export function follow (accessToken, uid) {
  return request({
    url: 'friendship/create/' + uid,
    headers: {
      accessToken: accessToken
    }
  })
}

export function disfollow (accessToken, uid) {
  return request({
    url: 'friendship/destory/' + uid,
    headers: {
      accessToken: accessToken
    }
  })
}
