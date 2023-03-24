<template>
  <view class="uploaded">
    <view class="uploaded-success">
      <VoNav is-have-more title="认证完成" />
      <image class="uploaded-success__icon" src="/static/created/certify/success_tips.png" />
      <view class="uploaded-success__info">认证信息提交成功</view>
      <view class="uploaded-success__open">工作人员将在1个工作日内完成审核</view>
      <view class="uploaded-success__button">
        <block v-if="userInfo.roleCode != 'agent'">
          <EraButton
            class="m-b-62"
            size="lg-mini"
            text="配置品类信息"
            @click.native="$linkToEasy('/pagesCommon/StoreInfo/CertifiedCategory')"
          />
          <EraButton
            class="m-b-62"
            size="lg-mini"
            text="配置品牌信息"
            @click.native="$linkToEasy('/pagesCommon/StoreInfo/OperateBrand')"
          />
        </block>
        <EraButton size="lg-mini" text="进入首页" theme-type="Wire" @click.native="goHomePage" />
      </view>
    </view>
  </view>
</template>

<script>
  import { toRoleHome } from '@/common/helper'

  export default {
    name: 'AccountSuccess',
    data() {
      return {}
    },

    methods: {
      //配置品类信息
      goCateUrl() {
        this.$linkToEasy('/pages/AuthenticationInformation/BrandModule/BrandSetting')
      },
      /**
       * 返回首页
       */
      goHomePage() {
        toRoleHome()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: #ffffff;
    padding-bottom: 132rpx;

    &-success {
      text-align: center;
      margin-top: 72rpx;

      &__icon {
        width: 176rpx;
        height: 176rpx;
      }

      &__info {
        margin-top: 32rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-weight: bold;
        font-size: 30rpx;
        color: $v-c0-85;
      }

      &__open {
        margin-top: 24rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
      }

      &__button {
        margin-top: 190rpx;
        width: 750rpx;
        padding: 0rpx 32rpx;
        box-sizing: border-box;
      }
    }
  }
</style>
