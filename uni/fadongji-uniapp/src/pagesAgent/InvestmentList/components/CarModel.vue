<template>
  <view class="carModel">
    <InvestItem
      title="适配车型"
      @click.native="lookMoreClick"
      :showMore="info.vehicles !== null && info.vehicles.length > 4"
    />
    <view class="cell-box__main p-b-24">
      <VoTable :table-val="info.vehicles" :limit="4"></VoTable>
    </view>
  </view>
</template>

<script>
  import InvestItem from './InvestItem'
  export default {
    name: 'CarModel',
    components: {
      InvestItem,
    },
    props: {
      carModel: {
        type: Array,
        carModel: [],
      },
      info: {
        type: Object,
      },
    },
    methods: {
      lookMoreClick() {
        // this.$emit('carModelLookMore')
        this.$storage.set('vehicleVOS', this.info.vehicles)
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestCarModel')
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
      color: $v-c0-85;
      font-size: 28rpx;
      height: 72rpx;
      line-height: 72rpx;
      width: 100%;
    }
  }
</style>
