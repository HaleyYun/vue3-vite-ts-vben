<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm v-if="activeKey === 'supplier'" @rest="handlerRest" @submit="handlerSubmit" />
      <ServiceForm v-if="activeKey === 'agent'" @rest="handlerRest" @submit="handlerSubmit" />
      <OldForm v-if="activeKey === 'oldMachine'" @rest="handlerRest" @submit="handlerSubmit" />
      <RecyclingForm v-if="activeKey === 'recycling'" @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit></template>
      </EraTableTitle>

      <div>
        <ATable
          :loading="tableLoading"
          :columns="shareColumn"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                v-auth="'/v1/finance/margin/detail'"
                type="link"
                size="small"
                @click="goDetails(record)"
              >
                查看明细
              </AButton>
              <!-- </template> -->
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
 </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import OldForm from './component/OldForm.vue'
  import RecyclingForm from './component/RecyclingForm.vue'
  import ServiceForm from './component/ServiceForm.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // --------全局参数---------------
  const router = useRouter()

  // ------操作按钮----------
  // 查看详情
  // 查看详情
  const goDetails = (record) => {
    router.push({
      path: '/financial/account/detailed',
      query: { id: record.companyId },
    })
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //------tabs页签配置-------
  const activeKey = ref('supplier')
  const tabsList = ref([
    { key: 'supplier', name: '供应商', totalCount: '' },
    { key: 'agent', name: '服务商', totalCount: '' },
    { key: 'oldMachine', name: '旧机买家', totalCount: '' },
    { key: 'recycling', name: '回收公司', totalCount: '' },
  ])

  let shareColumn = ref(tableColumns)
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10
    if (activeKey.value === 'agent') {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'name' ? '服务商' : item.title,
        }
      })
    } else if (activeKey.value === 'oldMachine') {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'name' ? '旧机买家' : item.title,
        }
      })
    } else if (activeKey.value === 'recycling') {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.dataIndex === 'name' ? '回收公司' : item.title,
        }
      })
    } else {
      shareColumn.value = tableColumns.map((item) => {
        return {
          ...item,
          title: item.title,
        }
      })
    }

    filterData.value = {}
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
  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  //investmentManager  招商经理
  //channelManager  渠道经理'
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        platformCode: activeKey.value,
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.FINANCE.financeMarginPage(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          await loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
