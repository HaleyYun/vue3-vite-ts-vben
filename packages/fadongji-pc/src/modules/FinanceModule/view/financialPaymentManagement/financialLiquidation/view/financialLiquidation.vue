<template>
  <div class="padding-10 single-page-h">
    <div class="filter-bg padding-r-10">
      <BasicForm @register="registerForm" />
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
              <template v-if="column.dataIndex ==='details'">
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
      <ATable
        class="case-table popInnerTable"
        :columns="popDetailsTableColumns"
        :dataSource="popDetailsTableData"
        :pagination="false"
        size="small"
        bordered
        :scroll="{ x: `${popDetailsTableColumns.length}0%`}">
      </ATable>
    </template>
  </EraColumnForm>
</template>
<script lang="ts">
import { ComponentOptions, defineComponent, reactive, ref, shallowRef } from 'vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import EraCommonTable from '/@/components/EraCommonTable.vue'
import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
import { useForm, BasicForm } from '/@/components/Form'
import {
  financialLiquidationColumn,
  financialLiquidationForm, financialLiquidationPopColumn
} from '/@/modules/FinanceModule/view/financialPaymentManagement/financialLiquidation/data/financialLiquidationData'
import {
  financialLiquidationMockData, financialLiquidationPopMockData
} from '/@/modules/FinanceModule/view/financialPaymentManagement/financialLiquidation/mock/financialLiquidationMockData'
export default defineComponent({
  name: 'FinancialLiquidation',
  components: {
    EraColumnForm,
    EraCommonTable,
    VoPagination,
    BasicForm,
  },
  setup() {
    const currentModal = shallowRef<Nullable<ComponentOptions>>(null)
    const modalVisible = ref<Boolean>(false)
    const userData = ref<any>(null)
    const popWidth = ref()
    const [registerForm] = useForm({
      labelWidth: 120,
      schemas: financialLiquidationForm,
    })
    const tabColumns = ref(financialLiquidationColumn)
    const commitData = ref(financialLiquidationMockData)
    const popDetailsTableColumns = ref(financialLiquidationPopColumn)
    const popDetailsTableData = ref(financialLiquidationPopMockData)
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
      popWidth.value = 1200
      viewDetailsFormRef.value.isOpenAlertShow()
    }
    const confirmEvent = (value) => {
      console.log(value, 'valuevalue')
      modalVisible.value = false
    }
    return {
      paginationChange,
      registerForm,
      confirmEvent,
      viewPopDetailsFunc,
      popWidth,
      viewDetailsFormRef,
      userData,
      currentModal,
      pagination,
      tabColumns,
      commitData,
      popDetailsTableColumns,
      popDetailsTableData
    }
  },
})
</script>
<style lang='less' scoped>
.pop-top__line {
  border-top: 1px solid #d7d7d7
}
.popInnerTable {
  overflow-y: scroll;
  max-height: 300px;
  padding-right: 20px;
}
</style>
