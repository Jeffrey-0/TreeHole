import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决导航栏双点报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 1.安装插件
Vue.use(VueRouter)
const Home = () => import('views/home/Home')
const Wish = () => import('views/wish/Wish')
const Publish = () => import('views/publish/Publish')
const Message = () => import('views/message/Message')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Login = () => import('views/login/Login')

// 2.插件路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/wish',
    component: Wish
  },
  {
    path: '/publish',
    component: Publish
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/profile/:uid',
    component: Profile
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
