<template>
  <view class="cell" @click="selectFn">
    <view class="flex flex-justify-between flex-vertical-c">
      <view>
        <block v-if="userInfo.roleCode === 'agent'">
          <block v-if="shipCell.wareHouseType">
            <view class="color-block-45">{{ shipCell.warehouseName }}</view>
          </block>
          <block v-else>
            <view :class="shipCell.availableNumber > 0 ? 'color-block-65' : 'color-block-45'">{{ shipCell.warehouseName }}</view>
          </block>
        </block>
        <block v-else>
          <view>{{ shipCell.warehouseName }}</view>
        </block>
        <view class="text-24 color-gray">
          {{ shipCell.areaName }}
          {{ shipCell.address }}
        </view>
      </view>
      <VoIcon v-if="shipCell.select" color="#FF5319" name="select-right" />
      <VoIcon v-else :opacity="0.15" name="circle" />
    </view>
    <!-- 供应商不展示详细内容、服务商需要展示	-->
    <block v-if="userInfo.roleCode === 'agent'">
      <block v-if="shipCell.wareHouseType">
        <view
          class="cell-info m-t-24 color-block-45"
        >
          <view class="flex">
            <view class="m-r-40">可用库存：{{ shipCell.availableNumber }}</view>
            <view>总库存：{{ shipCell.number }}</view>
          </view>
          <view class="flex">
            <view class="m-r-40">入库在途：{{ shipCell.onWayNumber }}</view>
            <view>订单占用：{{ shipCell.orderNumber }}</view>
          </view>
        </view>
      </block>
      <block v-else>
        <view class="cell-info m-t-24" :class="shipCell.availableNumber > 0 ? 'color-block-65' : 'color-block-45'">
          <view class="flex">
            <view class="m-r-40">可用库存：{{ shipCell.availableNumber }}</view>
            <view>总库存：{{ shipCell.number }}</view>
          </view>
          <view class="flex">
            <view class="m-r-40">入库在途：{{ shipCell.onWayNumber }}</view>
            <view>订单占用：{{ shipCell.orderNumber }}</view>
          </view>
        </view>
      </block>
    </block>
    <block v-else>
      <view v-if="show" class="cell-info m-t-24 color-block-65">
        <view class="flex">
          <view class="m-r-40">可用库存：{{ shipCell.availableNumber || 0 }}</view>
          <view>总库存：{{ shipCell.number || 0 }}</view>
        </view>
        <view class="flex">
          <view class="m-r-40">入库在途：{{ shipCell.onWayNumber || 0 }}</view>
          <view>订单占用：{{ shipCell.orderNumber || 0 }}</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'ShipList',
    props: {
      /**
       * shipCell 可用库存
       * physical 总库存
       * onRoute 入库在途
       * occupy 订单占用
       */
      shipCell: {
        type: Object,
        default() {
          return {}
        },
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      selectFn() {
        this.$emit('selectFn')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cell {
    margin: 0 32rpx;
    padding: 24rpx 0;
    box-sizing: border-box;
    border-bottom: 2rpx solid $v-bg-light;
    font-size: 32rpx;
    line-height: 150%;
    color: $v-c0-85;
    &-info {
      font-size: 28rpx;
      line-height: 150%;
    }
  }
</style>
