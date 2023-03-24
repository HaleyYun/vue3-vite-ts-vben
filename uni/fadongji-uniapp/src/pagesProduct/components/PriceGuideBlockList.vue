<template>
  <view class="list">
    <view v-if="guideType === 'goods'" class="list-goods">
      <view class="flex flex-justify-between flex-content-center">
        <view class="list-goods__name overTwoEllipsis">
          <text v-show="guideList.categoryType" class="good-tips font-shu-hei-ti">{{
            guideList.categoryType
          }}</text>
          {{ guideList.name }}
          <!--<text class="blue">B15荣光</text>-->
          <!--发动机-->
        </view>
      </view>

      <view class="m-t-8">
        <view class="list-goods__store">{{ guideList.shopName ? guideList.shopName : '' }}</view>
        <view class="flex flex-vertical-c m-t-16">
          <view class="flex flex-content-center flex-vertical-c">
            <view class="list-goods__block">现金价</view>
            <VoPointPrice
              :leftSize="14"
              :price="guideList.cashPrice"
              :right-size="13"
              :show-unit="false"
              class="lh44"
              color="#F20014"
              display="inline-block"
            />
          </view>
          <view v-if="guideList.accountPrice" class="list-goods__label flex-vertical-c">
            <view class="list-goods__block">{{ guideList.accountPeriodDays }}天账期</view>

            <VoPointPrice
              :leftSize="14"
              :price="guideList.accountPrice"
              :right-size="13"
              :show-unit="false"
              class="lh44"
              color="#F20014"
              display="inline-block"
            />
          </view>
        </view>
      </view>
    </view>
    <view v-else-if="guideType === 'warehouse'" class="list-warehouse flex flex-justify-between">
      <view class="list-warehouse__name">{{
        guideList.warehouseName ? guideList.warehouseName : ''
      }}</view>
      <view class="list-warehouse__sales">近30天销量 {{ guideList.salesCount }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PriceGuideBlockList',
    props: {
      guideType: {
        type: String,
        default: 'warehouse', // goods商品时的样式 warehouse仓库时的样式
      },
      guideList: {
        type: Object,
        default: {
          name: '', // 店铺名称
          cashPrice: '', // 价格
          warehouseName: '', // 仓库名称
          salesVolume: '', // 销量
        },
      },
    },
    methods: {
      cashPrice(price) {
        if (!this.$vocenApi.Pattern.isFloatName(price)) {
          return '.00元'
        } else {
          return '元'
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .flex-content-center {
    align-items: center;
  }
  .list {
    background: #ffffff;
    padding: 24rpx 0;
    margin: 0 32rpx;
    border-top: 2rpx solid $v-bg-light;

    &:first-child {
      border-top: none;
    }

    &-goods {
      &__name {
        width: 100%;
        line-height: 48rpx;
        overflow: hidden;
        font-size: 32rpx;
        color: $v-c0-85;
        font-weight: bold;

        .blue {
          color: $v-tip;
        }
      }
      .good-tips {
        line-height: 40rpx;
        font-size: 32rpx;
        color: #f20014;
        margin-right: 8rpx;
      }
      &__store {
        width: 440rpx;
        overflow: hidden;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-65;
      }

      &__integer {
        max-width: 144rpx;
        height: 72rpx;
        line-height: 72rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $color-primary-red;
      }
      &__block {
        color: $v-c0-65;
        font-size: 24rpx;
        margin-right: 8rpx;
      }

      &__decimal {
        max-width: 62rpx;
        height: 72rpx;
        line-height: 72rpx;
        font-weight: bold;
        font-size: 24rpx;
        color: $color-primary-red;
        text-align: right;
      }

      &__label {
        display: flex;
        margin-left: 48rpx;

        .label-right {
          font-weight: 500;
          font-size: 28rpx;
          color: $color-primary-red;
        }
      }
    }

    &-warehouse {
      height: 48rpx;
      line-height: 150%;
      font-size: 32rpx;

      &__name {
        width: 256rpx;
        overflow: hidden;
        color: $v-c0-85;
      }

      &__sales {
        width: 430rpx;
        color: $v-c0-65;
        text-align: right;
      }
    }
  }
</style>
