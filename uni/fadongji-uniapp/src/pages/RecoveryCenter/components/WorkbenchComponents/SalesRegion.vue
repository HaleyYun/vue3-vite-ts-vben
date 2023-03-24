<template>
  <view class="area">
    <view class="area-title">销售区</view>
    <view class="area-bottom">
      <view class="area-bottom__block" v-for="(info, index) in salesRegion" :key="index" @click="nextPage(info)">
        <view class="block-left lh140 fz-b fz-32 color-block">{{ info.name }}</view>
        <image class="block-img" :src="info.srcImg" />
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn } from "@/common/helper";

  export default {
    name: 'SalesRegion',
    data() {
      return {
        salesRegion: [
          {
            name: '代客下单',
            srcImg: '/static/supplier/home/sales_region1.png',
            path: '/pagesAgent/SubstituteOrder/SubstituteOrder',
          },
          {
            name: '商品管理',
            srcImg: '/static/supplier/home/sales_region2.png',
            path: '/pagesAgent/GoodsManage/MyGoods',
          },
          {
            name: '应收账款',
            srcImg: '/static/supplier/home/sales_region3.png',
            path: '',
          },
          {
            name: '退货/退款',
            srcImg: '/static/supplier/home/sales_region4.png',
            path: '/pagesAgent/Order/ReturnExchange/ReturnExchange',
          },
          {
            name: '销售订单',
            srcImg: '/static/supplier/home/sales_region5.png',
            path: '/pagesAgent/Order/MarketOrder/MarkerOrderList',
          },
          {
            name: '售后专区',
            srcImg: '/static/supplier/home/after_hosting.png',
            path: '',
          },
        ],
      }
    },
    methods: {
      nextPage(info) {
        if(!checkIsApproveFn()){
          this.$emit('updateApprove',true)
          return
        }
        this.$linkToEasy(info.path)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .area {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    &-title {
      padding: 32rpx;
      box-sizing: border-box;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-bottom {
      padding: 0 24rpx 32rpx;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 310rpx 310rpx;
      grid-column-gap: 18rpx;
      grid-row-gap: 24rpx;
      &__block {
        position: relative;
        width: 310rpx;
        height: 140rpx;
        background: #fef9f1;
        border-radius: 16rpx;
        overflow: hidden;
        .block-left {
          margin-left: 24rpx;
        }
        .block-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 136rpx;
          height: 140rpx;
          z-index: 1;
        }
      }
    }
  }
</style>
