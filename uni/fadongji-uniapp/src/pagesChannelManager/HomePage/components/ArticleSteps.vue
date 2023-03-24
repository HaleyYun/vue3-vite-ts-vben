<template>
  <view class="uploaded-steps">
    <view class="uploaded-steps__top flex flex-vertical-c flex-justify-c">
      <VoIcon v-if="current <= 0" :size="24" color="#ff5319" name="more-fill" />
      <VoIcon v-else :size="24" color="#1DC26F" name="right-fill" />
      <view class="top-line" />
      <VoIcon v-if="current === 1" :size="24" color="#ff5319" name="more-fill" />
      <VoIcon v-else-if="current === 2" :size="24" color="#ff5319" name="right-fill" />
      <VoIcon v-else :size="24" color="#F7F7F8" name="dot-light" />
      <view class="top-line" />
      <VoIcon v-if="current === 2" :size="24" color="#ff5319" name="right-fill" />
      <VoIcon v-else :size="24" color="#F7F7F8" name="dot-light" />
    </view>
    <view class="uploaded-steps__bottom flex flex-vertical-c">
      <view class="bottom-tips">提交基础信息</view>
      <view v-if="current !== 0" class="bottom-tips">提交企业信息</view>
      <view v-else class="bottom-tips bottom-grey">提交企业信息</view>
      <view v-if="current === 2" class="bottom-tips">提交法人信息</view>
      <view v-else class="bottom-tips bottom-grey">提交法人信息</view>
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
    }
    &__bottom {
      width: 100%;
      padding: 8rpx 32rpx;
      .bottom-tips {
        width: 208rpx;
        text-align: center;
        margin-right: 32rpx;
        color: $v-c0-85;
        font-size: 28rpx;
        font-weight: bold;
      }
      .bottom-grey {
        color: $v-c0-25 !important;
        font-weight: 400 !important;
      }
    }
  }
</style>
