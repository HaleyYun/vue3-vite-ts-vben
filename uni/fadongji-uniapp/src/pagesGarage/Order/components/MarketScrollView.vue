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
      <view v-else>
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <GoodInfoItem
          v-for="(item, index) in orderList"
          :key="index"
          :order-data="item"
          @bottomClick="bottomClick"
          @click.native="goOrderDetail(item)"
        />

        <VoModal
          :show="deliverGoodsModel"
          confirmColor="#22284B"
          confirmText="我知道了"
          content="平台已提醒商家尽快发货，请耐心等待。"
          @confirm="deliverGoodsModel = false"
        />
        <!--是否收到货-->
        <VoModal
          :show="showModalCancel"
          :showCancelButton="true"
          cancelColor="#7B7B7"
          cancelText="未收到"
          confirmColor="#333333"
          confirmText="已收到"
          content="您是否收到该订单商品"
          @cancel="close"
          @confirm="giveUp"
        />
        <!--   取消订单弹出层   -->
        <u-popup :show="showCancelOrder" mode="bottom" @close="close">
          <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="showCancelOrder = false" />
        </u-popup>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import GoodInfoItem from './GoodInfoItem'
  import OrderNoData from './OrderNoData'
  import CancelOrder from '../components/CancelOrder'

  export default {
    name: 'MarketScrollView',
    components: {
      GoodInfoItem,
      OrderNoData,
      CancelOrder,
    },
    props: {
      isRequest: {
        type: Boolean,
        default: false,
      },
      searchModel: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        current: 0,
        curNow: 0,
        deliverGoodsModel: false,
        sendType: false, //待发货显示催货栏 默认不显示
        typeList: [],
        orderList: [],
        orderStatus: '0',
        showCancelOrder: false, // 取消订单弹出层
        showModalCancel: false, //确认收货弹出层

        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',
        orderId: '',
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        warnType: 0,
      }
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
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch')
      },
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      sectionChange(index) {
        this.curNow = index
      },
      /**
       * 去订单详情
       */
      goOrderDetail(data) {
        this.$linkToEasy('/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + data.id)
      },
      /**
       *去备注
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            '/pagesGarage/Order/OrderSearch/OrderRemark?data=' + JSON.stringify(resultData),
          )
          return
        }

        if (index === '1') {
          this.$linkToEasy(
            `/pagesCommon/AddressList/AddressList?orderId=${resultData.id}&type=2&roleType=1&addressId=${resultData.orderAddress.id}`,
          )
          return
        }

        if (index === '2') {
          this.showCancelOrder = true
          this.orderId = resultData.id
          return
        }

        if (index === '3') {
          this.$u.toast('联系仓库')
          return
        }

        if (index === '4') {
          this.getDeliveryGoodsRequest(resultData)
          return
        }

        if (index === '5') {
          this.$linkToEasy('/pagesGarage/Order/OrderDetail/DeliveryMessage?id=' + resultData.id)
          return
        }
        if (index === '6') {
          this.$linkToEasy(
            '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' +
              resultData.id +
              '&type=' +
              '1' +
              '&payType=' +
              '1',
          )
          return
        }
        if (index === '7') {
          this.$linkToEasy(
            '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + resultData.id + '&type=' + '1',
          )
          return
        }
        if (index === '8') {
          this.orderId = resultData.id
          this.showModalCancel = true
          return
        }
        if (index === '9') {
          this.againOrder(resultData)
          return
        }
        if (index === '10') {
          this.$linkToEasy(
            '/pagesGarage/MyEvaluation/SendEvaluation?data=' +
              JSON.stringify(resultData) +
              '&sourceType=' +
              '0' +
              '&evaluateType=' +
              0,
          )
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
      giveUp() {
        let param = {
          id: this.orderId,
        }
        this.confiemGoodsRequest(param)
      },
      //再来一单
      againOrder(resultData) {
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        const orderProductInfo = {
          shopInfo: {
            shopName: resultData.shopName,
          },
          goodsInfo: {
            addedServices: [],
            goodsCount: 1,
            goodsId: resultData.goodsDetail[0].goodsId,
            isCash: true,
            originalPrice: resultData.goodsDetail[0].originalPrice,
            periodDays: 0,
            projectId: '',
            shippingType: resultData.shippingType || 2, // 1 包邮 2 到付
            codingPrice: resultData.codingPrice,
            isCoding: resultData.isCoding,
            shopId: resultData.shopId,
            skuProperty: JSON.stringify(resultData.skuProperty || {}),
            warehouseId: resultData.warehouseId,
            warehouseName: resultData.warehouseName,
            arrivalTime: resultData.arrivalTime,
            pic: resultData.goodsDetail[0].pic,
            name: resultData.goodsDetail[0].goodsName,
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)
        this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
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
            return false
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
        this.refresh = true
        console.log('asaasda asdasd ',data);
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
          pageSize: 20,
        }

        if (this.searchModel.length > 0) {
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
        console.log(param)
        this.$VoHttp
          .apiOrderSellQueryList(param)
          .then((res) => {
            if (res.code === '20001') {
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
            uni.$u.toast(err.message || '提醒发货失败')
          })
      },
      //确认收货请求请求
      confiemGoodsRequest(data) {
        this.showModalCancel = false

        let param = {
          orderId: data.id,
        }
        this.$VoHttp
          .apiOrderSellReceive({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              setTimeout(() => {
                this.$emit('confirmReviceGoodSuccess')
              }, 1500)
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('收货失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order-scroll {
    height: 100%;
    width: 100%;
    &__scroll {
      height: 100%;
    }
  }
</style>
