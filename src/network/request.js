import axios from 'axios'
export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    // baseURL: 'http://120.79.198.193:8080',
    baseURL: 'http://127.0.0.1:8080',
    timeout: 10000
  })

  // 2.axios的拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发出真正的网络请求
  return instance(config)
}
