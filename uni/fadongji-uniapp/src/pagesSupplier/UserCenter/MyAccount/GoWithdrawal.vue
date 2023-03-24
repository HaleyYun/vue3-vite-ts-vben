<template>
  <view class="withdrawal">
    <VoNav is-have-more title="提现" />
    <view class="line-bg h24 w-full" />
    <view class="withdrawal-can">
      <view class="fz-28 color-block lh150 m-b-4 fz-b">可提现金额</view>
      <view class="flex flex-vertical-b flex-justify-between">
        <VoPointPrice
          :left-size="20"
          :price="canWithdrawAmount"
          :right-size="12"
          :show-unit="true"
        />
        <view class="withdrawal-can__button" @click="$linkToEasy('./WithdrawalRecord')"
          >提现记录</view
        >
        <!--        <EraButton size="mini" theme-type="Wire">提现记录</EraButton>-->
      </view>
    </view>
    <view class="line-bg h24 w-full" />

    <view class="withdrawal-account">
      <view class="fz-28 lh150 color-block m-b-24">收款账户</view>
      <block v-if="bankInfo && bankInfo.bankName">
        <view class="flex flex-vertical-c h48 flex-justify-between" @click="showBankCard = true">
          <view class="flex flex-vertical-c">
            <VoIcon :size="24" name="bank-card" />
            <view class="fz-28 color-block-85 m-l-16">
              {{ bankInfo.bankName }}({{ formatterCardNo(bankInfo.bankCardNo) }})
            </view>
          </view>
          <view class="flex flex-vertical-c">
            <VoIcon :size="24" name="right-arrow" />
          </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="w-24 h-24" />
          <view class="m-t-14 fz-28 color-block-65 lh150 m-l-16"> {{ bankInfo.bankName }} </view>
        </view>
      </block>
      <view
        v-else
        class="flex flex-vertical-c h48 flex-justify-between"
        @click="$linkToEasy('/pagesSupplier/UserCenter/AddBankCard')"
      >
        <view class="fz-24 color-block-25">您还没有收款账户信息，请先添加收款账户</view>
        <view class="flex flex-vertical-c">
          <view class="fz-28 color-block-65 m-r-8 lh42">去添加</view>
          <VoIcon :opacity="0.45" :size="16" color="#000000" name="right-arrow" />
        </view>
      </view>
    </view>
    <view class="line-bg h24 w-full" />
    <view class="withdrawal-price">
      <view class="flex flex-vertical-c fz-28 color-block">
        <view class="m-r-16 lh150">提现金额</view>
        <VoIcon
          :opacity="0.45"
          :size="20"
          color="#000000"
          name="account-question"
          @click="roleModel = true"
        />
      </view>
      <view class="withdrawal-price__info">
        <view class="fz-40 lh150 color-block fz-b">￥</view>
        <u-input
          v-model.number="amount"
          :clearable="true"
          :readonly="!bankInfo || !bankInfo.bankName"
          border="none"
          class="fz-b"
          fontSize="28"
          type="digit"
          @input="checkVal"
        />
      </view>
      <view class="line-bg h2 m-t-10 m-b-24 w-full" />
      <view v-if="showTips" class="lh150 fz-24 color-f20014">输入金额超过可用提现金额</view>
      <view v-else class="lh150 flex flex-vertical-c fz-24">
        <view class="color-block-25">提现手续费 1元/笔</view>
        <view class="m-l-16 color-tip" @click="amount = canWithdrawAmount">全部提现</view>
      </view>
    </view>
    <VoSafetyArea>
      <block slot="group">
        <view class="withdrawal-fixed">
          <EraButton
            v-if="hour >= 20"
            :fontSize="32"
            disabled
            size="medium"
            text="受银行限制，晚上8点之后不可提现"
          />
          <EraButton
            v-else-if="(bankInfo && bankInfo.bankName) && +amount > 0 && checked"
            :font-size="32"
            size="medium"
            text="提现"
            @click="sureWithdraw"
          />
          <EraButton v-else :fontSize="32" disabled size="medium" text="提现" />
        </view>
      </block>
    </VoSafetyArea>
    <BankCardSelect :show.sync="showBankCard" @changeBinkCard="changeBinkCard" />
    <u-modal
      :show="!isRealName"
      cancel-text="暂不实名"
      confirm-text="立即实名"
      confirmColor="#22284B"
      show-cancel-button
      @cancel="cancelFn"
      @confirm="confirmHandler"
    >
      <view class="info-content">您的账号未实名，请先完成实名认证。</view>
    </u-modal>
    <VoModal
      :closeOnClickOverlay="true"
      :show="showModal"
      :showCancelButton="true"
      cancelText="取消"
      confirmText="立即签约"
      content="您未签约电子协议，无法提现，是否签约？"
      @cancel="cancelSignFn"
      @confirm="getSignUrl"
    />
    <VoModal
      title="提现规则说明"
      :content="roleContent"
      :show="roleModel"
      closeOnClickOverlay
      confirmText="我知道了"
      @confirm="roleModel = false"
    >
      <block slot="default">
        <scroll-view class="rule-title color-block-65" scroll-y>
          <view>（1） 提现时间：每天7:00-20:00。</view>
          <view>（2） 提现额度：单日限额：个人账户单笔提现额度20万，单账户100万；对公账户单笔100万，单账户100万。</view>
          <view>（3） 到账时间：T+1日到账（即发起提现后下一个工作日到账，因受疫情、自然灾害等不可抗力因素影响时期除外）。</view>
          <view>（4） 费用说明：提现手续费1元/笔。</view>
          <view>        （5） 实名认证：每个实名认证信息只可绑定一个平台账号，您填写的银行账户信息应与实名认证信息保持一致。
          </view>
          <view>        （6） 提现条件：您应满足平台提现的前置条件，并根据提现页面提示的流程、规范进行提现操作。如因您自身原因导致提现失败（包括但不限于未按提现要求操作、未完成实名认证、未绑定收款账号、实名认证信息或已绑定其他账号、实名认证信息/预留的收款账号信息/第三方支付渠道账号不一致、已与第三方支付渠道解绑账号等），您应自行承担因此导致的损失（包括但不限于因打款失败导致资金退回产生的渠道手续费，或打款至他人账户导致无法追回资金等）。
          </view>
        </scroll-view>
      </block>
    </VoModal>
  </view>
