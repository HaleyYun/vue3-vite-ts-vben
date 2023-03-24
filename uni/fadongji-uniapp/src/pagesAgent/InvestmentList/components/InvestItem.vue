<template>
  <view class="investItem flex flex-justify-between flex-vertical-c">
    <view class="investItem-title"> {{ title }} </view>
    <view class="flex" v-if="showMore">
      <view class="investItem-more">查看更多</view>
      <VoIcon name="right-arrow" :size="16" color="#BFBFBF" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvestItem',
    props: {
      title: {
        type: String,
        default: '',
      },
      showMore: {
        type: Boolean,
        default: true,
      },
    },
  }
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
