<template>
  <div id="detail">
    <nav-bar class="home-nav">
      <div slot="left" @click="backClick"><img class="back-icon" src="~assets/img/direction/left.svg" alt=""></div>
      <div slot="center">详情</div>
    </nav-bar>
    <scroll ref="scroll" class="content">
      <div class="user">
        <img  class="portrait" :src="showPortrait" alt="" @click="portraitClick">
        <!-- <img v-else class="portrait" src="~assets/img/default/user.jpg" alt="" @click="portraitClick"> -->
        <span class="username" @click="portraitClick">{{ showUserName }}</span>
        <span v-if="follow === 0 && secret.status !== 1" class="watch" @click="followClick">关注</span>
        <span v-else-if="follow === 1 && secret.status !== 1" class="watched" @click="followClick">已关注</span>
        <span class="time">{{ showTime }}</span>
      </div>
      <div>
        <p>{{ secret.content }}</p>
      </div>
      <div  v-if="secret">
        <div v-for="(item, index) in secret.pictures" :key="index">
            <img class="photo" v-lazy="$imageBaseUrl + item.imgUrl" alt="" @load="imageLoad">
        </div>
      </div>
      <div class="interact">
        <span class="report" @click="reportClick">举报</span>
        <span class="comment">{{ secret.comments.length }}</span>
        <span class="comfort" @click="likeClick" :class="{like :like}">{{ secret.likes.length }}</span>
      </div>
      <comment-list  class="commentList" :comments="secret.comments" :secretId="secret.id"></comment-list>
    </scroll>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CommentList from 'components/content/comment/CommentsList'
import { getDetail } from 'network/detail'
import { like, dislike } from "network/like"
import { follow, disfollow } from "network/follow"

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      goods: {},
      secret: {
        user: {},
        likes: [],
        comments: [],
        pictures: []
      },
      follow: 1,
      like: false
    }
  },
  components: {
    NavBar,
    Scroll,
    CommentList
  },
  methods : {
    backClick () {
      // console.log(this.$route)
      this.$router.back()
    },
    imageLoad () {
      console.log(this.$refs.scroll)
      this.$refs.scroll.refresh()
      console.log('图片加载王')
    },
    // reportClick () {
    //   console.log('举报')
    //   this.$toast.show('举报成功', 1000)
    // },
    // 点击头部或名称
    portraitClick () {
      // this.$router.push('/detail/' + this.secret.sort)
      if (this.secret.status !== 1) {
        this.$router.replace('/profile/' + this.secret.user.id)
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
        follow(this.$user.accessToken, this.secret.user.id).then(res => {
          if (!res) return 
          this.follow = 1
        })
      } else if (this.follow === 1) {
        disfollow(this.$user.accessToken, this.secret.user.id).then(res => {
          if (!res) return  
          this.follow = 0
        })
      }
    },
    // 点击图片
    imageClick (i) {
      console.log('显示图片' + i)
    },
    // 点击内容
    contentClick () {
      this.$router.push('/detail/' + this.secret.id)
    },
    // 点击评论
    commentClick () {
      console.log('显示评论')
      this.commentShow = !this.commentShow
    },
    // 点赞
    likeClick () {
      if (!this.$user.accessToken) {
        this.$toast.show('请先登录')
        return
      }
      if (this.like) {
        dislike(this.$user.accessToken, this.secret.id).then(res => {
          console.log(res)
          this.like = false
          this.secret.likes.length --
        })
      } else {
        like(this.$user.accessToken, this.secret.id).then(res => {
          console.log(res)
          this.like = true
          this.secret.likes.length ++
        })
      }
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
      if (this.$user.id === this.secret.user.id) {
        return 0
      }
      let friend = this.$user.friends.map(function (a) {
        return a.id === this.secret.user.id
      })
      if (!friend) {
        return 1
      }
      return 2
    }
  },
  computed: {
    showTime () {
      return this.$formatTime(this.secret.createTime)
    },
    // showPortrait () {
    //   return this.$imageBaseUrl + this.secret.user.portrait
    // }
    showPortrait () {
      return this.secret.user.portrait && this.secret.status === 0  ? this.$imageBaseUrl + this.secret.user.portrait : require('assets/img/default/user.jpg')
    },
    showUserName () {
      return this.secret.status === 1 ? '匿名' : this.secret.user.userName
    }
  },
  created () {
    this.iid = this.$route.params.iid
    console.log(this.$route.params.iid)
    getDetail(this.iid).then(res => {
      console.log(res)
      this.secret = res
    }).then( () => {
      if (!this.$user.accessToken) {
          return
      }
      // 查看关注
      console.log('查看关注', this.$user.friends, this.secret.user.id)
      if (this.$user.id === this.secret.user.id) {
        this.follow = 2
      } else if(this.$user.friends.filter((item) => {
        return item.id === this.secret.user.id
      }).length > 0) {
        this.follow = 1
      }
      // 查看点赞
      console.log('查看点赞', this.secret.likes, this.$user.id)
      if (this.secret.likes.filter((item) => {
        return item.id === this.$user.id
      }).length > 0) {
        this.like = true
      }
    })

    
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0px;
    z-index: 2;
    left: 0;
    right: 0;
  }
  .back-icon {
    width: 30px;
    vertical-align: middle;
  }
  .user {
    margin-top: 44px;
    padding: 10px;
    border-bottom: 1px solid #8f8f8f ;
  }
  .user span {
    margin-left: 10px;
    line-height: 30px;
    vertical-align: top;
  }
  .portrait {
    width: 30px;
    border-radius: 4px;
  }
  .photo {
    width: 90%;
    margin: 10px 5%;
  }
  .comment::before, .comfort::before {
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
    vertical-align: top;
    padding: 5px;
    border-radius: 10px;
    margin-left: 10px;
    font-size: 14px;
  }
  .watched {
    background: pink;
    color: #fff;
  }
  .time {
    float: right;
    margin-right: 10px;
  }
  p {
    padding: 0px 20px;
    line-height: 24px;
  }
  .comment, .comfort, .report{
    vertical-align: middle;
    float: right;
    margin-right: 10px;
  }
  #detail {
    position: relative;
    z-index: 2;
    background: #fff;
    height: 100vh;
  }
  .interact::after {
    content: '';
    display: block;
    clear: both;
  }
  .content {
    width: 100%;
    height: calc(100% - 44px);
  }
  .commentList{
    margin: 10px;
  }
  .like::before {
    background-image: url(~assets/img/public/love_a.svg);
  }
</style>