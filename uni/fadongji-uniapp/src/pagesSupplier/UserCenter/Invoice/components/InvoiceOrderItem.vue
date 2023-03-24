<template>
  <view class="orderItem">
    <view class="orderItem-top flex flex-justify-between flex-vertical-c">
      <view>下单时间：{{ orderData.createTime }}</view>
      <view class="orderItem-top__status color-block-45">{{ orderData.statusName }}</view>
    </view>
    <view class="orderItem-line" />
    <view class="orderItem-store">{{ orderData.shopName }}</view>
    <view v-for="(item, index) in orderData.goodsList" :key="index" class="flex m-t-20">
      <image :src="item.pic[0] + '&type=2'" class="orderItem-img" />
      <view class="flex1 flex flex-justify-around flex-column">
        <view class="orderItem-title overTwoEllipsis">
          <text v-show="item.categoryType" class="good-tips m-r-8">{{ item.categoryType }}</text>
          {{ item.goodsName }}
        </view>
        <view class="orderItem-bottom flex flex-justify-between">
          <view class="orderItem-bottom__left flex flex-vertical-c">
            <view class="tips">{{
              item.periodDays > 0 ? `${item.periodDays}天账期` : '现金价'
            }}</view>
            <view class="price flex flex-vertical-c">
              <VoPointPrice :price="item.payPrice" />
              <view>元</view>
            </view>
          </view>
          <view class="orderItem-bottom__num">x{{ item.goodsCount }}</view>
        </view>
      </view>
    </view>

    <view class="orderItem-price flex flex-justify-between">
      <view class="orderItem-price__left">{{ orderData.goodsCount }}件商品</view>
      <view class="flex">
        <view class="orderItem-price__title">实付款</view>
        <view class="price flex flex-vertical-c">
          <VoPointPrice :price="orderData.payAmount" />
          <view>元</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvoiceOrderItem',
    props: {
      orderData: {
        type: Object,
        orderData: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .orderItem {
    padding: 0rpx 32rpx;
    background-color: #ffffff;

    &-top {
      font-size: 28rpx;
      color: $v-c0-85;
      height: 90rpx;
      line-height: 90rpx;
      //&__status {
      //  color: $color-primary-red;
      //}
    }
    &-store {
      font-size: 28rpx;
      //color: $color-primary-yellow;
      margin-top: 18rpx;
      //padding-bottom: 20rpx;
    }
    &-img {
      width: 128rpx;
      height: 128rpx;
      padding-top: 3rpx;
      margin-right: 16rpx;
      border-radius: 8rpx;
    }
    &-title {
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      line-height: 150%;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      /* 这里是超出几行省略 */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    &-bottom {
      &__left {
        margin-top: 16rpx;
        height: 42rpx;
        .tips {
          padding: 0 4rpx;
          height: 28rpx;
          line-height: 28rpx;
          text-align: center;
          background: #fdf2f3;
          border: 2rpx solid #ec404d;
          border-radius: 4rpx;
          font-size: 24rpx;
          color: #ec404d;
        }
        .price {
          font-size: 28rpx;
          color: $color-primary-red;
          margin-left: 8rpx;
        }
      }
      &__num {
        margin-top: 8rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-45;
      }
    }

    &-price {
      margin-top: 24rpx;
      padding-bottom: 34rpx;

      &__left {
        color: $v-c0-45;
        font-size: 26rpx;
      }
      &__title {
        color: $v-c0-45;
        font-size: 28rpx;
        margin-right: 8rpx;
      }
      .price {
        font-size: 24rpx;
        color: $color-primary-red;
      }
    }
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
