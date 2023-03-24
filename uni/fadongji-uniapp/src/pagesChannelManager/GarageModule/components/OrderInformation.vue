<template>
  <view>
    <view v-for="(info, index) in orderInfo" :key="index" class="order">
      <view class="order-list">
        <view class="order-list__left">
          <view class="left-order">订单号-{{ info.id }}</view>
          <view class="left-time">下单时间：{{ info.createTime }}</view>
        </view>
        <view class="order-list__right">
          <view class="right-money">订单金额</view>
          <VoPointPrice :price="info.goodsAmount" :showUnit="true" color="#FF5319" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderInformation',
    props: {
      orderInfo: {
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
