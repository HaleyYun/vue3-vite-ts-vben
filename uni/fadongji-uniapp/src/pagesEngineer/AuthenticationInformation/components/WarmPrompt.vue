<template>
  <view class="uploaded-tips">
    <view class="uploaded-tips__title">温馨提示</view>
    <view class="uploaded-tips__word">认证资料通过后，平台保护您的个人信息。</view>
    <view class="uploaded-tips__word"
      >拍摄时请确保证件<text class="uploaded-tips__red">边框完整，字体清晰，亮度均匀</text></view
    >
    <view class="uploaded-tips__img flex">
      <view class="img-par">
        <image :src="src.correctSrc" class="img-par__icon" />
        <view class="img-child">
          <image class="img-child__success" src="/static/created/certify/success.png" />
        </view>
      </view>
      <view class="img-par">
        <image :src="src.lackSrc" class="img-par__icon" />
        <view class="img-child">
          <image class="img-child__success" src="/static/created/certify/clear.png" />
        </view>
      </view>
      <view class="img-par">
        <image :src="src.fuzzySrc" class="img-par__icon" />
        <view class="img-child">
          <image class="img-child__success" src="/static/created/certify/clear.png" />
        </view>
      </view>
      <view class="img-par">
        <image :src="src.unevenSrc" class="img-par__icon" />
        <view class="img-child">
          <image class="img-child__success" src="/static/created/certify/clear.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'WarmPrompt',
    props: {
      src: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: {
          correctSrc: '/static/created/certify/tips_icons1.png',
          lackSrc: '/static/created/certify/tips_icons2.png',
          fuzzySrc: '/static/created/certify/tips_icons3.png',
          unevenSrc: '/static/created/certify/tips_icons4.png',
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded-tips {
    padding: 0 32rpx 16rpx;
    &__title {
      height: 42rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: $v-c0-85;
      margin: 32rpx 0 8rpx;
    }
    &__word {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-65;
    }
    &__red {
      color: $v-error;
      font-weight: bold;
    }
    &__img {
      margin-top: 24rpx;
      .img-par {
        position: relative;
        z-index: 1;
        &__icon {
          width: 136rpx;
          height: 102rpx;
          margin-right: 16rpx;
        }
      }
      .img-child {
        position: absolute;
        z-index: 2;
        left: 48rpx;
        bottom: -20rpx;
        &__success {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
</style>
