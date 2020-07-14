<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">秘密广场</div></nav-bar>
    <!-- <div>搜索</div> -->
    <tab-control class="home-tab" :titles="['最新', '热门', '关注']" @tabClick="tabClick" ref="tabControl"
    ></tab-control>
    <scroll class="wrap" 
            ref="scroll" 
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <goods-list :goods="showGoods" v-if="showGoods"></goods-list>
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


import { getHomeMultidata, getHomeGoods, getHomeSecrets, getHotSecrets, getFriendsSecrets } from "network/home"
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'news': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      // 秘密
      secrets: {
        'new': {page: 0, list: []},
        'hot': {page: 0, list: []},
        'friends': {page: 0, list: []}
      },
      currentType: 'new',
      isShowBackTop: false,
      tabOffsetTop: 0,
      saveY: -200
    }
  },
  computed: {
    showGoods () {
      return this.secrets[this.currentType].list
    }
  },
  created () {
    // 1.请求多个数据
    // this.getHomeMultidata()
    // // 2.请求商品数据
    // this.getHomeGoods('pop')
    // this.getHomeGoods('news')
    // this.getHomeGoods('sell')
    this.getHomeSecrets()
    this.getHotSecrets()
    if (this.$user.accessToken) {
      this.getFriendsSecrets()
    }
    
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
          this.currentType = 'new'
          break
        case 1:
          this.currentType = 'hot'
          break
        case 2:
          this.currentType = 'friends'
           break;
      }
    },
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      })
    },
    getHomeGoods (type) {
      getHomeGoods(type, this.goods[type].page ++).then(res => {
        // 接口错误
        if (!res) {
          return
        }
        console.log(res)
        // this.goods[type].list.push(...res.data.list)
      })
    },
    // 获取最新下一页的秘密
    getHomeSecrets () {
      getHomeSecrets(++this.secrets.new.page).then(res => {
        // console.log(res)
        if (!res) {
          return
        }
        this.secrets.new.list.push(...res.content);
        // console.log(this.secrets.new.list);
        // this.goods[type].list.push(...res.data.list)
      })
    },
    // 获取热门下一页的秘密
    getHotSecrets () {
      getHotSecrets(++this.secrets.hot.page).then(res => {
        // console.log(res)
        if (!res) {
          return
        }
        this.secrets.hot.list.push(...res.content);
        console.log(this.secrets.hot.list);
        // this.goods[type].list.push(...res.data.list)
      })
    },
    // 获取关注下一页的秘密
    getFriendsSecrets () {
      getFriendsSecrets(this.$user.accessToken, ++ this.secrets.friends.page).then(res => {
        // console.log(res)
        if (!res) {
          return
        }
        this.secrets.friends.list.push(...res.content);
        console.log(this.secrets.friends.list);
        // this.goods[type].list.push(...res.data.list)
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
      if (this.currentType === 'new') {
        this.getHomeSecrets()
      } else if (this.currentType === 'hot') {
        this.getHotSecrets()
      } else {
        this.getFriendsSecrets()
      }
      // this.getHomeMultidata2()
      this.$refs.scroll && this.$refs.scroll.scroll.finishPullUp()
      // this.$refs.scroll.scroll.refresh()
      
    }
  }
}
</script>

<style>
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
    top: 80px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
