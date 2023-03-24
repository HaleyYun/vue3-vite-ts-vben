<template>
  <view class="page">
    <VoNav :is-fixed="false" :title="info.statusName" is-have-more>
      <block slot="title">
        <view class="flex flex-justify-c flex-vertical-c">
          <VoIcon
            v-if="info.status == 1310"
            class="vertical-m"
            color="#262626"
            name="clock-orange"
            size="28"
          />
          <VoIcon
            v-if="info.status == 1320"
            class="vertical-m"
            color="#262626"
            name="clock-new"
            size="28"
          />
          <VoIcon
            v-if="info.status == 1330"
            class="vertical-m"
            color="#262626"
            name="clock-new"
            size="28"
          />
          <VoIcon
            v-if="info.status == 1340"
            class="vertical-m"
            color="#262626"
            name="success-circle"
            size="28"
          />
          <VoIcon
            v-if="info.status == 1350"
            class="vertical-m"
            color="#262626"
            name="warning"
            size="28"
          />
          <VoIcon
            v-if="info.status == 1360"
            class="vertical-m"
            color="#262626"
            name="clock-new"
            size="28"
          />

          <view :class="{ red: info.status == 1310 }">{{ info.statusName }}</view>
        </view>
      </block>
    </VoNav>
    <view class="content overflow-y">
      <view v-if="info.isWarn && info.status == 1320 && warnShow" class="error">
        <VoIcon color="#FDA202" name="invest-tip" size="20" />
        <u-notice-bar
          bgColor="#feecee"
          color="#ee0a24"
          icon=""
          mode="closable"
          text="平台已提醒商家尽快发货，并对商家超时未发货做出处罚。您可以选择申请退款、投诉，或者继续等待商家发货。"
          @close="warnShow = false"
        />
      </view>
      <view v-if="info.status == 1310" class="top_warn">
        <view class="fz-28">
          <text
            >需付款：
            <text>{{ info.goodsAmount }}元</text>
          </text>
          <text class="m-l-32"
            >剩余时间：
            <text>
              <u-count-down :time="downData" autoStart format="DD:HH:mm" @change="onChange">
                <text
                  v-if="timeData.days != 0 || timeData.hours != 0 || timeData.minutes != 0"
                  class="time"
                >
                  <text class="time__item"
                    >{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}小时
                  </text>
                  <text class="time__item">{{ timeData.minutes }}分钟</text>
                </text>
                <text v-else class="time">
                  <text class="time__item">{{ timeData.seconds }}秒</text>
                </text>
              </u-count-down>
            </text>
          </text>
        </view>
        <view class="m-t-16">
          <u-button class="to_pay" color="#FF5319" shape="circle" text="去支付" @click="goToPay" />
        </view>
      </view>
      <view v-if="info.status == 1350" class="content_result_text black85">
        <view>
          <view>取消原因：{{ info.cancelReason }}</view>
        </view>
      </view>

      <view
        v-if="info.status == 1350 || info.status == 1360"
        class="logistics"
        @click="cancelProgress"
      >
        <view class="fz-32 m-b-16"
          >取消/退款进度：您的订单已<text v-if="info.status == 1350">取消</text
          ><text v-if="info.status == 1360">关闭</text>。</view
        >
        <view class="flex flex-justify-between fz-28 logisticNum">
          <text
            >当前订单有{{ info.deliveryDetail.packageCount || 0 }}个包裹，{{
              info.deliveryDetail.sendCount || 0
            }}个已发出
          </text>
          <VoIcon color="#8C8C8C" name="right-arrow" size="24" />
        </view>
      </view>
      <view
        v-if="info.status >= 1330 && info.status != 1350"
        class="logistics"
        @click="deliveryClick"
      >
        <view class="fz-32 m-b-16">物流进度</view>
        <view class="flex flex-justify-between fz-28 logisticNum">
          <text
            >当前订单有{{ info.deliveryDetail.packageCount || 0 }}个包裹，{{
              info.deliveryDetail.sendCount || 0
            }}个已发出
          </text>
          <VoIcon color="#8C8C8C" name="right-arrow" size="24" />
        </view>
      </view>
      <view
        v-if="info.orderAddress"
        class="detail-address__info flex flex-vertical-c p-l-32 p-r-32"
      >
        <view>
          <VoIcon name="address" />
        </view>
        <view class="m-l-8 info-place">
          <block v-if="chooseAddress">
            <view class="fz-28 flex flex-vertical-c">
              <text> {{ chooseAddress.name }}</text>
              <text> {{ chooseAddress.phone }}</text>
            </view>
            <view class="fz-26 m-t-8 two-line">
              {{ chooseAddress.address + chooseAddress.addressDetail }}
            </view>
          </block>
          <block v-else>
            <view class="fz-28 flex flex-vertical-c">
              <text> {{ info.orderAddress.name }}</text>
              <text> {{ info.orderAddress.phone }}</text>
            </view>
            <view class="fz-26 m-t-8 two-line">
              {{ info.orderAddress.address + info.orderAddress.addressDetail }}
            </view>
          </block>
        </view>
        <view
          v-if="info.status == 1310"
          class="flex flex-grow1 flex-vertical-c flex-justify-r black85"
          @click="editAddressClick()"
        >
          <view class="fz-24 m-r-8">修改</view>
          <VoIcon color="#8C8C8C" name="edit-line" />
        </view>
      </view>
      <!-- 商品组件 -->
      <GoodInfoItem :isShow="false" :order-data="info" />
      <view class="content_order">
        <view class="title black85">订单信息</view>
        <view class="content_order_msg">
          <view class="flex flex-justify-between">
            <view>订单编号：</view>
            <view>
              <text class="black45">{{ info.id }} </text>
              <text class="m-l-8 Color_0D66FF" @click="copyText(info.id)">复制</text>
            </view>
          </view>
          <view v-if="getTime('下单时间')" class="flex flex-justify-between">
            <text>下单时间：</text>
            <text class="black45">{{ getTime('下单时间') }}</text>
          </view>
          <view v-if="info.payType" class="flex flex-justify-between">
            <text>支付方式：</text>
            <text class="black45">{{ info.payType }}</text>
          </view>
          <view v-if="getTime('发货时间')" class="flex flex-justify-between">
            <text>发货时间：</text>
            <text class="black45">{{ getTime('发货时间') }}</text>
          </view>
          <view v-if="getTime('收货时间')" class="flex flex-justify-between">
            <text>收货时间：</text>
            <text class="black45">{{ getTime('收货时间') }}</text>
          </view>
          <view v-if="getTime('取消时间')" class="flex flex-justify-between">
            <text>取消时间：</text>
            <text class="black45">{{ getTime('取消时间') }}</text>
          </view>
          <view v-if="getTime('关闭时间')" class="flex flex-justify-between">
            <text>关闭时间：</text>
            <text class="black45">{{ getTime('关闭时间') }}</text>
          </view>
          <view class="flex flex-justify-between">
            <text>商品总额：</text>
            <text class="black45">{{ info.goodsAmount }}元</text>
          </view>
          <view v-if="info.payAmount" class="flex flex-justify-between">
            <text>实付款：</text>
            <text class="red">{{ info.payAmount }}元</text>
          </view>
        </view>
      </view>
      <VoPayPopup :show.sync="showPay" :total-price="info.payAmount" @confirm="payHandler" />
      <!--申请退款-->
      <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
      <!--是否收到货-->
      <VoModal
        v-if="showModalCancel"
        :show="true"
        :showCancelButton="true"
        cancelColor="#B7B7B7"
        cancelText="未收到"
        confirmText="已收到"
        content="您是否收到该订单商品"
        @cancel="close"
        @confirm="sureGetGoods"
      />
    </view>
    <view class="bottom">
      <view v-if="info.status == 1310">
        <u-button
          class="custom-style"
          shape="circle"
          text="取消订单"
          @click="showCancelOrder = true"
        />
      </view>
      <view v-if="info.status == 1320">
        <u-button class="custom-style" shape="circle" text="申请退款" @click="refundClick" />
      </view>
      <view v-if="info.status == 1340 || info.status == 1330">
        <u-button class="custom-style" shape="circle" text="查看发货信息" @click="deliveryClick" />
      </view>
      <view v-if="[1340, 1350, 1360].includes(info.status)">
        <!--        <u-button class="custom-style" shape="circle" text="再来一单" @click="againOrder" />-->
      </view>
      <view v-if="info.status == 1320 && downData < 0">
        <u-button class="custom-style" shape="circle" text="投诉" @click="nextPage" />
      </view>
      <view v-if="info.status == 1320 && downData < 0">
        <u-button class="custom-style" shape="circle" text="提醒发货" @click="warnDeliverGoods" />
      </view>
      <view v-if="info.status == 1310">
        <u-button
          class="custom-style"
          color="#FF5319"
          shape="circle"
          text="去支付"
          @click="goToPay"
        />
      </view>
      <view v-if="info.status == 1330">
        <u-button
          class="custom-style"
          color="#FF5319"
          shape="circle"
          text="确认收货"
          @click="confiemGoodsRequest"
        />
      </view>
    </view>
    <!--   取消订单弹出层   -->
    <u-popup v-if="showCancelOrder" :show="true" mode="bottom" @close="close">
      <CancelOrder
        :list="cancelList"
        @cancelConfirm="cancelConfirm"
        @closeFn="showCancelOrder = false"
      />
    </u-popup>
    <VoSafetyArea :isFixed="false" />
  </view>
