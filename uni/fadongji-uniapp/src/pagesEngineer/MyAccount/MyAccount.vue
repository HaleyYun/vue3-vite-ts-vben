<template>
  <view class="account">
    <VoNav is-have-more title="我的账户" />
    <view class="account-info">
      <view class="account-info__title">
        <view class="fz-28 color-block fz-b">我的账户</view>
        <VoIcon
          v-if="eyesOpen"
          class="m-l-4"
          name="eyes-open"
          size="24"
          @click="eyesOpen = false"
        />
        <VoIcon v-else class="m-l-4" name="eyes-down" size="24" @click="eyesOpen = true" />
      </view>
      <view class="account-info__content">
        <view class="fz-28 color-block lh150 fz-b m-b-4">可提现金额</view>
        <view class="flex flex-justify-between flex-vertical-b">
          <VoPointPrice
            v-if="eyesOpen"
            :left-size="20"
            :price="info.canWithdrawAmount"
            :right-size="12"
          />
          <text v-else>***</text>
          <EraButton size="btn-mini" @click="withdraw">提现</EraButton>
        </view>
        <view class="line-bg m-t-16 h2 w-full" />
        <view
          class="flex flex-vertical-c h110"
          @click="$linkToEasy(`./AccountDetail?amount=${amount}`)"
        >
          <view class="color-block fz-b fz-28">我的收益(元)</view>
          <view class="m-l-auto flex flex-vertical-c">
            <view v-if="amount" class="fz-28 color-block-65 m-r-8">
              {{ eyesOpen ? amount : '***' }} 元
            </view>
            <view v-else class="fz-28 color-block-65 m-r-8">
              {{ eyesOpen ? '--' : '***' }} 元
            </view>
            <VoIcon :size="20" name="right-arrow" />
          </view>
        </view>
        <view class="h8" />
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
        eyesOpen: true,
        amount: '',
        showWindow: false,
        title: '提示',
      }
    },
    methods: {
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
    onLoad(option) {
      if (option.amount) {
        this.amount = option.amount
      }
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
        height: 100rpx;
        background-image: url('/static/common/myaccount_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
        padding: 0rpx 32rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
      &__content {
        width: 100%;
        padding: 24rpx;
        box-sizing: border-box;
      }
    }

    .icon-item {
      margin: 0rpx auto 8rpx;
      display: block;
    }
  }
</style>
