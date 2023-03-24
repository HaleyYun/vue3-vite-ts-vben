<template>
  <view class="uploaded-steps">
    <view class="uploaded-steps__top flex flex-vertical-c flex-justify-c">
      <VoIcon v-if="current === 0" name="more-fill" color="#FF5319" :size="24" />
      <VoIcon v-else name="right-fill" :size="24" color="#FF5319" />
      <view class="top-line" />
      <VoIcon v-if="current === 1" name="more-fill"   color="#FF5319" :size="24" />
      <VoIcon v-else-if="current === 2" name="right-fill"  color="#FF5319" :size="24" />
      <VoIcon v-else name="dot-light"  color="#F7F7F8" :size="24"  />
      <view class="top-line" />
      <VoIcon v-if="current === 2" name="right-fill"  color="#FF5319" :size="24" />
      <VoIcon v-else name="dot-light"  color="#F7F7F8" :size="24"  />
    </view>
    <view class="uploaded-steps__bottom flex flex-vertical-c">
      <view class="bottom-tips">步骤一</view>
      <view class="bottom-tips" v-if="current !== 0">步骤二</view>
      <view class="bottom-tips bottom-grey" v-else>步骤二</view>
      <view class="bottom-tips" v-if="current === 2">步骤三</view>
      <view class="bottom-tips bottom-grey" v-else>步骤三</view>
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
        color: #FF5319;
        font-size: 28rpx;
        font-weight: bold;
      }
      .bottom-grey {
        color:rgba(0, 0, 0, 0.25) !important;
        font-weight: 400 !important;
      }
    }
  }
</style>
