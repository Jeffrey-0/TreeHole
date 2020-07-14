<template>
  <div class="UserListItem">
    <div>
      <img v-if="userItem.portrait" class="portrait" :src="showPortrait" alt="" @load="imageLoad" @click="portraitClick">
      <img v-else class="portrait" src="~assets/img/default/user.jpg" alt="" @load="imageLoad" @click="portraitClick">
      <span class="username" @click="portraitClick">{{userItem.userName}}</span>
      <img class="delete" @click="deleteClick" src="~assets/img/direction/close.svg" alt="">
    </div>
  </div>
</template>

<script>
import { disfollow } from "network/follow"
export default {
  name: 'UserListItem',
  props: {
    userItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('itemImageLoad')
    },
    // 点击头部或名称
    portraitClick () {
      // this.$router.push('/detail/' + this.userItem.id)
      this.$router.replace('/profile/' + this.userItem.id)
    },
    // 点击删除
    deleteClick () {
      disfollow(this.$user.accessToken, this.userItem.id).then(res => {
        if (!res) return
        this.$emit('disfollow', res.id)
      })
      }
    },
  created () {
    if (!this.$user.accessToken) {
        return
    }
    // 查看关注
    
  },
  computed: {
    showPortrait () {
      return this.$imageBaseUrl + this.userItem.portrait 
    }
  }
}
</script>

<style scoped>
  .UserListItem {
    padding: 10px;
    border-bottom: 4px solid #f2f2f2;
  }
  .portrait, .username, .delete{
    width: 56px;
    height: 56px;
    vertical-align: middle;
    padding: 2px 10px;
    /* display: inline-block; */
  }
  .portrait {
    object-fit: cover;
    border-radius: 10%;
  }
  .delete {
    width: 30px;
    height: 56px;
    float: right;
  }
  
</style>