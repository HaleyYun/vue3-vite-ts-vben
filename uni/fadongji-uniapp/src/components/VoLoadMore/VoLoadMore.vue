<template>
  <view v-show="show" class="loading-more">
    <view class="loading-more__view flex flex-vertical-c">
      <view class="loading-more__line m-r-16 flex1"></view>
      <view class="loading-more__text">{{ text }}</view>
      <view class="loading-more__line m-l-16 flex1"></view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'VoLoadMore', //列表加载更多提示组件
    props: {
      //显示隐藏
      show: {
        type: Boolean,
        default: false,
      },
      //加载文字
      text: {
        type: String,
        default: '暂无更多内容',
      },
    },
  }
</script>
<style lang="scss" scoped>
  .loading-more {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32rpx 0;
    // background-color: #fff;
    &__view {
      width: 400rpx;
      padding: 2rpx 4rpx;
    }
    &__text {
      font-size: 20rpx;
      line-height: 1.5;
      color: $v-c0-25;
    }
    &__line {
      height: 2rpx;
      background: rgba(0, 0, 0, 0.08);
    }
  }
</style>
