<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="submit flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="提交订单" />
      <view class="flex1 overflow-y">
        <view v-if="addressData" class="submit-address flex flex-vertical-c" @click="toAddressPage">
          <VoIcon class="m-r-8" name="address" />
          <view class="flex1">
            <view class="fz-28 color-block-65 lh42">
              <text class="m-r-8">{{ addressData.name }}</text>
              <text>{{ addressData.mobile }}</text>
            </view>
            <view class="fz-b fz-28 m-t-8 lh42 two-line">
              {{ addressData.provinceName }}{{ addressData.cityName }} {{ addressData.areaName
              }}{{ addressData.address }}
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
          <!--          <view class="submit-info__title">-->
          <!--            <view class="fz-28 fz-b lh42">{{ item.shopName }}</view>-->
          <!--          </view>-->

          <OrdersList
            v-for="(info, infoIndex) of item.cartWarehouseList"
            :key="infoIndex"
            :info="info"
            :remark.sync="info.remark"
          />
        </view>
        <view class="submit-money">
          <view class="submit-money__line">
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="lh42 fz-28 color-block">商品总额</view>
              <view class="m-r-64 lh48 fz-32">
                <VoPointPrice
                  :leftSize="16"
                  :price="formData.totalPrice"
                  :show-unit="true"
                  color="#262626"
                  display="inline-block"
                />
              </view>
            </view>
          </view>
          <!--          <view class="submit-money__line">-->
          <!--            <view class="flex flex-vertical-c flex-justify-between" @click="showPayWay = true">-->
          <!--              &lt;!&ndash; TODO: 线下支付流程未通，暂无法修改 &ndash;&gt;-->
          <!--              &lt;!&ndash; <view class="flex flex-vertical-c flex-justify-between" @click="showPayWay = true">&ndash;&gt;-->
          <!--              <view class="lh42 fz-28 color-block">支付方式</view>-->
          <!--              <view class="m-r-64 lh48 fz-32 flex flex-vertical-c">-->
          <!--                <text class="fz-32 color-block">{{ payWay === 1 ? '在线支付' : '线下支付' }}</text>-->
          <!--                <VoIcon :opacity="0.85" name="right-arrow" />-->
          <!--              </view>-->
          <!--            </view>-->
          <!--          </view>-->
        </view>
      </view>
      <view class="submit-bottom flex flex-justify-r p-b-safe-area">
        <view class="m-r-24 flex flex-column flex-vertical-t">
          <view class="fz-28 lh48">
            合计：
            <VoPointPrice
              :leftSize="16"
              :price="formData.totalPrice"
              :show-unit="true"
              color="#F20014"
              display="inline-block"
            />
          </view>
          <view class="fz-24 m-t-4 color-block-65 lh36">
            共{{ formData.totalKind }}种{{ formData.totalNum }}件商品
          </view>
        </view>
        <view class="submit-bottom__button" @click="toSettlement()">提交订单</view>
      </view>
      <vo-safety-area :is-fixed="false" />
    </view>
    <u-popup :round="5" :show="showOutOfStock" mode="center" @close="close">
      <outOfStockPopup @close="close" />
    </u-popup>

    <u-action-sheet
      :show="showPayWay"
      closeOnClickOverlay
      round="8"
      safeAreaInsetBottom
      title="支付方式"
      @close="showPayWay = false"
    >
      <view class="pay-way p-32">
        <view
          :class="payWay === 1 ? 'act' : ''"
          class="pay-way-item lh48 fz-32 flex flex-vertical-c flex-justify-between py-24 fz-32 color-block"
          @click="choseWay(1)"
        >
          <text class="">在线支付</text>
          <VoIcon :color="payWay === 1 ? '#FF5319' : ''" :opacity="0.85" name="right-arrow" />
        </view>
        <view
          :class="payWay === 2 ? 'act' : ''"
          class="pay-way-item lh48 fz-32 flex flex-vertical-c flex-justify-between py-24 fz-32 color-block"
          @click="choseWay(2)"
        >
          <text>线下支付</text>
          <VoIcon :color="payWay === 2 ? '#FF5319' : ''" :opacity="0.85" name="right-arrow" />
        </view>
      </view>
      <view class="pay-way-btn mx-32 m-t-22 py-22 fz-32 b-radius-48" @click="showPayWay = false"
        >确定</view
      >
    </u-action-sheet>
    <VoPayPopup
      :show.sync="showPay"
      :total-price="formData.totalPrice"
      @close="cancelClick"
      @confirm="goPayFn"
    />
  </view>
</template>

