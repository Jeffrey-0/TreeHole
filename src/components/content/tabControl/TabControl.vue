<template>
  <div class="tab-control">
    <div  class="tab-control-item" v-for="(item,index) in titles" :key="item"
          :class="{active: index === currentIndex}" @click="itemClick(index)">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (item) {
      this.currentIndex = item;
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    height: 30px;
  }
  .tab-control-item {
    flex: 1;
    text-align: center;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color : var(--color-high-text);
  }
  .active span {
    border-bottom: 1.5px solid var(--color-high-text);
  }
</style>