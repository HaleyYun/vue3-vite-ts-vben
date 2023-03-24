<template>
  <scroll-view
    class="workbench"
    scroll-top="0"
    :refresher-enabled="!isMore"
    :refresher-triggered="triggered"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    scroll-y
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scrolltolower="scrolltolower"
  >
    <VoListFresh :show="loadingStatus" />
    <view class="commoditiesList">
      <view class="title">商品人气榜</view>
      <view class="flex selectList">
        <view
          v-for="(item, index) of selectList"
          :key="index"
          class="selectBlock"
          :class="selectCurrent == item.value ? 'selectBlockA' : ''"
          @click="timeChange(item.value)"
          >{{ item.label }}</view
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
          :dataList="item"
          :key="index + 'statistical'"
        >
          <view slot="ranking">{{ index + 1 }}</view>
          <view slot="views" v-if="selectCurrent == 'collection'">
            {{ item.num }}
          </view>
          <view slot="dayBefore" v-if="selectCurrent == 'collection'">
            {{ item.beforeNum }}
          </view>
        </vo-statistical-list>
        <VoLoadingText v-if="!isMore" :loading="loading" :has-more="dataList.length < total" />
        <view class="more" v-if="isMore && total > 5" @click="more()">
          查看更多 &nbsp;&nbsp;&nbsp;
          <u-icon name="arrow-down" color="rgba(0, 0, 0, 0.45)" size="12" />
        </view>
      </view>
      <view v-if="!loading && dataList.length == 0" class="p-20">
        <view class="p-b-70">
          <VoNoData paddingTop="0" no-data-tips="暂无数据" />
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import VoStatisticalList from '../../VoStatisticalList/VoStatisticalList'
  export default {
    name: 'CommoditiesList',
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
      selectOptions: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        loading: false,
        selectCurrent: 'scan',
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        selectList: [
          { label: '浏览量', value: 'scan' },
          { label: '访客数', value: 'visit' },
          { label: '收藏人数', value: 'collection' },
          { label: '分享人数', value: 'share' },
        ],
        headList: [
          { label: '排行', value: 1 },
          { label: '商品信息', value: 2 },
          { label: '浏览量', value: 3 },
          { label: '前一天', value: 4 },
        ],
        pages: {
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        dataList: [],
      }
    },
    watch: {
      timeParams: {
        deep: true,
        handler(newVal) {
          this.pages.pageNo = 1
          this.dataList = []
          if (newVal.timeType == 2) {
            this.headList[this.headList.length - 1]['label'] = '上一周'
          } else if (newVal.timeType == 3) {
            this.headList[this.headList.length - 1]['label'] = '上一月'
          } else if (newVal.timeType == 4) {
            this.headList[this.headList.length - 1]['label'] = '同周期'
          } else {
            this.headList[this.headList.length - 1]['label'] = '前一天'
          }
          this.initData()
        },
      },
      selectOptions: {
        // deep: true,
        // immediate: true,
        handler(newVal) {
          console.log(newVal)
          if (newVal) {
            this.timeChange(newVal)
          }
        },
      },
    },
    mounted() {
      // this.initData()
    },
    methods: {
      timeChange(index) {
        this.selectCurrent = index
        this.pages.pageNo = 1
        let label = '浏览量'
        switch (this.selectCurrent) {
          case 'scan':
            label = '浏览量'
            break
          case 'visit':
            label = '访客数'
            break
          case 'collection':
            label = '收藏人数'
            break
          case 'share':
            label = '分享人数'
            break
        }
        this.headList[this.headList.length - 2]['label'] = label

        this.dataList = []
        this.initData()
      },
      initData() {
        if (this.selectCurrent == 'collection') {
          this.goodsCollectionSorted()
        } else {
          this.getData()
        }
      },

      async getData() {
        try {
          let isfresh = this.refresh
          if (isfresh) {
            this.dataList = []
            this.pages.pageNo = 1
          }
          this.loading = true
          let time = ['day', 'week', 'month', 'day']
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
            dateType: time[this.timeParams.timeType - 1], // 统计周期类型 天:day 周:week 月:month
            visitType: this.selectCurrent,
            ...this.pages,
          }
          const { code, data } = await this.$VoHttp.GOODS.apiGoodsVisitRecordQuery(params)
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
      async goodsCollectionSorted() {
        try {
          this.loading = true
          let isfresh = this.refresh
          if (isfresh) {
            this.dataList = []
            this.pages.pageNo = 1
          }
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
            type: this.timeParams.timeType, // 查询类型，1：天，2：周，3：月，4：自定义
            ...this.pages,
          }
          const { code, data } = await this.$VoHttp.GOODS.apiGoodsCollectionGoodsCollectionSorted(
            params,
          )
          if (code == '20001') {
            if (this.isMore) {
              this.dataList = data.records.slice(0, 5)
            } else {
              this.dataList = this.dataList.concat(data.records ? data.records : [])
            }
            this.total = data.total
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
          this.loadingStatus = false
          this.triggered = false
          this.refresh = false
        }
      },
      more() {
        this.$linkToEasy(
          `/pagesAgent/Statisticals/CommodityPopularityList?selectCurrent=${this.selectCurrent}`,
        )
        //
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
          this.initData()
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
    min-height: 448rpx;
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
  ::v-deep .page-img {
    padding-top: 0;
  }
  .p-20 {
    padding-bottom: 40rpx;
  }
</style>
