<template>
  <div class="single-page-h page-wrap">
    <div class="page-tabs">
      <ATabs v-model:activeKey="activeKey" type="card" @change="changeFunc">
        <!--未结算-->
        <ATabPane key="one" tab="未结算" />
        <!--已结算-->
        <ATabPane key="two" tab="已结算" />
      </ATabs>
    </div>
    <div class="filter-bg padding-t-10 padding-r-10">
      <financialBankEnterpriseSettlementDynamic :currentTabIndex="activeKey" />
    </div>
    <div class="page-container">
      <EraCommonTable class='margin-10'>
        <template #tableName>
          <AButton
            type="primary"
            class="margin-r-10"
            :disabled="!hasSelected"
            @click="batchOffShelvesEvent"
          >批量下架</AButton
          >
        </template>
        <template #tableEdit>
          <AButton type='primary' @click='refreshPaymentEvent'>更新打款状态</AButton>
        </template>
        <template #content>
          <ATable
            rowKey="id"
            class="case-table"
            :columns="tabColumns"
            :data-source="commitData"
            :pagination="false"
            size="small"
            bordered
            :scroll="{ x: `${tabColumns.length}0%`, y: 500 }"
            :row-selection=" {
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange,
            }"
          >
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
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { BasicForm } from '/@/components/Form'
import { useRouter } from 'vue-router'
import EraCommonTable from '/@/components/EraCommonTable.vue'
import financialBankEnterpriseSettlementDynamic from '/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseSettlement/components/financialBankEnterpriseSettlementDynamic.vue'
import {
  financialBankEnterpriseSettlementMockData
} from '/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseSettlement/mock/financialBankEnterpriseMockData'
import {
  filterBankEnterpriseSettlementColumn
} from '/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseSettlement/data/financialBankEnterpriseSettlementData'
export default defineComponent({
  name: 'FinancialBankEnterpriseSettlement',
  components: {
    BasicForm,
    EraCommonTable,
    financialBankEnterpriseSettlementDynamic,
  },
  setup() {
    const go = useRouter()
    const state = reactive({
      loading: false,
      selectedRowKeys: [],
    })
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)
    const activeKey = ref('one')
    const pagination = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
    })
    const tabColumns = ref(filterBankEnterpriseSettlementColumn)
    const commitData = ref(financialBankEnterpriseSettlementMockData)
    /**
     *  @param onSelectChange 触发选中列表的函数
     */
    const onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
    }
    const refreshPaymentEvent = () => {
      alert('打款状态')
    }
    /**
     *  @param patchHiddenData 切换分页，实现实时刷新列表.
     */
    const paginationChange = ({ current, pageSize }) => {
      pagination.current = current
      pagination.pageSize = pageSize
    }
    /**
     * @function Tabs触发事件 获取当前选中的tag
     * @author stoneAge 2022/06/16
     */
    const changeFunc = async (item) => {
      console.log(item, '选项卡')
    }
    /**
     * @description  {Function} shelvesEvent
     * @function 点击触发“上架” 接口
     * @param {string}  ID
     * @return void
     * @author stoneAge 2022/06/16
     */
    const shelvesEvent = (record) => {
      console.log(record, '上架')
    }
    const takeItDownEvent = (record) => {
      console.log(record, '下架')
    }
    return {
      ...toRefs(state),
      onSelectChange,
      paginationChange,
      shelvesEvent,
      takeItDownEvent,
      changeFunc,
      refreshPaymentEvent,
      hasSelected,
      state,
      activeKey,
      tabColumns,
      commitData,
      pagination,
    }
  },
})
</script>

<style lang="less" scoped>
::v-deep(.ant-tabs-nav) {
  margin: 0 !important;
}
.page-wrap {
  margin: 15px;
}
.filter-bg {
  background-color: white;
}
.page-container {
  background-color: white;
  margin-top: 10px;
}
</style>
