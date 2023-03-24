<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span>服务单号：<span @click="goOrderDetail">{{ format(tabData.orderId) }}</span></span
        >
        <span class="ml-15px" v-if="tabData.createTime">申请时间：{{ tabData.createTime }}</span>
        <span v-if="tabData.relationOrderId" class="ml-15px"
          >关联订单单号：{{ tabData.relationOrderId }}</span
        >
        <span v-if="tabData.relationType" class="ml-15px"
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
        <template v-if="column.dataIndex == 'serialNo'">
          <div>
            <div>
              <span>{{ record.periodDays }}天账期</span>
              <span>{{ record.price }}元</span>
            </div>
            <div class="pt-5px">x{{ record.goodsCount }}</div>
          </div>
        </template>
        <!--售后数量-->
        <template v-if="column.dataIndex == 'goodsCount'">
          <div>{{ record.goodsCount }}</div>
        </template>
        <!--退款金额-->
        <template v-if="column.dataIndex == 'price'">
          <div>{{ record.payAmountTotal }}元</div>
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
        <!--生成商-->
        <template v-if="column.dataIndex == 'supplierName'">
          <div>{{ record.supplierName }}</div>
          <div>{{ record.supplierPhone }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'order_status'">
          <div>{{ tabData.statusName }}</div>
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
    // 退换货详情
    router.push({
      path: '/OrderModule/supplierOrder/afterDetails',
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
