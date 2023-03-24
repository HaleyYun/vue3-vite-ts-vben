<template>
  <view class="item_content">
    <view>
      <view v-if="orderDetail.goodsDetail && orderDetail.goodsDetail.length">
        <image v-if="orderDetail.goodsDetail[0].pic[0].indexOf('mp4')!=-1||orderDetail.goodsDetail[0].pic[0].indexOf('MP4')!=-1" class="item_content_image" :src="orderDetail.goodsDetail[0].pic[0]+'&type=3'" />
        <image v-else class="item_content_image" :src="orderDetail.goodsDetail[0].pic[0]+'&type=1'" />
      </view>
    </view>
    <view class="item_content_text">
      <view class="item_content_title">
        <text v-show="orderDetail.goodsDetail[0].categoryType" class="good-tips m-r-8">{{orderDetail.goodsDetail[0].categoryType}}</text>
        <text> {{ orderDetail.goodsDetail[0].goodsName }}</text>
      </view>
      <view class="item_content_btm">
        <view>
          <text>商品识别码：</text>
          <text>{{ orderDetail.engineNo }}</text>
        </view>
        <view v-if="orderDetail.type != 3">
          <text>故障件：</text>
          <text>{{ orderDetail.unit }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsItemCard',
    props: {
      orderDetail: {
        type: Object,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item_content {
    display: flex;
    justify-content: space-between;
    padding-top: 24rpx;
    .item_content_image {
        width: 160rpx;
        height: 160rpx;
        overflow: hidden;
        border-radius: 8rpx;
    }
    .item_content_text {
      .item_content_title {
        width: 510rpx;
        height: 86rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        margin-bottom: 24rpx;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .item_content_btm {
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.45);
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
