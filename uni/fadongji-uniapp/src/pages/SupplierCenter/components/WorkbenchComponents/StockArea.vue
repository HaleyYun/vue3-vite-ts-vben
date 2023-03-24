<template>
  <view class="area">
    <view class="area-bg">
      <view class="area-bg__title">进货区</view>
      <view class="area-bg__block">
        <view class="block-box bg-orange">
          <view @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/PaymentOrder')">
            <view class="block-box__num">
              <text v-if="info.wholesalePay || info.wholesalePay === 0">
                {{
                  info.wholesalePay >= 10000
                    ? (info.wholesalePay / 10000).toFixed(2)
                    : info.wholesalePay
                }}
              </text>
              <text v-else>--</text>
              <text class="fz-24 m-l-2">{{ info.wholesalePay >= 10000 ? '万' : '元' }}</text>
            </view>
            <view class="block-box__name">应付款</view>
          </view>
        </view>
        <view class="block-box bg-red">
          <view @click="goUrl('/pagesAgent/MyInvest/MyInvest')">
            <view class="block-box__num">{{ info.wholesaleProject || 0 }}</view>
            <view class="block-box__name">转投项目</view>
          </view>
        </view>
        <view class="block-box bg-blue">
          <view @click="goAccountBillFn">
            <view class="block-box__num">
              <text v-if="info.wholesaleRevenue || info.wholesaleRevenue === 0">
                {{
                  info.wholesaleRevenue >= 10000
                    ? (info.wholesaleRevenue / 10000).toFixed(2)
                    : info.wholesaleRevenue
                }}
              </text>
              <text v-else>--</text>
              <text class="fz-24 m-l-2">{{ info.wholesaleRevenue >= 10000 ? '万' : '元' }}</text>
            </view>
            <view class="block-box__name">收益</view>
          </view>
        </view>
      </view>
      <view class="area-bg__box m-t-16">
        <view
          class="box-button bg-orange"
          @click="goUrl('/pagesAgent/InvestmentList/InvestmentList')"
          >进货到店
        </view>
        <view
          class="box-button bg-red"
          @click="goUrl('/pagesAgent/InvestmentList/InvestmentList?type=all')"
          >投放全国
        </view>
        <view
          class="box-button bg-blue"
          @click="goUrl('/pagesAgent/Order/InvestOrder/InvestOrderList')"
          >订单管理
        </view>
      </view>
      <view class="area-bg__box" v-if="isShowOrder">
<!--        <view-->
<!--          class="box-button bg-red"-->
<!--          @click="goUrl('/pagesAgent/Order/ReturnExchange/ReturnExchange')"-->
<!--          >退货/退款-->
<!--        </view>-->
        <view v-if="isShowOrder" class="box-button bg-red" @click="goDistributionOrder">寄售订单 </view>
        <view v-else  class="box-button bg-transparent"></view>
        <view   class="box-button bg-transparent" ></view>
        <view   class="box-button bg-transparent" ></view>
        <!--        <view class="box-button bg-orange" @click="goUrl('')">易券大厅 </view>-->
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn, linkToEasy } from '@/common/helper'

  export default {
    name: 'StockArea',
    props: {
      info: {
        type: Object,
        default() {
          return {
            isShowOrder:false,
            wholesalePay: '',
            wholesaleProject: '',
            wholesaleRevenue: '',
          }
        },
      },
    },
    data(){
      return {
        isShowOrder:false
      }
    },
    created() {
      this.$VoHttp
          .apiCompanyBindingInviterExist()
          .then((res) => {
            this.isShowOrder=res.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
    methods: {
      goAccountBillFn() {
        let ids = JSON.stringify([2, 3])
        this.$linkToEasy(`/pagesSupplier/UserCenter/Invoice/AccountBill?ids=${ids}`)
      },
      goUrl(url) {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        linkToEasy(url)
      },
      /**
       * 寄售订单
       */
      goDistributionOrder() {
        this.$linkToEasy('/pagesAgent/Order/DistributionOrder/DistributionOrderList')

      },
    },
  }
</script>

<style lang="scss" scoped>
  .area {
    padding-bottom: 32rpx;
    box-sizing: border-box;

    &-bg {
      background: #fff;
      border-radius: 16rpx;
      overflow: hidden;
      padding-bottom: 52rpx;

      &__title {
        padding: 32rpx;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 48rpx;
      }

      &__block {
        // display: grid;
        // grid-template-columns: 200rpx 200rpx 200rpx;
        // grid-column-gap: 18rpx;
        display: flex;
        align-items: center;
        padding: 0 24rpx;
        box-sizing: border-box;

        .block-box {
          width: 100%;
          height: 140rpx;
          border-radius: 16rpx;
          margin-right: 18rpx;
          padding: 20rpx 24rpx;
          box-sizing: border-box;

          &.bg-orange {
            // background: linear-gradient(180deg, #fce5c6 0%, #ffffff 100%);
            background: linear-gradient(180deg, #fce5c6 0%, #ffffff 182.86%);
          }

          &.bg-red {
            // background: linear-gradient(180deg, #fedbd7 0%, #ffffff 100%);
            background: linear-gradient(180deg, #fedbd7 0%, #ffffff 133.04%);
          }

          &.bg-blue {
            // background: linear-gradient(180deg, #b3daff 0%, #ffffff 100%);
            background: linear-gradient(180deg, #b3daff 0%, #ffffff 158.04%);
            margin-right: 0;
          }
          &.bg-transparent {
            background: transparent;
            margin-right: 0;
          }

          &__name {
            line-height: 36rpx;
            font-size: 24rpx;
            color: $v-c0-65;
            margin-top: 10rpx;
          }

          &__num {
            line-height: 48rpx;
            font-weight: bold;
            font-size: 32rpx;
            color: $v-c0-85;
          }
        }
      }
      &__box {
        display: flex;
        padding: 0 20rpx;
        .box-button {
          width: 160rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          font-weight: bold;
          font-size: 28rpx;
          color: #ffffff;
          border-radius: 200rpx;
          margin: 24rpx auto 0;

          &.bg-orange {
            text-shadow: 0rpx 2rpx 2rpx rgba(255, 106, 49, 0.25);
            background: linear-gradient(180deg, #ff7246 0%, #fbd18c 186.67%);
          }

          &.bg-red {
            text-shadow: 0rpx 2rpx 2rpx rgba(230, 46, 37, 0.25);
            background: linear-gradient(180deg, #ff5252 -15%, #ffd8c1 175.17%);
          }

          &.bg-blue {
            text-shadow: 0rpx 2rpx 2rpx rgba(0, 104, 192, 0.25);
            background: linear-gradient(180deg, #1c84fe -36.67%, #8bdbfd 151.67%);
          }
        }
      }
    }
  }
</style>
