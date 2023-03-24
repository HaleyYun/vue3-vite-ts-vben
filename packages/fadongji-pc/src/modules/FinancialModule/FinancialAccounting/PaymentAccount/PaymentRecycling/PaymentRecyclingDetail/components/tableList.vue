<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span
          >订单：<a @click="goOrderDetail">{{ format(tabData.orderId) }}</a></span
        >
        <span class="ml-10px" v-if="tabData.createTime">申请时间：{{ tabData.createTime }}</span>
        <span v-if="tabData.relationOrderId != 0">关联订单单号：{{ tabData.relationOrderId }}</span>
        <span v-if="tabData.afterSaleStr">售后类型：{{ tabData.relationType }}</span>
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="tabData['goodsList']"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'service_name'">
          <div class="title ellipsis-2">
            <a-tooltip :title="record.goodsName">
              {{ record.goodsName }}
            </a-tooltip>
          </div>
        </template>
        <!--服务价格-->
        <template v-if="column.dataIndex == 'service_price'">
          <div>{{ record.price }}元</div>
        </template>
        <!--上门时间-->
        <template v-if="column.dataIndex == 'door_time'">
          <div>{{ record.homeStartTime }}</div>
          <div>{{ record.homeEndTime }}</div>
        </template>
        <!--修理厂-->
        <template v-if="column.dataIndex == 'garage'">
          <div>{{ record.buyerName }}</div>
        </template>
        <!--集师傅-->
        <template v-if="column.dataIndex == 'fault_components'">
          <div>{{ record.masterName }}</div>
        </template>
        <!--回收公司-->
        <template v-if="column.dataIndex == 'recycling_company'">
          <div>{{ record.shopName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'order_status'">
          <div>{{ tabData.orderStatusName }}</div>
        </template>
        <!--操作-->
        <template v-if="column.dataIndex == 'operation'">
          <AButton type="link" size="small" @click="goOrderDetail()">详情</AButton>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, defineProps, watch } from 'vue'
  import { getTableColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  const router = useRouter() // 路由跳转函数

  const props = defineProps({
    tabData: {
      type: Object,
      default: {},
    },
  })

  const tableCoumns = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }

  // 订单详情页面
  const goOrderDetail = () => {
    router.push({
      path: '/OrderModule/repairShopOrder/recoveryDetails',
      query: { id: props.tabData.orderId },
    })
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = val['goodsList'].length
      tableCoumns.value = getTableColumns(length)
    },
    { immediate: true },
  )
</script>

<style scoped lang="less">
  .orderTable {
    border-top: 1px solid #f0f0f0;
    .orderHead {
      background: #fafafa;
    }
  }
</style>
