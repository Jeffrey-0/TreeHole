<template>
  <div id="detail">
    <nav-bar class="home-nav">
      <div slot="left" @click="backClick"><img class="back-icon" src="~assets/img/direction/left.svg" alt=""></div>
      <div slot="center">详情</div>
    </nav-bar>
    <scroll ref="scroll" class="content">
      <div class="user">
        <img v-if="secret.user.portrait" class="portrait" :src="showPortrait" alt="" >
        <img v-else class="portrait" src="~assets/img/default/user.jpg" alt="">
        <span class="username">{{ secret.user.userName }}</span>
        <span class="watch">关注</span>
        <!-- <span class="watched">已关注</span>  -->
        <span class="time">{{ showTime }}</span>
      </div>
      <div>
        <p>{{  secret.content }}</p>
      </div>
      <div  v-if="secret">
        <div v-for="(item, index) in secret.pictures" :key="index">
            <img class="photo" v-lazy="$imageBaseUrl + item.imgUrl" alt="" @load="imageLoad">
        </div>
      </div>
      <div class="interact">
        <span class="report" @click="reportClick">举报</span>
        <span class="comment">{{ secret.comments.length }}</span>
        <span class="comfort">{{ secret.likes.length }}</span>
      </div>
      <div class="commentList">
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
        <li>小疯子:犀利犀利</li>
      </div>
    </scroll>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import { getDetail } from 'network/detail'
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
      }
    }
  },
  components: {
    NavBar,
    Scroll
  },
  created () {
    this.iid = this.$route.params.iid
    console.log(this.$route.params.iid)
    getDetail(this.iid).then(res => {
      console.log(res)
      this.secret = res
    })
    // getHomeMultidata().then(res => {
    //     console.log(res)
    //     this.goods = res.data.recommend.list
    // })
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
    reportClick () {
      console.log('举报')
      this.$toast.show('举报成功', 1000)
    }
  },
  computed: {
    showTime () {
      return this.$formatTime(this.secret.createTime)
    },
    showPortrait () {
      return this.$imageBaseUrl + this.secret.user.portrait
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
</style>