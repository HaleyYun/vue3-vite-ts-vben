<template>
  <view
    class="orderDetail flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav isHaveMore title="订单信息" />
    <view v-for="(item, index) in orderList" :key="index">
      <view class="h16" />
      <InvoiceOrderItem :order-data="item" />
    </view>
    
  </view>
</template>

<script>
  import InvoiceOrderItem from './components/InvoiceOrderItem'
  export default {
    components: {
      InvoiceOrderItem,
    },
    data() {
      return {
        orderList: [],
      }
    },
    onLoad(option) {
      let param = { id: option.id }
      this.invoiceOrderRequest(param)
    },
    methods: {
      /**
       * 获取订单信息
       */
      invoiceOrderRequest(param) {
        this.$VoHttp
          .apiInvoiceQueryOrderList$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.orderList = res.data
            } else {
              uni.$u.toast(res.message || '订单获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单获取失败')
          })
      },
    },
  }
</script>

<style></style>
