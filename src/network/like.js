import { request } from './request'
// 点赞
export function like (accessToken, sid) {
  return request({
    url: 'secret/like/' + sid,
    headers: {
      accessToken: accessToken
    }
  })
}

// 取消赞
export function dislike (accessToken, sid) {
  return request({
    url: 'secret/dislike/' + sid,
    headers: {
      accessToken: accessToken
    }
  })
}
