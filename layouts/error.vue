<template>
  <div class="container text-center error-wrapper">
    <h3 v-if="error.statusCode === 404">404，页面没找到</h3>
    <h3 v-else>出错了!</h3>
    <nuxt-link to="/">回到首页</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['error'],
  }
</script>
<style scoped>
  .error-wrapper{
    width: calc(100%);
    height: calc(66vh);
  }
</style>
