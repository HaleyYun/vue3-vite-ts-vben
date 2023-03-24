<template>
  <view class="serviceSafe">
    <view class="serviceSafe-title fz-b">服务保障</view>
    <view v-for="(item, index) in ServiceData" :key="index">
      <view class="flex flex-justify-between flex-vertical-c serviceSafe-item">
        <view class="flex flex-vertical-c">
          <view> {{ item.name || item.key }} </view>
          <view class="content"> {{ item.value }}</view>
        </view>
        <VoIcon name="right-arrow" :size="16" color="#BFBFBF" />
      </view>
      <view class="serviceSafe-line" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceSafe',
    props: {
      ServiceData: {
        type: Array,
        ServiceData: [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .serviceSafe {
    width: 750rpx;
    padding: 0rpx 0rpx 0rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-title {
      padding-top: 16rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }
    &-item {
      padding-right: 32rpx;
      color: $v-c0-85;
      font-size: 28rpx;
      height: 88rpx;

      .content {
        padding-left: 16rpx;
      }
    }
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: $v-bg-light;
    }
  }
</style>
