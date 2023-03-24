<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span
          >订单：<a>{{ format(tabData.id) }}</a></span
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
        <!--单价-->
        <template v-if="column.dataIndex == 'unit_price'">
          <div>
            <div>
              <span v-if="record.periodDays != '0'">{{ record.periodDays }}天账期</span>
              <span>{{ record.payPrice }}元</span>
            </div>
            <div class="pt-5px">x{{ record.goodsCount }}</div>
          </div>
        </template>
        <!--售后数量-->
        <template v-if="column.dataIndex === 'After_number'">
          <div>{{ record.goodsCount }}</div>
        </template>
        <!-- 金额 -->
        <template v-if="column.dataIndex === 'amount_of'">
          <div>{{ tabData.payAmount }}元</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex === 'shopName'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex === 'buyers'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex === 'statusName'">
          <div>{{ tabData.statusName }}</div>
        </template>
        <!--操作-->
        <template v-if="column.dataIndex === 'operation'">
          <AButton type="link" @click="goDetails(tabData)">详情</AButton>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch } from 'vue'
  import { getTableColumns } from '../data/configuration'
  import { useRouter } from 'vue-router'
  // --------公用参数---------------
  const router = useRouter() // 路由跳转函数

  const props = defineProps({
    tabData: {
      type: Object,
      default: {},
    },
    type: {
      type: Number,
      default: 11,
    },
  })
  //详情
  const goDetails = (tabData) => {
    if (tabData.type === 11) {
      router.push({
        path: '/OrderModule/repairShopOrder/purchaseDetails',
        query: { id: tabData.id },
      })
    } else {
      router.push({
        path: '/OrderModule/agentOrder/agentInvestDetails',
        query: { id: tabData.id },
      })
    }
  }

  const tableCoumns = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = val['goodsList'] && val['goodsList'].length ? val['goodsList'].length : 0
      tableCoumns.value = getTableColumns(length)
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
