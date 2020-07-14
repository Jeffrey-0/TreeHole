<template>
  <div class="wish">
    <wish-list-item v-for="item in wish" :key="item.id" :wish-item="item"></wish-list-item>
  </div>
</template>
G
<script>
import WishListItem from 'components/content/wish/WishListItem'
export default {
  name: 'WishList',
  props: {
    wish: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    WishListItem
  }
}
</script>

<style>

</style>