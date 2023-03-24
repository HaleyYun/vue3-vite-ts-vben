<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <SearchForm @rest="handlerRest" @submit="handlerSubmit" :activeKey="activeKey"></SearchForm>
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total"></EraTableTitle>
        <div>
          <div class="w-full flex items-contents head-style">
            <div
              class="p-16px headItem"
              v-for="(item, index) of getColumns(activeKey)"
              :key="index + 'order'"
              :style="{ width: item.width }"
            >
              {{ item.title }}
            </div>
          </div>
          <!--销售订单-->
          <div v-show="activeKey == '11'">
            <SalesTable
              v-for="(item, index) of tableData"
              :key="index + 'order1'"
              :activeKey="activeKey"
              :tab-data="item"
            ></SalesTable>
          </div>
          <!--投资订单-->
          <div v-show="activeKey == '12'">
            <InvestmentTable
              v-for="(item, index) of tableData"
              :key="index + 'order2'"
              :activeKey="activeKey"
              :tab-data="item"
            ></InvestmentTable>
          </div>

          <!--安装订单-->
          <div v-show="activeKey == '32'">
            <InstallationOrderTable
              :activeKey="activeKey"
              v-for="(item, index) of tableData"
              :key="index + 'order3'"
              :tab-data="item"
            ></InstallationOrderTable>
          </div>

          <!--回收订单-->
          <div v-show="activeKey == '33'">
            <RecyclingTable
              :activeKey="activeKey"
              v-for="(item, index) of tableData"
              :key="index + 'order4'"
              :tab-data="item"
            ></RecyclingTable>
          </div>

          <!--售后上门订单--->
          <div v-show="activeKey == '31'">
            <AfterDoorTable
              :activeKey="activeKey"
              v-for="(item, index) of tableData"
              :key="index + 'order5'"
              :tab-data="item"
            ></AfterDoorTable>
          </div>
          <!--旧机订单-->
          <div v-show="activeKey == '13'">
            <OldMachineTable
              :activeKey="activeKey"
              v-for="(item, index) of tableData"
              :key="index + 'order6'"
              :tab-data="item"
            ></OldMachineTable>
          </div>
          <a-empty class="pt-40px" v-if="!tableLoading && tableData.length == 0" />
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
  import { defineComponent, ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import SalesTable from './component/SalesTables.vue'
  import InvestmentTable from './component/InvestmentTable.vue'
  import InstallationOrderTable from './component/InstallationOrderTables.vue'
  import RecyclingTable from './component/RecyclingTables.vue'
  import AfterDoorTable from './component/AfterDoorLists.vue'
  import OldMachineTable from './component/OldMachineTables.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForms.vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { getColumns, MockTableData } from './data/configuration'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  // tabs 配置
  // 订单类型,0.主订单 11.销售订单(order_sell)，12.投资订单(order_invest)，
  // 13.旧机订单31:售后上门订单 32:安装单 33:回收单

  const activeKey = ref('11')
  const tabsList = ref([
    { key: '11', name: '销售订单' },
    { key: '12', name: '投资订单' },
    { key: '32', name: '安装订单' },
    { key: '33', name: '回收订单' },
    { key: '31', name: '售后上门订单' },
    { key: '13', name: '旧机订单' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.total = 0
    filterData.value = {}
    // loadTableData()
  }
  // financeBillOrderPage
  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.pageNo = 1
    filterData.value = {}
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
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
    loadTableData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        type: activeKey.value,
        ...filterData.value,
        pageNo: paginations.pageNo,
        pageSize: paginations.pageSize,
      }
      const { code, data } = await AdminHttp.FINANCE.financeBillOrderPage(params)
      if (code === '20001') {
        let pageData = null
        switch (activeKey.value) {
          case '11':
            pageData = data.billOrderSellVOPage
            break
          case '12':
            pageData = data.billOrderInvestVOPage
            break
          case '32':
            pageData = data.billOrderInstallVOPage
            break
          case '33':
            pageData = data.billOrderRecycleVOPage
            break
          case '31':
            pageData = data.billOrderAfterSaleVOPage
            break
          case '13':
            pageData = data.billOrderOldVOPage
            break
        }
        if (pageData) {
          tableData.value = pageData.records ? pageData.records : []
          paginations.total = pageData.total
        } else {
          tableData.value = []
          paginations.total = 0
        }

        // 这个是mock数据
        // tableData.value = MockTableData;
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
