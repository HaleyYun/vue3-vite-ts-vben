<template>
  <view class="good flex">
    <image v-if="goodData.pic" :src="goodData.pic[0]" class="good-img" />
    <view class="flex1">
      <view class="good-title"> {{ goodData.goodsName }} </view>
      <view class="flex flex-vertical-c good-price">
        <view class="flex1">
          <view class="flex">
            <view class="price flex flex-vertical-c">
              <VoPointPrice :price="goodData.originalPrice.toString()" />
              <view>元</view>
            </view>
            <view v-if="goodData.periodDays > 0" class="payment flex">
              <view class="payment-title">
                <view class="payment-title__text">账期</view>
              </view>
              <view class="payment-time"> {{ goodData.periodDays }}天</view>
            </view>
          </view>
        </view>
        <view class="number">x{{ goodData.goodsCount }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodItem',
    props: {
      /*

    goodUrl     商品url
    goodName    商品名称
    goodPrice   商品价格
    goodType   是否是账期
    goodNum     商品数量
    paymentTime 账期时间
    orderType   订单账期状态 1.非账期 2.账期
     */
      goodData: {
        type: Object,
        goodData: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good {
    padding-bottom: 32rpx;
    &-img {
      width: 160rpx;
      height: 160rpx;
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
    &-price {
      margin-top: 8rpx;

      .number {
        font-size: 24rpx;
        font-weight: bold;
        color: $v-c0-45;
        text-align: right;
      }

      .price {
        font-size: 24rpx;
        color: $color-primary-red;
      }

      .payment {
        margin-left: 26rpx;
        background-color: #f8e7e7;
        border: 0.5px solid $color-primary-red;
        border-radius: 4rpx;
        height: 28rpx;
        line-height: 28rpx;
        font-size: 20rpx;

        &-title {
          background-color: $color-primary-red;
          width: 53rpx;
          text-align: center;
          border-radius: 4rpx;
          color: #ffffff;

          &__text {
            font-size: 20rpx;
            transform: scale(0.8);
          }
        }

        &-time {
          font-size: 20rpx;
          transform: scale(0.8);
          color: $color-primary-red;
        }
      }
      .priceTitle {
        margin-top: 8rpx;
        font-size: 20rpx;
        color: $v-c0-45;
      }
    }
  }
</style>
