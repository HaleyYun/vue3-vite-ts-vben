<template>
  <view class="storeInfo" @click="toShopPage">
    <view class="storeInfo-title">商家信息</view>
    <view class="storeInfo-content flex flex-vertical-c">
      <image :src="(info.storeUrl || info.logoUrl) + '&type=1'" class="storeInfo-content__logo" />
      <view class="flex1">
        <view class="storeInfo-content__title">{{ info.name }}</view>
        <view class="flex">
          <view class="storeInfo-content__des flex">
            <view>商品</view>
            <view class="score">{{ info.goodsScore || '--' }}</view>
          </view>

          <view class="storeInfo-content__des flex storeInfo-content__padingLeft">
            <view>服务</view>
            <view class="score">{{ info.serviceScore || '--' }}</view>
          </view>

          <view class="storeInfo-content__des flex storeInfo-content__padingLeft">
            <view>物流</view>
            <view class="score">{{ info.logisticsScore || '--' }}</view>
          </view>
        </view>
      </view>
      <VoIcon :opacity="0.45" :size="20" color="#000" name="right-arrow" />
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
    methods: {
      toShopPage() {
        this.$emit('toShopPage')
        // this.$linkToEasy('/pagesAgent/InvestmentList/ShopDetails?companyId='+this.info.shopId)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .storeInfo {
    padding: 24rpx 32rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;

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
