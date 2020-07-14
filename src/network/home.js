import { request } from './request'
export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 查看最新秘密
export function getHomeSecrets (currentPage, pageSize = 6) {
  return request({
    url: '/home/public',
    params: {
      currentPage,
      pageSize
    }
  })
}

// 查看热门秘密
export function getHotSecrets (currentPage, pageSize = 6) {
  return request({
    url: '/home/hot',
    params: {
      currentPage,
      pageSize
    }
  })
}

// 查看关注秘密
export function getFriendsSecrets (accessToken, currentPage, pageSize = 6) {
  return request({
    url: '/home/friendship',
    params: {
      currentPage,
      pageSize
    },
    headers: {
      accessToken: accessToken
    }
  })
}
