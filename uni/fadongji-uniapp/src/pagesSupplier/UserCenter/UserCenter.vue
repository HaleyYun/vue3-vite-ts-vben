<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="center"
  >
    <VoNav is-fixed is-have-more title="账号信息" />
    <view class="center-portrait" @click="chooseImg">
      <image :src="$transferCosUrl(formData.storeUrl,1)" class="center-portrait__img" />
      <image class="center-portrait__icon" src="/static/created/UserCenter/change_vatar.png" />
    </view>
    <VoCellGroup :border="false">
      <!-- <VoCell
        :url="'/pagesSupplier/UserCenter/AccountName?storeName=' + formData.storeName"
        title="账户名称"
      > -->
      <EraCell title="账户名称">
        <text slot="value" class="center-value text-right maxWidth overEllipsis">
          {{ formData.storeName }}
        </text>
        <!-- <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" /> -->
      </EraCell>
      <VoCell title="账号类型">
        <text v-if="formData.isAdmin" slot="value" class="center-value">主账号</text>
        <text v-else slot="value" class="center-value">子账号</text>
      </VoCell>
      <view class="center-box" />
      <EraCell title="店铺简称">
        <text slot="value" class="center-value overEllipsis text-right maxWidth">
          <!-- {{ formData.storeName }}{{ formData.storeName ? '官方旗舰店' : '' }} -->
          {{ formData.storeName }}
        </text>
      </EraCell>
      <VoCell title="店铺编码">
        <text slot="value" class="center-value">{{ formData.companyId }}</text>
      </VoCell>
      <VoCell title="合同剩余天数">
        <text slot="value" class="center-value">{{ formData.contractNumber || 0 }}天</text>
      </VoCell>
      <VoCell
        :title="getRoleName(userInfo.roleCode, roleArrGet) + '合作合同'"
        @click="toContractDetail"
      >
        <view slot="value" class="flex flex-vertical-c supplier-tag blue">
          <VoIcon :size="12" class="m-r-4" name="signed-have" />
          <view class="fz-20 fz-b">{{ formData.signContract === true ? '已签订' : '未签订' }}</view>
        </view>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="认证信息" @click="goApproveInfo">
        <view slot="value" class="flex flex-vertical-c">
          <view
            v-if="formData && formData.checkStatus === 3"
            class="authentication-status3 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" name="approve-have" />
            <view>已认证</view>
          </view>
          <view
            v-if="formData && formData.checkStatus === 1"
            class="authentication-status1 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" color="#FF9B05" name="pending-review" />
            <view>认证中</view>
          </view>
          <view
            v-if="!formData || formData.checkStatus === 0"
            class="authentication-status0 flex flex-vertical-c"
          >
            <VoIcon :opacity="0.25" :size="12" class="m-r-4" color="#000" name="pending-review" />
            <view>未认证</view>
          </view>
          <view
            v-if="formData && formData.checkStatus === 2"
            class="authentication-status2 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" color="#FA3243" name="close-c" />
            <view>审核拒绝</view>
          </view>
          <view
            v-if="formData && formData.checkStatus === 4"
            class="authentication-status2 flex flex-vertical-c"
          >
            <VoIcon :size="12" class="m-r-4" color="#FA3243" name="close-c" />
            <view>验证手机号</view>
          </view>
        </view>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <block v-if="formData.platformCode === 'supplier'">
        <VoCell title="经营品类" @click="goTo('/pagesCommon/StoreInfo/BusinessCategory')">
          <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
        </VoCell>
        <VoCell title="经营品牌" @click="goTo('/pagesCommon/StoreInfo/OperateBrand')">
          <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
        </VoCell>
      </block>
      <block v-if="channelInfo">
        <view class="center-box" />
        <VoCell :title="formData.platformCode === 'agent' ? '渠道经理' : '招商经理'">
          <text slot="value" class="center-value">{{ channelInfo.contractName || '暂无' }}</text>
        </VoCell>
        <VoCell title="联系电话" @click="$cellPhone(channelInfo.userName)">
          <text slot="value" class="center-value">{{ channelInfo.userName || '暂无' }}</text>
        </VoCell>
      </block>
      <view class="center-box" />
      <VoCell
        v-if="formData.platformCode !== 'agent'"
        title="我的银行卡"
        @click="goTo('/pagesSupplier/UserCenter/MyBankCard')"
      >
        <text slot="value" class="center-value">{{ (formData.bankCardNumber || 0) + '张' }}</text>
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell title="退货地址管理" @click="goTo('/pagesSupplier/Setting/AddressHome')">
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell v-if="userInfo.platformCode !== 'supplier' && formData.showStatus" title="推广二维码" @click="promoteCodeClick">
        <VoIcon slot="right-icon" :opacity="0.25" class="m-t-4" name="right-arrow" />
      </VoCell>
      <VoCell url="/pagesSupplier/Setting/LogoutSupplier">
        <block slot="title">
          <view>注销{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>
        </block>
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
  // import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserCenter',
    components: {
      // VoShareQrCodeView,
    },
    data() {
      return {
        params: {},
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
          showStatus: false,
        },
        channelInfo: {},
        shareCode: '',
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
      }),
    },
    methods: {
      toContractDetail() {
        console.log(this.formData)
        if (!this.formData.contractUrl) {
          this.$u.toast('合同信息为空')
          return
        }
        this.$linkToEasy(`/pages/CommonWeb/WebView?contractUrl=${this.formData.contractUrl}`)
      },
      goTo(url) {
        if (this.formData.checkStatus === 3) {
          this.$linkToEasy(url)
        } else {
          this.showApprove = true
          this.setHiddenModal()
        }
      },
      /**
       * 去认证信息页
       */
      goApproveInfo() {
        if (this.userInfo.checkStatus === -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=' + this.userInfo.roleCode)
        }else if(this.userInfo.checkStatus === 4){
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
        } else {
          this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
        }
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
        await this.$VoHttp.apiCompanyInfoDetail().then((res) => {
          this.formData = res.data
        })
        await this.$VoHttp.apiCompanyLegalInfo().then((res) => {
          this.companyInfo = res.data
        })
        await this.$VoHttp.apiCompanyInfoInviterInfo().then((res) => {
          this.channelInfo = res.data || {}
        })
      },
      async promoteCodeClick() {
        console.log(this.formData)
        if (this.formData.checkStatus === 3) {
          // ENG-6995
          if (this.userInfo.roleCode === 'agent') {
            this.params.roleCode = 'garage'
            this.params.canChoose = false
          } else {
            this.params.canChoose = true
          }
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
          this.setHiddenModal()
        }
      },
      setHiddenModal() {
        setTimeout(() => {
          this.showApprove = false
        }, 1500)
      },
    },
    onLoad() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        canChoose: true,
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
      border-radius: 200rpx;

      &.blue {
        background-color: #e5efff;
        color: #2676ff;
      }
    }

    .color-5ED697 {
      background-color: #d9faea;
      color: #00b259;
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
  .maxWidth {
    max-width: 540rpx;
  }
</style>
