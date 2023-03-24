<template>
  <view>
    <view class="good fz-28 color-block">
      <VoNav is-fixed is-have-more title="安装订单">
      </VoNav>
      <!-- <view class="top-search">
        <VoSearch v-model="keyword" placeholder="请输入搜索" />
      </view> -->
      <view v-if="current === 0 || current" class="good-tabs">
        <EraTabs
          :current="current"
          :list="tabs"
          activeStyle="font-size: 16px;color: #FF5319;font-weight: bold;"
          class="tabs"
          inactiveStyle="font-size: 14px"
          itemStyle="padding: 12px 12px 15px 12px;"
          @change="tabChange"
        />
      </view>

      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item">
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
            <block v-if="infoList.length">
              <OrderItem
                v-for="listItem in infoList"
                :key="listItem.id"
                :orderData="listItem"
                @operationClick="operationClick($event, listItem)"
              />
              <vo-loading-text :has-more="infoList.length < total" :loading="isLoading" />
            </block>
            <VoNoData v-else img-url="/static/noData/noOrder.png" no-data-tips="您还没有相关订单" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <QualityTestModal ref="qualityTestModal" />
    <ConfirmReceiptModal ref="confirmReceiptModal" /> -->
    <CancelInstallOrder :show="showCancel" @close="showCancel = false" @confirm="cancelOrder">
      <view v-if="cancelData.penaltyAmount" slot="msg" class="text-center m-t-40 fz-28 color-red">
        {{ tipMsg }}
      </view>
    </CancelInstallOrder>
    <VoHelpAction ref="helpRef" />
    <VoPayPopup
      :show.sync="showPay"
      :total-price="operationData.supportAmount"
      @confirm="payHandler"
    />
    <!--  取消订单确认 -->
    <VoModal
      :show="showModalCancel"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="取消订单"
      content="该安装订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单"
      @cancel="showModalCancel = false"
      @confirm="confirmCancel"
    />
    <VoModal
      :show="showModalTip"
      :showCancelButton="false"
      confirmText="我知道了"
      content="该安装订单为随新机购买生成的订单，当前关联的购买订单已经发货，无法取消订单"
      @confirm="showModalTip = false"
    />
    <!-- 不等待  -->
    <VoModal
      :show="showModalWait"
      :showCancelButton="true"
      cancelText="取消订单"
      confirmText="需要指派"
      content="是否需要指派其他集师傅继续安装服务？"
      @cancel="waitCancel"
      @confirm="confirmWait"
    />
    <!-- 安装中  -->
    <VoModal
      :content="evaQuestion"
      :show="showModalSatrt"
      :showCancelButton="true"
      cancelText="否"
      confirmText="是"
      @cancel="toEvaPage(0)"
      @confirm="toEvaPage(1)"
    />
    <!-- 上门时间选择器 -->
    <VoTimePicker
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
  </view>
