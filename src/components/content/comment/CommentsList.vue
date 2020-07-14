<template>
  <div class="commentsList">
      <comment-list-item v-for="item in comments" :key="item && item.id" :comment-item="item" @ContentClick="ContentClick"></comment-list-item>
    <input class="commentInput" name="commentConent" type="text" :placeholder="replyUser.userName ? '回复 ' + replyUser.userName : '评论'" v-model="commentConent">
    <button class="commentBtn green" @click="send">发送</button>
  </div>
</template>

<script>
import CommentListItem from 'components/content/comment/CommentListItem'
import { commentCreat } from "network/comment"
export default {
  name: 'CommentsList',
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    secretId: {
      type: Number,
      default () {
        return -1
      }
    }
  },
  data () {
    return {
      replyUser: {
        id: null,
        userName: null
      },
      commentConent: '',
      // secretId: ''
    }
  },
  components: {
    CommentListItem
  },
  methods: {
    ContentClick (userId, userName) {
      console.log(userId, userName, 'test')
      this.replyUser.id = userId
      this.replyUser.userName = userName
    },
    send () {
      if (!this.$user.accessToken) {
        this.$toast.show('请先登录')
        return
      }
      if (!this.commentConent) {
        this.$toast.show('评论不能为空')
        return
      }
        commentCreat(this.$user.accessToken, this.secretId, this.commentConent, this.replyUser.id).then(res => {
          console.log(res)
          this.comments.push(res)
          this.commentConent = null
          this.replyUser = {
            id: null,
            userName: null
          }
        })
      }
  }
}
</script>

<style>
.commentsList {
  margin-top: 10px;
  background: #f2f2f2;
  padding: 5px;
  border-radius: 2px;
}
.commentInput {
  border: 0px;
  padding: 4px 2px;
  border-radius: 2px;
  width: 75%;
}
.commentBtn {
  border: 1px solid #ccc;
  background: #0000;
  padding: 4px 2px;
  border-radius: 2px;
  width: 20%;
  margin-left: 2%;
  color: #ccc;
}
.green {
  background: #1ea11e96;
  color: #fff;
}
</style>