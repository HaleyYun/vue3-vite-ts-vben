<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav is-fixed is-have-more title="个人信息" />
    <view class="center-portrait" @click="chooseImg">
      <image
        :src="formData.storeUrl || '/static/default_avatar.png'"
        class="center-portrait__img"
      />
    </view>
    <VoCellGroup :border="false" class="m-t-64">
      <!-- <VoCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="名称"
      >
        <text slot="value" class="center-value flex1 overEllipsis">{{ formData.storeName }}</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell> -->

      <VoCell title="认证信息">
        <view
          v-if="formData.checkStatus === 3"
          slot="value"
          class="flex flex-vertical-c supplier-tag"
        >
          <VoIcon :size="12" class="m-r-4" name="approve-have" />
          <view>已认证</view>
        </view>
        <view v-else slot="value" class="center-value">
          <u-tag :text="formData.checkStatusStr" shape="circle" size="mini" type="warning" />
        </view>
        <VoIcon
          slot="right-icon"
          :opacity="0.25"
          class="m-t-4"
          name="right-arrow"
          @click="goApproveInfo"
        />
      </VoCell>
      <!-- <VoCell title="集师傅合作合同">
        <view
          v-if="formData.signContract"
          slot="value"
          class="flex flex-vertical-c supplier-iconbg color-155BD4"
        >
          <VoIcon :size="12" class="m-r-4" name="signed-have" />
          <view>已签订</view>
        </view>
        <view v-else slot="value" class="center-value">
          <view>未签订</view>
        </view>
        <VoIcon
          slot="right-icon"
          :opacity="0.25"
          class="m-t-4"
          name="right-arrow"
          @click="toContractDetail"
        />
      </VoCell> -->
      <VoCell
        v-if="+formData.checkStatus === 3"
        title="我的银行卡"
        url="/pagesSupplier/UserCenter/MyBankCard"
      >
        <text slot="value" class="center-value">{{ formData.bankCardNumber }}张</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell v-else title="我的银行卡" @click="showApprove = true">
        <text slot="value" class="center-value">{{ formData.bankCardNumber }}张</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell v-if="+formData.checkStatus === 3 && formData.showStatus" title="推广二维码" @click="toSpreadHome">
        <text slot="value" class="center-value">推广二维码</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
    </VoCellGroup>
    <EraApproveModal :show.sync="showApprove" />
    <view class="p-b-safe-area" />
    <!-- 分享弹框 -->
    <VoShareQrCodeView ref="sharePop" />
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'

  export default {
    name: 'UserCenter',
    components: {
      VoShareQrCodeView,
    },
    data() {
      return {
        showApprove: false,
        formData: {
          address: '', // 详细地址
          areaCode: '', // 区县code
          channelManagerMobile: '', // 渠道经理手机号
          channelManagerName: '', // 渠道经理
          checkResult: '', // 审核结果
          checkStatus: '', // 审核状态(0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号)
          contractNumber: '', // 合同天数
          signContract: '', // 是否签订合同（true： 已签订，false：未签订）
          fullName: '', // 营业执照名称
          companyId: '', // 企业id（店铺编码）
          isAdmin: '', // 是否主账号（false：否，true：是）
          platformCode: '', // 平台身份code
          storeName: '', // 店铺名称
          storeUrl: '', // 店铺头像
          bankCardNumber: '', // 银行卡个数
          showStatus: false,
        },
      }
    },
    methods: {
      toContractDetail() {
        if (!this.formData.contractUrl) {
          this.$u.toast('合同信息为空')
          return
        }
        this.$linkToEasy(`/pages/CommonWeb/WebView?contractUrl=${this.formData.contractUrl}`)
      },
      toSpreadHome() {
        if (this.formData.checkStatus !== 3) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesEngineer/Spread/SpreadHome')
      },
      /**
       * 去认证信息页
       */

      goApproveInfo() {
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * 换头像
       */
      chooseImg() {
        try {
          chooseImageByPromise({
            count: 1,
            isTencentCloud: false,
            tip: '上传中',
            sizeType: ['compressed'],
          }).then((res) => {
            this.formData.storeUrl = res[0].fileNameUrl
            let param = {
              storeUrl: this.formData.storeUrl,
            }
            this.$VoHttp.apiCompanyInfoPhoto(param).then((res) => {
              this.$store.dispatch('user/getFullUserInfo')
              uni.$u.toast('修改成功')
            })
          })
        } catch (e) {
          uni.$u.toast(e?.data?.message || e?.message || '更新失败')
        }
      },
      initFn() {
        this.$VoHttp.apiCompanyInfoDetail().then((res) => {
          this.formData = res.data
        })
      },
      promoteCodeClick() {
        this.$refs.sharePop.showShare(true)
      },
    },
    onShow() {
      this.initFn()
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
    .supplier-warn_tag {
      padding: 0rpx 10rpx;
      height: 36rpx;
      justify-content: center;
      font-size: 20rpx;
      color: #f20014;
      background: #ffcbcf;
      border-radius: 200rpx;
    }
    .supplier-tag {
      padding: 0rpx 10rpx;
      height: 36rpx;
      justify-content: center;
      font-size: 20rpx;
      color: #07c160;
      background: #ecfaf3;
      border-radius: 200rpx;
    }
    .supplier-iconbg {
      padding: 0rpx 10rpx;
      height: 36rpx;
      justify-content: center;
      font-size: 20rpx;
      color: #155bd4;
      background: #edf2fc;
      border-radius: 200rpx;
    }
    .color-5ED697 {
      color: #5ed697 !important;
      background: #ecfaf3 !important;
    }
  }
</style>
