<template>
  <div class="GoodsListItem">
    <div>
      <img v-if="goodsItem.user.portrait" class="portrait" :src="showPortrait" alt="" @load="imageLoad" @click="portraitClick">
      <img v-else class="portrait" src="~assets/img/default/user.jpg" alt="" @load="imageLoad" @click="portraitClick">
      <span class="username" @click="portraitClick">{{goodsItem.user.userName}}</span>
      <span class="watch" @click="followClick">关注</span>
      <!-- <span class="watched">已关注</span> -->
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
      <span class="comfort" @click="likeClick">{{goodsItem.likes.length}}</span>
    </div>
    

  </div>
</template>

<script>
// import { getYYYYMMDDMMSS } from 'common/utils'
// import { imageBaseUrl } from 'common/const'
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
  data () {
    return {
      imageBaseUrl: this.$imageBaseUrl
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
      this.$router.push('/detail/' + this.goodsItem.sort)
    },
    // 点击关注
    followClick () {
      console.log('发送关注请求')
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
    },
    // 点赞
    likeClick () {
      console.log('发送点赞请求')
    },
    // 点击举报
    reportClick () {
      console.log('举报成功')
    },

  },
  computed: {
    showTime () {
      return this.$formatTime(this.goodsItem.createTime)
    },
    showPortrait () {
      return this.imageBaseUrl + this.goodsItem.user.portrait 
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
</style>