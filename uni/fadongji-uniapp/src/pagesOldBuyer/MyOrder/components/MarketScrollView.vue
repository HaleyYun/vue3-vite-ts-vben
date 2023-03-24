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
      <view class="no_data" v-if="!orderList.length">
        <VoNoData noDataTips="暂无更多订单" v-if="!loading" />
      </view>
      <view v-else class="p-b-safe-area">
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <GoodInfoItem
          v-for="(item, index) in orderList"
          :key="index"
          :order-data="item"
          @bottomClick="bottomClick"
        />
        <VoLoadingText :has-more="orderList.length < total" :loading="false" v-if="!loading" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import GoodInfoItem from './GoodInfoItem'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'MarketScrollView',
    components: {
      GoodInfoItem,
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
        isPreSale: '', //是否预售
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
        total: 0,
        warnType: 0,
        //仅退款原因
        refundReasonList: [],
        //退款原因
        reasonString: '',
        //退款封装数据 仅用于急速退款场景
        refunData: {},
        loading: false,
      }
    },
    created() {
      if (this.isRequest) {
        this.getOrderListRequest(true)
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
       *去备注
       */
      bottomClick(data) {
        console.log(data)
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓储 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.投诉
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            '/pagesOldBuyer/CartModule/OrderRemark?data=' + JSON.stringify(resultData),
          )
          return
        }

        if (index === '1') {
          this.$linkToEasy(
            '/pagesCommon/AddressList/AddressList?orderId=' +
              resultData.id +
              '&type=' +
              '2' +
              '&roleType=' +
              '1',
          )
          return
        }

        if (index === '2') {
          // this.showCancelOrder = true
          // this.orderId = resultData.id
          this.$emit('cancelOrder', resultData)
          return
        }

        if (index === '3') {
          this.$u.toast('联系仓储')
          return
        }

        if (index === '4') {
          this.getDeliveryGoodsRequest(resultData)
          return
        }

        if (index === '5') {
          this.$linkToEasy(
            '/pagesOldBuyer/MyOrder/DeliveryMessage?id=' + resultData.id,
          )
          return
        }
        if (index === '6') {
          this.$linkToEasy(
            '/pagesOldBuyer/MyOrder/MarkerOrderDetail?id=' +
              resultData.id +
              '&type=' +
              '1' +
              '&payType=' +
              '1',
          )
          return
        }
        if (index === '7') {
          // this.refunData = resultData
          this.$emit('showRefun', resultData)
          // this.refundReasonRequest()
          return
        }
        if (index === '8') {
          // this.orderId = resultData.id
          // this.showModalCancel = true
          this.$emit('orderReceive', resultData)
          return
        }
        if (index === '9') {
          this.againOrder(resultData)
          return
        }
        if (index === '10') {
          this.$linkToEasy('/pagesCommon/ComplaintPage/ComplaintForm')
          return
        }
      },

      //再来一单
      againOrder(resultData) {
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
                warehouseName: resultData.shopName,
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
        this.isPreSale = data.isPreSale
        this.orderList = []
        this.getOrderListRequest()
      },
      //获取订单列表请求
      getOrderListRequest(refresh) {
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          console.log(this.loading)
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          orderStatus: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 20,
        }
        if (this.searchModel.length > 0) {
          param.param = this.searchModel
        } else {
          param.param = null
        }

        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }

        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }
        if (this.isPreSale) {
          param.isPreSale = this.isPreSale
        }

        if (this.warnType > 0) {
          param.warnType = this.warnType
        }
        console.log(param)
        showLoading()
        this.$VoHttp
          .apiOrderOldQueryList(param)
          .then((res) => {
            let resultData = res.data.records
            this.total = res.data.total
            this.orderList = this.orderList.concat(resultData)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(res.message || '销售订单获取失败')
          })
          .finally(() => {
            hideLoading()
            this.loading = false
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },

      //提醒发货请求请求
      getDeliveryGoodsRequest(data) {
        let param = {
          orderId: data.id,
        }
        showLoading()
        console.log(param)
        this.$VoHttp
          .apiOrderOldWarn(param)
          .then((res) => {
            if (res.code === '20001') {
              // this.deliverGoodsModel = true
              this.$emit('deliverGoodsModel')
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提醒发货失败')
          })
          .finally(() => {
            hideLoading()
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
  .no_data {
    height: 100%;
    background: #fff;
  }
</style>
