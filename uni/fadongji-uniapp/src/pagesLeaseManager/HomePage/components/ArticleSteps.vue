<template>
  <view class="uploaded-steps">
    <view class="uploaded-steps__top flex flex-vertical-c flex-justify-c">
      <VoIcon v-if="current <= 0" :size="24" color="#ff5319" name="more-fill" />
      <VoIcon v-else :size="24" color="#00B359" name="select-right" />
      <view :class="current <= 0 ? 'top-line' : 'top-pink'" />
      <VoIcon v-if="current === 1" :size="24" color="#ff5319" name="more-fill" />
      <VoIcon v-else-if="current === 2" :size="24" color="#00B359" name="select-right" />
      <VoIcon v-else :size="24" color="#F7F7F8" name="dot-light" />
      <view :class="current <= 1 ? 'top-line' : 'top-pink'" />
      <VoIcon v-if="current === 2" :size="24" color="#ff5319" name="right-fill" />
      <VoIcon v-else :size="24" color="#F7F7F8" name="dot-light" />
    </view>
    <view class="uploaded-steps__bottom flex flex-vertical-c">
      <view :class="current === 0 ? 'bottom-orange' : 'bottom-black'" class="bottom-tips">
        提交基础信息
      </view>
      <view v-if="current === 1" class="bottom-tips bottom-orange">提交企业信息</view>
      <view v-else :class="current <= 1 ? 'bottom-grey' : 'bottom-black'" class="bottom-tips">
        提交企业信息
      </view>
      <view :class="current === 2 ? 'bottom-orange' : 'bottom-grey'" class="bottom-tips">
        提交法人信息
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ArticleSteps',
    props: {
      current: {
        type: Number,
        default: 0,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded-steps {
    height: 160rpx;
    background: #fff;
    margin-top: 16rpx;
    &__top {
      padding-top: 28rpx;
      .top-one {
        //margin-left: 112rpx;
      }
      .top-line {
        width: 176rpx;
        height: 4rpx;
        margin: 0 8rpx;
        background: $v-bg-light;
      }
      .top-pink {
        width: 176rpx;
        height: 4rpx;
        margin: 0 8rpx;
        background: #ffece5;
      }
    }
    &__bottom {
      width: 100%;
      padding: 8rpx 32rpx;
      .bottom-tips {
        width: 208rpx;
        text-align: center;
        margin-right: 32rpx;
        font-size: 28rpx;
      }
      .bottom-black {
        color: $v-c0-85;
      }
      .bottom-orange {
        color: $v-tags;
        font-weight: bold;
      }
      .bottom-grey {
        color: $v-c0-25;
      }
    }
  }
</style>
