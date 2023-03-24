<template>
  <view v-if="historyItem" class="applyFor">
    <view class="applyFor-top flex flex-justify-between flex-vertical-c">
      <view> {{ historyItem.createTime }} </view>
      <view v-if="historyItem.checkStatus === 1" class="applyFor-top__status">待处理</view>
      <view v-if="historyItem.checkStatus === 3" class="applyFor-top__refuse">已拒绝</view>
    </view>
    <view class="applyFor-line" />
    <view class="applyFor-title">注销理由：{{ historyItem.reasonType }}</view>
    <view class="applyFor-detail overEllipsis">详情描述：{{ historyItem.remark }}</view>
  </view>
</template>

<script>
  export default {
    name: 'HistoryApplyForItem',
    props: {
      historyItem: {
        type: Object,
        default: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .applyFor {
    padding: 0rpx 32rpx;
    background-color: #ffffff;

    &-top {
      width: 100%;
      height: 106rpx;
      color: $v-c0-65;
      font-size: 28rpx;

      &__status {
        color: $v-warning;
      }
      &__refuse {
        color: $v-error;
      }
    }
    &-line {
      height: 2rpx;
      width: 100%;
      background-color: $v-bg-light;
    }

    &-title {
      margin-top: 32rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }

    &-detail {
      margin-top: 24rpx;
      padding-bottom: 32rpx;
      color: $v-c0-85;
      font-size: 28rpx;
    }
  }
</style>
