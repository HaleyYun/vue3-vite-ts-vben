<template>
  <view class="block">
    <view class="block-title">商品交易信息</view>
    <view class="block-info flex">
      <image
        v-if="
          transactionList.infoImg.indexOf('mp4') != -1 ||
          transactionList.infoImg.indexOf('MP4') != -1
        "
        :src="transactionList.infoImg + '&type=3'"
        class="block-info__img"
      />
      <image v-else :src="transactionList.infoImg + '&type=1'" class="block-info__img" />
      <view class="block-info__right flex1">
        <view class="right-content">
          <text v-show="transactionList.categoryType" class="good-tips m-r-8">{{
            transactionList.categoryType
          }}</text>
          {{ transactionList.content }}
        </view>
        <view class="right-content__bottom flex flex-justify-between">
          <view class="bottom-left flex flex-vertical-c">
            <view class="bottom-left__tips">现金价</view>
            <view class="bottom-left__price fz-28">
              <VoPointPrice :price="transactionList.price" :show-unit="true" />
              <!-- <text class="fz-b">{{ transactionList.price }}</text><text class="fz-24">.00元</text> -->
            </view>
          </view>
          <view class="bottom-num">{{ transactionList.num }}</view>
        </view>
      </view>
    </view>
    <view
      v-if="transactionList.engineNoList && transactionList.engineNoList.length"
      :class="transactionList.engineNoList.length === 1 ? 'block-flex' : ''"
      class="m-l-32 fz-28 p-b-28"
    >
      <view :class="transactionList.engineNoList.length === 1 ? '' : 'm-b-12'" class="m-r-16">
        发动集识别码：
      </view>
      <view class="flex flex-wrap">
        <view
          v-for="(info, index) of transactionList.engineNoList"
          :key="index"
          :class="transactionList.engineNoList.length === 1 ? '' : 'margin'"
          class="code overEllipsis"
        >
          {{ info }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TransactionInfo',
    props: {
      /**
       * infoImg 商品交易的图片
       */
      transactionList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 16rpx;
    &-title {
      padding: 24rpx 0;
      margin: 0 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      padding: 40rpx 32rpx 36rpx;
      &__img {
        width: 160rpx;
        height: 160rpx;
      }
      &__right {
        overflow-x: hidden;
        margin-left: 16rpx;
        .right-content {
          font-weight: bold;
          font-size: 28rpx;
          line-height: 42rpx;
          color: $v-c0-85;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          &__bottom {
            .bottom-left {
              margin-top: 32rpx;
              height: 42rpx;
              &__tips {
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
              &__price {
                font-size: 28rpx;
                color: #e50012;
                margin-left: 8rpx;
              }
            }
            .bottom-num {
              margin-top: 8rpx;
              height: 42rpx;
              line-height: 42rpx;
              font-weight: bold;
              font-size: 28rpx;
              color: $v-c0-45;
            }
          }
        }
      }
    }
    &-flex {
      display: flex;
      align-items: center;
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
  .code {
    width: 336rpx;
    height: 46rpx;
    line-height: 46rpx;
    background: #f6f7f8;
    border-radius: 4rpx;
    text-align: center;
    font-size: 28rpx;
  }
  .margin {
    margin: 16rpx 14rpx 0 0;
  }
  .margin:nth-child(2n) {
    margin-right: 0;
  }
</style>
