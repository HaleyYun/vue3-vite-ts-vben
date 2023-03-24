<template>
  <view>
    <view class="cashier">
      <VoNav is-fixed is-have-more title="收银台" />
      <view v-if="+status === 4">
        <image class="cashier-img" src="/static/common/success.png" />
        <view class="cashier-tips">支付成功</view>
        <view
          class="cashier-pay"
          v-if="accountAmount && accountAmount != 'undefined' && Number(accountAmount) > 0"
        >
          <block v-if="price && Number(price) > 0">
            <text class="cashier-pay__state">现金金额</text>
            <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />
          </block>
          <text class="cashier-pay__state">
            <text v-if="price && Number(price) > 0">，</text>
            账期金额
          </text>
          <VoPointPrice
            :leftSize="20"
            :price="accountAmount"
            :show-unit="true"
            display="inline-block"
          />
        </view>
        <view class="cashier-pay" v-else>
          <text class="cashier-pay__state">已支付</text>
          <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />
        </view>
        <EraButton circle text="完成" @click="goOrderList" />
      </view>
      <view v-else-if="+status === 3||+status === 1">
        <image class="cashier-img" src="/static/common/failure.png" />
        <view class="cashier-tips">支付失败</view>
        <view class="cashier-pay">
          <text class="cashier-pay__state">待支付</text>
          <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />
        </view>
        <EraButton circle text="重新支付" @click="showPay = true" />
      </view>
      <view v-else-if="+status === 99">
        <image class="cashier-img" src="/static/common/failure.png" />
        <view class="cashier-tips">待支付</view>
        <view class="cashier-pay">
          <text class="cashier-pay__state">待支付</text>
          <VoPointPrice :leftSize="20" :price="price" :show-unit="true" display="inline-block" />
        </view>
        <EraButton circle text="重新支付" @click="showPay = true" />
      </view>
    </view>
    <VoPayPopup :show.sync="showPay" :total-price="price" @close="cancelPay" @confirm="payFn" />
  </view>
</template>

<script>
  import { appSource, goWechat, hideLoading, showLoading } from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'PayResult',
    data() {
      return {
        orderId:'',
        status: '',
        price: '',
        accountAmount: '', //账期金额
        type: '', // agent 服务商   garage 汽修厂
        childrenIdList: [], //拆单后的订单id 数组
        orderType: '', //=1全国下单
        origin: '', //install安装订单
        showPay: false,
        result: {},
        payOrderInfo: {},
      }
    },
    methods: {
      /**
       * 取消支付
       */
      cancelPay() {
        this.showPay = false
        if (this.type === 'agent') {
          this.$linkToEasy('/pagesAgent/Order/InvestOrder/InvestOrderList?status=1210')
        } else if (this.type === 'garage') {
          if (this.origin === 'install') {
            uni.redirectTo({
              url: '/pagesGarage/InstallOrderUser/OrderList',
            })
          } else {
            this.$linkToEasy('/pagesGarage/InstallOrder/InstallOrderList?tabIndex=1')
          }
        }
      },
      payFn(info) {
        console.log('确定支付事件', info, this.userInfo.platformCode)
        console.log('origin=====', this.origin)

        if (this.userInfo.platformCode === 'agent') {
          this.goPayFn(info)
        } else if (this.userInfo.platformCode === 'garage') {
          if (this.origin === 'install') {
            this.payInstallHandler(info)
            return
          }
          this.payHandler(info)
        } else if (this.userInfo.platformCode === 'oldMachine') {
          console.log(this.payOrderInfo);
          this.payHandler(info)
        }
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          ...this.payOrderInfo,
        }
        console.log(this.payOrderInfo)
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.payOrderInfo.orderId })
                .then((res) => {
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  this.childrenIdList = that.payOrderInfo.childrenIdList
                  this.goOrderList()
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.payOrderInfo.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                this.childrenIdList = that.payOrderInfo.childrenIdList
                this.goOrderList()
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      /**
       * 去支付
       */
      async goPayFn(info) {
        // console.log('this.result', this.result)
        let that = this
        const req = {
          orderId: this.result.id,
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          ...this.result,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.result.id })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }

                  that.goOrderList()
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        // console.log('this.payInfo', payInfo)
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            // console.log('拉起支付宝', res)
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          // console.log('支付结果==>', res)
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.result.id })
              .then((res) => {
                console.log('支付结果==>', res)
                vocenPay.voPayRemoveListening()
                that.goOrderList()
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      //支付安装订单
      async payInstallHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          source: appSource(),
          userId: that.payOrderInfo.buyerId,
          cashAmount: this.price,
          accountAmount: 0,
          orderId: that.payOrderInfo.orderId,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.payOrderInfo.orderId })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  this.childrenIdList = that.payOrderInfo.childrenIdList
                  this.goOrderList()
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          this.showPay = false
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .apiOrderInstallPay(req)
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.payOrderInfo.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                this.childrenIdList = that.payOrderInfo.childrenIdList
                this.goOrderList()
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      /**
       * 去订单列表
       */
      goOrderList() {
        if (this.type === 'agent') {
          // if (+this.status === 3 || +this.status === 99) {
          //   //跳转待付款订单
          //   uni.redirectTo({
          //     url: `/pagesAgent/Order/InvestOrder/InvestOrderList?status=1210&type=${this.orderType}`,
          //   })
          //   return
          // }
          uni.redirectTo({
            url: `/pagesAgent/Order/InvestOrder/InvestOrderList?status=1220&type=${this.orderType}`,
          })
        } else if (this.type === 'garage') {
          if (this.childrenIdList && this.childrenIdList.length > 0) {
            let orderId = this.childrenIdList[0]
            if (this.origin === 'install') {
              uni.redirectTo({
                url: '/pagesGarage/InstallOrderUser/OrderList',
              })
            } else {
              uni.redirectTo({
                url: '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + orderId,
              })
            }

            return
          }
          if (this.origin === 'install') {
            uni.redirectTo({
              url: '/pagesGarage/InstallOrderUser/OrderList',
            })
          } else {
            uni.redirectTo({
              url: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=2',
            })
          }
        } else if (this.type === 'oldMachine') {
          uni.redirectTo({
            url: '/pagesOldBuyer/MyOrder/MarkerOrderList',
          })
        }
      },
    },
    onShow(){
      if(this.orderId){
        this.$VoHttp
            .payPayResult({ orderId: this.orderId }).then(res=>{
              this.status=res.data.status
        })
      }

    },
    onLoad(options) {
      console.log(options, '11111111')
      this.price = options.price
      this.status = options.status
      this.orderId=options.orderId||''
      this.type = options.type
      this.orderType = options.orderType || ''
      this.accountAmount = options.accountAmount || 0
      this.origin = options.origin || ''
      this.payOrderInfo = this.$storage.get('OrderPayInfo') || ''
      if (options.childrenIdList) {
        this.childrenIdList = JSON.parse(options.childrenIdList)
      }
      let result = this.$storage.get('payParams')
      this.result = result || {}
    },
  }
</script>

<style lang="scss" scoped>
  .cashier {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    text-align: center;
    background: #fff;
    padding-top: 128rpx;
    box-sizing: border-box;
    &-img {
      width: 176rpx;
      height: 176rpx;
      margin-bottom: 20rpx;
    }
    &-tips {
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
      margin-bottom: 52rpx;
    }
    &-pay {
      margin-bottom: 104rpx;
      &__state {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
        margin-right: 16rpx;
      }
    }
  }
</style>
