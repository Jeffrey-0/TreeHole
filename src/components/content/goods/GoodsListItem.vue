<template>
  <div class="GoodsListItem">
    <div>
      <img  class="portrait" :src="showPortrait" alt="" @load="imageLoad" @click="portraitClick">
      <span class="username" @click="portraitClick">{{showUserName}}</span>
      <span v-if="follow === 0 && this.goodsItem.status !== 1" class="watch" @click="followClick">关注</span>
      <span v-else-if="follow === 1 && this.goodsItem.status !== 1" class="watched" @click="followClick">已关注</span>
      <!-- <img class="photo" :src="goodsItem.image" alt="" @load="imageLoad"> -->
      <span v-for="(item, index) in goodsItem.pictures" :key="item.id">
          <img class="photo" :src="imageBaseUrl + item.imgUrl" alt="" @load="imageLoad"  @click="imageClick(index)">
      </span>
    </div>
    <div>
      <p @click="contentClick">{{goodsItem.content}}</p>
    </div>
    <div>
    </div>
    <div>
      <span class="time">{{showTime}}</span>
      <span class="report" @click="reportClick">举报</span>
      <span class="comment" @click="commentClick">{{goodsItem.comments.length}}</span>
      <span class="comfort" @click="likeClick" :class="{like :like}">{{goodsItem.likes.length}}</span>
    </div>
    
    <comment-list v-if="commentShow" :comments="goodsItem.comments" :secretId="goodsItem.id"></comment-list>

  </div>
</template>

<script>
import CommentList from 'components/content/comment/CommentsList'
import { like, dislike } from "network/like"
import { follow, disfollow } from "network/follow"
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CommentList
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
      this.$router.push('/detail/' + this.goodsItem.sort)
    },
    // 点击头部或名称
    portraitClick () {
      if (this.goodsItem.status !== 1) {
        this.$router.replace('/profile/' + this.goodsItem.user.id)
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
        follow(this.$user.accessToken, this.goodsItem.user.id).then(res => {
          if (!res) return 
          this.follow = 1
          let newUser = res
          this.$user.friends.push(newUser)
          console.log(this.$user, res)
        })
      } else if (this.follow === 1) {
        disfollow(this.$user.accessToken, this.goodsItem.user.id).then(res => {
          if (!res) return
          this.follow = 0
          console.log(this.$user.friends, res)
        })
      }
    },
    // 点击图片
    imageClick (i) {
      console.log('显示图片' + i)
    },
    // 点击内容
    contentClick () {
      this.$router.push('/detail/' + this.goodsItem.id)
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
        dislike(this.$user.accessToken, this.goodsItem.id).then(res => {
          console.log(res)
          this.like = false
          this.goodsItem.likes.length --
        })
      } else {
        like(this.$user.accessToken, this.goodsItem.id).then(res => {
          console.log(res)
          this.like = true
          this.goodsItem.likes.length ++
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
      if (this.$user.id === this.goodsItem.user.id) {
        return 0
      }
      let friend = this.$user.friends.map(function (a) {
        return a.id === this.goodsItem.user.id
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
    if (this.$user.id === this.goodsItem.user.id) {
      this.follow = 2
    } else if(this.$user.friends.filter((item) => {
      return item.id === this.goodsItem.user.id
    }).length > 0) {
      this.follow = 1
    }
    // 查看点赞
    if (this.goodsItem.likes.filter((item) => {
      return item.id === this.$user.id
    }).length > 0) {
      this.like = true
    }
  },
  computed: {
    showTime () {
      return this.$formatTime(this.goodsItem.createTime)
    },
    showPortrait () {
      return this.goodsItem.user.portrait && this.goodsItem.status === 0  ? this.$imageBaseUrl + this.goodsItem.user.portrait : require('assets/img/default/user.jpg')
    },
    showUserName () {
      return this.goodsItem.status === 1 ? '匿名' : this.goodsItem.user.userName
    }
  }
}
</script>

<style scoped>
  .GoodsListItem {
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
</style>