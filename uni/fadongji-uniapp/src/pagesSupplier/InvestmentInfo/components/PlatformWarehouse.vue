<template>
  <view class="platform">
    <view class="platform-title">平台仓</view>
    <WarehouseItem v-for="(item, index) in warehouseList" :key="index" :warehouse-data="item"  @click.native="chooseWarehouse(item)" />
  </view>
</template>

<script>
  import WarehouseItem from './WarehouseItem'
  export default {
    name: 'PlatformWarehouse',
    components: {
      WarehouseItem,
    },
    props: {
      warehouseList: {
        type: Array,
        warehouseList: [],
      },
    },
    methods: {
      chooseWarehouse(item) {
        this.$emit('platformWarehouseClick', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .platform {
    background-color: #ffffff;
    width: 750rpx;
    box-sizing: border-box;

    &-title {
      margin-left: 32rpx;
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
      height: 88rpx;
      line-height: 88rpx;
    }
  }
</style>
