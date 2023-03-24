<template>
  <view class="item">
    <view class="line-bg h2 w-full m-b-32" />
    <view class="flex flex-justify-between m-b-24">
      <view class="item-title overTwoEllipsis">
        <text v-show="item.categoryType" class="good-tips m-r-8">{{item.categoryType}}</text>
        <text> {{ item.goodsName }}</text>
      </view>
      <view class="item-status">{{ item.typeName }}</view>
    </view>
    <view class="m-b-16 flex fz-24 color-gray">
      <view class="flex1"> 仓库：{{ item.warehouseName }}</view>
      <view v-if="item.type===7" class="flex1"> 修改前商品数量：{{ item.originNumber || 0 }}</view>
      <view v-else-if="item.type===8 || item.type===18" class="flex1"> 补货前商品数量：{{ item.originNumber || 0 }}</view>
      <view v-else-if="item.type===9 || item.type===13" class="flex1"> 调拨前商品数量：{{ item.originNumber || 0 }}</view>
      <view v-else class="flex1"> 销售前商品数量：{{ item.originNumber || 0 }}</view>
    </view>
    <view class="m-b-16 flex fz-24 color-gray">
      <view v-if="item.type === 7" class="flex1"> 操作人：{{ item.creatorName }}</view>
      <view v-else class="flex1"> 商品数量：{{ item.changeNumber || 0 }}</view>
      <view v-if="item.type===7" class="flex1"> 修改后商品数量：{{ item.newNumber || 0 }}</view>
      <view  v-else-if="item.type===8 || item.type===18" class="flex1"> 补货后商品数量：{{ item.newNumber || 0 }}</view>
      <view v-else-if="item.type===9 || item.type===13"class="flex1"> 调拨后商品数量：{{ item.newNumber || 0 }}</view>
      <view v-else class="flex1"> 销售后商品数量：{{ item.newNumber || 0 }}</view>
    </view>
    <view v-if="item.type !== 7" class="m-b-16 flex fz-24 color-gray">
      <view class="flex1"> 订单编号：{{ item.typeId }}</view>
    </view>
    <view class="m-b-16 flex fz-24 color-gray">
      <view class="flex1"> 操作时间：{{ item.createTime }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'RecordItem',
    props: {
      item: {
        type: Object,
        default: () => {},
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    width: 750rpx;
    padding: 0rpx 32rpx 16rpx 32rpx;
    box-sizing: border-box;
    background-color: #ffffff;

    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 150%;
      width: 520rpx;
      font-weight: bold;
    }

    &-status {
      width: 128rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      background-color: #d3d4db;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #6f738a;
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
