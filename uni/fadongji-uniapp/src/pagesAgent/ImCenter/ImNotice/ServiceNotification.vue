<template>
  <div class="wrap">
    <!--  头部  -->
    <view class="wrap-navigation flex flex-justify-between">
      <view class="wrap-navigation__left flex flex-vertical-c">
        <image class="left-return" src="/static/icons/left.png" @click="returnFn" />
        <view class="left-msg flex">服务通知</view>
      </view>
      <view class="flex wrap-navigation__right flex-vertical-t" @click="goSetUp">设置</view>
    </view>

    <view class="m-t-20" v-for="(info, index) of list" :key="index">
      <ChatTime time="2022-03-20 16:20:30" />
      <view class="wrap-card">
        <view class="wrap-card__tip">{{ info.tip }}</view>
        <view class="wrap-card__view">{{ info.view }}</view>
      </view>
    </view>
  </div>
</template>

<script>
  import ChatTime from '../Components/ChatTime/ChatTime'
  export default {
    name: 'Transaction',
    components: { ChatTime },
    data() {
      return {
        list: [
          {
            tip: '积分变动通知',
            view: '您本次消费消耗了2000积分，点击查看',
          },
          {
            tip: 'XXXX修理厂提交了认证资料，请尽快审核。',
            view: '点击查看>',
          },
          {
            tip: '恭喜您，认证通过，欢迎入驻发动集平台，开启您的赚钱之旅。',
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
        font-size: 28rpx;
        color: #333;
      }
      &__view {
        font-size: 28rpx;
        color: #999;
        margin-top: 20rpx;
      }
    }
  }
</style>
