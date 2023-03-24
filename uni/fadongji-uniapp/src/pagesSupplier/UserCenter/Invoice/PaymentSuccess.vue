<template>
  <view class="cashier">
    <VoNav is-fixed is-have-more title="收银台">

    </VoNav>
    <view v-if="status === '4'">
      <image class="cashier-img" src="/static/common/success.png" />
      <view class="cashier-tips">还款成功</view>
      <view class="cashier-pay">
        <text class="cashier-pay__state">已支付</text>
        <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />
      </view>
      <EraButton circle text="完成" @click="goOrderList" />
    </view>
    <!--    <view v-else-if="status === 3">-->
    <!--      <image class="cashier-img" src="/static/common/failure.png" />-->
    <!--      <view class="cashier-tips">支付失败</view>-->
    <!--      <view class="cashier-pay">-->
    <!--        <text class="cashier-pay__state">待支付</text>-->
    <!--        <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />-->
    <!--      </view>-->
    <!--      <EraButton circle text="重新支付" @click="goOrderList" />-->
    <!--    </view>-->
    <!--    <view v-else-if="status === 99">-->
    <!--      <image class="cashier-img" src="/static/common/failure.png" />-->
    <!--      <view class="cashier-tips">待支付</view>-->
    <!--      <view class="cashier-pay">-->
    <!--        <text class="cashier-pay__state">待支付</text>-->
    <!--        <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />-->
    <!--      </view>-->
    <!--      <EraButton circle text="重新支付" @click="goOrderList" />-->
    <!--    </view>-->
  </view>
</template>

<script>
  export default {
    name: 'PaymentSuccess',
    data() {
      return {
        status: '4',
        price: '',
        type: '', // agent 服务商   garage 汽修厂
      }
    },
    methods: {
      /**
       * 去订单列表
       */
      goOrderList() {
        if (this.type == 'agent') {
          uni.redirectTo({
            url: '/pagesAgent/Order/InvestOrder/InvestOrderList',
          })
        } else if ((this.type = 'garage')) {
          uni.redirectTo({
            url: '/pagesGarage/InstallOrder/InstallOrderList',
          })
        } else if ((this.type = 'oldBuyer')) {
          uni.redirectTo({
            url: '/pages/OldBuyerCenter/OldBuyerTabbar?tabbarVal=1',
          })
        }
      },
    },
    // onLoad(options) {
    //   console.log(options, '11111111')
    //   this.price = options.price
    //   this.status = options.status
    //   this.type = options.type
    // },
  }
</script>

<style lang="scss" scoped>
  .cashier {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    text-align: center;
    background: #fff;
    padding-top: 128rpx;
    box-sizing: border-box;
    &-img {
      width: 176rpx;
      height: 176rpx;
      margin-bottom: 20rpx;
    }
    &-tips {
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      margin-bottom: 52rpx;
    }
    &-pay {
      margin-bottom: 104rpx;
      &__state {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
        margin-right: 16rpx;
      }
    }
  }
</style>
