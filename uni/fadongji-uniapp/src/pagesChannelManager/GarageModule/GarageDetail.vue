<template>
  <view>
    <view class="garage flex flex-column">
      <VoNav is-fixed is-have-more title="修理厂详情" />
      <!-- 详情头部信息卡片 -->
      <ServiceInfo :info="baseInfo" />
      <u-sticky>
        <view class="tabBar">
          <EraTabs
            :current="current"
            :list="tabList"
            :scrollable="false"
            activeStyle="font-weight: bold;color: #FF5319;font-size: 16px;"
            class="garage-tab"
            inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 14px;"
            line-color="#FF5319"
            @click="changeTabFn"
          />
          <PaymentAmount
            v-if="current === 1 && baseInfo.bindStatus !== 0 && accountOrder.list.length"
            :info="accountOrder"
          />
        </view>
      </u-sticky>
      <scroll-view
        :refresher-enabled="false"
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        :scroll-y="true"
        class="detail flex1 overflow-y border-box"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
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
        <!-- 未认证 -->
        <block
          v-if="
            baseInfo.checkStatus === 0 || baseInfo.checkStatus === 3 || baseInfo.checkStatus === 5
          "
        >
          <!-- 基本信息: 未认证展示提示提交注册 -->
          <CompleteRegistration
            v-if="current === 0 && baseInfo.checkStatus === 0"
            :info="baseInfo"
          />
          <!-- 其余tab展示空状态 -->
          <VoNoData v-else :no-data-tips="['该修理厂未完成信息认证，', '暂无该模块数据']" />
          <!--          <VoSafetyArea :is-fixed="false" :opacity="0" />-->
        </block>
        <!-- 待审核 -->
        <block v-else-if="baseInfo.checkStatus === 2 || baseInfo.checkStatus === 1">
          <!--    待审核和已认证时的基本信息     -->
          <BasicInformation ref="basicInformationRef" v-if="current === 0" :information="baseInfo" @uploadImg="updateImg" />
          <!-- 其余tab展示空状态 -->
          <VoNoData v-else :no-data-tips="['该修理厂未完成信息认证，', '暂无该模块数据']" />
          <view
            v-if="current === 0 && baseInfo.checkStatus === 1 && baseInfo.isBindMobile"
            class="garage-bottom"
          >
            <!--          <view class="flex flex-vertical-c flex-justify-between">-->
            <!--            <view class="garage-bottom__button line" @click="showFail = true">审核不通过</view>-->
            <!--            <view class="garage-bottom__button fill" @click="pass">审核通过</view>-->
            <!--          </view>-->
            <view
              v-if="userInfo.roleCode === 'agent' && !baseInfo.downloadStatus"
              class="noAppTips"
            >
              请先联系修理厂下载并登录APP后，再进行审核
            </view>
            <view class="detail-bottom__button fill" @click="showProcess">审核通过</view>
            <view class="safearea-box bg-white" />
            <!--            <VoSafetyArea :is-fixed="false" :opacity="0" />-->
          </view>
        </block>
        <!-- 已认证 -->
        <block v-else-if="baseInfo.checkStatus === 4">
          <!-- 基本信息 -->
          <block v-if="current === 0">
            <!--    待审核和已认证时的基本信息     -->
            <BasicInformation :information="baseInfo" />
            <block v-if="userInfo.roleCode === 'agent'">
              <view class="garage-bottom">
                <EraButton circle text="代客下单" @click="goToBuy" />
                <view class="safearea-box bg-white"></view>
              </view>
              <!--              <view class="garage-bottom notFixed p-b-safe-area">-->
              <!--                <EraButton circle text="代客下单" @click="goToBuy" />-->
              <!--              </view>-->
            </block>
            <!--            <VoSafetyArea v-else :is-fixed="false" :opacity="0" />-->
            <!--    提交信息完成注册时      -->
            <!--    <CompleteRegistration></CompleteRegistration>      -->
          </block>
          <!-- 账款信息 -->
          <block v-if="current === 1">
            <block v-if="accountOrder.list.length">
              <AccountOrder :account-order="accountOrder.list" />
              <VoLoadingText :has-more="accountOrder.hasMore" :loading="accountOrder.loading" />
            </block>
            <VoNoData v-else />
            <!--            <VoSafetyArea :is-fixed="false" :opacity="0" />-->
          </block>

          <!-- 订单信息 -->
          <block v-if="current === 2">
            <block v-if="orderInfo.list.length">
              <OrderInformation :order-info="orderInfo.list" />
              <VoLoadingText
                :has-more="orderInfo.hasMore"
                :loading="orderInfo.loading"
                class="padding-bottom"
              />
            </block>
            <VoNoData v-else />
            <block v-if="userInfo.roleCode === 'agent'">
              <view class="garage-bottom">
                <EraButton circle text="代客下单" @click="goToBuy" />
                <view class="safearea-box bg-white"></view>
              </view>
              <!--              <view class="garage-bottom notFixed p-b-safe-area">-->
              <!--                <EraButton circle text="代客下单" @click="goToBuy" />-->
              <!--              </view>-->
            </block>
            <!--            <VoSafetyArea v-else :is-fixed="false" :opacity="0" />-->
          </block>
        </block>
      </scroll-view>
    </view>
