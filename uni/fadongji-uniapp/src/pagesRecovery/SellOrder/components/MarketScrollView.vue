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
      <VoNoData v-if="orderList.length === 0 && !refresh" no-data-tips="暂无销售订单" />
      <view v-else>
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <GoodInfoItem
          :isPro="false"
          v-for="(item, index) in orderList"
          :key="index"
          :order-data="item"
          @bottomClick="bottomClick"
          @click.native="goOrderDetail(item)"
        />
        <u-loadmore
          :loading-text="loadingText"
          :loadmore-text="loadmoreText"
          :nomore-text="nomoreText"
          :status="status"
          height="40"
          line
        />
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import GoodInfoItem from './GoodInfoItem'
  import { showLoading, hideLoading } from '@/common/helper'

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
        orderList: [],
        orderStatus: '0',
        status: 'nomore',
        loadingText: '努力加载中',
        loadmoreText: '轻轻上拉',
        nomoreText: '暂无更多内容',
        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',
        // 是否预售
        isPreSale: null,
        orderId: '',
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
      }
    },
    created() {
      if (this.isRequest) {
        // this.getOrderListRequest()
      }
    },
    methods: {
      /**
       * 去订单详情
       */
      goOrderDetail(data) {
        this.$linkToEasy('/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=' + data.id)
      },
      /**
       *去备注
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 11.发货
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/OrderSearch/OrderRemark?data=${JSON.stringify(
              resultData,
            )}&type=2`,
          )
          return
        }

        if (index === '1') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/ReceiveAddress/AddressList?orderId=${resultData.id}&type=2&companyId=${resultData.orderCompanyId}`,
          )
          return
        }
        if (index === '5') {
          this.$linkToEasy(
            `/pagesRecovery/SellOrder/OrderDetail/DeliveryMessage?data=${resultData.id}`,
          )
          return
        }
        if (index === '11') {
          this.$linkToEasy(
            '/pagesRecovery/SellOrder/DeliverGoods/DeliverGoods?data=' + resultData.id,
          )
          return
        }
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
        const { orderStartTime, orderEndTime, orderStatus, isPreSale } = data
        this.orderStartTime = orderStartTime
        this.orderEndTime = orderEndTime
        this.orderStatus = orderStatus
        this.isPreSale = isPreSale
        // this.warnType = data.warnType
        this.refresh = true
        this.getOrderListRequest()
      },
      //获取订单列表请求
      getOrderListRequest(refresh) {
        let isfresh = refresh || this.refresh
        showLoading()
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
          param.param = this.searchModel
        }

        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }

        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }
        param.isPreSale = this.isPreSale
        // if (this.warnType > 0) {
        //   param.warnType = this.warnType
        // }
        console.log(param)
        // this.orderList = [
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '待付款',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1110,
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类', '预售'],
        //       },
        //     ],
        //   },
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '待付款',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1110,
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类'],
        //       },
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['B类'],
        //       },
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['CÏ类'],
        //       },
        //     ],
        //   },
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '待发货',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1120,
        //     nextStageTime: '10月1日 12点',
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类'],
        //       },
        //     ],
        //   },
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '已发货',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1130,
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类'],
        //       },
        //     ],
        //   },
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '已完成',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1140,
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类'],
        //       },
        //     ],
        //   },
        //   {
        //     id: '111111111111111',
        //     createTime: '2022-08-09 15:14:10',
        //     shopName: '郑州沃森再制造厂',
        //     statusName: '已取消',
        //     payAmount: '12073.23',
        //     amount: '42344.23',
        //     status: 1150,
        //     goodsDetail: [
        //       {
        //         goodsName: 'B15发动机荣光-黑色OCV',
        //         originalPrice: '9999.00',
        //         goodsCount: '10',
        //         deliveryCount: 0,
        //         tagList: ['A类'],
        //       },
        //     ],
        //   },
        // ]
        this.$VoHttp
          .apiOrderOldQueryList(param)
          .then((res) => {
            hideLoading()
            console.log(res)
            if (res.code === '20001') {
              let resultData = res.data.records
              resultData.forEach((item) => {
                let totalCount = 0
                item.goodsDetail.forEach((it) => {
                  totalCount += it.goodsCount
                })
                item.totalCount = totalCount
              })
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
