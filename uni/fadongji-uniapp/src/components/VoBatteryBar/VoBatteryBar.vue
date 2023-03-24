<template>
  <view>
    <view class="nav-block" :style="statusBarStyle" />
  </view>
</template>

<script>
  export default {
    name: 'VoBatteryBar',
    props: {
      /**
       * 背景色
       */
      bgColor: {
        type: String,
        default: '#ffffff',
      },
    },
    data() {
      return {
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: this.bgColor,
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .nav-block {
    width: 750rpx;
  }
</style>
