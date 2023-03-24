<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="history flex flex-column"
  >
    <VoNav is-fixed is-have-more title="申请记录" />
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="flex1"
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
      <view v-if="historyList.length > 0">
        <view v-for="(item, index) in historyList" :key="index">
          <view class="history-line" />
          <HistoryApplyForItem :history-item="item" @click.native="historyClick(item)" />
        </view>
        <VoLoadingText :loading="loading" :has-more="historyList.length < total" />
      </view>
      <VoNoData v-else-if="!historyList.length && !loading" no-data-tips="暂无申请记录" />
    </scroll-view>
  </view>
</template>

<script>
  import HistoryApplyForItem from './components/HistoryApplyForItem'

  export default {
    components: {
      HistoryApplyForItem,
    },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        modalVisible: false,
        cancelData: '',
        cancelIndex: '',
        historyList: [],
      }
    },
    onLoad() {
      if (this.userInfo.isAdmin === null) {
        console.log(this.userInfo.isAdmin)
      } else {
        this.getData(true)
      }
    },
    methods: {
      //获取列表数据
      getData(refresh) {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.historyList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp
          .apiCompanyCancellationPage(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.records
              this.total = res.data.total
              if (data && data.length > 0) {
                this.historyList = this.historyList.concat(data)
              }
            } else {
              this.historyList = []
              // uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err.message)
            // uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
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
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.historyList.length >= this.total) {
            uni.$u.toast('没有更多了')
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
      /**
       * 注销供应商详情
       */
      historyClick(data) {
        this.$linkToEasy('/pagesSupplier/Setting/LogoutSupplierDetail?data=' + JSON.stringify(data))
      },
    },
  }
</script>

<style lang="scss" scoped>
  .history {
    width: 750rpx;
    height: 100vh;

    &-line {
      height: 24rpx;
      background-color: #f8f8f8;
      width: 100%;
    }
  }
</style>
