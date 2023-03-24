<template>
  <div class="padding-10 single-page-h">
    <div class="filter-bg padding-r-10">
      <BasicForm @register="registerForm" />
    </div>
    <div class='filter-bg padding-l-10 padding-r-10'>
      <PaymentBoxItem :data='boxMockData'></PaymentBoxItem>
    </div>
    <div class="page-container" style='background-color: white'>
      <EraCommonTable style='margin: 10px'>
        <template #content>
          <ATable
            rowKey="id"
            class="case-table"
            :columns="tabColumns"
            :dataSource="commitData"
            :pagination="false"
            size="small"
            bordered
            :scroll="{ x: `${tabColumns.length}0%`, y: 500 }">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex ==='action'">
                <a @click='viewPopDetailsFunc'>查看</a>
              </template>
            </template>
          </ATable>
        </template>
        <template #pagination>
          <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
          />
        </template>
      </EraCommonTable>
    </div>
  </div>
  <EraColumnForm title="详情" ref="viewDetailsFormRef" :width='popWidth'>
    <template #NilFileContent>
      <div class='margin-r-20'>
        <Description
          size="middle"
          :bordered="false"
          :column="3"
          :data="PaymentAggregateMockData"
          :schema="PaymentAggregateBaseSchema"
        />
      </div>
      <div class='pop-top__line margin-r-20'>
        <Description
          class='padding-t-20'
          size="middle"
          :bordered="false"
          :column="3"
          :data="PaymentAggregateCaseMockData"
          :schema="PaymentAggregateCaseSchema"
        />
      </div>
    </template>
  </EraColumnForm>
</template>
<script lang="ts">
import { ComponentOptions, defineComponent, reactive, ref, shallowRef } from 'vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import EraCommonTable from '/@/components/EraCommonTable.vue'
import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
import { useForm, BasicForm } from '/@/components/Form'
import { Description } from '/@/components/Description/index'
import PaymentBoxItem
  from '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentAggregate/components/PaymentBoxItem.vue'
import {
  filterPaymentAggregateForm,
  PaymentAggregateColumn,
  PaymentAggregateBaseSchema,
  PaymentAggregateCaseSchema
} from '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentAggregate/data/PaymentAggregate'
import {
  boxMockData,
  PaymentAggregateTableMockData,
  PaymentAggregateMockData,
  PaymentAggregateCaseMockData

} from '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentAggregate/mock/PaymentAggregateMockData'
export default defineComponent({
  name: 'FinancialPaymentAggregate',
  components: {
    EraColumnForm,
    EraCommonTable,
    VoPagination,
    BasicForm,
    PaymentBoxItem,
    Description,
    DescriptionsItem: Description.Item
  },
  setup() {
    const currentModal = shallowRef<Nullable<ComponentOptions>>(null)
    const modalVisible = ref<Boolean>(false)
    const userData = ref<any>(null)
    const popWidth = ref()
    const [registerForm] = useForm({
      labelWidth: 120,
      schemas: filterPaymentAggregateForm,
    })
    const tabColumns = ref(PaymentAggregateColumn)
    const commitData = ref(PaymentAggregateTableMockData)
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
    })
    const viewDetailsFormRef = ref()
    /**
     *   切换分页，实现实时刷新列表.
     */
    const paginationChange = ({ current, pageSize }) => {
      pagination.current = current
      pagination.pageSize = pageSize
    }
    /**
     * @description 查看详情（以弹框形式呈现）
     * @return void
     */
    const viewPopDetailsFunc = () => {
      popWidth.value = 1000
      viewDetailsFormRef.value.isOpenAlertShow()
    }
    const confirmEvent = (value) => {
      console.log(value, 'valuevalue')
      modalVisible.value = false
    }
    return {
      boxMockData,
      PaymentAggregateBaseSchema,
      PaymentAggregateMockData,
      PaymentAggregateCaseMockData,
      PaymentAggregateCaseSchema,
      paginationChange,
      registerForm,
      confirmEvent,
      viewPopDetailsFunc,
      popWidth,
      viewDetailsFormRef,
      modalVisible,
      userData,
      currentModal,
      pagination,
      tabColumns,
      commitData,
    }
  },
})
</script>
<style lang='less' scoped>
  .pop-top__line {
    border-top: 1px solid #d7d7d7
  }
</style>
