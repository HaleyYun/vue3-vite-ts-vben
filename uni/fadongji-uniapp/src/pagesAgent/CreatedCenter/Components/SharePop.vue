<template>
  <view v-if="sharePopVisible">
    <u-popup :show="sharePopVisible" mode="bottom" @close="close">
      <view class="pop">
        <view class="pop-title">分享至</view>
        <view class="pop-content">
          <view class="pop-content__btn">
            <image class="btn-img" src="/static/icons/weixin.png" />
            <view class="btn-name">微信好友</view>
          </view>
          <view class="pop-content__btn">
            <image class="btn-img" src="/static/icons/friend.png" />
            <view class="btn-name">朋友圈</view>
          </view>
        </view>
        <view class="pop-btm" @click="close">取消</view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  export default {
    name: 'SharePop',
    props: {},
    data() {
      return {
        sharePopVisible: false,
        isShowAll: false,
      }
    },
    methods: {
      show() {
        this.sharePopVisible = true
      },
      close() {
        this.sharePopVisible = false
        this.$emit('close')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop {
    &-title {
      font-weight: bold;
      font-size: 28rpx;
      line-height: 1.5;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #f7f7f8;
      padding: 16rpx 0;
    }
    &-content {
      display: flex;
      padding: 48rpx 40rpx 80rpx 40rpx;
      &__btn {
        margin-right: 40rpx;
        .btn-img {
          width: 120rpx;
          height: 120rpx;
        }
        .btn-name {
          font-size: 24rpx;
          line-height: 34rpx;
          text-align: center;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    &-btm {
      font-size: 32rpx;
      line-height: 1.5;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      padding: 24rpx;
      border-top: 1px solid #f7f7f8;
    }
  }
</style>
