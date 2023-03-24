<template>
  <view class="noStock">
    <view class="noStock-title">抱歉，您本单购买的以下商品已过期</view>
    <view class="noStock-list" v-for="info of 3" :key="info">
      <view class="noStock-list__line flex">
        <image class="noStock-img" src="/static/demo/rectangle.png" />
        <view class="flex1">
          <view class="fz-b fz-32 lh48 color-block-45">
            江铃动力 全EA888发动机总成适用于奥迪1.8T
          </view>
          <view class="flex">
            <view class="noStock-free noStock-noStock m-t-8">包邮</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-16">
            <view class="color-red lh42">
              <!-- <text class="fz-b fz-28">2800</text>
              <text class="fz-24">.00元</text> -->
              <VoPointPrice price="2800" :show-unit="true" display="inline-block" />
            </view>
            <view class="lh40 color-block-45 fz-26">X300</view>
          </view>
        </view>
      </view>
    </view>
    <view class="noStock-bottom flex">
      <view class="noStock-bottom__button flex1 color-block-65">返回投资清单</view>
      <view class="noStock-bottom__button flex1 color-block-main fz-b">移除该商品</view>
    </view>
    <view class="noStock-button">确定</view>
  </view>
</template>

<script>
  export default {
    name: 'OutOfStockPopup',
  }
</script>

<style lang="scss" scoped>
  .noStock {
    width: 638rpx;
    &-title {
      text-align: center;
      margin: 48rpx 0;
      height: 48rpx;
      line-height: 48rpx;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-list {
      padding: 0 24rpx;
      box-sizing: border-box;
      &__line {
        padding: 16rpx 0;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    &-img {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }
    &-free {
      //height: 36rpx;
      line-height: 36rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      border-radius: 8rpx;
    }
    &-noStock {
      border: 2rpx solid rgba(0, 0, 0, 0.45);
      color: $v-c0-45;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      &__button {
        text-align: center;
        padding: 20rpx 0;
        box-sizing: border-box;
        font-size: 32rpx;
        &:first-child {
          border-right: 2rpx solid $v-bg-light;
        }
      }
    }
    &-button {
      text-align: center;
      padding: 20rpx 0;
      font-size: 32rpx;
      color: #22284b;
      font-weight: bold;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
