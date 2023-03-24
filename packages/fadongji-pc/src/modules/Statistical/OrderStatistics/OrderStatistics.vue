<template>
 <div>
  <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <!-- <template  v-if="activeKey === '4'">
	   <ModelForm
		 ref="ModelRef"
		 @rest="handlerRest"
		 @submit="handlerSubmit"
	   />
	  </template> -->
      <!-- <template> -->
      <SearchForm ref="SearchRef" @rest="handlerRest" @submit="handlerSubmit" />
      <!-- </template> -->
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <CustomerOrder :activeKey="activeKey" :tableData="tableData" />
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
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import CustomerOrder from './component/CustomerOrder.vue'
  import SearchForm from './component/SearchForm.vue'
  import { useRouter } from 'vue-router'
  import { VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  // import ModelForm from './component/ModelForm.vue'

  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '投资订单统计' },
    { key: '2', name: '销售订单统计' },
    { key: '3', name: '超时未付款销售单统计' },
    { key: '4', name: '退货销售单统计' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.total = 0
    initData()
  }
  // --------全局参数---------------
  const router = useRouter() // 路由跳转函数
  // ------操作按钮----------

  // ------form列表--------- startTime:'2022-08-01 00:00:00',endTime:'2022-10-01 00:00:00'
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    initData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    initData()
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
    initData()
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const SearchRef = ref()
  // const ModelRef =ref()
  //投资订单统计
  const loadInvestmentData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountInvestCount(params)
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

  //销售订单统计
  const loadSalesData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountSellCount(params)
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
  //超时未付款销售单统计
  const loadOverduePaymentData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountSellOverTimeCount(params)
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
  //退货销售单统计/v1/order/count/sell/refund/count
  const loadReturnSalesData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ORDER.orderCountSellRefundCount(params)
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
      // if (activeKey.value === '4') {
      //   ModelRef.value.setFieldsValue({
      //   searchTime: [startTime, nowTime],
      //   startTime: startTime,
      //   endTime: nowTime,
      // })
      // }else{
      SearchRef.value.setFieldsValue({
        searchTime: [startTime, nowTime],
        startTime: startTime,
        endTime: nowTime,
      })
      // }
    })
    let params = {
      ...filterData.value,
      pageNo: paginations.pageNo,
      pageSize: paginations.pageSize,
    }
    switch (+activeKey.value) {
      case 1:
        loadInvestmentData(params) //投资订单统计
        break
      case 2:
        loadSalesData(params) //销售订单统计
        break
      case 3:
        loadOverduePaymentData(params) //超时未付款销售单统计
        break
      case 4:
        loadReturnSalesData(params) //退货销售单统计
        break
    }
  }
  // 服务商跳转详情
  const goDetail = (record) => {
    router.push({
      // path: '',
      query: { id: record.id },
    })
  }

  onMountedOrActivated(() => {
    // 初始化数据
    initData()
  })
</script>

<style scoped lang="less"></style>
