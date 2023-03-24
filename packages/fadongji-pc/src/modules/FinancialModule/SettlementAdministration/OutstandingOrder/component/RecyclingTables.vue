<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span>服务单号：{{ format(tabData.id) }}</span>
        <span class="ml-30px">下单时间：{{ tabData.createTime }}</span>
        <span class="ml-30px">关联订单：{{ tabData.relationOrderId }}</span>
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="[tabData]"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'goods'">
          <div class="title ellipsis-2">
            <a-tooltip :title="record.supportName">
              {{ record.supportName }}
            </a-tooltip>
          </div>
        </template>
        <!--服务价格-->
        <template v-if="column.dataIndex == 'service_price'">
          <div>
            <div>
              <span>{{ tabData.supportAmount }}元</span>
            </div>
          </div>
        </template>
        <!--上门时间-->
        <template v-if="column.dataIndex == 'door_time'">
          <div
            >{{ tabData.homeStartTime }}<br />
            {{ tabData.homeEndTime }}
          </div>
        </template>
        <!--修理厂-->
        <template v-if="column.dataIndex == 'garage'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--集师傅-->
        <template v-if="column.dataIndex == 'set_master'">
          <div>{{ tabData.orderTechnicianVO && tabData.orderTechnicianVO.masterName }}</div>
        </template>
        <!--回收公司-->
        <template v-if="column.dataIndex == 'recycling_company'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'order_statusStr'">
          <div :class="tabData.statusEvent == '待接单' ? 'text-red-500' : ''">{{
            tabData.statusEvent
          }}</div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <AButton
            v-auth="'/v1/order/recycle/detail'"
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
      path: '/OrderModule/repairShopOrder/recoveryDetails',
      query: { id: props.tabData.id },
    })
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = 1
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
