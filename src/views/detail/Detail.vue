<template>
  <div id="detail">
    <nav-bar class="home-nav">
      <div slot="left" @click="backClick"><img class="back-icon" src="~assets/img/direction/left.svg" alt=""></div>
      <div slot="center">详情</div>
    </nav-bar>
    <scroll ref="scroll" class="content">
      <div class="user">
        <img class="portrait" src="~assets/img/default/user.jpg" alt="" >
        <span class="username">小疯子</span>
        <span class="watch">关注</span>
        <!-- <span class="watched">已关注</span>  -->
        <span class="time">2020-07-09 19:00</span>
      </div>
      <div>
        <p>文本（text），从词源上来说，它表示编织的东西。这与中国“文”的概念颇有类似之处。“文”取象人形，指纹身，指花纹。《说文解字叙》称：“仓颉初作书，盖依类象形，故曰文。”“文者，物象之本。”物象均具纹路色彩，因以“文”来指称。《周易·系辞下》记伏羲氏“观鸟兽之文”，鸟兽身上的花纹彩羽。该书又载“物相杂故曰文”，物体的形状、线条色彩相互交错，这也是文。“观乎天文，以察时变，观乎人文，以化成天下。”《说文解字》解释“文”为“错画也。”</p>
      </div>
      <div  v-if="goods">
        <div v-for="(item, index) in goods.list" :key="index">
            <img class="photo" v-lazy="item.image" alt="" @load="imageLoad">
        </div>
<!--         
        <img class="photo" v-lazy="goods.list[1].image" alt="" @load="imageLoad">
        <img class="photo" v-lazy="goods.list[2].image" alt="" @load="imageLoad"> -->
        <!-- <img class="photo" v-lazy="~assets/img/default/user.jpg" alt="" @load="imageLoad"> -->
      </div>
      <div class="interact">
        <span class="report" @click="reportClick">举报</span>
        <span class="comment">20</span>
        <span class="comfort">20</span>
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
      goods: {}
    }
  },
  components: {
    NavBar,
    Scroll
  },
  created () {
    this.iid = this.$route.params.iid
    console.log(this.$route.params.iid)
    getDetail().then(res => {
      console.log(res)
      this.goods = res.data.recommend
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