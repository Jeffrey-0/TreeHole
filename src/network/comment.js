import { request } from './request'
// export function commentCreat (iid) {
//   return request({
//     url: 'secret/create' + iid
//   })
// }
// 评论
export function commentCreat (accessToken, sid, content, replyUser = null) {
  if (replyUser) {
    return request({
      url: 'comment/create/' + sid,
      method: 'post',
      data: {
        content,
        replyUser: replyUser || null
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
  } else {
    return request({
      url: 'comment/create/' + sid,
      method: 'post',
      data: {
        content
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
}
