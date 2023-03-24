<template>
  <view class="carModel">
    <InvestItem title="产品参数" @click.native="lookMoreClick" />
    <view
      class="carModel-item"
      v-for="(item, index) in info.paramsProperty"
      v-show="index < 10"
      :key="index"
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
      productData: {
        type: Array,
        productData: [],
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    methods: {
      lookMoreClick() {
        this.$storage.set('paramsProperty', this.info.paramsProperty)
        this.$emit('productParamsLookMore')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .carModel {
    padding: 0rpx 32rpx 8rpx;
    background-color: #ffffff;
    box-sizing: border-box;

    &-item {
      color: $v-c0-65;
      font-size: 28rpx;
      height: 72rpx;
      line-height: 72rpx;
      width: 100%;
    }
  }
</style>
