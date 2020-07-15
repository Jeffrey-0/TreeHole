import { request } from './request'

// 登录
export function login (userName, password) {

  return request({
    url: 'user/auth',
    method: 'post',
    data: {
      userName,
      password
    },
    headers: {
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
