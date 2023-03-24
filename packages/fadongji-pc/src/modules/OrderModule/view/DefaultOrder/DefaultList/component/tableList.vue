<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span
          >订单：<a>{{ format(tabData.id) }}</a>
        </span>
        <span class="ml-25px">下单时间：{{ tabData.createTime }}</span>
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="tabData['goodsDetailDTOS']"
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
              <div>{{ record.periodDays }}天账期</div>
              <div>{{ record.payPrice }}元<span class="pt-5px">x{{ record.goodsCount }}</span></div>
            </div>

          </div>
        </template>
        <!-- 金额 -->
        <template v-if="column.dataIndex == 'amount_of'">
          <div>{{ tabData.orderAmount }}元</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'shopName'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'buyers'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--应还款日期-->
        <template v-if="column.dataIndex == 'repayment'">
          <div>{{ tabData.expireTime }}</div>
        </template>
        <!--预期天数-->
        <template v-if="column.dataIndex == 'expectDay'">
          <div>{{ tabData.daysOverdue }}天</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'statusName'">
          <span v-if="tabData.status === 1">已逾期</span>
          <span v-if="tabData.status === 2">已还款 </span>
          <span v-if="tabData.status === 3">待还款</span>
        </template>
        <!--操作-->
        <template v-if="column.dataIndex == 'operation'">
          <span v-if="tabData.status === 2">
            <AButton v-auth="'/v1/order/assign/query/detail'" type="link" @click="goDetails()">还款明细</AButton>
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <AModal v-model:visible="detailedVisible" :footer="null" width="1000px" title="还款明细">
    <div class="p-5">
      <ATable :dataSource="detailedData" :columns="handleColumns" bordered :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'periodDays'">
            <div>
              <span>{{ record.periodDays }}天账期</span>
              <span>{{ record.payPrice }}元</span>
            </div>
          </template>
          <template v-if="column.dataIndex === 'repaymentAmount'">
            <div>
              <span>{{ record.repaymentAmount }}元</span>
            </div>
          </template>
        </template>
      </ATable>
      <div class="flex justify-center pt-15px">
        <AButton type="primary" @click="handleOk">关闭</AButton>
      </div>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch } from 'vue'
  import { getTableColumns } from '../data/DefaultContainerData'
  import { useRouter } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  const detailedVisible = ref<boolean>(false)
  let detailedData = ref([])
  //还款明细
  const goDetails = async () => {
    detailedVisible.value = true
    const data = await adminHttp.ORDER.orderAssignQueryDetail({
      id: props.tabData.id,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
    detailedData.value = data
    // console.log(data, 'res.data')
  }
  const handleColumns = [
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商品价格',
      dataIndex: 'periodDays',
      width: '280px',
    },
    {
      title: '还款数量',
      dataIndex: 'goodsCount',
    },
    {
      title: '还款金额',
      dataIndex: 'repaymentAmount',
    },
    {
      title: '还款时间',
      dataIndex: 'updateTime',
    },
  ]
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
      let length =
        val['goodsDetailDTOS'] && val['goodsDetailDTOS'].length ? val['goodsDetailDTOS'].length : 0
      tableCoumns.value = getTableColumns(length)
      console.log(tableCoumns.value, length)
    },
    { immediate: true },
  )
  //ok
  const handleOk = () => {
    detailedVisible.value = false
  }
</script>

<style scoped lang="less">
  .orderTable {
    border-top: 1px solid #f0f0f0;
    .orderHead {
      background: #fafafa;
    }
  }
</style>
