<template>
  <view class="block">
    <view class="block-title">售后信息</view>
    <view class="block-info">
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>服务单号：</view>
        <view class="flex flex-vertical-c">
          <view class="color-block-65">{{ afterSalesList.serviceNum }}</view>
          <view class="list-copy m-l-8" @click="copyClick(afterSalesList.serviceNum)">复制</view>
        </view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view class="flex flex-vertical-c">
          <view>申请人：</view>
          <view class="list-buyers">买家</view>
        </view>
        <view class="color-block-65">{{ afterSalesList.applicant }}</view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>申请时间：</view>
        <view class="color-block-65">{{ afterSalesList.applyTime }}</view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>售后类型：</view>
        <view class="color-block-65">{{ afterSalesList.afterType }}</view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>商品数量：</view>
        <view class="color-block-65">{{ afterSalesList.productNum }}</view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>是否收到货：</view>
        <view class="color-block-65">{{ afterSalesList.whetherReceiptGoods ? '是' : '否' }}</view>
      </view>
      <view class="block-info__list flex flex-vertical-c flex-justify-between">
        <view>预计退款：</view>
        <view class="color-block-65">{{ afterSalesList.refund }}元</view>
      </view>
      <view class="block-info__list flex">
        <view>退换货原因：</view>
        <view class="color-block-65 flex1 text-right">{{ afterSalesList.reason }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AfterSalesInformation',
    props: {
      /**
       * serviceNum 服务单号
       * applicant 申请人
       * applyTime 申请时间
       * afterType 售后类型
       * productNum 产品数量
       * refund 预计退款
       * reason 申请退换货原因
       */
      afterSalesList: {
        type: Object,
        default: {},
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
      box-sizing: border-box;
      &__list {
        margin-top: 16rpx;
        font-size: 28rpx;
        line-height: 42rpx;
        .list-copy {
          color: $v-tip;
        }
        .list-buyers {
          font-size: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          padding: 0 24rpx;
          border: 2rpx solid $color-primary-red;
          border-radius: 8rpx;
          color: $color-primary-red;
        }
      }
    }
  }
</style>
