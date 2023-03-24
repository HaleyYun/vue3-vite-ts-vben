<template>
  <view class="product">
    <view class="product-title">项目进度</view>
    <view class="product-info">商品名称：{{ info.goodsName }}</view>
    <view class="product-content">
      <view class="product-content__item">
        <!-- 已投量暂时没有		-->
        <view class="price"> {{ info.alreadyInvestedNum || 0 }}/{{ info.totalInvestment }}</view>
        <view class="title"> 已售量/总量</view>
      </view>
      <view class="product-content__item">
        <view class="price"> {{ info.totalInvestment - info.alreadyInvestedNum }}</view>
        <view class="title"> 剩余可批量</view>
      </view>
      <view class="product-content__item">
        <view class="price"> <text class="price-text">约</text>{{ info.rol }}%</view>
        <view class="title"> 回报率</view>
      </view>
      <view class="product-content__item text-center">
        <VoPointPrice class="lh42" :leftSize="14" :price="info.cashPrice" color="#FF5319" />
        <!--        <view class="price"> {{ info.cashPrice }}元</view>-->
        <view class="title"> 现金价</view>
      </view>
      <view v-if="info.accountPrice" class="product-content__item text-center">
        <VoPointPrice class="lh42" :leftSize="14" :price="info.accountPrice" color="#FF5319" />
        <!--        <view class="price"> {{ info.accountPrice }}元</view>-->
        <view class="title"> {{ info.accountPeriodDays }}天账期</view>
      </view>
      <view v-else class="product-content__item">
        <view class="price">----</view>
        <view class="title">账期价</view>
      </view>
      <view class="product-content__item">
        <view class="price"> {{ info.warehouseName }}</view>
        <view class="title"> 发货仓库</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProductInfo',
    props: {
      productData: {
        type: Object,
        productData: {},
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product {
    padding: 24rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;

    &-title {
      color: $v-c0-85;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-info {
      margin-top: 16rpx;
      color: $v-c0-85;
      font-size: 26rpx;
    }

    &-content {
      margin-top: 16rpx;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: 16rpx;
      grid-column-gap: 20rpx;

      &__item {
        background-color: $v-bg-light;
        border-radius: 8rpx;
        padding: 8rpx 0;
        box-sizing: border-box;

        .price {
          color: $v-tags;
          font-weight: bold;
          font-size: 28rpx;
          text-align: center;
          line-height: 42rpx;
          &-text {
            font-weight: 400;
            font-size: 24rpx;
          }
        }

        .title {
          margin-top: 8rpx;
          font-size: 24rpx;
          text-align: center;
          color: $v-c0-65;
          line-height: 36rpx;
        }
      }
    }
  }
</style>
