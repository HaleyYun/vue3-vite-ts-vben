<template>
  <div>
  <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  <InvesmentStatistics v-if="activeKey == 1" />
  <InvestmentRefund v-if="activeKey == 2" />
  <SalesStatistics v-if="activeKey == 3" />
  <SalesSubsidiary v-if="activeKey == 4" />
  <SalesReturnStatistics v-if="activeKey == 5" />
  <AccountDetail v-if="activeKey == 6" />
  <AccountsPayable v-if="activeKey == 7" />
  <AccountsReceivable v-if="activeKey == 8" />
  <WithdrawalApplication v-if="activeKey == 9" />
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, onBeforeMount } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import InvesmentStatistics from './components/InvestmentStatistics/List.vue'
  import InvestmentRefund from './components/InvestmentRefund/List.vue'
  import SalesStatistics from './components/SalesStatistics/List.vue'
  import SalesSubsidiary from './components/SalesSubsidiary/List.vue'
  import SalesReturnStatistics from './components/SalesReturnStatistics/List.vue'
  import AccountDetail from './components/AccountDetails/List.vue'
  import AccountsPayable from './components/AccountsPayable/List.vue'
  import AccountsReceivable from './components/AccountsReceivable/List.vue'
  import WithdrawalApplication from './components/WithdrawalApplication/List.vue'
  import { useRoute } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const route = useRoute()
  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '投资统计' },
    { key: '2', name: '投资退款/退货统计' },
    { key: '3', name: '销货统计' },
    { key: '4', name: '销货明细' },
    { key: '5', name: '销售退货统计' },
    { key: '6', name: '账户明细' },
    { key: '7', name: '应付账款' },
    { key: '8', name: '应收账款' },
    { key: '9', name: '提现申请记录' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
  }
  const loadTableData = () => {
    if (route.query?.activeKey === '3') {
      activeKey.value = route.query?.activeKey
    } else if (route.query?.activeKey === '4') {
      activeKey.value = route.query?.activeKey
    }
  }
  onMountedOrActivated(async () => {
    await loadTableData()
  })
</script>

<style scoped lang="less"></style>
