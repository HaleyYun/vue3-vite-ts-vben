<template>
  <view class="cell" @click="selectFn">
    <view class="flex flex-justify-between flex-vertical-c">
      <view>
        <text v-show="shipCell.categoryType" class="good-tips m-r-8">{{shipCell.categoryType}}</text>
        <text> {{ shipCell.name }}</text>
      </view>
      <VoIcon v-show="shipCell.select === false" :opacity="0.15" name="circle" />
      <image
        v-show="shipCell.select === true"
        class="cell-radio"
        src="/static/created/product/radio.png"
      />
    </view>
    <view class="cell-info m-t-24">
      <view class="flex">
        <view class="m-r-40">可用库存：{{ shipCell.available }}</view>
        <view>总库存：{{ shipCell.physical }}</view>
      </view>
      <view class="flex">
        <view class="m-r-40">入库在途：{{ shipCell.onRoute }}</view>
        <view>订单占用：{{ shipCell.occupy }}</view>
      </view>
    </view>
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
    &-radio {
      width: 48rpx;
      height: 48rpx;
    }
    &-info {
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-65;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
