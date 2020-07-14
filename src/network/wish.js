import { request } from './request'
// 查看愿望
export function getWishs (currentPage, pageSize = 6) {
  return request({
    url: '/wish/public',
    params: {
      currentPage,
      pageSize
    }
  })
}
