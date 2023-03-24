<template>
  <div>
    <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span class="font-bold">订单：{{ format(tabData.id) }}</span>
        <span class="ml-25px">下单时间：{{ tabData.createTime }}</span>

        <span v-if="tabData.isValet" class="order-tag ml-16px">代下单</span>
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
        <!--商品信息-->
        <template v-if="column.dataIndex == 'id'">
          <div>{{ record.goodsName }}</div>
        </template>
        <!--单价/数量 -->
        <template v-if="column.dataIndex == 'columnName'">
          <div>
            <div>{{ record.originalPrice }}元</div>
            <div>*{{ record.goodsCount }}</div>
          </div>
        </template>
        <!--金额-->
        <template v-if="column.dataIndex == 'isEnable'">
          <div v-if="tabData.isCash">
            <template v-if="record.payPrice === 0">{{
              record.payPrice * record.goodsCount
            }}</template>
            <template v-else>
              <div>在线支付</div>
              <div>{{ record.payPrice * record.goodsCount }}元</div>
            </template>
          </div>
          <div v-else>
            <template v-if="record.payPrice === 0">{{
              record.payPrice * record.goodsCount
            }}</template>
            <template v-else>
              <div>账期支付</div>
              <div>{{ record.payPrice * record.goodsCount }}元</div>
            </template>
          </div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'sort'">
          <div>{{ tabData.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'editorNickName'">
          <div>{{ tabData.buyerName }}</div>
        </template>
        <!--发货仓库-->
        <template v-if="column.dataIndex == 'updateTime'">
          <div>{{ tabData.warehouseName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'creator'">
          <div>
            <a v-if="tabData.isWarn" class="order-tag ml-16px">催</a>{{ tabData.statusName }}
          </div>
        </template>
        <!--操作-->
        <template v-if="column.dataIndex == 'operation'">
          <div v-if="tabData.statusName === '待付款'" class="ant-system__red">
            <ReminTime :nextStageTime="tabData.nextStageTime"></ReminTime>
          </div>
          <div>
            <AButton v-auth="'/v1/order/sell'" type="link" @click="goDetails(tabData)"
              >详情</AButton
            >
            <AButton
              type="link"
              v-auth="'/v1/order/sell/warn/log'"
              v-if="tabData.isWarn"
              @click="remindDelivery(tabData)"
            >
              提醒发货记录
            </AButton>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <RemindModal
    v-model:deliveryVisible="deliveryVisible"
    :remindDeliveryList="remindDeliveryList"
    :predictDeliveryTime="predictDeliveryTime"
  />
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, defineEmits, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import ReminTime from '/@/modules/components/RemainTime.vue'
  import RemindModal from '/@/modules/OrderModule/component/RemindModal/RemindModal.vue'
  import { getTableColumns } from '../data/SaleContainerData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  // import { VoUtils } from '@vocen/shar

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
  const emit = defineEmits(['updateTable'])

  const tableCoumns = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }
  // 提醒发货
  const deliveryVisible = ref(false)
  const predictDeliveryTime = ref('')
  const remindDeliveryList = ref([])
  const remindDelivery = (record) => {
    deliveryVisible.value = true
    console.log(record)
    predictDeliveryTime.value = record.predictDeliveryTime
    getDeliveryData(record.id)
  }
  const getDeliveryData = async (id) => {
    try {
      const { code, data } = await adminHttp.ORDER.orderSellWarnLog({ id: id })
      if (code === '20001') {
        remindDeliveryList.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 详情页面
  const goDetails = (record) => {
    console.log(record, 'record')
    router.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: {
        id: record.id,
        shopPlatformCode: 'supplier',
      },
    })
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = 1
      tableCoumns.value = getTableColumns(length)
    //   console.log(tableCoumns.value, length)
    },
    { immediate: true },
  )
</script>

<style scoped lang="less">
  .orderTable {
    border-top: 1px solid #f0f0f0;
    text-align: left;
    .orderHead {
      background: #fafafa;
    }
  }
</style>
