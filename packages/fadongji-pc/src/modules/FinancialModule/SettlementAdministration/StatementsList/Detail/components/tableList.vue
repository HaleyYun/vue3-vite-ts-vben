<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span
          >订单：<a @click="goOrderDetail">{{ format(tabData.id) }}</a></span
        >
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="dataSource"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'goods'">
          <div v-if="type != 12" class="title ellipsis-2">
            <a-tooltip :title="record.goodsName">
              {{ record.goodsName }}
            </a-tooltip>
          </div>
          <div v-else>
            <div v-for="(item, index) of record.goodsDetail" :key="index + 'goods'">
              <a-tooltip :title="item.goodsName">
                {{ item.goodsName }}
              </a-tooltip>
              <a-divider v-if="index <record.goodsDetail.length-1" />
            </div>
          </div>
        </template>
        <!--单价-->
        <template v-if="column.dataIndex == 'unit_price'">
          <div v-if="type != 12">
            <div>
              <!--isCash true 现金，false账期-->
              <span v-if="record.periodDays != 0">{{ record.periodDays }}天账期</span>
              <span>{{ record.originalPrice }}元</span>
            </div>
            <div class="pt-5px">x{{ record.goodsCount }}</div>
          </div>
          <div>
            <div v-for="(item, index) of record.goodsDetail" :key="index + 'goodsCount'">
              <div>
                <!--isCash true 现金，false账期-->
                <span v-if="item.periodDays != 0">{{ item.periodDays }}天账期</span>
                <span>{{ item.originalPrice }}元</span>
              </div>
              <div class="pt-5px">x{{ item.goodsCount }}</div>
              <a-divider v-if="index <record.goodsDetail.length-1" />
            </div>
          </div>
        </template>
        <!--金额-->
        <template v-if="column.dataIndex == 'amount'">
          <div>{{ tabData.goodsAmount}}元</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'shopName'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'buyerName'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'statusName'">
          <div>{{ tabData.statusName }}</div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
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
  const dataSource = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }
  // 订单详情
  const goOrderDetail = () => {
    if (props.type == 11) {
      // 销售订单
      router.push({
        path: '/OrderModule/repairShopOrder/purchaseDetails',
        query: { id: props.tabData.id },
      })
    } else if (props.type == 12) {
      // 投资订单
      switch (props.tabData.buyerPlatCode) {
        case 'agent':
          // 供应商投资订单
          router.push({
            path: '/OrderModule/agentOrder/agentInvestDetails',
            query: { id: props.tabData.id },
          })
          break
        case 'garage':
          // 服务商投资订单
          router.push({
            path: '/OrderModule/agentOrder/agentInvestDetails',
            query: { id: props.tabData.id },
          })
          break
      }
    } else if (props.type == 13) {
      // 旧机订单
      router.push({
        path: '/OrderModule/oldSecondOrder/oldMachineDetails',
        query: {
          id: props.tabData.id,
        },
      })
    }
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = 1;
      if (props.type == 12) {
        dataSource.value = val['childrenList']

      } else {
        dataSource.value = val['goodsDetail']
      }
      length = dataSource.value && dataSource.value.length ? dataSource.value.length : 0
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
