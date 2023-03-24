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
                        <th class="th-item" style="flex: 3">商品详情</th>
                        <th class="th-item flex-1">单价(元)/数量</th>
                        <th class="th-item flex-1">售后数量</th>
                        <th class="th-item flex-1">退换货金额（元）</th>
                        <th class="th-item flex-1">供应商</th>
                        <th class="th-item flex-1">购买人信息</th>
                        <th class="th-item flex-1">退票状态</th>
                        <th class="th-item flex-1">操作</th>
                      </tr>
                    </tbody>
                  </table>
                  <div v-for="(item, index) in list" :key="index" class="order-body">
                    <table class="body_top">
                      <tbody>
                        <div class="body_top_con">
                          <div class="top_con_shop">
                            <span class="top_con_num ml-4">订单号：{{ item.id }}</span
                            >&nbsp;&nbsp;&nbsp;
                            <span class="top_con_time">下单时间：{{ item.create_time }}</span>
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
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/OrderModule/view/SupplierOrder/SalesOrder/data/SaleContainerData'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { filterSalesStatisticsForm } from '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialProcessRefund/components/SalesStatisticsData'

  const { createMessage } = useMessage()
  const go = useGo()

  const [registerForm] = useForm({
    labelWidth: 120,
    schemas: filterSalesStatisticsForm,
  })
  const goDetails = () => {
    go(PageEnum.ORDER_DETAILS)
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
  //communityContentQuestionGetOne
  //communityContentIdeaDetail
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
        const currentRow = tableData.value((item) => item.id === detailModal.currentId)[0]
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
  const list = [
    {
      create_time: '2021-01-27 14:17:06',
      id: '16117282260421',
      postage: '0.00',
      shop_name: '手机专卖店',
      status: 1,
      total_payment: '444.00',
      salesQuantity: '200',
      returnAndExchange: '1200',
      supplier: '江南制造总局',
      buyerInformation: '长葛姜天龙',
      goods: [
        {
          goodsAttr: [
            {
              attrName: '选择颜色',
              attrValue: '亮黑色',
            },
            {
              attrName: '选择颜色',
              attrValue: '2亮黑色',
            },
          ],
          goods_id: 1609983892472866,
          img: 'http://120.76.98.119:1224/upload/shop/9438863192/20210107/160998902823.jpg',
          num: 1,
          price: '444.00',
          text: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成',
        },
      ],
    },
    {
      create_time: '2021-01-22 16:27:36',
      id: 16113040562157,
      postage: '0.00',
      shop_name: '梅友人',
      status: 1,
      total_payment: '283666.00',
      salesQuantity: '100',
      returnAndExchange: '100',
      supplier: '上海左班汽车零部件',
      buyerInformation: '长葛姜天龙',
      goods: [
        {
          goodsAttr: [
            {
              attrName: '选择颜色',
              attrValue: '亮黑色',
            },
            {
              attrName: '运行内存',
              attrValue: '8GB',
            },
            {
              attrName: '机身存储',
              attrValue: '512GB',
            },
          ],
          goods_id: 1609914198055593,
          img: 'http://120.76.98.119:1224/upload/shop/8936718382/20210106/16099141986.jpg',
          num: 5,
          price: '39995.00',
          text: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成',
        },
        {
          goodsAttr: [
            {
              attrName: '选择颜色',
              attrValue: '迷雾金',
            },
            {
              attrName: '运行内存',
              attrValue: '12GB',
            },
            {
              attrName: '机身存储',
              attrValue: '512GB',
            },
          ],
          goods_id: 1609984862086794,
          img: 'http://120.76.98.119:1224/upload/shop/8936718382/20210107/160998486230.jpg',
          num: 3,
          price: '27897.00',
          text: '适用EA211 EA111 速腾1.4T明锐EA113宝来新捷达大众朗逸1.6发动机总成 ',
        },
      ],
    },
  ]
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
