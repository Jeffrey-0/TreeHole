<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">广场</div></nav-bar>
    <!-- <div>搜索</div> -->
    <tab-control class="home-tab" :titles="['最新', '热门', '关注']"></tab-control>
    <goods-list :goods="recommends.list"></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from "network/home"

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'news': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('news')
    this.getHomeGoods('sell')
    
  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner
        this.recommends = res.data.recommend
      })
    },
    getHomeGoods (type) {
      getHomeGoods(type, this.goods[type].page + 1).then(res => {
        // 接口错误
        console.log(res)
        // this.goods[type].list.push(...res.data.list)
      })
    }
  }
}
</script>

<style>
  #home {
    padding-top: 44px;
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
  }
</style>
