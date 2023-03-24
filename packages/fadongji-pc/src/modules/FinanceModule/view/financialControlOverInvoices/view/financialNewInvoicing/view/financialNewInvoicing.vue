<template>
  <div class="page-wrap">
    <div class="page-container">
      <div class="filter-form">
        <BasicForm @register="registerForm" />
      </div>
      <div class="page-container">
        <EraSwitchTable title="共有100条数据">
          <template #tableEdit> </template>
          <template #content>
            <div class="orderList">
              <div class="page-wrap w">
                <div class="orderList-table">
                  <table class="order-head">
                    <tbody>
                      <tr class="tr-header flex">
                        <th class="th-item" style="flex: 3">供应商</th>
                        <th class="th-item flex-1">供应商名称</th>
                        <th class="th-item flex-1">供应商联系方式</th>
                        <th class="th-item flex-1">发票名称</th>
                        <th class="th-item flex-1">发票订单量</th>
                        <th class="th-item flex-1">发票日期</th>
                        <th class="th-item flex-1">发票状态</th>
                        <th class="th-item flex-1">操作</th>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    v-for="(item, index) in financialNewInvoicingMock"
                    :key="index"
                    class="order-body"
                  >
                    <table class="body_top">
                      <tbody>
                        <div class="body_top_con">
                          <div class="top_con_shop">
                            <span class="top_con_num ml-4 margin-r-20">{{ item.create_time }}</span>
                            <span class="top_con_time margin-r-20">申请单号：{{ item.applicationNo }}</span>
                            <span class="top_con_time margin-r-20">发票类型：{{ item.invoiceType }}</span>
                            <span class="top_con_time margin-r-20"> 申请人：{{ item.applicant }}</span>
                            <span class="top_con_time"> 联系方式：{{ item.contact }}</span>
                          </div>
                        </div>
                      </tbody>
                    </table>
                    <table style="width: 100%">
                      <tbody>
                        <tr class="body_content">
                          <td colspan="" rowspan="" headers="" style="flex: 3" class="info_list">
                            <div v-for="(work, ind) in item.goods" :key="ind" class="info_box">
                              <div class="info-item">{{ work.text }}</div></div
                            >
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>2600元 x1</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.salesQuantity }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.returnAndExchange }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.supplier }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>{{ item.buyerInformation }}</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <div>待收货</div>
                          </td>
                          <td
                            colspan=""
                            :rowspan="1"
                            headers=""
                            class="goods_status body_content_handle"
                          >
                            <a type="primary" class="primary margin-r-10" @click="goDetails"
                              >查看详情</a
                            >
                            <a type="primary">去处理</a>
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
</template>

<script setup lang="ts">
  import { useForm, BasicForm } from '/@/components/Form'
  import { reactive, ref, watch } from 'vue'
  import { PageEnum } from '/@/enums/pageEnum'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/OrderModule/view/SupplierOrder/SalesOrder/data/SaleContainerData'
  import { filterNewInvoicingForm } from '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/data/financialNewInvoicingData'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { financialNewInvoicingMock } from '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/mock/financialNewInvoicingMock'
  import { useRouter } from 'vue-router'
  const { createMessage } = useMessage()
  const [registerForm] = useForm({
    labelWidth: 120,
    schemas: filterNewInvoicingForm,
  })
  const go = useRouter()
  const goDetails = () => {
    // go(PageEnum.INVOICING_DETAILS)
    // PageEnum.INVOICING_DETAILS
    go.push({
      path: PageEnum.INVOICING_DETAILS,
      params: {
        goodsParam: PageEnum.INVOICING_DETAILS,
        message: '当前开票状态',
        description: '当前开票状态：未开票',
        error: 'error',
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

  const handlerRejectRowByModal = () => {
    openRejectDialog(detailModal.vo)
  }

  const restDetailModel = () => {
    detailModal.currentId = ''
    detailModal.vo = {}
    detailModal.visible = false
  }
  const openDetailDialog = async (item) => {
    detailModal.title = '内容详情'
    detailModal.currentId = item.id

    adminHttp.COMMUNITY.communityContentIdeaDetail({ id: item.id }).then((res) => {
      console.log(res)
      detailModal.vo = res.data
      detailModal.visible = true
    })
  }

  const handlerAccessRowByModal = () => {
    detailModal.confirmLoading = true
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentQuestionApproved({ id: detailModal.currentId })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        const currentRow = tableData.value.filter((item) => item.id === detailModal.currentId)[0]
        currentRow.status = 1

        //rest
        restDetailModel()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
      .finally(() => {
        detailModal.confirmLoading = false
      })
  }

  /** detail modal end **/

  /** easy action start (access,deleted,disabled) **/
  const handlerAccessRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentQuestionApproved({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        item.status = 1
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  const handlerDeletedRow = (item) => {
    alert('删除===' + item)
  }
  const handlerDisabledRow = (item) => {
    alert('删除===' + item)
  }

  const showRejectReason = (item) => {
    alert('删除===' + item)
  }
  /** easy action end **/

  /** reject action start **/
  const rejectModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  const openRejectDialog = (item) => {
    rejectModal.currentItem = { ...item }
    rejectModal.currentId = item.id
    rejectModal.rejectReason = ''
    rejectModal.visible = true
  }

  const restRejectModal = () => {
    rejectModal.visible = false
    rejectModal.currentItem = null
    rejectModal.rejectReason = ''
  }
  const handlerRejectRow = () => {
    try {
      if (!rejectModal.rejectReason) {
        throw Error('拒绝内容必填')
      }
      rejectModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      adminHttp.COMMUNITY.communityContentQuestionReject({
        id: rejectModal.currentId,
        reason: rejectModal.rejectReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })

      const currentRow = tableData.value.filter((item) => item.id === rejectModal.currentId)[0]
      currentRow.status = 2

      //rest modal data
      restRejectModal()

      //rest
      restDetailModel()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      rejectModal.confirmLoading = false
    }
  }
  /** reject action end **/

  const activeKey = ref('one')

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = values
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

  const statusAttrs = { one: 0, two: 1, three: 2 }
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      status: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { records, total } = await adminHttp.COMMUNITY.communityContentQuestionCondition(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取销售订单列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }

  loadTableData()
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
</style>
