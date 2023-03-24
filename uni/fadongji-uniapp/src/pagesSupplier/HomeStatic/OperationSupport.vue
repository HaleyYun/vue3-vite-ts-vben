<template>
  <!--  <view class="wrap">-->

  <scroll-view class="wrap" scroll-y @scroll="distance">
    <view :class="{ 'bg-white': !showTransparent }" class="fixed">
      <!--  头部  -->
      <VoNav :is-fixed="false" :isTransparent="showTransparent">
      </VoNav>
    </view>
    <image @click="$cellPhone('400-893-5518')" class="wrap-img" mode="widthFix" src="/static/supplier/home/OperationSupport.png" />
  </scroll-view>
  <!--  </view>-->
</template>

<script>
  export default {
    name: 'OperationSupport',
    data() {
      return {
        showTransparent: true,
      }
    },
    methods: {
      distance(e) {
        this.showTransparent = e.detail.scrollTop < 50
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    height: 100vh;
    overflow: auto;
  }
  .fixed {
    width: 100vw;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
  }

  .wrap-img {
    width: 750rpx;
    box-sizing: border-box;
  }
</style>
