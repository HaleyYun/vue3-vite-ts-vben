<template>
  <view class="wrap-time">{{ time }}</view>
</template>
<script>
  export default {
    props: {
      time: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  .wrap-time {
    font-size: 24rpx;
    color: $u-tips-color;
    text-align: center;
  }
</style>
