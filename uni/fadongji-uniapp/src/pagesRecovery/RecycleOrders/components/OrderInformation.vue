<template>
  <view class="order">
    <view class="order-title p-b-24 fz-32 fz-b">订单信息</view>
    <view class="m-t-24">
      <view class="order-info flex flex-vertical-c flex-justify-between">
        <view class="w252 color-block">订单编号：</view>
        <view class="flex1 text-right">
          <text class="color-block-45">{{ info.id }}</text>
          <text class="order-info__blue" @click="copyThis(info.id)">复制</text>
        </view>
      </view>
      <view
        v-if="info.placeOrderTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">下单时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.placeOrderTime }}</view>
      </view>
      <view
        v-if="info.taskOrderTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">接单时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.taskOrderTime }}</view>
      </view>
      <view
        v-if="info.reachStoreTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">到店时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.reachStoreTime }}</view>
      </view>
      <view
        v-if="info.recycleCompletedTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">查验完成时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.recycleCompletedTime }}</view>
      </view>
      <view
        v-if="info.deliveryTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">发货时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.deliveryTime }}</view>
      </view>
      <view
        v-if="info.receivingTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">收货时间：</view>
        <view class="flex1 text-right color-block-45">{{ info.receivingTime }}</view>
      </view>
    </view>
    <view
      v-if="info.cancelTime"
      class="order-info flex flex-vertical-c flex-justify-between m-t-16"
    >
      <view class="w252 color-block">取消时间：</view>
      <view class="flex1 text-right color-block-45">{{ info.cancelTime }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderInformation',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      /**
       * 复制
       */
      copyThis(val) {
        uni.setClipboardData({
          data: val,
          success: () => {
            uni.$u.toast('复制成功')
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    padding: 24rpx 32rpx;
    &-title {
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      font-size: 28rpx;
      line-height: 42rpx;
      &__blue {
        color: #0d66ff;
        margin-left: 24rpx;
      }
    }
  }
</style>
