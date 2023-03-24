<template>
  <view class="to">
    <view
      class="to-title flex flex-vertical-c"
      @click="
        $linkToEasy(`/pagesAgent/InvestmentList/ShopDetails?companyId=${toEvaluateList.shopId}`)
      "
    >
      <view>{{ toEvaluateList.shopName }}</view>
      <VoIcon :size="20" name="right-arrow" />
    </view>
    <view class="to-content flex" @click="$linkToEasy(`/pagesGarage/ShopList/GoodsDetail?id=${toEvaluateList.goodsId}&wid=${toEvaluateList.warehouseId}`)">
      <image :src="toEvaluateList.pic[0] + '&type=1'" class="to-content__img" />
      <view class="to-content__info flex1">
        <text v-show="toEvaluateList.categoryType" class="good-tips m-r-8">{{toEvaluateList.categoryType}}</text>
        <text> {{ toEvaluateList.goodsName || '' }} </text>
      </view>
    </view>
    <view class="to-evaluate flex flex-justify-r">
      <view class="to-evaluate__button" @click="confirmEvaluat(toEvaluateList)">立即评价</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ToEvaluate',
    props: {
      toEvaluateList: {
        type: Object,
        default: {},
      },
    },
    methods: {
      confirmEvaluat(data) {
        this.$linkToEasy(
          '/pagesGarage/MyEvaluation/SendEvaluation?data=' +
            JSON.stringify(data) +
            '&evaluateType=' +
            1,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .to {
    width: 750rpx;
    background: #fff;
    padding: 0 32rpx 32rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    &-title {
      padding: 26rpx 0 16rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-content {
      margin-top: 16rpx;
      &__img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 24rpx;
      }
      &__info {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-evaluate {
      margin-top: 32rpx;
      &__button {
        height: 36rpx;
        line-height: 36rpx;
        padding: 10rpx 32rpx;
        color: #fff;
        font-size: 24rpx;
        background: $color-primary-yellow;
        border-radius: 30rpx;
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