</template>
<script>
  import helper, { goOnlineCustomerFn, goWechat } from '@/common/helper'
  // import QualityTestModal from './components/QualityTestModal'
  // import ConfirmReceiptModal from './components/ConfirmReceiptModal'
  import VoTimePicker from '@/components/VoTimePicker/VoTimePicker'
  import CancelInstallOrder from './components/CancelInstallOrder'
  import OrderItem from './components/OrderItem'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'MyGoods',
    components: {
      OrderItem,
      CancelInstallOrder,
      VoTimePicker,
      // QualityTestModal,
      // ConfirmReceiptModal
    },
    data() {
      return {
        isAddCurrent: true,
        showCancel: false,
        showPay: false,
        showModalCancel: false,
        showModalTip: false,
        showModalWait: false,
        showModalSatrt: false,

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,

        isLoading: false,
        keyword: '',
        current: 0,
        tabs: [
          {
            name: '全部',
            num: '',
            value: 0,
            index: 0,
          },
          {
            name: '超时订单',
            num: '',
            value: 1,
            index: 1,
          },
          {
            name: '待付款',
            num: '',
            value: 2,
            index: 2,
          },
          {
            name: '待接单',
            num: '',
            value: 3,
            index: 3,
          },
          {
            name: '待安装',
            num: '',
            value: 4,
            index: 4,
          },
          {
            name: '已完成',
            num: '',
            value: 5,
            index: 5,
          },
          // {
          //   name: '已取消',
          //   num: '',
          //   value: 3270,
          //   index: 6,
          // },
          // {
          //   name: '已关闭',
          //   num: '',
          //   value: 3280,
          //   index: 7,
          // },
        ],
        infoList: [
          // {
          //   id: '11',
          //   status: 1,
          // },
          // {
          //   id: '22',
          //   status: 2,
          // },
          // {
          //   id: '33',
          //   status: 3,
          // },
          // {
          //   id: '44',
          //   status: 4,
          // },
        ],
        selectList: [],
        isSelectAll: false,
        isSelectAllCancel: false,
        postData: {},
        orderStatus: 0,

        operationData: '',
        operationType: '',
        modalVisible: false,
        formData: {
          typeA: '',
          typeB: '',
          typeC: '',
        },
        cancelData: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:00:00'),
        tipMsg: '',
        evaQuestion: '', //无感评价问题
        overtimeOrderNum: 0,

        // 上门时间选择器
        timePickerShow: false,
        optionsOrigin: '',
      }
    },
    watch: {},
    onLoad(option) {
      console.log(option, 'tabIndex')
      console.log(this.current, 'this.current')
      if (option.tabIndex) {
        this.orderStatus = this.tabs[Number(option.tabIndex)].value
        this.current = Number(option.tabIndex) ? Number(option.tabIndex) : 0
      }
      this.optionsOrigin = option.origin || ''
      // uni.$off('noAddCurrent')
      // uni.$on('noAddCurrent', (res) => {
      //   console.log('noAddCurrent', res)
      //   if (res) {
      //     this.isAddCurrent = false
      //   }
      // })
    },
    async onShow() {
      // await this.getOvertimeOrder()
      if (this.optionsOrigin === 'voice') {
        //万能喊返回的数据
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        if (
          dataVoice.records &&
          dataVoice.records.records &&
          dataVoice.records.records.length
        ) {
          console.log('dataVoice', dataVoice.records.records)
          this.infoList = dataVoice.records.records
          this.infoList.forEach((item) => {
            //组装时间段
            if (item.homeStartTime && item.homeEndTime) {
              item.time =
                this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                '-' +
                this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
            }
          })
          this.total = dataVoice.records.total
        } else {
          await this.getData(true)
        }
      } else {
        await this.getData(true)
      }
    },
    methods: {
      //上门时间
      timePickerConfirm(data) {
        console.log(data)
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        // this.upTime = data.dateTime
        const timeArr = data.time.split('-')
        let params = {
          id: this.operationData.id,
          homeStartTime: data.date + ' ' + timeArr[0] + ':00',
          homeEndTime: data.date + ' ' + timeArr[1] + ':00',
        }
        console.log(params)
        this.timePickerShow = false
        this.$VoHttp
          .apiOrderInstallUpdate(params)
          .then(() => {
            this.$u.toast('已提交申请，等待平台派单')
            this.getData(true)
          })
          .catch((e) => {
            this.$u.toast(e.message || '操作失败')
          })
          .finally(() => {
            this.isLoading = !this.isLoading
          })
      },
      //获取超时订单数量
      getOvertimeOrder() {
        let params = {
          pageNo: 1,
          pageSize: 1,
          orderStatus: 1,
        }
        this.$VoHttp.apiOrderInstallQueryList(params).then((res) => {
          this.overtimeOrderNum = res.data.total || 0
          if (this.overtimeOrderNum) {
            // 为了  保证传参current 数字无问题   超时订单有时候没有这个tab
            if (this.current > 0 && this.isAddCurrent) {
              this.current++
              this.isAddCurrent = false
            }
            this.tabs = [
              {
                name: '全部',
                num: '',
                value: 0,
                index: 0,
              },
              {
                name: '超时订单',
                num: '',
                value: 1,
                index: 1,
              },
              {
                name: '待付款',
                num: '',
                value: 2,
                index: 2,
              },
              {
                name: '待接单',
                num: '',
                value: 3,
                index: 3,
              },
              {
                name: '待安装',
                num: '',
                value: 4,
                index: 4,
              },
              {
                name: '已完成',
                num: '',
                value: 5,
                index: 5,
              },
            ]
          }
        })
      },
      toDetail(item) {
        this.$linkToEasy('/pagesRecovery/RecycleOrders/TypeRecordDetail?id=' + item.id)
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.orderStatus = tab.value
        // this.getData(true)
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.getData(true)
      },
      //操作按钮点击事件
      operationClick($event, data) {
        let key = $event
        this.operationData = data
        //取消
        if (key === 'cancel') {
          //待收货、已完成：此时不可以取消订单，页面上进行弹窗提示
          if (
            (this.operationData.sellOrderStatus === 1130 ||
              this.operationData.sellOrderStatus === 1140) &&
            this.operationData.supportSource === 2
          ) {
            this.showModalTip = true
            return
          }
          // 用户点击【取消订单】后先判断订单来源
          // 订单来源为【来源-销售订单】待付款、待发货：此时可以取消订单，页面上进行弹窗提示1110.待付款 1120.待发货
          if (this.operationData.supportSource === 2) {
            this.showModalCancel = true
          } else {
            this.showCancel = true
          }
          //待安装,获取退款数据
          if (this.operationData.orderStatus === 3240) {
            this.getCancelData()
          }
        } else if (key === 'pay') {
          //支付
          this.showPay = true
        } else if (key === 'nowait') {
          //不等待
          this.showModalWait = true
        } else if (key === 'wait') {
          //继续等待,点击后该订单依然为【待安装】状态，显示的可操作按钮为【取消订单】、【联系客服】
          this.$VoHttp
            .apiOrderInstallContinueWait({ id: this.operationData.id })
            .then(() => {
              this.$u.toast('操作成功')
              this.getData(true)
            })
            .catch((err) => {
              this.$u.toast(err.message || '操作失败')
            })
        } else if (key === 'finish') {
          //确认安装完成
          this.$VoHttp
            .apiOrderInstallConfirm({ id: this.operationData.id })
            .then(() => {
              this.$u.toast('安装服务已结束')
              this.getEvaQuestion()
              // this.getData(true)
            })
            .catch((err) => {
              this.$u.toast(err.message || '操作失败')
            })
        } else if (key === 'contact') {
          //联系客服
          // this.goImUrl()

          goOnlineCustomerFn(2)
        }
      },
      /**
       * 到聊天界面
       */
      goImUrl() {
        helper.showLoading()
        this.$VoHttp
          .apiOrderInstallCommitComplaint({
            id: this.operationData.id,
            categoryId: 1,
            content: '服务不到位',
          })
          .then(() => {
            // const data = {
            //   targetId: this.operationData.userId,
            //   type: 0,
            //   note: '',
            //   platformCode: this.operationData.platformCode,
            // }
            // this.$storage.set('temp_im_room_info', data)
            // this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            goOnlineCustomerFn()
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
            helper.hideLoading()
          })
      },
      //获取无感评价问题
      getEvaQuestion() {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderNoninductiveEvaluateQuestion({ sourceId: this.operationData.id })
          .then((res) => {
            this.evaQuestion = res.data
            console.log('获取无感评价问题', res)
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
          .finally(() => {
            this.showModalSatrt = true
            this.isLoading = false
          })
      },
      //无感评价确认
      toEvaPage(status) {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderNoninductiveEvaluateSave({
            sourceId: this.operationData.id,
            sourceType: 2,
            status: status,
            content: this.evaQuestion,
          })
          .then((res) => {
            this.$linkToEasy(
              `/pagesGarage/InstallOrder/SendEvaluation?type=order&id=${this.operationData.id}`,
            )
            console.log('获取无感评价问题', res)
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
          .finally(() => {
            this.showModalSatrt = false
            this.isLoading = false
            this.getData(false)
          })
      },
      //取消订单
      confirmCancel() {
        this.showModalCancel = false
        this.showCancel = true
      },
      //获取时间差
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.ceil(ms / 1000 / 60 / 60) //小时
      },
      //取消订单
      cancelOrder(data) {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderInstallPayRefund({
            id: this.operationData.id,
            cancelReason: data.renson === '其他' ? data.remark : data.renson,
            source: helper.appSource(), //订单来源(1：安卓，2：ios，3：h5，4：pc 5：小程序 6：公众号)
          })
          .then((res) => {
            uni.$u.toast(`订单取消成功`)
            this.getData(true)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单取消失败')
          })
          .finally(() => {
            this.showCancel = false
            this.isLoading = false
          })
      },
      //获取退款数据
      getCancelData() {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderInstallCancel({ orderId: this.operationData.id })
          .then((res) => {
            console.log('res退款数据', res)
            this.cancelData = res.data
            let preDate = new Date(
              new Date(this.cancelData.homeStartTime).getTime() - 24 * 60 * 60 * 1000,
            )
            let preDateValue = this.$vocenApi.VoUtils.timeFormat(preDate, 'yyyy-mm-dd hh:MM:ss')
            console.log('preDateValue', preDateValue)
            let hourNum = this.getHour(
              this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:00:00'),
              this.cancelData.homeStartTime,
            )
            console.log('hourNum', hourNum)
            if (hourNum >= 24) {
              this.tipMsg = `${preDateValue}之前可免费取消`
            } else if (hourNum < 24) {
              if (this.cancelData.penaltyAmount) {
                this.tipMsg = `距离上门时间不足${hourNum}小时，现在取消将扣除违约金${this.cancelData.penaltyAmount}元补偿集师傅`
              }
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      //不需要指派
      waitCancel() {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderInstallUnwanted({ id: this.operationData.id, source: helper.appSource() })
          .then((res) => {
            this.$u.toast('服务订单已关闭，订单将全额退款')
            this.getData(true)
          })
          .catch((err) => {
            console.log('err', err)
            this.$u.toast(err.message || '操作失败')
            this.showModalWait = false
          })
          .finally(() => {
            this.showModalWait = false
            this.isLoading = false
          })
      },
      //需要指派
      confirmWait() {
        //点击后关闭弹窗，显示toast提示信息：已提交申请，等待平台派单。将该订单状态变更为【待指派】
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        this.$VoHttp
          .apiOrderInstallNeedAssign({ id: this.operationData.id })
          .then((res) => {
            // this.$u.toast('已提交申请，等待平台派单')
            this.showModalWait = false
            // this.getData(true)
            this.isLoading = false
            this.timePickerShow = true
          })
          .catch((err) => {
            console.log('err', err)
            this.$u.toast(err.message || '操作失败')
            this.showModalWait = false
          })
          .finally(() => {
            this.showModalWait = false
            this.isLoading = false
            this.timePickerShow = true
          })
      },
      //查验
      toCheck(data) {
        this.$refs.qualityTestModal.show(data)
      },
      //物流信息
      toLogistics(listItem) {},
      //确认收货
      confirmReceipt(data) {
        this.$refs.confirmReceiptModal.show(data)
      },
      //支付
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          source: helper.appSource(),
          userId: that.operationData.buyerId,
          cashAmount: that.operationData.supportAmount,
          accountAmount: 0,
          orderId: that.operationData.id,
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
                .payPayResult({ orderId: that.operationData.id })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  that.getData(true)
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        helper.showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .apiOrderInstallPay(req)
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        helper.hideLoading()
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
              .payPayResult({ orderId: that.operationData.id })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                that.getData(true)
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        } else {
          if (this.isLoading) return
          this.isLoading = !this.isLoading
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderStatus: this.orderStatus,
        }
        this.$VoHttp
          .apiOrderInstallQueryList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records || []
              this.total = res.data.total
              data.forEach((item) => {
                //组装时间段
                if (item.homeStartTime && item.homeEndTime) {
                  item.time =
                    this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                    '-' +
                    this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
                }
              })
			  this.$nextTick(() => {
				this.infoList = this.infoList.concat(data)
			  })
              console.log('this.infoList', this.infoList)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.isLoading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
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
          this.isLoading = false
          this.getData(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        // }, 2000)
        console.log('底部加载', this.infoList.length, this.total)
        this.refresh = false
        if (this.infoList.length >= this.total) {
          // uni.$u.toast('没有更多了')
          this.noMore = true
          return false
        }
        this.isLoading = false
        this.noMore = false
        this.pageNo++
        this.getData()
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
      //出库
      outWare(listItem) {
        this.operationData = listItem
        this.operationType = 'out'
        this.modalVisible = true
      },
      //ru库
      enterWare(listItem) {
        this.operationData = listItem
        this.operationType = 'in'
        this.modalVisible = true
      },
      confirmFn() {
        this.modalVisible = false
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
    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .swiper {
      flex: 1;
      &-item,
      .scroll-list {
        height: 100%;
      }
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
