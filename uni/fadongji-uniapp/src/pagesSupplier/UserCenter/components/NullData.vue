<template>
  <view class="null">
    <image class="null-img" src="/static/noData/nodata.png" />
    <view class="null-tips">您还没有绑定银行卡</view>
  </view>
</template>

<script>
  export default {
    name: 'NullData',
  }
</script>

<style lang="scss" scoped>
  .null {
    background: #ffffff;
    height: 100%;
    text-align: center;
    &-img {
      width: 416rpx;
      height: 308rpx;
      padding-top: 210rpx;
      display: block;
      margin: 0 auto;
    }
    &-tips {
      margin-top: 36rpx;
      height: 42rpx;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-45;
    }
  }
</style>
