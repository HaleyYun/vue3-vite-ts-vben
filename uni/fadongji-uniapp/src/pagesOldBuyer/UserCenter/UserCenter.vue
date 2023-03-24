<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav is-fixed is-have-more title="账号信息" />
    <view class="center-portrait" @click="chooseImg">
      <image :src="formData.storeUrl" class="center-portrait__img" />
      <image class="center-portrait__icon" src="/static/created/UserCenter/change_vatar.png" />
    </view>
    <VoCellGroup :border="false" class="m-t-64">
      <!-- <EraCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="名称"
      > -->
      <EraCell title="名称">
        <text slot="value" class="center-value text-right maxWidth overEllipsis">
          {{ formData.storeName }}
        </text>
        <!-- <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" /> -->
      </EraCell>

      <VoCell title="认证信息" @click="goApproveInfo">
        <template v-if="+formData.checkStatus === 3">
          <view slot="value" class="flex flex-vertical-c supplier-tag">
            <VoIcon :size="14" class="m-r-4" color="#00b259" name="success-fill" />
            <view>{{ formData.checkStatusStr }}</view>
          </view>
        </template>
        <template v-else-if="+formData.checkStatus === 2">
          <view slot="value" class="flex flex-vertical-c supplier-tag red">
            <VoIcon :size="14" class="m-r-4" color="#f20014" name="close-c" />
            <view>{{ formData.checkStatusStr }}</view>
          </view>
        </template>
        <template v-else-if="+formData.checkStatus === 1 || +formData.checkStatus === 4">
          <view slot="value" class="flex flex-vertical-c supplier-tag yellow">
            <VoIcon :size="14" class="m-r-4" color="#ff9b05" name="success-fill" />
            <view>{{ formData.checkStatusStr }}</view>
          </view>
        </template>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <!--      <VoCell title="回收公司合作合同">-->
      <!--        <template v-if="formData.signContract">-->
      <!--          <view slot="value" class="flex flex-vertical-c supplier-iconbg color-155BD4">-->
      <!--            <VoIcon :size="12" class="m-r-4" name="signed-have" />-->
      <!--            <view>已签订</view>-->
      <!--          </view>-->
      <!--        </template>-->
      <!--        <template v-else>-->
      <!--          <view slot="value" class="flex flex-vertical-c supplier-iconbg color-155BD4">-->
      <!--            <VoIcon :size="12" class="m-r-4" name="signed-have" />-->
      <!--            <view>未签订</view>-->
      <!--          </view>-->
      <!--        </template>-->
      <!--        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />-->
      <!--      </VoCell>-->
      <VoCell title="我的银行卡" @click="nextPage('/pagesSupplier/UserCenter/MyBankCard')">
        <text slot="value" class="center-value">{{ formData.bankCardNumber }}张</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="推广二维码" @click="promoteCodeClick">
        <text slot="value" class="center-value">推广二维码</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
    </VoCellGroup>
    <view class="p-b-safe-area" />
    <!-- 分享弹框 -->
    <!--    <VoShareQrCodeView ref="sharePop" :params="params" />-->
    <!-- 认证弹窗 -->
    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'

  export default {
    name: 'UserCenter',
    data() {
      return {
        params: {},
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
        },
        bankCardList: [],
        shareCode: '',
      }
    },
    methods: {
      nextPage(val) {
        if (this.formData.checkStatus === 3) {
          this.$linkToEasy(val)
        } else {
          this.showApprove = true
        }
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
            console.log(res, '******9999')
            this.formData.storeUrl = res[0].fileNameUrl

            let param = {
              storeUrl: this.formData.storeUrl,
            }
            this.$VoHttp.apiCompanyInfoPhoto(param).then((res) => {
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
      async promoteCodeClick() {
        if (this.formData.checkStatus === 3) {
          // let router = '/pagesAgent/TokerDistrict/RegisterMobilePage'
          // this.$linkToEasy(
          //   `/pagesCommon/SharePoste/SharePoste?params=${JSON.stringify(
          //     this.params,
          //   )}&router=${router}`,
          // )
          // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterMobilePage')
          let router = '/pages/ShareRegister'
          if (!this.shareCode) {
            try {
              const res = await this.$VoHttp.apiShareLinkAdd({ shareInfo: JSON.stringify(this.params) })
              if (!res || !res.data) {
                this.$u.toast(res.message || '网络请求失败')
                return
              }
              this.shareCode = res.data
            } catch (e) {
              this.$u.toast(e.message || '网络请求失败')
              return
            }
          }
          this.$linkToEasy(`/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`)
        } else {
          this.showApprove = true
        }
      },
    },
    onLoad() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        canChoose: 1,
      }
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

    .supplier-tag {
      padding: 0rpx 10rpx;
      height: 36rpx;
      justify-content: center;
      font-size: 20rpx;
      color: #00b259;
      background: #d9faea;
      border-radius: 200rpx;
      &.yellow {
        background-color: #ffe2b8;
        color: #ff9b05;
      }
      &.red {
        background-color: #ffccd0;
        color: #f20014;
      }
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
  .maxWidth {
    max-width: 540rpx;
  }
</style>
