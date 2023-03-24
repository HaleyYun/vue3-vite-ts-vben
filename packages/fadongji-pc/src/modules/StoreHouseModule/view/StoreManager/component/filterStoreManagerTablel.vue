<template>
  <div>
    <EraSlotTable>
      <template #tableEdit> </template>
      <template #content>
        <ATable
          class="table-space"
          :columns="columnTypeArr"
          :data-source='columnTypeData'
          :pagination="false"
          size="small"
          bordered
          :scroll="{ x: `${columnTypeArr.length}0%`, y: 500 }"
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
    </EraSlotTable>
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, reactive, ref, watch } from 'vue'
  import EraSlotTable from '/@/components/EraSlotTable/EraSlotTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  let columnTypeArr = ref<any>([])
  let columnTypeData = ref<any> ([])
  let activeKey = ref('0')
  const props = defineProps({
    propsColumn: {
      type: Array,
      default: () => {
        return []
      },
    },
    activeKey: {
      type: String,
      default: '',
    }
  })
  let pagination = {
    pageSize: 10,
    pageNo: 1,
    total: 0,
  }
  let storeModel = {
    status: '',
    name: '',
    type: '',
  }
  const filterParams = (obj) => {
    let _newPar = {};
    for (let key in obj) {
      if ((obj[key] === 0 ||obj[key] === false|| obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        _newPar[key] = obj[key];
      }
    }
    return _newPar;
  }
  watch(
    () => props.propsColumn,
    (newValue) => {
      columnTypeArr.value = newValue
    },
    { deep: true, immediate: true },
  )
  watch(() =>props.activeKey,
    (newValue) => {
      activeKey.value = newValue
    },
    { deep: true, immediate: true },
  )
  const filterTableData = async () => {
    let  storeModelMap = filterParams(storeModel)
    try {
      const map = {
        pageSize: pagination.pageSize,
        pageNo: pagination.pageNo,
        type: 1,
        status: 1,
        ...storeModelMap
      }
      const {code, data} =  await adminHttp.Store.warehouseQueryWareHousePage(map)
      if (code == '20001') {
        columnTypeData.value = data.records
      }
    } catch (e) {
      console.log(e, '===失败')
    }
  }
   const initStoreManagerData =async (item) => {
    storeModel = item
    await filterTableData()
  }
  const paginationChange =async ({ current, pageSize }) => {
    pagination.pageNo = current
    pagination.pageSize = pageSize
    await filterTableData()
  }

  await filterTableData()
  defineExpose(
    { initStoreManagerData }
  )
</script>
