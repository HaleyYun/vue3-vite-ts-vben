<template>
  <view class="account">
    <VoNav is-have-more title="我的账户" />
    <view class="flex1 bg-white m-t-16">
      <view class="account-info">
        <view class="account-info__title">
          <view class="fz-28 color-block fz-b">我的账户</view>
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
        </view>
      </view>
      <view
        class="w104 m-l-52 m-t-32 flex-column flex-vertical-c flex-justify-c"
        @click="$linkToEasy('./AccountDetail')"
      >
        <VoIcon :size="52" class="icon-item" name="account-details" />
        <view class="text-center fz-24 color-block-65">账户明细</view>
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
    },
  }
</script>

<style lang="scss" scoped>
  .account {
    width: 750rpx;
    min-height: 100vh;
    background: #f7f7f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-info {
      width: 686rpx;
      background: #ffffff;
      /* Shadows阴影 */
      box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
      border-radius: 8rpx;
      margin: 24rpx auto;
      &__title {
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
      }
    }
    &-year {
      padding: 24rpx 32rpx;
      font-size: 32rpx;
      line-height: 48rpx;
      font-weight: bold;
      color: $v-c0-85;
    }
    &-month {
      padding: 24rpx 32rpx 24rpx 0;
      margin-left: 32rpx;
      font-size: 32rpx;
      line-height: 48rpx;
      color: $v-c0-85;
      border-bottom: 2rpx solid $v-bg-light;
    }

    .icon-item {
      margin: 0rpx auto 8rpx;
      display: block;
    }
  }
</style>
