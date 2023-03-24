<template>
  <view class="good flex">
    <image
      v-if="goodData.pic[0].split('.').pop() === 'mp4'"
      :src="goodData.pic[0] + '&type=3'"
      class="good-img"
    />
    <image v-else :src="goodData.pic[0] + '&type=1'" class="good-img" />
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
              <view class="payment-time"> {{ goodData.periodDays }}</view>
            </view>
          </view>
          <view class="priceTitle">最终售价(元)</view>
        </view>
        <view class="number"> x{{ goodData.goodsCount }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderGoodItem',
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good {
    &-img {
      width: 160rpx;
      height: 160rpx;
      margin-right: 16rpx;
      border-radius: 8rpx;
      background-color: #00aff4;
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
        font-size: 28rpx;
        font-weight: bold;
        color: $color-primary-red;

        &-point {
          font-size: 24rpx;
        }
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