</template>

<script>
  import GoodInfoItem from './components/GoodInfoItem.vue'
  import { appSource, goWechat, hideLoading, showLoading } from '@/common/helper'
  import RefundActionPopup from './components/RefundActionPopup.vue'
  import CancelOrder from '@/pagesOldBuyer/MyOrder/components/CancelOrder'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    components: {
      GoodInfoItem,
      RefundActionPopup,
      CancelOrder,
    },
    data() {
      return {
        showModalCancel: false,
        showCancelOrder: false,
        warnShow: true,
        showPay: false,
        id: '',
        info: {}, //订单详情
        //仅退款原因
        refundReasonList: [],
        //退款原因
        reasonString: '',
        //退款封装数据 仅用于急速退款场景
        timeData: {},
        newData: new Date().getTime(),
        downData: 0,
        cancelList: [],
        chooseAddress: null,
        payOrderInfo: '',
      }
    },
    async onLoad(val) {
      if (val && val.id) {
        this.id = val.id
      }
      if (val.payType === '1') {
        this.showPay = true
      }
      this.getCancelList()
      await uni.$on('ChooseAddress', async (val) => {
        // 修改地址位置
        console.log(val)
        const { name, mobile, areaCode, provinceName, cityName, areaName, address } = val
        let params = {
          name,
          phone: mobile,
          orderId: this.id,
          address: provinceName || '' + cityName || '' + areaName || '',
          areaCode,
          addressDetail: address,
        }
        this.chooseAddress = params
        await this.marketAddressEdit(params)
        // this.address = address
        // this.formData.addressDetail = val.id
      })
    },
    async onShow() {
      await this.reqDetail()
    },
    methods: {
      goToPay() {
        this.showPay = true
      },
      //销售订单修改地址
      marketAddressEdit(param) {
        showLoading()
        this.$VoHttp
          .apiOrderOldAddressEdit(param)
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('地址修改成功', 'success', '/static/icons/success_icon.png')
            } else {
              uni.$u.toast(res.message || '地址修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '地址修改失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      getCancelList() {
        this.$VoHttp
          .apiOrderCancelCauseQueryList()
          .then((res) => {
            let arr = []
            res.data.forEach((item) => {
              arr.push({
                name: item,
                disabled: false,
              })
            })
            this.cancelList = arr
          })
          .catch((e) => {
            console.log(e)
            uni.$u.toast(e.message || '网络错误')
          })
      },
      toChat() {
        const info = {
          targetId: this.info.warehouseId,
          type: 0,
          note: this.info.shopName,
          platformCode: 'recycling',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 关闭弹出层
       */
      close() {
        this.showCancelOrder = false
        this.showModalCancel = false
      },
      /**
       * 点击确定按钮关闭弹出层
       */
      cancelConfirm(data) {
        this.showCancelOrder = false
        let param = {
          orderId: this.info.id,
          cancelReason: data.reason,
          remark: '',
        }
        this.getCancelOrderRequest(param)
      },
      //取消订单请求
      getCancelOrderRequest(data) {
        showLoading()
        this.$VoHttp
          .apiOrderOldCancel(data)
          .then((res) => {
            if (+res.code === 20001) {
              uni.$u.toast(res.message || '订单取消成功')
              this.reqDetail()
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      cancelProgress() {
        this.$linkToEasy('/pagesOldBuyer/MyOrder/CancelProgress?id=' + this.info.id)
      },
      onChange(e) {
        this.timeData = e
        if (!e.days && !e.hours && !e.minutes && !e.seconds) {
          this.reqDetail()
        }
      },
      copyText(val) {
        uni.setClipboardData({
          data: val,
          success: function () {
            uni.$u.toast('复制成功')
          },
        })
      },
      async reqDetail() {
        const res = await this.$VoHttp.apiOrderOld$Id({ id: this.id })
        if (res.success) {
          this.info = res.data
          let Time
          if (uni.$u.os() === 'ios') {
            Time = new Date(this.info.nextStageTime.replace(/-/g, '/'))
          } else {
            Time = new Date(this.info.nextStageTime)
          }
          console.log(Time)
          let timestemp = Time.getTime()
          this.downData = timestemp - this.newData
        }
      },
      editAddressClick() {
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },
      getTime(val) {
        let time = ''
        for (let i = 0; i < this.info.timeList?.length; i++) {
          if (val == this.info.timeList[i].timeName) {
            time = this.info.timeList[i].createTime
          }
        }
        return time
      },
      // 选择退款原因类型
      selectType(item) {
        this.$refs.actionPopup.close()
        this.reasonString = item.name

        this.getRefundCalculateAmount()
      },
      async warnDeliverGoods() {
        try {
          const res = await this.$VoHttp.apiOrderOldWarn({ orderId: this.id })
          this.reqDetail()
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      confiemGoodsRequest() {
        this.showModalCancel = true
      },
      async sureGetGoods() {
        this.$VoHttp
          .apiOrderOldReceive({ orderId: this.id })
          .then((res) => {
            uni.$u.toast('加载成功')
            this.reqDetail()
            this.$backFn()
          })
          .catch((err) => {
            uni.$u.toast(err.message)
          })
          .finally(() => {
            this.showModalCancel = false
          })
      },
      refundClick() {
        this.refundReasonRequest()
      },
      againOrder() {
        const resultData = this.info
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        let cartWarehouseList = []
        resultData.goodsDetail.forEach((item) => {
          let param = {
            isCash: resultData.isCash || true,
            isPress: resultData.isPreSale,
            shopId: resultData.shopId,
            goodsCount: item.goodsCount,
            price: item.payPrice,
            picture: item.pic,
            shippingType: resultData.shippingType,
            ...item,
          }
          cartWarehouseList.push(param)
        })
        let orderProductInfo = [
          {
            shopId: resultData.shopId,
            shopName: resultData.shopName,
            cartWarehouseList: [
              {
                warehouseName: resultData.warehouseName,
                warehouseId: resultData.warehouseId,
                arrivalTime: resultData.predictDeliveryTime,
                deliveryAreaName: resultData.deliveryAreaName || '',
                cartDetailstList: cartWarehouseList,
              },
            ],
          },
        ]
        this.$storage.set('OrderPayInfoOldBuyer', orderProductInfo)
        this.$linkToEasy('/pagesOldBuyer/CartModule/SubmitOrders?isCartInit=false')
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.info.buyerId,
          cashAmount: this.info.payAmount,
          orderId: this.info.id,
          accountAmount: this.info.accountAmount || 0,
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
                .payPayResult({ orderId: that.payOrderInfo.orderId })
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
                      res.data.status +
                      '&price=' +
                      this.info.payAmount,
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
        if (Number(info.payTypeCode) === 1) {
          this.goWechat()
        } else {
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
                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=oldMachine&status=' +
                      res.data.status +
                      '&price=' +
                      this.info.payAmount,
                  })
                  // that.onLoad(that.optionsData)
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
        }
      },
      //仅退款原因
      refundReasonRequest() {
        let params = {
          type: 1,
        }
        this.$VoHttp
          .apiOrderRefundCauseQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              let array = res.data
              this.refundReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundReasonList.push(param)
                this.$refs.actionPopup.show()
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //计算可退金额请求
      getRefundCalculateAmount() {
        console.log(this.info)
        let params = {
          orderId: this.info.id,
          goodsId: this.info.goodsDetail[0].goodsId,
          goodsCount: this.info.goodsDetail[0].goodsCount,
          projectId: 0,
        }
        this.$VoHttp
          .apiRefundCalculateAmount(params)
          .then((res) => {
            if (res.code === '20001') {
              this.applyForRefundRequest(res.data)
            } else {
              uni.$u.toast(res.message || '退款金额获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款金额获取失败')
          })
      },
      //发起退款申请请求
      applyForRefundRequest(price) {
        let params = {
          orderId: this.info.id,
          goodsId: this.info.goodsDetail[0].goodsId,
          goodsCount: this.info.goodsDetail[0].goodsCount,
          amount: price,
          source: this.info.source,
          shopId: this.info.shopId,
          whetherReceiptGoods: false,
          shopPlatformCode: this.info.shopPlatformCode,
          reason: this.reasonString,
          isRefundOnly: true,
        }
        let goodsInfos = []
        this.info.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: item.payPrice * item.goodsCount,
          }
          goodsInfos.push(param)
        })
        params.goodsInfos = goodsInfos

        uni.showLoading({
          title: '加载中',
        })

        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                this.refresh = true
                this.getOrderListRequest()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '发起退货失败')
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
            uni.$u.toast(err.message || '发起退货失败')
          })
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick() {
        if (+this.info.status === 1350) {
          this.cancelProgress()
        } else {
          this.$linkToEasy('/pagesOldBuyer/MyOrder/DeliveryMessage?id=' + this.info.id)
        }
      },
      nextPage() {
        this.$linkToEasy('/pagesCommon/ComplaintPage/ComplaintForm')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .content {
    flex-grow: 1;
  }

  .content_order {
    background-color: #fff;
    padding: 24rpx 32rpx;
    margin-top: 16rpx;
  }

  .detail-address__info {
    background-color: #fff;
    padding: 16rpx 32rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid $v-bg-light;

    .info-place {
      flex-grow: 1;
      .two-line {
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .title {
    font-size: 32rpx;
    font-weight: bold;
    padding-bottom: 24rpx;
    border-bottom: 1px solid #f7f7f8;
  }

  .content_order_msg {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.85);

    > :nth-child(n) {
      margin: 16rpx 0;
    }
  }

  .bottom {
    width: 100%;
    background-color: #fff;
    padding: 20rpx 32rpx;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;

    > :nth-child(n) {
      //margin-right: 32rpx;
      //margin-left: 32rpx;

      .custom-style {
        min-width: 176rpx;
        padding: 0 24rpx;
        height: 80rpx;
      }
    }
  }

  .logistics {
    background: #fff;
    margin: 16rpx 0;
    padding: 24rpx 32rpx;
  }

  .error {
    width: 750rpx;
    height: 80rpx;
    background: #feecee;
    padding: 24rpx;
    box-sizing: border-box;
    color: #ee0a24;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top_warn {
    text-align: center;
    padding: 24rpx 0 48rpx 0;
  }

  .to_pay {
    width: 272rpx;
    height: 64rpx;
  }

  .black45 {
    color: rgba(0, 0, 0, 0.45);
  }

  .black85 {
    color: rgba(0, 0, 0, 0.85);
  }

  .black65 {
    color: rgba(0, 0, 0, 0.65);
  }

  .black {
    color: #000;
  }

  .red {
    color: #ff5319;
  }

  .Color_0D66FF {
    color: #0d66ff;
  }

  .vertical-m {
    vertical-align: middle;
    margin-right: 8rpx;
  }

  .content_result_text {
    text-align: center;
    font-size: 28rpx;
    line-height: 42rpx;
    padding-top: 32rpx;
    padding-bottom: 24rpx;
    font-weight: 500;
  }

  .logisticNum {
    align-items: center;
  }
  .flex-grow1 {
    flex-grow: 1;
    flex-shrink: 0;
  }
  ::v-deep {
    .u-count-down {
      display: inline-block;
    }
  }
</style>
