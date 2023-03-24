<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  <div class="m-24px mt-72px">
    <SupperBrandOperationTable v-if="activeKey == 'one'" />
    <SupplierClassTable v-if="activeKey == 'two'" />
  </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref,onBeforeMount } from 'vue'
  import { Dayjs } from 'dayjs'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import { operationBrandSearchData } from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/type/type'
  import SupplierClassTable from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/SupplierClassTable.vue'
  import SupperBrandOperationTable from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/SupperBrandOperationTable.vue'
  import { SelectProps } from 'ant-design-vue'
  import { useRoute } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  export default defineComponent({
    name: 'SuppierBrandOperation',
    components: {
      EraTabs,
      EraProForm,
      SupperBrandOperationTable,
      SupplierClassTable,
    },
    setup() {
      const route = useRoute()
      let activeKey = ref('one')
      const tabsList = ref([{key: 'one', name: '品类申请'},{key: 'two', name: '品牌申请'}])
      const userPlaceName = ref('请选择启用状态')
      const searchData = ref(operationBrandSearchData)
      const onRangeChange = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
        console.log(date, dateString)
      }
      const searchFilterTableEvent = () => {}
      const searchTableData = () => {
        alert('经营品牌审核-查询')
      }
      console.log(searchData, 'searchData')
      // “经营品牌审核” -- 选择项默认值
      const statusValue = ref()
      // “经营品牌审核”  -- 选择项
      const options = ref<SelectProps['options']>([
        { value: 'admin', label: 'admin' },
        { value: 'users', label: 'users' },
      ])
      const tabsChange = (key)=>{
        activeKey.value = key
      }
      // query
	  onMountedOrActivated(()=>{
        if(route.query.type == 2){
          activeKey.value = 'two'
        }
      })


      return {
        activeKey,
        onRangeChange,
        searchTableData,
        searchFilterTableEvent,
        statusValue,
        options,
        searchData,
        userPlaceName,
        tabsList,
        tabsChange
      }
    },
  })
</script>
<style lang="less" scoped>
  .box {
    margin: 10px;
    padding: 10px 0;
    position: relative;
    background-color: #ffffff;

    .select-wid {
      width: 246px;
    }
  }

  .table-assets {
    margin-top: 10px;
    padding: 0 10px;
  }
</style>
