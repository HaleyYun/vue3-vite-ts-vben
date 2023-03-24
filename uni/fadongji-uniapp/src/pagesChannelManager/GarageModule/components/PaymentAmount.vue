<template>
  <view class="pay">
    <view class="flex flex-justify-between flex-vertical-c relative fz-28 lh42">
      <view class="color-block-45">累计实付金额</view>
      <view class="flex flex-vertical-c">
        <VoPointPrice
          :leftSize="20"
          :price="info.cumulativePaymentAmount"
          :right-size="12"
          :showUnit="true"
          class="pay-size m-r-8"
          color="#F20014"
        />
        <VoIcon
          :opacity="0.45"
          :size="20"
          color="#000000"
          name="account-question"
          @click="showPop = true"
        />
      </view>
      <!--      <view class="flex flex-vertical-c m-r-8" @click="fliterVisible = true">-->
      <!--        <view class="pay-screen">筛选</view>-->
      <!--        <VoIcon :size="20" name="select"></VoIcon>-->
      <!--      </view>-->
      <!--      <FliterPop-->
      <!--        ref="fliterPop"-->
      <!--        :visible="fliterVisible"-->
      <!--        @close="filterClose"-->
      <!--        @confirm="filterConfirm"-->
      <!--      />-->
    </view>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">已付现金总额</view>
      <VoPointPrice
        :leftSize="14"
        :price="info.cashPaymentAmount"
        :showUnit="true"
        class="pay-size"
        color="rgba(0, 0, 0, 0.45)"
      />
    </view>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">已还账期总额</view>
      <VoPointPrice
        :leftSize="14"
        :price="info.repayAmount"
        :showUnit="true"
        class="pay-size"
        color="rgba(0, 0, 0, 0.45)"
      />
    </view>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">未还账期总额</view>
      <VoPointPrice
        :leftSize="14"
        :price="info.notRepayAmount"
        :showUnit="true"
        class="pay-size"
        color="rgba(0, 0, 0, 0.45)"
      />
    </view>
    <view class="pay-overdue">
      逾期款：
      <VoPointPrice
        :leftSize="14"
        :price="info.overduePayment"
        :showUnit="true"
        class="pay-size"
        color="#F20014"
      />
    </view>
    <u-popup :show="showPop" bgColor="transparent" closeOnClickOverlay mode="center">
      <view class="px-64 color-block m-55 bg-white b-radius-16 fz-32">
        <view class="text-center m-t-64 m-b-32">账款指标说明</view>
        <view class="m-b-64">累计实付金额，是指已还账期金额+已付现金金额的总合。</view>
        <view class="m-b-64"
          >剩余账期应还，是指当前修理厂账期订单未还款的总额（包括订单中部分商品未还款）。</view
        >
        <view class="m-b-64"
          >已还账期金额，是指当前修理厂账期订单已还款的总金额（包括订单中部分商品已还款）。</view
        >
        <view class="m-b-64">已付现金总额，是指当前修理厂现金支付订单的总额。</view>
        <view class="text-center p-20 border-top" @click="showPop = false">知道了</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  // import FliterPop from './FliterPop'

  export default {
    name: 'PaymentAmount',
    // components: { FliterPop },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        fliterVisible: false, // 筛选弹框
        showPop: false,
      }
    },
    methods: {
      //筛选弹框关闭
      filterClose() {
        this.fliterVisible = false
      },
      //筛选弹框确认
      filterConfirm(resultData) {
        this.$emit('confirm', resultData)
        this.fliterVisible = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pay {
    padding: 32rpx 32rpx 24rpx;
    box-sizing: border-box;
    background: #fff;
    &-title {
      margin-right: 8rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    &-screen {
      margin-right: 8rpx;
      line-height: 40rpx;
      font-size: 26rpx;
      color: $v-c0-45;
    }
    &-size {
      line-height: 60rpx;
    }
    &-overdue {
      margin-top: 8rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #f20014;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
