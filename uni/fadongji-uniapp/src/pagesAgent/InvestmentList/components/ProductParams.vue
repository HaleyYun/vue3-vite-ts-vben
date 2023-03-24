<template>
  <view class="carModel">
    <InvestItem title="产品参数" @click.native="lookMoreClick" />
    <view
      class="carModel-item"
      v-for="(item, index) in info.paramsProperty"
      :key="index"
      v-show="index < 10"
    >
      {{ item.key }}: {{ item.value }}
    </view>
  </view>
</template>

<script>
  import InvestItem from './InvestItem'
  export default {
    name: 'ProductParams',
    components: {
      InvestItem,
    },
    props: {
      info: {
        type: Object,
      },
    },
    methods: {
      lookMoreClick() {
        let data = this.info.paramsProperty.map((item) => {
          return {
            name: item.key,
            value: item.value,
            isMust:2
          }
        })
        this.$storage.set('paramsProperty', data)
        this.$linkToEasy('/pagesGarage/ShopList/ProductParams')
        // this.$emit('productParamsLookMore')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .carModel {
    padding: 0rpx 32rpx 8rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-item {
      color: $v-c0-65;
      font-size: 28rpx;
      height: 72rpx;
      line-height: 72rpx;
      width: 100%;
    }
  }
</style>
