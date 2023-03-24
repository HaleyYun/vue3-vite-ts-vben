<template>
  <view class="order" v-if="info.timeObj">
    <view class="order-title p-b-24 fz-32 fz-b">订单信息</view>
    <view class="m-t-24">
      <view class="order-info flex flex-vertical-c flex-justify-between">
        <view class="w252 color-block">订单编号：</view>
        <view class="flex1 text-right">
          <text class="color-block-45">{{ info.id }}</text>
          <text class="order-info__blue" @click="copyThis">复制</text>
        </view>
      </view>
      <view
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
        v-if="info.timeObj['下单时间']"
      >
        <view class="w252 color-block">下单时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['下单时间'].createTime || '' }}
        </view>
      </view>
      <view
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
        v-if="info.timeObj['接单时间']"
      >
        <view class="w252 color-block">接单时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['接单时间'].createTime || '' }}
        </view>
      </view>
      <view
        v-if="(infoState === 0 || infoState === 1) && info.timeObj['安装时间']"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">到店时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['安装时间'].createTime || '' }}
        </view>
      </view>
      <view
        v-if="infoState === 1 && info.timeObj['完成时间']"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">确认完成时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['完成时间'].createTime || '' }}
        </view>
      </view>
      <view
        v-if="infoState === 2 && info.timeObj['关闭时间']"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">关闭时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['关闭时间'].createTime || '' }}
        </view>
      </view>
      <view
        v-if="(infoState === 3 || infoState === 1) && info.timeObj['取消时间']"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">取消时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['取消时间'].createTime || '' }}
        </view>
      </view>
      <view v-if="infoState === 4 || infoState === 5">
        <view
          class="order-info flex flex-vertical-c flex-justify-between m-t-16"
          v-if="info.homeStartTime"
        >
          <view class="w252 color-block">上门时间：</view>
          <view class="flex1 text-right color-block-45">
            {{ info.homeStartTime || '' }}
          </view>
        </view>
        <view
          class="order-info flex flex-vertical-c flex-justify-between m-t-16"
          v-if="info.homeEndTime"
        >
          <view class="w252 color-block">上门结束时间：</view>
          <view class="flex1 text-right color-block-45">
            {{ info.homeEndTime || '' }}
          </view>
        </view>
      </view>
      <view
        v-if="infoState === 5 && info.timeObj['完成时间'].createTime"
        class="order-info flex flex-vertical-c flex-justify-between m-t-16"
      >
        <view class="w252 color-block">服务结束时间：</view>
        <view class="flex1 text-right color-block-45">
          {{ info.timeObj['完成时间'].createTime || '' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderInformation',
    props: {
      infoState: {
        type: Number,
        default: 0, // 0：安装中和上门中，1：已完成或已取消状态，2：已关闭，3：已取消，4：待确认，5：已完成
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    methods: {
      /**
       * 复制
       */
      copyThis() {
        uni.setClipboardData({
          data: this.info.id,
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
