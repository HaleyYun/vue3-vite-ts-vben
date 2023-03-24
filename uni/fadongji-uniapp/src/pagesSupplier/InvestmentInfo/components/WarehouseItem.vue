<template>
  <view class="warehouseItem">
    <view class="warehouseItem-info">
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="warehouseItem-info__title"> {{ warehouseData.name }} </view>
        <VoIcon v-if="warehouseData.select === true" :size="24" name="select-right" />
        <VoIcon v-else :size="24" name="address_select" />
      </view>
      <view class="flex warehouseItem-info__bottom warehouseItem-info__p-t-24">
        <view>可用库存：{{ warehouseData.availableStock }}</view>
        <view class="paddingLeft">总库存：{{ warehouseData.physicalInventory }}</view>
      </view>

      <view class="flex warehouseItem-info__bottom warehouseItem-info__p-t-8">
        <view>入库在途：{{ warehouseData.storageTransit }}</view>
        <view class="paddingLeft">订单占用：{{ warehouseData.orderNumber }}</view>
      </view>
    </view>
    <view class="warehouseItem-line" />
  </view>
</template>

<script>
  export default {
    name: 'WarehouseItem',
    props: {
      warehouseData: {
        type: Object,
        warehouseData: {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .warehouseItem {
    &-info {
      padding: 24rpx 32rpx;

      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
      &__bottom {
        color: $v-c0-65;
        font-size: 28rpx;
        .paddingLeft {
          margin-left: 40rpx;
        }
      }
      &__p-t-24 {
        margin-top: 24rpx;
      }
      &__p-t-8 {
        margin-top: 8rpx;
      }
    }
    &-line {
      margin-left: 32rpx;
      height: 2rpx;
      width: 100%;
      background-color: $v-bg-light;
    }
  }
</style>
