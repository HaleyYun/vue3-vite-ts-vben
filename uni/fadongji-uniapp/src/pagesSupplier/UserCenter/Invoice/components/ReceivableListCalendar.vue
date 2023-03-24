<template>
  <scroll-view
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    class="flex1 calendar list h-full overflow-y"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    refresher-enabled="true"
    scroll-top="0"
    scroll-y="true"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scroll="onScroll"
    @scrolltolower="scrolltolower"
  >
    <!-- 下拉刷新组件 -->
    <VoListFresh :show="loadingStatus" />
    <view class="h16" />
    <TopInfo :info="accountInfo" />
    <view class="h16" />
    <view class="calendar-container">
      <VoCalendar
        :insert="true"
        :lunar="false"
        :selected="dates"
        :showMonth="false"
        @change="dateChange"
        @monthSwitch="monthSwitch"
        @yearSwitch="yearSwitch"
      />
    </view>
    <view class="h16" />
    <EraTabs
      :active-style="{ color: '#FF5319', fontWeight: 500 }"
      :current="curTab"
      :list="tabsList"
      :scrollable="false"
      class="tabs bg-white"
      line-color="#FF5319"
      @click="tabsChange"
    />
    <view class="h4" />
    <block v-if="list.length > 0">
      <ReceivableItem v-for="(item, index) in list" :key="index" :data-obj="item" />
      <VoLoadingText :has-more="list.length < total" :loading="loading" />
    </block>
    <VoNoData v-if="!list.length && !refresh" />
  </scroll-view>
  <!--  <view class="calendar">-->

  <!--    <VoSafetyArea />-->

  <!--    <view class="calendar-item flex flex-justify-between flex-vertical-c" @click="receivedClick">-->
  <!--      <view class="flex flex-vertical-c">-->
  <!--        <view class="calendar-item__green" />-->
  <!--        <view class="calendar-item__black fz-28">已收-应收账款</view>-->
  <!--      </view>-->
  <!--      <view class="calendar-item__right flex flex-vertical-c fz-24">-->
  <!--        <view v-if="receivedBool">展开</view>-->
  <!--        <view v-else>收起</view>-->
  <!--        <VoIcon v-if="receivedBool" name="arrow-top-line" :size="16" />-->
  <!--        <VoIcon v-else name="arrow-bottom-line" :size="16" />-->
  <!--      </view>-->
  <!--    </view>-->
  <!--    <ReceivableItem v-if="receivedBool" v-for="item in 6" :key="item" />-->

  <!--    <view class="h16" />-->
  <!--    <view class="calendar-item flex flex-justify-between flex-vertical-c" @click="noReceivedClick">-->
  <!--      <view class="flex flex-vertical-c">-->
  <!--        <view class="calendar-item__red" />-->
  <!--        <view class="calendar-item__black fz-28">未收-应收账款</view>-->
  <!--      </view>-->
  <!--      <view class="calendar-item__right flex flex-vertical-c fz-24">-->
  <!--        <view v-if="noReceiveBool">展开</view>-->
  <!--        <view v-else>收起</view>-->
  <!--        <VoIcon v-if="noReceiveBool" name="arrow-top-line" :size="16" />-->
  <!--        <VoIcon v-else name="arrow-bottom-line" :size="16" />-->
  <!--      </view>-->
  <!--    </view>-->
  <!--    <ReceivableItem v-if="noReceiveBool" v-for="(item, index) in 6" :key="index" />-->
  <!--  </view>-->
</template>

