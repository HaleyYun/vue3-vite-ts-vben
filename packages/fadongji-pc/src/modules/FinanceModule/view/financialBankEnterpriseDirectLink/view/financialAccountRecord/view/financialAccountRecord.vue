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
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import EraCommonTable from '/@/components/EraCommonTable.vue'
import { useForm, BasicForm } from '/@/components/Form'
import {
  financialAccountRecordColumn,
  financialAccountRecordForm
} from '/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialAccountRecord/data/financialAccountRecordData'
import {
  financialAccountRecordMockData
} from '/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialAccountRecord/mock/financialAccountRecordMockData'
export default defineComponent({
  name: 'FinancialAccountRecord',
  components: {
    EraCommonTable,
    VoPagination,
    BasicForm,
  },
  setup() {
    const [registerForm] = useForm({
      labelWidth: 120,
      schemas: financialAccountRecordForm,
    })
    const tabColumns = ref(financialAccountRecordColumn)
    const commitData = ref(financialAccountRecordMockData)
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
    })
    /**
     *   切换分页，实现实时刷新列表.
     */
    const paginationChange = ({ current, pageSize }) => {
      pagination.current = current
      pagination.pageSize = pageSize
    }
    return {
      paginationChange,
      registerForm,
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
.popInnerTable {
  overflow-y: scroll;
  max-height: 300px;
  padding-right: 20px;
}
</style>
