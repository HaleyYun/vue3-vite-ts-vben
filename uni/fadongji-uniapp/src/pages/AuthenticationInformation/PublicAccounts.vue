<template>
  <view class="public">
    <VoBatteryBar />
    <VoNav isTransparent :is-back="false" @backFn="goHomePage" />
    <view class="public-top flex flex-justify-between">
      <view class="public-top__left">
        <view>请选择</view>
        <view>您的主体类型</view>
      </view>
      <image class="public-top__right" src="/static/created/certify/certified_illustration.png" />
    </view>
    <view class="public-type" @click="selectPersonalFn">
      <view class="public-type__title">个人类型</view>
      <view class="public-type__explain"> 不需要营业执照、对公账户等资料，认证更快捷。 </view>
    </view>
    <view class="public-type" @click="selectFirmFn">
      <view class="public-type__title">企业类型</view>
      <view class="public-type__explain"> 提交企业完整法体信息，认证后可使用更全面的功能。 </view>
    </view>
  </view>
</template>

<script>
  import { toRoleHome } from "@/common/helper";

  export default {
    name: 'PublicAccounts',
    methods: {
      /**
       * 返回首页
       */
      goHomePage() {
        console.log('返回首页--------')
        toRoleHome()
      },
      /**
       * 选择个人
       */
      selectPersonalFn() {
        this.$linkToEasy('/pages/AuthenticationInformation/AgentAccount')
      },
      /**
       * 选择公司
       */
      selectFirmFn() {
        this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .public {
    width: 750rpx;
    height: 100vh;
    background-image: url('/static/created/certify/login_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &-top {
      margin-top: 16rpx;
      padding: 0 48rpx;
      &__left {
        line-height: 72rpx;
        font-weight: bold;
        font-size: 48rpx;
        margin-top: 16rpx;
      }
      &__right {
        width: 332rpx;
        height: 248rpx;
      }
    }
    &-type {
      margin: 0 32rpx 64rpx;
      padding: 32rpx 54rpx 38rpx 32rpx;
      background: #ffffff;
      border-radius: 8rpx;
      box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.1);
      &__title {
        line-height: 54rpx;
        font-weight: bold;
        font-size: 36rpx;
      }
      &__explain {
        margin: 24rpx 0 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
      }
    }
  }
</style>
