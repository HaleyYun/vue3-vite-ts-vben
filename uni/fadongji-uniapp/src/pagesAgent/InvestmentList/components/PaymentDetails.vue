<template>
  <view class="details">
    <view class="details-title">账期应付款明细</view>
    <view class="details-total">
      <view class="flex">
        <text class="fz-b">本次订单账期总额：</text>
        <VoPointPrice :price="info.paymentPrice || 0" :show-unit="true" />
      </view>
      <view class="flex flex-vertical-c flex-justify-between m-t-32">
        <view>还款日期</view>
        <view>预计还款金额</view>
      </view>
      <block v-for="(item, index) in timeList" :key="index">
        <view class="flex flex-vertical-c flex-justify-between m-t-16">
          <view>{{ item.time }}</view>
          <VoPointPrice :price="item.price || 0" :show-unit="true" color="#3F3F3F" />
        </view>
      </block>
    </view>
    <view class="details-bottom p-b-safe-area">
      <EraButton circle @click="confirmFn" />
    </view>
  </view>
</template>

<script>
  import { decimalMulFn } from '../../../common/helper'

  export default {
    name: 'PaymentDetails',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
      goodData: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        timeList: [],
      }
    },
    mounted() {
      console.log('info', this.info)
      console.log('goodData', this.goodData)
      this.timeList = []
      this.goodData.forEach((item) => {
        if (!item.isCash) {
          let time = this.$vocenApi.VoUtils.timeFormat(
            new Date().getTime() + Number(item.accountPeriodTime) * 60 * 60 * 24 * 1000,
            'yyyy-mm-dd',
          )
          let price = this.decimalMulFn(item.accountPrice, item.investmentNum)
          let param = { time: time, price: price }
          this.timeList.push(param)
        }
      })
    },
    methods: {
      confirmFn() {
        this.$emit('confirm')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    &-title {
      text-align: center;
      margin-top: 40rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-total {
      margin: 32rpx 32rpx 24rpx 32rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
