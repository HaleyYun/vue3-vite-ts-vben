<template>
  <view class="product_">
    <view v-for="(item, index) in data" :key="index" class="product__price">
      <VoPointPrice :left-size="16" :price="item.price || 0" :show-unit="true" />
      <view class="fz-24">{{ item.level }}类价格</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProductTypes',
    props: {
      data: {
        type: Array,
        default() {
          return []
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product_ {
    display: flex;
    align-items: center;
    color: #f20014;
    .product__price {
      text-align: center;

      > :nth-child(1) {
        line-height: 48rpx;
      }

      > :nth-child(2) {
        width: 100rpx;
        border: 1rpx solid #fa3243;
        background-color: #ffe5e8;
        border-radius: 4rpx;
        margin: 10rpx auto;
      }
    }
    > :nth-child(2) {
      margin: 0 52rpx 0 92rpx;
    }
  }
</style>
