<template>
  <view class="details">
    <view class="details-title">账期应付款明细</view>
    <view class="details-total">
      <view>
        <text class="fz-b">本次订单账期总额：</text>
        <text class="color-red fz-b">3306</text>
        <text class="color-red fz-24">.00元</text>
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-32">
        <view>商品总额</view>
        <view>预计还款金额</view>
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-16">
        <view>2022-07-16</view>
        <view><text class="fz-b">2006</text><text class="fz-24">.00元</text></view>
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-16">
        <view>2022-07-25</view>
        <view><text class="fz-b">1106</text><text class="fz-24">.00元</text></view>
      </view>
    </view>
    <view class="details-bottom p-b-safe-area">
      <EraButton circle />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PaymentDetails',
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .details {
    &-title {
      text-align: center;
      margin-top: 40rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-total {
      margin: 32rpx 32rpx 24rpx 32rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
