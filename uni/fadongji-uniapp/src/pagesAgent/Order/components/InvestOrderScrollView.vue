<template>
  <view class="order-scroll">
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="orderList.length === 0 ? false : true"
      class="order-scroll__scroll"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <VoNoData v-if="!orderList.length && !refresh" no-data-tips="您还没有相关订单" />
      <view v-else class="p-b-safe-area">
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <InvestGoodInfoItem
          v-for="(item, index) in orderList"
          :key="index"
          :is-invest-order="isInvestOrder"
          :order-data="item"
          @bottomClick="bottomClick"
          @countDownFinish="refreshListData"
          @goIm="goChatPage"
          @click.native="goOrderDetail(item)"
        />

        <!--确认收货弹框-->
        <VoModal
          :show="confirmDeliverGoods"
          :showCancelButton="true"
          cancelText="未收到"
          confirmText="已收货"
          content="您是否收到该订单商品？"
          @cancel="confirmDeliverGoods = false"
          @confirm="confirmDeliverClick"
        />
        <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
        <!--        <RefundReasonPopup ref="reasonPopup" :radio-list="refundReasonList" @select="selectType" />-->

        <!-- 电话弹框 -->
        <VoActionSheet
          v-show="mobileShowAction"
          :actions="mobileList"
          :show="mobileShowAction"
          cancelText="取消"
          class="action-sheet"
          @close="mobileShowAction = false"
          @select="mobileActionSelect"
        />
      </view>
    </scroll-view>

    <!--    <VoModal-->
    <!--      :show="deliverGoodsModel"-->
    <!--      confirmColor="#22284B"-->
    <!--      confirmText="我知道了"-->
    <!--      content="平台已提醒商家尽快发货，请耐心等待。"-->
    <!--      @confirm="deliverGoodsModel = false"-->
    <!--    />-->
    <!--   取消订单弹出层   -->
    <!--    <u-popup :show="showCancelOrder" mode="bottom" @close="close">-->
    <!--      <CancelOrder @cancelConfirm="cancelConfirm" />-->
    <!--    </u-popup>-->
  </view>
</template>

