<template>
  <view
    class="approve"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="认证信息" />

    <view class="approve-status">
      <view class="flex flex-justify-c m-b-32">
        <VoIcon v-if="companyInfo.checkStatus == 3" name="certified" :size="50" />
        <VoIcon v-else-if="companyInfo.checkStatus == 2" name="authentication-failed" :size="50" />
        <VoIcon v-else-if="companyInfo.checkStatus == 1" name="in-certification" :size="50" />
      </view>
      <view class="fz-28 lh150 color-block text-center fz-b">{{ companyInfo.checkStatusStr }}</view>
      <view class="color-block-45 fz-24 lh150 text-center w508" v-if="companyInfo.checkStatus == 2">
        {{ companyInfo.checkResult }}
      </view>
    </view>

    <view class="line-bg h16 w-full" />

    <EraForm class="uploaded-form" labelPosition="left" labelWidth="128">
      <view>
        <view class="fz-32 color-block lh150 m-b-22 m-t-10">门店实拍</view>
        <image class="store-img" :src="companyInfo.storeUrl" />
      </view>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="门店手机号">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.contractPhone
        }}</view>
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="门店负责人">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.contractName
        }}</view>
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="注册手机号">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.contractPhone
        }}</view>
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="汽修厂名称">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.storeName
        }}</view>
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="所在地区">
        <view class="fz-32 lh150 color-block-65 text-right w-full"
          >{{ companyInfo.provinceName }}{{ companyInfo.cityName }}{{ companyInfo.areaName }}</view
        >
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="详细地址">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{ companyInfo.address }}</view>
      </EraFormItem>

      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="主修车系">
        <view
          class="fz-32 lh150 color-block-65 text-right w-full"
          >{{ companyInfo.carSeriesStr }}</view
        >
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="服务项目">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{ companyInfo.serviceProjectStr }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="工位数量">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{
          companyInfo.locationNumber
        }}</view>
      </EraFormItem>
      <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="规模（人）">
        <view class="fz-32 lh150 color-block-65 text-right w-full">{{ companyInfo.scale }}</view>
      </EraFormItem>
    </EraForm>
    <view class="line-bg h16 w-full" />

    <NoApprove v-if="companyInfo.checkStatus == 0" />

    <VoSafetyArea>
      <template #group>
        <view class="p-t-18 p-b-18 approve-group">
          <EraButton
            color="#F6F7F8"
            size="lg"
            v-if="companyInfo.checkStatus == 0"
            @click="goApproveInfo"
            >去认证</EraButton
          >
          <EraButton
            color="#F6F7F8"
            size="lg"
            v-else-if="companyInfo.checkStatus == 2"
            @click="goApproveInfo"
            >重新认证</EraButton
          >
        </view>
      </template>
    </VoSafetyArea>
  </view>
</template>

<script>
  import NoApprove from './components/NoApprove'

  export default {
    name: 'ApproveInfo',
    components: { NoApprove },
    data() {
      return {
        serviceList: [],
        companyInfo: {
          checkStatus: '', //0资料未提交   1审核中  2审核拒绝  3认证成功  4绑定手机号
        },
      }
    },
    computed: {
      formateServiceProject() {
        if (!this.companyInfo.serviceList) {
          return ''
        }
        const val = this.companyInfo.serviceList
        const arr = val.split(',')
        return arr
          .map((item) => {
            return this.serviceList.find((value) => value.code == item).name
          })
          .join()
      },
    },
    mounted() {
      this.getServiceList()
    },
    onLoad(options) {
      this.initFn()
    },
    methods: {
      async getServiceList() {
        const res = await this.$VoHttp.apiCompanyInfoServiceProject()
        this.serviceList = res.data
        console.log(res)
      },
      initFn() {
        this.$VoHttp.apiCompanyLegalGarage().then((res) => {
          this.companyInfo = res.data
        })
      },
      goApproveInfo() {
        if (this.userInfo.roleCode == 'supplier') {
          // 如果是供应商
          uni.redirectTo({
            url: '/pages/AuthenticationInformation/FirstStepDefault',
          })
        } else if (this.userInfo.roleCode == 'agent') {
          // 服务商
          uni.redirectTo({
            url: '/pages/AuthenticationInformation/PublicAccounts',
          })
        } else if (this.userInfo.roleCode == 'garage') {
          // 汽修厂
          uni.redirectTo({
            url: '/pages/AuthenticationInformation/GarageAccounts',
          })
        } else if (this.userInfo.roleCode == 'skilledWorker') {
          // 集师傅
          uni.redirectTo({
            url: '/pagesEngineer/AuthenticationInformation/EngineerAccounts',
          })
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
