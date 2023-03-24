<template>
  <view class="null">
    <image class="null-img" src="/static/created/product/illustrations_two.png" />
    <view class="null-tips">暂无补货商品</view>
  </view>
</template>

<script>
  export default {
    name: 'NullState',
  }
</script>

<style lang="scss" scoped>
  .null {
    background: #ffffff;
    height: 100%;
    text-align: center;
    &-img {
      width: 416rpx;
      height: 276rpx;
      padding-top: 260rpx;
      display: block;
      margin: 0 auto;
    }
    &-tips {
      margin-top: 32rpx;
      height: 42rpx;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-25;
    }
  }
</style>
