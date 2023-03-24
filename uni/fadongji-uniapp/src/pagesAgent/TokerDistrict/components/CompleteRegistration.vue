<template>
  <view class="complete">
    <image class="complete-img" src="/static/lease/home/success_prompt.png"></image>
    <view class="lh36 fz-b fz-30 color-block">提交信息完成注册</view>
    <view class="lh36 fz-24 color-block-45 m-t-24">2021-01-01 12:00:00</view>
  </view>
</template>

<script>
  export default {
    name: 'CompleteRegistration',
  }
</script>

<style lang="scss" scoped>
  .complete {
    width: 750rpx;
    height: 100%;
    background: #fff;
    text-align: center;
    &-img {
      width: 176rpx;
      height: 176rpx;
      display: block;
      margin: 0 auto 32rpx;
      padding-top: 180rpx;
    }
  }
</style>
