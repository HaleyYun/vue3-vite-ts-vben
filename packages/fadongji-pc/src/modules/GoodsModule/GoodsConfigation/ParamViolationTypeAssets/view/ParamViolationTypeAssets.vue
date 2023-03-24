<template>
  <div class="single-page-h page-wrap">
    <div class="page-container">
      <GoodsServiceProviderTable>
        <template #tableName>
          <AButton
              type="primary"
              class="margin-r-10"
              :disabled="!hasSelected"
              @click="batchOffShelvesEvent"
          >批量下架</AButton>
        </template>
        <template #tableEdit>
          <ParamPopEditForm titles="新增">
            <template #triggerBtn>
              <AButton type="primary">添加违规类型</AButton>
            </template>
          </ParamPopEditForm>
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
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'isShow'">
                <ASwitch
                    checked-children="开"
                    un-checked-children="关"
                    v-model:checked="record.isShow"
                />
              </template>
              <template v-if="column.dataIndex === 'action'">
                <div style="display: flex">
                  <ParamPopEditForm titles="编辑">
                    <template #triggerBtn>
                      <a class="margin-r-10">编辑</a>
                    </template>
                  </ParamPopEditForm>
                  <APopconfirm
                      title="确定要删除吗?"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="deleteItemEvent(record)">
                    <a class="margin-r-10">删除</a>
                  </APopconfirm>
                </div>
              </template>
            </template>
          </ATable>
        </template>
        <template #pagination>
          <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
          />
        </template>
      </GoodsServiceProviderTable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { BasicForm, useForm } from '/@/components/Form'
import GoodsApplyTable from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/GoodsApplyTable.vue'
import { supplierFilterSchemas } from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/data/data'
import {
  supplierColumn,
} from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/data/data'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import {
  paramViolationTypeAssetsColumn,
  paramViolationTypeAssetsData
} from "/@/modules/GoodsModule/GoodsConfigation/ParamViolationTypeAssets/ParamViolationTypeAssetsData/ParamViolationTypeAssetsData";
import GoodsServiceProviderTable
  from "/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/components/GoodsServiceProviderTable.vue";
import ParamPopEditForm from '/@/modules/GoodsModule/GoodsConfigation/ParamViolationTypeAssets/conponents/ParamPopEditForm.vue'

export default defineComponent({
  name: 'ParamViolationTypeAssets',
  components: {
    GoodsApplyTable,
    BasicForm,
    supplierColumn,
    GoodsServiceProviderTable,
    VoPagination,
    ParamPopEditForm,
  },
  setup() {
    // 控制table选中以及“在售”状态的“批量下架”
    const state = reactive({
      loading: false,
      selectedRowKeys: [],
    })
    // 判断是否有“选中项”
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)
    const [registerForm] = useForm({
      labelWidth: 120,
      schemas: supplierFilterSchemas,
    })
    const paginations = reactive({
      total: 0,
      current: 1,
      pageSize: 10,
    })
    const tabColumns = ref(paramViolationTypeAssetsColumn)
    const commitData = ref(paramViolationTypeAssetsData)
    /**
     * @description 点击编辑“编辑内容”
     * @author stoneAge 2022/06/16
     */
    const editPopFunc = () => {

    }
    /**
     * @description 弹出“新增”弹框
     * @author stoneAge 2022/06/16
     */
    const fileOutAddItemFunc = () => {

    }
    /**
     *  @param onSelectChange 触发选中列表的函数
     */
    const onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
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
      paginations.current = current
      paginations.pageSize = pageSize
      loadTableData()
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
     * @description 点击弹出“删除”微提醒，删除item
     * @param {string}  ID
     * @return void
     * @author stoneAge 2022/06/16
     */
    const deleteItemEvent = (item) => {
      alert('删除'  + '--' + item)
    }
    return {
      hasSelected,
      ...toRefs(state),
      registerForm,
      onSelectChange,
      paginationChange,
      batchOffShelvesEvent,
      deleteItemEvent,
      handleRenderDisplay,
      fileOutAddItemFunc,
      editPopFunc,
      state,
      tabColumns,
      commitData,
      paginations,
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
