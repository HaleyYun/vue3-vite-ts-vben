<template>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="bg-white p-24px pb-4px mb-24px">
        <BasicForm @register="register" @submit="handleSearchSubmit" @reset="handlerFilterRest" />
      </div>
      <div class="page-container p-24px">
        <EraTableTitle :total="total">
          <template #tableEdit>
            <a-button
              type="primary"
              v-auth="'/v1/goods/investment/update/status'"
              :disabled="selectedRow.length == 0"
              @click="openMultipleAuditDialog"
              >批量审核
            </a-button>
          </template>
        </EraTableTitle>
        <a-table
          :row-selection="rowSelection"
          :rowKey="(record) => record.id"
          :scroll="{ x: 1200 }"
          :loading="loading"
          :data-source="tableData"
          :pagination="false"
          :columns="violationsProjectToOnlineColumns"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
            <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
            <template v-if="column.dataIndex === 'violationStatus'">
              <a-tag v-if="record.status === 3">审核未通过</a-tag>
              <a-tag v-else>待审核</a-tag>
            </template>
            <template v-if="column.dataIndex === 'cashPrice'">
              <div>{{ record.cashPrice }}元</div>
              <div v-if="record.accountPeriodDays > 0"
                >{{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
              </div>
            </template>
            <template v-if="column.dataIndex === 'totalInvestment'">
              <div> {{ record.investmentNum || 0 }} / {{ record.totalInvestment }}</div>
            </template>
            <template v-if="column.dataIndex === 'shopName'">
              <div>
                <div>{{ record.shopName }}</div>
                <div>{{ record.shopMobile }}</div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-space>
                <a
                  v-auth="'/v1/goods/investment/update/status'"
                  v-if="record.status === 2 && record.violationStatus === 2"
                  @click="viewDetailsFunc(record)"
                  >去审核
                  <a-divider type="vertical" />
                </a>
                <a v-auth="'/v1/goods/investment/query/reason'" @click="checkHandler(record)"
                  >查看原因</a
                >
                <a-divider type="vertical" />
                <a v-auth="'/v1/goods/investment'" @click="viewDetailsFunc(record)">查看详情</a>
              </a-space>
            </template>
          </template>
        </a-table>
        <div class="p-10px text-right">
          <VoPagination
            :total="total"
            :current="paginations.pageNo"
            :page-size="paginations.pageSize"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </div>
    <AModal
      title="查看原因"
      :zIndex="1002"
      centered
      v-model:visible="checkModal.visible"
      :footer="null"
    >
      <div class="p-24px">
        <div class="pb-10px">项目名称：{{ checkModal.name ? checkModal.name : '无' }}</div>
        <div class="pb-20px">下架原因：{{ checkModal.reason ? checkModal.reason : '无' }}</div>
      </div>
    </AModal>
    <AuditModal v-model:visible="showAuditModal" @change="AuditSubmit" />
  </div>
</template>
<script setup lang="ts">
  import { ref, onBeforeMount, reactive } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  // @ts-ignore
  import { BasicForm, useForm } from '/@/components/Form/index'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import AuditModal from '/@/modules/components/GoodsAuditModal.vue'
  import {
    searchFormSchema,
    violationsProjectToOnlineColumns,
  } from './data/violationsProjectToOnlineData'

  import { useRouter } from 'vue-router'
  import AdminHttp from '../../../../../utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  const queryForm = ref<any>({
    orderProperty: 'update_time',
    orderType: 'DESC',
  })

  const checkModal = reactive({
    visible: false,
    reason: '',
    name: '',
  })

  const loading = ref(false)

  const total = ref(0)
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
  })
  const tableData = ref([])
  const go = useRouter()

  const checkHandler = async (record) => {
    const ret = await adminHttp.goodsInvestmentQueryReason({
      id: record.id,
    })
    checkModal.name = record.name
    checkModal.visible = true
    checkModal.reason = ret.data
  }

  const viewDetailsFunc = (record) => {
    go.push({
      path: '/goodsManage/goods/goodsInvestment',
      query: {
        id: record.id,
      },
    })
  }

  // 全选批量审核
  const selectedRow = ref<string[]>([])

  // 全选
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: []) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      selectedRow.value = selectedRowKeys
    },
    getCheckboxProps: (record) => ({
      disabled: record.status === 3, // Column configuration not to be checked
    }),
  }
  const showAuditModal = ref(false)
  const openMultipleAuditDialog = () => {
    showAuditModal.value = true
  }
  const AuditSubmit = async (data) => {
    let postData = {
      id: selectedRow.value,
      status: data.flag ? 3 : 4,
      reason: data.reason ? data.reason : undefined,
    }
    try {
      const { code, message } = await AdminHttp.goodsInvestmentUpdateStatus(postData)
      if (code === '20001') {
        createMessage.success('审核成功')
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const [register] = useForm({
    labelWidth: 120,
    schemas: searchFormSchema,
    fieldMapToTime: [['time', ['updateStartTime', 'updateEndTime'], 'YYYY-MM-DD HH:mm:ss']],
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8}, // 操作按钮外层 Col 组件配置，offset 偏移多少
    autoSubmitOnEnter: true,
  })

  // 分页“效果”
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    queryForm.value.orderProperty = sorter.field
    if (sorter.field == 'updateTime') {
      queryForm.value.orderProperty = 'update_time'
    }
    queryForm.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'
    loadTableData()
  }
  // 搜索触发
  const handleSearchSubmit = (val) => {
    console.log(val)
    queryForm.value = {
      ...val,
      shopId: val?.shopId,
      categoryId: val.categoryId ? val.categoryId[1] : '',
      warehouseId: val?.warehouseId,
    }
    loadTableData()
  }
  const handlerFilterRest = (val) => {
    queryForm.value = { orderProperty: 'update_time', orderType: 'DESC' }
    loadTableData()
  }

  const loadTableData = async () => {
    loading.value = true
    // 违规商品上架 1、违规的商品人家又提交审核了状态是【2，2】，2、违规的商品审核不通过【3，1】
    const { data } = await adminHttp.goodsInvestmentQueryListPage({
      ...queryForm.value,
      violationStatusList: [1, 2],
      ...paginations,
      statusList: queryForm.value?.statusList ? [queryForm.value.statusList] : [2, 3],
    })
    loading.value = false
    tableData.value = data.records
    total.value = data.total
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
