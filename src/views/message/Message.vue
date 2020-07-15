<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">好友</div></nav-bar>
    <scroll class="wrap" 
            ref="scroll" 
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            >
      <user-list :userlist="userlist" @disfollow="disfollow"></user-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
import UserList from 'components/content/user/UserList'


// import { getUsers } from "network/user"
import { debounce } from 'common/utils'

export default {
  name: 'Message',
  components: {
    NavBar,
    UserList,
    Scroll,
    BackTop
  },
  data () {
    return {
      userlist: [],
      isShowBackTop: false,
      tabOffsetTop: 0,
      saveY: -200
    }
  },
  computed: {
    showUser () {
      return this.userlist
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 1)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    
    backClick () {
        this.$refs.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
        this.isShowBackTop = (-position.y) > 100
    },
    disfollow (i) {
      this.userlist = this.userlist.filter(item => {
        return item.id !== i
      })
    }
  },
  created () {
    console.log(this.$user.friends)
    this.userlist = this.$user.friends
    if (!this.$user.accessToken) {
        this.$toast.show('未登录，请先登录')
        return
      }
    }
}
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0px;
    z-index: 0;
    left: 0;
    right: 0;
  }
  .home-tab {
    padding-top: 10px;
    position: sticky;
    top: 44px;
    background: #fff;
    z-index: 1;
  }
  .wrap{
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
