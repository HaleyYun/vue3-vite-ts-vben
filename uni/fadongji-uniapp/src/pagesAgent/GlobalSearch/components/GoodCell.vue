<template>
  <view class="cell flex">
    <image class="cell-img" src="/static/demo/rectangle.png" />
    <view class="flex1 m-l-16">
      <view>
        <text class="cell-type">原厂正品机</text>
        <text class="m-t-8 lh48 h56 fz-b fz-32">{{ goodsCell.name }}</text>
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
      <view class="m-t-16 flex flex-vertical-c">
        <view class="cell-tips">安装 +100元</view>
        <view class="cell-tips m-l-16">以旧换新 -350元</view>
        <view class="cell-tips m-l-16">定制 +100元</view>
      </view>
<!--      <view class="m-t-24 fz-24 color-block-45 lh36">郑州发货 预计12小时内送达</view>-->
      <view class="m-t-24 fz-24 color-block-45 lh36">郑州发货</view>
      <view class="flex flex-justify-r m-t-32">
        <view class="cell-cart" @click.stop="installation">安装指导</view>
        <view class="cell-cart" @click.stop="technicalSupport">技术支持</view>
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
       * 安装指导
       */
      installation() {
        this.$emit('installation')
      },
      /**
       * 技术支持
       */
      technicalSupport() {
        this.$emit('technicalSupport')
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
      font-size: 24rpx;
      color: #ff5319;
      padding: 2rpx 12rpx;
      background: #ffece5;
      border-radius: 24rpx;
      margin-bottom: 6rpx;
      margin-right: 8rpx;
    }
    &-tips {
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-85;
      padding: 0 6rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 4rpx;
      background: #f6f7f8;
      box-sizing: border-box;
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
      margin-left: 16rpx;
    }
    &-buy {
      padding: 10rpx 32rpx;
      box-sizing: border-box;
      height: 56rpx;
      font-size: 24rpx;
      color: #ff5319;
      background: #fff;
      border: 2rpx solid #ff5319;
      border-radius: 64rpx;
      margin-left: 16rpx;
    }
  }
</style>