<script>
  import ReceivableItem from './ReceivableItem'
  import TopInfo from './TopInfo'
  import VoCalendar from '@/components/VoCalendar/components/VoCalendar/VoCalendar'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'ReceivableListCalendar',
    components: {
      ReceivableItem,
      VoCalendar,
      TopInfo,
      VoLoadingText,
    },
    data() {
      return {
        loadingStatus: false,
        refresh: false,
        triggered: false,
        loading: false,
        scrollTop: 0,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        // receivedBool: false,
        // noReceiveBool: false,
        tabsList: [
          { key: '1', name: '已收' },
          { key: '0', name: '未收' },
        ],
        curTab: 0,
        dates: [
          // { date: '2022-09-20' },
          // { date: '2022-09-30' }
        ],
        date: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        list: [],
        // 账款信息
        accountInfo: {
          leftAmount: 0,
          totalAmount: 0,
          actualAmount: 0,
          leftUnpaid: 0,
        },
        noAcceptData: [],
        totalAmount: '', // 应收/应付总额
        repayStatus: '', // 还款状态 0:未还款 1：已还款 2:已逾期 3:部分还款
      }
    },
    async created() {
      await this.getTopData()
      await this.getCalendar()
    },
    methods: {
      // 获取顶部信息
      async getTopData(date) {
        let params = {}
        if (date) {
          params = {
            startDate: `${this.date} 00:00:00`,
            endDate: `${this.date} 23:59:59`,
          }
        }
        try {
          let { data } = await this.$VoHttp.apiOrderAccountPeriodReceivableStatistics(params)
          this.accountInfo = data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      /**
       * 获取日历展示信息
       * @returns {Promise<void>}
       */
      async getCalendar() {
        const month = this.date.split('-')[1]
        const year = this.date.split('-')[0]
        this.dates = []
        try {
          const { data } = await this.$VoHttp.apiOrderAccountPeriodQueryReceivableCalendar({
            year,
            month,
          })
          this.dates = data.map((item) => {
            item.date = year + '-' + month + '-' + item.day
            return item
          })
          console.log('this.dates', this.dates)
          await this.getData(true)
        } catch (e) {
          this.$u.toast(e.message || '请检查网络')
        }
      },
      //判断已收未收
      async getNoAcceptData() {
        //若所选日期的【已收】和【应收】两个页签同时有数据，则默认显示【已收】页签
        //若所选日期的【已收】和【应收】仅其中一个页签有数据，则默认显示有数据的那个页签页面
        console.log(this.repayStatus)
        let params = {
          pageNo: 1,
          pageSize: 1,
          isRepayment: this.repayStatus === 1 ? 1 : 0,
          repaymentStartTime: `${this.date} 00:00:00`,
          repaymentEndTime: `${this.date} 23:59:59`,
        }
        try {
          const { data } = await this.$VoHttp.apiOrderAccountPeriodReceivableList(params)
          // console.log(data)
          if (this.repayStatus === 1) {
            this.curTab = 0
          } else if (this.repayStatus === 2) {
            this.curTab = 1
          }
          this.list = data.records
          // this.noAcceptData = data.records || this.repayStatus
          // if (+this.noAcceptData === 1) {
          //   this.curTab = 0
          // } else {
          //   this.curTab = 1
          // }
          // let dataAcc = await this.$VoHttp.apiOrderAccountPeriodReceivableList({
          //   isRepayment: 1,
          //   ...params,
          // })
          // let list = dataAcc.data.records || []
          // if ((!list || !list.length) && this.noAcceptData && this.noAcceptData.length) {
          //   this.curTab = 1
          // } else {
          //   this.curTab = 0
          // }
          // await this.getData(true)
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '请检查网络')
        }
      },
      /**
       * 获取数据
       * @param refresh
       */
      async getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.list = []
          this.pageNo = 1
        } else {
          this.loading = true
          showLoading()
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          isRepayment: +this.tabsList[this.curTab].key,
          repaymentStartTime: `${this.date} 00:00:00`,
          repaymentEndTime: `${this.date} 23:59:59`,
        }
        try {
          const { data } = await this.$VoHttp.apiOrderAccountPeriodReceivableList(params)
          console.log(data)
          if (data.records && data.records.length > 0) {
            let arr = data.records.map((item) => {
              return {
                checked: false,
                showPoints: false,
                ...item,
              }
            })
            this.total = data.total
            this.list.push(...arr)
          }
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '请检查网络')
        }
        hideLoading()
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
        this.loading = false
      },
      /**
       * 状态筛选
       * @param e
       */
      tabsChange(e) {
        console.log(e)
        if (this.curTab === e.index) return
        this.total = 0
        this.pageNo = 1
        this.list = []
        this.curTab = e.index
        if (this.totalAmount) {
          this.getData()
        }
      },
      receivedClick() {
        this.receivedBool = !this.receivedBool
      },
      noReceivedClick() {
        this.noReceiveBool = !this.noReceiveBool
      },
      //日历选择
      async dateChange(e) {
        this.list = []
        console.log(this.dates)
        let data = this.dates.filter((item) => item.day === e.date)
        console.log(data)
        this.date = e.fulldate
        console.log(e, 'eeeeeeeee')
        this.totalAmount = e.extraInfo.totalAmount
        if (this.totalAmount) {
          this.repayStatus = e.extraInfo.repayStatus
          await this.getNoAcceptData()
        }
        // await this.getData(true)
      },
      monthSwitch(e) {
        // console.log(e)
        this.date = e.date
        this.getCalendar(true)
      },
      yearSwitch(e) {
        // console.log(e)
        this.date = e.date
        this.getCalendar(true)
      },

      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
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
          this.getData(true)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.list.length >= this.total) {
            // uni.$u.toast('已经到底了')
            return false
          }
          this.pageNo++
          this.getData()
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
    },
  }
</script>

<style lang="scss" scoped>
  .calendar {
    &-top {
      background-color: #ffffff;
      padding: 32rpx;
      width: 686rpx;
      &__gay {
        color: $v-c0-65;
      }
      &__gay65 {
        color: $v-c0-65;
      }
      &__red {
        color: $color-primary-red;
      }
      &__gay45 {
        color: $v-c0-45;
      }
    }
    &-item {
      height: 96rpx;
      line-height: 96rpx;
      padding: 0rpx 32rpx;
      width: 686rpx;
      background-color: #ffffff;
      &__black {
        color: $v-c0-85;
      }
      &__green {
        width: 24rpx;
        height: 24rpx;
        border-radius: 12rpx;
        background-color: $v-success-light-one;
        margin-right: 16rpx;
      }
      &__right {
        color: $v-c0-45;
      }
      &__red {
        width: 24rpx;
        height: 24rpx;
        border-radius: 12rpx;
        background-color: $color-primary-red;
        margin-right: 16rpx;
      }
    }
    .calendar-container {
      width: 750rpx;
    }
  }
</style>
