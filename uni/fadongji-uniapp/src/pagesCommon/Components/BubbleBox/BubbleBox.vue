<template>
  <view
    :class="{
      'wrap-bubble': bubblePosition === 'left',
      'wrap-bubble__main': bubblePosition === 'right',
    }"
    >{{ message }}</view
  >
</template>
<script>
  export default {
    props: {
      message: {
        type: String,
        default: '',
      },
      bubblePosition: {
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
  .wrap-bubble {
    background: #fff;
    font-size: 30rpx;
    margin-left: 30rpx;
    padding: 16rpx 20rpx;
    border-radius: 10rpx;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 16px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 8px solid #fff;
    }
  }
  .wrap-bubble__main {
    background: lightgreen;
    font-size: 30rpx;
    margin-right: 30rpx;
    padding: 16rpx 20rpx;
    border-radius: 10rpx;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: -8px;
      top: 16px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 8px solid lightgreen;
    }
  }
</style>
