<template>
  <view class="wrap">
    <!--  头部  -->
    <VoNav isTransparent title="售后托管">
    </VoNav>
    <view class="wrap-box">
      <image class="wrap-box__img" mode="widthFix" src="/static/supplier/home/AfterHosting.png"></image>
    </view>
    <view :style="{ bottom: $systemInfo.statusBarHeight + 20 + 'px' }" class="text">
      <view class="fz-28 color-block lh150">更多问题可咨询平台客服</view>
      <view class="fz-32 color-block-yellow lh150 m-t-8">400-893-5518</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AfterHosting',
    data() {
      return {
        showDirect: false,
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100vw;
    height: 100vh;
    //position: relative;
    //background-image: url('/static/supplier/home/AfterHosting.png');
    //background-repeat: no-repeat;
    //background-size: 100% 1624rpx;
    z-index: 0;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
    .fixed {
      width: 100vw;
      //position: fixed;
      //z-index: 10;
      //left: 0;
      //top: 0;
    }
    &-box {
      background-color: white;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 0;
      &__img {
        width: 100%;
        height: 868rpx;
        box-sizing: border-box;
        position: relative;
      }
    }
  }
  .text {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
</style>
