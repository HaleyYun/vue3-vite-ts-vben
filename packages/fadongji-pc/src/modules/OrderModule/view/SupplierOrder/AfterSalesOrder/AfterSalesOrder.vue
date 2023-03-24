<template>
<div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="page-containner">
      <div class="my-24px bg-white p-24px pb-4px">
        <!--<ProblemForm />-->
        <AfterFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
     <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div class="text-center min-h-150px">
        <div class="w-full flex text-center items-contents head-style">
          <div
            class="p-16px headItem"
            v-for="(item, index) of tableColumns"
            :key="index + 'order'"
            :style="{ width: item.width }"
          >
            {{ item.title }}
          </div>
        </div>
        <a-spin tip="加载中..." :spinning="tableLoading">
          <TableList
            v-for="(item, index) of tableData"
            :key="index + 'order'"
            :tab-data="item"
            @updateTable="loadTableData"
          />
          <a-empty class="pt-40px" v-if="!tableLoading && tableData.length == 0" />
        </a-spin>
      </div>
        <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, createVNode } from 'vue'

  import AfterFilterForm from '/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/component/AfterFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { useMessage } from '/@/hooks/web/useMessage'
  import TableList from './component/tableList.vue'
  import { useRouter } from 'vue-router'
  import { tableColumns } from './data/AfterContainerData'

  const { createMessage } = useMessage()

  const loadingCtxkey = 'handlerRow'
  const go = useRouter()
  const goDetails = (record) => {
    go.push({
      path: '/OrderModule/supplierOrder/afterDetails',
      query: {
        id: record.id,
        isCanUpdateRefund:record.isCanUpdateRefund
      },
    })
  }
  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })

  const handlerRejectRowByModal = () => {
    openRejectDialog(detailModal.vo)
  }

  // stone-1 列表数据 model
  const refundModel = {
    status: 0,
    type: 1,
  }

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
    console.log(activeKey.value,paginations)
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
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })


  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  const statusAttrs = { one: '', two: true, three: false }
  //初始化
  const loadTableData = async () => {
    await handlerStatus()
    tableLoading.value = true
    const filterParams = {
      isRefundOnly: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      type: 1,
      ...filterData.value,
      status: filterData.value?.status || 0,
    }
    if (filterParams.time) {
      filterParams.createStartTime = filterParams.time[0] + ' 00:00:00'
      filterParams.createEndTime = filterParams.time[1] + ' 23:59:59'
    }
    try {
      const {code, data } = await adminHttp.Order.orderRefundQueryPage(filterParams)
      if(code == '20001'){
        paginations.total = data.total
        tableData.value = data.records?data.records:[]
        console.log(paginations.total)
      }
    }catch (e) {
      createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
    } finally{
      tableLoading.value = false
    }



  }

  const handlerStatus = async () => {
    const { data } = await adminHttp.Order.orderRefundQueryAmount({ type: 1, status: 0 })
    tabsList.value = [
      { key: 'one', name: '全部', totalCount: data.totalNum },
      { key: 'two', name: '仅退款', totalCount: data.refundNum },
      { key: 'three', name: '退货退款', totalCount: data.refundGoodsNum },
    ]
  }
  loadTableData()
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

</script>

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
</style>
