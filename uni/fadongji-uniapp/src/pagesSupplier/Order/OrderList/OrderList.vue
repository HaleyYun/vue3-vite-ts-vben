<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column"
  >
    <view class="order-top">
      <VoNav :is-fixed="false" isHaveMore>
        <template #title>
          <view class="flex">
            <EraTabs
              :current="current"
              :lineBottom="0"
              :list="navList"
              activeStyle="color:rgba(0, 0, 0, 0.85);fontWeight: bold;font-size: 36rpx;"
              class="flex flex-justify-c"
              inactiveStyle="color: rgba(0, 0, 0, 0.45);"
              lineColor="transparent"
              @click="navTab"
            />
          </view>
        </template>
      </VoNav>
    </view>
    <InvestOrder v-if="current === 0" ref="investOrderRef" :status="orderStatus" class="flex1" />
    <MarketOrder
      v-if="current === 1"
      ref="marketOrderRef"
      class="flex1"
      :status="orderStatusMarket"
      :isTimeout="isTimeout"
    />
  </view>
</template>

<script>
  import MarketOrder from './components/MarketOrder'
  import InvestOrder from './components/InvestOrder'

  export default {
    components: {
      MarketOrder,
      InvestOrder,
    },
    data() {
      return {
		orderStatusMarket: '',
        current: 0,
        navList: [{ name: '批发订单' }, { name: '零售订单' }],
        searchModel: '',
        orderStatus: '',
        isTimeout: '',
      }
    },
    onLoad(option) {
      if (option) {
        console.log(option)
        this.orderStatus = option.orderStatus || ''
        this.orderStatusMarket = option.orderStatusMarket || ''
        this.isTimeout = option.isTimeout || ''
        this.searchModel = option.search
        this.orderType = option.type
        this.current = option.type ? 1 : 0
      }
      //   this.getOrderStatusListRequest()
    },
    onShow() {
      //发货成功之后跳转待收货列表页面
      const delivery = uni.getStorageSync('deliveryUpdateList')
      if (!delivery) {
        this.$refs.investOrderRef?.getOrderListRequest()
        return
      }

      if (delivery === 'sell') {
        this.current = 1
        this.$refs.marketOrderRef.deliverGoodsUpdate()
      }
      if (delivery === 'invest') {
        this.current = 0
        this.$refs.investOrderRef.deliverGoodsUpdate()
      }
      if (delivery === 'sellUpdateList') {
        this.current = 1
        this.$nextTick(() => {
          this.$refs.marketOrderRef.getOrderListRequest()
        })
      }
      if (delivery === 'investUpdateList') {
        this.current = 0
        this.$nextTick(() => {
          this.$refs.investOrderRef.getOrderListRequest()
        })
      }
      uni.setStorageSync('deliveryUpdateList', '')
    },
    methods: {
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch?type=' + this.orderType)
      },
      //切换tabbar
      navTab(e) {
        this.current = e.index
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    &-top {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 66;
    }
  }
</style>
