<template>
  <view>
    <view class="good fz-28 color-block">
      <VoNav is-fixed is-have-more title="寄售订单">

      </VoNav>
      <view class="market-top">
        <!--搜索-->
        <view class="market-top__search flex flex-vertical-c">
          <VoSearch
            v-model="searchModel"
            placeholder="请输入搜索"
            height="34"
            bgColor="#fff"
            borderColor="#FF5319"
            :showInsideAction="true"
            @search="orderSearch"
            @custom="orderSearch"
            @input="inputFn"
          />
        </view>
      </view>
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="typeList"
          activeStyle="font-weight: bold;color: #FF5319"
          class="tabs"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 28rpx"
          line-color="#FF5319"
          @change="tabChange"
          :scrollable="false"
        />
      </view>
      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in typeList" :key="index" class="swiper-item">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="true"
            class="scroll-list"
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
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <block v-if="orderList.length">
              <GoodInfoItem
                v-for="(listItem, listIndex) in orderList"
                :key="listItem.id + listIndex"
                :order-data="listItem"
                @bottomClick="bottomClick"
                @click.native="toDetail(listItem)"
              />
              <vo-loading-text :has-more="orderList.length < total" :loading="isLoading" />
            </block>
            <VoNoData v-else  no-data-tips="没有相关内容" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
  import GoodInfoItem from './components/DistributionItem'
  import { appSource } from '@/common/helper'

  export default {
    name: 'InstallOrderList',
    components: { GoodInfoItem },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,
        showPay: false,
        payValidationVisible: false,
        isLoading: false,
        keyword: '',
        current: 0,
        typeList: [],
        curNow: 0,
        sendType: false, //待发货显示催货栏 默认不显示
        orderList: [],
        orderStatus: '0',

        //下单时间区间(结束)yyyy-MM-dd HH:mm:ss
        orderEndTime: '',
        //下单时间区间(开始)yyyy-MM-dd HH:mm:ss
        orderStartTime: '',
        orderId: '',

        goodStatus: 1,
        searchModel: '',
        screenNum: '0',

        deliverGoodsModel: false,
        showCancelOrder: false, // 取消订单弹出层
        showModalCancel: false, //确认收货弹出层

        //急速退款
        //退款
        refundReasonList: [],
        refundReason: '',
        orderData: {},

        //是否跳转指定状态下
        specify: false,

        showCancel: false,
        origin: '',
        show: false,
        content: '',
        fastReturnShow: false,
        fastReturnContent: '',
      }
    },
    watch: {},
    onLoad(options) {
      this.origin = options.origin || '' //home从首页跳转
      uni.$on('updateOrderList', (res) => {
        options.origin === null
        this.getOrderStatusListRequest()
      })
      if (options.tabIndex) {
        this.current = options.tabIndex
        this.specify = true
      }
      this.getOrderStatusListRequest(options)
    },
    methods: {
      /**
       * 关闭
       */
      cancelOrder() {
        this.showCancelOrder = false
      },
      //去详情
      toDetail(data) {
        this.$linkToEasy('/pagesAgent/Order/DistributionOrder/DistributionOrderDetail?id=' + data.id)
      },
      //跳转搜索页
      searchOnClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderSearch/OrderSearch')
      },
      //筛选
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      //筛选时间
      screenData(data) {
        if (data) {
          this.screenNum = String(data.num)
          let timeArr = data.time
          if (timeArr.length > 0) {
            this.orderStartTime = timeArr[0]
            this.orderEndTime = timeArr[1]
          } else {
            this.orderStartTime = null
            this.orderEndTime = null
          }
        }
        this.origin = null
        this.getOrderListRequest(true)
      },
      //销售订单状态枚举
      //订单状态,5110=待发货,5120=已发货,5130=已取消（查全部状态可以不传）
      getOrderStatusListRequest(options) {
        this.typeList = [
          { id: '0', name: '全部' },
          { id: '5110', name: '待发货' },
          { id: '5120', name: '已发货' },
          { id: '5130', name: '已取消' },
        ]

        if (this.specify) {
          this.orderStatus = this.typeList[this.current].id
        }
        //万能喊返回的数据塞入list
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        if (
          options &&
          options.origin === 'voice' &&
          dataVoice.records &&
          dataVoice.records.records &&
          dataVoice.records.records.length
        ) {
          console.log('dataVoice', dataVoice.records.records)
          this.orderList = dataVoice.records.records
          this.total = dataVoice.records.total
        } else {
          this.getOrderListRequest(true)
        }
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
      },
      //swiper切换
      swiperChange(event) {
        this.refresh = true
        this.current = event.detail.current
        this.orderStatus = this.typeList[this.current].id
        this.getOrderListRequest(true)
      },
      //搜索
      orderSearch() {
        this.refresh = true
        this.getOrderListRequest()
      },
      inputFn(value) {
        //过滤空格
        this.searchModel = value.replace(/\s+/g, '')
      },
      //获取列表数据
      getOrderListRequest(fresh) {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        let isfresh = fresh || this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          status: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 20,
        }

        if (this.searchModel) {
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
          .apiOrderDistributionPage(param)
          .then((res) => {
            console.log('res -----', res)
            if (res.data) {
              let resultData = res.data.records
              this.total = res.data.total
              this.orderList = this.orderList.concat(resultData)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单获取失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = !this.isLoading
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getOrderListRequest(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
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
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      //确认取消
      confirmCancel() {
        this.showCancel = false
        this.showCancelOrder = true
      },
      /**
       *订单操作
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.评价 11.我要投诉
        let index = data.index
        let resultData = data.data
        this.orderData = resultData

        if (index === 'install') {
          this.$linkToEasy(`/pagesGarage/InstallOrder/SubmitOrders?id=${resultData.id}`)
          return
        }
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
          let arr = resultData.supportList.map((item) => item.id)
          if (arr && arr.length && arr[0]) {
            this.showCancel = true
          } else {
            this.showCancelOrder = true
          }
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
          this.$linkToEasy(
            '/pagesGarage/InstallOrder/OrderDetail/DeliveryMessage?id=' + resultData.id,
          )
          return
        }
        if (index === '6') {
          /**
           * 去支付
           */
          console.log(resultData.cashAmount)
          if (!resultData.cashAmount) {
            this.payValidationVisible = true
          } else {
            console.log('2222222')
            this.showPay = true
          }
          return
        }
        if (index === '7') {
          // 掉接口返回状态判断
          this.orderData = resultData
          //如果是待发货状态下申请退款 全单退
          if (resultData.status === 1120) {
            // 此接口比较特殊，校验极速退款
            this.$VoHttp
              .apiRefundCheckFastRefund({
                id: resultData.id,
              })
              .catch((err) => {
                console.log('err==', err)
                if (err.code === 'R5000') {
                  this.show = true
                  this.content = err.message
                  return
                }
                console.log('this.fastReturnShow', this.fastReturnShow)
                this.fastReturnShow = true
                this.fastReturnContent = err.message
              })
              .then((res) => {
                console.log('res==', res)
                if (!this.show && !this.fastReturnShow) {
                  this.confirmReturn()
                }
              })
            return
          }
          // 此接口比较特殊，不满足抛出了500，因此只能使用捕获进行提示，如果正常，则执行正常的逻辑
          this.$VoHttp
            .apiRefundCheckOrder({
              id: resultData.id,
            })
            .then((res) => {
              this.$linkToEasy(
                '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' +
                  resultData.id +
                  '&type=' +
                  '1',
              )
            })
            .catch((err) => {
              this.show = true
              this.content = err.message
            })
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
            '/pagesGarage/InstallOrder/SendEvaluation?data=' +
              JSON.stringify(resultData) +
              '&sourceType=' +
              '0' +
              '&evaluateType=' +
              0,
          )
          return
        }
        if (index === '11') {
          this.$linkToEasy(
            '/pagesCommon/ComplaintPage/ComplaintForm?data=' + JSON.stringify(resultData),
          )
          return
        }
      },
      //再来一单
      againOrder(resultData) {
        //增值服务
        let codingPrice = ''
        let isCoding = false
        let isInstall = false
        let installationFee = ''
        let isNew = false
        let tradeInFee = ''

        //supportType 31.售后 32.安装 33.回收 34.打码
        let addedServices = resultData.goodsDetail[0].addedServices || []
        if (addedServices.length > 0) {
          addedServices.forEach((item) => {
            if (item.supportType === 34) {
              isCoding = true
              codingPrice = item.price
            }
            if (item.supportType === 33) {
              isNew = true
              tradeInFee = item.price
            }

            if (item.supportType === 32) {
              isInstall = true
              installationFee = item.price
            }
          })
        }

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
            shippingType: resultData.shippingType, // 1 包邮 2 到付
            shopId: resultData.shopId,
            skuProperty: JSON.stringify(resultData.skuProperty || {}),
            warehouseId: resultData.warehouseId,
            warehouseName: resultData.warehouseName,
            arrivalTime: resultData.arrivalTime,
            pic: resultData.goodsDetail[0].pic,
            name: resultData.goodsDetail[0].goodsName,
            modelName: resultData.goodsDetail[0].modelName,

            //增值服务
            codingPrice: codingPrice,
            isCoding: isCoding,
            isInstall: isInstall,
            installationFee: isInstall, //安装费用
            isNew: isNew,
            tradeInFee: tradeInFee, //回收费用
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)
        this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
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
                this.refresh = true
                this.getOrderListRequest()
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
      // 选择投诉类型
      selectType(item) {
        this.$refs.actionPopup.close()
        this.refundReason = item.name
        this.applyForRefundRequest()
      },
      //极速退款确认事件
      confirmReturn() {
        this.fastReturnShow = false
        this.refundReasonRequest()
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
      //账期支付验证通过
      payValidationConfirm(code) {
        let that = this
        const req = {
          payChannel: 0,
          remark: '',
          payType: '61',
          source: appSource(),
          userId: this.orderData.buyerId,
          cashAmount: 0,
          orderId: this.orderData.parentId,
          accountAmount: this.orderData.accountAmount,
          smsCode: code,
        }
        showLoading('加载中')
        this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => {
            this.$refs.payValidationVisibleRef.close()
            this.payValidationVisible = false
            console.log('res.data', res.data)
            this.$u.toast('付款成功')

            setTimeout(() => {
              this.refresh = true
              this.getOrderListRequest()
            }, 1000)
            hideLoading()
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
            hideLoading()
          })
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: info.payKey || '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.orderData.buyerId,
          cashAmount: this.orderData.cashAmount,
          orderId: this.orderData.parentId,
          accountAmount: this.orderData.accountAmount || 0,
        }
        this.$storage.set('OrderPayInfo', req)
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              this.getLookPayResult()
            }
          })
          return
        }
        showLoading('加载中')
        const data = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        const payInfo = data.payInfo
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
            that.getLookPayResult()
          }
        })
      },
      //支付结果页
      getLookPayResult() {
        this.$VoHttp
          .payPayResult({ orderId: this.orderData.parentId })
          .then((res) => {
            console.log('支付结果', res)
            if (res && res.data && +res.data.status === 1) {
              console.log('未支付')
              return
            }
            uni.redirectTo({
              url:
                '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                res.data.status +
                '&price=' +
                this.orderData.payAmount,
            })
            this.refresh = true
            this.getOrderListRequest()
          })
          .catch((e) => {
            console.log(e, 'eeeeeeeeeeeeee')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    .nav-right {
      display: flex;
      width: auto;
      &__btn {
        background: #22284b;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
        text-align: center;
        margin-right: 24rpx;
      }
    }
    &-tabs {
      background-color: #ffffff;
    }
    .market {
      &-top {
        position: relative;
        width: 750rpx;
        background-color: #ffffff;

        &__alert {
          position: absolute !important;
          width: 750rpx;
          top: 98rpx !important;
          z-index: 99;
        }

        &__search {
          padding: 20rpx 32rpx 18rpx 32rpx;
          box-sizing: border-box;
          background: #fff;
          .scree {
            position: relative;

            &-icon {
              width: 48rpx;
              height: 48rpx;
            }
            &-badge {
              position: absolute;
              top: 0;
              right: -10rpx;
            }
          }
        }
        &__subsection {
          height: 100rpx;
          padding-left: 32rpx;
          padding-right: 32rpx;
          padding-top: 15rpx;
          .subsection {
            margin-top: 15rpx;
          }
        }
      }
    }
    .swiper {
      flex: 1;
      &-item,
      .scroll-list {
        height: 100%;
      }
    }
    .record-item {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .color-y {
      color: #ff9b05;
    }
    .color-g {
      color: #07c160;
    }
    .color-r {
      color: #ee0a24;
    }
    .sys-img {
      width: 64rpx;
      height: 64rpx;
    }
  }
</style>
