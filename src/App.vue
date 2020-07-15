<template>

  <div id="app">
    <div class="login_a">
      <a href="/login">登录</a>
    </div>
      <keep-alive exclude="Profile,Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
.login_a {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  line-height: 40px;
  padding: 0px 5px;
  /* padding: 10px; */
}
</style>
