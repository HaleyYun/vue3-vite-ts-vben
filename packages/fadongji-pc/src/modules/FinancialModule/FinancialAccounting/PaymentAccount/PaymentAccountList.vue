<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    <div class="pt-72px">
      <PaymentRefund v-show="activeKey === 'one'"></PaymentRefund>
      <AfterPay v-show="activeKey === 'two'"></AfterPay>
      <PaymentRecycling v-show="activeKey === 'three'"></PaymentRecycling>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import PaymentRefund from './PaymentRefund/PaymentRefundList/PaymentRefund.vue'
  import AfterPay from './AfterPay/AfterPayList/AfterPay.vue'
  import PaymentRecycling from './PaymentRecycling/PaymentRecyclingList/PaymentRecycling.vue'
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '退款' },
    { key: 'two', name: '售后赔付' },
    { key: 'three', name: '回收' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
  }
</script>

<style scoped lang="less"></style>
