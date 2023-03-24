<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span>订单：{{ format(tabData.id) }}</span>
        <span class="ml-30px"
          >订单确认收货时间：{{
            tabData.confirmReceiptTime ? tabData.confirmReceiptTime : '--'
          }}</span
        >
        <span class="ml-30px">下单时间：{{ tabData.createTime }}</span>
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="tabData['goodsDetail']"
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
        <!--单价-->
        <template v-if="column.dataIndex == 'unit_price'">
          <div>
            <div>
              <span v-if="record.periodDays > 0">{{ record.periodDays }}天账期</span>
              <span>{{ record.payPrice }}元</span>
            </div>
            <div class="pt-5px">*{{ record.goodsCount }}</div>
          </div>
        </template>
        <!--金额-->
        <template v-if="column.dataIndex == 'amount_of'">
          <div>{{ tabData.payAmount }}</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'seller'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'buyers'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'order_status'">
          <div>{{ tabData.statusName }}</div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <AButton v-auth="'/v1/order/old'" type="link" size="small" @click="goOrderDetail(record)">
            详情
          </AButton>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, defineProps, watch } from 'vue'
  import { getTableColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  // --------公用参数---------------
  const router = useRouter() // 路由跳转函数

  const props = defineProps({
    tabData: {
      type: Object,
      default: {},
    },
    activeKey: {
      type: String,
      default: '',
    },
  })

  const tableCoumns = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }
  // 订单详情
  const goOrderDetail = (record) => {
    router.push({
      path: '/OrderModule/oldSecondOrder/oldMachineDetails',
      query: { id: props.tabData.id },
    })
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = val['goodsDetail'] ? val['goodsDetail'].length : 0
      tableCoumns.value = getTableColumns(length, props.activeKey)
      console.log(tableCoumns.value, length)
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
