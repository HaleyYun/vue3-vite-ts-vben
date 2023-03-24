<template>
  <view v-if="info.goodsGoodsShopInfoVO" class="storeInfo">
    <view class="storeInfo-title">商家信息</view>
    <view class="storeInfo-content flex">
      <image
        v-if="info.goodsGoodsShopInfoVO.storeUrl || info.goodsGoodsShopInfoVO.logoUrl"
        class="storeInfo-content__logo"
        :src="info.goodsGoodsShopInfoVO.storeUrl || info.goodsGoodsShopInfoVO.logoUrl"
      />
      <image v-else class="storeInfo-content__logo" src="/static/logo-2.png" />
      <view>
        <view class="storeInfo-content__title"> {{ info.goodsGoodsShopInfoVO.name }}</view>
        <view class="flex">
          <view class="storeInfo-content__des flex">
            <view>商品</view>
            <view class="score"> {{ info.goodsGoodsShopInfoVO.goodsScore || '--' }}</view>
          </view>

          <view class="storeInfo-content__des flex storeInfo-content__padingLeft">
            <view>服务</view>
            <view class="score"> {{ info.goodsGoodsShopInfoVO.serviceScore || '--' }}</view>
          </view>

          <view
            v-if="storeData.logisticsScore"
            class="storeInfo-content__des flex storeInfo-content__padingLeft"
          >
            <view>物流</view>
            <view class="score"> {{ info.goodsGoodsShopInfoVO.logisticsScore || '--' }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'StoreInfo',
    props: {
      storeData: {
        type: Object,
        storeData: {},
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
  .storeInfo {
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

      &__logo {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }

      &__title {
        color: $v-c0-85;
        font-weight: bold;
        font-size: 28rpx;
      }

      &__des {
        color: $v-c0-65;
        font-size: 24rpx;
        margin-top: 16rpx;

        .score {
          margin-left: 8rpx;
          color: $color-primary-red;
        }
      }

      &__padingLeft {
        margin-left: 20rpx;
      }
    }
  }
</style>
