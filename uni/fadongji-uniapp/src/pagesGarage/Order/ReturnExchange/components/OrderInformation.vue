<template>
  <view class="order">
    <view class="flex">
      <view>订单号：{{ orderId }}</view>
      <view class="order-copy" @click="copyClick(orderId)">复制</view>
    </view>
    <view class="m-t-8">下单时间：{{ orderTime }}</view>
  </view>
</template>

<script>
  export default {
    name: 'OrderInformation',
    props: {
      orderId: {
        type: String,
        default: '',
      },
      orderTime: {
        type: String,
        default: '',
      },
    },
    methods: {
      copyClick(orderId) {
        uni.setClipboardData({
          data: orderId,
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    background: #ffffff;
    padding: 24rpx 32rpx;
    margin-top: 16rpx;
    font-size: 28rpx;
    color: $v-c0-85;
    line-height: 42rpx;
    &-copy {
      color: $v-tip;
      margin-left: 8rpx;
    }
  }
</style>
