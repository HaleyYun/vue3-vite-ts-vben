<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px">
    <div class="page-containner">
      <div class="filter-form">
        <!--<ProblemForm />-->
        <PurchaseFilterForm
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
      <div class="page-container">
        <div class="pt-24px pl-24px">
          <EraTableTitle :total="paginations.total" />
        </div>
        <EraSwitchTable title="">
          <template #tableName>
          </template>
          <template #tableEdit>
            <!-- <ThinkOpForm /> -->
          </template>
          <template #content>
            <div class="orderList">
              <div class="mx-24px">
                <div class="orderList-table">
                  <table class="order-head">
                    <tbody>
                      <tr class="tr-header flex">
                        <th class="th-item" style="flex: 3">商品信息</th>
                        <th class="th-item flex-1">单价/数量</th>
                        <th class="th-item flex-1">货款金额</th>
                        <th class="th-item flex-1">卖家</th>
                        <th class="th-item flex-1">买家</th>
                        <th class="th-item flex-1">发货信息</th>
                        <th class="th-item flex-1">订单状态</th>
                        <th class="th-item flex-1">操作</th>
                      </tr>
                    </tbody>
                  </table>
                  <div v-for="(item, index) in tableData" :key="index" class="order-body">
                    <table class="body_top">
                      <tbody>
                        <div class="body_top_con">
                          <div class="top_con_shop">
                            <span class="top_con_num ml-4">订单号：{{ item.id }}</span>
                            <span class="top_con_time ml-4">下单时间：{{ item.createTime }}</span>
                            <span
                              v-if="item.isValet"
                              class="order-tag ml-16px">代下单</span
                            >
                            <span v-if="item.isConsignmentSale" class="ml-16px"
                              ><a-tag color="blue">寄售</a-tag></span
                            >
                          </div>
                        </div>
                      </tbody>
                    </table>
                    <table style="width: 100%">
                      <tbody>
                        <tr class="body_content">
                          <template v-for="(order, ind) in item.goodsDetail" :key="ind">
                            <td colspan="" rowspan="" headers="" style="flex: 3" class="info_list">
                              <div class="info-item">{{ order.goodsName }}</div>
                            </td>
                            <td
                              colspan=""
                              :rowspan="1"
                              headers=""
                              class="goods_status body_content_handle"
                            >
                              <div>
                                <div>{{ order.originalPrice }}元</div>
                                <div>*{{ order.goodsCount }}</div>
                              </div>
                            </td>
                            <td
                              colspan=""
                              :rowspan="1"
                              headers=""
                              class="goods_status body_content_handle"
                            >
                              <div v-if="item.isCash">
                                <template v-if="order.payPrice === 0"
                                  >{{ order.payPrice * order.goodsCount }}
                                </template>
                                <template v-else>
                                  <div>在线支付</div>
                                  <div>{{ order.payPrice * order.goodsCount }}元</div>
                                </template>
                              </div>
                              <div v-else>
                                <template v-if="order.payPrice === 0"
                                  >{{ order.payPrice * order.goodsCount }}
                                </template>
                                <template v-else>
                                  <div>账期支付</div>
                                  <div>{{ order.payPrice * order.goodsCount }}元</div>
                                </template>
                              </div>
                            </td>
                          </template>

                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.shopName }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.buyerName }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.warehouseName }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>
                              <a
                                v-if="item.isWarn"
                                class="border-solid mr-10px border-1 border-red-600 text-red-600"
                                >催</a
                              >{{ item.statusName }}
                            </div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div class="flex" style="flex-direction: column">
                              <div v-if="item.statusName === '待付款'" class="ant-system__red">
                                <ReminTime :nextStageTime="item.nextStageTime" />
                              </div>
                              <div>
                                <AButton
                                  v-auth="'/v1/order/sell'"
                                  type="link"
                                  @click="goDetails(item)"
                                  >详情</AButton
                                >
                                <AButton
                                  type="link"
                                  v-auth="'/v1/order/sell/warn/log'"
                                  v-if="item.isWarn"
                                  @click="remindDelivery(item)"
                                >
                                  提醒发货记录
                                </AButton>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #pagination>
            <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
            />
          </template>
        </EraSwitchTable>
      </div>
    </div>
  </div>
</div>
  <RemindModal
    v-model:deliveryVisible="deliveryVisible"
    :remindDeliveryList="remindDeliveryList"
    :predictDeliveryTime="predictDeliveryTime"
  />
</template>

<script setup lang="ts">
  import { reactive, ref, watch, onBeforeMount } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import PurchaseFilterForm from '/@/modules/OrderModule/view/RepairShopOrder/PurchaseOrder/component/PurchaseFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { FieldTimeOutlined } from '@ant-design/icons-vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import ReminTime from '/@/modules/components/RemainTime.vue'
  import RemindModal from '/@/modules/OrderModule/component/RemindModal/RemindModal.vue'
  import { containerConfig } from '/@/modules/OrderModule/view/RepairShopOrder/PurchaseOrder/data/PurchaseContainerData'
  import StatisticsCount from '../../../component/StatisticsCount/StatisticsCount.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')

    go.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: {
        id: record.id,
      },
    })
  }

  const loadingCtxkey = 'handlerRow'

  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
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
      isPayed: statusAttrs[activeKey.value] === 0 ? 'true' : '',
    }
    if (filterStatus.areaCode) {
      filterStatus.area = filterStatus.areaCode[2]
    }
    if (filterStatus.time) {
      filterStatus.orderStartTime = filterStatus.time[0] + ' 00:00:00'
      filterStatus.orderEndTime = filterStatus.time[1] + ' 23:59:59'
    }
    const { data } = await adminHttp.orderSellListStatistics(clearObjectUnalbeAttr(filterStatus))
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

  /** reject action end **/

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
    // loadTableData()
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
    two: 1110,
    three: 1120,
    four: 1130,
    five: 1140,
    six: 1150,
    seven: 1160,
  }
  const loadTableData = async () => {
    await handlerStatus()
    await statisticsStatus()
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      orderStatus: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    if (filterParams.areaCode) {
      filterParams.area = filterParams.areaCode[2]
    }
    if (filterParams.time) {
      filterParams.orderStartTime = filterParams.time[0] + ' 00:00:00'
      filterParams.orderEndTime = filterParams.time[1] + ' 23:59:59'
    }
    const { records, total } = await adminHttp
      .orderSellQueryList(clearObjectUnalbeAttr(filterParams))
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取供应商订单列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }
  const handlerStatus = async () => {
    const { data } = await adminHttp.orderSellStatusCount()
    tabsList.value = [
      {
        key: 'one',
        name: '全部订单',
        totalCount:
          parseInt(data[1110]) +
          parseInt(data[1120]) +
          parseInt(data[1130]) +
          parseInt(data[1140]) +
          parseInt(data[1150]) +
          parseInt(data[1160]),
      },
      { key: 'two', name: '待付款', totalCount: data[1110] },
      { key: 'three', name: '待发货', totalCount: data[1120] },
      { key: 'four', name: '待收货', totalCount: data[1130] },
      { key: 'five', name: '已完成', totalCount: data[1140] },
      { key: 'six', name: '已取消', totalCount: data[1150] },
      { key: 'seven', name: '已关闭', totalCount: data[1160] },
    ]
  }
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }


  .filter-form {
    background: #fff;
    margin-bottom: 24px;
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
        background: #F8F8F8;
        border: 1px solid #e5e5e5;
        width: 100%;
        height: 56px;
        padding-top: 16.5px;
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
</style>
