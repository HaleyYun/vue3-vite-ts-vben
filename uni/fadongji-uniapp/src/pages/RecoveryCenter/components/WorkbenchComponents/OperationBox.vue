<template>
  <view class="box">
    <view class="bg-white">
      <view class="box-bottom flex flex-justify-between">
        <view
          class="box-bottom__block"
          @click="$linkToEasy('/pagesRecovery/GoodsRecycle/GoodsRecycle')"
        >
          <view class="block-left fz-b fz-32 color-block">回收商品</view>
          <image class="block-img" src="/static/recovery/huishoushangpin.png" />
        </view>
        <view
          class="box-bottom__block bg-E5EFFF"
          @click="$linkToEasy('/pagesRecovery/RecycleOrders/RecycleOrders')"
        >
          <view class="block-left fz-b fz-32 color-block">回收订单</view>
          <image class="block-img" src="/static/recovery/huishoudingdan.png" />
        </view>
      </view>
      <view class="box-bottom flex flex-justify-between">
        <view
          class="box-bottom__block bg-FFECE5"
          @click="$linkToEasy('/pagesRecovery/SellGood/GoodList/GoodList')"
        >
          <view class="block-left fz-b fz-32 color-block">销售商品</view>
          <image class="block-img" src="/static/recovery/xiaoshoushangpin.png" />
        </view>
        <view
          class="box-bottom__block"
          @click="$linkToEasy('/pagesRecovery/SellOrder/MarketOrder/MarketOrderList')"
        >
          <view class="block-left fz-b fz-32 color-block">销售订单</view>
          <image class="block-img" src="/static/recovery/xiaoshoudingdan.png" />
        </view>
      </view>
      <view class="box-bottom flex flex-justify-between">
        <view
          class="box-bottom__block"
          @click="$linkToEasy('/pagesRecovery/GoodsStore/GoodsStore')"
        >
          <view class="block-left fz-b fz-32 color-block">商品库存</view>
          <image class="block-img" src="/static/recovery/shangpinkucun.png" />
        </view>
        <view
          class="box-bottom__block bg-purple"
          @click="$linkToEasy('/pagesRecovery/PresellActivity/PresellActivityList')"
        >
          <view class="block-left fz-b fz-32 color-block">预售商品</view>
          <image class="block-img" src="/static/recovery/yushouhuodong.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OperationBox',
  }
</script>

<style lang="scss" scoped>
  .box {
    padding-bottom: 32rpx;
    box-sizing: border-box;
    .bg-white {
      border-radius: 16rpx;
      overflow: hidden;
    }
    &-top {
      padding: 32rpx;
      box-sizing: border-box;
      &__whole {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
        border-radius: 200rpx;
        color: #ffffff;
        font-size: 28rpx;
      }
      &__single {
        width: 156rpx;
        height: 56rpx;
        line-height: 60rpx;
        text-align: center;
        border: 2rpx solid #ff5c26;
        border-radius: 200rpx;
        color: #ff5c26;
        font-size: 28rpx;
        margin-left: 32rpx;
      }
    }
    &-bottom {
      margin: 0 24rpx;
      padding: 16rpx 0;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
      &__block {
        position: relative;
        width: 310rpx;
        height: 140rpx;
        background: #fef9f1;
        border-radius: 16rpx;
        overflow: hidden;
        .block-left {
          padding-left: 24rpx;
          line-height: 140rpx;
        }
        .block-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 136rpx;
          height: 140rpx;
          z-index: 1;
        }
      }
    }
  }

  .bg-E5EFFF {
    background-color: #e5efff !important;
  }
  .bg-FFECE5 {
    background-color: #ffece5 !important;
  }
  .bg-purple {
    background-color: rgba(193, 138, 251, 0.1);
  }
</style>
