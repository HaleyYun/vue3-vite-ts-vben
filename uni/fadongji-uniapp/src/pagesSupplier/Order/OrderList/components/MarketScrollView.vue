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
          @toIm="toImClick"
          @click.native="goOrderDetail(item)"
        />

        <VoModal
          :show="deliverGoodsModel"
          confirmColor="#22284B"
          confirmText="我知道了"
          content="平台已提醒仓库人员尽快发货，请耐心等待"
          @confirm="deliverGoodsModel = false"
        />
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
  import OrderNoData from './OrderNoData'
  import { getImUserId } from '@/common/helper'

  export default {
    name: 'MarketScrollView',
    components: {
      GoodInfoItem,
      OrderNoData,
    },
    props: {
      isRequest: {
        type: Boolean,
        default: false,
      },
      //订单状态
      status: {
        type: String,
        default: '',
      },
      //是否超时订单
      isTimeout: {
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
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
        typeList: [],
        orderList: [],
        orderStatus: '0',
        warehouseIdList: [],
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
        searchWord: '',
      }
    },
    created() {
      if (this.status) {
        this.orderStatus = this.status
        if (this.isTimeout) {
          this.warnType = 2
        }
        this.getOrderListRequest()
        return
      }
      if (this.isRequest) {
        this.getOrderListRequest()
      }
    },
    methods: {
      mobileActionSelect(e) {
        this.$cellPhone(e.name)
      },
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
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息
        let index = data.index
        let resultData = data.data

        if (index === '0') {
          this.$linkToEasy(
            '/pagesSupplier/Order/OrderList/OrderRemark?data=' + JSON.stringify(resultData),
          )
          return
        }
        /**
         * 修改地址
         */
        if (index === '1') {
          if (resultData.orderAddress.isEdited) {
            this.$u.toast('您已经修改过一次地址了')
            return
          }
          this.$linkToEasy(
            `/pagesCommon/AddressList/AddressList?orderId=${resultData.id}&type=2&roleType=3&addressId=${resultData.orderAddress.id}&companyId=${resultData.buyerId}`,
          )
          return
        }

        if (index === '2') {
          this.getCancelOrderRequest(resultData)
          return
        }

        if (index === '3') {
          if (resultData.warehousePhone.indexOf('/') > -1) {
            let mobile = resultData.warehousePhone.split('/')
            this.mobileList = []
            this.mobileList = mobile.map((item) => {
              return {
                name: item,
              }
            })
            // mobile.forEach((item) => {
            //   if (uni.$u.test.mobile(item)) {
            //     let param = {
            //       name:item
            //     }
            //     this.mobileList.push(param)
            //   }
            // })
            if(this.mobileList.length > 1) {
              this.mobileShowAction = true
              return;
            }
            this.$cellPhone(resultData.warehousePhone)
            return
          }
          this.$cellPhone(resultData.warehousePhone)
          return
        }

        if (index === '4') {
          this.getDeliveryGoodsRequest(resultData)
          return
        }

        if (index === '5') {
          this.$linkToEasy('/pagesSupplier/Order/OrderDetail/DeliveryMessage?id=' + resultData.id)
          return
        }
        if (index === '10') {
          this.deliveryClick(resultData)
          return
        }
      },
      /**
       * 去订单详情
       */
      goOrderDetail(data) {
        this.$linkToEasy('/pagesSupplier/Order/OrderDetail/OrderDetail?id=' + data.id)
      },
      /**
       * 聊天
       */
      toImClick(data) {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        //根据店铺id获取userId
        getImUserId({ companyId: data.data.buyerId })
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: data.data.buyerName,
                platformCode: res.data.platformCode, // 1供应商  2服务商
                isProject: true,
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
              //储存发货商品信息
              this.$storage.set('sendGoodsDetail', res.data)
              if (res.data.goodsDetail.length > 1) {
                this.$linkToEasy('/pagesSupplier/Order/DeliverGoods/DeliverMoreGoodsvue?type=2')
                return
              }
              this.$linkToEasy('/pagesSupplier/Order/DeliverGoods/DeliverGoods?type=2')
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
        this.orderList = []
        this.searchWord = data.searchWord
        this.warehouseIdList = data.warehouseIdList
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
          warehouseIdList: this.warehouseIdList,
          pageNo: this.pageNo,
          pageSize: 20,
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
      getCancelOrderRequest(data) {
        console.log(data)
        let param = {
          orderId: data.id,
          cancelReason: '不好用',
          remark: '',
        }
        console.log(param)
        this.$VoHttp
          .apiOrderSellCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
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
              uni.$u.toast('提醒发货成功')
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提醒发货失败')
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
