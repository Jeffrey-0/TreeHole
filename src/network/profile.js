import { request } from './request'
// 查看某用户信息
export function getUser (userid) {
  return request({
    url: '/user/' + userid
  })
}

// 查看某用户所有秘密
export function getOneSecrets (userid) {
  return request({
    url: '/timeline/user/' + userid
  })
}

// 查看某用户所有愿望
export function getOneWishs (userid) {
  return request({
    url: '/timeline/user/' + userid
  })
}
// 查看某用户秘密 分页
export function getOneSecretsByPage (userid, currentPage, pageSize = 6) {
  return request({
    url: '/home/user/' + userid,
    params: {
      currentPage,
      pageSize
    }
  })
}

// 查看某用户愿望 分页
export function getOneWishsByPage (userid, currentPage, pageSize = 6) {
  return request({
    url: '/wish/user/' + userid,
    params: {
      currentPage,
      pageSize
    }
  })
}

// 查看我的秘密 分页
export function getMeSecretsByPage (accessToken, currentPage, pageSize = 6) {
  return request({
    url: '/home/me',
    params: {
      currentPage,
      pageSize
    },
    headers: {
      accessToken
    }
  })
}

// 查看某用户所有愿望
export function getMeWishsByPage (accessToken, currentPage, pageSize = 6) {
  return request({
    url: '/wish/me',
    params: {
      currentPage,
      pageSize
    },
    headers: {
      accessToken
    }
  })
}
