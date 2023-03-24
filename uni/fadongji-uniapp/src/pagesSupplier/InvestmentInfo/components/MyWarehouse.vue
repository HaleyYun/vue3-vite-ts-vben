<template>
  <view class="myWarehouse">
    <view class="myWarehouse-title">我的仓库</view>
    <WarehouseItem v-for="(item, index) in warehouseList" :key="index" :warehouse-data="item" @click.native="chooseWarehouse(item)" />
  </view>
</template>

<script>
  import WarehouseItem from './WarehouseItem'
  export default {
    name: 'MyWarehouse',
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
        this.$emit('myWarehouseClick', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .myWarehouse {
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
