import Vue from 'vue'
import App from './App.vue'
import router from './router'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import { getYYYYMMDDMMSS } from 'common/utils'
import { imageBaseUrl } from 'common/const'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('assets/img/default/user.jpg')
})

Vue.prototype.$imageBaseUrl = imageBaseUrl
Vue.prototype.$formatTime = getYYYYMMDDMMSS
Vue.prototype.$user = {
  id: 1,
  userName: null,
  accessToken: null,
  portrait: null,
  friends: [],
  followers: []
}
// Vue.prototype.$user = {
//   id: 1,
//   userName: '小疯子',
//   accessToken: '58a572f1-9eb4-49ee-92d2-abd36fb9d3d6',
//   portrait: '9ac5c584-1959-4212-a900-229d7c0281c7',
//   friends: [
//     {
//       id: 2,
//       userName: '随风',
//       portrait: '42da4792-c7a3-441c-a91b-32c24ef18052'
//     },
//     {
//       id: 3,
//       userName: '逐梦',
//       portrait: ''
//     },
//     {
//       id: 4,
//       userName: '残影雨逝',
//       portrait: '15391756-0b4e-4b6e-bdcf-f44d5f096c45'
//     }
//   ],
//   followers: [
//     {
//       id: 3,
//       userName: '逐梦',
//       portrait: ''
//     },
//     {
//       id: 4,
//       userName: '残影雨逝',
//       portrait: '15391756-0b4e-4b6e-bdcf-f44d5f096c45'
//     }
//   ]
// }

// 配置代理，解决跨域
Vue.prototype.HOST = {
  target: 'http://20.79.198.193:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}
