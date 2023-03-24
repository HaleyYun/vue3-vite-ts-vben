<template>
  <view>
    <view class="return flex flex-column">
      <VoNav is-fixed is-have-more title="退货/退款">

        <block slot="operation">
          <VoIcon class="m-r-32" color="#155BD4" name="warranty" @click="afterInfoClick" />
        </block>
      </VoNav>
      <view class="return-search flex flex-vertical-c">
        <VoSearch
          v-model="keyword"
          height="34"
          bgColor="#fff"
          placeholder="请输入搜索"
          borderColor="#FF5319"
          :actionStyle="{color:'#fff'}"
          :showInsideAction="true"
          @custom="goSearchPage"
          @search="goSearchPage"
        />
      </view>
      <view class="return-box">
        <EraSubsection
          :current="currentTab"
          :list="list"
          activeColor="rgba(0, 0, 0, 0.85)"
          customStyle="background-color: #f7f7f8"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          @change="sectionChange"
        />
      </view>
      <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
        <swiper-item v-for="(item, index) in list" :key="`${item}${index}`">
          <scroll-view
            :scroll-y="true"
            class="return-scroll flex1"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            refresher-enabled="true"
            scroll-top="0"
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
          >
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <VoNoData
              v-if="!returnGoodsList.length && !refresh && isOverLoading"
              no-data-tips="您还没有相关订单"
            />
            <view v-else>
              <ReturnGoods
                v-for="info of returnGoodsList"
                :key="info.id"
                :return-goods-list="info"
                :statusShow="false"
                :type="currentTab === 0 ? '1' : ''"
                isArr
                @checkDetails="checkDetails"
                @returnGoodClick="returnGoodClick"
                @confirmCancel="confirmCancel"
                @editReturn="editReturn"
              />
              <VoLoadingText :has-more="returnGoodsList.length < total" :loading="isLoading" />
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <u-modal :content="content" :show="show" @confirm="show = false" />
  </view>
</template>

<script>
  import ReturnGoods from './components/ReturnGoods'

  export default {
    name: 'ReturnExchange',
    components: { ReturnGoods },
    data() {
      return {
        triggered: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        isOverLoading: false,
        isLoading: false,
        status: 'noMore',
        keyword: '',
        currentTab: 0,
        orderStatus: 0,
        list: ['退货退款申请', '处理中', '申请记录'],
        returnGoodsList: [],
        show: false,
        //备注弹框内容
        content: '',
      }
    },
    async onLoad() {
      uni.$off('back')
      uni.$on('back', (res) => {
        console.log('back', res)
        this.refresh = true
        this.currentTab = Number(res)
        //获取可退款订单列表
        if (this.currentTab === 0) {
          this.marketRetuenExchangeRequest()
          console.log('backReturn', 1)
          return
        }
        if (this.currentTab === 2) {
          this.orderStatus = 0
          console.log('backReturn', 2)
        } else {
          this.orderStatus = this.currentTab
          console.log('backReturn', 3)
        }
        this.returnExchangeRequest()
      })
      await this.marketRetuenExchangeRequest()
      this.isOverLoading = true
    },
    methods: {
      /**
       * 去搜索页
       */
      goSearchPage() {
        this.refresh = true
        if (this.currentTab === 0) {
          this.marketRetuenExchangeRequest()
          return
        }
        this.returnExchangeRequest()
      },
      /**
       * 去质保说明
       */
      afterInfoClick() {
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/AfterInfo')
      },
      sectionChange(index) {
        this.currentTab = index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        this.returnGoodsList = []
        this.refresh = false
        this.isOverLoading = false
        //获取可退款订单列表
        if (this.currentTab === 0) {
          this.marketRetuenExchangeRequest()
          return
        }
        if (this.currentTab === 2) {
          this.orderStatus = 0
        } else {
          this.orderStatus = this.currentTab
        }
        this.returnExchangeRequest()
      },
      /**
       * 去去查看详情
       */
      checkDetails(data) {
        // 仅退款详情页面
        if (data.isRefundOnly) {
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/RefundDetails?id=' + data.id)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnRefundDetails?id=' + data.id)
      },
      /**
       * 修改申请
       */
      editReturn(data) {
        data.orderId = data.id
        this.$linkToEasy(
          '/pagesGarage/Order/ReturnExchange/InitiateRefund?isEdit=1' +
            '&data=' +
            JSON.stringify(data) +
            '&index=' +
            this.currentTab,
        )
      },
      /**
       * 退货列表接口请求
       */
      returnExchangeRequest() {
        if (this.isLoading) return
        this.isLoading = true
        let isfresh = this.refresh
        if (isfresh) {
          this.returnGoodsList = []
          this.pageNo = 1
        }
        let params = {
          status: this.currentTab,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          type: '4',
        }
        if (this.keyword) {
          params.goodsName = this.keyword
        }
        this.$VoHttp
          .apiRefundQueryList(params)
          .then((res) => {
            this.isOverLoading = true
            if (res.code === '20001') {
              let resultData = res.data.records
              this.total = res.data.total
              this.returnGoodsList = this.returnGoodsList.concat(resultData)
            } else {
              uni.$u.toast(res.message || '退货获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退货获取失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = false
          })
      },
      /**
       * 销售订单退换货申请请求
       */
      marketRetuenExchangeRequest() {
        if (this.isLoading) return
        this.isLoading = true
        let isfresh = this.refresh
        if (isfresh) {
          this.returnGoodsList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.keyword) {
          params.searchWord = this.keyword
        }
        this.$VoHttp
          .apiOrderSellQueryListRefundEnabled(params)
          .then((res) => {
            this.isOverLoading = true
            if (res.code === '20001') {
              console.log('退货数据', res)
              let resultData = res.data.records
              this.total = res.data.total
              this.returnGoodsList = this.returnGoodsList.concat(resultData)
            } else {
              uni.$u.toast(res.message || '退货获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退货获取失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = false
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
      async returnGoodClick(data) {
        try {
          // 此接口比较特殊，不满足抛出了500，因此只能使用捕获进行提示，如果正常，则执行正常的逻辑
          await this.$VoHttp.apiRefundCheckOrder({
            id: data.id,
          })
          let goodData = {
            orderId: data.id,
            shopId: data.shopId,
            shopPlatformCode: data.shopPlatformCode,
            whetherReceiptGoods: true,
            ...data,
          }
          this.$linkToEasy(
            '/pagesGarage/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
          )
          return
        } catch (e) {
          this.show = true
          this.content = e.message
        }
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
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
          //获取可退款订单列表
          if (this.currentTab === 0) {
            this.marketRetuenExchangeRequest()
            return
          }
          if (this.currentTab === 2) {
            this.orderStatus = 0
          } else {
            this.orderStatus = this.currentTab
          }
          this.returnExchangeRequest()
        }
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
      },
      //滚到底部加载
      scrolltolower() {
        console.log('底部加载')
        this.refresh = false
        if (this.returnGoodsList.length >= this.total) {
          uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        //获取可退款订单列表
        if (this.currentTab === 0) {
          this.marketRetuenExchangeRequest()
          return
        }
        if (this.currentTab === 2) {
          this.orderStatus = 0
        } else {
          this.orderStatus = this.currentTab
        }
        this.returnExchangeRequest()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .return {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
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
  }
</style>
