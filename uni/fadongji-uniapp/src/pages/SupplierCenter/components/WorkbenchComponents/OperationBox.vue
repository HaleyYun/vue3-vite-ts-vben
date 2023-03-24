<template>
  <view class="box">
    <view class="bg-white">
      <view class="box-top flex flex-justify-between flex-vertical-b" @click="$linkToEasy('/pagesSupplier/HomeStatic/OperationSupport')">
        <view>
          <view class="lh48 fz-b fz-32 color-block">运营支持</view>
          <view class="m-t-12 lh 42 fz-28 color-block-45">帮您卖货</view>
        </view>
        <view class="flex">
          <view class="box-top__whole">整店运营</view>
          <view class="box-top__single">单品运营</view>
        </view>
      </view>
      <view class="box-bottom flex flex-justify-between">
        <view class="box-bottom__block" @click="$linkToEasy('/pagesProduct/PriceGuide/PriceGuide')">
          <view class="block-left">
            <view class="lh48 fz-b fz-32 color-block">价格指导</view>
            <view class="m-t-12 lh42 fz-28 color-block-45">同行价格指导</view>
          </view>
          <image class="block-img" src="/static/supplier/home/price_guide.png" />
        </view>
        <view class="box-bottom__block" @click="$linkToEasy('/pagesSupplier/HomeStatic/AfterHosting')">
          <view class="block-left">
            <view class="lh48 fz-b fz-32 color-block">售后托管</view>
            <view class="m-t-12 lh42 fz-28 color-block-45">让您省时省心</view>
          </view>
          <image class="block-img" src="/static/supplier/home/after_hosting.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OperationBox'
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
      padding: 32rpx 0;
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
          padding: 22rpx 0 0 24rpx;
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
</style>
