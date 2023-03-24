<template>
  <view class="setup">
    <!-- title -->
    <VoNav :leftWidth="250" :rightWidth="250" is-fixed is-have-more title="仓库设置">
      <block slot="operation">
        <view class="setup-guide">打码设置</view>
      </block>
    </VoNav>
  </view>
</template>

<script>
  // import CouponItem from './components/CouponItem'
  export default {
    name: 'WarehouseSetup',
    // components: { CouponItem },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .setup {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    &-guide {
      padding: 14rpx 22rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 200rpx;
      border: 2rpx solid $color-primary-yellow;
      font-size: 24rpx;
      font-weight: bold;
      color: $color-primary-yellow;
      line-height: 1;
      margin-right: 24rpx;
    }
  }
</style>
