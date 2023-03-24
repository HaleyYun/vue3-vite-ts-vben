<template>
  <div class="padding-10 single-page-h">
    <div class='page-header'>
      <AAlert
        message="说明：开立在支付机构的平台账户，用户各项活动的支出"
        banner
      />
    </div>
    <div class="page-container" style='background-color: white'>
      <EraCommonTable class='margin-10'>
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
import {
  financialVirtualAccountMockData
} from '/@/modules/FinanceModule/view/financialAccountManagement/view/financialVirtualAccount/mock/financialVirtualAccountMockData'
import {
  financialVirtualAccountColumn
} from '/@/modules/FinanceModule/view/financialAccountManagement/view/financialVirtualAccount/data/financialVirtualAccountData'
export default defineComponent({
  name: 'financialVirtualAccount',
  components: {
    EraCommonTable,
    VoPagination,
  },
  setup() {
    const tabColumns = ref(financialVirtualAccountColumn)
    const commitData = ref(financialVirtualAccountMockData)
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
