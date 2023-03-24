<template>
  <view class="return flex flex-column">
    <VoNav is-fixed is-have-more title="退货/退款">

      <block slot="operation">
        <VoIcon class="m-r-32" color="#155BD4" name="warranty" @click="afterInfoClick" />
      </block>
    </VoNav>
    <view v-if="searchShow" class="return-search flex flex-vertical-c">
      <VoSearch
        v-model.trim="keyword"
        :showInsideAction="true"
        bgColor="#fff"
        borderColor="#FF5319"
        class="flex1"
        height="34"
        placeholder="请输入搜索"
        @custom="searchClick"
        @search="searchClick"
      />
    </view>
    <view v-if="!searchShow" class="return-tab flex flex-vertical-c flex-justify-between">
      <view class="flex1 flex flex-justify-c">
        <EraTabs
          :current="current"
          :list="typeList"
          activeStyle="color: #FF5319;font-weight: bold;font-size: 16px;"
          inactiveStyle="rgba(0, 0, 0, 0.45);font-size: 16px;"
          itemStyle="height: 49px;"
          lineColor="#FF5319"
          @click="tabsClick"
        />
      </view>
      <VoIcon :opacity="0.65" :size="24" name="garage-search" @click.native="searchShowClick" />
    </view>
    <view class="return-box">
      <view v-if="current === 1">
        <EraSubsection
          :current="currentTab"
          :list="list"
          activeColor="rgba(0, 0, 0, 0.85)"
          customStyle="background-color: #f7f7f8"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          @change="sectionChange"
        />
      </view>
      <view v-else-if="current === 0">
        <EraSubsection
          :current="currentTab"
          :list="initiateList"
          activeColor="rgba(0, 0, 0, 0.85)"
          customStyle="background-color: #f7f7f8"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          @change="sectionChange"
        />
      </view>
    </view>
    <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
      <swiper-item>
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="return-scroll flex1"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <VoNoData v-if="!returnGoodsList.length && !refresh" no-data-tips="暂无退货退款申请" />
          <view v-else>
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <ReturnGoods
              v-for="(info, index) in returnGoodsList"
              :key="index"
              :return-goods-list="info"
              :showDetail="current === 0 ? '' : '1'"
              :type="current === 0 ? '1' : ''"
              @checkDetails="checkDetails"
              @editApply="editApply"
              @click.native="returnDetail(info)"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="return-scroll flex1"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <VoNoData v-if="!returnGoodsList.length" no-data-tips="暂无退货退款记录" />
          <view v-else>
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <ReturnGoods
              v-for="(info, index) in returnGoodsList"
              :key="index"
              :is-my-handle="true"
              :return-goods-list="info"
              :type="current === 0 ? '1' : ''"
              @checkDetails="checkDetails"
              @confirmCancel="confirmCancel"
              @editReturn="editReturn"
              @click.native="returnDetail(info)"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="true"
          class="return-scroll flex1"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <VoNoData v-if="!returnGoodsList.length" no-data-tips="暂无退货退款申请" />
          <view v-else>
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <ReturnGoods
              v-for="(info, index) in returnGoodsList"
              :key="index"
              :enableEditApply="true"
              :is-my-handle="true"
              :return-goods-list="info"
              :type="current === 0 ? '1' : ''"
              @checkDetails="checkDetails"
              @confirmCancel="confirmCancel"
              @editReturn="editReturn"
              @click.native="returnDetail(info)"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import ReturnGoods from './components/ReturnGoods'

  export default {
    name: 'ReturnExchange',
    components: { ReturnGoods },
    data() {
      return {
        status: 'noMore',
        keyword: '',
        currentTab: 0,
        initiateCurrentTab: 0,
        current: 0,
        orderStatus: 0,
        list: ['全部', '进行中', '已完成'],
        initiateList: ['退换申请', '处理中', '申请记录'],
        typeList: [
          { name: '我发起的申请', id: '2' },
          { name: '我收到的申请', id: '4' },
        ],
        returnGoodsList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        orderType: '',
        //是否显示搜索框
        searchShow: false,
        type: '',
      }
    },
    onLoad(option) {
      uni.$off('back')
      uni.$on('back', (res) => {
        this.refresh = true
        if (Object.prototype.toString.call(res) === '[object Object]') {
          this.currentTab = Number(res.index)
          if (this.currentTab === 0) {
            this.currentTab = 0
            this.orderStatus = 0
            this.investRetuenExchangeRequest()
          } else {
            this.returnExchangeRequest()
          }
        } else {
          this.current = Number(res)
          if (this.current === 0) {
            this.currentTab = 0
            this.orderStatus = 0
            this.investRetuenExchangeRequest()
          } else {
            this.returnExchangeRequest()
          }
        }

        console.log(res)
      })
      if (this.current === 0) {
        this.investRetuenExchangeRequest()
        return
      }
      if (option) {
        this.type = option.type
        if (this.type === '1') {
          this.current = 1
        }
      }
      if (option) {
        this.currentTab = Number(option.currentTab)
        this.returnExchangeRequest()
        return
      }
      this.returnExchangeRequest()
    },
    methods: {
      /**
       * 搜索
       */
      searchClick() {
        this.searchShow = false
        this.refresh = true
        //获取可退款订单列表
        if (this.current === 0) {
          this.investRetuenExchangeRequest()
          return
        }
        this.returnExchangeRequest()
      },
      searchShowClick() {
        this.searchShow = true
        this.keyword = ''
      },
      /**
       * 去质保说明
       */
      afterInfoClick() {
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/AfterInfo')
      },
      /**
       * 修改申请
       */
      editReturn(data) {
        console.log(data, 55555555555555)
        data.orderId = data.id
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/InitiateRefund?isEdit=1' +
            '&data=' +
            JSON.stringify(data) +
            '&index=' +
            this.currentTab,
        )
      },
      sectionChange(index) {
        this.currentTab = index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        this.refresh = true
        //获取可退款订单列表
        if (this.current === 0 && this.currentTab === 0) {
          this.investRetuenExchangeRequest()
          return
        }
        if (this.current === 0 && this.currentTab === 2) {
          this.orderStatus = 0
        } else {
          this.orderStatus = this.currentTab
        }
        this.returnExchangeRequest()
      },
      tabsClick(item) {
        this.current = item.index
        this.refresh = true
        this.currentTab = 0
        this.orderStatus = this.currentTab
        //获取可退款订单列表
        if (this.current === 0) {
          this.investRetuenExchangeRequest()
          return
        }
        this.returnExchangeRequest()
      },
      /**
       * 去去查看详情
       */
      checkDetails(data) {
        // 仅退款详情页面
        if (data.isRefundOnly) {
          this.$linkToEasy(
            '/pagesAgent/Order/ReturnExchange/RefundDetails?id=' +
              data.id +
              '&type=' +
              this.current,
          )
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/ReturnRefundDetails?id=' +
            data.id +
            '&type=' +
            this.current,
        )
      },
      returnDetail(data) {
        if (this.current === 0 && this.currentTab === 0) {
          console.log('555555555')
          return
        }
        // 仅退款详情页面
        if (data.isRefundOnly) {
          this.$linkToEasy('/pagesAgent/Order/ReturnExchange/RefundDetails?id=' + data.id)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/ReturnRefundDetails?id=' +
            data.id +
            '&type=' +
            this.current,
        )
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
          //获取可退款订单列表
          if (this.current === 0 && this.currentTab === 0) {
            this.investRetuenExchangeRequest()
            return
          }
          this.returnExchangeRequest()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList && this.orderList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          //获取可退款订单列表
          if (this.current === 0 && this.currentTab === 0) {
            this.investRetuenExchangeRequest()
            return
          }
          this.returnExchangeRequest()
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
      /**
       * 投资订单退换货申请请求
       */
      async investRetuenExchangeRequest() {
        let isfresh = this.refresh
        if (isfresh) {
          this.returnGoodsList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: 20,
        }
        if (this.keyword) {
          params.searchWord = this.keyword
        }
        await this.$VoHttp
          .apiOrderInvestQueryListRefundEnabled(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退货数据', res)
              let resultData = res.data.records
              this.total = res.data.total
              this.returnGoodsList = this.returnGoodsList.concat(resultData)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '退货获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('退货获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },
      /**
       * 退货列表接口请求
       */
      async returnExchangeRequest() {
        let isfresh = this.refresh
        if (isfresh) {
          this.returnGoodsList = []
          this.pageNo = 1
        }
        let params = {
          status: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 20,
        }
        if (this.current === 0) {
          params.type = 2
        }
        if (this.current === 1) {
          params.type = 3
        }
        if (this.keyword) {
          params.searchWord = this.keyword
        }
        await this.$VoHttp
          .apiRefundQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退货数据', res)
              let resultData = res.data.records
              this.total = res.data.total
              this.returnGoodsList = this.returnGoodsList.concat(resultData)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '退货获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('退货获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },
      //取消退款申请
      confirmCancel(data) {
        console.log(data)
        let param = {
          orderId: data.id,
          isRefundOnly: data.isRefundOnly,
          cause: '用户自主取消',
        }

        this.$VoHttp
          .apiRefundCancelApply(param)
          .then(() => {
            this.refresh = true
            this.returnExchangeRequest()
          })
          .catch((err) => {
            uni.$u.toast(err.message || '取消申请失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .return {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-tab {
      background-color: #ffffff;
      padding: 0rpx 32rpx;
      &__search {
        text-align: right;
      }
    }
    &-box {
      background: #ffffff;
      width: 750rpx;
      padding: 14rpx 32rpx 22rpx;
      box-sizing: border-box;
    }
    &-scroll {
      height: 100%;
    }
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
  }
</style>
