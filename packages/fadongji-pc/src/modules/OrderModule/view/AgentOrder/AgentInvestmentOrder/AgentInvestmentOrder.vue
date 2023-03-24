<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px">
    <div class="page-containner">
      <div class="filter-form">
        <!--<ProblemForm />-->
        <AgentInvestFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div v-if="activeKey==='one' || activeKey==='three' || activeKey==='four' || activeKey==='five'">
          <StatisticsCount
            :subscriptionAmount="subscriptionAmount"
            :orderCount="orderCount"
            :accountCash="accountCash"
            :accountingPeriod="accountingPeriod"
          />
        </div>
      <div class="custom-title-table p-24px bg-white">
        <EraTableTitle :total="paginations.total" />
        <a-table
          :pagination="false"
          :row-class-name="rowClassName"
          :scroll="{ x: 1200 }"
          :columns="tabColumns"
          :data-source="tableData"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'goodsDetail'">
              <div
                  class="absolute -left-1px  -right-1px top-0 z-200 h-56px bg-white"
                ></div>
                <div class="absolute flex items-center left-0px right-0px top-16px z-200 h-56px bg-gray-100">
                <div class="flex bg-gray-100 px-20" v-if="record.status === 1210">
                  <div class="flex">
                    <div class="font-bold">订单号：</div>
                    <div class="font-bold">{{ record.id }}</div>
                  </div>
                  <div class="flex ml-50px">
                    <div>下单时间：</div>
                    <div>{{ record.createTime }}</div>
                  </div>
                  <div class="flex ml-50px">
                    <div>订单金额：</div>
                    <div>{{ record.goodsAmount }}</div>
                  </div>
                  <div class="flex ml-50px">
                    <div>订单状态：</div>
                    <div>{{ record.statusName }}</div>
                  </div>
                </div>
                <div>
                  <div v-for="(item, index) of record.childrenList" :key="index + 'childrenList'">
                    <div class="flex bg-gray-100 px-20">
                      <div class="flex">
                        <div>订单号：</div>
                        <div>{{ item.id }}</div>
                      </div>
                      <div class="flex ml-50px">
                        <div>下单时间：</div>
                        <div>{{ item.createTime }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pt-72px">
                <div
                  v-for="(childrenItem, index) of record.childrenList"
                  :key="index + 'childrenList'"
                >
                  <div
                    v-for="(item, index) of childrenItem.goodsDetail"
                    :key="index + 'goodsDetail'"
                  >
                    <span>{{ item.goodsName }}</span>
                    <a-divider v-if="index + 1 != childrenItem.goodsDetail.length" />
                  </div>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'originalPrice'">
              <div class="pt-72px">
                <div
                  v-for="(childrenItem, index) of record.childrenList"
                  :key="index + 'childrenList'"
                >
                  <div
                    v-for="(item, index) of childrenItem.goodsDetail"
                    :key="index + 'goodsDetail'"
                  >
                    <div v-if="item.periodDays != 0">
                      <div>
                        {{ item.periodDays }}天账期{{ item.originalPrice }}元
                        <span>*{{ item.goodsCount }}</span></div>
                        <div v-if="record['statusName'] === '待发货'"> 
                          <span v-if="(item.goodsCount-item.deliveryCount)>0"><span class="text-red-600">{{ item.goodsCount - item.deliveryCount }}件未发货</span></span>
                        </div>
                    </div>
                    <div v-else>
                      <div
                        >{{ item.originalPrice }}元<span>*{{ item.goodsCount }}</span></div
                      >
                      <div v-if="record['statusName'] === '待发货'"> 
                          <span v-if="(item.goodsCount-item.deliveryCount)>0"><span class="text-red-600">{{ item.goodsCount - item.deliveryCount }}件未发货</span></span>
                        </div>
                    </div>
                    <a-divider v-if="index + 1 != childrenItem.goodsDetail.length" />
                  </div>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'payAmount'">
              <div class="pt-72px">
                <div
                  v-for="(childrenItem, index) of record.childrenList"
                  :key="index + 'childrenList'"
                >
                  <div
                    v-for="(item, index) of childrenItem.goodsDetail"
                    :key="index + 'goodsDetail'"
                  >
                    <div v-if="childrenItem.isCash">
                      <div
                        ><span>现金支付</span>{{ (item.payPrice * item.goodsCount).toFixed(2) }}元
                      </div>
                    </div>
                    <div v-else>
                      <div
                        ><span>账期支付</span>{{ (item.payPrice * item.goodsCount).toFixed(2) }}元
                      </div>
                    </div>
                    <a-divider v-if="index + 1 != childrenItem.goodsDetail.length" />
                  </div>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'shopName'">
              <div class="pt-72px">
                <div>{{ record['shopName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'buyerName'">
              <div class="pt-72px">
                <div>{{ record['buyerName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'warehouse'">
              <div class="pt-72px">
                <div>{{ record['warehouseName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'statusName'">
              <div class="pt-72px">
                <div
                  v-for="(childrenItem, index) of record.childrenList"
                  :key="index + 'childrenList'"
                >
                  <span
                    class="warn text-red-600"
                    v-if="childrenItem.isWarn && record.status === 1220"
                    >催</span
                  >
                </div>
                <div>{{ record['statusName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!-- 已认证 -->
              <div class="pt-72px">
                <div v-if="record.status === 1210" class="countDownStyle">
                  <ReminTime :nextStageTime="record.nextStageTime" />
                </div>
                <a-space>
                  <a @click="goDetails(record)" v-auth="'/v1/order/invest'">详情</a>
                  <div
                    v-for="(childrenItem, index) of record.childrenList"
                    :key="index + 'childrenList'"
                  >
                    <a
                      v-if="childrenItem.isWarn && record.status === 1220"
                      v-auth="'/v1/order/sell/warn/log'"
                      @click="remindDelivery(record)"
                      >提醒发货记录</a
                    >
                  </div>
                </a-space>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  <RemindModal
    v-model:deliveryVisible="deliveryVisible"
    :remindDeliveryList="remindDeliveryList"
    :predictDeliveryTime="predictDeliveryTime"
  />
 </div>
</template>

<script setup name="agentInvestmentOrder" lang="ts">
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { reactive, ref, watch, onBeforeMount } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter, useRoute } from 'vue-router'
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import AgentInvestFilterForm from '/@/modules/OrderModule/view/AgentOrder/AgentInvestmentOrder/component/AgentInvestFilterForm.vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import ReminTime from '/@/modules/components/RemainTime.vue'
  import RemindModal from '/@/modules/OrderModule/component/RemindModal/RemindModal.vue'
  import { containerConfig } from '/@/modules/OrderModule/view/AgentOrder/AgentInvestmentOrder/data/AgentInvestContainerData'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import StatisticsCount from '../../../component/StatisticsCount/StatisticsCount.vue'
  const { createMessage } = useMessage()

  /*   --- 服务商 列表模型 */
  const listModel = {
    shopPlatformCode: 'agent',
    orderStatus: 0,
  }
  const tabData = ref({})

  const go = useRouter()
  const route = useRoute()
  const goDetails = (record) => {
    console.log(record, 'record')

    go.push({
      path: '/OrderModule/agentOrder/agentInvestDetails',
      query: {
        id: record.id,
      },
    })
  }
  const loadingCtxkey = 'handlerRow'
 // 统计
 const subscriptionAmount = ref('1')
  const orderCount = ref('2')
  const accountCash = ref('3')
  const accountingPeriod = ref('4')
   //统计
   const statisticsStatus = async() => {
    const filterStatus = {
      ...filterData.value,
      orderStatus: statusAttrs[activeKey.value],
      shopPlatformCode: 'agent',
      isPayed: statusAttrs[activeKey.value] === 0 ? 'true' : '',
    }
    if (filterStatus.time) {
      filterStatus.orderStartTime = filterStatus.time[0] + ' 00:00:00'
      filterStatus.orderEndTime = filterStatus.time[1] + ' 23:59:59'
    }
    if (filterStatus.areaCode) {
      filterStatus.area = filterStatus.areaCode[2]
    } 
    const { data } = await adminHttp.orderInvestListStatistics(clearObjectUnalbeAttr(filterStatus))
    subscriptionAmount.value = data.orderTotalAmount
    orderCount.value = data.orderCount
    accountCash.value = data.cashTotalAmount
    accountingPeriod.value = data.creditAmount
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

  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
  const activeKey = ref('one')
  const tabsList = ref([
    {
      key: 'one',
      name: '全部订单',
      totalCount: 0,
    },
    { key: 'two', name: '待付款', totalCount: 0 },
    { key: 'three', name: '待发货', totalCount: 0 },
    { key: 'four', name: '待收货', totalCount: 0 },
    { key: 'five', name: '已完成', totalCount: 0 },
    { key: 'six', name: '已取消', totalCount: 0 },
    { key: 'seven', name: '已关闭', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10
    loadTableData()
  }

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = values
    paginations.current = 1
    loadTableData()
  }

  // table 列
  const tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  watch(activeKey, async () => {
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    loadTableData()
  })

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  const statusAttrs = {
    one: 0,
    two: 1210,
    three: 1220,
    four: 1230,
    five: 1240,
    six: 1250,
    seven: 1260,
  }
  const loadTableData = async () => {
    await handlerStatus()
    await statisticsStatus()
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      orderStatus: statusAttrs[activeKey.value],
      shopPlatformCode: 'agent',
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    if (filterParams.time) {
      filterParams.orderStartTime = filterParams.time[0] + ' 00:00:00'
      filterParams.orderEndTime = filterParams.time[1] + ' 23:59:59'
    }
    if (filterParams.areaCode) {
      filterParams.area = filterParams.areaCode[2]
    }
    const { records, total } = await adminHttp.Order.orderInvestQueryList(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取订单列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          loadTableData()
        }
    paginations.total = total
    tableData.value = records
  }
  const investEnumStatusEvent = async () => {
    const res = await adminHttp.Order.investEnumStatus()
    if (res.code == '20001') {
      tabData.value = res.data
      // res.data.forEach((item, index) => {
      //   console.log(item, 'ITEWMITWEM')
      // })
    } else {
      createMessage.error({ content: '选项卡请ds求失败', key: loadingCtxkey })
    }
  }

  const list = ref([])

  // stone 2 - 切换选项卡
  const tabsEvent = async (item) => {
    listModel.orderStatus = item
    await investEnumStatusEvent()
  }

  const handlerStatus = async () => {
    const { data } = await adminHttp.orderInvestStatusCount({ shopPlatformCode: 'agent' })
    tabsList.value = [
      {
        key: 'one',
        name: '全部订单',
        totalCount:
          parseInt(data[1210]) +
          parseInt(data[1220]) +
          parseInt(data[1230]) +
          parseInt(data[1240]) +
          parseInt(data[1250]) +
          parseInt(data[1260]),
      },
      { key: 'two', name: '待付款', totalCount: data[1210] },
      { key: 'three', name: '待发货', totalCount: data[1220] },
      { key: 'four', name: '待收货', totalCount: data[1230] },
      { key: 'five', name: '已完成', totalCount: data[1240] },
      { key: 'six', name: '已取消', totalCount: data[1250] },
      { key: 'seven', name: '已关闭', totalCount: data[1260] },
    ]
  }
  onMountedOrActivated(() => {
    // 统计那里跳转的
    if (route.query.shopId) {
      filterData.value = {
        ...filterData.value,
        isPayed: true,
        buyerId: route.query.shopId,
        brandId: route.query.brandId,
        goodsName: route.query.goodsName,
      }
    } else if (route.query.buyerId) {
      filterData.value = {
        ...filterData.value,
        isPayed: true,
        buyerId: route.query.buyerId,
        brandId: route.query.brandId,
        goodsName: route.query.goodsName,
      }
    }
    investEnumStatusEvent()
    loadTableData()
  })
  const rowClassName = () => {
    return 'relative'
  }
</script>
<style lang="less">
  .custom-title-table {
    .ant-table-tbody > tr > td {
      position: static;
    }
  }
</style>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 0 10px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }

  .rich-column {
    display: flex;

    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
    }

    .rich-content {
    }
  }

  .show-row {
    margin-bottom: 10px;

    &__label {
      color: #555;
    }

    &__content {
      color: #000;
    }
  }

  td,
  th {
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    vertical-align: top;
    text-align: center;
  }

  ::v-deep(.table-inner-space) {
    padding: 0 !important;
  }

  // 表格数据
  .order-body {
    .body_top {
      width: 100%;

      .body_top_con {
        margin-top: 10px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        width: 100%;
        // padding: 10px;
        display: flex;
        justify-content: space-between;
      }
    }

    .body_content {
      display: flex;
      // 商品信息
      .body_content_info {
        // flex-grow: 2;
        // width: 436px;
        border-top: unset;
      }

      //商品操作
      .body_content_handle {
        flex: 1;
        text-align: center;
        border-top: unset;
      }
    }
  }

  .order-head {
    width: 100%;
  }

  .info_list {
    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .info_box {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e5e5e5;

    &:last-child {
      border: none;
    }

    .info-item {
      padding: 10px 0;
    }
  }

  .goods_status {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .warn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1px 8px;
    width: 28px;
    height: 22px;
    font-size: 12px;
    color: #fff;
    background: #f86060;
    border-radius: 2px;
  }

  .countDownStyle {
    font-size: 14px;
    color: #f86060;
    display: flex;
    align-items: baseline;

    ::v-deep(.ant-statistic-content-value) {
      font-size: 14px;
      color: #f86060;
    }
  }
  ::v-deep(.ant-table-content) {
    overflow: visible !important;
  }
</style>
