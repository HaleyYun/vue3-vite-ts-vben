<template>
  <view
    class="bg-white flex-column flex flex1 text-center flex-vertical-c m-b-safe-area w-full h-full detail"
  >
    <!--    <VoIcon class="detail-icon" name="certified" :size="88"/>-->
    <image class="detail-icon" src="/static/lease/home/success_prompt.png" />
    <view class="detail-tips1">提交信息完成注册</view>
    <view class="detail-time m-t-24">{{ info.createTime }}</view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceRegiste',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail {
    &-tips1 {
      font-size: 30rpx;
      font-weight: bold;
      line-height: 36rpx;
      color: $v-c0-85;
      margin-top: 32rpx;
    }

    &-tips2 {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-25;
      flex-wrap: wrap;
      align-items: center;
      text-align: center;
    }

    &-empty {
      margin-top: 194rpx;
      width: 416rpx;
      height: 176rpx;
    }

    &-time {
      font-size: 24rpx;
      line-height: 36rpx;
      color: $v-c0-45;
    }

    &-icon {
      margin-top: 180rpx;
      width: 176rpx;
      height: 176rpx;
    }
  }
</style>
