<template>
  <view
    class="approve"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="实名认证信息" />

    <view class="approve-status">
      <view class="flex flex-justify-c m-b-32">
        <VoIcon v-if="companyInfo.status == 2" name="certified" :size="50" />
        <VoIcon v-else-if="companyInfo.status == 3" name="authentication-failed" :size="50" />
      </view>
      <view class="fz-28 lh150 color-block text-center fz-b">{{ companyInfo.checkStatusStr }}</view>
      <view class="color-block-45 fz-28 lh150 text-center w508" v-if="companyInfo.status == 2">
        已认证
      </view>
      <view class="color-block-45 fz-28 lh150 text-center w508" v-if="companyInfo.status == 3">
        未认证
      </view>
    </view>

    <view class="line-bg h16 w-full" />

    <view class="line-bg h16 w-full">
      <EraForm class="uploaded-form" labelPosition="left" labelWidth="128">
        <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="姓名">
          <view class="fz-32 lh150 color-block-65 text-right w-full">{{
            companyInfo.legalName
          }}</view>
        </EraFormItem>
        <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="身份证号">
          <view class="fz-32 lh150 color-block-65 text-right w-full">{{
            companyInfo.legalId
          }}</view>
        </EraFormItem>
        <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="">
          <view class="fz-32 lh150 color-block-65 text-right w-full" />
        </EraFormItem>
      </EraForm>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ApproveInfo',
    data() {
      return {
        companyInfo: {
          checkStatus: '', //0资料未提交   1审核中  2审核拒绝  3认证成功  4绑定手机号
        },
      }
    },
    onLoad(options) {
      this.initFn()
    },
    methods: {
      initFn() {
        this.$VoHttp.apiCompanyLegalRealNameInfo().then((res) => {
          this.companyInfo = res.data
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .approve {
    width: 750rpx;
    min-height: 100vh;
    padding-bottom: 128rpx;
    box-sizing: border-box;
    background: #ffffff;
    &-status {
      width: 750rpx;
      padding: 52rpx 32rpx 44rpx 32rpx;
      box-sizing: border-box;
      .w508 {
        width: 508rpx;
        margin: 24rpx auto 0rpx;
      }
    }
    .uploaded {
      width: 750rpx;
      overflow-x: hidden;
      box-sizing: border-box;
      background: $v-bg-white;
      padding-bottom: 132rpx;

      &-logo {
        width: 100%;
        height: 368rpx;
        padding-left: 52rpx;

        &__name {
          padding: 24rpx 0;
          height: 48rpx;
          line-height: 48rpx;
          font-size: 32rpx;
          color: $v-c0-85;
        }
      }

      &-form {
        padding: 0 32rpx;

        &__item {
          text-align: right;
          border-bottom: 2rpx solid $v-bg-light;
          &:last-child {
            border-bottom: 0rpx;
          }
          .item-code {
            margin-left: 24rpx;
          }
        }

        &__word {
          font-size: 32rpx;
          color: $v-c0-85;
        }

        &__code {
          font-size: 32rpx;
          line-height: 1.5;
          color: var(--color-primary);
        }

        &__placeholder {
          text-align: right;
          color: $v-c0-25 !important;
        }
      }
    }

    &-group {
      background: #ffffff;
    }
    .business-img {
      width: 218rpx;
      height: 218rpx;
      display: block;
    }
    .card-img {
      width: 334rpx;
      height: 228rpx;
      display: block;
    }
    .store-img {
      width: 180rpx;
      height: 180rpx;
      display: block;
    }
  }
</style>
