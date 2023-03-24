<template>
  <view class="manual flex flex-column">
    <VoNav is-fixed is-have-more title="招商手册" />
    <view class="manual-padding p-b-safe-area flex1">
      <!-- 轮播图 -->
      <swiper
        :autoplay="autoplay"
        :duration="duration"
        :indicator-dots="indicatorDots"
        :interval="interval"
        circular
        class="swiper"
        indicator-active-color="#F87020"
        indicator-color="rgba(0, 0, 0, 0.15)"
      >
        <swiper-item v-for="(item, index) in list" :key="index">
          <image :src="item" class="swiper-img" />
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvestmentManual',
    data() {
      return {
        current: 0,
        list: [
          '/static/banner/channel_banner1.png',
          '/static/banner/channel_banner2.png',
          '/static/banner/channel_banner3.png',
          '/static/banner/channel_banner4.png',
          '/static/banner/channel_banner5.png',
        ],
        indicatorDots: true, // 是否显示面板指示点
        autoplay: true, // 是否自动切换
        interval: 2000, // 自动切换时间间隔
        duration: 500, // 滑动动画时长
      }
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .manual {
    width: 750rpx;
    height: 100vh;
  }
  .swiper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  .wrapper v:deep .uni-swiper .uni-swiper-dot {
    width: 10rpx;
    height: 10rpx;
  }
</style>
