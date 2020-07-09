<template>
   <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_a.svg" alt />
        <div slot="item-text">广场</div>
      </tab-bar-item>
      <tab-bar-item path="/wish">
        <img slot="item-icon" src="~assets/img/tabbar/xuyuan.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/xuyuan_a.svg" alt />
        <div slot="item-text">许愿</div>
      </tab-bar-item>
      <tab-bar-item path="/publish">
        <img slot="item-icon" class="publish" src="~assets/img/tabbar/publish.svg" alt />
        <img slot="item-icon-active" class="publish" src="~assets/img/tabbar/publish.svg" alt />
      </tab-bar-item>
      <tab-bar-item path="/message">
        <img slot="item-icon" src="~assets/img/tabbar/message.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/message_a.svg" alt />
        <div slot="item-text">消息</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/mine.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/mine_a.svg" alt />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>