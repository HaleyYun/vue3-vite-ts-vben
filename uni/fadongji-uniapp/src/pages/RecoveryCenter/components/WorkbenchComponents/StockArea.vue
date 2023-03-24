<template>
  <view class="area">
    <view class="area-bg">
      <view class="area-bg__title">进货区</view>
      <view class="area-bg__block">
        <view class="block-box bg-orange">
          <view class="block-box__name">收益</view>
          <view class="block-box__num">
            <text>20.21</text>
            <text class="fz-24 m-l-2">万</text>
          </view>
          <view
            class="block-box__button bg-orange"
            @click="goUrl('/pagesAgent/InvestmentList/InvestmentList')"
            >进货到店</view
          >
        </view>
        <view class="block-box bg-red">
          <view class="block-box__name">投放项目</view>
          <view class="block-box__num">126</view>
          <view
            class="block-box__button bg-red"
            @click="goUrl('/pagesAgent/InvestmentList/InvestmentList?type=all')"
            >投放全国</view
          >
        </view>
        <view class="block-box bg-blue">
          <view class="block-box__name">应收款</view>
          <view class="block-box__num">
            <text>11.2</text>
            <text class="fz-24 m-l-2">万</text>
          </view>
          <view
            class="block-box__button bg-blue"
            @click="goUrl('/pagesAgent/Order/InvestOrder/InvestOrderList')"
            >订单管理</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { checkIsApproveFn, linkToEasy } from "@/common/helper";

  export default {
    name: 'StockArea',
    methods:{
      goUrl(url){
        if(!checkIsApproveFn()){
          this.$emit('updateApprove',true)
          return
        }
        linkToEasy(url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .area {
    padding: 24rpx 0 32rpx;
    box-sizing: border-box;
    &-bg {
      background: #fff;
      border-radius: 16rpx;
      overflow: hidden;
      &__title {
        padding: 32rpx;
        box-sizing: border-box;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 48rpx;
      }
      &__block {
        display: grid;
        grid-template-columns: 200rpx 200rpx 200rpx;
        grid-column-gap: 18rpx;
        padding: 0 24rpx 32rpx;
        box-sizing: border-box;
        .block-box {
          width: 100%;
          height: 208rpx;
          border-radius: 16rpx;
          text-align: center;
          &.bg-orange {
            background: linear-gradient(180deg, #fce5c6 0%, #ffffff 100%);
          }
          &.bg-red {
            background: linear-gradient(180deg, #fedbd7 0%, #ffffff 100%);
          }
          &.bg-blue {
            background: linear-gradient(180deg, #b3daff 0%, #ffffff 100%);
          }
          &__name {
            line-height: 36rpx;
            font-size: 24rpx;
            color: $v-c0-65;
            margin-top: 20rpx;
          }
          &__num {
            line-height: 48rpx;
            font-weight: bold;
            font-size: 32rpx;
            color: $v-c0-85;
          }
          &__button {
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
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
  }
</style>
