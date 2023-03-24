<template>
  <u-popup
    v-if="visible"
    :show="visible"
    class="center-popup"
    mode="center"
    round="4"
    @close="close"
  >
    <view class="center-popup__block">
      <view class="center-popup__title"> 获赞与收藏 </view>
      <view class="center-popup__center">
        <view class="center-row first">
          <image class="center-row__icon" src="/static/icons/like_red.png" />
          <view class="center-row__text"
            >当前获得点赞数 <text class="num">{{ numData.likeNum || 0 }}</text></view
          >
        </view>
        <view class="center-row">
          <image class="center-row__icon" src="/static/icons/star_yel.png" />
          <view class="center-row__text"
            >当前获得收藏数 <text class="num">{{ numData.collectNum || 0 }}</text></view
          >
        </view>
      </view>
      <view class="center-popup__btm">
        <view class="btn" @click="close">我知道了</view>
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'CenterPopup',
    props: {
      numData: {
        type: Object,
      },
    },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .center-popup {
    background: #ffffff;
    border-radius: 8rpx;
    &__block {
      width: 520rpx;
      background: #ffffff;
      border-radius: 8rpx;
    }
    &__title {
      font-size: 28rpx;
      line-height: 42rpx;
      font-weight: bold;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      padding: 24rpx 0;
      border-bottom: 2rpx solid #f7f7f8;
    }
    &__center {
      padding: 64rpx 0;
      .center-row {
        display: flex;
        justify-content: center;
        align-items: center;
        &.first {
          margin-bottom: 40rpx;
        }
        &__icon {
          width: 56rpx;
          height: 56rpx;
        }
        &__text {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-65;
          padding-left: 24rpx;
          .num {
            color: $v-c0-85;
            font-weight: bold;
            padding-left: 10rpx;
          }
        }
      }
    }
    &__btm {
      padding: 0 80rpx 40rpx 80rpx;
      .btn {
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 30rpx;
        color: #ffffff;
        font-size: 28rpx;
        line-height: 64rpx;
      }
    }
  }
</style>
