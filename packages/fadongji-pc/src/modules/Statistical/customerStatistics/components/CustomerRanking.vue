<template>
  <div>
    <a-table :columns="getColumns(activeKey)" :pagination="false" :data-source="tableData" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex == 'buyerName'">
        <a @click="goCompanyStatistical(record, 'buyerName')">{{ record.buyerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'companyName'">
        <a @click="goCompanyStatistical(record, 'companyName')">{{ record.companyName }}</a>
      </template>
      <template v-if="column.dataIndex == 'sellerName'">
        <a @click="goCompanyStatistical(record, 'sellerName')">{{ record.sellerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'operation'">
        <a-button type="link" @click="aboutGarage(record)">关联修理厂</a-button>
      </template>
    </template>
  </a-table>
  <GarageModal v-model:visible="visible" :companyId="companyId" />
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, defineProps } from 'vue'
  import { getColumns } from '../data/configuration'
  import GarageModal from './GarageModal.vue'
  import { useRouter } from 'vue-router'
  import { message } from 'ant-design-vue'

  import { usePermission } from '/@/hooks/web/usePermission'

  const { hasPermission } = usePermission()

  const props = defineProps({
    tableData: {
      type: Array,
      default: [],
    },
    activeKey: {
      type: String,
      default: '',
    },
  })
  // 服务商统计
  const router = useRouter()
  const goCompanyStatistical = (record, type) => {
    const flag = hasPermission('/v1/order/count/invest/brand/count')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    console.log(record)
    let query: any = {}
    if (type == 'buyerName') {
      query = { companyId: record.buyerId, companyName: record.buyerName }
    } else if (type == 'companyName') {
      query = { companyId: record.companyId, companyName: record.companyName }
    } else if (type == 'sellerName') {
      query = { companyId: record.companyId, companyName: record.companyName ,activeKey:3}
    } else {
      query = { companyId: record.sellerId, companyName: record.sellerName }
    }
    router.push({ path: '/statistical/account/agentStatistical', query: query })
  }
  // 关联修理厂
  const visible = ref(false)
  const companyId = ref(null)
  const aboutGarage = (record) => {
    const flag = hasPermission('/v1/company/info/garage/list')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    visible.value = true
    companyId.value = record.companyId
    console.log(record)
  }
</script>

<style scoped lang="less"></style>
