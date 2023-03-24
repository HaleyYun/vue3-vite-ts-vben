<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span class="font-bold">订单号：{{ format(tabData.id) }}</span>
        <span class="ml-25px">下单时间：{{ tabData.createTime }}</span>
      </div>
    </div>
    <a-table :pagination="false" :showHeader="false" :columns="tableCoumns" :data-source="tabData['goodsDetail']" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'goodsDetail'">
          <span v-if="record.level">
            {{ record.level }}类
            <a-divider style="border-color: #999" type="vertical" />
          </span>
          <span>{{ record.goodsName }}</span>
        </template>
        <template v-if="column.dataIndex === 'originalPrice'">
          <div>{{ record.originalPrice }}元 <span>*{{ record.goodsCount }}</span></div>
        </template>
        <template v-if="column.dataIndex === 'payAmount'">
          <div >
            <div>{{ tabData.payType }}</div>
            <div>{{ tabData.payAmount }}元</div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'shopName'">
          <div >
            <div>{{ tabData['shopName'] }}</div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'buyerName'">
          <div >
            <div>{{ tabData['buyerName'] }}</div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'statusName'">
          <div >
            <span class="warn" v-if="tabData.isWarn&&tabData.status === 1320">催</span>
            <div :class="tabData.status === 1310 ? 'text-red-500' : ''"
            >{{ tabData['statusName'] }}
            </div>
            <div
                    v-if="tabData.status === 1310 "
                    class="countDownStyle"
            >
              <ReminTime :nextStageTime="tabData.nextStageTime"></ReminTime>
            </div>
          </div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <!-- 已认证 -->
          <div>
              <a v-auth="'/v1/order/old'" @click="goDetails(tabData)">详情</a>
              <a-divider v-if="tabData.status === 1320 && tabData.isWarn" type="vertical" />
              <a v-auth="'/v1/order/old/warn/log'" v-if="tabData.isWarn &&tabData.status === 1320" @click="remindDelivery(tabData)">提醒发货记录</a>
          </div>
        </template>
      </template>
    </a-table>

  </div>
  <AModal
          v-model:visible="deliveryVisible"
          title="提醒发货记录"
          centered
          :footer="null"
          :width="572"
          destroy-on-close
  >
    <div class="padding-24 max-h-70vh overflow-y-auto">
      <div class="mb-10px">订单承诺发货时间：{{ predictDeliveryTime }}前发货</div>
      <ATable :dataSource="remindDeliveryList" :columns="DeliveryTableColumn" />
    </div>
  </AModal>

</template>

<script lang="ts" setup>
  import { ref, defineProps, watch,defineEmits,reactive } from 'vue'
  import { getOldAssignTableColumn,DeliveryTableColumn } from '../data/OldAssignData'
  import { useRouter } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import {doorTime} from '/@/utils/dateUtil'
  import {message} from 'ant-design-vue'
  import ReminTime from '/@/modules/components/RemainTime.vue'

  let detailedData = ref([])

  // --------公用参数---------------

  const props = defineProps({
    tabData: {
      type: Object,
      default: {},
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
    predictDeliveryTime.value = record.predictDeliveryTime
    getDeliveryData(record.id)
  }
  const getDeliveryData = async (id) => {
    try {
      const { code, data } = await adminHttp.ORDER.orderOldWarnLogBy$OrderId({ orderId: id })
      if (code === '20001') {
        remindDeliveryList.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }


  const getStayTime = (nextStageTime) => {
    let time = new Date(nextStageTime).getTime()
    console.log(time)
    return time
  }

  const rowClassName = () => {
    return 'relative'
  }
  // 订单详情
  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/oldSecondOrder/oldMachineDetails',
      query: {
        id: record.id,
      },
    })
  }


  watch(
    () => props.tabData,
    (val) => {
      let length = val['goodsDetail'] &&val['goodsDetail'].length ? val['goodsDetail'].length : 1
      tableCoumns.value = getOldAssignTableColumn(length)
      console.log(props.tabData['goodsDetail'], length)
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
