<template>
  <view class="invoiceItem">
    <view class="invoiceItem-content">
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="flex flex-vertical-c">
          <view
            v-if="invoiceyData.ownerType === 2"
            class="invoiceItem-content__type invoiceItem-content__blue fz-24"
            >个人</view
          >
          <view
            v-else-if="invoiceyData.ownerType === 1"
            class="invoiceItem-content__type invoiceItem-content__red fz-24"
            >企业</view
          >
          <view class="fz-28 fz-b invoiceItem-content__name">{{ invoiceyData.buyerName }}</view>
        </view>
        <view class="fz-28 invoiceItem-content__status">
          {{ invoiceyData.invoiceStatus === 1 ? '开票中' : '已开票' }}
        </view>
      </view>
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="invoiceItem-content__item fz-28 p-t-16">
          发票类型：{{ invoiceyData.invoiceKindCode === '1' ? '增值税普通发票' : '增值税专用发票' }}
        </view>
        <view class="invoiceItem-content__price fz-24 flex flex-vertical-c">
          <VoPointPrice :price="invoiceyData.amount" />
          <view>元</view>
        </view>
      </view>
      <view v-if="invoiceyData.openTime" class="invoiceItem-content__item fz-28 p-t-8"
        >开票时间：{{ invoiceyData.invoiceTime }}</view
      >
      <view v-if="invoiceyData.ownerType === 1" class="invoiceItem-content__item fz-28 p-t-8"
        >企业名称：{{ invoiceyData.buyerName }}</view
      >
      <view v-if="invoiceyData.ownerType === 1" class="invoiceItem-content__item fz-28 p-t-8"
        >纳税人识别号：{{ invoiceyData.buyerTaxpayerNum }}</view
      >
    </view>
    <view class="invoiceItem-line" />
    <view class="flex flex-justify-between flex-vertical-c p-l-32 p-r-32 p-t-16">
      <view class="invoiceItem-content__item fz-28">申请时间：{{ invoiceyData.createTime }}</view>
      <view
        v-show="invoiceyData.invoiceStatus === 1"
        class="invoiceItem-content__btn"
        @click.stop="invoiceOpenClick"
        >开票</view
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvoiceItem',
    props: {
      invoiceyData: {
        type: Object,
        invoiceyData: {},
      },
    },
    methods: {
      invoiceOpenClick() {
        this.$emit('openInvoice')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceItem {
    background-color: #ffffff;
    padding: 32rpx 0rpx 16rpx;
    &-content {
      padding: 0rpx 32rpx;
      &__type {
        border-radius: 24rpx;
        padding: 6rpx 16rpx;
        color: #ffffff;
      }
      &__name {
        margin-left: 8rpx;
        color: $v-c0-85;
      }
      &__status {
        color: $v-c0-65;
      }
      &__item {
        color: $v-c0-65;
        width: 500rpx;
      }
      &__price {
        color: $color-primary-red;
      }
      &__blue {
        background-color: $v-blue-tag;
      }
      &__red {
        background-color: $color-primary-red;
      }
      &__btn {
        padding: 10rpx 56rpx;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 30rpx;
        background-color: #ffffff;
        color: $color-primary-yellow;
        font-size: 24rpx;
        text-align: center;
      }
    }
    &-line {
      height: 2rpx;
      background-color: $v-bg-light;
      margin-top: 30rpx;
    }
  }
</style>
