<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav is-fixed is-have-more title="店铺信息" />
    <view class="center-portrait" @click="chooseImg">
      <image :src="currentUserFullInfo.storeUrl" class="center-portrait__img" />
      <image class="center-portrait__icon" src="/static/created/UserCenter/change_vatar.png" />
    </view>
    <VoCellGroup :border="false">
      <VoCell title="店铺名称">
        <text slot="value" class="center-value">{{ currentUserFullInfo.storeName }}</text>
      </VoCell>
      <VoCell title="店铺编码">
        <text slot="value" class="center-value">{{ currentUserFullInfo.companyId }}</text>
      </VoCell>
      <VoCell v-if="currentUserFullInfo.contractNumber" title="合同剩余天数">
        <text slot="value" class="center-value">{{ currentUserFullInfo.contractNumber }}天</text>
      </VoCell>
      <VoCell title="服务商合作合同">
        <view
          v-if="currentUserFullInfo.signContract"
          slot="value"
          class="flex flex-vertical-c supplier-tag blue"
        >
          <VoIcon :size="12" class="m-r-4" color="#0D66FF" name="success-fill" />
          <view>已签订</view>
        </view>
        <view v-else slot="value" class="flex flex-vertical-c supplier-tag grey">
          <VoIcon :opacity="0.25" :size="12" class="m-r-4" color="#000" name="success-fill" />
          <view>未签订</view>
        </view>
        <VoIcon
          slot="right-icon"
          :opacity="0.25"
          class="m-t-4"
          name="right-arrow"
          @click="toContractDetail"
        />
      </VoCell>
      <VoCell title="认证信息" @click="goApproveFn">
        <view
          v-if="currentUserFullInfo.checkStatus"
          slot="value"
          class="flex flex-vertical-c supplier-tag green"
        >
          <VoIcon :size="12" class="m-r-4" color="#00B359" name="success-fill" />
          <view>已认证</view>
        </view>
        <view v-else slot="value" class="flex flex-vertical-c supplier-tag grey">
          <VoIcon :opacity="0.25" :size="12" class="m-r-4" color="#000" name="success-fill" />
          <view>未认证</view>
        </view>
        <VoIcon slot="right-icon" :opacity="0.45" class="m-t-4" name="right-arrow" />
      </VoCell>
      <!--      <VoCell title="发票信息" url="/pagesSupplier/UserCenter/Invoice/ApplyForm">-->
      <!--        <VoIcon slot="right-icon" :opacity="0.45" class="m-t-4" name="right-arrow" />-->
      <!--      </VoCell>-->
    </VoCellGroup>
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'
  import store from '@/store'

  export default {
    name: 'StoreInfo',
    data() {
      return {
        accountName: '', // 账户名称
        currentUserFullInfo: {},
      }
    },
    created() {
      this.initInfo()
    },
    methods: {
      /**
       * 换头像
       */
      chooseImg() {
        try {
          chooseImageByPromise({ count: 1, isTencentCloud: false, tip: '上传中' }).then((res) => {
            let param = {
              storeUrl: res[0].fileNameUrl,
            }
            this.$VoHttp.apiCompanyInfoPhoto(param).then((res) => {
              uni.$u.toast('修改成功')
              this.initInfo()
            })
          })
        } catch (e) {
          uni.$u.toast(e?.data?.message || e?.message || '更新失败')
        }
      },
      toContractDetail() {
        if (!this.currentUserFullInfo.contractUrl) {
          this.$u.toast('合同信息为空')
          return
        }
        this.$linkToEasy(
          `/pages/CommonWeb/WebView?contractUrl=${this.currentUserFullInfo.contractUrl}`,
        )
      },
      initInfo() {
        store.dispatch('user/getFullUserInfo').then(async (res) => {
          this.currentUserFullInfo = res
          this.$store.dispatch('user/setUseInfoItem', res)
          //   if (Number(this.currentUserFullInfo.checkStatus) === 0) {
          //     this.showApprove = true
          //   } else if (+this.currentUserFullInfo.checkStatus === 3) {
          //     let obj = {
          //       name: '联系渠道经理',
          //       path: '',
          //       iconName: 'mobile-new',
          //       approve: false,
          //     }
          //     this.settingList.splice(2, 0, obj)
          //   }
        })
      },
      goApproveFn() {
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      goTo(url, approve) {
        if (approve) {
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
        }
        this.$linkToEasy(url)
      },
    },
    onLoad(options) {
      if (options.content) {
        this.accountName = options.content
      }
    },
  }
</script>

<style lang="scss" scoped>
  .center {
    width: 750rpx;
    min-height: 100vh;
    background: #ffffff;
    &-portrait {
      position: relative;
      width: 138rpx;
      height: 138rpx;
      margin: 54rpx auto 72rpx;
      &__img {
        width: 138rpx;
        height: 138rpx;
        border-radius: 50%;
        overflow: hidden;
      }
      &__icon {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 40rpx;
        height: 40rpx;
        z-index: 2;
      }
    }
    &-value {
      height: 48rpx;
      line-height: 48rpx;
      color: $v-c0-65;
    }
    &-box {
      height: 16rpx;
      background: #f7f7f8;
    }
    .supplier-tag {
      padding: 4rpx 10rpx 2rpx 6rpx;
      height: 36rpx;
      justify-content: center;
      font-size: 20rpx;
      border-radius: 200rpx;
      &.blue {
        background-color: #e6efff;
        color: #2676ff;
      }

      &.green {
        background-color: #d9faea;
        color: #00b359;
      }
      &.grey {
        background: $v-bg-light;
        color: $v-c0-25;
      }
    }
    .color-5ED697 {
      color: #5ed697 !important;
      background: #ecfaf3 !important;
    }
  }
  .red {
    background-color: #fef0f0;
    color: #ff5319;
  }
</style>
