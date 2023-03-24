<template>
  <view class="top-logo">
    <image class="top-logo__img" :src="src" />
    <p>{{ title }}</p>
  </view>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: '/static/headPhoto/girl.jpg',
      },
      title: {
        type: String,
        default: '欢迎进入发动集产业链共创平台',
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .top-logo {
    text-align: center;

    &__img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
</style>
