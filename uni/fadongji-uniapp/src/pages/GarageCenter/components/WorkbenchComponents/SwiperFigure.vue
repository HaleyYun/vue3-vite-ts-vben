<template>
  <view class="swiper">
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
      <swiper-item v-for="(item, index) in list" :key="index" class="swiper-item">
        <image :src="item.url" class="swiper-img" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    name: 'SwiperFigure',
    data() {
      return {
        current: 0,
        list: [
          // '/static/supplier/home/banner.png',
          // '/static/supplier/home/banner.png',
          // '/static/supplier/home/banner.png',
        ],
        indicatorDots: true, // 是否显示面板指示点
        autoplay: true, // 是否自动切换
        interval: 2000, // 自动切换时间间隔
        duration: 500, // 滑动动画时长
      }
    },
    created() {
      this.getSwiperData()
    },
    methods: {
      getSwiperData() {
        this.$VoHttp
          .apiContentSwiperList({ location: 'homeBanner', platformCode: 'garage' })
          .then((res) => {
            if (res.data) {
              this.list = res.data
            }
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .swiper {
    padding-bottom: 32rpx;
    width: 686rpx;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
    &-item {
      border-radius: 16rpx;
      overflow: hidden;
    }
    &-img {
      width: 686rpx;
      height: 200rpx;
    }
  }
  .wrapper v:deep .uni-swiper .uni-swiper-dot {
    width: 10rpx;
    height: 10rpx;
  }
</style>
