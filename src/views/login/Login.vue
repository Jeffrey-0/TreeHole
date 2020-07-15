<template>
   <div>
      <nav-bar class="home-nav"><div slot="center">登录</div></nav-bar>
      <form>
        <div class="row">
          <input type="text" v-model="userName" placeholder="用户名">
        </div>
        <div class="row">
          <input type="text" v-model="password" placeholder="密码">
        </div>
        <div class="row submit">
          <input type="submit" name="" value='登录' @click.prevent="submit">
        </div>
      </form>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { login } from "network/login"
import Vue from 'vue'

export default {
  name: 'Publish',
  components: {
    NavBar
  },
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    submit () {
      login(this.userName, this.password).then(res => {
        console.log(res)
        if (!res) {
          this.$toast.show('用户名或密码错误')
          return
        }
        this.$toast.show('登录成功')
        this.$router.replace('/home')
        // this.$user = res.user
        // this.$user.accessToken = res.accessToken
        Vue.prototype.$user = res.user
        Vue.prototype.$user.accessToken = res.accessToken
      })
      
    }
  }
}
</script>

<style scoped>
 .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0px;
    z-index: 0;
    left: 0;
    right: 0;
  }
  form {
    box-sizing: border-box;
    margin-top: 140px;
    padding: 5%;
    width: 100%;
  }
  .row {
    box-sizing: border-box;
    width: 100%;
    padding: 8% 5%;
  }
  input {
    width: 100%;
    border: 0px;
    padding: 10px;
    border-bottom: 1px solid #2f2f2f;
  }
  .submit input {
    background: seagreen;
    color: seashell;
  }

</style>
