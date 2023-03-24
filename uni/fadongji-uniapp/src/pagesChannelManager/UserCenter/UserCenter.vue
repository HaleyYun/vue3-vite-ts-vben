<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav is-fixed is-have-more title="基本信息" />
    <view class="center-portrait" @click="chooseImg">
      <image
        :src="formData.storeUrl + '&type=2' || '/static/default_avatar.png'"
        class="center-portrait__img"
      />
      <image class="center-portrait__icon" src="/static/created/UserCenter/change_vatar.png" />
    </view>
    <VoCellGroup :border="false">
      <VoCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="昵称"
      >
        <text slot="value" class="center-value">{{ formData.storeName }}</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="联系电话" url="/pagesSupplier/Setting/ChangeMobile">
        <text slot="value" class="center-value">{{ formData.userName }}</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <!--      <VoCell title="推广二维码" @click="promoteCodeClick">-->
      <!--        <VoIcon-->
      <!--            class="m-t-4"-->
      <!--            slot="right-icon"-->
      <!--            name="right-arrow"-->
      <!--            :opacity="0.25"-->
      <!--        />-->
      <!--      </VoCell>-->
    </VoCellGroup>
    <view class="p-b-safe-area" />
    <!-- 分享弹框 -->
    <!--    <VoShareQrCodeView ref="sharePop" />-->
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'
  // import VoShareQrCodeView from "@/components/VoShareView/VoShareQrCodeView";

  export default {
    name: 'UserCenter',
    components: {
      // VoShareQrCodeView,
    },
    data() {
      return {
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
      }
    },
    methods: {
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
          chooseImageByPromise({ count: 1, isTencentCloud: false, tip: '上传中' }).then((res) => {
            console.log(res, '******9999')
            let param = {
              storeUrl: res[0].fileNameUrl,
            }
            this.$VoHttp.apiCompanyInfoPhoto(param).then((rec) => {
              console.log(rec)
              uni.$u.toast('修改成功')
              this.formData.storeUrl = res[0].fileNameUrl
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
      // console.log(this.userInfo);
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
      color: #6794e3;
      background: #edf2fc;
      border-radius: 200rpx;
    }
    .color-5ED697 {
      color: #5ed697 !important;
      background: #ecfaf3 !important;
    }
  }
</style>
