import { request } from './request'
// 点赞
export function createSecret (accessToken, content, status) {
  return request({
    url: 'secret/create',
    method: 'post',
    data: {
      content,
      status
    },
    headers: {
      accessToken: accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

export function createWish (accessToken, content, status) {
  return request({
    url: 'wish/create',
    method: 'post',
    data: {
      content,
      status
    },
    headers: {
      accessToken: accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
