<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />

    <div class="mx-24px mt-72px mb-24px">
      <div class="bg-white p-24px pb-4px mb-24px">
        <ServiceFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <AButton
              type="primary"
              v-auth="'/v1/goods/goods/status/update'"
              v-if="activeKey === 'two'"
              :disabled="selectedRow.length === 0"
              @click="batchShelvesDialog"
              >批量下架
            </AButton>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :loading="tableLoading"
            :rowKey="(record) => record.id"
            :row-selection="rowSelection"
            :columns="getFiterColumns(activeKey)"
            :data-source="tableData"
            :pagination="false"
            size="small"
            :scroll="{ x: 1200 }"
            @change="handleTableChange"
            bordered
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'questionAndContent'">
                <div class="rich-column">
                  <div class="rich-resource">
                    <FileUrlPrase :file-url="record.fileUrl" />
                  </div>
                  <div class="rich-content"> [{{ record.title }}] {{ record.content }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'label'">
                <div class="py-2px" v-for="(item, index) in record.labelMap" :key="index">
                  <a-tag  color="#1890ff">{{ item ==='质保时长'? record.warrantyDays +'个月'+'质保时长' : item}}</a-tag>
                </div>
              </template>
              <!--价格-->
              <template v-if="column.dataIndex === 'cashPrice'">
                {{ record.cashPrice }}元
                <div v-if="record.accountPeriodDays !== 0">
                  {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                </div>
              </template>
              <template v-if="column.dataIndex === 'availableNumber'">
                <a v-if="record.availableNumber" @click="showAvailable(record)">
                  {{ record.availableNumber }}
                </a>
                <span v-else>--</span>
              </template>
              <!-- 平台服务费		-->
              <template v-if="column.dataIndex === 'platformFee'">
                <a>
                  {{ transferFee('platform', record.shareProfitInfo) }}
                </a>
                <span class="text-green-500">
                  <EditOutlined
                    style="color: #08a225; font-size: 16px; margin-left: 5px"
                    @click="editFeeHandler(record)"
                  />
                </span>
              </template>
              <!-- 推荐费		-->
              <template v-if="column.dataIndex === 'recommendFee'">
                <a>
                  {{ transferFee('recommender', record.shareProfitInfo) }}
                </a>
                <span class="text-green-500">
                  <EditOutlined
                    style="color: #08a225; font-size: 16px; margin-left: 5px"
                    @click="editFeeHandler(record)"
                  />
                </span>
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
                <span>
                  {{ statusText[record.status + ',' + record.violationStatus] }}
                </span>
              </template>

              <template v-if="column.dataIndex === 'operation'">
                <!-- 违规下架 -->
                <template v-if="record.status === 1 && record.violationStatus === 3">
                  <APopconfirm
                    title="确认下架？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="takeItDownEvent(record)"
                  >
                    <AButton type="link" v-auth="'/v1/goods/goods/status/update'">下架</AButton>
                  </APopconfirm>
                  <AButton
                    type="link"
                    v-auth="'/v1/goods/goods/violation'"
                    @click="handlerAccessRow(record)"
                    >违规下架
                  </AButton>
                </template>
                <template v-if="record.status === 4 && record.violationStatus === 3">
                  <APopconfirm
                    title="确认上架？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="shelvesEvent(record)"
                  >
                    <AButton type="link" v-auth="'/v1/goods/goods/status/update'">上架</AButton>
                  </APopconfirm>
                </template>
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
    <AModal
      v-model:visible="brandModal.visible"
      :title="brandModal.title"
      centered
      destroy-on-close
      :confirm-loading="brandModal.confirmLoading"
      @ok="BrandsAdd"
      @cancel="BrandsCancel"
    >
      <div class="p-5">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          autocomplete="off"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 20 }"
        >
          <AFormItem label="商品名称">
            <span>{{ brandModal.name }}</span>
          </AFormItem>
          <AFormItem label="选择违规类型" name="radioGroup">
            <a-radio-group v-model:value="formState['radioGroup']" @change="formRadio($event)">
              <a-radio value="1">全网违规</a-radio>
              <a-radio value="2">独立违规</a-radio>
            </a-radio-group>
          </AFormItem>
          <AFormItem label="具体违规说明" class="text-current" name="replyValue">
            <ATextarea
              v-model:value="formState.replyValue"
              placeholder="请填写具体违规说明"
              :rows="6"
            />
          </AFormItem>
        </AForm>
      </div>
    </AModal>

    <AModal
      title="查看原因"
      :zIndex="1002"
      centered
      v-model:visible="checkModal.visible"
      :footer="null"
      :confirm-loading="checkModal.confirmLoading"
    >
      <div class="padding-10">
        <a-textarea
          v-model:value="checkModal.rejectReason"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          show-count:maxlength="100"
        />

        <div class="text-center">
          <AButton @click="shutDown">关闭</AButton>
        </div>
      </div>
    </AModal>
    <!--库存-->
    <InventoryModel ref="inventory" />
    <!--批量下架-->
    <ShelevesModal v-model:visible="shelevesVisible" @change="shelevesChange" />

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
<script setup name="goodsServiceProviderList" lang="ts">
  import { nextTick, onBeforeMount, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { getFiterColumns } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/ServiceFiterColumns'
  import ShelevesModal from '/@/modules/GoodsModule/GoodsManage/component/ShelvesModal.vue'
  import InventoryModel from '/@/modules/GoodsModule/GoodsManage/component/inventoryModel.vue'
  import ServiceFilterForm from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/components/ServiceFilterForm.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter, useRoute } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { EditOutlined } from '@ant-design/icons-vue'
  import FeeModel from './components/FeeModel.vue'

  const operateRow = ref<any>(null)
  const feeVisible = ref(false)
  const go = useRouter()
  const route = useRoute()
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部商品' },
    { key: 'two', name: '在售', totalCount: 0 },
    { key: 'three', name: '待售', totalCount: 0 },
    { key: 'four', name: '违规', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    loadTableData()
  }
  const getGoodsGoodsListCount = async () => {
    try {
      const filterCount = { shopId: route.query?.shopId }
      const { code, data } = await adminHttp.GOODS.goodsGoodsAgentListCount(filterCount)
      if (code === '20001') {
        tabsList.value[1]['totalCount'] = data.onSale
        tabsList.value[2]['totalCount'] = data.waitingSale
        tabsList.value[3]['totalCount'] = data.violated
      }
    } catch (e) {}
  }

  const { createMessage } = useMessage()

  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'

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

  // 全选
  const selectedRow = ref<any>([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      selectedRow.value = selectedRowKeys
    },
  }
  // ---批量下架--------
  const shelevesVisible = ref(false)
  const batchShelvesDialog = () => {
    shelevesVisible.value = true
  }
  //批量下架确认框
  const shelevesChange = (reason) => {
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: selectedRow.value,
        status: 4,
        violationStatus: 3,
        reason: reason,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        shelevesVisible.value = false
        selectedRow.value = []
        initData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

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
        role: 'supplier',
      },
    })
  }
  // 库存信息
  const inventory = ref()
  // 获取库存详情
  const showAvailable = (record) => {
    console.log(inventory, record)
    inventory.value.showModal(record.id, record.name)
  }

  //违规审核弹窗状态
  const brandModal = reactive({
    visible: false,
    title: '审核详情',
    confirmLoading: false,
    id: '',
    name: '',
  })
  const formRef = ref<any | undefined>()

  interface FormState {
    replyValue: string
    radioGroup: any
  }

  const formState = reactive<FormState>({
    replyValue: '',
    radioGroup: '',
  })
  //审核确认框
  const BrandsAdd = () => {
    formRef.value.validate().then((res) => {
      console.log(res, 'success')
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      // /v1/goods/brand/apply/audit
      adminHttp
        .goodsGoodsViolation({
          id: brandModal.id,
          type: formState.radioGroup,
          reason: formState.replyValue,
        })
        .then(() => {
          initData()
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          brandModal.visible = false
        })
        .catch((err) => {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
        })
    })
  }
  //审核框取消
  const BrandsCancel = () => {
    brandModal.visible = false
  }

  //上架
  const shelvesEvent = (record) => {
    console.log(record, '上架')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: [record.id],
        status: 1,
        violationStatus: record.violationStatus,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        initData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //下架
  const takeItDownEvent = (record) => {
    console.log(record, '下架')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: [record.id],
        status: 4,
        violationStatus: record.violationStatus,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        initData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //违规下架/v1/goods/goods/violation
  const handlerAccessRow = (record) => {
    console.log(record, '违规下架')
    formState.replyValue = ''
    formState.radioGroup = ''
    brandModal.name = record.name
    brandModal.id = record.id
    brandModal.visible = true
  }

  const checkModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  const filterData = ref<any>({
    orderProperty: 'update_time',
    orderType: 'DESC',
  })
  const handlerFilterRest = () => {
    filterData.value = { orderProperty: 'update_time', orderType: 'DESC' }
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
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    filterData.value.orderProperty = sorter.field
    if (sorter.field === 'brandName') {
      filterData.value.orderProperty = 'brand_id'
    }
    if (sorter.field === 'shopName') {
      filterData.value.orderProperty = 'shop_id'
    }
    if (sorter.field === 'cashPrice') {
      filterData.value.orderProperty = 'cash_price'
    }
    if (sorter.field === 'updateTime') {
      filterData.value.orderProperty = 'update_time'
    }
    if (sorter.order) {
      filterData.value.orderType = sorter.order === 'ascend' ? 'ASC' : 'DESC'
    } else {
      filterData.value.orderType = undefined
      filterData.value.orderProperty = undefined
    }
    nextTick(() => {
      loadTableData()
    })
  }
  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始
  //初始
  const statusAttrs = { two: [1], three: [4] }
  const violationAttrs = { two: [3], three: [3], four: [1, 2] }
  const statusText = {
    '1,3': '在售',
    '4,3': '待售',
    '1,2': '违规',
    '4,1': '违规',
    '4,2': '违规',
    '3,1': '违规',
    '2,2': '违规',
  }
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
      statusList: activeKey.value === 'one' ? undefined : statusAttrs[activeKey.value],
      //违规状态 1：已违规  2：违规审核 3：未违规
      violationStatusList: activeKey.value === 'one' ? undefined : violationAttrs[activeKey.value],
      shopId:
        filterData.value && filterData.value.shopId ? filterData.value.shopId : route.query?.shopId,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      role: 2,
    }
    const { records, total } = await adminHttp
      .goodsGoodsQueryListPage(filterParams)
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
    await getGoodsGoodsListCount()
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }
  const initData = () => {
    // getGoodsGoodsListCount()
    loadTableData()
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
