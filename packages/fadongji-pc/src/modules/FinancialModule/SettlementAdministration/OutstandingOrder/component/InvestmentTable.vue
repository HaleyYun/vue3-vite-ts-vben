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
      :data-source="tabData['childrenList']"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'goods'">
          <div class="title ellipsis-2" v-for="(item, index) of record['goodsDetail']">
            <a-tooltip :title="item.goodsName">
              {{ item.goodsName }}
            </a-tooltip>
            <a-divider v-if="index && index + 1 != record['goodsDetail'].length" />
          </div>
        </template>
        <!--单价-->
        <template v-if="column.dataIndex == 'Price_investment'">
          <div v-for="(item, index) of record['goodsDetail']">
            <div>
              <span v-if="!record.isCash">{{ item.periodDays }}天账期</span>
              <span>{{ item.payPrice }}元</span>
            </div>
            <div class="pt-5px">*{{ item.goodsCount }}</div>
            <a-divider v-if="index && index + 1 != record['goodsDetail'].length" />
          </div>
        </template>
        <!--金额-->
        <template v-if="column.dataIndex == 'amount_of'">
          <div>{{ record.isCash ? '在线支付' : '账期支付' }}</div>
          <div>{{ record.payAmount }}</div>
          <div v-if="tabData.isCash == 2">{{ getPeriodDays(tabData) }}前结算</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'seller'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'buyers'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--发货仓库-->
        <template v-if="column.dataIndex == 'delivery_warehouse'">
          <div>{{ tabData.warehouseName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'order_status'">
          <div>{{ tabData.statusName }}</div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <AButton
            v-auth="'/v1/order/invest'"
            type="link"
            size="small"
            @click="goOrderDetail(record)"
          >
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
  import { VoUtils } from '@vocen/shared'
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
    // 投资订单
    router.push({
      path: '/OrderModule/agentOrder/agentInvestDetails',
      query: { id: props.tabData.id },
    })
  }
  // 计算账期结算日期
  const getPeriodDays = (record) => {
    if (record.periodDays && record.createTime) {
      //console.log(timeFormat)
      let time = 1000 * 60 * 60 * 24 * record.periodDays
      let date = new Date(record.createTime).getTime()
      let createTime = VoUtils.timeFormat(time + date, 'yyyy-mm-dd hh:MM:ss')
      return createTime
    }
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = val['childrenList'] ? val['childrenList'].length : 0
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
