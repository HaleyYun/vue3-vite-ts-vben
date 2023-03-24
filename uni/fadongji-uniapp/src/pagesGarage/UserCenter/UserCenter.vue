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
    <VoCellGroup :border="false">
      <!-- <VoCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="修理厂名称"
      > -->
      <EraCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="修理厂名称"
      >
        <text slot="value" class="center-value maxWidth overEllipsis text-right">{{
          formData.storeName
        }}</text>
        <VoIcon
          slot="right-icon"
          :opacity="0.25"
          class="m-t-4"
          name="right-arrow"
          @click="changeName"
        />
      </EraCell>

      <!--      <VoCell title="修理厂编码">-->
      <!--        <text slot="value" class="center-value">{{ formData.companyId }}</text>-->
      <!--      </VoCell>-->
      <VoCell title="认证信息" @click="goApproveInfo">
        <view slot="value" class="flex flex-vertical-c">
          <view
            v-if="companyInfo && companyInfo.checkStatus === 3"
            class="authentication-status3 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" name="approve-have" />
            <view>已认证</view>
          </view>
          <view
            v-if="companyInfo && companyInfo.checkStatus === 1"
            class="authentication-status1 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" color="#FF9B05" name="pending-review" />
            <view>认证中</view>
          </view>
          <view
            v-if="!companyInfo || companyInfo.checkStatus === 0"
            class="authentication-status0 flex flex-vertical-c"
          >
            <VoIcon :opacity="0.25" :size="12" class="m-r-4" color="#000" name="pending-review" />
            <view>未认证</view>
          </view>
          <view
            v-if="companyInfo && companyInfo.checkStatus === 2"
            class="authentication-status2 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" color="#FA3243" name="close-c" />
            <view>审核拒绝</view>
          </view>
        </view>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="实名认证" @click="goRealNameFn">
        <view v-if="isRealName" slot="value" class="flex flex-vertical-c authentication-status3">
          <VoIcon :size="12" class="m-r-4" name="approve-have" />
          <view>已认证</view>
        </view>
        <view v-else slot="value" class="flex flex-vertical-c authentication-status0">
          <VoIcon :opacity="0.25" :size="12" class="m-r-4" color="#000" name="pending-review" />
          <view>未认证</view>
        </view>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="收货地址" @click="goTo('/pagesSupplier/Setting/AddressHome')">
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="我的银行卡" @click="goTo('/pagesSupplier/UserCenter/MyBankCard')">
        <text slot="value" class="center-value">{{ formData.bankCardNumber }}张</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="推广二维码" @click="promoteCodeClick">
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="注销修理厂" url="/pagesSupplier/Setting/LogoutSupplier">
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
    </VoCellGroup>
    <view class="p-b-safe-area" />
    <!-- 分享弹框 -->
    <!--    <VoShareQrCodeView ref="sharePop" :params="params" />-->
    <!-- 认证弹窗 -->
    <EraApproveModal :show.sync="showApprove" />
    <u-modal
      :show="showRealNameBoo"
      cancel-text="暂不实名"
      confirm-text="立即实名"
      confirmColor="#22284B"
      show-cancel-button
      @cancel="cancelFn"
      @confirm="confirmHandler"
    >
      <view class="info-content">您的账号未实名，请先完成实名认证。</view>
    </u-modal>
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'

  export default {
    name: 'UserCenter',
    data() {
      return {
        showRealNameBoo: false,
        isRealName: false,
        showApprove: false,
        companyInfo: {
          checkStatus: '', //0资料未提交   1审核中  2审核拒绝  3认证成功  4绑定手机号
        },
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
        params: {},
        shareCode: '',
      }
    },
    methods: {
      goTo(url) {
        if (this.companyInfo.checkStatus === 3) {
          this.$linkToEasy(url)
        } else {
          this.showApprove = true
        }
      },
      goRealNameFn() {
        if (this.isRealName) {
          this.$linkToEasy('/pagesGarage/UserCenter/RealNameStatus')
          return
        }
        this.showRealNameBoo = true
      },
      // 未认证跳转路径
      confirmHandler() {
        this.showRealNameBoo = false
        this.$linkToEasy('/pagesGarage/UserCenter/RealName')
      },
      // 取消认证
      cancelFn() {
        this.showRealNameBoo = false
      },
      /**
       * 去认证信息页
       */
      goApproveInfo() {
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
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
      async initFn() {
        const data = await this.$VoHttp.apiCompanyLegalRealName$GET()
        this.isRealName = data.data
        this.$VoHttp.apiCompanyInfoDetail().then((res) => {
          this.formData = res.data
        })

        this.$VoHttp.apiCompanyLegalInfo().then((res) => {
          this.companyInfo = res.data
        })
      },
      async promoteCodeClick() {
        if (this.companyInfo.checkStatus === 3) {
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
              const res = await this.$VoHttp.apiShareLinkAdd({
                shareInfo: JSON.stringify(this.params),
              })
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
          this.$linkToEasy(
            `/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`,
          )
        } else {
          this.showApprove = true
        }
      },
      changeName() {
        this.$linkToEasy(
          '/pagesSupplier/UserCenter/AccountName?storeName=' + this.formData.storeName,
        )
      },
    },
    onShow() {
      this.initFn()
    },
    onLoad() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        canChoose: 1,
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
      padding: 0rpx 10rpx;
      height: 36rpx;
      justify-content: center;
      border-radius: 200rpx;
    }
    .color-5ED697 {
      color: #5ed697 !important;
      background: #ecfaf3 !important;
    }
  }
  .authentication {
    &-status3 {
      padding: 4rpx 10rpx 2rpx 6rpx;
      border-radius: 200rpx;
      color: #00b259;
      background: #d9faea;
      font-size: 20rpx;
      line-height: 30rpx;
      font-weight: bold;
    }
    &-status1 {
      padding: 4rpx 10rpx 2rpx 6rpx;
      border-radius: 200rpx;
      color: #ff9b05;
      background: #fff5e6;
      font-size: 20rpx;
      line-height: 30rpx;
      font-weight: bold;
    }
    &-status0 {
      padding: 4rpx 10rpx 2rpx 6rpx;
      border-radius: 200rpx;
      color: $v-c0-25;
      background: #f7f7f8;
      font-size: 20rpx;
      line-height: 30rpx;
      font-weight: bold;
    }
    &-status2 {
      padding: 4rpx 10rpx 2rpx 6rpx;
      border-radius: 200rpx;
      color: #fa3243;
      background: #ffe6e8;
      font-size: 20rpx;
      line-height: 30rpx;
      font-weight: bold;
    }
  }
  .info-content {
    padding: 15px 3px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 30rpx;
    line-height: 150%;
  }
</style>
