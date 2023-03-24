<template>
 <div>
  <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm
        ref="SearchRef"
        @rest="handlerRest"
        @submit="handlerSubmit"
        :activeKey="activeKey"
      />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <CustomerRanking :activeKey="activeKey" :tableData="tableData" />
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

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount, nextTick } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './components/SearchForms.vue'
  import CustomerRanking from './components/CustomerRanking.vue'
  import { VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '客户进货排名' },
    { key: '2', name: '客户投资次数排名' },
    { key: '3', name: '客户销货排名' },
    { key: '4', name: '关联修理厂排名' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.total = 0
    // 这里切换不重置搜索条件
    initData()
  }
  // financeBillOrderPage
  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.pageNo = 1
    filterData.value = {}
    initData()
  }
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    initData()
  }

  //--- 分页查询 ------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  })
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    initData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const SearchRef = ref()
  const loadCustomerRankingData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountCustomerPurchaseRanking(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  const loadCustomerInvestmentData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountCustomerInvestCountRanking(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  const loadCustomerSalesData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountCustomerSalesRanking(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  const loadAssociatedData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.COMPANY.companyInfoGarageCountPage(params)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  const initData = () => {
    let startDate = new Date().getTime() - 1000 * 60 * 60 * 24 * 60
    let startTime = VoUtils.timeFormat(startDate, 'yyyy-mm-dd') + ' 00:00:00'
    let nowTime = VoUtils.timeFormat(new Date(), 'yyyy-mm-dd') + ' 23:59:59'
    filterData.value = { ...filterData.value, startTime: startTime, endTime: nowTime }
    nextTick(() => {
      SearchRef.value.setFieldsValue({
        searchTime: [startTime, nowTime],
        startTime: startTime,
        endTime: nowTime,
      })
    })
    let params = {
      ...filterData.value,
      pageNo: paginations.pageNo,
      pageSize: paginations.pageSize,
    }
    switch (activeKey.value) {
      case '1':
        loadCustomerRankingData(params)
        break
      case '2':
        loadCustomerInvestmentData(params)
        break
      case '3':
        loadCustomerSalesData(params)
        break
      case '4':
        loadAssociatedData(params)
        break
    }
  }
  onMountedOrActivated(() => {
    // 初始化数据
    initData()
  })
</script>

<style scoped lang="less">
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
