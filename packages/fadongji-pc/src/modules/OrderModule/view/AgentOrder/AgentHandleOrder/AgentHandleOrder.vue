<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="page-containner">
      <div class="filter-form">
        <!--<ProblemForm />-->
        <HandleFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="page-container">
        <div class="pt-24px pl-24px">
          <EraTableTitle :total="paginations.total" />
        </div>
        <EraSwitchTable title="">
          <template #tableName>
          </template>
          <template #content>
            <div class="orderList">
              <div class="mx-24px w">
                <div class="orderList-table">
                  <table class="order-head">
                    <tbody>
                      <tr class="tr-header flex">
                        <th class="th-item" style="flex: 3">商品详情</th>
                        <th class="th-item flex-1">单价/数量</th>
                        <th class="th-item flex-1">售后数量</th>
                        <th class="th-item flex-1">退款金额</th>
                        <th class="th-item flex-1">卖家</th>
                        <th class="th-item flex-1">买家</th>
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
                            <span class="top_con_num ml-4 margin-r-20"
                              >订单号：{{ item.oriOrderId }}</span
                            >
                            <span class="top_con_time">申请时间：{{ item.createTime }}</span>
                            <span class="ml-50">关联订单单号：{{ item.oriOrderId }}</span>
                            <span class="ml-20">
                              售后类型：{{ item.isRefundOnly ? '仅退款' : '退货退款' }}</span
                            >
                            <!-- <span>店铺：{{ item.shop_name }}</span> -->
                          </div>
                        </div>
                        <table style="width: 100%">
                          <tbody>
                            <tr class="body_content">
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                style="flex: 3"
                                class="info_list"
                                >{{ item.goodsName }}</td
                              >
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle">
                               <div v-if="item.periodDays === 0">
                                  <div>{{item['payPrice'] }}元</div>
                                <div>*{{item['goodsCount'] }}</div>
                                </div>
                              <div v-else>
                                <div>{{item.periodDays}}天账期{{item['payPrice'] }}元</div>
                                <div>*{{item['goodsCount'] }}</div>
                              </div>
                                </td>
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                                >{{ item['refundGoodsCount'] }}</td
                              >
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                                >{{ item.amount }}</td
                              >
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                                >{{ item['shopName'] }}</td
                              >
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                                >{{ item['buyerName'] }}</td
                              >
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                              >
                                <template v-if="item.status === 2110">
                                  <span>待审核</span>
                                </template>
                                <template v-else-if="item.status === 2120">
                                  <span>待退货</span>
                                </template>
                                <template v-else-if="item.status === 2140">
                                  <span>待签收</span>
                                </template>
                                <template v-else-if="item.status === 2130">
                                  <span>待退款</span>
                                </template>
                                <template v-else-if="item.status === 2150">
                                  <span>已完成</span>
                                </template>
                                <template v-else-if="item.status === 2160">
                                  <span>已关闭</span>
                                </template>
                                <template v-else>
                                  <span>全部</span>
                                </template>
                                <!--status	integer-->
                                <!--非必须-->
                                <!--订单状态，2110：待审核，2120：待发货，2140：待签收，230:待退款,2150:已完成,2160:已关闭 0全部-->
                              </td>
                              <td
                                colspan=""
                                :rowspan="1"
                                headers=""
                                class="goods_status body_content_handle"
                              >
                                <div class="flex" style="flex-direction: column">
                                  <AButton
                                    type="link"
                                    v-auth="'/v1/order/refund/audit'"
                                    v-if="item.status === 2110"
                                    @click="goDetails(item)"
                                    >审核</AButton
                                  >
                                  <AButton
                                    type="link"
                                    v-auth="'/v1/order/refund/update/apply'"
                                    v-if="item.status === 2160 && item.isCanUpdateRefund"
                                    @click="goDetails(item)"
                                    >修改申请</AButton
                                  >
                                  <AButton
                                    type="link"
                                    v-auth="'/v1/order/refund/receipt'"
                                    v-if="item.status === 2140"
                                    @click="cancelActivation(item)"
                                  >
                                    确认收货
                                  </AButton>
                                  <AButton v-auth="'/v1/order/refund/detail'" type="link" @click="goDetails(item)">详情</AButton>
                                  <APopconfirm
                                    v-auth="'/v1/order/refund/refund'"
                                    v-if="item.status === 2130"
                                    title="手动退款，确定操作吗？"
                                    ok-text="确定"
                                    cancel-text="取消"
                                    @confirm="handlerAccessRowByModal(item)"
                                  >
                                  <AButton
                                    type="link"
                                    >手动退款
                                  </AButton>
                                  </APopconfirm>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
