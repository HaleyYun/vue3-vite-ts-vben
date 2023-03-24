<template>
  <view class="settled">
    <view>
      <VoNav is-have-more title="待结算金额" />
      <view class="line-bg h16 w-full" />
      <view class="p-t-28">
        <view class="fz-28 color-block-45 text-center m-b-2">总金额</view>
        <VoPointPrice
          :left-size="20"
          :show-unit="true"
          class="text-center"
          color="#F20014"
          :price="amount"
        />
      </view>
      <view class="line-bg h2 m-t-32" />
      <view class="flex h88 color-block-45 fz-28">
        <view class="flex1 flex flex-vertical-c flex-justify-c" @click="orderAmount('money')">
          <view :class="cur === 'money' ? 'selectedColor' : ''" class="m-r-4">订单金额</view>
          <template v-if="firstSales">
            <VoIcon :size="16" name="default-gray" />
          </template>
          <template v-else>
            <VoIcon v-if="moneyState" :size="16" name="direction" />
            <VoIcon v-else :size="16" class="transform" name="direction" />
          </template>
        </view>
        <view class="flex1 flex flex-vertical-c flex-justify-c" @click="orderTime('time')">
          <view :class="cur === 'time' ? 'selectedColor' : ''" class="m-r-4">下单时间</view>
          <template v-if="firstTime">
            <VoIcon :size="16" name="default-gray" />
          </template>
          <template v-else>
            <VoIcon v-if="timeState" :size="16" name="direction" />
            <VoIcon v-else :size="16" class="transform" name="direction" />
          </template>
        </view>
        <view class="flex1 flex flex-vertical-c flex-justify-c" @click="deliveryTime('delivery')">
          <view :class="cur === 'delivery' ? 'selectedColor' : ''">发货时间</view>
          <template v-if="firstTimes">
            <VoIcon :size="16" name="default-gray" />
          </template>
          <template v-else>
            <VoIcon v-if="timesState" :size="16" name="direction" />
            <VoIcon v-else :size="16" class="transform" name="direction" />
          </template>
        </view>
        <view class="flex1 flex flex-vertical-c flex-justify-c" @click="justSendChange">
          <view class="look-good" :class="{ active: justSend }"> 只看发货</view>
        </view>
      </view>
      <view class="line-bg h16 w-full" />
    </view>
    <scroll-view
      :refresher-enabled="true"
      :refresher-threshold="10"
      :scroll-y="true"
      class="detail flex1"
      :refresher-triggered="triggered"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      scroll-top="0"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <template v-if="list.length > 0">
        <view v-for="(item, index) in list" :key="index" class="settled-item">
          <view class="flex flex-justify-between">
            <view class="fz-28 color-block fz-b flex1 lh150 overTwoEllipsis">
              <text v-if="!item.deliveredTime" class="sign">未发货</text>
              {{ item.buyerName }}
            </view>
            <VoPointPrice
              class="m-l-56"
              :leftSize="16"
              show-unit
              color="#F20014"
              :price="item.orderAmount"
            />
          </view>
          <view class="fz-28 color-block-65 lh150">
            <view class="m-t-16">订单号：{{ item.orderId }}</view>
            <view v-if="item.deliveredTime" class="m-t-16">发货时间：{{ item.deliveredTime }}</view>
            <view class="m-t-16">下单时间：{{ item.placeTime }}</view>
            <view class="m-t-16">商品总数量：{{ item.goodsCount }}</view>
            <view class="m-t-16">待结算金额：{{ item.unSettleAmount }} 元</view>
          </view>
        </view>
        <VoLoadingText :has-more="list.length < total" :loading="loading" />
      </template>
      <VoNoData v-if="!list.length && !refresh" no-data-tips="暂无数据" />
    </scroll-view>
    <VoSafetyArea />
  </view>
</template>

