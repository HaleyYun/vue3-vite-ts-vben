<template>
<view class="investItem flex flex-justify-between flex-vertical-c">
  <view class="investItem-title"> {{ title }} </view>
  <view class="flex">
    <view class="investItem-more">查看更多</view>
    <VoIcon name="right-arrow" :size="16" color="#BFBFBF"></VoIcon>
  </view>
</view>
</template>

<script>
export default {
  name: "InvestItem",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss" scoped>
.investItem {
  height: 80rpx;
  &-title {
    color: $v-c0-85;
    font-size: 28rpx;
    font-weight: bold;
  }
  &-more {
    color: $v-c0-65;
    font-size: 26rpx;
    padding-right: 4rpx;
  }
}
</style>