</template>

<script setup lang="ts">
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import { onMounted, reactive, ref, watch, createVNode,onBeforeMount } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import HandleFilterForm from '/@/modules/OrderModule/view/AgentOrder/AgentHandleOrder/component/HandleFilterForm.vue'
  import AfterFilterForm from '/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/component/AfterFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { containerConfig } from '/@/modules/OrderModule/view/AgentOrder/AgentHandleOrder/data/HandleContainerData'
  import { useRouter,useRoute } from 'vue-router'

  import { useMessage } from '/@/hooks/web/useMessage'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  let list = ref([])
  const go = useRouter()
  const route = useRoute()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/supplierOrder/afterDetails',
      query: {
        id: record.id,
        isCanUpdateRefund:record.isCanUpdateRefund,
      },
    })
  }
  const goVerify = () => {}
  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })

  /** easy action end **/

  /** reject action start **/
  const rejectModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  /** reject action end **/  

  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部', totalCount: 0 },
    { key: 'two', name: '仅退款', totalCount: 0 },
    { key: 'three', name: '退货退款', totalCount: 0 },
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
  })

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  //初始化
  const statusAttrs = { one: '', two: true, three: false }
  const loadTableData = async () => {
    await handlerStatus()
    tableLoading.value = true
    const filterParams = {
      isRefundOnly: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      type: 3,
      ...filterData.value,
      status: filterData.value?.status || 0,
    }
    if (filterParams.time) {
      filterParams.createStartTime = filterParams.time[0] + ' 00:00:00'
      filterParams.createEndTime = filterParams.time[1] + ' 23:59:59'
    }
    const { records, total } = await adminHttp.Order.orderRefundQueryPage(
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
    paginations.total = total
    tableData.value = records
  }
  const handlerStatus = async () => {
    const { data } = await adminHttp.Order.orderRefundQueryAmount({ type: 3, status: 0 })
    tabsList.value = [
      { key: 'one', name: '全部', totalCount: data.totalNum },
      { key: 'two', name: '仅退款', totalCount: data.refundNum },
      { key: 'three', name: '退货退款', totalCount: data.refundGoodsNum },
    ]
  }



  //确认收货
  const cancelActivation = (record) => {
    console.log(record, 'record')

    const modal = Modal.confirm({
      title: '是否到货',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '已收货',
      cancelText: '未收货',
      content: '您是否收到该订单商品？',
      onOk() {
        let params = { orderId: record.id }
        cancelDeactivate(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const cancelDeactivate = async (params) => {
    try {
      const { code, message } = await adminHttp.Order.orderRefundReceipt(params)
      if (code === '20001') {
        // 重新加载列表页面
        loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  //手动退款
  const handlerAccessRowByModal = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Order.orderRefundRefund({ orderId: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        //rest
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
      .finally(() => {
      })
  }
  onMountedOrActivated(()=>{
    // 统计那里跳转的
    if(route.query.shopId){
      filterData.value = {
        ... filterData.value,
        status:2150, // 已完成的状态
        shopId:route.query.shopId,
        brandId:route.query.brandId,
        type:3
      }
    
    }
    loadTableData()
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
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
    padding: 16px 0;
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
        margin-top: 16px;
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
  .tr-header{
    background: #F5F6F9;

  }
  .top_con_shop{
    height: 56px;
    line-height: 56px;
  }

</style>
