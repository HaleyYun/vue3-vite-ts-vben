<template>
  <view class="account">
    <view v-for="(item, index) in accountInfo" :key="index" class="account-list">
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="account-list__order">订单号-{{ item.id }}</view>
        <!--        <view v-if="item.type" class="account-list__label">{{ item.type }}</view>-->
        <view v-if="item.repayment === 1" class="account-label">未还款</view>
        <view v-else-if="item.repayment === 3" class="account-label">部分还款</view>
        <view v-else-if="item.repayment === 4" class="account-label">部分逾期</view>
        <view v-else-if="item.repayment === 5" class="account-label">已逾期</view>
      </view>
      <view class="flex flex-vertical-c h48 m-t-16">
        <view class="fz-24">订单金额：</view>
        <VoPointPrice
          :leftSize="16"
          :price="item.orderAmount"
          :showUnit="true"
          class="lh48"
          color="#F20014"
        ></VoPointPrice>
        <view class="fz-24 m-l-20">已收：</view>
        <VoPointPrice
          :leftSize="16"
          :price="item.receivedAmount"
          :showUnit="true"
          class="lh48"
          color="#F20014"
        ></VoPointPrice>
      </view>
      <view class="m-t-16 lh36 fz-24 color-block-45">还款日：{{ item.expireTime }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AccountInformation',
    props: {
      accountInfo: {
        type: Array,
        default: [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .account {
    width: 750rpx;
    background: #fff;
    margin-top: 16rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    &-list {
      padding: 24rpx 0;
      border-bottom: 2rpx solid $v-bg-light;
      &__order {
        width: 510rpx;
        overflow: hidden;
        height: 42rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
      &__label {
        padding: 0 16rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: #ff5319;
        background: #feecee;
        border-radius: 24rpx;
      }
    }
    &-label {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #f20014;
      padding: 0 16rpx;
      background: #ffe5e8;
      border-radius: 24rpx;
      margin-left: 8rpx;
    }
  }
</style>
