<template>
  <view class="bank">
    <view class="flex">
      <image :src="bankCardList.bankLogo || ''" class="bank-img" />
      <view class="flex1">
        <view class="bank-name">{{ bankCardList.bankName }}</view>
        <view class="bank-name m-t-8">{{ bankCardList.bankCardNo }}</view>
      </view>
      <view
        v-if="bankCardList.bankCardPro !== 1 && userInfo.isAdmin"
        class="flex-justify-r flex"
        @click="unBundling"
      >
        <image class="un-bind" src="/static/icons/un_bind_bank.png" />
        <view class="fz-28 m-l-8 color-block-65">解绑</view>
      </view>
    </view>
    <view class="bank-user m-t-16">
      {{ bankCardList.bankCardPro === 0 ? bankCardList.fullName : bankCardList.legalName }}
    </view>
  </view>
</template>

<script>
  export default {
    name: 'BankCardList',
    props: {
      /**
       * bankLogo 银行logo
       * bankName 银行名称
       * cardNumber 银行卡号
       * user 用户
       */
      bankCardList: {
        type: Object,
        default: {},
      },
    },
    methods: {
      /**
       * 银行卡解绑
       */
      unBundling() {
        this.$emit('unBundling')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bank {
    width: 750rpx;
    margin-top: 16rpx;
    padding: 32rpx;
    background: #ffffff;
    box-sizing: border-box;
    &-img {
      width: 72rpx;
      height: 72rpx;
      margin-top: 16rpx;
      margin-right: 22rpx;
    }
    &-name {
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
    }
    &-user {
      width: 590rpx;
      height: 42rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-65;
      margin-left: 96rpx;
    }
  }
  .un-bind {
    width: 40rpx;
    height: 40rpx;
  }
</style>
