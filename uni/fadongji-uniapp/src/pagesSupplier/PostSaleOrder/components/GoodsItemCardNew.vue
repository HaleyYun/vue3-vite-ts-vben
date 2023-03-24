<template>
  <view class="good flex">
    <image  v-if="goodsDetail.pic[0].indexOf('mp4')==-1||goodsDetail.pic[0].indexOf('MP4')==-1" :src="goodsDetail.pic[0]+'&type=3'" class="good-img" />
    <image  v-else :src="goodsDetail.pic[0]+'&type=1'" class="good-img" />


    <view class="flex1">
      <view class="good-title">
        <text v-show="goodsDetail.categoryType" class="good-tips m-r-8">{{goodsDetail.categoryType}}</text>
        <text> {{ goodsDetail.goodsName }}</text>
      </view>
      <view class="good-bottom flex flex-justify-between">
        <view class="good-bottom__left flex flex-vertical-c">
          <view class="tips">{{
              goodsDetail.periodDays > 0 ? `${goodsDetail.periodDays}天账期` : '现金价'
            }}</view>
          <view class="price flex flex-vertical-c">
            <VoPointPrice :price="goodsDetail.originalPrice.toString()" />
            <view>元</view>
          </view>
        </view>
        <view class="good-bottom__num">x{{ goodsDetail.goodsCount }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsItemCard',
    props: {
      goodsDetail: {
        type: Object,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .good {
    padding-top: 24rpx;
    &-img {
      width: 128rpx;
      height: 128rpx;
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
