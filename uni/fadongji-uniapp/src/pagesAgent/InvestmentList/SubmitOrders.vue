<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="submit flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="提交订单" />
      <view class="flex1 overflow-y">
        <view v-if="addressData" class="submit-address flex flex-vertical-t" @click="toAddressPage">
          <view class="flex flex-vertical-c flex1">
            <VoIcon class="m-r-8" name="address" />
            <view class="flex1">
              <view class="fz-28 color-block-65 lh42">
                <text class="m-r-8">{{ addressData.name }}</text>
                <text>{{ addressData.mobile }}</text>
              </view>
              <view class="fz-b fz-28 m-t-8 lh42 overTwoEllipsis"
                >{{ addressData.provinceName }}{{ addressData.cityName }} {{ addressData.areaName
                }}{{ addressData.address }}
              </view>
            </view>
          </view>
          <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
        </view>
        <view
          v-else
          class="submit-address flex flex-vertical-c flex-justify-between"
          @click="toAddressPage"
        >
          <VoIcon class="m-r-8" name="address" />
          <view class="flex flex-vertical-c">
            <view class="fz-30 color-gray">添加收货地址</view>
            <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
          </view>
        </view>
        <view v-for="(item, index) of investGoodsData" :key="index" class="submit-info">
          <view class="submit-info__title flex flex-vertical-c" @click="goImUrl(item)">
            <VoIcon :size="24" class="m-r-4" name="smile-m" />
            <view class="fz-28 fz-b lh42">{{ item.shopName }}</view>
            <VoIcon :opacity="0.65" :size="18" class="m-l-4" name="right-arrow" />
          </view>

          <OrdersList
            v-for="(info, infoIndex) of item.cartWarehouseList"
            :key="infoIndex"
            :info="info"
          />
          <!-- @getRemark="setRemark" -->
        </view>
        <view class="submit-money">
          <view class="submit-money__line">
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="lh42 fz-28 color-block">商品总额</view>
              <view class="m-r-64 lh48 fz-32">
                <VoPointPrice
                  :price="formData.totalPrice"
                  :show-unit="true"
                  display="inline-block"
                />
              </view>
            </view>
            <view
              v-if="formData.cashPrice > 0"
              class="flex flex-vertical-c flex-justify-between m-t-18"
            >
              <view class="lh42 fz-28 color-block">现金应付款</view>
              <view class="m-r-64 lh48 fz-32 color-red">
                <VoPointPrice
                  :price="formData.cashPrice"
                  :show-unit="true"
                  display="inline-block"
                />
              </view>
            </view>
            <view
              v-if="formData.paymentPrice > 0"
              class="flex flex-vertical-c flex-justify-between m-t-18"
              @click="showDetail = true"
            >
              <view class="lh42 fz-28 color-block">账期应付款</view>
              <view class="flex flex-vertical-c">
                <view class="m-r-8 lh48 fz-32 color-red">
                  <VoPointPrice
                    :price="formData.paymentPrice"
                    :show-unit="true"
                    display="inline-block"
                  />
                </view>
                <VoIcon
                  :opacity="0.25"
                  :size="16"
                  class="m-r-24"
                  color="#000"
                  name="question-line"
                />
              </view>
            </view>
          </view>
          <view class="submit-money__total"
            >合计：
            <VoPointPrice :price="formData.totalPrice" :show-unit="true" display="inline-block" />
          </view>
        </view>
      </view>
      <view class="submit-bottom flex flex-justify-r p-b-safe-area">
        <view class="m-r-24 flex flex-column flex-vertical-t">
          <view class="fz-28 lh48">
            合计：
            <VoPointPrice :price="formData.totalPrice" :show-unit="true" display="inline-block" />
          </view>
          <view class="fz-24 m-t-4 color-block-65 lh36">
            共{{ formData.totalKind }}种{{ formData.totalNum }}件商品</view
          >
        </view>
        <view class="submit-bottom__button" @click="toSettlement()">去结算</view>
      </view>
    </view>
    <u-popup :round="10" :show="showDetail" closeable mode="bottom" @close="close" @open="open">
      <PaymentDetails :good-data="goodDataList" :info="formData" @confirm="showDetail = false" />
    </u-popup>
    <u-popup :round="5" :show="showOutOfStock" mode="center" @close="close" @open="open">
      <outOfStockPopup />
    </u-popup>

    <VoPayPopup
      :show.sync="showPay"
      :total-price="formData.cashPrice"
      @close="cancelPay"
      @confirm="goPayFn"
    />
    <VoPayValidation
      :show="payValidationVisible"
      @close="cancelPay"
      @confirm="payValidationConfirm"
    />
  </view>
