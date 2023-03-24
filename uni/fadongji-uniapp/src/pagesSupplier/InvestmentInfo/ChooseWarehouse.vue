<template>
  <view
    class="warehouse flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="选择仓库" />
    <view class="h16" />
    <MyWarehouse :warehouse-list="myWarehouse" @myWarehouseClick="myWarehouseClick" />
    <view class="h16" />
    <PlatformWarehouse :warehouse-list="platformWarehouse" @platformWarehouseClick="platformWarehouseClick" />

    <VoNoData v-if="myWarehouse.length === 0 && platformWarehouse.length === 0" no-data-tips="暂无仓库"></VoNoData>

  </view>
</template>

<script>
  import MyWarehouse from './components/MyWarehouse'
  import PlatformWarehouse from './components/PlatformWarehouse'

  export default {
    components: {
      MyWarehouse,
      PlatformWarehouse,
    },
    data() {
      return {
        myWarehouse: [
          {
            name: '郑州仓',
            availableStock: '500',
            physicalInventory: '488',
            storageTransit: '50',
            orderNumber: '6',
            select: 'false',
            id: '1',
          },
          {
            name: '禹州仓',
            availableStock: '500',
            physicalInventory: '488',
            storageTransit: '50',
            orderNumber: '6',
            select: 'false',
            id: '2',
          },
        ],
        platformWarehouse: [
          {
            name: '广州中心仓',
            availableStock: '500',
            physicalInventory: '488',
            storageTransit: '50',
            orderNumber: '6',
            select: 'false',
            id: '3',
          },
          {
            name: '济南中心仓',
            availableStock: '500',
            physicalInventory: '488',
            storageTransit: '50',
            orderNumber: '6',
            select: 'false',
            id: '4',
          },
        ],
      }
    },
    methods: {
      myWarehouseClick(data) {
        this.myWarehouse.forEach((item) => {
          if (item.id === data.id) {
            item.select = true
          } else {
            item.select = false
          }
        })
      },
      platformWarehouseClick(data) {
        this.platformWarehouse.forEach((item) => {
          if (item.id === data.id) {
            item.select = true
          } else {
            item.select = false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .warehouse {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
  }
</style>
