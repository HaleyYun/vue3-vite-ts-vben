<template>
  <view class="block">
    <view class="block-title">平台处理审核</view>
    <view class="block-info">
      <view v-for="(info, index) of auditList" :key="index" class="flex flex-justify-between m-t-8">
        <view class="block-info__left">{{ info.name }}</view>
        <view class="block-info__right flex1">{{ info.details }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PlatformProcessingAudit',
    props: {
      auditList: {
        type: Array,
        default: [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 750rpx;
    background: #ffffff;
    margin-top: 16rpx;
    &-title {
      padding: 24rpx 0;
      margin: 0 32rpx;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      padding: 0 32rpx 24rpx;
      font-size: 28rpx;
      line-height: 42rpx;
      &__right {
        text-align: right;
        color: $v-c0-65;
      }
    }
  }
</style>