</template>

<script>
  import OrdersList from './components/OrdersList'
  import PaymentDetails from './components/PaymentDetails'
  import outOfStockPopup from './components/outOfStockPopup'
  import {
    appSource,
    getImUserId,
    getUserCheckStatus,
    goWechat,
    hideLoading,
    showLoading,
  } from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'SubmitOrders',
    components: { OrdersList, PaymentDetails, outOfStockPopup },
    data() {
      return {
        isPayVal:false,// 是否生成了订单
        addressId: '',
        isCartInit: false,
        payValidationVisible: false,
        showPay: false, // 支付弹窗
        showDetail: false,
        showOutOfStock: false,
        addressData: null, //地址相关
        investGoodsData: [],
        formData: {
          isAllSelect: false,
          totalPrice: 0, //合计
          totalKind: 0, //几种商品
          totalNum: 0, //几件商品
          paymentPrice: 0, // 账期金额
          cashPrice: 0, //现金金额
          accountPeriodDays: 0, //账期天数
        },
        goodDataList: [],
        investType: 1,
        result: {},
        //下单来源 0.默认是投资订单 2.销售订单
        sourceType: 0,

        isAccountPay: false,
        smsCode: '',
      }
    },
    onLoad(options) {
      this.isCartInit = options.isCartInit ? JSON.parse(options.isCartInit) : false
      if (options.queryType === 'A') {
        this.investType = 0
      }
      if (options.sourceType) {
        this.sourceType = Number(options.sourceType)
      }
      // this.addressData = this.$storage.get('addressDefault')
      this.investGoodsData = this.$storage.get('investGoodsData')

      this.investGoodsData.forEach((item) => {
        item.cartWarehouseList.forEach((good) => {
          good.cartDetailstList.forEach((data) => {
            data.remark = ''
            this.goodDataList.push(data)
          })
        })
      })
      this.addressId = options.addressId // console.log('this.investGoodsData', this.investGoodsData)
      this.totalCalculateFn()
      if (this.addressId) {
        this.getAddress(this.addressId)
      } else {
        this.initAddrss()
      }
    },
    mounted() {
      uni.$on('ChooseAddress', (res) => {
        this.addressData = res
        // this.submitForm.buyerInfo.addressId = res.id
        // this.submitForm.buyerInfo.buyerId = this.userInfo.id
      })

      // #ifdef APP-PLUS
      vocenPay.voPayModuleListeningCallback({}, (res) => {
        console.log(res, 'resresresres')

        if (res.businessCode == 'S10001') {
          //支付宝返回App内成功
        }
      })
      // #endif
    },
    methods: {
      //备注
      setRemark(remark) {
        if (remark) {
          let remarkData = this.$storage.get('remarkData')
          // console.log(remarkData, '$event')
          this.investGoodsData.forEach((item) => {
            item.cartWarehouseList.forEach((good) => {
              good.cartDetailstList.forEach((data) => {
                if (data.id === remarkData.id) {
                  data.remark = remark
                }
              })
            })
          })
          console.log('this.investGoodsData22', this.investGoodsData)
          this.$forceUpdate()
        }
      },
      goImUrl(item) {
        //根据店铺id获取userId
        getImUserId({ companyId: item.shopId })
          .then((res) => {
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: item.shopName,
                platformCode: res.data.platformCode,
              }
              this.$storage.set('temp_im_room_info', info)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            } else {
              this.$u.toast('用户信息错误')
            }
          })
          .catch((err) => {
            this.$u.toast('用户信息错误')
          })
      },
      //账期支付验证通过
      payValidationConfirm(code) {
        this.smsCode = code
        const req = {
          orderId: this.result.id,
          payChannel: 0,
          payType: '61', // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          smsCode: code,
          ...this.result,
        }
        showLoading('加载中')
        this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => {
            console.log(res.data)
            hideLoading()
            this.payValidationVisible = false
            this.$u.toast('支付成功')
            uni.redirectTo({
              url:
                '/pagesCommon/PayResult/PayResult?type=agent&status=4' +
                  '&price=' +
                  this.formData.cashPrice +
                  '&accountAmount=' +
                  this.result.accountAmount || '',
            })
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
      },
      /**
       * 取消支付
       */
      cancelPay() {
        this.showPay = false
        this.payValidationVisible = false
        uni.redirectTo({
          url: '/pagesAgent/Order/InvestOrder/InvestOrderList?status=1210',
        })
      },
      /**
       * 去支付
       */
      async goPayFn(info) {
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
                  // if (res && res.data && +res.data.status === 1) {
                  //   console.log('未支付')
                  //   return
                  // }

                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=agent&status=' +
                        res.data.status +
                        '&orderId='+that.result.id+
                        '&price=' +
                        this.formData.cashPrice +
                        '&accountAmount=' +
                        this.result.accountAmount || '',
                  })
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
        //全部都是账期支付
        // if (this.isAccountPay) {
        //   this.$u.toast('支付成功')
        //   uni.redirectTo({
        //     url:
        //       '/pagesCommon/PayResult/PayResult?type=agent&status=4' +
        //       '&price=' +
        //       this.formData.totalPrice,
        //   })
        //   return
        // }
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
          // console.log('支付结果==>', res)
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.result.id })
              .then((res) => {
                console.log('支付结果==>', res)
                vocenPay.voPayRemoveListening()
                uni.redirectTo({
                  url:
                    '/pagesCommon/PayResult/PayResult?type=agent&status=' +
                      res.data.status +
                      '&price=' +
                      this.formData.cashPrice +
                      '&accountAmount=' +
                      this.result.accountAmount || '',
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      open() {
        // console.log('open');
      },
      close() {
        this.showDetail = false
        this.showOutOfStock = false
        // console.log('close');
      },
      toAddressPage() {
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },
      // 获取默认地址
      initAddrss() {
        console.log('initAddrss')
        this.$VoHttp.USER.apiReceiverAddressDefault().then((res) => {
          console.log(res)
          this.addressData = res.data
        })
      },
      getAddress(id) {
        this.$VoHttp.apiReceiverAddress$Get({ id: id }).then((res) => {
          // let addressData = JSON.parse(option.data)
          console.log('getAddress')
          let addressData = res.data
          this.addressData = addressData
        })
      },
      /**
       * 计算价格
       */
      totalCalculateFn() {
        console.log('this.investGoodsData', this.investGoodsData)
        let totalPrice = 0 //合计
        let totalKind = 0 //几种商品
        let totalNum = 0 //几件商品
        let paymentPrice = 0 // 账期金额
        let cashPrice = 0 //现金金额
        // 遍历开始
        this.investGoodsData.map((item) => {
          if (item.cartWarehouseList && item.cartWarehouseList.length) {
            item.cartWarehouseList.map((it) => {
              if (it.cartDetailstList && it.cartDetailstList.length) {
                it.cartDetailstList.map((good) => {
                  totalKind++
                  totalNum += good.investmentNum
                  if (good.isCash) {
                    //现金
                    cashPrice = this.decimalAddFn(
                      cashPrice,
                      this.decimalMulFn(good.cashPrice, good.investmentNum),
                    )
                  } else {
                    //账期
                    paymentPrice = this.decimalAddFn(
                      paymentPrice,
                      this.decimalMulFn(good.accountPrice, good.investmentNum),
                    )
                  }
                })
              }
            })
          }
        })

        this.formData.totalPrice = this.decimalAddFn(paymentPrice, cashPrice).toFixed(2)
        this.formData.totalKind = totalKind
        this.formData.totalNum = totalNum
        this.formData.paymentPrice = paymentPrice
        this.formData.cashPrice = cashPrice
      },
      //结算
      async toSettlement() {
        if(this.isPayVal){
          // 如果已经生成订单 再次支付
          this.showPay=true
          return
        }

        // //检查是否可以下单
        // let val = await getUserCheckStatus()
        // if (!val) {
        //   this.$u.toast('当前用户禁止下单~~')
        //   return
        // }
        if (!this.addressData || !this.addressData.id) {
          uni.$u.toast('请先选择地址')
          return
        }
        if (this.result && this.result.id) {
          if (this.isAccountPay) {
            this.payValidationVisible = true
          } else {
            this.showPay = true
          }
          return
        }
        //showDetail = true
        console.log('this.investGoodsData', this.investGoodsData)
        let goodsInfoList = []
        let boolArr = []
        let cartIds = []
        this.investGoodsData.map((item) => {
          item.cartWarehouseList.map((it) => {
            it.cartDetailstList.map((good) => {
              boolArr.push(Number(good.isCash))
              cartIds.push(good.id)
              goodsInfoList.push({
                addedServices: [],
                goodsCount: good.investmentNum,
                goodsId: good.goodsId,
                isCash: Number(good.isCash) === 1 ? true : false,
                originalPrice: Number(good.isCash) === 1 ? good.cashPrice : good.accountPrice,
                periodDays: good.accountPeriodDays || good.accountPeriodTime || 0,
                projectId: good.investmentId,
                shippingType: good.shippingType,
                shopId: good.shopId || good.goodsGoodsShopInfoVO.shopId,
                skuProperty: '{}', //{"ces": "测试2"}
                warehouseId: good.warehouseId,
                remark: good.remark,
              })
            })
          })
        })
        //如果只有账期支付isAccountPay是true
        if (boolArr.length) {
          if (boolArr.indexOf(1) > -1) {
            this.isAccountPay = false
          } else {
            this.isAccountPay = true
          }
        }
        try {
          let params = {
            sign: '12313',
            req: {
              activityDetail: '{}',
              buyerInfo: {
                addressId: this.addressData.id,
                buyerId: this.userInfo.companyId,
                // buyerName: this.userInfo.userName,
              },
              investType: this.investType,
              goodsInfoList: goodsInfoList,
              source: appSource(), // 订单来源(1：Android，2：IOS，3：PC，4：小程序，5：h5)
            },
          }

          if (this.isCartInit) {
            params.req.isCartInit = this.isCartInit
            params.req.cartIds = cartIds
          }

          showLoading('加载中')
          console.log(params, 'paramsparamsparams')

          if (this.sourceType === 2) {
            params.req.isValet = this.investGoodsData[0].isValet
            console.log(params, 'params')
            const result = await this.$VoHttp
              .apiOrderPlaceGarage(params)
              .then((res) => res.data)
              .catch((e) => {
                uni.$u.toast(e.message || '下单失败')
              })
            if (result) {
              this.result = result
              console.log(result, '=====================')
              this.$storage.set('payParams', result)
              this.showPay = true
            }
            return
          }
          const result = await this.$VoHttp
            .apiOrderPlaceSpLocal(params)
            .then((res) => res.data)
            .catch((e) => {
              uni.$u.toast(e.message || '下单失败')
            })
          if (result) {
            this.isPayVal=true
            this.result = result
            this.$storage.set('payParams', result)
            if (this.isAccountPay) {
              this.payValidationVisible = true
            } else {
              this.showPay = true
            }
          }
        } catch (e) {
          uni.$u.toast(e.message || '请求失败')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .submit {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-address {
      background: #fff;
      padding: 24rpx 32rpx 24rpx 24rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
    }

    &-info {
      background: #fff;
      margin-top: 16rpx;
      padding-left: 32rpx;
      box-sizing: border-box;

      &__title {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }

    &-money {
      padding-left: 32rpx;
      box-sizing: border-box;
      margin: 16rpx 0 24rpx;
      background: #fff;

      &__line {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__total {
        text-align: right;
        padding: 14rpx 34rpx;
        line-height: 48rpx;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;

      &__button {
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 40rpx;
        font-size: 32rpx;
        color: #fff;
        background: $color-primary-yellow;
        border-radius: 48rpx;
      }
    }
  }

  .submit {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-address {
      background: #fff;
      padding: 24rpx 32rpx 24rpx 24rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
    }
  }
</style>