</template>

<script>
  import BankCardSelect from '@/pagesSupplier/UserCenter/components/BankCardSelect'
  import { formatterHandle, hideLoading, linkToEasy, showLoading } from "@/common/helper";

  export default {
    name: 'GoWithdrawal',
    components: { BankCardSelect },
    data() {
      return {
        showTips: false,
        roleModel: false,
        roleContent:'',
        showModal: false,
        showBankCard: false,
        // 是否已认证
        isRealName: true,
        // 可提现金额
        canWithdrawAmount: '0',
        // 选中银行卡的下标
        selected: 0,
        // 提现银行信息
        bankInfo: {
          // bankCardPro: 1, // 账户类型（0：个人银行卡, 1：企业对公账户）
          // type: 1, // 账户类型（0：个人银行卡, 1：企业对公账户）
          // bankCardNo: 123, // 银行卡号
          // bankName: '银行卡', // 银行名称
          // cardType: 1, // 卡类型（1：储蓄卡，2：信用卡）
          // legalName: '', // 法人姓名
          // fullName: '', // 企业全称
        },
        checked: false,
        formatterMoney: (value) => formatterHandle(value, 'money'),
        formatterCardNo: (value) => `****** ${value.slice(-4)}`,
        // 当前时间
        hour: 0,
        // 提现金额
        amount: '',
      }
    },
    methods: {
      /**
       * @description 取消协议
       */
      cancelSignFn(){
          this.$backFn()
      },
      // item.type = item.bankCardPro === 0 ? 2 : 1
      async initFn() {
        try {
          showLoading('加载中')
          const data = await this.$VoHttp.apiCompanyLegalRealName$GET({},{noLoading:true})
          this.isRealName = data.data
          if(this.isRealName){
            await this.getUesrMain()
            await this.serchDeil()
          }
          hideLoading()
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '请求失败')
        }
      },
      // 获取账余额信息
      async getUesrMain() {
        showLoading()
        try {
          const { data } = await this.$VoHttp.USER.apiAccountDetailsMain({},{noLoading:true})
          this.canWithdrawAmount = data.canWithdrawAmount
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '请求失败')
        }
        hideLoading()
      },
      // 查询提现协议
      async serchDeil() {
        try {
          const { data } = await this.$VoHttp.USER.apiExtraBankList({},{noLoading:true})
          if (data && data.length) {
            this.bankInfo = data[0]
          } else {
            this.bankInfo = data
            // this.$u.toast('请先添加要提现的银行卡')
            return
          }
          let param = {}
          param.type = +this.bankInfo.bankCardPro === 1 ? +this.bankInfo.bankCardPro : 2
          const res = await this.$VoHttp.apiExtraWithdrawQuerySign$GET(param)
          this.checked = res.data
          if (+res.code !== 20001 || !res.data) {
            this.showModal = true
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 获取签约协议第三方地址
      async getSignUrl() {
        try {
          let param = {}
          param.type = +this.bankInfo.bankCardPro === 1 ? +this.bankInfo.bankCardPro : 2
          const data = await this.$VoHttp.apiExtraWithdrawSign$PUT(param)
          if (+data.code === 20001) {
            this.showModal=false
            this.$storage.set('withdrawSign', data.data)
            // #ifdef APP-PLUS
            this.$linkToEasy('/pages/CommonWeb/WebView?isLocal=1')
            // #endif
            // #ifndef APP-PLUS
            window.open(data.data, '_self')
            // #endif
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 提现申请
      async sureWithdraw() {
        if (+this.amount <= 0) {
          this.$u.toast('请填写您要提现的金额')
          return
        }
        if (this.showTips) {
          this.$u.toast('请输入正确的提现金额')
          return
        }
        if (!this.bankInfo || !this.bankInfo.bankCardNo) {
          this.$u.toast('请先添加要提现的银行卡')
          return
        }
        if (!this.checked) {
          this.$u.toast('请先签约电子协议再进行提现')
          return
        }
        showLoading()
        try {
          let param = {
            amount: this.amount,
            bankCardNo: this.bankInfo.bankCardNo,
            type: this.bankInfo.bankCardPro === 0 ? 2 : 1,
          }
          const data = await this.$VoHttp.apiExtraWithdrawApply(param)
          if (+data.code === 20001) {
            this.$toast(data.message, 'success', '/static/icons/success_icon.png')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          } else {
            this.$u.toast(data.message || '网络错误')
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络错误')
        }
        hideLoading()
      },
      // 检查输入金额
      checkVal(val) {
        let max = +this.canWithdrawAmount || 0
        this.showTips = +val > max
        return formatterHandle(val, 'money')
      },
      // 未认证跳转路径
      confirmHandler() {
        this.$linkToEasy('/pagesGarage/UserCenter/RealName')
      },
      // 取消认证
      cancelFn() {
        this.$backFn()
      },
      // 切换提现银行信息
      async changeBinkCard(item) {
        this.bankInfo = item
        let param = {}
        param.type = +this.bankInfo.bankCardPro === 1 ? +this.bankInfo.bankCardPro : 2
        const res = await this.$VoHttp.apiExtraWithdrawQuerySign$GET(param)
        this.checked = res.data
        if (+res.code !== 20001 || !res.data) {
          this.showModal = true
        }
      },
    },
    onLoad() {
      this.hour = new Date().getHours()
    },
    onShow() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .withdrawal {
    width: 750rpx;
    min-height: 100vh;
    background: #f7f7f8;
    box-sizing: border-box;

    &-can {
      width: 750rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #ffffff;
      &__button {
        font-size: 24rpx;
        height: 60rpx;
        line-height: 60rpx;
        color: $v-tags;
        padding: 0 24rpx;
        box-sizing: border-box;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 40rpx;
      }
    }
    &-account {
      width: 750rpx;
      height: 226rpx;
      padding: 24rpx 32rpx 0rpx 32rpx;
      box-sizing: border-box;
      background: #ffffff;
    }
    &-price {
      width: 750rpx;
      background: #ffffff;
      padding: 24rpx 32rpx 20rpx 32rpx;
      box-sizing: border-box;
      &__info {
        margin-top: 62rpx;
        display: flex;
        align-items: center;
      }
    }
    &-fixed {
      width: 750rpx;
      padding: 18rpx 0;
      box-sizing: border-box;
    }

    .w-24 {
      width: 24px;
    }
    .h-24 {
      height: 24px;
    }
    .color-tip {
      color: $v-tip;
    }
    .color-f20014 {
      color: #f20014;
    }
  }
  .info-content {
    padding: 15px 3px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 30rpx;
    line-height: 150%;
  }
  .rule-title{
    height: 600rpx;
    overflow-y: scroll;
    font-size: 32rpx;
    line-height: 150%;
  }
</style>
