<template>
  <view>
    <view v-for="item of accountOrder" :key="item.id" class="account">
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="lh42 fz-b fz-28 color-block">订单编号：{{ item.id }}</view>
        <view class="flex flex-vertical-c">
<!--          <view v-if="item.repay" class="account-label">{{ item.repay }}</view>-->
<!--          <view v-if="item.partOverdue" class="account-label">{{ item.partOverdue }}</view>-->
<!--          <view v-if="item.overdue" class="account-label">{{ item.overdue }}</view>-->
<!--          <view v-if="item.unpaid" class="account-label">{{ item.unpaid }}</view>-->
          <view class="account-label" v-if="item.repayment === 1">未还款</view>
          <view class="account-label" v-else-if="item.repayment === 3">部分还款</view>
          <view class="account-label" v-else-if="item.repayment === 4">部分逾期</view>
          <view class="account-label" v-else-if="item.repayment === 5">已逾期</view>
        </view>
      </view>
      <view class="flex flex-vertical-c m-t-16">
        <view class="fz-24">订单金额：</view>
        <VoPointPrice
          :leftSize="16"
          :showUnit="true"
          class="pay-size"
          color="#FF5319"
          :price="item.orderAmount"
        ></VoPointPrice>
      </view>
      <view class="account-grey">含{{ item.goodsTypeCount }}个商品，共{{ item.goodsCount }}件</view>
      <view class="account-grey">还款时间：{{ item.expireTime }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AccountOrder',
    props: {
      accountOrder: {
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
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    &-label {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #ec404d;
      padding: 0 16rpx;
      background: #feecee;
      border-radius: 24rpx;
      margin-left: 8rpx;
    }
    &-money {
      line-height: 48rpx;
      font-size: 24rpx;
    }
    &-grey {
      font-size: 24rpx;
      color: $v-c0-65;
      margin-top: 16rpx;
    }
  }
</style>
