import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Wish = () => import('views/wish/Wish')
const Publish = () => import('views/publish/Publish')
const Message = () => import('views/message/Message')
const Profile = () => import('views/profile/Profile')

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
  }, {
    path: '/publish',
    component: Publish
  }, {
    path: '/message',
    component: Message
  }, {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
