<template>
  <div class="user">
    <user-list-item @disfollow="disfollow" v-for="item in userlist" :key="item.id" :user-item="item"></user-list-item>
  </div>
</template>

<script>
import UserListItem from 'components/content/user/UserListItem'
export default {
  name: 'UserList',
  props: {
    userlist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    UserListItem
  },
  methods: {
    disfollow (i) {
      console.log(i)
      this.$emit('disfollow', i)
      // this.userlist = this.userlist.filter(item => {
      //   return item.id !== i
      // })
    }
  }
}
</script>

<style>

</style>