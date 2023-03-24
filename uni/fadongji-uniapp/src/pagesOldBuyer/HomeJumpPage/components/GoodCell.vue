<template>
  <view class="cell flex">
    <image class="cell-img" src="/static/demo/rectangle.png" />
    <view class="flex1 m-l-16">
      <view>
        <text class="cell-type">{{ goodsCell.level }}类</text>
        <text class="m-t-8 lh48 h56 fz-b fz-32">{{ goodsCell.name }}</text>
      </view>
      <view class="flex cell-tips">
        <view class="m-r-20">{{ goodsCell.delivery }}</view>
        <view>库存 {{ goodsCell.inventory }}</view>
      </view>
      <view class="flex flex-vertical-c m-t-16">
        <view class="cell-cash">现金</view>
        <VoPointPrice
          :leftSize="14"
          :price="goodsCell.orderMoney"
          :showUnit="true"
          class="lh42"
          color="#E50012"
        />
      </view>
      <view class="flex flex-justify-r m-t-24">
        <view class="cell-cart" @click.stop="joinCart">加入购物车</view>
        <view class="cell-buy" @click.stop="buyNow">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodCell',
    props: {
      goodsCell: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 加入购物车
       */
      joinCart() {
        this.$emit('joinCart')
      },
      /**
       * 立即购买
       */
      buyNow() {
        this.$emit('buyNow')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cell {
    background: #fff;
    margin-bottom: 16rpx;
    padding: 24rpx 32rpx 32rpx;
    &-img {
      width: 128rpx;
      height: 128rpx;
    }
    &-type {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #ff5319;
      padding: 0 12rpx;
      background: #ffece5;
      border-radius: 8rpx;
      margin-bottom: 6rpx;
      margin-right: 8rpx;
    }
    &-tips {
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-45;
      margin-top: 8rpx;
    }
    &-cash {
      height: 28rpx;
      line-height: 28rpx;
      padding: 2rpx 4rpx;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
      background: #fdf2f3;
      font-size: 24rpx;
      color: #ec404d;
      margin-right: 8rpx;
    }
    &-cart {
      padding: 10rpx 32rpx;
      box-sizing: border-box;
      height: 56rpx;
      font-size: 24rpx;
      color: $v-c0-85;
      border: 2rpx solid #d3d4db;
      border-radius: 48rpx;
    }
    &-buy {
      padding: 10rpx 32rpx;
      box-sizing: border-box;
      height: 56rpx;
      font-size: 24rpx;
      color: #fff;
      background: #ff5319;
      border-radius: 64rpx;
      margin-left: 24rpx;
    }
  }
</style>
