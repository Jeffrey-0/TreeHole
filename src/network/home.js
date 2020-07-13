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

export function getHomeSecrets (currentPage, pageSize = 6) {
  return request({
    url: '/home/public',
    params: {
      currentPage,
      pageSize
    }
  })
}

export function getHotSecrets (currentPage, pageSize = 6) {
  return request({
    url: '/home/hot',
    params: {
      currentPage,
      pageSize
    }
  })
}

export function getFriendsSecrets (currentPage, pageSize = 6) {
  return request({
    url: '/home/friendship',
    params: {
      currentPage,
      pageSize
    },
    headers: {
      accessToken: 'adb78664-e8b8-4683-9c05-23ffcfd697fa'
    }
  })
}
