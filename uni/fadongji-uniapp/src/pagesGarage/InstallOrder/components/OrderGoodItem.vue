<template>
  <view class="good flex">
    <image :src="goodData.pic[0]" class="good-img" @click="lookPreviewImage(goodData.pic[0])" />
    <view class="flex1">
      <view class="good-title">
        <text v-show="goodData.categoryType" class="good-tips m-r-8">{{goodData.categoryType}}</text>
        {{ goodData.goodsName }} </view>
      <view class="good-bottom flex flex-justify-between">
        <view class="good-bottom__left flex flex-vertical-c">
          <view class="tips">{{
            goodData.periodDays > 0 ? `${goodData.periodDays}天账期` : '现金价'
          }}</view>
          <view
            class="price flex flex-vertical-c"
            v-if="goodData.originalPrice || goodData.originalPrice === 0"
          >
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
    name: 'OrderGoodItem',
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
    },
    methods: {
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
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
