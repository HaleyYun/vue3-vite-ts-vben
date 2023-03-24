<template>
  <view class="order">
    <view class="flex flex-justify-between">
      <view class="color-block">订单号：</view>
      <view class="flex flex-vertical-c">
        <view class="color-block-65">{{ orderId }}</view>
        <view class="order-copy m-l-16" @click="copyClick">复制</view>
      </view>
    </view>
    <view class="m-t-8 flex flex-justify-between">
      <view class="color-block">下单时间：</view>
      <view class="color-block-65">{{ orderTime }}</view>
    </view>
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
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderId,
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
