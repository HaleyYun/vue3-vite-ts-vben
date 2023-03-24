<template>
  <scroll-view
    class="workbench"
    scroll-top="0"
    :refresher-enabled="!isMore"
    :refresher-triggered="triggered"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    scroll-y="true"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scrolltolower="scrolltolower"
  >
    <VoListFresh :show="loadingStatus" />
    <view class="commoditiesList">
      <view class="title">支付明细</view>
      <view class="card-head">
        <view v-for="(item, index) of headList" :key="index" :class="'card-Item' + (index + 1)">{{
          item.label
        }}</view>
      </view>
      <view v-if="dataList.length > 0">
        <vo-statistical-list
          v-for="(item, index) of dataList"
          :dataList="item"
          :key="index + 'statistical'"
        >
          <view slot="views">
            {{ item.submitNum }}
          </view>
          <view slot="dayBefore">
            {{ item.paymentNum }}
          </view>
        </vo-statistical-list>
        <VoLoadingText v-if="!isMore" :loading="loading" :has-more="dataList.length < total" />
        <view class="more" v-if="isMore && total > 5" @click="more()">
          查看更多 &nbsp;&nbsp;&nbsp;
          <u-icon name="arrow-down" color="rgba(0, 0, 0, 0.45)" size="12" />
        </view>
      </view>
      <view v-if="!loading && dataList.length == 0" class="p-20">
        <VoNoData no-data-tips="暂无数据" />
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import VoStatisticalList from '../../VoStatisticalList/VoStatisticalList'
  export default {
    name: 'PaymentDetailsList',
    components: { VoStatisticalList },
    props: {
      isMore: {
        type: Boolean,
        default: true,
      },
      timeParams: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        loading: false,
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pages: {
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        headList: [
          { label: '排行', value: 1 },
          { label: '商品信息', value: 2 },
          { label: '提交量', value: 3 },
          { label: '支付量', value: 4 },
        ],
        dataList: [],
      }
    },
    watch: {
      timeParams: {
        deep: true,
        handler(newVal) {
          this.pages.pageNo = 1
          this.dataList = []
          this.getData()
        },
      },
    },
    mounted() {
      this.getData()
    },
    methods: {
      async getData() {
        try {
          let isfresh = this.refresh
          if (isfresh) {
            this.dataList = []
            this.pages.pageNo = 1
          }
          this.loading = true
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
            dateType: this.timeParams.timeType == 4 ? 1 : this.timeParams.timeType, // 统计周期类型 天:day 周:week 月:month
            ...this.pages,
          }
          const { code, data } = await this.$VoHttp.apiOrderStatisticsOrderPaymentDetail(params)
          if (code == '20001') {
            if (this.isMore) {
              this.dataList = data.records.slice(0, 5)
            } else {
              this.dataList = this.dataList.concat(data.records ? data.records : [])
            }
            this.total = data.total
          }
          this.loading = false
        } catch (e) {
          console.log(e)
          this.loading = false
        } finally {
          this.loading = false
          this.loadingStatus = false
          this.triggered = false
          this.refresh = false
        }
      },
      more() {
        this.$linkToEasy(`/pagesAgent/Statisticals/PaymentDetails`)
      },

      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新', this.scrollTop)
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
          if (this.dataList.length >= this.total) {
            // uni.$u.toast('已经到底了')
            return false
          }
          this.pages.pageNo++
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
    },
  }
</script>

<style scoped lang="scss">
  .commoditiesList {
    background: #fff;
    overflow: auto;
    margin-top: 16rpx;
    .title {
      font-size: 32rpx;
      padding: 24rpx 32rpx 8rpx 32rpx;
    }
    .selectList {
      padding: 16rpx 32rpx;
    }
  }
  .card-head {
    font-style: normal;
    font-weight: 400;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    border-bottom: 2rpx solid #f7f7f8;
    border-top: 2rpx solid #f7f7f8;
    display: flex;
    padding: 22rpx 20rpx 24rpx 20rpx;
    .card-Item1 {
      width: 60rpx;
    }
    .card-Item2 {
      width: 426rpx;
      text-align: center;
    }
    .card-Item3 {
      width: 124rpx;
    }
    .card-Item4 {
      width: 124rpx;
    }
  }

  .selectBlock {
    width: 144rpx;
    height: 64rpx;
    text-align: center;
    background: #f6f7f8;
    border-radius: 32rpx;
    margin-right: 40rpx;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 2.5;
    border: 2rpx solid #f6f7f8;

    color: rgba(0, 0, 0, 0.85);
  }
  .selectBlockA {
    background: #ffece5;
    border: 2rpx solid #ff6633;
    border-radius: 32rpx;
    color: #ff5319;
  }
  .more {
    font-size: 24rpx;
    display: flex;
    text-align: center;
    padding: 24rpx;
    color: rgba(0, 0, 0, 0.45);
    align-items: center;
    justify-content: center;
  }
  ::v-deep .page-img {
    padding-top: 0;
  }
  .p-20 {
    padding-bottom: 40rpx;
  }
</style>
