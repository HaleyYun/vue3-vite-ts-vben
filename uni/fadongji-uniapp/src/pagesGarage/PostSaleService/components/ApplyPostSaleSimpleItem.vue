<template>
  <view class="item">
    <view>
      <view class="item_top flex flex-justify-between">
        <view>
          <text>服务单号：</text>
          <text>{{ orderDetail.newOrderInfo.id }}</text>
        </view>
        <view class="black65">{{ orderDetail.newOrderInfo.statusName }}</view>
      </view>
      <template
        v-if="orderDetail.newOrderInfo.goodsDetail && orderDetail.newOrderInfo.goodsDetail.length"
      >
        <GoodsItemCardNew
          v-for="(item, index) in orderDetail.newOrderInfo.goodsDetail"
          :goodsDetail="item"
          :key="index"
        />
      </template>
    </view>
  </view>
</template>

<script>
  import GoodsItemCardNew from './GoodsItemCardNew.vue'
  export default {
    name: 'ApplyPostSaleSimpleItem',
    components: {
      GoodsItemCardNew,
    },
    props: {
      orderDetail: {
        type: Object,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    background-color: #fff;
    padding: 24rpx 32rpx;
    margin: 16rpx 0;
    .item_top {
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
