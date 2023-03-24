<template>
  <div>
    <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <DoorFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div class="custom-title-table">
        <a-table
          :pagination="false"
          :row-class-name="rowClassName"
          :scroll="{ x: 1200 }"
          :columns="DoorTableColumn"
          :data-source="tableData"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'supportName'">
              <div
                class="absolute flex items-center left-0px px-20px right-0px top-0 z-99 h-40px bg-gray-200"
              >
                <div class="flex">
                  <div class="flex">
                    <div class="text-gray-600">订单号：</div>
                    <div>{{ record.id }}</div>
                  </div>
                  <div class="flex ml-50px">
                    <div class="text-gray-600">下单时间：</div>
                    <div>{{ record.createTime }}</div>
                  </div>
                  <div class="flex ml-50px">
                    <div class="text-gray-600">关联订单单号：</div>
                    <div class="text-blue-600"
                      ><a>{{ record.relationOrderId }}</a></div
                    >
                  </div>
                </div>
              </div>
              <div class="pt-40px">
                <span>{{ record.supportName }}</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'supportAmount'">
              <div class="pt-40px"> {{ record.supportAmount }} 元</div>
            </template>
            <template v-if="column.dataIndex === 'homeStartTime'">
              <div class="pt-40px">
                <div v-html="doorTime(record.homeStartTime, record.homeEndTime)"></div>
                <!--<div>{{ record.homeStartTime }}</div>-->
                <!--<div>{{record.homeEndTime}}</div>-->
              </div>
            </template>
            <template v-if="column.dataIndex === 'buyerName'">
              <div class="pt-40px">
                <div>{{ record['buyerName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'masterName'">
              <div class="pt-40px">
                <div>{{ record['masterName'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'orderAddress'">
              <div class="pt-40px">
                <div>{{ record['orderAddress']['address'] }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'statusName'">
              <div class="pt-40px">
                <div :class="record.status === 3130 ? 'text-red-500' : ''"
                  >{{ record['statusName'] }}
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <!-- 已认证 -->
              <div class="pt-40px">
                <template v-if="record.status === 3130">
                  <AButton
                    type="link"
                    v-auth="'/v1/order/assign/assign'"
                    @click="appointedOrder(record)"
                    >指派接单
                  </AButton>
                  <a-divider type="vertical" />
                  <AButton
                    type="link"
                    v-auth="'/v1/order/support/after/sale/cancel'"
                    @click="cancelOrder(record)"
                  >
                    取消订单
                  </AButton>
                  <br />
                  <AButton
                    type="link"
                    v-auth="'/v1/order/support/after/sale/update'"
                    @click="editOrder(record)"
                    >修改订单
                  </AButton>
                  <a-divider type="vertical" />
                </template>
                <AButton
                  type="link"
                  v-auth="'/v1/order/assign/assign'"
                  v-if="record.status === 3140"
                  @click="appointedOrder(record)"
                  >改派
                </AButton>
                <AButton
                  type="link"
                  v-auth="'/v1/order/support/after/sale/confirm'"
                  v-if="record.status === 3160"
                  @click="confirmCompletion(record)"
                  >确认完成
                </AButton>
                <a-divider
                  v-if="record.status === 3140 || record.status === 3160"
                  type="vertical"
                />
                <AButton
                  v-auth="'/v1/order/support/after/sale/detail'"
                  type="link"
                  @click="goDetails(record)"
                  >详情
                </AButton>
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
    <AssignedModal v-model:orderInfo="assignedInfo" @updateData="loadTableData" />
    <EditOrderModal v-model:orderInfo="editOrderInfo" @updateData="loadTableData" />
  </div>
  </div>
</template>

<script setup lang="ts">
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import DoorFilterForm from './component/DoorFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { ref, reactive, onBeforeMount, createVNode } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { DoorTableColumn } from './data/DoorAssignData'
  import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
  import EditOrderModal from './component/EditOrderModal/EditOrderModal.vue'
  import { doorTime } from '/@/utils/dateUtil'

  import { useRouter } from 'vue-router'
  import { Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  const go = useRouter()
  const rowClassName = () => {
    return 'relative'
  }
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/repairShopOrder/doorOrderDetails',
      query: {
        id: record.id,
      },
    })
  }

  //---确认安装完成------
  const confirmCompletion = (record) => {
    const modal = Modal.confirm({
      title: '确认完成',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认完成',
      content: '请确认该服务订单是否已完成？',
      async onOk() {
        // 调取完成的接口
        let params = { orderId: record.id }
        try {
          const { code, message } = await adminHttp.ORDER.orderSupportAfterSaleConfirm(params)
          if (code === '20001') {
            createMessage.success('操作成功')
            await initStatistic()
          } else {
            createMessage.error(message)
          }
        } catch (e) {
          console.log(e)
        }
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  // ---取消订单-------
  const cancelOrder = (record) => {
    const modal = Modal.confirm({
      title: '取消订单',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认取消',
      cancelText: '我再想想',
      content: '请确认是否取消该服务订单？',
      onOk() {
        // 调取完成的接口
        AfterSaleCancel(record.id)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const AfterSaleCancel = async (id) => {
    // orderSupportAfterSaleCancel
    try {
      const { code } = await adminHttp.ORDER.orderSupportAfterSaleCancel({ orderId: id })
      if (code === '20001') {
        createMessage.success('操作成功')
        loadTableData()
      }
    } catch (e) {
      createMessage.success(e.message)
    }
  }
  //---指派接单------
  const assignedInfo = reactive({
    id: null,
    supportType: null,
    homeStartTime: null,
    homeEndTime: null,
    assignVisible: false,
    areaCode: null,
  })
  const appointedOrder = (record) => {
    assignedInfo.id = record.id
    assignedInfo.areaCode = record.orderAddress.areaCode
    assignedInfo.supportType = record.supportType
    assignedInfo.homeStartTime = record.homeStartTime
    assignedInfo.homeEndTime = record.homeEndTime
    assignedInfo.assignVisible = true
    console.log(assignedInfo.assignVisible)
  }
  //------ 修改订单 --------
  const editOrderInfo = reactive({
    id: null,
    buyerId: null,
    relationOrderId: null,
    modelId: null,
    engineNo: null,
    buyerName: null,
    assignVisible: false,
  })
  const editOrder = (record) => {
    editOrderInfo.id = record.id
    editOrderInfo.buyerId = record.buyerId
    editOrderInfo.relationOrderId = record.relationOrderId
    editOrderInfo.modelId =
      record.engineDetail && record.engineDetail.modelId ? record.engineDetail.modelName : null
    editOrderInfo.engineNo = record.engineNo
    editOrderInfo.buyerName = record.buyerName
    editOrderInfo.assignVisible = true
  }

  //----- 加载列表数据 ---------
  let tableData = ref<any>([])
  const loadTableData = async () => {
    const filterParams = {
      ...filterData.value,
      orderStatus: Number(activeKey.value),
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    try {
      const { code, data } = await adminHttp.ORDER.orderSupportAfterSaleQueryPage(filterParams)
      console.log(tableData)
      if (code == '20001') {
        paginations.total = data.total
        // paginations.current = data.pages
        tableData.value = data.records
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length == 0) {
          paginations.current = paginations.current - 1
          await loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //------tabs页签配置-------
  const activeKey = ref(null)
  const tabsList = ref([])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }
  const initStatistic = async () => {
    try {
      const { code, data } = await adminHttp.ORDER.orderSupportAfterSaleCount()
      if (code === '20001') {
        tabsList.value = data.map((item) => {
          return { key: item.status, name: item.statusName, totalCount: item.count }
        })
        activeKey.value = data[0]['status']
        await loadTableData()
      }
    } catch (e) {
      console.log(e)
    }
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  //------ 分页查询 -----------------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  onMountedOrActivated(() => {
    // 初始化数据
    initStatistic()
  })
</script>
<style lang="less">
  .custom-title-table {
    .ant-table-tbody > tr > td {
      position: static;
    }
  }
</style>

<style lang="less" scoped>
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
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }
    }

    .body_content {
      display: flex;

      .body_content_info {
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
</style>
