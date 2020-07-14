<template>
  <div class="WishListItem">
    <div>
      <img v-if="wishItem.user.portrait" class="portrait" :src="showPortrait" alt="" @load="imageLoad" @click="portraitClick">
      <img v-else class="portrait" src="~assets/img/default/user.jpg" alt="" @load="imageLoad" @click="portraitClick">
      <span class="username" @click="portraitClick">{{showUserName}}</span>
      <span v-if="follow === 0" class="watch" @click="followClick">关注</span>
      <span v-else-if="follow === 1" class="watched" @click="followClick">已关注</span>
      <span class="time">{{showTime}}</span>
    </div>
    <div>
      <p>{{wishItem.content}}</p>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { follow, disfollow } from "network/follow"
export default {
  name: 'WishListItem',
  props: {
    wishItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      imageBaseUrl: this.$imageBaseUrl,
      secret: {},
      commentShow: false,
      follow: 0,
      like: false
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick () {
      this.$router.push('/detail/' + this.wishItem.sort)
    },
    // 点击头部或名称
    portraitClick () {
      if (this.wishItem.status !== 1) {
        this.$router.replace('/profile/' + this.wishItem.user.id)
      }
    },
    // 点击关注
    followClick () {
      if (!this.$user.accessToken) {
        this.$toast.show('请先登录')
        return
      }
      console.log('点击关注')
      if (this.follow === 0) {
        follow(this.$user.accessToken, this.wishItem.user.id).then(res => {
          if (!res) return 
          this.follow = 1
        })
      } else if (this.follow === 1) {
        disfollow(this.$user.accessToken, this.wishItem.user.id).then(res => {
          if (!res) return  
          this.follow = 0
        })
      }
    },
    // 点击内容
    contentClick () {
      this.$router.push('/detail/' + this.wishItem.id)
    },
    // 点击举报
    reportClick () {
      if (!this.$user.accessToken) {
        this.$toast.show('请先登录')
        return
      }
      this.$toast.show('举报成功', 1000)
      // console.log('举报成功')
    },
    // 查看是否关注该秘密的用户
    findFollow () {
      if (this.$user.id === this.wishItem.user.id) {
        return 0
      }
      let friend = this.$user.friends.map(function (a) {
        return a.id === this.wishItem.user.id
      })
      if (!friend) {
        return 1
      }
      return 2
    }

  },
  created () {
    if (!this.$user.accessToken) {
        return
    }
    // 查看关注
    if (this.$user.id === this.wishItem.user.id) {
      this.follow = 2
    } else if(this.$user.friends.filter((item) => {
      return item.id === this.wishItem.user.id
    }).length > 0) {
      this.follow = 1
    }
  },
  computed: {
    showTime () {
      return this.$formatTime(this.wishItem.createTime)
    },
    // showPortrait () {
    //   return this.imageBaseUrl + this.wishItem.user.portrait 
    // }
    // ,
    showPortrait () {
      return this.wishItem.user.portrait && this.wishItem.status === 0  ? this.$imageBaseUrl + this.wishItem.user.portrait : require('assets/img/default/user.jpg')
    },
    showUserName () {
      return this.wishItem.status === 1 ? '匿名' : this.wishItem.user.userName
    }
  }
}
</script>

<style scoped>
  .WishListItem {
    padding: 10px;
    border-top: 10px solid #f2f2f2;
  }
  .portrait, .username, .photo , .watch{
    width: 26px;
    height: 26px;
    vertical-align: middle;
    /* display: inline-block; */
  }
  .portrait {
    border-radius: 50%;
  }
  .photo {
    float: right;
    margin-right: 10px;
    border-radius: 2px;
    object-fit: cover;
  }
  .comment, .comfort, .report{
    vertical-align: middle;
    float: right;
    margin-right: 10px;
  }
  .comment::before, .comfort::before{
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(~assets/img/public/message.svg);
    background-size: 100%;
    vertical-align: top;
  }
  .comfort::before {
    background-image: url(~assets/img/public/love.svg);
  }
  .watch, .watched {
    background: #f2f2f2;
    vertical-align: middle;
    padding: 5px;
    border-radius: 10px;
    margin-left: 10px;
    font-size: 14px;
  }
  .watched {
    background: pink;
    color: #fff;
  }
  p {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 6; 
    overflow: hidden;
  }
  .like::before {
    background-image: url(~assets/img/public/love_a.svg);
  }
  .time {
    float: right;
    margin-right: 15px;
  }
</style>