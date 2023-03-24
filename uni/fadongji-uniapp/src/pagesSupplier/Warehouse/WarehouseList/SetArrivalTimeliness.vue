<template>
  <view class="arrival flex flex-column">
    <VoNav is-fixed is-have-more title="设置到货时效">

    </VoNav>
    <view class="arrival-search flex flex-vertical-c">
      <VoSearch
        v-model="keyword"
        height="34"
        @custom="initFn(true)"
        @search="initFn(true)"
        placeholder="请输入搜索"
      />
    </view>
    <scroll-view
      v-if="arrivalList.length > 0"
      class="arrival-content flex1"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="arrivalList.length === 0 ? false : true"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <view v-for="(info, infoIndex) of arrivalList" :key="infoIndex" class="arrival-content__list">
        <view class="flex flex-vertical-c">
          <text class="list-address">{{ info.wareHouseName }}</text>
          <view class="list-inline">
            <view class="list-inline__to">到</view>
            <image class="list-inline__img" src="/static/created/product/stroke.png" />
          </view>
          <text class="list-address">{{ info.areaName }}</text>
        </view>
        <view class="list-bottom flex flex-justify-between flex-vertical-c">
          <view>到货时效：{{ info.arrivalTime }}天</view>
          <view class="list-bottom__edit flex flex-vertical-c" @click="editor(info)">
            <VoIcon name="edit" :size="20" :opacity="0.65" />
            <view class="m-l-8">编辑</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!--  空状态时的状态  -->
    <VoNoData
      v-else
      :noDataTips="noDataTips"
      height="310"
      imgUrl="/static/created/product/illustrations_three.png"
      width="416"
    />
    <view class="arrival-bottom p-b-safe-area">
      <EraButton circle text="新增到货时效" @click="goArrivalTimeliness" />
      <view class="p-b-safe-area" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SetArrivalTimeliness',
    data() {
      return {
        warehouseId: '', // 仓库id
        isLoading: false,
        keyword: '', // 搜索双向绑定
        total: 0,
        arrivalList: [],
        noDataTips: [
          '若未设置到货时效，系统将默认预计15日',
          '内到货，并在商品和订单相关信息中展示',
        ],

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
      }
    },
    methods: {
      /**
       * 去新增到货时效
       */
      goArrivalTimeliness() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/ArrivalTimeliness?warehouseId=' +
            this.warehouseId,
        )
      },
      /**
       * 编辑到货时效
       */
      editor(info) {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/ArrivalTimeliness?warehouseId=' +
            this.warehouseId +
            '&id=' +
            info.id +
            '&areaName=' +
            info.areaName,
        )
      },
      /**
       * 初始化到货时效列表
       */
      initFn(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.arrivalList = []
          this.pageNo = 1
        }
        let param = {
          name: this.keyword,
          warehouseId: this.warehouseId,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        this.$VoHttp
          .apiWarehouseArrivalPage(param)
          .then((res) => {
            if (res.code === '20001') {
              let resultData = res.data.records
              this.total = res.data.total
              this.arrivalList = this.arrivalList.concat(resultData)

              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '到货时效获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch(() => {
            console.log('err', err)
            uni.$u.toast('到货时效获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
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
          this.initFn()
        }
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
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.arrivalList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.initFn()
        }, 2000)
      },
      onLoad(options) {
        this.warehouseId = options.warehouseId
      },
      onShow() {
        this.refresh = true
        this.initFn()
      },
      onReachBottom() {
        if (this.arrivalList.length < this.total) {
          this.pageNo++
          this.initFn()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .arrival {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    padding-bottom: 132rpx;
    box-sizing: border-box;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-content {
      overflow-y: scroll;
      &__list {
        margin-top: 16rpx;
        background: #ffffff;
        padding: 32rpx;
        .list-address {
          font-weight: bold;
          font-size: 32rpx;
          line-height: 64rpx;
          color: $v-c0-85;
        }
        .list-inline {
          display: inline-block;
          margin: 0 16rpx;
          text-align: center;
          &__to {
            font-size: 20rpx;
            line-height: 150%;
            color: $color-primary-red;
          }
          &__img {
            width: 62rpx;
            height: 10rpx;
            display: block;
            margin-bottom: 20rpx;
          }
        }
        .list-bottom {
          height: 42rpx;
          font-size: 28rpx;
          line-height: 150%;
          color: $v-c0-85;
          margin-top: 16rpx;
          &__edit {
            color: $v-c0-65;
          }
        }
      }
    }
    &-bottom {
      width: 750rpx;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
      position: fixed;
      bottom: 0rpx;
      left: 0rpx;
    }
  }
</style>
