<template>
  <view class="presell flex p-b-safe-area">
    <VoNav is-have-more title="选择商品" />
    <view class="head">
      <VoSearch
        v-model.trim="keyword"
        height="34"
        placeholder="请输入关键字搜索"
        @custom="change"
        @search="change"
      />
      <!--        <u-input-->
      <!--          v-model.trim="keyword"-->
      <!--          :customStyle="{ backgroundColor: '#F7F7F8', height: '100%' }"-->
      <!--          border="none"-->
      <!--          placeholder="请输入关键字搜索"-->
      <!--          placeholder-style=" fontSize: '26rpx'; color: #B9B9BA "-->
      <!--          shape="circle"-->
      <!--          @blur="change"-->
      <!--          ><block slot="prefix">-->
      <!--            <VoIcon class="p-l-20" color="#B9B9BA" name="search" />-->
      <!--          </block>-->
      <!--        </u-input>-->
      <!--      <view>-->
      <!--        <view class="fz-32">搜索</view>-->
      <!--      </view>-->
    </view>
    <view class="presell-tabs">
      <u-tabs
        :active-style="{ color: '#FF5319', 'font-weight': 500 }"
        :current="currentTab"
        :list="tabsList"
        :scrollable="true"
        itemStyle="padding:10rpx 40rpx;height:48rpx;padding-bottom:28rpx"
        lineColor="#FF5319"
        @change="changeTabs"
      />
    </view>
    <swiper :current="currentTab" class="swiper flex1" @change="changeCurrent">
      <swiper-item v-for="(i, key) in tabsList" :key="key">
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="goodDataList.length === 0 ? false : true"
          class="scroll"
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
          <block v-if="goodDataList.length">
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <view v-for="(item, index) in goodDataList" :key="index">
              <PresellGoodsItem
                :good-data="item"
                @selectGood="getGoods"
                @tapToNextPage="tapToNextPage"
              />
            </view>
            <VoLoadingText :has-more="goodDataList.length < total" :loading="loading" />
          </block>
          <VoNoData v-else-if="!goodDataList.length && !loading" no-data-tips="暂无更多内容" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import PresellGoodsItem from './components/PresellGoodsItem.vue'

  export default {
    components: {
      PresellGoodsItem,
    },
    data() {
      return {
        currentTab: 0,
        tabsList: [],
        goodDataList: [],
        keyword: '',
        //tab栏筛选数据 用于请求列表
        tabData: {},
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        status: null, //3：在售   4：待售
      }
    },
    onLoad() {
      this.getSaleGoodList()
    },
    methods: {
      changeTabs(e) {
        this.refresh = true
        this.currentTab = e.index
        this.status = e.index === 1 ? 4 : 3
        // this.initListFn('init')
      },
      changeCurrent(e) {
        this.currentTab = e.detail.current
        this.tabData = this.tabsList[this.currentTab]
        this.getSaleGoodList()
      },
      getGoods(val) {
        this.$linkToEasy(
          '/pagesRecovery/PresellActivity/PresellReleaseActivity?name=' +
            val.name +
            '&id=' +
            val.id +
            '&levelVOS=' +
            JSON.stringify(val.levelVOS) +
            '&sourceType=3',
        )
      },
      tapToNextPage(val) {
        this.$linkToEasy(
          '/pagesRecovery/PresellActivity/presellActivitySelectGoodsDetail?id=' + val.id,
        )
      },
      //搜索框
      change(value) {
        this.keyword = value
        this.refresh = true
        this.getSaleGoodList()
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getSaleGoodList()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.goodDataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getSaleGoodList()
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
      //预售商品列表请求
      getSaleGoodList() {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = this.refresh
        if (isfresh) {
          this.goodDataList = []
          this.pageNo = 1
        }
        let param = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          status: this.status,
        }
        param.keyword = this.keyword
        if (this.tabData.statisticCode) {
          param.status = this.tabData.statisticCode
        }
        this.$VoHttp
          .apiGoodsRecycleResaleForSaleList(param)
          .then((res) => {
            console.log('预售商品数据', res)
            this.processTabData(res.data.statistics)
            let resultData = res.data.pageResult.records
            this.total = res.data.pageResult.total
            this.goodDataList = this.goodDataList.concat(resultData)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = !this.loading
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预售商品失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.loading = !this.loading
          })
      },
      //处理顶部tab栏显示数据
      processTabData(data) {
        this.tabsList = [{ name: '全部', statisticCode: null }]
        data.forEach((item) => {
          if (item.statisticName) {
            let count = ''
            if (item.statisticCount && item.statisticCount > 0) {
              count = '(' + item.statisticCount + ')'
            }
            let name = item.statisticName + count
            let param = { name: name, statisticCode: item.statisticCode }
            this.tabsList.push(param)
          }
        })
        let count = +data[0].statisticCount + +data[1].statisticCount
        this.tabsList[0].name = `全部(${count})`
      },
    },
  }
</script>

<style lang="scss" scoped>
  .presell {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 0 32rpx;

      > :nth-child(1) {
        width: 600rpx;
        height: 88rpx;
        box-sizing: border-box;
        padding: 12rpx 0 12rpx 0;
      }

      > :nth-child(2) {
        height: 56rpx;
        text-align: center;
        line-height: 56rpx;
      }
    }

    &-tabs {
      background-color: #fff;
    }

    .scroll {
      height: 100%;
      overflow-y: scroll;
    }
    .no_more {
      width: 500rpx;
      height: 100rpx;
      margin: 48rpx auto;
    }
  }
</style>
