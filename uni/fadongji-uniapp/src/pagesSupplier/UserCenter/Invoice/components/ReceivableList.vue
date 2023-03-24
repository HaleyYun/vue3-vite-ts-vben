<template>
  <scroll-view
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    class="flex1 list h-full overflow-y p-b-safe-area"
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
    <TopInfo :info="accountInfo" @show="show" showFilter />
    <view class="h16" />
    <block v-if="infoList.length > 0">
      <ReceivableItem v-for="item in infoList" :key="item.id" :dataObj="item" />
      <VoLoadingText :loading="loading" :has-more="infoList.length < total" />
    </block>
    <VoNoData v-if="!infoList.length && !refresh" />
  </scroll-view>
</template>

<script>
  import ReceivableItem from './ReceivableItem'
  import TopInfo from './TopInfo'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'ReceivableList',
    components: {
      ReceivableItem,
      TopInfo,
      VoLoadingText,
    },
    props: {
      timeRange: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        endTime: '',
        startTime: '',
        info: {},
        infoList: [],
        loadingStatus: false,
        refresh: false,
        triggered: false,
        scrollTop: 0,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        // 账款信息
        accountInfo: {
          leftAmount: 0,
          totalAmount: 0,
          actualAmount: 0,
          leftUnpaid: 0,
        },
      }
    },
    created() {
      // this.initList(true)
      this.getTopData()
    },
    methods: {
      // 获取顶部信息
      async getTopData(date) {
        console.log(date);
        let params = {}
        if (date) {
          const { startTime, endTime } = date
          params = {
            startDate: `${startTime} 00:00:00`,
            endDate: `${endTime} 23:59:59`,
          }
        }
        try {
          let { data } = await this.$VoHttp.apiOrderAccountPeriodReceivableStatistics(params)
          this.accountInfo = data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      show() {
        this.$emit('showFilter')
      },
      initList(refresh) {
        console.log(refresh);
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          // 10月28日李畅与王严蕊对接后增加过滤条件
          isRepayment: 0,
        }
        if (this.timeRange.startTime) {
          params.repaymentEndTime = `${this.timeRange.endTime} 23:59:59`
          params.repaymentStartTime = `${this.timeRange.startTime} 00:00:00`
        }
        showLoading()
        this.loading = true
        this.$VoHttp
          .apiOrderAccountPeriodReceivableList(params)
          .then((res) => {
            console.log(res);
            if (res.data.records) {
              let data = res.data.records.map((item) => {
                return {
                  checked: false,
                  showPoints: false,
                  ...item,
                }
              })
              console.log(data);
              this.total = res.data.total
              this.infoList.push(...data)
              console.log(this.infoList)
              this.$forceUpdate()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            hideLoading()
          })
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
          this.initList(true)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            // uni.$u.toast('已经到底了')
            return false
          }
          this.pageNo++
          this.initList()
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
  .list {
    width: 750rpx;
  }
</style>
