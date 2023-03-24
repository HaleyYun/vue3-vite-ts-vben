<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="record"
  >
    <VoNav
      :left-width="240"
      :right-width="240"
      is-have-more
      place-bg-color="#f7f7f8"
      title="退货入库单"
    >
      <view slot="operation">
        <view class="record-button" @click="goOperation">操作记录</view>
      </view>
    </VoNav>
    <scroll-view
      class="flex1 overflow-y"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
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
      <view class="record-item">
        <ReturnGoodsItem
          v-for="(info, index) of recordList"
          :key="index"
          :record-list="info"
          @updateNum="updateNum"
        />
      </view>
      <VoLoadMore v-if="recordList.length" :show="noMore" />
      <VoNoData v-if="!recordList.length && !refresh && !loading" no-data-tips="暂无更多内容" />
    </scroll-view>

    <UpdateProNum :show.sync="showUpdate" />
  </view>
</template>

<script>
  import ReturnGoodsItem from './components/ReturnGoodsItem'
  import UpdateProNum from '@/pagesSupplier/Warehouse/WarehouseList/components/UpdateProNum'
  import helpUtil, { hideLoading, showLoading, throttle } from '@/common/helper'

  export default {
    name: 'WarehouseReturnReceipt',
    components: { ReturnGoodsItem, UpdateProNum },
    data() {
      return {
        showUpdate: false,
        triggered: false,
        filterVisible: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,
        recordList: [
          // {
          //   name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          //   type: 3,
          //   warehouse: '郑州仓',
          //   afterNumber: 300,
          //   operator: '李海',
          //   beforeNumber: 180,
          //   time: '2022-03-30 14:26',
          //   receiptList: [
          //     {
          //       type: 1,
          //       state: '商品入库-河北仓',
          //       time: '2022-03-23 14:26',
          //       annotation: '无法入库，商品码无法识别，无法入库，商品码无法识别',
          //     },
          //     {
          //       state: '商品出库-郑州仓',
          //       time: '2022-03-23 12:02',
          //     },
          //     {
          //       state: '补货申请',
          //       time: '2022-03-23 10:36',
          //     },
          //   ],
          // },
        ],
      }
    },
    onLoad() {
      this.getData(true)
    },
    methods: {
      /**
       * @description 操作记录
       */
      goOperation() {
        this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseOperationRecord')
      },
      /**
       * 修改数量
       */
      updateNum() {
        this.showUpdate = true
      },
      //获取列表数据
      getData(refresh) {
        showLoading()
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.recordList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp
          .apiWarehouseOperSupplierQuerySalesReturn(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              this.recordList = this.recordList.concat(data)
              if (this.recordList.length >= this.total) {
                this.noMore = true
              }
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
          .finally(() => {
            hideLoading()
            this.loading = false
          })
      },
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
        throttle(() => {
          console.log('底部加载')
          this.refresh = false
          console.log(this.recordList.length, this.total)
          if (this.recordList.length >= this.total) {
            this.noMore = true
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
      },
    },
  }
</script>

<style lang="scss" scoped>
  .record {
    width: 750rpx;
    height: 100vh;
    background-color: #f7f7f8;
    padding-top: 16rpx;
    box-sizing: border-box;
    &-button {
      width: 144rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      box-sizing: border-box;
      border: 2rpx solid #ffa98c;
      border-radius: 100rpx;
      font-size: 24rpx;
      color: #ff5319;
      margin-right: 24rpx;
    }
    &-item {
      background-color: #ffffff;
      position: sticky;
      &__title {
        background-color: #ffffff;
        width: 686rpx;
        height: 96rpx;
        margin: 0rpx auto 0rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
</style>
