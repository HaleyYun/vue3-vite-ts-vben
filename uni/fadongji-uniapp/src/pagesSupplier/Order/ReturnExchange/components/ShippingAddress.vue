<template>
  <view class="block">
    <view class="block-title">退还商品收货地址</view>
    <view class="block-info">
      <view class="flex flex-justify-between m-t-8">
        <view class="block-info__left">收货点：</view>
        <view class="block-info__right flex1 color-block-65">{{ addressList.point }}</view>
      </view>
      <view class="flex flex-justify-between m-t-8">
        <view class="block-info__left">收货人姓名：</view>
        <view class="block-info__right flex1 color-block-65">{{ addressList.name }}</view>
      </view>
      <view class="flex flex-justify-between m-t-8">
        <view class="block-info__left">收货地址：</view>
        <view class="block-info__right flex1 color-block-65">{{ addressList.address }}</view>
      </view>
      <view class="flex flex-justify-between m-t-8">
        <view class="block-info__left">联系电话：</view>
        <view class="block-info__right flex1 color-block-65">{{ addressList.phone }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ShippingAddress',
    props: {
      /**
       * point 收货点
       * name 收货人姓名
       * address 收货地址
       * phone 联系电话
       */
      addressList: {
        type: Object,
        default: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 16rpx;
    &-title {
      padding: 24rpx 0;
      margin: 0 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      padding: 0 32rpx 24rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      &__right {
        text-align: right;
      }
    }
  }
</style>
