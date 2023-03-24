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
      <financialCashSettlementDynamicFilterForm :currentTabIndex="activeKey" />
    </div>
    <div class="page-container">
      <EraCommonTable class="margin-10">
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
          <AButton type="primary" @click="refreshPaymentEvent">更新打款状态</AButton>
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
            :row-selection="{
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
  import { BasicForm, useForm } from '/@/components/Form'
  import { supplierFilterSchemas } from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/data/data'
  import { useRouter } from 'vue-router'
  import financialCashSettlementDynamicFilterForm from '/@/modules/FinanceModule/view/financialPaymentManagement/financialCashSettlement/components/financialCashSettlementDynamicFilterForm.vue'
  import EraCommonTable from '/@/components/EraCommonTable.vue'
  import { financialCashSettlementMockData } from '/@/modules/FinanceModule/view/financialPaymentManagement/financialCashSettlement/mock/financialCashSettlementTableMockData'
  import { financialCashSettlementColumn } from '/@/modules/FinanceModule/view/financialPaymentManagement/financialCashSettlement/data/financialCashSettlementTableData'
  export default defineComponent({
    name: 'FinancialSettlement',
    components: {
      BasicForm,
      EraCommonTable,
      financialCashSettlementDynamicFilterForm,
    },
    setup() {
      const go = useRouter()
      // 控制table选中以及“在售”状态的“批量下架”
      const state = reactive({
        loading: false,
        selectedRowKeys: [],
      })
      // 判断是否有“选中项”
      const hasSelected = computed(() => state.selectedRowKeys.length > 0)
      // 默认进入的"全部商品"页面
      const activeKey = ref('one')
      const [registerForm] = useForm({
        labelWidth: 120,
        schemas: supplierFilterSchemas,
      })
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const tabColumns = ref(financialCashSettlementColumn)
      const commitData = ref(financialCashSettlementMockData)
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
       * @function searchTableEvent
       * @description 刷新“供应商列表”列表数据
       * @return void
       * @author stoneAge 2022/06/13
       */
      const loadTableData = async () => {}
      /**
       *  @param patchHiddenData 切换分页，实现实时刷新列表.
       */
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        loadTableData()
      }
      const viewDetailsFunc = (item) => {
        go.push({
          path: '/goodsManage/goods/goodsDetailsAssets',
          params: {
            goodsParam: item,
            message: '当前商品状态：已下架',
            description: '下架原因：客户手动下架',
            error: 'error',
          },
        })
      }
      /**
       * @function 点击【批量下架】，下架选中的列表数据
       * @description batchOffShelvesEvent--批量下架
       * @param {string}  ID
       * @return void
       * @author stoneAge 2022/06/14
       */
      const batchOffShelvesEvent = () => {}
      const handleRenderDisplay = ({ labels, selectedOptions }) => {
        if (selectedOptions.tag !== '0') {
          return labels[labels.length - 1]
        }
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
        hasSelected,
        ...toRefs(state),
        registerForm,
        onSelectChange,
        paginationChange,
        batchOffShelvesEvent,
        shelvesEvent,
        takeItDownEvent,
        handleRenderDisplay,
        changeFunc,
        viewDetailsFunc,
        refreshPaymentEvent,
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
