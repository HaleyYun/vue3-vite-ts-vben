<template>
  <scroll-view
    :refresher-enabled="!isMore"
    :refresher-triggered="triggered"
    class="workbench h-full"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    scroll-top="0"
    scroll-y="true"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scrolltolower="scrolltolower"
  >
    <VoListFresh :show="loadingStatus" />
    <view class="statistical-card">
      <view v-for="(item, index) of totalList" :key="index + 'total'" class="totalList">
        <view class="count">{{ item.value }}</view>
        <view class="label">{{ item.label }}</view>
      </view>
    </view>
    <view class="commoditiesList h-full">
      <view class="title">成交客户排行</view>
      <view class="flex selectList">
        <view
          v-for="(item, index) of selectList"
          :key="index"
          :class="selectCurrent == index ? 'selectBlockA' : ''"
          class="selectBlock"
          @click="timeChange(index)"
          >{{ item }}</view
        >
      </view>
      <view class="card-head">
        <view v-for="(item, index) of headList" :key="index" :class="'card-Item' + (index + 1)">{{
          item.label
        }}</view>
      </view>
      <view v-if="dataList.length > 0">
        <vo-statistical-list
          v-for="(item, index) of dataList"
          :key="index + 'statistical'"
          :dataList="item"
          :type="6"
        >
          <view slot="ranking">
            {{ index + 1 }}
          </view>
          <view slot="salesVolume">
            {{ item.salesAmount }}
          </view>
          <view slot="sales">
            {{ item.salesRatio }}
          </view>
        </vo-statistical-list>
        <VoLoadingText :has-more="dataList.length < total" :loading="loading" />
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
    name: 'CustomerClinchRanking',
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
        selectCurrent: 0,
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        totalList: [
          { label: '成交数', value: 0 },
          { label: '新客户数', value: 0 },
          { label: '复购数', value: 0 },
        ],
        selectList: ['综合排名', '新客户', '复购排名'],
        headList: [
          { label: '排行', value: 1 },
          { label: '客户名称', value: 2 },
          { label: '成交金额(元)', value: 3 },
          { label: '占比', value: 4 },
        ],
        dataList: [],
        pages: {
          pageNo: 1,
          pageSize: 10,
        },
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
      this.getOrderStatistic()
      this.getData()
    },
    methods: {
      timeChange(index) {
        this.selectCurrent = index
        this.pages.pageNo = 1
        this.dataList = []
        this.getData()
      },
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
            type: this.selectCurrent + 1, // 客户统计排名类型, 1：综合排名,2：新客户,3：复购排名
            ...this.pages,
          }
          const { code, data } = await this.$VoHttp.apiOrderStatisticsCustomerOrderRanking(params)
          if (code == '20001') {
            this.dataList = this.dataList.concat(data.records ? data.records : [])
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

      // 获取仓库详情
      async getOrderStatistic() {
        try {
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
          }
          const { code, data } = await this.$VoHttp.apiOrderStatisticsCustomerOrderStatistic(params)
          if (code == '20001') {
            this.totalList = [
              { label: '成交数', value: data.purchaseNum },
              { label: '新客户数', value: data.firstPurchaseNum },
              { label: '复购数', value: data.repurchaseNum },
            ]
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
      width: 358rpx;
      text-align: center;
    }
    .card-Item3 {
      width: 162rpx;
      text-align: center;
    }
    .card-Item4 {
      width: 144rpx;
      text-align: center;
    }
  }

  .selectBlock {
    min-width: 144rpx;
    height: 56rpx;
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
  .statistical-card {
    margin: 16rpx 0;
    padding: 32rpx;
    display: flex;
    justify-content: center;
    background: #fff;
    .totalList {
      flex: 1;
      text-align: center;
      .count {
        font-size: 40rpx;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 8rpx;
        .unit {
          font-size: 24rpx;
        }
      }
      .label {
        font-size: 24rpx;
        line-height: 150%;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .mb-70px {
    margin-bottom: 140rpx;
  }
  ::v-deep .page-img {
    padding-top: 0;
  }
</style>
