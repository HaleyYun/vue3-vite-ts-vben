<template>
  <view class="null">
    <image class="null-img" src="/static/created/order/order_no_data.png" />
    <view class="null-tips">您还没有经营品类 </view>
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
      height: 168rpx;
      padding-top: 294rpx;
      display: block;
      margin: 0 auto;
    }
    &-tips {
      margin-top: 36rpx;
      height: 42rpx;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-25;
    }
  }
</style>
