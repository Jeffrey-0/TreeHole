<template>
   <div>
      <nav-bar class="home-nav"><div slot="center">发布</div></nav-bar>
      <form>
        <div class="row type">
          <!-- <select name="type" id="">
            <option value="secret">秘密</option>
            <option value="wish">愿望</option>
          </select> -->
          <span>
            <input type="radio" name="type" value=0 v-model="type">秘密
          </span>
          <span>
            <input type="radio" name="type" value=1 v-model="type">许愿
          </span>
        </div>
        <div class="row content">
          <textarea name="content" id="" cols="30" rows="10" placeholder="这一刻的想法" v-model="content"></textarea>
        </div>
        <div class="row pictures" v-show="type==='0'">
          <div class="picture" v-for="(item, index) in pictures" :key="index">
            <img :src="item" alt="">
          </div>
          <label for="pictures" v-show="pictures.length < 4"></label>
          <input type="file" name="pictures" id="pictures" @change="uploadP">
        </div>

        <div class="row status">
          <span>
            <input type="radio" name="status" value=0 v-model="status">公开
          </span>
          <span>
            <input type="radio" name="status" value=1 v-model="status">匿名
          </span>
          <span>
            <input type="radio" name="status" value=2 v-model="status">私人
          </span>
        </div>
        <div class="row submit">
          <input type="submit" name="" value='提交' @click.prevent="submit">
        </div>
      </form>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { createSecret, createWish } from "network/publish"
export default {
  name: 'Publish',
  components: {
    NavBar
  },
  data () {
    return {
      type: '0',
      content: '',
      // require('assets/img/default/user.jpg')
      pictures: [],
      status: 0
    }
  },
  methods: {
    submit () {
      console.log('提交', this.content, this.pictures, this.status)
      if (this.type === '0') {
        createSecret(this.$user.accessToken, this.content, this.status).then(res => {
          console.log(res)
          if (res) {
            this.$toast.show('发表成功')
            this.$router.replace('/home')
            this.content = null
            this.pictures = []
          } else {
            this.$toast.show('发表失败')
          }
        })
      } else {
        createWish(this.$user.accessToken, this.content, this.status).then(res => {
          console.log(res)
          if (res) {
            this.$toast.show('发表成功')
            this.$router.replace('/wish')
            this.content = null
            this.pictures = []
          } else {
            this.$toast.show('发表失败')
          }
        })
      }
    },
    uploadP (res) {
      console.log(res)
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
    margin-top: 40px;
    padding: 5%;
    width: 100%;
  }
  .row {
    box-sizing: border-box;
    width: 100%;
    padding: 8% 5%;
  }
  /* .row input,.row select{
    width: 100%;
  } */
  
  /* .row input {
    flex: 1;
  } */
  .type {
    width: 100%;
  }
  .type span {
    /* display: inline-block; */
    width: 50%;
  }
  span {
    display: inline-block;
    text-align: center;
  }
  .content textarea {
    width: 100%;
    height: 150px;
    border: 0;
  }
  .status span {
    width: 33%;
  }
  .submit input {
    width: 100%;
    border: 0px;
    padding: 10px;
    background: seagreen;
    color: seashell;
  }
  .pictures input {
    display: none;
  }
  .pictures label {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url(~assets/img/direction/add.svg);
  }
  .pictures {
    padding: 0px 5%;
  }
  .pictures::after {
    display: block;
    content: '';
    clear: both;
  }
  .pictures .picture {
    float: left;
    width: 50px;
    height: 50px;
    padding: 10px;
  }
  .pictures .picture img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
</style>
