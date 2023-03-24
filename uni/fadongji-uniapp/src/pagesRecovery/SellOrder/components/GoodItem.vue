<template>
  <view class="good flex" @click="goProDetailFn">
    <view class="flex1">
      <view class="flex">
        <view v-if="isPreSale" class="good-tag">预售</view>
        <view v-if="goodData.level" class="good-tag">{{ goodData.level }}类</view>
        <view class="flex1 good-title">{{ goodData.goodsName }}</view>
      </view>
      <view class="good-bottom flex flex-justify-between">
        <view class="good-bottom__left flex flex-vertical-c">
          <view class="tips">最终售价</view>
          <view class="price flex flex-vertical-c">
            <VoPointPrice :price="goodData.originalPrice.toString()" />
            <view>元</view>
          </view>
        </view>
        <view class="good-bottom__num">x{{ goodData.goodsCount }}</view>
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

      isPro: {
        type: Boolean,
        goodData: true,
      },
      goodData: {
        type: Object,
        goodData: {},
      },
      isPreSale: {
        type: Boolean,
        goodData: false,
      },
    },
    methods: {
      goProDetailFn() {
        if (!this.isPro) return
        this.$linkToEasy(
          `/pagesOldBuyer/HomeJumpPage/GoodsDetails?source=${this.isPreSale}&noBuy=1&id=${this.goodData.goodsId}`)
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
    &-tag {
      padding: 0 20rpx;
      height: 42rpx;
      line-height: 42rpx;
      text-align: center;
      background: $v-tags-btn-disabled;
      border-radius: 8rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: $color-primary-yellow;
      margin-right: 8rpx;
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
