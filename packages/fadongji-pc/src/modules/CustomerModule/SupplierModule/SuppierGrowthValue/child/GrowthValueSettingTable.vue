<template>
  <div class="table-list">
    <div class="table-list__title">
      <div class="title-strip">数据列表</div>
    </div>
    <div class="table-assets">
      <ATable
        class="table-list_table"
        :dataSource="growthTableData"
        :columns="IntegralSettingColumnItem"
        :pagination="false"
        size="small"
        bordered
        :scroll="{ x: `${IntegralSettingColumnItem.length}0%`, y: 500 }"
      >
        <template #amount="{ record }">
          <AInput class="form-input" v-model:value="record.amount" placeholder="请输入数量" />
        </template>
        <template #enable="{ record }">
          <ASwitch v-model:checked="record.status" checked-children="开" un-checked-children="关" />
        </template>
      </ATable>
      <div class="com-item">
        <VoPagination
          :total="pagination.total"
          :current="pagination.current"
          :page-size="pagination.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  <!-- 点击“审核”，弹出弹框 -->
  <EraColumnForm :title="modalTitle" :data="applyCancellationData" ref="editColumnForm">
    <template #content="{ row }">
      <RadioGroup v-model:value="row.value">
        <div style="width: 68px; height: 59px; background-color: red"></div>
      </RadioGroup>
    </template>
  </EraColumnForm>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { SelectProps } from 'ant-design-vue'
  // import { VoUtils } from '@vocen/shared'
  import {VoUtils} from '../../../../../../../shared/src/index'
  // 分页
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  // “品牌经营审核” - 审核 弹框
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'

  // “供应商注销” - column 项
  import { applyCancellationModalData } from '/@/modules/CustomerModule/SupplierModule/SupperCancel/type/type'
  // “积分设置” - table Column数据项
  import { IntegralSettingColumnItem } from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/type/type'
  // “积分设置” - table 数据集
  import {
    growthTableData,
    integralSettingTableData,
  } from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/mock'

  export default defineComponent({
    name: 'GrowthValueSettingTable',
    components: {
      VoPagination,
      EraColumnForm,
    },
    setup() {
      // "品牌经营审核" - 弹框 内容
      let applyCancellationData = ref(applyCancellationModalData)
      // “品牌经营审核” - 弹框ref
      const editColumnForm = ref()
      const modalTitle = ref('品类审核')
      // “品牌经营审核” -- 编辑 数据集
      const options = ref<SelectProps['options']>([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ])
      // “品牌经营审核” -- 删除
      const confirmItem = (item) => {
        console.log('商品删除单项item===', item)
      }
      // "品牌经营审核" -- 分页
      const pagination = reactive({
        total: 158,
        current: 1,
        pageSize: 20,
      })
      // “品牌经营审核” -- 触发事件
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
      }

      /**
       * @function verityEvent-带过来item
       * @description 处理 【品牌经营审核】编辑
       * @param item {Map} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
       * @return void
       * @author stoneAge 2022/05/24
       */
      const verityEvent = (item) => {
        console.log(item, '审核触发事件')
        editColumnForm.value.isOpenAlertShow()
      }
      return {
        integralSettingTableData,
        IntegralSettingColumnItem,
        applyCancellationModalData,
        growthTableData,
        VoUtils,
        confirmItem,
        paginationChange,
        verityEvent,
        options,
        pagination,
        modalTitle,
        editColumnForm,
        applyCancellationData,
      }
    },
  })
</script>
<style lang="less" scoped>
  .table-list {
    background-color: #ffffff;
    .table-list__title {
      padding: 10px 0 10px 10px;
    }
    .table-assets {
      padding: 0 10px;
    }
  }
  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    background-color: #fff;
  }
  .operation-has__value {
    color: #7f7f7f;
  }
  .form-input {
    width: 220px;
  }
</style>
