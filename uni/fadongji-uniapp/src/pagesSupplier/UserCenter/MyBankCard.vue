<template>
  <view>
    <view :class="{ 'theme-blue': 'blue' }" class="card flex flex-column">
      <VoNav is-fixed is-have-more title="我的银行卡" />
      <view class="flex1 overflow-y">
        <!--  空数据页面  -->
        <NullData v-if="bankCardList.length < 1" />
        <!--  银行卡列表  -->
        <BankCardList
          v-for="(info, index) of bankCardList"
          v-else
          :key="index"
          :bank-card-list="info"
          @unBundling="unBundling(info)"
        />
      </view>
      <view class="card-bottom">
        <EraButton circle text="新增银行卡" @click="goAddBankCard" />
        <view class="p-b-safe-area" />
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      @cancel="cancel"
      @confirm="confirm"
    />
    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>

<script>
  import NullData from './components/NullData'
  import BankCardList from './components/BankCardList'

  export default {
    name: 'MyBankCard',
    components: { NullData, BankCardList },
    data() {
      return {
        showApprove: false,
        showModalCancel: false, // 删除模态框
        content: '解绑后会导致交易/分账/提现等业务受影响，是否确认解绑',
        bankCardList: [
          // {
          //   id: 1,
          //   bankLogo: '/static/created/UserCenter/bank_logo1.png',
          //   bankName: '中国工商银行',
          //   cardNumber: '6220 8808 4578 2098 4589',
          //   user: '江陵动力科技有限公司',
          // },
          // {
          //   id: 2,
          //   bankLogo: '/static/created/UserCenter/bank_logo2.png',
          //   bankName: '中国建设银行',
          //   cardNumber: '6220 8808 4578 2098 4589',
          //   user: '张木子',
          // },
        ],
        bankCardNo: '',
      }
    },
    methods: {
      /**
       * 点击解绑弹出模态框
       */
      unBundling(info) {
        this.showModalCancel = true
        this.bankCardNo = info.bankCardNo
      },
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.close()
        let param = {
          cardNo: this.bankCardNo,
        }
        this.$VoHttp.USER.apiExtraBankUnBankcard(param)
          .then((res) => {
            console.log(res)
            uni.$u.toast('解绑成功！')
            this.init()
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
      },
      /**
       * 去新增银行卡
       */
      goAddBankCard() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesSupplier/UserCenter/AddBankCard')
      },
      init() {
        this.$VoHttp.USER.apiExtraBankList()
          .then((res) => {
            console.log(this.bankCardList, '1111111')
            this.bankCardList = res.data || []
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
    onShow() {
      this.init()
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
