<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span
          >订单：<a @click="goOrderDetail">{{ format(tabData.orderId) }}</a></span
        >
        <span class="ml-15px" v-if="tabData.createTime">申请时间：{{ tabData.createTime }}</span>
        <span class="ml-15px" v-if="tabData.relationOrderId"
          >关联订单单号：{{ tabData.relationOrderId }}</span
        >
        <span class="ml-15px" v-if="tabData.relationType"
          >售后类型：{{ tabData.relationType }}</span
        >
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
        <template v-if="column.dataIndex == 'goods'">
          <div class="title ellipsis-2">
            <a-tooltip :title="record.goodsName">
              {{ record.goodsName }}
            </a-tooltip>
          </div>
        </template>
        <!--商品识别码-->
        <template v-if="column.dataIndex == 'identification_code'">
          <div>{{ record.engineNo }}</div>
        </template>
        <!--型号-->
        <template v-if="column.dataIndex == 'model'">
          <div>{{ record.modelName }}</div>
        </template>
        <!--补偿金额-->
        <template v-if="column.dataIndex == 'compensation_amount'">
          <div>{{ record.payAmountTotal }}元</div>
        </template>
        <!--故障部件-->
        <template v-if="column.dataIndex == 'fault_components'">
          <div>{{ record.unit }}</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'seller'">
          <div>{{ record.shopName }}</div>
          <div>{{ record.shopPhone }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'buyers'">
          <div>{{ record.buyerName }}</div>
          <div>{{ record.buyerPhone }}</div>
        </template>
        <!--生产商-->
        <template v-if="column.dataIndex == 'producers'">
          <div>{{ record.supplierName }}</div> 
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
    // 售后赔付
    router.push({
      path: '/OrderModule/repairShopOrder/afterServiceDetails',
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
