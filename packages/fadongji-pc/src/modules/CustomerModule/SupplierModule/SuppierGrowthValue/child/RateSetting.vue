<template>
  <div class="table-list">
    <div class="table-list__title">
      <div class="title-strip">数据列表</div>
    </div>
    <div class="box">
      <div class="search">
        <EraSearchTable :item-width="246" :search-data="searchData">
          <template #operation>
            <AButton type="primary" class="submit-btn">查询</AButton>
            <AButton type="primary" class="submit-btn">重置</AButton>
          </template>
          <template #content="{ row }">
            <template v-if="row.id === 'brandTwo'">
              <ARangePicker @change="onRangeChangeEvent">
                <template #suffixIcon>
                  <SmileOutlined />
                </template>
              </ARangePicker>
            </template>
            <template v-if="row.id === 'brandThree'">
              <ASelect
                class="select-wid"
                v-model:value="statusValue"
                :options="options"
                placeholder="请选择启用状态"
              />
            </template>
          </template>
        </EraSearchTable>
      </div>

      <div class="table-assets">
        <ATable
          class="table-list_table"
          :dataSource="rateAssetsTableData"
          :columns="rateAssetsColumnData"
          :pagination="false"
          size="small"
          bordered
          :scroll="{ x: `${rateAssetsColumnData.length}0%`, y: 500 }"
        >
          <template #statusEnable="{ record }">
            <ASwitch
              v-model:checked="record.status"
              checked-children="开"
              un-checked-children="关"
            />
          </template>
          <template #operation>
            <a @click="changeRateSettingItem()">修改</a>
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
  </div>
  <!--点击“审核”，弹出弹框 -->
  <EraColumnForm :title="modalTitle" :data="changeRateData" ref="editColumnForm">
    <template #content="{ row }">
      <Textarea v-model:value="row.value" placeholder="请填写等级描述内容" />
    </template>
  </EraColumnForm>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { SelectProps } from 'ant-design-vue'
  // import { VoUtils } from '@vocen/shared'
  import {VoUtils } from '../../../../../../../shared/src/index'
  // 分页
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  // “等级设置” - table Column数据项 || "等级设置" - 弹框内容的数据集
  import {
    rateAssetsColumnData,
    rateChangeData,
  } from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/type/type'
  // “等级设置” - table 数据集
  import { rateAssetsTableData } from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/mock'
  // “等级设置” - 修改 弹框
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import { Dayjs } from 'dayjs'
  import { SmileOutlined } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'IntegralSettingTable',
    components: {
      VoPagination,
      EraColumnForm,
      SmileOutlined,
    },
    setup() {
      // “等级设置” -- 弹框编辑项
      const changeRateData = ref(rateChangeData)
      // “品牌经营审核” - 弹框ref
      const editColumnForm = ref()
      // “经营品牌审核” -- 选择项默认值
      const statusValue = ref()
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
       * @function changeRateSettingItem-带过来item
       * @description 处理 【等级设置】编辑
       * @param item {Map} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
       * @return void
       * @author stoneAge 2022/05/25
       */
      const changeRateSettingItem = () => {
        editColumnForm.value.isOpenAlertShow()
      }
      /**
       * @function onRangeChangeEvent
       * @description 日期选择其
       * @return void
       * @author stoneAge 2022/05/24
       */
      const onRangeChangeEvent = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
        console.log(date, dateString)
      }
      return {
        rateAssetsTableData,
        rateAssetsColumnData,
        VoUtils,
        onRangeChangeEvent,
        changeRateSettingItem,
        confirmItem,
        paginationChange,
        statusValue,
        changeRateData,
        options,
        pagination,
        modalTitle,
        editColumnForm,
      }
    },
  })
</script>
<style lang="less" scoped>
  .table-list {
    background-color: #ffffff;
    margin: 10px 10px 0 10px;
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
