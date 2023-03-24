<template>
  <view class="cell" @click="selectFn">
    <view class="flex flex-justify-between flex-vertical-c">
      <!--出库-->
      <block v-if="sourceType === '2'">
        <!--wareHouseType 商家仓-->
        <block v-if="userInfo.roleCode === 'agent'">
          <block v-if="shipCell.wareHouseType">
            <view class="color-block-45">{{ shipCell.warehouseName }}</view>
          </block>
          <block v-else>
            <view>{{ shipCell.warehouseName }}</view>
          </block>
        </block>
        <block v-else>
          <block v-if="shipCell.wareHouseType && shipCell.availableNumber < 1 ">
            <view class="color-block-45">{{ shipCell.warehouseName }}</view>
          </block>
          <block v-else>
            <view>{{ shipCell.warehouseName }}</view>
          </block>
        </block>
      </block>
      <block v-else>
        <view>{{ shipCell.warehouseName }}</view>
      </block>
      <block v-if="shipCell.availableNumber > 0">
        <VoIcon v-show="shipCell.select === false" name="address_select" />
        <VoIcon v-show="shipCell.select === true" color="#FF5319" name="select-right" />
      </block>
      <block v-else>
        <VoIcon color="#E9E9E9" name="address_select" />
      </block>
    </view>
    <block v-if="sourceType === '2'">
      <!--wareHouseType 商家仓-->
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
          <view
            class="cell-info m-t-24"
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
      </block>
      <block v-else>
        <block v-if="shipCell.wareHouseType">
          <view
            class="cell-info m-t-24"
            :class="shipCell.availableNumber > 0 ? 'color-block-65' : 'color-block-45'"
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
          <view
            class="cell-info m-t-24 color-block-65"
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
      </block>
    </block>
    <block v-else>
      <view
        class="cell-info m-t-24 color-block-65">
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
        default: {},
      },
      /**
       * 1  是补货仓库   2是出货仓库
       */
      sourceType: {
        type: String,
        default: '',
      },
    },
    created() {
      console.log(this.sourceType);
    },
    methods: {
      selectFn() {
        this.$emit('selectFn', this.shipCell)
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

    &-radio {
      width: 48rpx;
      height: 48rpx;
    }

    &-info {
      font-size: 28rpx;
      line-height: 150%;
    }
    &-infoColor {
      color: $v-c0-85;
    }
  }
</style>