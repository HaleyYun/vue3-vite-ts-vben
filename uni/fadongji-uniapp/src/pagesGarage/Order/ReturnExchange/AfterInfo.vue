<template>
  <view class="return flex flex-column">
    <VoNav is-fixed is-have-more title="售后说明" />
    <image class="return-first" src="/static/garage/home/after_info_first.png" />
    <image class="return-second" src="/static/garage/home/after_info_second.png" />
    <image class="return-third" src="/static/garage/home/after_info_third.png" />
  </view>
</template>

<script>
  export default {
    name: 'AfterInfo',
  }
</script>

<style lang="scss" scoped>
  .return {
    width: 750rpx;
    min-height: 100vh;
    &-first {
      margin-top: 16rpx;
      width: 750rpx;
      height: 426rpx;
    }
    &-second {
      margin-top: 16rpx;
      width: 750rpx;
      height: 740rpx;
    }
    &-third {
      margin-top: 16rpx;
      width: 750rpx;
      height: 898rpx;
    }
  }
</style>
