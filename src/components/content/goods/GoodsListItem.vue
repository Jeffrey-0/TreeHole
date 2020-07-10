<template>
  <div class="GoodsListItem" @click="itemClick">
    <div>
      <img class="portrait" src="~assets/img/default/user.jpg" alt="" @load="imageLoad">
      <span class="username">小疯子</span>
      <span class="watch">关注</span>
      <!-- <span class="watched">已关注</span> -->
      <!-- <img class="photo" :src="goodsItem.image" alt="" @load="imageLoad"> -->
      <img class="photo" :src="goodsItem.image" alt="" @load="imageLoad">
      <img class="photo" :src="goodsItem.image" alt="" @load="imageLoad">
      <img class="photo" :src="goodsItem.image" alt="" @load="imageLoad">
      <img class="photo" src="~assets/img/default/user.jpg" alt="" @load="imageLoad">
    </div>
    <div>
      <p>文本（text），从词源上来说，它表示编织的东西。这与中国“文”的概念颇有类似之处。“文”取象人形，指纹身，指花纹。《说文解字叙》称：“仓颉初作书，盖依类象形，故曰文。”“文者，物象之本。”物象均具纹路色彩，因以“文”来指称。《周易·系辞下》记伏羲氏“观鸟兽之文”，鸟兽身上的花纹彩羽。该书又载“物相杂故曰文”，物体的形状、线条色彩相互交错，这也是文。“观乎天文，以察时变，观乎人文，以化成天下。”《说文解字》解释“文”为“错画也。”</p>
    </div>
    <div>
      <!-- <img class="photo" :src="goodsItem.image" alt=""> -->
    </div>
    <div>
      <span class="time">2020-07-09 19:00</span>
      <span class="report">举报</span>
      <span class="comment">20</span>
      <span class="comfort">20</span>
    </div>
    

  </div>
</template>

<script>
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
  methods: {
    imageLoad () {
      // console.log('imageLoad')
      this.$bus.$emit('itemImageLoad')
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.sort)
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