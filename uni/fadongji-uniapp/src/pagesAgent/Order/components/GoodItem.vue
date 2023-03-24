<template>
  <view class="good flex">
    <block v-if="goodData.pic && goodData.pic.length">
      <image
        v-if="goodData.pic[0].indexOf('mp4') > -1 || goodData.pic[0].indexOf('MP4') > -1"
        :src="goodData.pic[0] + '&type=3'"
        class="good-img"
      />
      <image v-else :src="goodData.pic[0] + '&type=1'" class="good-img" />
    </block>
    <view class="flex1">
      <view class="good-title">
        <text v-show="goodData.categoryType" class="good-tips m-r-8">{{goodData.categoryType}}</text>
        <text> {{ goodData.goodsName }}</text>
      </view>
      <view v-if="isShowInvest">
        <view class="good-bottom__left flex flex-vertical-c">
          <view class="tips">{{
              goodData.periodDays > 0 ? `${goodData.periodDays}天账期` : '现金价'
            }}</view>
          <view class="price flex flex-vertical-c">
            <VoPointPrice :price="goodData.originalPrice.toString()" />
            <view>元</view>
          </view>
        </view>
        <block v-if="isShowDeliver">
          <view class="flex flex-justify-r flex-vertical-c">
            <view class="good-bottom__num">x{{ goodData.goodsCount }}</view>
            <block v-if="goodData.goodsCount - goodData.deliveryCount > 0">
              <view class="good-bottom__delivery">{{goodData.goodsCount - goodData.deliveryCount}}件未发货</view>
            </block>
            <block v-else>
              <view class="color-block-45 fz-28 m-t-8 m-l-16">全部发货</view>
            </block>
          </view>
        </block>
        <block v-else>
          <view class="good-bottom__num text-right">x{{ goodData.goodsCount }}</view>
        </block>
      </view>
      <view v-else class="good-bottom flex flex-justify-between">
        <view class="good-bottom__left flex flex-vertical-c">
          <view class="tips">{{
            goodData.periodDays > 0 ? `${goodData.periodDays}天账期` : '现金价'
          }}</view>
          <view class="price flex flex-vertical-c">
            <VoPointPrice :price="goodData.originalPrice.toString()" />
            <view>元</view>
          </view>
        </view>
        <block v-if="isShowDeliver">
          <view class="flex">
            <view class="good-bottom__num">x{{ goodData.goodsCount }}</view>
          </view>
        </block>
        <block v-else>
          <view class="good-bottom__num">x{{ goodData.goodsCount }}</view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodItem',
    props: {
      //是否显示投资价
      isShowInvest: {
        type: Boolean,
        default: true,
      },
      //是否显示未发货数量
      isShowDeliver: {
        type: Boolean,
        default: false,
      },
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
      &__delivery {
        margin-top: 8rpx;
        margin-left: 16rpx;
        color: $color-primary-red;
        font-size: 28rpx;
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
