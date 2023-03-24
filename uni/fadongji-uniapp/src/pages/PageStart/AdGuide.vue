<template>
  <swiper :indicator-dots="true" class="ad-swiper">
    <swiper-item>
      <view class="swiper-item"></view>
    </swiper-item>
    <swiper-item>
      <view class="swiper-two">
        <view style="margin-top: 800rpx"></view>
        <u-button @click="goHome">去首页</u-button>
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
  export default {
    name: 'adPage',
    data() {
      return {}
    },
    methods: {
      initFn() {
        let isFirstOpen = this.$storage.get('isFirstOpen')
        //如果不是第一次进入
        if (isFirstOpen) {
          uni.reLaunch({
            url: '/pages/AdPage/AdPage',
          })
        } else {
          this.$storage.set('isFirstOpen', true)
        }
      },
      goHome() {
        uni.reLaunch({
          url: '/pages/AdPage/AdPage',
        })
      },
    },
    onLoad() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .ad-swiper {
    width: 750rpx;
    height: 100vh;
  }
  .swiper-item {
    width: 100%;
    height: 100%;
    background-color: #f1a532;
  }
  .swiper-two {
    width: 100%;
    height: 100%;
    background-color: #f00;
  }
</style>
