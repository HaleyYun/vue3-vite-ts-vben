<template>
 <div>
  <a-table :columns="getColumns(activeKey)" :pagination="false" :data-source="tableData" bordered>
    <template #bodyCell="{ column, text, record, key }">
      <template v-if="column.dataIndex == 'shopName'">
        <a @click="goCompanyStatistical(record, 'shopName')">{{ record.shopName }}</a>
      </template>
      <template v-if="column.dataIndex == 'modelName'">
        <a @click="goCompanyStatistical(record, 'modelName')">{{ record.shopName }}</a>
      </template>
      <template v-if="column.dataIndex == 'investCoverage'">
        <span>{{ record.investCoverage }}%</span>
      </template>
    </template>
  </a-table>
 </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps } from 'vue'
  import { getColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  import { usePermission } from '/@/hooks/web/usePermission'
  import { message } from 'ant-design-vue'

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
    console.log(record)
    const flag = hasPermission('/v1/order/count/invest/brand/count')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    if (type == 'modelName') {
      router.push({
        path: '/statistical/account/agentStatistical',
        query: { companyId: record.shopId, companyName: record.shopName, activeKey:4},
      })
    } else {
      router.push({
        path: '/statistical/account/agentStatistical',
        query: { companyId: record.shopId, companyName: record.shopName },
      })
    }
  }
</script>

<style scoped lang="less"></style>
