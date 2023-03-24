<template>
  <view class="account">
    <VoNav is-have-more title="我的账户" />

    <view class="account-info">
      <view class="account-info__title">
        <view class="fz-28 color-block fz-b m-r-8 lh42">我的账户</view>
        <VoIcon
          v-if="showEye"
          :opacity="0.65"
          :size="20"
          color="#000"
          name="eyes-open"
          @click="setEye"
        />
        <VoIcon v-else :opacity="0.65" :size="20" color="#000" name="eyes-down" @click="setEye" />
      </view>
      <view class="account-info__content">
        <view class="fz-28 color-block lh150 fz-b m-b-4">可提现金额</view>
        <view class="flex flex-justify-between flex-vertical-b">
          <view v-if="!showEye" class="content-star">***</view>
          <VoPointPrice v-else :left-size="20" :price="info.canWithdrawAmount" :right-size="12" />
          <EraButton size="btn-mini" @click="withdraw">提现</EraButton>
        </view>
        <view class="line-bg m-t-16 h2 w-full" />
        <view
          class="flex flex-vertical-c h110"
          @click="$linkToEasy('/pagesSupplier/UserCenter/MyAccount/AmountSettled')"
        >
          <view class="color-block fz-b fz-28">待结算金额</view>
          <view class="m-l-auto flex flex-vertical-c">
            <view class="fz-28 color-block-65 m-r-8"
              >{{ showEye ? info.awaitSettlementAmount : '***' }} 元</view
            >
            <VoIcon :size="20" name="right-arrow" />
          </view>
        </view>
        <view class="line-bg h2 w-full" />
        <view class="flex flex-vertical-c h110">
          <view class="color-block fz-b fz-28">保证金</view>
          <view class="m-l-auto flex flex-vertical-c">
            <view class="fz-28 color-block-65 m-r-8">{{ showEye ? marginTotal : '***' }}元</view>
          </view>
        </view>
        <!--        <view class="h8" />-->
      </view>
    </view>
    <view class="account-function flex flex-vertical-c flex-wrap">
      <view
        class="w120 m-r-52 m-b-48 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/AccountReceivable')"
      >
        <VoIcon :size="60" class="icon-item" name="accounts-receivable" />
        <view class="text-center fz-24 color-block-65">应收账款</view>
      </view>
      <view
        class="w120 m-r-52 m-b-48 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/AccountBill')"
      >
        <VoIcon :size="60" class="icon-item" name="account-details" />
        <view class="text-center fz-24 color-block-65">账户明细</view>
      </view>
      <view
        class="w120 m-r-52 m-b-48 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceList')"
      >
        <VoIcon :size="60" class="icon-item" name="invoice" />
        <view class="text-center fz-24 color-block-65">开发票</view>
      </view>
      <view
        class="w120 m-r-52 m-b-48 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceHistory')"
      >
        <VoIcon :size="60" class="icon-item" name="invoicing-record" />
        <view class="text-center fz-24 color-block-65">开票记录</view>
      </view>
      <view
        class="w120 m-r-52 m-b-48 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('/pagesAgent/Order/StatementOrder/StatementList')"
      >
        <VoIcon :size="60" class="icon-item" name="statements" />
        <view class="text-center fz-24 color-block-65">结算单</view>
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :show="showWindow"
      :showConfirmButton="false"
      :title="title"
      cancelText="我知道了"
      showCancelButton
      @cancel="showWindow = false"
    >
      <text class="fz-32 color-block">非主账户，暂无提现功能</text>
    </VoModal>
  </view>
</template>

<script>
  import { linkToEasy } from '@/common/helper'

  export default {
    name: 'MyAccount',
    data() {
      return {
        info: '',
        marginTotal: 0, // 保证金
        showEye: false,
        showWindow: false,
        title: '提示',
      }
    },
    methods: {
      /**
       * 设置是否可见
       */
      setEye() {
        this.showEye = !this.showEye
        console.log('showEye = ', this.showEye)
      },
      initFn() {
        let param = {
          // endTime: this.endTime,
          // startTime: this.startTime,
        }
        this.$VoHttp.USER.apiAccountDetailsMain(param)
          .then((res) => {
            this.info = res.data
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      getMarginTotal() {
        this.$VoHttp
          .apiFinanceMarginTotal()
          .then((res) => {
            this.marginTotal = +res.data || 0
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
      },
      async withdraw() {
        try {
          await this.$VoHttp.apiExtraWithdrawCheckApply().then((res) => {
            this.showWindow = !res.data
            if (res.data) {
              linkToEasy('/pagesSupplier/UserCenter/MyAccount/GoWithdrawal')
            }
          })
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
    },
    onLoad() {
      this.getMarginTotal()
    },
    onShow() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .account {
    width: 750rpx;
    min-height: 100vh;
    background: #ffffff;
    box-sizing: border-box;
    padding-top: 32rpx;

    &-info {
      width: 686rpx;
      background: #ffffff;
      /* Shadows阴影 */
      box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
      border-radius: 8rpx;
      margin: 0rpx auto 48rpx;
      &__title {
        //height: 100rpx;
        padding: 30rpx 32rpx;
        background-image: url('/static/supplier/account_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
      &__content {
        width: 100%;
        padding: 24rpx;
        box-sizing: border-box;
        .content-star {
          color: $v-error;
          font-size: 40rpx;
          font-weight: 600;
        }
      }
    }
    &-function {
      padding-left: 56rpx;
    }

    .icon-item {
      margin: 0rpx auto 8rpx;
      display: block;
    }
  }
</style>
