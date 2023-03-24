<template>
 <div>
  <a-table :columns="getColumns(activeKey)" :pagination="false" :data-source="tableData" bordered>
    <template #bodyCell="{ column, text, record, key }">
      <template v-if="column.dataIndex == 'buyerName'">
        <a @click="goCompanyStatistical(record,'buyerName')">{{ record.buyerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'salesName'">
        <a @click="goCompanyStatistical(record,'salesName')">{{ record.buyerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'overTimeName'">
        <a @click="goCompanyStatistical(record,'overTimeName')">{{ record.buyerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'repairShopName'">
        <a @click="goCompanyStatistical(record,'repairShopName')">{{ record.buyerName }}</a>
      </template>
      <template v-if="column.dataIndex == 'salesCount'">
        <a @click="goCompanySalesCount(column.key, record)">{{ record.salesCount }}</a>
      </template>
      <template v-if="column.dataIndex == 'goodsName'">
        <a @click="goGoodsName(record)">{{ record.goodsName }}</a>
      </template>
      <template v-if="column.dataIndex == 'overTimeOrderCount'">
        <a @click="overTimeCount(record)">{{ record.overTimeOrderCount }}</a>
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
  const goCompanyStatistical = (record,type) => {
    const flag = hasPermission('/v1/order/count/invest/brand/count')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    console.log(record)
    if (type == 'buyerName') {
      router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.buyerId, companyName: record.buyerName },
    })
    }else if(type == 'salesName'){
      router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.sellerId, companyName: record.buyerName },
    })
    }else if(type == 'overTimeName'){
      router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.sellerId, companyName: record.buyerName },
    })
    }else if(type == 'repairShopName'){
      router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.sellerId, companyName: record.buyerName },
    })
   }else{
    router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.buyerId, companyName: record.buyerName },
    })
   }
   
  }



  const goGoodsName = (record) => {
    console.log(record)
    const flag = hasPermission('/v1/goods/goods')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    router.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: { id: record.goodsId },
    })
  }

  //投资
  const goCompanySalesCount = (record, item) => {

    if (record === 'investment') {
      const flag = hasPermission('/v1/order/invest/query/list')
      if (!flag) {
        return message.warn('暂无权限，无法操作')
      }
      router.push({
        path: '/OrderModule/agentOrder/agentInvestmentOrder',
        query: { buyerId: item.buyerId, brandId: item.brandId },
      })
    } else if (record === 'sales') {
      const flag = hasPermission('/v1/order/sell/query/list')
      if (!flag) {
        return message.warn('暂无权限，无法操作')
      }
      router.push({
        path: '/OrderModule/agentOrder/agentSaleOrder',
        query: { shopIds: item.sellerId, brandId: item.brandId },
      })
    } else if (record === 'overtime') {
      router.push({
        path: '/statistical/account/agentStatistical',
        query: { companyId: record.buyerId, companyName: record.buyerName },
      })
    } else if (record === 'retreat') {
      const flag = hasPermission('/v1/order/refund/query/page')
      if (!flag) {
        return message.warn('暂无权限，无法操作')
      }
      router.push({
        path: '/OrderModule/agentOrder/agentHandleOrder',
        query: {shopId: item.sellerId,buyerName:item.buyerName,brandId:item.brandId },
      })
    }
  }
  //超时数量
  const overTimeCount = (record) => {
    console.log(record,'record');   
    const flag = hasPermission('/v1/order/sell/query/list')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    router.push({
      path: '/OrderModule/agentOrder/agentSaleOrder',
      query: {
        shopId: record.sellerId,
        activeKey: 'six',
      },
    })
  }
</script>

<style scoped lang="less"></style>
