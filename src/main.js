import Vue from 'vue'
import App from './App.vue'
import router from './router'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

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
