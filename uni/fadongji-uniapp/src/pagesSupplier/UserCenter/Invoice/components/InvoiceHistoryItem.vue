<template>
  <view class="invoiceItem">
    <view class="invoiceItem-line" />
    <view class="invoiceItem-content">
      <view class="invoiceItem-content__top flex flex-justify-between">
        <view class="flex1 flex">
          <view v-if="invoiceItem.billType === 0">[商品交易费]</view>
          <view v-else-if="invoiceItem.billType === 1">[平台服务费]</view>
          <view>{{ invoiceItem.buyerName }}</view>
        </view>
        <view class="price flex flex-vertical-c">
          <VoPointPrice :price="invoiceItem.amount" />
          <view>元</view>
        </view>
      </view>
      <view class="invoiceItem-content__bottom flex flex-justify-between">
        <view class="flex1">开票时间：{{ invoiceItem.createTime }} </view>
        <view class="flex flex-vertical-c">
          <view v-if="invoiceItem.invoiceStatus === 1">开票中</view>
          <view v-else-if="invoiceItem.invoiceStatus === 2">已开票</view>
          <VoIcon class="arrow" name="right-arrow" color="#000000" :size="16"></VoIcon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvoiceHistoryItem',
    props: {
      invoiceItem: {
        type: Object,
        invoiceItem: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceItem {
    background-color: #ffffff;
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
    }
    &-content {
      padding: 32rpx;
      &__top {
        color: $v-c0-85;
        font-size: 28rpx;
        font-weight: bold;
        .price {
          color: $color-primary-red;
        }
      }
      &__bottom {
        margin-top: 20rpx;
        color: $v-c0-65;
        font-size: 28rpx;
        .arrow {
          padding-left: 4rpx;
        }
      }
    }
  }
</style>
