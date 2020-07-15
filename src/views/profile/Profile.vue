<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">个人</div></nav-bar>
    
    <!-- <div>搜索</div> -->
    <div class="usermessage">
      <img class="userhead" :src="showPortrait" alt="">
      <div>{{ user.userName }}</div>
    </div>
    <tab-control class="home-tab" :titles="['秘密', '愿望']" @tabClick="tabClick" ref="tabControl"
    ></tab-control>
    <scroll class="wrap" 
            ref="scroll" 
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <goods-list :goods="secrets.list" v-if="currentType === 'secrets'"></goods-list>
      <wish-list :wish="wishs.list" v-else></wish-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <goods-list :goods="showGoods"></goods-list> -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import WishList from 'components/content/wish/WishList'


// import { getWishs } from "network/wish"
import { getUser, getOneSecrets, getOneWishs, getOneSecretsByPage, getOneWishsByPage, getMeSecretsByPage, getMeWishsByPage } from "network/profile"
import { debounce } from 'common/utils'

export default {
  name: 'Profile',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    WishList
  },
  data () {
    return {
      uid: null,
      user: {
        
      },
      // 秘密
      secrets: {
        currentPage: 0,
        list: []
      },
      // 愿望
      wishs: {
        currentPage: 0,
        list: []
      },
      currentType: 'secrets',
      isShowBackTop: false,
      tabOffsetTop: 0,
      saveY: -200
    }
  },
  computed: {
    showPortrait () {
      return this.user.portrait ? this.$imageBaseUrl + this.user.portrait : require('assets/img/default/user.jpg')
    }
  },
  created () {
    // console.log('1123123')
    this.uid = this.$route.params.uid || this.$user.id    
    // console.log('用户idd'+ this.$route.params.uid)
    if (this.uid == this.$user.id) {
      this.user = this.$user
      this.getMeSecretsByPage()
      this.getMeWishsByPage()
    } else { 
      this.getUser()
      this.getOneSecretsByPage()
      this.getOneWishsByPage()
    }
    // this.getHomeSecrets()
    // getOneSecrets()
    // getOneWishs()
  },
  destroyed () {
    console.log('home destroyed')
  },
  activated () {
    console.log('home activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    console.log('home deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 1)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

    // console.log(this.$refs.tabControl)
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    console.log(this.$refs.tabControl.$el.offsetTop)
  },
  methods: {
    tabClick (index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'secrets'
          break
        case 1:
          this.currentType = 'wishs'
          break
        case 2:
          this.currentType = 'friends'
           break;
      }
    },
    // 获取某用户信息
    getUser () {
      getUser(this.uid).then(res => {
        if (!res) {
          return
        }
        this.user = res
        // this.secrets.push(...res.content);
      })
    },
    // 获取某用户所有秘密
    getOneSecrets () {
      getOneSecrets(this.uid).then(res => {
        if (!res) {
          return
        }
        // this.secrets.push(...res.content);
      })
    },
    getOneWishs () {
      getOneWishs(this.uid).then(res => {
        if (!res) {
          return
        }
        // this.wishs.push(...res.content);
      })
    },
    // 获取某用户分页秘密
    getOneSecretsByPage () {
      getOneSecretsByPage (this.uid, ++this.secrets.currentPage).then(res => {
        if (!res) {
          return 
        }
        console.log('分页秘密', res)
        this.secrets.list.push(...res.content);
      })
    },
    getOneWishsByPage () {
      getOneWishsByPage(this.uid, ++this.wishs.currentPage).then(res => {
        if (!res) {
          return
        }
        console.log('分页愿望', res)
        this.wishs.list.push(...res.content);
      })
    },
    // 获取我的秘密
    getMeSecretsByPage () {
      if (!this.$user.accessToken) {
        this.$toast.show('未登录，请先登录')
        return
      }
      getMeSecretsByPage(this.$user.accessToken, ++this.secrets.currentPage).then(res => {
        if (!res) {
          return
        }
        this.secrets.list.push(...res.content);
      })
    },
    getMeWishsByPage () {
      if (!this.$user.accessToken) {
        this.$toast.show('未登录，请先登录')
        return
      }
      getMeWishsByPage(this.$user.accessToken, ++this.wishs.currentPage).then(res => {
        if (!res) {
          return
        }
        this.wishs.list.push(...res.content);
      })
    },
    

    backClick () {
        // console.log('backClick')
        // console.log(this.$refs)
        this.$refs.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
        this.isShowBackTop = (-position.y) > 100
      // console.log(position)
    },
    loadMore () {
      // this.getHomeGoods(this.currentType)
      // console.log('上拉')
      if (this.currentType === 'secret') {
        this.getOneSecretsByPage()
      } else {
        this.getOneWishsByPage()
      }
      // this.getHomeMultidata2()
      this.$refs.scroll && this.$refs.scroll.scroll.finishPullUp()
      // this.$refs.scroll.scroll.refresh()
      
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
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
    /* height: calc(100% - 93px); */
    position: absolute;
    top: 250px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .usermessage {
    padding-top: 80px;
    width: 100px;
    height: 140px;
    margin: 0px auto;
  }
  .usermessage img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .usermessage  div {
    text-align: center;
    padding: 10px;
  }
</style>

