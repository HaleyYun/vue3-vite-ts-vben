<template>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="bg-white p-24px pb-4px mb-24px">
        <!--<ProblemForm />-->
        <EvaluationFilterForm @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
      </div>

      <div class="bg-white p-24px">
        <!--<ProblemTable />-->
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit>
            <AButton
              v-auth="'/v1/order/evaluate/delete'"
              class="table-operations__button"
              :disabled="!hasSelected"
              @click="deleteAll()"
              >批量删除
            </AButton>

            <AButton
              v-auth="'/v1/order/evaluate/batch/modify'"
              type="primary"
              class="table-operations__button"
              :disabled="!hideSelected"
              @click="hideAll()"
              >批量隐藏
            </AButton>
          </template>
          <template #content>
            <div class="bg-white">
              <ATable
                :row-selection="{
                  selectedRowKeys: state.selectedRowKeys,
                  onChange: onSelectChange,
                }"
                :loading="tableLoading"
                :columns="tabColumns"
                :data-source="tableData"
                :pagination="false"
                :rowKey="(record) => record.id"
                :scroll="{ x: `${tabColumns.length}0%` }"
                size="small"
                bordered
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'shopInfo'">
                    <div>{{ record?.sellerInfoVO?.shopName }}</div>
                    <div>{{ record?.sellerInfoVO?.phoneNum }}</div>
                  </template>
                  <template v-if="column.dataIndex === 'starMark'">
                    <VoHeart :level="Math.ceil(record.starMark / 2)" :size="20" />
                  </template>
                  <template v-if="column.dataIndex === 'favorableComment'">
                    <span v-if="record.favorableComment >= 20">{{ record.favorableComment }}%</span>
                    <span v-else>-</span>
                  </template>
                  <template v-if="column.dataIndex === 'isEnable'">
                    <ASwitch
                      @change="stateEnable(record)"
                      :checked="record.display"
                      checked-children="开"
                      un-checked-children="关"
                    />
                  </template>
                  <template v-if="column.dataIndex === 'operation'">
                    <AButton
                      type="link"
                      v-auth="'/v1/order/evaluate/evaluate/Detail'"
                      class="submit-btn"
                      @click="seeBrand(record)"
                      >查看
                    </AButton>

                    <APopconfirm
                      title="确定要删除吗？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="handlerDeletedRow(record)"
                    >
                      <AButton type="link" v-auth="'/v1/order/evaluate/delete'">删除</AButton>
                    </APopconfirm>
                  </template>
                </template>
              </ATable>
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
  import { reactive, ref, computed } from 'vue'
  import EvaluationFilterForm from '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/component/EvaluationFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/data/EvaluationData'
  import { useMessage } from '/@/hooks/web/useMessage'
  import VoHeart from '/@/components/VoHeart/VoHeart.vue'
  import { useRouter } from 'vue-router'

  const { createMessage } = useMessage()
  const go = useRouter()
  const loadingCtxkey = 'handlerRow'
  //删除/v1/order/evaluate/delete
  const handlerDeletedRow = (item) => {
    // alert('删除===' + item)
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .orderEvaluateDelete({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values

    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
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

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始化/v1/order/evaluate/page
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      sourceType: 0,
    }
    const { data } = await adminHttp.orderEvaluatePage(clearObjectUnalbeAttr(filterParams))
    tableLoading.value = false
    paginations.total = data.total
    tableData.value = data.records
  }
  const state = reactive<{ selectedRowKeys: [] }>({
    selectedRowKeys: [], // Check here to configure the default column
  })
  //批量删除/v1/order/evaluate/batch/update
  const deleteAll = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .orderEvaluateBatchUpdate({ ids: state.selectedRowKeys })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })

    // alert('批量删除')
    state.selectedRowKeys = []
  }
  const hasSelected = computed(() => state.selectedRowKeys.length > 0)
  const onSelectChange = (selectedRowKeys: []) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  //批量隐藏
  // const state = reactive<{ selectedRowKeys: [] }>({
  //   selectedRowKeys: [], // Check here to configure the default column
  // })
  //批量隐藏/v1/order/evaluate/batch/modify
  const hideAll = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .orderEvaluateBatchModify({ ids: state.selectedRowKeys })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })

    // alert('批量删除')
    state.selectedRowKeys = []
  }
  const hideSelected = computed(() => state.selectedRowKeys.length > 0)
  // const onSelectChange = (selectedRowKeys: []) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys)
  //   state.selectedRowKeys = selectedRowKeys
  // }
  //启用状态/v1/order/evaluate/modify
  const stateEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      display: !record.display,
    }
    adminHttp
      .orderEvaluateModify(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //查看
  const seeBrand = (record) => {
    go.push({
      path: '/goodsManage/goods/goodsEvaluationDetail',
      query: {
        orderId: record.orderId,
        sourceId: record.sourceId,
        sourceType: record.sourceType,
      },
    })
  }
  loadTableData()
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

  .table-operations__button {
    margin: 10px;
  }
</style>
