<template>
  <div class="m-24px">
    <div>
      <div class="p-24px bg-white mb-24px pb-4px">
        <OnTheFilterForm @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
      </div>
      <div class="bg-white p-24px">
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <a-button
              type="primary"
              v-auth="'/v1/goods/goods/audit'"
              :disabled="selectedRow.length == 0"
              class="margin-l-r-10"
              @click="BadReviewFailed"
            >
              批量审核
            </a-button>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :row-selection="rowSelection"
            :rowKey="(record) => record.id"
            :pagination="false"
            size="small"
            :scroll="{ x: 1200 }"
            @change="handleTableChange"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'availableNumber'">
                <template v-if="record.role === 2">
                  <a v-if="record.availableNumber" @click="showNumber(record)"> {{ record.availableNumber }}</a>
                  <span v-else>--</span>
                </template>
                <template v-else>
                  <a v-if="record.availableNumber" @click="showAvailable(record)">
                    {{ record.availableNumber }}
                  </a>
                  <span v-else>--</span>
                </template>
              </template>
              <template v-if="column.dataIndex === 'questionAndContent'">
                <div class="rich-column">
                  <div class="rich-resource">
                    <FileUrlPrase :file-url="record.fileUrl" />
                  </div>
                  <div class="rich-content"> [{{ record.title }}] {{ record.content }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'platformService'">
                <div v-if="activeKey == 'four' || activeKey == 'five' || activeKey == 'seven'">
                  <a>
                    {{ transferFee('platform', record.shareProfitInfo) }}
                  </a>
                  <span class="text-green-500">
                    <EditOutlined
                      style="color: #08a225; font-size: 16px; margin-left: 5px"
                      @click="editFeeHandler(record)"
                    />
                  </span>
                </div>
                <div v-else>
                  <span>--</span>
                </div>
              </template>
              <!--价格-->
              <template v-if="column.dataIndex == 'cashPrice'">
                {{ record.cashPrice }}元
                <div v-if="record.accountPeriodDays != 0">
                  {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                </div>
              </template>
              <template v-if="column.dataIndex === 'nickNameAndMobile'">
                <div class="rich-column">
                  <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'shopName'">
                <div>
                  <div class="rich-content">{{ record.shopName }}</div>
                  <div class="rich-content">{{ record.shopMobile }}</div>
                </div>
              </template>
              <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
              <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
              <template v-if="column.dataIndex === 'status'">
                <span v-if="record.status === 2 && record.violationStatus === 2">待审核</span>
                <span v-else-if="record.status === 3">审核不通过</span>
                <span v-else-if="record.violationStatus === 1 && record.status === 4"
                  >违规下架</span
                >
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <AButton
                  type="link"
                  v-auth="'/v1/goods/goods/audit'"
                  :disabled="record.status === 3"
                  @click="viewDetailsFunc(record)"
                  >去审核
                </AButton>
                <AButton
                  type="link"
                  v-auth="'/v1/goods/goods/query/reason'"
                  @click="viewDetail(record)"
                  >查看原因
                </AButton>
                <AButton type="link" v-auth="'/v1/goods/goods'" @click="viewDetailsFunc(record)"
                  >查看详情
                </AButton>
              </template>
            </template>
          </ATable>
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
    <a-modal v-model:visible="reasonModal.visible" :width="572" title="下架原因" :footer="null">
      <div class="p-24px">
        <p>商品名称：{{ reasonModal.goodsName }}</p>
        <p>下架原因：{{ reasonModal.reason ? reasonModal.reason : '--' }}</p>
      </div>
    </a-modal>
    <!--库存-->
    <stockModel ref="inventory"></stockModel>
    <!--库存-->
    <InventoryModel ref="operationModel" />
    <!--违规审核弹出框-->
    <AuditModal v-model:visible="showBadReviewModal" @change="AuditSubmit" />
    <!-- 平台付费 -->
    <FeeModel
      v-if="operateRow"
      :id="operateRow.id"
      :cashPrice="operateRow.cashPrice"
      :shareProfitInfo="operateRow.shareProfitInfo"
      v-model:visible="feeVisible"
      @success="loadTableData"
    />
  </div>
</template>
<script setup name="goodsOfIllegalOnTheShelves" lang="ts">
  import { onBeforeMount, reactive, ref, watch } from 'vue'
  import InventoryModel from '/@/modules/GoodsModule/GoodsManage/component/inventoryModel.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { OnTheFiterColumns } from '/@/modules/GoodsModule/GoodsManage/view/GoodsOfIllegalOnTheShelves/data/OnTheFiterColumns'
  import adminHttp from '/@/utils/http/adminHttp'
  import OnTheFilterForm from '/@/modules/GoodsModule/GoodsManage/view/GoodsOfIllegalOnTheShelves/components/OnTheFilterForm.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import AuditModal from '/@/modules/components/GoodsAuditModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { useRouter } from 'vue-router'
  import { EditOutlined } from '@ant-design/icons-vue'
  import FeeModel from '../GoodsServiceProvider/components/FeeModel.vue'
  import stockModel from '/@/modules/GoodsModule/GoodsManage/component/stockModel.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const operateRow = ref<any>(null)
  const feeVisible = ref(false)
  const go = useRouter()
  const activeKey = ref('one')

  const { createMessage } = useMessage()
  // 库存信息
  const inventory = ref()
  const operationModel = ref()
  // 获取库存详情
  const showAvailable = (record) => {
    console.log(inventory, record)
    inventory.value.showModal(record.id, record.name)
  }
  const showNumber = (record) => {
    console.log(operationModel, record)
    operationModel.value.showModal(record.id as string, record.name)
  }
  // 修改“运营类别”的
  let tableData = ref([])

  //驳回
  const reasonModal = reactive({
    visible: false,
    goodsName: '',
    reason: '',
  })
  // let commodityStatus = <any>ref()
  // let commodity = <any>ref()
  // let commodityDescription = <any>ref()
  //查看详情 /v1/goods/goods/{id}
  const viewDetailsFunc = (record) => {
    console.log(record, '查看详情')
    go.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: {
        id: record.id,
        code: record.role,
        violationStatus: 'violation'
      },
    })
  }
  // 查看原因
  const viewDetail = async (record) => {
    try {
      const { code, data } = await adminHttp.GOODS.goodsGoodsQueryReason({ id: record.id })
      if (code === '20001') {
        reasonModal.goodsName = record.name
        reasonModal.reason = data
        reasonModal.visible = true
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 批量审核违规商品
  const selectedRow = ref([])

  // 全选
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows) => {
      selectedRow.value = selectedRows
    },
    getCheckboxProps: (record) => ({
      disabled: record.status === 3, // Column configuration not to be checked
    }),
  }
  const showBadReviewModal = ref(false)
  const BadReviewFailed = () => {
    showBadReviewModal.value = true
  }
  const AuditSubmit = async (data) => {
    let audits: any = []
    audits = selectedRow.value.map((item: any) => {
      return { id: item.id, violationType: item.violationType }
    })
    try {
      const { code } = await adminHttp.goodsGoodsViolationAudit({
        audits: audits,
        flag: data.flag,
        reason: data.reason ? data.reason : undefined,
      })
      if (code === '20001') {
        createMessage.success('操作成功')
        showBadReviewModal.value = false
      }
    } catch (e) {
      createMessage.error('操作失败')
    }
  }

  const filterData = ref({
    orderProperty: 'update_time',
    orderType: 'DESC',
  })
  const handlerFilterRest = () => {
    filterData.value = {
      orderProperty: 'update_time',
      orderType: 'DESC',
    }
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = {
      ...values,
      categoryId: values.categoryId ? values.categoryId[1] : '',
    }
    loadTableData()
  }

  // table 列
  const tabColumns = ref(OnTheFiterColumns)
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
    await loadTableData()
  })

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    filterData.value.orderProperty = sorter.field
    if (sorter.field == 'brandName') {
      filterData.value.orderProperty = 'brand_id'
    }
    if (sorter.field == 'shopName') {
      filterData.value.orderProperty = 'shop_id'
    }
    if (sorter.field == 'cashPrice') {
      filterData.value.orderProperty = 'cash_price'
    }
    if (sorter.field == 'updateTime') {
      filterData.value.orderProperty = 'update_time'
    }
    filterData.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'

    loadTableData()
  }
  //初始
  // const statusAttrs = { one: 0, two: 1, three: 4, four: 4 }
  // const violationAttrs = { one: 0, two: 3, three: 3, four: 1 }
  // 违规商品上架 1、违规的商品人家又提交审核了状态是【2，2】，2、违规的商品审核不通过【3，1】
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      violationStatusList: [1, 2],
      statusList:
        filterData.value && filterData.value.statusList ? [filterData.value.statusList] : [2, 3],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { records, total } = await adminHttp
      .goodsGoodsQueryListPage(clearObjectUnalbeAttr(filterParams))
      .then((res) => {
        //res?.data?.records)
        if (res && res.data && res.data.records) {
          return res.data
        } else {
          return {
            records: [],
            total: 0,
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        console.log(`获取服务商列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
    console.log(tableData.value, '列表****列表')
  }
  const editFeeHandler = (row) => {
    operateRow.value = row
    nextTick(() => {
      feeVisible.value = true
    })
  }

  const transferFee = (key, list) => {
    if (!Array.isArray(list)) {
      return 0
    }
    const target = list.find((item) => {
      return item.key === key
    })
    if (target) {
      return +target.value
    }
    return 0
  }
  onBeforeMount(() => {
    loadTableData()
  })
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }

  .table-list {
    .table-list-title {
      display: flex;
      padding: 10px;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
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
</style>