<script>
  import OrdersList from './components/OrdersList'
  import outOfStockPopup from './components/outOfStockPopup'
  import { appSource, goWechat, hideLoading, showLoading } from '@/common/helper'
  import PayPop from './components/PayPop'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'SubmitOrders',
    components: { OrdersList, outOfStockPopup, PayPop },
    data() {
      return {
        payWay: 1, // 支付方式
        showPayWay: false, // 结账方式弹窗
        showPay: false, // 支付弹窗
        showOutOfStock: false, // 过期商品弹窗
        addressData: null, //地址相关
        investGoodsData: {},
        isCartInit: false, // 是否是购物车下单
        formData: {
          isAllSelect: false,
          totalPrice: 0, //合计
          totalKind: 0, //几种商品
          totalNum: 0, //几件商品
          paymentPrice: 0, // 账期金额
          cashPrice: 0, //现金金额
        },
        result: {},
        remark: {},
        payOrderInfo: '',
      }
    },
    onShow() {},
    onLoad(option) {
      this.isCartInit = JSON.parse(option.isCartInit)
      this.addressData = this.$storage.get('addressDefault')
      this.investGoodsData = this.$storage.get('OrderPayInfoOldBuyer')
      console.log(this.investGoodsData)
      this.investGoodsData.forEach((item) => {
        item.cartWarehouseList.forEach((good) => {
          console.log(good)
          good.remark = ''
        })
      })
      this.totalCalculateFn()
      this.initAddrss()
    },
    mounted() {
      uni.$on('ChooseAddress', (res) => {
        this.addressData = res
        // this.submitForm.buyerInfo.addressId = res.id
        // this.submitForm.buyerInfo.buyerId = this.userInfo.id
      })
      // uni.$off('remark')
      // uni.$on('remark', (res) => {
      //   this.remark = res
      //   this.investGoodsData.forEach((item) => {
      //     item.cartWarehouseList.forEach((good) => {
      //       console.log(good)
      //       if (this.remark.id) {
      //         if (this.remark?.id === good.warehouseId) {
      //           good.remark = this.remark.remark
      //         }
      //       }
      //     })
      //   })
      //   this.$forceUpdate()
      // })
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
      // 选择支付方式
      choseWay(way) {
        this.payWay = way
        this.showPayWay = false
      },
      goImUrl(item) {
        const info = {
          targetId: item.shopUserId,
          type: 0,
          note: item.shopName,
          platformCode: item.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
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
        this.$storage.set('OrderPayInfo', req)
        this.payOrderInfo = req
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
                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=oldMachine&status=' +
                        '&orderId='+that.result.id+
                      res.data.status +
                      '&price=' +
                      this.formData.totalPrice,
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
              .payPayResult({ orderId: that.result.id })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                uni.redirectTo({
                  url:
                    '/pagesCommon/PayResult/PayResult?type=oldMachine&status=' +
                    res.data.status +
                    '&price=' +
                    this.formData.totalPrice,
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      close() {
        this.showOutOfStock = false
        this.$u.toast('商品信息已更改，请重新下单')
      },
      cancelClick() {
        console.log("取消了");
        uni.redirectTo({
          url: '/pagesOldBuyer/MyOrder/MarkerOrderList',
        })
      },
      toAddressPage() {
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },
      // 获取默认地址
      initAddrss() {
        console.log('121212121212')
        this.$VoHttp.USER.apiReceiverAddressDefault().then((res) => {
          console.log(res)
          this.addressData = res.data
        })
      },
      /**
       * 计算价格
       */
      totalCalculateFn() {
        let totalPrice = 0 //合计
        let totalKind = 0 //几种商品
        let totalNum = 0 //几件商品
        let paymentPrice = 0 // 账期金额
        let cashPrice = 0 //现金金额
        // 遍历开始
        this.investGoodsData.map((item) => {
          item.cartWarehouseList.map((it) => {
            it.cartDetailstList.map((good) => {
              totalKind++
              totalNum = this.decimalAddFn(totalNum, good.goodsCount)
              if (good.isCash) {
                //现金
                cashPrice += this.decimalMulFn(good.price, good.goodsCount || 0)
              } else {
                //账期
                paymentPrice += this.decimalMulFn(good.accountPrice, good.goodsCount || 0)
              }
            })
          })
        })

        this.formData.totalPrice = this.decimalAddFn(paymentPrice, cashPrice).toFixed(2)
        this.formData.totalKind = totalKind
        this.formData.totalNum = totalNum
        this.formData.paymentPrice = paymentPrice
        this.formData.cashPrice = cashPrice
      },
      //结算
      async toSettlement() {
        if (!this.addressData.id) {
          uni.$u.toast('请先选择地址')
          return
        }
        if (this.result && this.result.id) {
          this.showPay = true
          return
        }
        let goodsInfoList = []
        //购物车id
        let cartIds = []
        this.investGoodsData.map((item) => {
          item.cartWarehouseList.map((it) => {
            it.cartDetailstList.map((good) => {
              goodsInfoList.push({
                goodsId: good.id || good.goodsId,
                shopId: good.shopId || '0',
                warehouseId: good.warehouseId || it.warehouseId,
                isCash: true,
                shippingType: good.shippingType,
                skuProperty: '{}',
                goodsCount: good.goodsCount,
                originalPrice: good.price,
                remark: it.remark,
                preSaleId: good.businessId || 0,
              })
              if (this.isCartInit && good.carId) {
                cartIds.push(good.carId)
              }
            })
          })
        })
        try {
          let params = {
            //是否是购物车发起
            isCartInit: this.isCartInit,
            activityDetail: '{}',
            buyerInfo: {
              addressId: this.addressData.id,
              buyerId: this.userInfo.companyId,
            },
            resaleGoodsInfoList: goodsInfoList,
            source: appSource(), // 订单来源(1：Android，2：IOS，3：PC，4：小程序，5：h5)
          }
          if (this.isCartInit) {
            params.cartIds = cartIds
          }
          showLoading('加载中')
          try {
            const { data } = await this.$VoHttp.apiOrderPlaceOld(params)
            this.result = data
            this.result.accountAmount = this.result.accountAmount ? this.result.accountAmount : '0'
            this.showPay = true
          } catch (e) {
            uni.$u.toast(e.message || '下单失败')
            // setTimeout(() => {
            //   this.$backFn()
            // }, 1500)
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
        background: #ff5319;
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

  .pay-way {
    &-item {
      border-bottom: 1px solid #f7f7f8;
    }
    .act {
      color: #ff5319;
    }
  }
  .pay-way-btn {
    text-align: center;
    background: #ff5319;
    color: #fff;
    margin-bottom: 40rpx;
    border-top: 1px solid #f7f7f8;
  }
  .two-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
