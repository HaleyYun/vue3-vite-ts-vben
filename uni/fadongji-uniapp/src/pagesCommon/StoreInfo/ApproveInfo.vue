<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="approve"
  >
    <VoNav is-fixed is-have-more title="认证信息" />

    <view class="approve-status">
      <view class="flex flex-justify-c m-b-32">
        <image
          v-if="companyInfo.checkStatus === 3"
          class="approve-status__img"
          src="/static/supplier/success.png"
        />
        <image
          v-if="companyInfo.checkStatus === 2"
          class="approve-status__img"
          src="/static/supplier/failure.png"
        />
        <image
          v-if="companyInfo.checkStatus === 1"
          class="approve-status__img"
          src="/static/supplier/authentication.png"
        />
      </view>
      <view class="fz-28 lh150 color-block text-center fz-b">{{ companyInfo.checkStatusStr }}</view>
      <view
        v-if="companyInfo.checkStatus === 2"
        class="color-block-45 fz-24 lh150 text-center w508"
      >
        {{ companyInfo.checkResult }}
      </view>
    </view>
    <view class="line-bg h16" />

    <EraForm
      v-if="companyInfo.businessLicenseUrl"
      class="uploaded-form"
      labelPosition="left"
      labelWidth="128"
    >
      <view class="fz-32 color-block lh150 fz-b p-t-24 p-b-24">营业执照</view>

      <image
        :src="$transferCosUrl(companyInfo.businessLicenseUrl)"
        class="business-img"
        @click="lookPreviewImage(companyInfo.businessLicenseUrl)"
      />

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="营业执照名称">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.fullName
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="统一信用代码">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.businessLicense
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="法人姓名">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.legalName || companyInfo.fullName
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="营业执照有效期">
        <view class="fz-32 lh150 color-block-65 text-right w-full"
          >{{ companyInfo.businessLicenseStartDate }}至{{
            companyInfo.businessLicenseEndDate
          }}</view
        >
      </EraFormItem>
    </EraForm>
    <view class="line-bg h16 w-full" />

    <EraForm class="uploaded-form" labelPosition="left" labelWidth="140">
      <view class="fz-32 color-block lh150 fz-b p-t-24 p-b-24">法人身份信息</view>
      <view v-if="companyInfo.legalIdCardBack" class="flex flex-justify-between">
        <image
          :src="$transferCosUrl(companyInfo.legalIdCardBack)"
          class="card-img"
          @click="lookPreviewImage(companyInfo.legalIdCardBack)"
        />
        <image
          :src="$transferCosUrl(companyInfo.legalIdCardFront)"
          class="card-img"
          @click="lookPreviewImage(companyInfo.legalIdCardFront)"
        />
      </view>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="姓名">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.legalName || companyInfo.fullName
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="身份证号">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{ companyInfo.legalId }}</view>
      </EraFormItem>
      <EraFormItem
        :labelWidth="115"
        class="uploaded-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="身份证有效期"
      >
        <view class="flex1 fz-32 lh150 color-block-85 text-right w-full"
          >{{ companyInfo.legalStartDate + ' ' }}至{{ ' ' + companyInfo.legalEndDate }}</view
        >
      </EraFormItem>
    </EraForm>
    <view class="line-bg h16 w-full" />

    <EraForm
      v-if="userInfo.platformCode != 'skilledWorker'"
      class="uploaded-form"
      labelPosition="left"
      labelWidth="128"
    >
      <!-- 技术工隐藏该模块 -->
      <view class="fz-32 color-block lh150 fz-b p-t-24 p-b-32">店铺信息</view>
      <view>
        <view class="fz-32 color-block lh150 m-b-22">店铺LOGO</view>
        <image
          :src="$transferCosUrl(companyInfo.storeUrl)"
          class="store-img"
          @click="lookPreviewImage(companyInfo.storeUrl)"
        />
      </view>
      <EraFormItem
        class="uploaded-form__item top-line"
        color="rgba(0, 0, 0, 0.85)"
        label="店铺名称"
      >
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.storeName
        }}</view>
      </EraFormItem>
    </EraForm>
    <view class="line-bg h16 w-full" />
    <EraForm
      v-if="companyInfo.parenBankName"
      class="uploaded-form"
      labelPosition="left"
      labelWidth="128"
    >
      <view class="fz-32 color-block lh150 fz-b p-t-24 p-b-32">对公账户信息</view>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="开户银行">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.parenBankName
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="开户支行">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{ companyInfo.bankName }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="银行账号">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.accountNo
        }}</view>
      </EraFormItem>
    </EraForm>

    <NoApprove v-if="companyInfo.checkStatus === 0" />

    <VoSafetyArea>
      <template #group>
        <view v-if="userInfo.roleCode != 'oldMachine'" class="p-t-18 p-b-18 approve-group">
          <EraButton v-if="companyInfo.checkStatus === 0" size="lg" @click="goApproveInfo"
            >去认证</EraButton
          >
          <EraButton v-if="companyInfo.checkStatus === 2" size="lg" @click="goApproveInfo"
            >重新认证</EraButton
          >
        </view>
      </template>
    </VoSafetyArea>
  </view>
</template>

<script>
  import NoApprove from '@/pagesCommon/StoreInfo/components/NoApprove'

  export default {
    name: 'ApproveInfo',
    components: { NoApprove },
    data() {
      return {
        companyInfo: {
          checkStatus: '', //0资料未提交   1审核中  2审核拒绝  3认证成功  4绑定手机号
        },
      }
    },
    onShow() {
      this.initFn()
    },
    methods: {
      /**
       * 预览图片
       */
      choseImg(img) {
        console.log(img, 'choseImg')
        uni.previewImage({
          urls: img,
        })
      },
      initFn() {
        this.$VoHttp.apiCompanyLegalInfo().then((res) => {
          this.companyInfo = res.data
        })
      },
      lookPreviewImage(data) {
        // 预览图片
        uni.previewImage({
          urls: [data],
        })
      },
      /**
       * @description 认证失败  去认证
       */
      goApproveInfo() {
        // failureStatus  审核拒绝后的状态(1:营业执照失败 ，2：身份证失败 ，3：营业执照和身份证都失败，4：人工审核失败，5：通联审核失败)
        if (+this.companyInfo.checkStatus === 0 || +this.companyInfo.failureStatus === 5) {
          //未提交
          if (this.userInfo.roleCode == 'supplier') {
            // 如果是供应商
            this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          } else if (this.userInfo.roleCode == 'agent') {
            // 服务商
            // 2是企业  3是个人
            if(+this.companyInfo.companyType===2){
              this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
            }else if(+this.companyInfo.companyType===3){
              this.$linkToEasy('/pages/AuthenticationInformation/AgentAccount')
            }
            // this.$linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
          } else if (this.userInfo.roleCode == 'garage') {
            // 汽修厂
            this.$linkToEasy('/pages/AuthenticationInformation/GarageAccounts')
          }
        } else if (+this.companyInfo.checkStatus === 2) {
          // 认证失败  重新认证

          this.$linkToEasy('/pagesCommon/StoreInfo/AgainApprove')
        }
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
      &__img {
        width: 120rpx;
        height: 120rpx;
        display: block;
      }
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
        .top-line {
          border-top: 2rpx solid $v-bg-light;
          margin-top: 24rpx;
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
      border-radius: 10rpx;
    }
    .card-img {
      width: 334rpx;
      height: 228rpx;
      border-radius: 10rpx;
      display: block;
    }
    .store-img {
      width: 180rpx;
      height: 180rpx;
      border-radius: 10rpx;
      display: block;
    }
  }
</style>
