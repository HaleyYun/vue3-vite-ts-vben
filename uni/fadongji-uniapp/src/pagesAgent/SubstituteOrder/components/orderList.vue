<template>
  <view class="orderList">
    <view class="orderList-title">
      {{ order.storeName }}
    </view>
    <view class="orderList-content">
      <view>
        <span class="mgr-5">{{ order.realName }}</span>
        <span>{{ order.userName }}</span>
      </view>
      <view
        >{{ order.provinceName }}-{{ order.cityName }}-{{ order.areaName }}{{ order.address }}</view
      >
    </view>
    <view class="orderList-button">
      <view @click="goShop(order.id, order.areaCode, order.storeName)">{{
        type == 1 ? '代客下单' : '选择'
      }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SubstituteOrder',
    props: {
      // 1代客下单列表 2商品列表
      type: {
        default: 1,
        type: Number || String,
      },
      order: {
        default() {
          return {}
        },
        type: Object,
      },
    },
    data() {
      return {}
    },
    methods: {
      goShop(id, salesArea, storeName) {
        this.$storage.set('garageArea', salesArea)
        this.$linkToEasy(
          '/pagesAgent/GoodsList/GoodsList?companyId=' +
            id +
            '&salesArea=' +
            salesArea +
            '&userName=' +
            storeName,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .orderList {
    background: #fff;
    padding: 24rpx 31rpx;
    margin-top: 16rpx;
    .mgr-5 {
      margin-right: 10rpx;
    }

    &-title {
      font-size: 31rpx;
      font-weight: 500;
      padding-bottom: 24rpx;
    }
    &-content {
      font-size: 28rpx;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.65);
      padding-bottom: 20rpx;
    }
    &-button {
      text-align: right;
      view {
        display: inline-block;
        font-size: 28rpx;
        color: $color-primary-yellow;
        padding: 12rpx 40rpx;
        border: 2rpx solid $color-primary-yellow;
        background: #fff;
        border-radius: 100rpx;
      }
    }
  }
</style>
