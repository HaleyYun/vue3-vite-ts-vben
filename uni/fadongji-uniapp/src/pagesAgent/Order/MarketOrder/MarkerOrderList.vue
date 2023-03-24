<template>
  <view
    class="order flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav isHaveMore title="销售订单" />
    <MarketOrder class="flex1" :status="orderStatus" ref="marketOrderRef" />
  </view>
</template>

<script>
  import MarketOrder from '../components/MarketOrder'

  export default {
    components: {
      MarketOrder,
    },
    data() {
      return {
        orderStatus: '0',
      }
    },
    onLoad(option) {
      if (option) {
        if (option.orderStatus) {
          this.orderStatus = option.orderStatus
        }
      }
    },
    onShow() {
      //发货成功之后跳转待发货列表页面
      this.$refs.marketOrderRef?.getOrderListRequest()
      const delivery = uni.getStorageSync('SellOrderUpdate')
      if (!delivery) {
        return
      }
      if (delivery === 'sell') {
        this.$refs.marketOrderRef.deliverGoodsUpdate()
      }
      uni.setStorageSync('SellOrderUpdate', '')
    },
    methods: {
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch?type=' + this.orderType)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
  }
</style>
