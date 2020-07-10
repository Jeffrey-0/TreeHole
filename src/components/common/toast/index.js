import Toast from './Toast'
const obj = {}
obj.install = function (Vue) {
  console.log('执行了obj的install函数', Vue)
  const ToastContrustor = Vue.extend(Toast)
  const toast = new ToastContrustor()
  toast.$mount(document.createElement('div'))
  document.body.append(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
