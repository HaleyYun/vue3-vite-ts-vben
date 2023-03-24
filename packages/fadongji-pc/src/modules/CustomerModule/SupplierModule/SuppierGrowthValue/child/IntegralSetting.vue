<template>
  <div class="box">
    <div class="search">
      <!-- <EraSearchTable :item-width="246" :search-data="searchData">
        <template #operation>
          <Button type="primary" class="submit-btn" @click="searchTableEvent()">查询</Button>
          <Button type="primary" class="submit-btn" @click="resetEvent()">重置</Button>
        </template>
        <template #content="{ row }">
          <template v-if="(row.id = 'supplierGrowthValue002')">
            <Select
              class="form-select"
              v-model:value="row.value"
              :options="options"
              :placeholder="row.placeHolder"
            />
          </template>
        </template>
      </EraSearchTable> -->
      <EraProForm mode="filter" :columns="searchData" layout="inline" />
    </div>
    <div class="table-assets">
      <IntegralSettingTable />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { Dayjs } from 'dayjs'
  import { SmileOutlined } from '@ant-design/icons-vue'
  // import EraSearchTable from "/@/components/EraSearchTable/EraSearchTable.vue";
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import { SelectPropsn } from 'ant-design-vue'
  // 积分成长值 -- table
  import IntegralSettingTable from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/child/IntegralSettingTable.vue'
  // “积分设置” - 查询条件
  import { supplierSearchData } from '/@/modules/CustomerModule/SupplierModule/SuppierGrowthValue/type/type'
  export default defineComponent({
    name: 'SupperCancel',
    components: {
      // EraSearchTable,
      IntegralSettingTable,

      SmileOutlined,

      EraProForm,
    },
    setup() {
      let searchData = reactive(supplierSearchData)
      // “经营品牌审核” -- 选择项默认值
      const statusValue = ref()
      // “经营品牌审核”  -- 选择项
      const options = ref<SelectProps['options']>([
        { value: 'admin', label: 'admin' },
        { value: 'users', label: 'users' },
      ])
      /**
       * @function onRangeChangeEvent
       * @description 日期选择其
       * @return void
       * @author stoneAge 2022/05/24
       */
      const onRangeChangeEvent = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
        console.log(date, dateString)
      }
      /**
       * @function searchTableEvent
       * @description 清空筛选输入的内容
       * @param  ‘|供应商名称|手机号|’ {Map}
       * @return void
       * @author stoneAge 2022/05/24
       */
      const searchTableEvent = () => {
        alert('供应商资产')
      }
      /**
       * @function resetEvent
       * @description 清空筛选输入的内容
       * @return void
       * @author stoneAge 2022/05/24
       */
      const resetEvent = () => {
        searchData = searchData.filter((item) => {
          item.value = ''
          return item
        })
        console.log('searchData111===', searchData)
      }
      return {
        onRangeChangeEvent,
        searchTableEvent,
        resetEvent,
        statusValue,
        options,
        searchData,
      }
    },
  })
</script>
<style lang="less" scoped>
  .box {
    .search {
      width: 100%;
    }
    .select-wid {
      width: 246px;
    }
  }
  .table-assets {
    margin: 10px 0;
  }
  .submit-btn {
    width: 80px;
    margin-right: 10px;
  }
  .form-select {
    width: 246px;
  }
</style>
