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
      <VoNoData v-if="!orderList.length && !refresh&&isOver" no-data-tips="您还没有相关订单" />
      <view v-else>
        <!-- 下拉刷新组件 -->
        <VoListFresh v-if="!refresh" :show="loadingStatus" />
        <GoodInfoItem
          v-for="(item, index) in orderList"
          :key="index"
          :order-data="item"
          @bottomClick="bottomClick"
          @click.native="goOrderDetail(item)"
        />
        <VoLoadingText :has-more="orderList.length < total" :loading="loading" />
        <VoModal
          :show="deliverGoodsModel"
          confirmColor="#22284B"
          confirmText="我知道了"
          content="平台已提醒商家尽快发货，请耐心等待。"
          @confirm="deliverGoodsModel = false"
        />
        <!--   取消订单弹出层   -->
        <u-popup :show="showCancelOrder" mode="bottom" @close="close">
          <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="showCancelOrder = false" />
        </u-popup>
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
  </view>
</template>

<script>
  import GoodInfoItem from './GoodInfoItem'
  import CancelOrder from './CancelOrder'

  export default {
    name: 'MarketScrollView',
    components: {
      GoodInfoItem,
      CancelOrder,
    },
    props: {
      isRequest: {
        type: Boolean,
        default: false,
      },
      // 订单状态
      status: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isOver:false,
        current: 0,
        curNow: 0,
        deliverGoodsModel: false,
        sendType: false, //待发货显示催货栏 默认不显示
        typeList: [],
        orderList: [],
        orderStatus: '0',
        showCancelOrder: false, // 取消订单弹出层
        showModalCancel: false, //确认收货弹出层
        orderId: '',
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表

        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',
        warehouseIdList: [], // 筛选仓库id
        triggered: false,
        scrollTop: 0,
        total: 0,
        loadingStatus: false,
        loading: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        warnType: 0,
        searchWord: '',
      }
    },
    created() {
      if (this.isRequest) {
        this.pageNo = 1
        this.getOrderListRequest()
      }
      if (this.status) {
        //接收从首页传过来的状态
        this.orderStatus = this.status
        this.pageNo = 1
        this.getOrderListRequest()
      }
    },
    methods: {
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch')
      },
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
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
       *去备注
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.发货
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            '/pagesAgent/Order/OrderSearch/OrderRemark?data=' + JSON.stringify(resultData),
          )
          return
        }

        if (index === '1') {
          if (resultData.orderAddress.isEdited) {
            this.$u.toast('您已经修改过一次地址了')
            return
          }
          this.$linkToEasy(
            `/pagesCommon/AddressList/AddressList?orderId=${resultData.id}&type=2&roleType=2&addressId=${resultData.orderAddress.id}`,
          )
          return
        }

        if (index === '2') {
          this.showCancelOrder = true
          this.orderId = resultData.id
          return
        }

        if (index === '3') {
          this.contantClick(resultData)
          return
        }

        if (index === '4') {
          this.getDeliveryGoodsRequest(resultData)
          return
        }

        if (index === '5') {
          this.$linkToEasy(
            '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' + JSON.stringify(resultData),
          )
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
       * 去订单详情
       */
      goOrderDetail(data) {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderDetail/OrderDetail?id=' + data.id + '&status=' + data.status,
        )
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick(data) {
        //获取订单详情
        let param = { id: data.id }
        this.$VoHttp
          .apiOrderSell$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              if (res.data.goodsDetail.length > 1) {
                this.$linkToEasy(
                  '/pagesAgent/Order/DeliverGoods/DeliverMoreGoodsvue?data=' +
                    JSON.stringify(res.data) +
                    '&type=' +
                    '2',
                )
                return
              }
              this.$linkToEasy(
                '/pagesAgent/Order/DeliverGoods/DeliverGoods?data=' +
                  JSON.stringify(res.data) +
                  '&type=' +
                  '2',
              )
            } else {
              uni.$u.toast(res.message || '订单获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单获取失败')
          })
      },
      //再来一单
      againOrder(resultData) {
        if (resultData.isValet) {
          // 存储商品信息，并带到提交订单页面
          // 组装需要的数据
          let url = ''
          if (resultData.goodsDetail[0].pic && resultData.goodsDetail[0].pic.length) {
            url = resultData.goodsDetail[0].pic[0]
          }
          const orderProductInfo = {
            shopInfo: {
              shopName: resultData.shopName,
              buyerId: resultData.buyerId,
            },
            goodsInfo: {
              addedServices: [],
              goodsCount: resultData.goodsDetail[0].goodsCount,
              goodsId: resultData.goodsDetail[0].goodsId,
              isCash: true,
              originalPrice: resultData.cashAmount,
              shippingType: resultData.shippingType || 2, // 1 包邮 2 到付
              codingPrice: resultData.goodsDetail[0].codingPrice,
              isCoding: resultData.isCoding,
              shopId: resultData.shopId,
              skuProperty: JSON.stringify(resultData.skuProperty || {}),
              warehouseId: resultData.warehouseId,
              warehouseName: resultData.warehouseName,
              arrivalTime: resultData.arrivalTime,
              pic: url,
              name: resultData.goodsDetail[0].goodsName,
            },
          }
          this.$storage.set('OrderPayInfoAgent', orderProductInfo)
          this.$linkToEasy('/pagesAgent/SubmitOrder/SubmitOrder')
          return
        }
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
            isValet: resultData.isValet,
            cartWarehouseList: [
              {
                warehouseName: resultData.warehouseName,
                warehouseId: resultData.warehouseId,
                cartDetailstList: cartDetailstList,
              },
            ],
          },
        ]
        this.$storage.set('investGoodsData', data)
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/SubmitOrders?queryType=' + 1 + '&sourceType=' + 2,
        )
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
      /**
       * 联系仓库
       */
      contantClick(resultData) {
        this.callPhone(resultData.warehousePhone)
        return
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          isCompany: true, //是否是联系店铺
          targetId: resultData.shopId,
          type: 0,
          note: resultData.shopName,
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
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
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
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return
          }
          this.pageNo++
          this.getOrderListRequest()
        }, 2000)
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
      getOrderRequest(data) {
        this.orderStartTime = data.orderStartTime
        this.orderEndTime = data.orderEndTime
        this.orderStatus = data.id
        this.warnType = data.warnType
        this.warehouseIdList = data.warehouseIdList
        this.orderList = []
        this.searchWord = data.searchWord
        console.log('1111111', data)
        this.getOrderListRequest()
      },
      //获取订单列表请求
      getOrderListRequest() {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          orderStatus: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 10,
        }

        if (this.searchWord) {
          param.searchWord = this.searchWord
        }

        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }

        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }

        if (this.warehouseIdList) {
          param.warehouseIdList = this.warehouseIdList
        }
        if (this.warnType > 0) {
          param.warnType = this.warnType
        }

        this.isOver=false
        console.log(param)
        this.$VoHttp
          .apiOrderSellQueryList(param)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              let resultData = res.data.records
              this.total = res.data.total
              this.orderList = this.orderList.concat(resultData)

              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '销售订单获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('销售订单获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
          .finally(() => {
            this.isOver=true
            this.loading = !this.loading
          })
      },

      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderSellCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '订单取消成功')
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
          .apiOrderSellWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              this.deliverGoodsModel = true
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message||'提醒发货失败')
          })
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
