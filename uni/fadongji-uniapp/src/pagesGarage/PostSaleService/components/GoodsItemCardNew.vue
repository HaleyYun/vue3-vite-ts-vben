<template>
  <view class="item_content">
    <view class="item_content_image">
      <view>
        <u--image v-if="goodsDetail.pic[0].indexOf('mp4')==-1||goodsDetail.pic[0].indexOf('MP4')==-1" :src="goodsDetail.pic[0]+'&type=3'" width="100%" />
        <u--image v-else :src="goodsDetail.pic[0]+'&type=1'" width="100%" />
      </view>
    </view>
    <view class="item_content_text">
      <view class="item_content_title">
        <text v-show="goodsDetail.categoryType" class="good-tips m-r-8">{{goodsDetail.categoryType}}</text>
        <text> {{ goodsDetail.goodsName }}</text>
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
  .item_content {
    display: flex;
    justify-content: space-between;
    padding-top: 24rpx;
    .item_content_image {
      > :nth-child(1) {
        width: 160rpx;
        height: 160rpx;
        overflow: hidden;
        border-radius: 8rpx;
      }
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
