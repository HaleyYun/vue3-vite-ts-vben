<template>
  <div class="wrap">
    <!--  头部  -->
    <view class="wrap-navigation flex flex-justify-between">
      <view class="wrap-navigation__left flex flex-vertical-c">
        <image class="left-return" src="/static/icons/left.png" @click="returnFn" />
        <view class="left-msg flex">交易物流</view>
      </view>
      <view class="flex wrap-navigation__right flex-vertical-t" @click="goSetUp">设置</view>
    </view>
    <!--  交易物流  -->
    <view class="wrap-card" v-for="(info, index) of card" :key="index">
      <view class="flex flex-justify-between flex-vertical-c m-b-20">
        <view class="wrap-card__tip">{{ info.tip }}</view>
        <view class="wrap-card__time">{{ info.time }}</view>
      </view>
      <view class="flex flex-vertical-c">
        <image class="wrap-card__image" src="/static/logo-1.png" />
        <view class="wrap-card__remind flex1">{{ info.remind }}</view>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    name: 'Transaction',
    data() {
      return {
        card: [
          {
            tip: '您的订单开始配送',
            time: '11：30',
            remind: '您的订单【奥迪A6L原厂发动机】已经开始配送，请注意查收。',
          },
          {
            tip: '您的订单开始配送',
            time: '11：30',
            remind: '您的订单【奥迪A6L原厂发动机】已经开始配送，请注意查收。',
          },
          {
            tip: '您的订单开始配送',
            time: '11：30',
            remind: '您的订单【奥迪A6L原厂发动机】已经开始配送，请注意查收。',
          },
        ],
      }
    },
    methods: {
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      // 去设置页
      goSetUp() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImNotice/SetUp')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__left {
        .left-return {
          width: 50rpx;
          height: 50rpx;
          margin: 0 20rpx;
        }
        .left-msg {
          font-size: 34rpx;
          margin: 0 16rpx;
        }
      }
      &__right {
        margin-right: 20rpx;
        font-size: 32rpx;
        text-align: end;
        padding-bottom: 16rpx;
      }
    }
    &-card {
      padding: 20rpx;
      margin: 30rpx 26rpx;
      background: #fff;
      border-radius: 20rpx;
      &__tip {
        font-size: 34rpx;
        color: #333;
      }
      &__time {
        font-size: 26rpx;
        color: #999;
      }
      &__image {
        width: 120rpx;
        height: 150rpx;
        margin-right: 20rpx;
      }
      &__remind {
        font-size: 26rpx;
        color: #999;
      }
    }
  }
</style>