<!--    <NotApprovedPopup v-if="showFail" @cancel="showFail = false" @sure="notPass" />-->
    <!--审核提示弹框-->
    <VoModal
      closeOnClickOverlay
      :show="processTip"
      confirmText="我知道了"
      content="请先联系修理厂下载并登录App后，再进行审核"
      @confirm="processTip = false"
      class="position-f"
    />
    <!--审核弹框-->
    <VoModal
      closeOnClickOverlay
      :show="process"
      :showCancelButton="true"
      cancelText="取消"
      confirmText="审核通过"
      :content="processContent"
      title="修理厂审核"
      @cancel="process = false"
      @confirm="pass"
      class="position-f"
    />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'
  import ServiceInfo from '../ServiceManager/components/ServiceInfo'
  import CompleteRegistration from './components/CompleteRegistration'
  import BasicInformation from './components/BasicInformation'
  import NotApprovedPopup from './components/NotApprovedPopup'
  import OrderInformation from './components/OrderInformation'
  import PaymentAmount from './components/PaymentAmount'
  import AccountOrder from './components/AccountOrder'

  export default {
    name: 'GarageDetail',
    components: {
      ServiceInfo,
      CompleteRegistration,
      BasicInformation,
      NotApprovedPopup,
      OrderInformation,
      PaymentAmount,
      AccountOrder,
    },
    data() {
      return {
        loading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        scrollTop: 0,
        current: 0,
        type: 3, // 3、渠道经理APP-修理厂详情，4、服务商拓客APP
        tabList: [
          {
            name: '基本信息',
          },
          {
            name: '账款信息',
          },
          {
            name: '订单信息',
          },
        ],
        // 基本信息
        baseInfo: {
          checkStatus: 4, //认证状态（0-未认证；1-通联审核中；2-待审核；3-通联审核失败；4-已认证；5-认证失败）
        },
        // 账款信息
        accountOrder: {
          list: [
            // {
            //   id: 1,
            //   number: 'ETL99883928392',
            //   repay: '部分还款',
            //   partOverdue: '部分逾期',
            //   individual: 3,
            //   piece: 100,
            //   time: '2021-01-01 12:00:00',
            //   // overdue: '已逾期',
            //   // unpaid: '未还款',
            // },
            // {
            //   id: 2,
            //   number: 'ETL99883928392',
            //   overdue: '已逾期',
            //   individual: 3,
            //   piece: 100,
            //   time: '2021-01-01 12:00:00',
            //   // unpaid: '未还款',
            // },
          ],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          hasMore: true,
          loading: false,
        },
        // 订单信息
        orderInfo: {
          // 订单列表
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          hasMore: true,
          loading: false,
        },
        showFail: true, // 审核不通过弹窗
        processTip: false, // 审核提示弹窗
        process: false, // 审核弹窗
        processContent: '审核弹窗内容',
        imgUrl: '',
      }
    },
    methods: {
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        console.log(this.scrollTop)
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          if (this.current === 1 && this.baseInfo.checkStatus === 4) {
            this.accountOrder.list = []
            this.accountOrder.pageNo = 1
            this.getAccountList()
          } else if (this.current === 2 && this.baseInfo.checkStatus === 4) {
            this.orderInfo.list = []
            this.orderInfo.pageNo = 1
            this.getOrderList()
          } else {
            this.getData()
          }
          setTimeout(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.current === 0) {
            return false
          } else if (this.current === 1 && this.baseInfo.checkStatus === 4) {
            if (this.accountOrder.list.length >= this.accountOrder.total) {
              // uni.$u.toast('没有更多了')
              return false
            }
            this.accountOrder.pageNo++
            this.getAccountList()
          } else if (this.current === 2 && this.baseInfo.checkStatus === 4) {
            if (this.orderInfo.list.length >= this.orderInfo.total) {
              // uni.$u.toast('没有更多了')
              return false
            }
            this.orderInfo.pageNo++
            console.log('this.orderInfo.pageNo', this.orderInfo.pageNo)
            this.getOrderList()
          }
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
      },
      // 代客下单
      goToBuy() {
        this.$storage.set('garageArea', this.baseInfo.areaCode)
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsList?companyId=${this.baseInfo.companyId}&salesArea=${this.baseInfo.areaCode}`,
        )
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.current = e.index
        if (e.index === 1 && this.baseInfo.checkStatus === 4) {
          this.accountOrder.list = []
          this.accountOrder.pageNo = 1
          this.getAccountList()
        } else if (e.index === 2 && this.baseInfo.checkStatus === 4) {
          this.orderInfo.list = []
          this.orderInfo.pageNo = 1
          this.getOrderList()
        }
      },
      updateImg(imgUrl) {
        this.imgUrl = imgUrl
      },
      showProcess() {
        if (!this.baseInfo.downloadStatus) {
          this.processTip = true
          return
        }
        this.processContent = '修理厂名称：' + this.baseInfo.storeName
        this.process = true
      },
      // 审核通过
      async pass() {
        showLoading()
        let params = {
          id: this.companyId,
          status: 4,
          storeUrl: this.$refs.basicInformationRef.getImgFn() || null,
        }




        try {
          let data
          if (this.userInfo.roleCode === 'agent') {
            data = await this.$VoHttp.apiCompanyInfoGarageAudit(params)
          } else {
            data = await this.$VoHttp.apiCompanyInfoAudit(params)
          }
          if (!data || !data.data) {
            this.process = false
            hideLoading()
            return;
          }
          this.$toast('操作成功', 'success', '/static/icons/success_icon.png')
          await this.getBaseData()
          // this.showFail = false
          this.process = false
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      // 审核不通过
      async notPass(result) {
        showLoading()
        let params = {
          id: this.companyId,
          status: 5,
          result,
        }
        try {
          const data = await this.$VoHttp.apiCompanyInfoAudit(params)
          if (!data || !data.data) return
          this.$toast('操作成功', 'success', '/static/icons/success_icon.png')
          await this.getBaseData()
          this.showFail = false
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      /**
       * 获取基本信息数据
       */
      async getBaseData() {
        showLoading()
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageInfo({
            inviterId: this.inviterId,
            companyId: this.companyId,
          })
          if (!data || !data.data) return
          if (+data.code === 20001) {
            console.log(data)
            this.baseInfo = data.data
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      /**
       * 获取账款列表
       */
      async getAccountList() {
        if (this.accountOrder.loading) return
        this.accountOrder.loading = true
        try {
          let param = {
            buyerId: this.companyId,
            pageNo: this.accountOrder.pageNo,
            pageSize: this.accountOrder.pageSize,
            // selectFromClient: +this.type,
          }
          const data = await this.$VoHttp.apiAccountperiodList(param)
          if (!data || !data.data) return
          console.log(data)
          this.accountOrder.list.push(...data.data.accountPeriodListSubOrderVO.records)
          const {
            cumulativePaymentAmount,
            cashPaymentAmount,
            repayAmount,
            notRepayAmount,
            overduePayment,
          } = data.data
          this.accountOrder.cumulativePaymentAmount = cumulativePaymentAmount
          this.accountOrder.cashPaymentAmount = cashPaymentAmount
          this.accountOrder.repayAmount = repayAmount
          this.accountOrder.notRepayAmount = notRepayAmount
          this.accountOrder.overduePayment = overduePayment
          this.accountOrder.total = data.data.accountPeriodListSubOrderVO.total
          this.accountOrder.hasMore = this.accountOrder.list.length < this.accountOrder.total
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.accountOrder.loading = false
      },
      /**
       * 获取订单信息列表
       * @returns {Promise<void>}
       */
      async getOrderList() {
        if (this.orderInfo.loading) return
        this.orderInfo.loading = true
        showLoading()
        console.log('22222222222222')
        try {
          let param = {
            buyerId: this.companyId,
            pageNo: this.orderInfo.pageNo,
            pageSize: this.orderInfo.pageSize,
          }
          const data = await this.$VoHttp.apiOrderSellQueryListGarage(param)
          if (!data || !data.data) return
          if (+data.code === 20001) {
            this.orderInfo.list.push(...data.data.records)
            this.orderInfo.total = data.data.total
            this.orderInfo.hasMore = this.orderInfo.list.length < data.data.total
            console.log('this.orderInfo.total', this.orderInfo.total)
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        this.orderInfo.loading = false
      },
      async init() {
        await this.getBaseData()
        // await this.getOrderList()
        // await this.getAccountList()
      },
    },
    onLoad(options) {
      const { companyId, inviterId } = options
      this.inviterId = inviterId
      this.companyId = companyId
      this.init()
      if (options.type) {
        this.type = +options.type
      }
    },
  }
</script>

<style lang="scss" scoped>
  .position-f {
    position: fixed;
  }
  .garage {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    &-view4 {
      position: relative;
      z-index: 5;
    }
    &-view5 {
      position: fixed;
      z-index: 999;
    }
    &-map {
      margin-right: 32rpx;
      font-size: 28rpx;
      color: $v-c0-65;
      line-height: 42rpx;
    }
    &-tab {
      background-color: #ffffff;
      z-index: 2;
    }
    &-swiper {
      height: 100%;
    }
    &-bottom {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff !important;
      &.notFixed {
        position: relative;
        z-index: -1;
      }
      &__button {
        //width: 320rpx;
        width: 100%;
        //height: 88rpx;
        text-align: center;
        line-height: 88rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
        &.line {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
        &.fill {
          background: #ff5319;
          border: 2rpx solid #ff5319;
          color: #fff;
        }
      }
    }
  }
  .detail {
    width: 750rpx;
    //height: 100vh;
    background-color: #f7f7f8;
    ::v-deep .uni-scroll-view-content {
      display: flex;
      flex-direction: column;
    }
    .content {
      width: 100vw;
      height: 100%;
    }
    &-bottom {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__button {
        //width: 320rpx;
        width: 100%;
        height: 88rpx;
        text-align: center;
        line-height: 88rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
        &.line {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
        &.fill {
          background: #ff5319;
          border: 2rpx solid #ff5319;
          color: #fff;
        }
      }
    }
    .btnBar {
      width: 750rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      .bottom-button {
        width: 320rpx;
        height: 88rpx;
        text-align: center;
        line-height: 88rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
        &.line {
          border: 2rpx solid #ff5319;
          color: #ff5319;
        }
        &.fill {
          background: #ff5319;
          border: 2rpx solid #ff5319;
          color: #fff;
        }
      }
    }
  }
  .padding-bottom {
    padding-bottom: 120rpx;
  }
  .bg-white {
    background-color: #ffffff !important;
  }
  .noAppTips {
    width: 100vw;
    margin-left: -32rpx;
    font-size: 24rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    color: #F20014;
    background: #FEECEE;
    margin-top: -20rpx;
    border: 1rpx solid transparent;
    box-sizing: border-box;
    margin-bottom: 24rpx;
  }
</style>
