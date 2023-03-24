<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <DefaultFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <div class="w-full flex items-contents head-style">
          <div
            class="p-16px headItem"
            v-for="(item, index) of tableColumns"
            :key="index + 'order'"
            :style="{ width: item.width }"
          >
            {{ item.title }}
          </div>
        </div>
        <TableList v-for="(item, index) of tableData" :key="index + 'order'" :tab-data="item" />
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
 </div>
</template>
<script setup lang="ts">
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import DefaultFilterForm from './component/DefaultFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import TableList from './component/tableList.vue'
  import { tableColumns } from './data/DefaultContainerData'
  import { ref, reactive, onBeforeMount } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  //----- 加载列表数据 ---------
  const statusAttrs = { one: 0, two: 3, three: 2 }
  let tableData = ref<any>([])
  const loadTableData = async () => {
    await handlerStatus()
    const filterParams = {
      status: statusAttrs[activeKey.value],
      ...filterData.value,
      ...paginations,
    }
    try {
      const { code, data } = await adminHttp.ORDER.orderAssignQueryList(
        clearObjectUnalbeAttr(filterParams),
      )
      console.log(tableData)
      if (code == '20001') {
        paginations.total = data.total
        tableData.value = data.records
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length == 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部违约订单', totalCount: 120 },
    { key: 'two', name: '待回款', totalCount: 100 },
    { key: 'three', name: '回款完成', totalCount: 20 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10
    filterData.value = {}
    loadTableData()
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }

  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
  //页签数量
  const handlerStatus = async () => {
    const { data } = await adminHttp.ORDER.orderAssignQueryStatist({ ...paginations })
    tabsList.value = [
      { key: 'one', name: '全部违约订单', totalCount: data[0].statisticCount },
      { key: 'two', name: '待回款', totalCount: data[2].statisticCount },
      { key: 'three', name: '回款完成', totalCount: data[1].statisticCount },
    ]
  }
</script>

<style lang="less" scoped>
  .head-style {
    text-align: left;
    border: 1px solid #f0f0f0;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    .headItem {
      border-right: 1px solid #f0f0f0;
      border-top-left-radius: 2px;
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s ease;
      overflow-wrap: break-word;
    }
  }
</style>