<script>
  export default {
    name: 'AmountSettled',
    data() {
      return {
        loading: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        list: [],
        amount: 0, // 待结算总金额
        cur: null,
        firstSales: true, // 订单金额默认状态
        moneyState: false, // 订单金额点击时状态
        firstTime: true, // 下单时间默认状态
        timeState: false, // 下单时间点击时状态
        firstTimes: true, // 发货时间默认状态
        timesState: false, // 发货时间点击时状态
        justSend: false, // 只看发货
      }
    },
    onLoad() {
      this.getData()
      this.getList(1)
    },
    methods: {
      // 获取待结算金额
      async getData() {
        try {
          const { data } = await this.$VoHttp.apiOrderProfitQueryUnsettleAmount()
          console.log(data)
          this.amount = data || 0
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      async getList(init) {
        if (this.loading) return
        this.loading = !this.loading
        if (init) {
          this.list = []
          this.pageNo = 1
        }
        let param = {
          isDelivered: this.justSend,
          pageNo: this.pageNo,
          pageSize: 10,
        }
        if (this.cur === 'money') {
          // 订单金额
          param.orderProperty = 'amount'
          param.orderType = this.moneyState ? 'ASC' : 'DESC'
        } else if (this.cur === 'time') {
          // 下单时间
          param.orderProperty = 'createTime'
          param.orderType = this.timeState ? 'ASC' : 'DESC'
        } else if (this.cur === 'delivery') {
          // 发货时间
          param.orderProperty = 'deliveryTime'
          param.orderType = this.timesState ? 'ASC' : 'DESC'
        }
        if (!this.justSend) delete param.isDelivered
        try {
          const { data } = await this.$VoHttp.apiOrderProfitQueryUnsettleList(param)
          console.log(data)
          this.list.push(...data.records)
          this.total = data.total
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        this.loading = !this.loading
        this.refresh = false
        this.triggered = false
        this.loadingStatus = false
      },
      /**
       * 只看发货
       */
      justSendChange() {
        this.justSend = !this.justSend
        this.getList(1)
      },
      /**
       * 点击订单金额
       */
      orderAmount(e) {
        this.firstSales = false
        this.firstTime = this.firstTimes = true
        this.moneyState = !this.moneyState
        this.cur = e
        this.getList(1)
      },
      /**
       * 点击下单时间
       * @param e
       */
      orderTime(e) {
        this.firstTime = false
        this.firstSales = this.firstTimes = true
        this.timeState = !this.timeState
        this.cur = e
        this.getList(1)
      },
      /**
       * 点击发货时间
       * @param e
       */
      deliveryTime(e) {
        this.firstTimes = false
        this.firstSales = this.firstTime = true
        this.timesState = !this.timesState
        this.cur = e
        this.getList(1)
      },

      //自定义下拉刷新控件被下拉
      onPulling(e) {
        console.log('onpulling', e.detail.deltaY)
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
          this.getList(1)
          // setTimeout(() => {
          //   this.triggered = false
          //   this.refresh = false
          //   this.loadingStatus = false
          // }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        let that = this
        uni.$u.throttle(() => {
          console.log('底部加载')
          that.refresh = false
          if (that.list.length >= that.total) {
            return false
          }
          that.pageNo++
          that.getList()
        }, 100)
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
    },
  }
</script>

<style lang="scss" scoped>
  .settled {
    width: 750rpx;
    height: 100vh;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .detail {
      overflow-y: auto;
    }

    .look-good {
      width: 144rpx;
      height: 48rpx;
      line-height: 48rpx;
      text-align: center;
      //background: #f6f7f8;
      border-radius: 80rpx;
      font-size: 24rpx;
    }

    .active {
      background: $v-tags-btn-disabled;
      /* Brand Two Color主色二/Brand Two Color - 常规 */
      box-sizing: border-box;
      border: 2rpx solid $v-tags-one;
      color: $v-tags;
      line-height: 44rpx;
    }

    &-item {
      padding: 32rpx;
      box-sizing: border-box;
      width: 750rpx;
      border-bottom: 2rpx solid #f7f7f8;

      .line {
        line-height: 150%;
      }

      .sign {
        font-size: 24rpx;
        color: #fa3243;
        background: #feecee;
        border-radius: 24rpx;
        padding: 0 16rpx;
        margin-right: 16rpx;
      }
    }
  }

  .selectedColor {
    color: #ff5319;
    font-weight: bold;
  }

  .transform {
    transform: rotate(180deg);
  }
</style>
