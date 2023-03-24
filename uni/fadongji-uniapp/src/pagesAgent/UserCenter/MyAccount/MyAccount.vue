<template>
  <view class="account">
    <VoNav is-have-more title="我的账户" />

    <view class="account-info">
      <image class="account-info__bg" src="/static/garage/home/account_bg.png" />
      <view class="account-info__title" @click.stop="setEye">
        <view class="fz-28 color-block fz-b">我的账户</view>
        <VoIcon
          v-if="showEye"
          :opacity="0.65"
          :size="20"
          class="m-l-8"
          color="#000"
          name="eyes-open"
        />
        <VoIcon v-else :opacity="0.65" :size="20" class="m-l-8" color="#000" name="eyes-down" />
      </view>
      <view class="account-info__content">
        <view class="fz-28 color-block lh150 fz-b m-b-4">可提现金额</view>
        <view class="flex flex-justify-between flex-vertical-b">
          <VoPointPrice
            v-if="showEye"
            :left-size="20"
            :price="info.canWithdrawAmount"
            :right-size="12"
          />
          <view v-else class="content-star">***</view>
          <EraButton size="btn-mini" @click="withdraw">提现</EraButton>
        </view>
        <view class="line-bg m-t-16 h2 w-full" />
        <view
          class="flex flex-vertical-c h110"
          @click="$linkToEasy('/pagesSupplier/UserCenter/MyAccount/AmountSettled')"
        >
          <view class="color-block fz-b fz-28">待结算金额</view>
          <view class="m-l-auto flex flex-vertical-c">
            <view v-if="showEye" class="fz-28 color-block-65 m-r-8">
              {{ info.awaitSettlementAmount }} 元
            </view>
            <view v-else class="fz-28 color-block-65 m-r-8">***元</view>
            <VoIcon :size="20" name="right-arrow" />
          </view>
        </view>
        <view class="line-bg h2 w-full" />
        <view class="fz-28 color-block lh150 m-t-32 fz-b m-b-4">待还金额</view>
        <view class="flex flex-justify-between flex-vertical-b">
          <VoPointPrice
            v-if="showEye"
            :left-size="20"
            :price="account.repayAmount"
            :right-size="12"
          />
          <view v-else class="content-star">***</view>
          <EraButton
            size="btn-mini"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/PaymentOrder')"
            >去还款</EraButton
          >
        </view>
        <block v-if="userInfo.platformCode != 'garage'">
          <view class="h16" />
          <view class="line-bg h2 w-full" />
          <view class="flex flex-vertical-c h110">
            <view class="color-block fz-b fz-28">保证金</view>
            <view class="m-l-auto flex flex-vertical-c">
              <view v-if="showEye" class="fz-28 color-block-65 m-r-8">{{ marginTotal }}元</view>
              <view v-else class="fz-28 color-block-65 m-r-8">***元</view>
            </view>
          </view>
        </block>
      </view>
    </view>
    <view class="account-info__bottom">
      <view v-if="userInfo.roleCode === 'agent'">
        <view class="flex flex-vertical-c">
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/AccountReceivable')"
          >
            <VoIcon :size="60" class="icon-item" name="accounts-receivable" />
            <view class="text-center fz-24 color-block-65">应收账款</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/AccountBill')"
          >
            <VoIcon :size="60" class="icon-item" name="account-details" />
            <view class="text-center fz-24 color-block-65">账户明细</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceList')"
          >
            <VoIcon :size="60" class="icon-item" name="invoice" />
            <view class="text-center fz-24 color-block-65">开发票</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/PaymentOrder')"
          >
            <VoIcon :size="60" class="icon-item" name="payment-order" />
            <view class="text-center fz-24 color-block-65">还款订单</view>
          </view>
        </view>
        <view class="m-t-56 flex flex-vertical-c">
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesAgent/UserCenter/MyAccount/PaymentRecord')"
          >
            <VoIcon :size="60" class="icon-item" name="payment-record" />
            <view class="text-center fz-24 color-block-65">还款记录</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/ApplyInvoice')"
          >
            <VoIcon :size="60" class="icon-item" name="apply-for-invoice" />
            <view class="text-center fz-24 color-block-65">申请发票</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceHistory')"
          >
            <VoIcon :size="60" class="icon-item" name="invoicing-record" />
            <view class="text-center fz-24 color-block-65">开票记录</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesAgent/Order/StatementOrder/StatementList')"
          >
            <VoIcon :size="60" class="icon-item" name="statements" />
            <view class="text-center fz-24 color-block-65">结算单</view>
          </view>
        </view>

        <view class="m-t-56 flex flex-vertical-c">
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/MyBankCard')"
          >
            <VoIcon :size="60" class="icon-item" name="brank-details" />
            <view class="text-center fz-24 color-block-65">银行卡</view>
          </view>
        </view>
      </view>
      <view v-else>
        <view class="flex flex-vertical-c">
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/AccountBill')"
          >
            <VoIcon :size="60" class="icon-item" name="account-details" />
            <view class="text-center fz-24 color-block-65">账户明细</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/ApplyInvoice')"
          >
            <VoIcon :size="60" class="icon-item" name="apply-for-invoice" />
            <view class="text-center fz-24 color-block-65">申请发票</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceHistory')"
          >
            <VoIcon :size="60" class="icon-item" name="invoicing-record" />
            <view class="text-center fz-24 color-block-65">开票记录</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesSupplier/UserCenter/Invoice/PaymentOrder')"
          >
            <VoIcon :size="60" class="icon-item" name="payment-order" />
            <view class="text-center fz-24 color-block-65">还款订单</view>
          </view>
        </view>
        <view class="m-t-56 flex flex-vertical-c">
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesAgent/UserCenter/MyAccount/PaymentRecord')"
          >
            <VoIcon :size="60" class="icon-item" name="payment-record" />
            <view class="text-center fz-24 color-block-65">还款记录</view>
          </view>
          <view
            class="w120 m-r-52 flex-column flex-vertical-c flex-justify-c"
            @click="$linkToEasy('/pagesAgent/Order/StatementOrder/StatementList')"
          >
            <VoIcon :size="60" class="icon-item" name="statements" />
            <view class="text-center fz-24 color-block-65">结算单</view>
          </view>
        </view>
      </view>
      <view class="h8" />
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
        amount: 0,
        marginTotal: 0, // 保证金
        showEye: true,
        account: '',
        showWindow: false,
        title: '提示',
      }
    },
    methods: {
      //还款信息
      async getAccount() {
        try {
          const account = await this.$VoHttp.apiOrderAccountPeriodGetByCurrentUser()
          console.log(account)
          this.account = account.data
        } catch (e) {
          console.error(e)
          this.$u.toast(e.message || '网络错误')
        }
      },
      /**
       * 设置是否可见
       */
      setEye() {
        this.showEye = !this.showEye
        console.log('showEye = ', this.showEye)
      },
      // 获取待结算金额
      async getData() {
        try {
          const { data } = await this.$VoHttp.apiOrderProfitQueryUnsettleAmount()
          console.log(data)
          this.amount = data || 0
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
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
    onShow() {
      this.initFn()
      this.getData()
      this.getMarginTotal()
      this.getAccount()
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
    overflow-x: hidden;

    &-info {
      width: 686rpx;
      background: #ffffff;
      /* Shadows阴影 */
      box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
      border-radius: 8rpx;
      margin: 0rpx auto 48rpx;
      position: relative;
      &__bg {
        width: 686rpx;
        height: 100rpx;
      }
      &__title {
        position: absolute;
        height: 100rpx;
        width: 100%;
        top: 0;
        left: 24rpx;
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
      &__bottom {
        width: 100%;
        margin: 48rpx 0 0 56rpx;
        box-sizing: border-box;
      }
    }

    .icon-item {
      margin: 0rpx auto 8rpx;
      display: block;
    }
  }
</style>
