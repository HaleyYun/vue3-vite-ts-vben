<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <SearchForm
          ref="SearchRef"
          v-if="activeKey === '1'"
          @rest="handlerRest"
          @submit="handlerSubmit"
        />
        <ModelForm
          ref="ModelRef"
          v-if="activeKey === '2'"
          @rest="handlerRest"
          @submit="handlerSubmit"
        />
        <InvestmentForm
          ref="InvestRef"
          v-if="activeKey === '3'"
          @rest="handlerRest"
          @submit="handlerSubmit"
          :brandId="brandId"
        />
      </div>

      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total" />
        <div>
          <CustomerGoods :activeKey="activeKey" :tableData="tableData" />
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
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import CustomerGoods from './component/CustomerGoods.vue'
  import SearchForm from './component/SearchForm.vue'
  import ModelForm from './component/ModelForm.vue'
  import InvestmentForm from './component/InvestmentForm.vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { dayjs } from '@vocen/shared'
  import { VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '商品销量排名' },
    { key: '2', name: '同型号商品销量对比' },
    { key: '3', name: '投资覆盖率排名' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.total = 0
    filterData.value = {}
    initData()
  }
  // --------全局参数---------------
  const SearchRef = ref()
  const ModelRef = ref()
  const InvestRef = ref()

  // ------form列表--------- startTime:'2022-08-01 00:00:00',endTime:'2022-10-01 00:00:00'
  const filterData = ref<any>({})
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
    console.log(values)
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
  //商品销量
  const loadCommoditySalesData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsStatisticQuerySalesRankingList(params)
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
  //型号销量
  const loadModelSalesData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsStatisticQuerySalesComparisonList(params)
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
  //投资覆盖
  const loadInvestmentCoverageData = async (params) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.GOODS.goodsStatisticQueryInvestRankingList(params)
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
    let startTime = filterData.value.startTime
      ? filterData.value.startTime
      : VoUtils.timeFormat(startDate, 'yyyy-mm-dd') + ' 00:00:00'
    let nowTime = filterData.value.endTime
      ? filterData.value.endTime
      : VoUtils.timeFormat(new Date(), 'yyyy-mm-dd') + ' 23:59:59'
    filterData.value = {
      ...filterData.value,
      startTime: startTime,
      endTime: nowTime,
    }
    nextTick(() => {
      if (activeKey.value === '1') {
        SearchRef.value.setFieldsValue({
          searchTime: [startTime, nowTime],
          startTime: startTime,
          endTime: nowTime,
        })
      } else if (activeKey.value === '2') {
        ModelRef.value.setFieldsValue({
          searchTime: [startTime, nowTime],
          startTime: startTime,
          endTime: nowTime,
        })
      } else {
        InvestRef.value.setFieldsValue({
          searchTime: [startTime, nowTime],
          startTime: startTime,
          endTime: nowTime,
        })
      }
    })
    let params = {
      ...filterData.value,
      pageNo: paginations.pageNo,
      pageSize: paginations.pageSize,
      brandId:
        activeKey.value === '3'
          ? filterData.value.brandId || brandId.value
          : activeKey.value === '1'
          ? filterData.value.brandId
          : '',
    }
    switch (activeKey.value) {
      case '1':
        loadCommoditySalesData(params) //商品销量
        break
      case '2':
        loadModelSalesData(params) //型号销量
        break
      case '3':
        loadInvestmentCoverageData(params) //投资覆盖
        break
    }
  }

  onMounted(() => {
    brandMount()
    // 初始化数据
    initData()
  })
  const brandId = ref<any>([])
  const brandMount = async () => {
    const ret = await AdminHttp.goodsBranchQueryList({ pageSize: 1 })
    const res = ret.data.map((item) => {
      return item.id
    })
    brandId.value = res[0]
    console.log(brandId.value, 'brandId.value')
  }
</script>

<style scoped lang="less"></style>
