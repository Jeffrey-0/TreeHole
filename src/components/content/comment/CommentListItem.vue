<template>
  <div class="CommentListItem">
    <div v-if="commentItem.replyUser" @click="commentContentClick(commentItem.user.id, commentItem.user.userName)">
      <a href="#">{{ commentItem.user.userName }}</a> 回复 <a href="#">{{ commentItem.replyUser.userName }}</a>:{{ commentItem.content }}
    </div>
    <div v-else @click="commentContentClick(commentItem.user.id, commentItem.user.userName)">
      <a href="#">{{ commentItem.user && commentItem.user.userName }}</a> :{{ commentItem.content }}
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'CommentListItem',
  props: {
    commentItem: {
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
    commentContentClick (userId, userName) {
      this.$emit('ContentClick', userId, userName)
      // console.log(userId, userName)
    }

  },
  computed: {
    showTime () {
      return this.$formatTime(this.goodsItem.createTime)
    },
    showPortrait () {
      return this.$imageBaseUrl + this.goodsItem.user.portrait 
    }
  }
}
</script>

<style scoped>
  .CommentListItem {
    line-height: 24px;
    padding-bottom: 5px;
  }
  a {
    color: var(--color-high-text);
    /* margin-right:5px; */
  }
</style>