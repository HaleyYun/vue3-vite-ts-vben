<template>
  <view class="order">
    <view v-for="(info, index) in OrderInfo" :key="index" class="order-list">
      <view class="order-list__left">
        <view class="left-order">{{ info.order }}</view>
        <view class="left-time">下单时间：{{ info.time }}</view>
      </view>
      <view class="order-list__right">
        <view class="right-money">{{ info.amount }}</view>
        <VoPointPrice :price="info.price" :showUnit="true" color="#FF5319"></VoPointPrice>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderInformation',
    props: {
      OrderInfo: {
        type: Array,
        default: [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    overflow-x: hidden;
    background: #fff;
    &-list {
      display: flex;
      justify-content: space-between;
      padding: 22rpx 0;
      margin: 0 32rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
      &__left {
        width: 510rpx;
        .left-order {
          line-height: 42rpx;
          font-weight: bold;
          font-size: 28rpx;
          color: $v-c0-85;
        }
        .left-time {
          margin-top: 14rpx;
          line-height: 36rpx;
          font-size: 24rpx;
          color: $v-c0-45;
        }
      }
      &__right {
        text-align: right;
        .right-money {
          line-height: 42rpx;
          font-weight: bold;
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }
    }
  }
</style>
