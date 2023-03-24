<template>
  <view class="swiper">
    <swiper
      class="swiper"
      circular
      :indicator-dots="indicatorDots"
      indicator-color="rgba(0, 0, 0, 0.15)"
      indicator-active-color="#F87020"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <swiper-item v-for="(item, index) in list" :key="index">
        <image class="swiper-img" :src="$serveDomainFn(item.url)" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import { serveDomainFn } from '@/common/helper'
  export default {
    name: 'SwiperFigure',
    prop: {
      list: {
        type: Array,
        default: () => {},
      },
    },
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
      $serveDomainFn: serveDomainFn,
      getSwiperData() {
        this.$VoHttp
          .apiContentSwiperList({ location: 'homeBanner', platformCode: 'investmentManager' })
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
    border-radius: 16rpx;
    overflow: hidden;
    width: 100%;
    height: 200rpx;
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
