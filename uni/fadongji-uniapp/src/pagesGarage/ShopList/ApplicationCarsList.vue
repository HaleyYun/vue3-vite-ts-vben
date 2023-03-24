<template>
  <view
    class="carModel flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="适配车型" />
    <view class="h16" />
    <view class="carModel-item" v-for="(item, index) in carModelList" :key="index">
      {{ item }}
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        carModelList: [],
      }
    },
    created() {
      const carModelList = this.$storage.get('vehicleVOS') || []
      this.carModelList = carModelList.map((item) => {
        return item.brandName + item.seriesName + item.name
      })
    },
    onHide() {
      this.$storage.remove('vehicleVOS')
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .carModel {
    width: 750rpx;
    min-height: 100vh;

    &-item {
      background-color: #ffffff;
      padding: 16rpx 32rpx 0rpx;
      color: $v-c0-65;
      font-size: 28rpx;
      height: 72rpx;
      line-height: 72rpx;
      width: 100%;
    }
  }
</style>
