<template>
  <view class="order flex flex-column">
    <VoNav is-fixed title="选择订单" is-have-more :isBack="false" @backFn="back">
      <template #back>
        <VoIcon name="close" color="#000000" :opacity="0.45" />
      </template>
    </VoNav>
    <view class="order-search flex flex-vertical-c">
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" @custom="handlerSearch" />
    </view>
    <scroll-view
            class="workbench flex1"
            scroll-top="0"
            :refresher-enabled="true"
            :refresher-triggered="triggered"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            scroll-y="true"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
    >
      <VoListFresh :show="loadingStatus" />
      <view class="order-list flex1 overflow-y" v-if="orderList.length > 0">
        <view v-for="info of orderList" :key="info.id" @click.stop="selectOrder(info)">
          <OrderList :order-list="info" />
        </view>
        <VoLoadingText  :loading="loading" :has-more="orderList.length < total" />
      </view>
      <VoNoData v-if="!loading && orderList.length == 0" no-data-tips="无相关订单" />
    </scroll-view>
  </view>
</template>

<script>
  import OrderList from './components/OrderList'
  export default {
    name: 'SelectOrder',
    components: { OrderList },
    props: {
      orderParams: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        keyword: '', // 搜索双向绑定
        orderList: [],
        loading: false,
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total:0,
        orderPage: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    created() {
      this.getQueryListByUser()
    },
    methods: {
      // 搜索订单
      handlerSearch() {
        this.orderParams.goodsName = this.keyword
        this.orderPage.pageNo = 1
        this.orderList = []
        this.getQueryListByUser()
      },

      async getQueryListByUser() {
        try {
          this.loading = true
          let testParams = {
            // businessCode: this.orderParams.businessCode,//买卖关系 登录人身份 0：我是卖家   1：我是买家 2：普通聊天
            friendId: this.orderParams.friendId,
            friendPlatfromCode: this.orderParams.friendPlatformCode,
            goodsName: this.orderParams.goodsName ? this.orderParams.goodsName : '',
          }
          let params = { ...testParams, ...this.orderPage }
          const { code, data } = await this.$VoHttp.IM.apiOrderSellQueryListByUser(params)
          if (code == '20001') {
            this.orderList = this.orderList.concat(data.records)
            this.total = data.total;

          }
          this.loading = false
        } catch (e) {
          this.loading = false
        } finally {
          this.loading = false;
          this.loadingStatus = false
          this.triggered = false
          this.refresh = false
        }
      },
      back() {
        console.log('返回')
        this.$emit('selectOrder')
      },

      // 选择发送的订单
      selectOrder(info) {
        console.log(info)
        this.$emit('selectOrder', info)
      },


      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0 ) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新',this.scrollTop)
        if (this.scrollTop === 0 ) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getQueryListByUser()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            uni.$u.toast('已经到底了')
            return false
          }
          this.orderPage.pageNo++
          this.getQueryListByUser()
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
      onScroll(){}
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-list {
    }
  }
  .workbench{
    flex: 1;
    overflow: hidden;
  }
</style>
