<template>
  <view class="service">
    <view class="service-title p-b-24 fz-32 fz-b"> 服务信息 </view>
    <view class="service_msg">
      <view class="service_msg-product p-b-24 p-t-24">
        <view v-if="info.supportType === 33" class="fz-24 color-white product-green">回收</view>
        <view v-else-if="info.supportType === 32" class="fz-24 color-white product-red">安装</view>
        <view v-else-if="info.supportType === 31" class="fz-24 color-white product-yellow"
          >售后</view
        >
        <view class="fz-28 fz-b p-l-16">{{ info.supportName || info.modelName }}</view>
      </view>
      <view class="service_msg-price fz-28 m-b-16">
        <text>服务金额：</text>
        <text
          ><text class="fz-b">{{ info.supportAmount || '0' }}</text
          >元</text
        >
      </view>
      <view class="service_msg-time fz-28 m-b-16">
        <text>上门时间：</text>
        <text v-if="info.homeStartTime && info.homeEndTime">{{
          info.homeStartTime.split(' ')[0] +
          ' ' +
          info.homeStartTime.split(' ')[1] +
          '-' +
          info.homeEndTime.split(' ')[1]
        }}</text>
      </view>
      <!-- <view v-if="info.modelName" class="service_msg-guide fz-28 m-b-16">
        <text>发动机型号：</text>
        <view>{{ info.modelName }}</view>
      </view> -->
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceMessage',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .service {
    padding: 24rpx 32rpx;
  }
  .service-title {
    border-bottom: 2rpx solid $v-bg-light;
  }

  .service_msg {
    &-product {
      display: flex;
      align-items: center;

      > :nth-child(1) {
        width: 80rpx;
        height: 36rpx;
        text-align: center;
        line-height: 36rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
      }
      .product-green {
        background: linear-gradient(96.72deg, #00b259 -13.61%, #29d446 104.67%);
      }
      .product-red {
        background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
      }
      .product-yellow {
        background: linear-gradient(96.72deg, #ff9b05 -13.61%, #ffbe0d 104.67%);
      }
    }

    &-price {
      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      > :nth-child(2) {
        color: rgba(238, 10, 36, 1);
      }
    }

    &-guide {
      display: flex;

      > :nth-child(1) {
        flex-shrink: 0;
      }
    }
  }
</style>
