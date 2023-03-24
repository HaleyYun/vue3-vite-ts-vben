<template>
  <view class="pay">
    <view class="flex flex-justify-between flex-vertical-c relative">
      <view class="flex flex-vertical-c">
        <view class="pay-title">累计实付金额</view>
        <VoIcon :opacity="0.45" :size="20" color="#000000" name="account-question"></VoIcon>
      </view>
      <view class="flex flex-vertical-c m-r-8" @click="fliterVisible = true">
        <view class="pay-screen">筛选</view>
        <VoIcon :size="20" name="select"></VoIcon>
      </view>
      <FliterPop
        ref="fliterPop"
        :visible="fliterVisible"
        @close="filterClose"
        @confirm="filterConfirm"
      />
    </view>
    <VoPointPrice
      :leftSize="20"
      :showUnit="true"
      class="pay-size"
      color="#FF5319"
      price="2,710.00"
    ></VoPointPrice>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">已付现金总额</view>
      <view class="color-block">100,199,109.00元</view>
    </view>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">已还账期总额</view>
      <view class="color-block">100,199,109.00元</view>
    </view>
    <view class="flex flex-vertical-c flex-justify-between m-t-16 fz-28 lh42">
      <view class="color-block-45">未还账期总额</view>
      <view class="color-block">100,199,109.00元</view>
    </view>
    <view class="pay-overdue">逾期款：12000.00元</view>
  </view>
</template>

<script>
  import FliterPop from './FliterPop'

  export default {
    name: 'PaymentAmount',
    components: { FliterPop },
    data() {
      return {
        fliterVisible: false, // 筛选弹框
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
      color: #ff5319;
      text-align: right;
    }
  }
</style>