<script>
  import InvestGoodInfoItem from './InvestGoodInfoItem'
  import RefundActionPopup from '@/pagesAgent/Order/ReturnExchange/components/RefundActionPopup.vue'
  import { error, getImUserId, getStoreImUserIdFn } from '@/common/helper'
  import { mapGetters } from '@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common'
  import RefundReasonPopup from './RefundReasonPopup.vue'

  export default {
    name: 'InvestOrderScrollView',
    components: {
      InvestGoodInfoItem,
      RefundActionPopup,
      RefundReasonPopup,
    },
    props: {
      isRequest: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        warehouseIdList: [],
        current: 0,
        curNow: 0,
        deliverGoodsModel: false,
        confirmDeliverGoods: false, //确认收货弹框
        sendType: false, //待发货显示催货栏 默认不显示
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
        typeList: [],
        orderList: [],
        orderStatus: '0',
        searchWord: '',
        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        warnType: 0,
        //投资订单类型(1本地,2全国)
        investType: 1,
        //投资订单类型,(投资订单)(转投资订单)
        isInvestOrder: true,
        //退款
        refundReasonList: [],
        refundReason: '',
        orderData: {},
        showCancelOrder: false, // 取消订单弹出层
        showModalCancel: false, //确认收货弹出层
        operationData: '',
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    created() {
      if (this.isRequest) {
        this.getOrderListRequest()
      }
    },
    methods: {
      back() {
        this.$backFn()
      },
      /**
       * 联系电话
       * @param e
       */
      callPhone(phone) {
        if (phone.indexOf('/') > -1) {
          let mobile = phone.split('/')
          this.mobileList = []
          mobile.forEach((item) => {
            if (uni.$u.test.mobile(item)) {
              let param = {
                name: item,
              }
              this.mobileList.push(param)
            }
          })
          if (this.mobileList.length > 1) {
            this.mobileShowAction = true
            return
          }
          this.$cellPhone(phone)
          return
        }
        this.$cellPhone(phone)
      },
      mobileActionSelect(e) {
        this.$cellPhone(e.name)
      },
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch')
      },
      tabsClick(item) {
        this.current = item.index
        if (item.index == 2) {
          this.sendType = true
        } else {
          this.sendType = false
        }

        //请求订单列表
        let param = this.typeList[this.current]
        this.getOrderListRequest(param.id)
      },
      changeSwiper(e) {
        this.current = e.detail.current
        if (e.detail.current == 2) {
          this.sendType = true
        } else {
          this.sendType = false
        }
        //请求订单列表
        let param = this.typeList[this.current]
        this.getOrderListRequest(param.id)
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      sectionChange(index) {
        this.curNow = index
      },
      /**
       *底部按钮点击事件
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.电话联系 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.发货 11.投诉 12.商品转让
        let index = data.index
        let resultData = data.data
        this.operationData = data.data
        if (index === '0') {
          this.$linkToEasy(
            '/pagesAgent/Order/OrderSearch/OrderRemark?data=' +
              JSON.stringify(resultData) +
              '&type=' +
              '1',
          )
          return
        }

        if (index === '1') {
          if (resultData.orderAddress.isEdited) {
            this.$u.toast('您已经修改过一次地址了')
            return
          }
          this.$linkToEasy(
            `/pagesCommon/AddressList/AddressList?orderId=${resultData.id}&type=1&roleType=2&addressId=${resultData.orderAddress.id}`,
          )
          return
        }

        if (index === '2') {
          this.$emit('cancelOrderClick', resultData)
          return
        }

        if (index === '3') {
          if (resultData.warehousePhone.indexOf('/') > -1) {
            let mobile = resultData.warehousePhone.split('/')
            this.mobileList = []
            mobile.forEach((item) => {
              if (uni.$u.test.mobile(item)) {
                let param = {
                  name: item,
                }
                this.mobileList.push(param)
              }
            })
            if (this.mobileList.length > 1) {
              this.mobileShowAction = true
              return
            }
            this.$cellPhone(resultData.warehousePhone)
            return
          }
          this.$cellPhone(resultData.warehousePhone)
          return
          this.contantClick(resultData)
          return
        }

        if (index === '4') {
          let param = { index: data.index, data: data.data }
          this.$emit('bottomClick', param)
          return
        }

        if (index === '5') {
          this.$linkToEasy(
            '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' +
              JSON.stringify(resultData) +
              '&type=' +
              '1',
          )
          return
        }
        if (index === '6') {
          this.$linkToEasy(
            '/pagesAgent/Order/OrderDetail/InvestDetail?data=' +
              resultData.id +
              '&type=' +
              '1' +
              '&payType=' +
              '1',
          )
          return
        }
        if (index === '7') {
          let param = { index: data.index, data: data.data }
          this.$emit('bottomClick', param)
          return
        }
        if (index === '8') {
          let param = { index: data.index, data: data.data }
          this.$emit('bottomClick', param)
          return
        }
        if (index === '9') {
          this.againOrder(resultData)
          return
        }
        if (index === '10') {
          this.deliveryClick(resultData)
          return
        }
        if (index === '11') {
          this.$linkToEasy(
            '/pagesCommon/ComplaintPage/ComplaintForm?data=' + JSON.stringify(resultData),
          )
        }
        //商品转让
        if (index === '12') {
          //获取订单详情
          let param = { goodsId: this.operationData.goodsDetail[0].goodsId }
          this.$VoHttp
            .apiGoodsAgentGoods(param)
            .then((res) => {
              if (res.code === '20001') {
                this.$u.route({
                  url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
                  params: {
                    id: res.data,
                    isOrderTransfer: '1',
                    payPrice: this.operationData.payAmount,
                    isTransfer: '1', //标记商品转让
                  },
                })
              } else {
                uni.$u.toast(res.message || '订单获取失败')
              }
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast('订单获取失败')
              uni.$u.toast('订单获取失败')
            })
          return
        }
      },
      confirmDeliverClick() {
        this.confirmDeliverGoods = false
        this.confiemGoodsRequest()
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
        if (!data.reason) {
          this.$u.toast('请选择取消原因')
          return
        }
        this.showCancelOrder = false
        let param = {
          orderId: this.orderId,
          cancelReason: data.reason,
          remark: '',
        }
        this.getCancelOrderRequest(param)
      },
      /**
       * 联系仓库
       */
      contantClick(resultData) {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: resultData.warehouseId,
          type: 0,
          note: resultData.warehouseName,
          platformCode: resultData.shopPlatformCode, // 1供应商  2服务商
          isProject: true,
          goods: {
            name: resultData.goodsDetail[0].goodsName,
            pic: resultData.goodsDetail[0].pic[0],
            id: resultData.goodsDetail[0].goodsId,
            cashPrice: resultData.cashAmount,
            accountPrice: resultData.accountAmount,
            accountPeriodDays: resultData.periodDays,
          },
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick(data) {
        //获取订单详情
        let param = { id: data.id }
        this.$VoHttp
          .apiOrderInvest$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              if (res.data.goodsDetail.length > 1) {
                this.$linkToEasy(
                  '/pagesAgent/Order/DeliverGoods/DeliverMoreGoodsvue?data=' +
                    JSON.stringify(res.data) +
                    '&type=' +
                    '1',
                )
                return
              }
              this.$linkToEasy(
                '/pagesAgent/Order/DeliverGoods/DeliverGoods?data=' +
                  JSON.stringify(res.data) +
                  '&type=' +
                  '1',
              )
            } else {
              uni.$u.toast(res.message || '订单获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单获取失败')
            uni.$u.toast('订单获取失败')
          })
      },
      /**
       * 去订单详情
       */
      goOrderDetail(data) {
        //投资订单
        if (this.isInvestOrder) {
          this.$linkToEasy('/pagesAgent/Order/OrderDetail/InvestDetail?data=' + data.id)
          return
        }
        //转投资订单
        this.$linkToEasy('/pagesAgent/Order/OrderDetail/TurnInvestDetail?data=' + data.id)
      },
      // 选择投诉类型
      selectType(item) {
        this.$refs.reasonPopup.close()
        this.refundReason = item.reason
        this.applyForRefundRequest()
      },
      againOrder(resultData) {
        let cartDetailstList = []
        resultData.goodsDetail.forEach((item) => {
          let param = {
            isCash: resultData.isCash,
            investmentId: item.projectId,
            pricture: item.pic,
            investmentNum: item.goodsCount,
            accountPeriodDays: resultData.periodDays,
            accountPrice: resultData.accountAmount,
            goodsId: item.goodsId,
            goodsName: item.goodsName,
            id: item.id,
            cashPrice: item.payPrice,
            investedAmount: resultData.payAmount,
            shippingType: resultData.shippingType,
            shopId: resultData.shopId,
            warehouseName: resultData.warehouseName,
            warehouseId: resultData.warehouseId,
          }
          cartDetailstList.push(param)
        })

        let data = [
          {
            shopId: resultData.shopId,
            shopName: resultData.shopName,
            cartWarehouseList: [
              {
                warehouseName: resultData.warehouseName,
                warehouseId: resultData.warehouseId,
                cartDetailstList: cartDetailstList,
              },
            ],
          },
        ]

        if (resultData.investType === 1) {
          this.$storage.set('investGoodsData', data)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?queryType=' + 1)
          return
        }
        this.getDetail(resultData)
      },
      // 获取投资项目详情
      getDetail(resultData) {
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: resultData.goodsDetail[0].projectId,
          companyId: this.userInfo.companyId,
        }).then((res) => {
          if (res.data) {
            this.$storage.set('projectData', res.data)
            this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
          }
        })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
        if (this.scrollTop <= 0) return
        this.$emit('scrollFn', e.detail.deltaY, e.detail.scrollTop)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getOrderListRequest()
        }
      },
      //滚到底部加载
      scrolltolower() {
        this.refresh = false
        if (this.orderList.length >= this.total) {
          uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        this.getOrderListRequest()
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      refreshListData() {
        this.refresh = true
        this.getOrderListRequest()
      },
      getOrderRequest(data) {
        this.orderList = []
        this.refresh = true
        this.orderStartTime = data.orderStartTime
        this.orderEndTime = data.orderEndTime
        this.orderStatus = data.id
        this.warnType = data.warnType
        this.investType = data.investType
        this.warehouseIdList = data.warehouseIdList
        if (data.orderType === 0) {
          this.isInvestOrder = true
        } else {
          this.investType = 0
          this.isInvestOrder = false
        }
        this.searchWord = data.searchWord
        this.getOrderListRequest()
      },
      //获取订单列表请求
      getOrderListRequest() {
        let isfresh = this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          orderStatus: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 10,
          isInvestOrder: this.isInvestOrder,
          warehouseIdList: this.warehouseIdList,
        }
        if (this.investType > 0) {
          param.investType = this.investType
        }
        if (this.searchModel > 0) {
          param.searchWord = this.searchModel
        }
        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }
        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }
        if (this.warnType > 0) {
          param.warnType = this.warnType
        }
        if (this.searchWord) {
          param.searchWord = this.searchWord
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestQueryList(param)
          .then((res) => {
            if (res.code === '20001') {
              console.log('投资订单数据', res)
              let resultData = res.data.records
              this.total = res.data.total
              this.orderList = this.orderList.concat(resultData)

              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('投资订单获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },

      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderInvestCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
              this.refresh = true
              this.getOrderListRequest()
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
          })
      },
      //提醒发货请求请求
      getDeliveryGoodsRequest(data) {
        let param = {
          orderId: data.id,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              this.deliverGoodsModel = true
              this.refresh = true
              this.getOrderListRequest()
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '您已经提醒过了')
          })
      },
      //确认收货请求请求
      confiemGoodsRequest() {
        let param = {
          orderId: this.orderId,
        }
        this.$VoHttp
          .apiOrderInvestReceipt({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.$emit('confirmGoodFn', this.operationData)
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收货失败')
          })
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
                // this.$refs.actionPopup.show()
              })
              this.$refs.reasonPopup.show()
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //发起退款申请请求
      applyForRefundRequest() {
        let params = {
          orderId: this.orderData.id,
          source: this.orderData.source,
          shopId: this.orderData.shopId,
          shopPlatformCode: this.orderData.shopPlatformCode,
          whetherReceiptGoods: false,
          reason: this.refundReason,
        }
        params.isRefundOnly = true
        let goodsInfos = []
        this.orderData.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: this.decimalMulFn(item.payPrice, item.goodsCount),
          }
          goodsInfos.push(param)
        })
        params.goodsInfos = goodsInfos

        uni.showLoading({
          title: '加载中',
          mask: true,
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
      // Im聊天
      goChatPage(item) {
        if (this.isInvestOrder) {
          // 投资订单
          getStoreImUserIdFn({
            companyId: item.shopId,
          })
            .then((res) => {
              const info = {
                targetId: res,
                type: 0,
                note: item.shopName,
                platformCode: item.shopPlatformCode,
              }
              this.$storage.set('temp_im_room_info', info)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            })
            .catch((e) => {
              error(e.message || '未找到店铺客服')
            })
        } else {
          //根据店铺id获取userId
          const id = this.isInvestOrder ? item.shopId : item.buyerId

          getImUserId({ companyId: id })
            .then((res) => {
              console.log('res', res)
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
              console.log(err)
            })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order-scroll {
    height: 100%;
    &__scroll {
      height: 100%;
    }
  }
</style>
