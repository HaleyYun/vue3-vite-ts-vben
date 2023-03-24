<template>
  <view
    class="carModel flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="适配车型" />
    <view class="h12" />
    <VoTable :table-val="carModelList" ></VoTable>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        carModelList: [],
      }
    },
    onLoad() {
      this.carModelList = this.$storage.get('vehicleVOS') || []
    }
  }
</script>

<style lang="scss" scoped>
  .carModel {
    width: 750rpx;
    min-height: 100vh;
    background-color: #ffffff;
    padding: 0rpx 32rpx 32rpx;
    box-sizing: border-box;
  }
</style>
