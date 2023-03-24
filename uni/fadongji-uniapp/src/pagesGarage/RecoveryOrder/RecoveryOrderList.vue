<template>
  <view>
    <view class="order">
      <VoNav is-fixed is-have-more title="回收订单" />
      <view class="bg-white">
        <EraTabs
          :current="currentTab"
          :list="tabsList"
          activeStyle="font-weight: bold;color: #FF5319"
          line-color="#FF5319"
          @change="changeTabs"
        />
      </view>
      <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
        <swiper-item v-for="value in tabsList" :key="value.value" class="h-full">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="true"
            class="order-scroll h-full"
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
            <ItemOrder
              v-for="item in reOList"
              :key="item.id"
              :item-data="item"
              :item-order="item"
              @arrived="showArrived"
              @assignMechanic="showAssignMechanic"
              @cancleOrder="showCancleOrder"
              @continue="toContinue"
              @customerService="showHelpPop"
              @toEvaluate="toEvaluate"
            />

            <view v-if="noMore && reOList.length" class="p-b-50 p-t-50">
              <u-loadmore
                color="rgba(0, 0, 0, 0.45)"
                line
                lineColor="rgba(0, 0, 0, 0.08)"
                nomore-text="暂无更多内容"
                status="nomore"
              />
            </view>

            <VoNoData v-if="!reOList.length&&isOverLoading" no-data-tips="暂无数据" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!--  取消订单  -->
    <VoModal
      v-if="isCancle"
      :show="true"
      cancelText="我再想想"
      confirmText="取消订单"
      showCancelButton
      @cancel="isCancle = false"
      @confirm="cancleOrder"
    >
      <view class="slot-content"> {{ isBindContent }}</view>
    </VoModal>

    <VoModal v-if="isNoCancel" :show="true" confirmText="我知道了" @confirm="isNoCancel = false">
      <view class="slot-content"> {{ isNoCancelContent }}</view>
    </VoModal>

    <!-- 不等待 我知道了弹窗 -->
    <VoModal v-if="isNoWait" :show="true" confirmText="我知道了" @confirm="isNoWaitConfirm">
      <view class="slot-content"> 平台将尽快指派其他集师傅继续为您提供回收服务</view>
    </VoModal>
    <!--  指派新技工  -->
    <VoModal
      v-if="isAssign"
      :show="true"
      cancelText="取消订单"
      closeOnClickOverlay
      confirmText="需要指派"
      showCancelButton
      @cancel="assignNotMechanic"
      @confirm="assignMechanic"
    >
      <view class="slot-content"> 是否需要指派其他集师傅继续回收服务？</view>
    </VoModal>
    <!--  是否到达  -->
    <VoModal
      v-if="isArrival"
      :show="true"
      cancelText="否"
      confirmText="是"
      showCancelButton
      @cancel="hasArrved(0)"
      @confirm="hasArrved(1)"
    >
      <view class="slot-content"> {{ isArrivalContent }}</view>
    </VoModal>
    <!--  取消订单  -->
    <u-popup :round="5" :show="showCancelPopup" mode="bottom" @close="close" @open="open">
      <CancelOrder @cancelorder="showCancelPopup = false" />
    </u-popup>

    <u-popup :round="5" :show="cancelOrderPopup" mode="bottom" @close="cancelOrderClose">
      <view>
        <view class="order-info m-t-16">
          <view class="order-info__tips">请选择取消订单的原因 (必选)</view>
          <EraRadioGroup v-model="radioValue" placement="column">
            <EraRadio
              v-for="(item, index) in radioList"
              :key="index"
              :customStyle="{ marginBottom: '12px' }"
              :disabled="item.disabled"
              :iconSize="14"
              :label="item.name"
              :name="item.name"
              activeColor="#FF5319"
              labelColor="#262626"
              @change="radioChange"
            />
          </EraRadioGroup>
          <u--textarea
            v-if="radioValue === '其他'"
            v-model="value"
            confirmType="done"
            count
            height="130"
            maxlength="120"
            placeholder="请输入内容"
          />
        </view>
        <view class="order-bottom p-b-safe-area">
          <EraButton :disabled="disabled" circle @click="confirmClick" />
        </view>
      </view>
    </u-popup>
    <!--  联系客服  -->
    <VoHelpAction ref="helpRef" />
    <!-- 上门时间选择器 -->
    <VoTimePicker
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ItemOrder from './components/ItemOrder'
  import CancelOrder from './components/CancelOrder'
  import VoTimePicker from '@/components/VoTimePicker/VoTimePicker'
  import helper, { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'RecoveryOrderList',
    components: { ItemOrder, CancelOrder, VoTimePicker },
    data() {
      return {
        isOverLoading:false,
        flag: false,
        total: 0,
        noMore: true, //是否显示‘没有更多内容’
        isCancle: false, //是否显示取消订单
        isNoCancel: false,
        isAssign: false, //是否显示指派新技工弹窗
        isArrival: false, //是否显示到达并开始作业
        isArrivalContent: '',
        isNoWait: false,
        isBindContent: '该回收订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单',
        isNoCancelContent:
          '该回收订单为随新机购买生成的订单，当前关联的购买订单已经发货，无法取消订单',
        radioValue: '',
        value: '',
        showCancelPopup: false, //取消订单 pop
        cancelOrderPopup: false,
        currentTab: 0,
        pageNo: 1,
        pageSize: 10,
        timer: null,
        isLowerRefresh: true, //是否触底刷新
        // 订单状态,查全部时传0,1待查验,2待接单,3待上门,4已完成,9超时订单
        currentOrderItem: {},
        radioList: [
          {
            name: '不想回收了',
            disabled: false,
          },
          {
            name: '计划有变,重新预约时间',
            disabled: false,
          },
          {
            name: '已经与集师傅协商一致，重新约定的安装时间',
            disabled: false,
          },
          {
            name: '其他',
            disabled: false,
          },
        ],
        tabsList: [
          {
            name: '全部',
            value: '0',
            index: 0,
          },
          {
            name: '超时订单',
            value: '9',
            index: 1,
          },
          {
            name: '待付款',
            value: '1',
            index: 2,
          },
          {
            name: '待查验',
            value: '2',
            index: 3,
          },
          {
            name: '待接单',
            value: '3',
            index: 4,
          },
          {
            name: '待上门',
            value: '4',
            index: 5,
          },
          {
            name: '已完成',
            value: '5',
            index: 6,
          },
        ],

        reOList: [],
        // statusList: [
        //   { status: 'all', desc: '全部' },
        //   { status: '3341', desc: '待上门-继续等待' },
        //   { status: '3320', desc: '待查验' },
        //   { status: '3330', desc: '待接单' },
        //   { status: '33403341', desc: '待上门' },
        //   { status: '3360', desc: '已完成' },
        // ],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,

        timePickerShow: false,
        orderStatus: '0',
        optionsOrigin: '',
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
      disabled() {
        if (this.radioValue && this.radioValue !== '其他') {
          return false
        } else if (this.radioValue == '其他' && this.value) {
          return false
        } else {
          return true
        }
      },
      // orderStatus() {
      //   let orderStatus = '0'
      //   this.tabsList.forEach((item) => {
      //     if (item.index == this.currentTab) {
      //       orderStatus = item.value
      //     }
      //   })
      //   return orderStatus
      // },
    },
    watch: {
      currentTab(newValue, oldValue) {
        this.reOList = []
        this.pageNo = 1
        this.isOverLoading=false
        this.debounceReq()
      },
    },

    onLoad(options) {
      // this.getOvertimeOrder()
      this.pageNo = 1
      //万能喊返回的数据
      this.optionsOrigin = options.origin || ''
      uni.$off('refresh')
      uni.$on('refresh', () => {
        this.reqListData(true)
      })
    },
    onShow() {
      if (this.optionsOrigin === 'voice') {
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        if (dataVoice.records && dataVoice.records.records && dataVoice.records.records.length) {
          console.log('dataVoice', dataVoice.records)
          this.reOList = dataVoice.records.records
          this.total = dataVoice.records.total
        } else {
          this.reqListData(true)
        }
      } else {
        this.reqListData(true)
      }
    },
    methods: {
      timePickerConfirm(data) {
        console.log(data)
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        // this.upTime = data.dateTime
        const timeArr = data.time.split('-')
        let params = {
          id: this.currentOrderItem.id,
          homeStartTime: data.date + ' ' + timeArr[0] + ':00',
          homeEndTime: data.date + ' ' + timeArr[1] + ':00',
        }
        this.timePickerShow = false
        this.$VoHttp
          .apiOrderRecycleUpdate(params)
          .then(() => {
            this.$u.toast('已提交申请，等待平台派单')
            this.pageNo = 1
            this.reqListData(true)
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
          orderStatus: '9',
        }
        this.$VoHttp.apiOrderRecycleRepairQueryPage(params).then((res) => {
          let overtimeOrderNum = res.data.total || 0
          console.log('overtimeOrderNum', overtimeOrderNum)
          if (overtimeOrderNum) {
            this.tabsList = [
              {
                name: '全部',
                value: '0',
                index: 0,
              },
              {
                name: '超时订单',
                value: '9',
                index: 1,
              },
              {
                name: '待付款',
                value: '1',
                index: 2,
              },
              {
                name: '待查验',
                value: '2',
                index: 3,
              },
              {
                name: '待接单',
                value: '3',
                index: 4,
              },
              {
                name: '待上门',
                value: '4',
                index: 5,
              },
              {
                name: '已完成',
                value: '5',
                index: 6,
              },
            ]
          }
        })
      },
      debounceReq() {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout((res) => {
          this.pageNo = 1
          this.reqListData(true)
          clearTimeout(this.timer)
          this.timer = null
        }, 500)
      },
      close() {},
      open() {},
      // tab切换检测
      changeTabs(e) {
        this.currentTab = e.index
        this.total = 0
        this.orderStatus = e.value
      },
      /**
       * tabs
       * @param item
       */

      changeSwiper(e) {
        this.currentTab = e.detail.current
        console.log(e, '======')
      },
      /**
       * 取消订单
       */
      cancleOrder() {
        this.isCancle = false
        this.cancelOrderPopup = true
      },
      /**
       * 显示取消订单弹窗
       */
      async showCancleOrder(val) {
        this.currentOrderItem = val
        try {
          const isBind = await this.$VoHttp.apiOrderRecycleCheckCancel({
            id: this.currentOrderItem.id,
            cancelReason: '不合适',
          })
          // 1：无关联销售订单,2：销售单为待付款、待发货（可取消）,3：销售单为待收货、已完成（不可取消）
          if (isBind.data.code == 1) {
            this.cancelOrderPopup = true
          } else if (isBind.data.code == 2) {
            this.isCancle = true
            this.isBindContent = isBind.data.message
          } else if (isBind.data.code == 3) {
            this.isNoCancel = true
            this.isNoCancelContent = isBind.data.message
          }
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      /**
       * 联系客服
       */
      showHelpPop() {
        // this.$refs.helpRef.open()
        goOnlineCustomerFn(2)
      },
      /**
       * 继续等待
       */
      async toContinue(val) {
        const res = await this.$VoHttp.apiOrderRecycleContinueWait({
          id: val.id,
        })
        if (res.success) {
          this.pageNo = 1
          this.reqListData(true)
        } else {
          uni.$u.toast(res.message)
        }
      },
      /**
       * 是否需要指派新技工
       */
      async assignMechanic() {
        try {
          const res = await this.$VoHttp.apiOrderRecycleNeedAssign({
            id: this.currentOrderItem.id,
          })
          if (res.success) {
            this.isAssign = false
            // this.getData(true)
            this.timePickerShow = true
            // this.pageNo = 1
            // this.reqListData(true)
            this.isAssign = false
          }
        } catch (e) {
          this.$u.toast(err.message || '操作失败')
        }
      },
      //   不需要指派
      async assignNotMechanic() {
        const res = await this.$VoHttp.apiOrderRecycleNotNeed({
          id: this.currentOrderItem.id,
        })
        if (res.success) {
          this.pageNo = 1
          this.reqListData(true)
          this.isAssign = false
        }
      },
      /**
       * 显示指派技工弹窗
       */
      showAssignMechanic(val) {
        console.log('showAssignMechanic', val)
        this.currentOrderItem = val
        if (val.supportSource == 2) {
          this.isNoWait = true
        } else {
          this.isAssign = true
        }
      },
      /**
       * ‘是’ 按约定时间到达
       */
      async hasArrved(val) {
        const res = await this.$VoHttp.apiOrderNoninductiveEvaluateSave({
          content: this.isArrivalContent,
          sourceType: this.currentOrderItem.supportSource,
          sourceId: this.currentOrderItem.id,
          status: val,
        })
        if (res.success) {
          this.isArrival = false
          this.$linkToEasy(
            '/pagesGarage/RecoveryOrder/SendEvaluation?id=' + this.currentOrderItem.id,
          )
        }
      },
      /**
       * 显示 是否按约定到达 弹窗
       */
      showArrived() {
        this.isArrival = true
      },
      cancelOrderClose() {
        this.cancelOrderPopup = false
      },
      // scrolltolower() {
      //   if (this.isLowerRefresh) {
      //     this.reqListData()
      //   }
      // },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.reqListData(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载')
        this.refresh = false
        if (this.reOList.length >= this.total) {
          this.noMore = true
          return false
        }
        this.noMore = false
        this.pageNo++
        this.reqListData()
        // uni.$u.throttle(() => {
        //
        // }, 2000)
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
      //   filterList(val) {
      //     if (val == '全部') {
      //       return this.reOList
      //     } else {
      //       return this.reOList.filter((item) => {
      //         if (val) {
      //           return item.statusEvent === val || item.statusEvent.indexOf(val) > -1
      //         } else {
      //           return item
      //         }
      //       })
      //     }
      //   },
      //   列表数据
      async reqListData(refresh) {
        // if (this.flag) return
        // if (this.total && this.reOList.length >= this.total) return
        helper.showLoading('加载中')
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.reOList = []
          this.isOverLoading=false
          this.pageNo = 1
        } else {
          if (this.isLoading) return
          this.isLoading = !this.isLoading
        }
        try {
          // this.flag = true
          const { code, data, message } = await this.$VoHttp.apiOrderRecycleRepairQueryPage({
            orderStatus: this.orderStatus,
            id: this.userInfo.companyId,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
          })
          this.isOverLoading=true
          this.total = data.total
          this.reOList = this.reOList.concat(data.records)
          console.log('this.reOList==', this.reOList)
          // if (this.pageNo == 1) {
          //   this.reOList = data.records
          //   if (this.total && this.reOList.length < this.total) {
          //     this.pageNo++
          //   }
          // } else if (this.total && this.reOList.length < data.total) {
          //   this.reOList.push(...data.records)
          //   this.pageNo++
          // }
        } catch (err) {
          this.$u.toast(err.message || '网络连接错误')
        }
        this.isLoading = false
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
      },
      async isNoWaitConfirm() {
        const res = await this.$VoHttp.apiOrderRecycleWaitingAssign({
          id: this.currentOrderItem.id,
        })
        console.log('res=============', res)
        if (res.success) {
          this.pageNo = 1
          this.reqListData(true)
          this.isNoWait = false
        }
      },
      radioChange(n) {
        this.radioValue = n
      },
      //   取消订单接口调用
      async confirmClick() {
        const res = await this.$VoHttp.apiOrderRecycleCancel({
          id: this.currentOrderItem.id,
          cancelReason: this.radioValue == '其他' ? this.value : this.radioValue,
        })
        if (res.code == 20001) {
          uni.$u.toast(res.message)
          this.pageNo = 1
          this.cancelOrderPopup = false
          this.value = ''
          this.radioValue = ''
          this.reqListData(true)
        }
      },
      async toEvaluate(val) {
        this.currentOrderItem = val
        const res = await this.$VoHttp.apiOrderNoninductiveEvaluateQuestion({
          id: val.id,
        })
        if (res.success) {
          this.isArrivalContent = res.data
          this.isArrival = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-head {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
    }
    &-tab {
      background-color: #ffffff;
      z-index: 2;
      border-bottom: 2rpx solid $v-bg-light;
    }
  }
  .order-scroll {
    height: 100%;
  }
  .slot-content {
    font-size: 32rpx;
    line-height: 1.5;
    color: $v-c0-85;
  }

  .order {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    &-cancel {
      padding: 20rpx 0;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      line-height: 150%;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-info {
      background-color: #fff;
      padding: 20rpx 32rpx;
      flex-grow: 1;
      margin-bottom: 24rpx;
      &__tips {
        font-size: 28rpx;
        color: $v-c0-45;
        padding: 28rpx 32rpx 24rpx;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      box-sizing: border-box;
      padding: 20rpx 0 72rpx 0;
      border-top: 2rpx solid $v-bg-light;
    }
    ::v-deep {
      .u-textarea {
        background-color: #f7f7f8;
        border: none;
      }
      .u-textarea__count {
        background-color: rgba(0, 0, 0, 0) !important;
        font-size: 28rpx;
      }
    }
  }
</style>
