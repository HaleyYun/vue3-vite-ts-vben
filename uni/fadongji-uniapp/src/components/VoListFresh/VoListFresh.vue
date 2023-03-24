<template>
  <view class="loading-more" v-show="show">
    <VoIcon name="refresh-new" :size="20" color="#D3D4DB" />
    <view class="loading-more__text">{{ text }}</view>
  </view>
</template>
<script>
  export default {
    name: 'VoListFresh', //下拉刷新组件
    props: {
      //显示隐藏
      show: {
        type: Boolean,
        default: false,
      },
      //刷新文字
      text: {
        type: String,
        default: '努力刷新中',
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
    background-color: #f7f7f8;

    &__text {
      font-size: 20rpx;
      line-height: 1.5;
      color: $v-c0-25;
    }
  }
</style>
