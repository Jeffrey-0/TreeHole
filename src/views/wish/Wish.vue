<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">许愿</div></nav-bar>
    <scroll class="wrap" 
            ref="scroll" 
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <wish-list :wish="showWish" v-if="showWish"></wish-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
import WishList from 'components/content/wish/WishList'


import { getWishs } from "network/wish"
import { debounce } from 'common/utils'

export default {
  name: 'Home',
  components: {
    NavBar,
    WishList,
    Scroll,
    BackTop
  },
  data () {
    return {
      wish: {
        'new': {page: 0, list: []}
      },
      currentType: 'new',
      isShowBackTop: false,
      tabOffsetTop: 0,
      saveY: -200
    }
  },
  computed: {
    showWish () {
      return this.wish && this.wish[this.currentType] && this.wish[this.currentType].list
    }
  },
  created () {
    this.getWishs()
    
  },
  activated () {
    console.log('home activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 1)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    getWishs () {
      getWishs(++this.wish.new.page, 6).then(res => {
        this.wish.new.list.push(...res.content)
        console.log(res)
        console.log('获取愿望')
      })
    },
    backClick () {
        this.$refs.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll (position) {
        this.isShowBackTop = (-position.y) > 100

    },
    loadMore () {
      this.getWishs()
      this.$refs.scroll && this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.scroll.refresh()
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
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
