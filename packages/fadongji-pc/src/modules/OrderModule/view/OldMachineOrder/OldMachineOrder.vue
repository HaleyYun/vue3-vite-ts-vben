<template>
  <div>
    <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <OldFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div class="text-center min-h-150px">
        <div class="w-full flex text-center  	 items-contents head-style">
          <div class="p-16px headItem" v-for="(item, index) of oldAssignTableColumn" :key="index + 'order'" :style="{ width: item.width }">
            {{ item.title }}
          </div>
        </div>
        <a-spin tip="加载中..."  :spinning="tableLoading">
          <TableList v-for="(item, index) of tableData" :key="index + 'order'" :tab-data="item" @updateTable="loadTableData" />
          <a-empty class="pt-40px" v-if="!tableLoading &&tableData.length == 0" />
        </a-spin>
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

<script setup lang="ts">
  import { ref, reactive, onBeforeMount } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { FieldTimeOutlined } from '@ant-design/icons-vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import OldFilterForm from './component/OldFilterForm.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import TableList from './component/tableList.vue'
  import { oldAssignTableColumn } from './data/OldAssignData'
  import { useRouter } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";


  const rowClassName = () => {
    return 'relative'
  }
  // 订单详情
  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/oldSecondOrder/oldMachineDetails',
      query: {
        id: record.id,
      },
    })
  }
  //----- 加载列表数据 ---------
  let tableLoading = ref(false)
  let tableData = ref<any>([])
  const loadTableData = async () => {
    const filterParams = {
      ...filterData.value,
      orderStatus: Number(activeKey.value) ? activeKey.value : '',
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    try {
      tableLoading.value = true;
      const { code, data } = await adminHttp.ORDER.orderOldQueryList(filterParams)
      if (code == '20001') {
        paginations.total = data.total
        // paginations.current = data.pages
        tableData.value = data.records
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length == 0) {
          paginations.current = paginations.current - 1
          loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    }finally {
      tableLoading.value = false;
    }
  }
  //------tabs页签配置-------
  const activeKey = ref(null)
  const tabsList = ref([])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }
  const initStatistic = async () => {
    try {
      const { code, data } = await adminHttp.ORDER.orderOldEnumStatus()
      if (code === '20001') {
        tabsList.value = data.map((item) => {
          return { key: item.status, name: item.statusStr, totalCount: item.count }
        })
        activeKey.value = data[0]['status']
        loadTableData()
      }
    } catch (e) {
      console.log(e)
    }
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {}
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  //------ 分页查询 -----------------
  const paginations = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  onMountedOrActivated(() => {
    // 初始化数据
    initStatistic()
  })
</script>

<style lang="less">
  .custom-title-table {
    .ant-table-tbody > tr > td {
      position: static;
    }
  }
</style>

<style lang="less" scoped>
  td,
  th {
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    vertical-align: top;
    text-align: center;
  }

  ::v-deep(.table-inner-space) {
    padding: 0 !important;
  }

  // 表格数据
  .order-body {
    .body_top {
      width: 100%;

      .body_top_con {
        margin-top: 10px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        width: 100%;
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }
    }

    .body_content {
      display: flex;

      .body_content_info {
        border-top: unset;
      }

      //商品操作
      .body_content_handle {
        flex: 1;
        text-align: center;
        border-top: unset;
      }
    }
  }
  .warn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1px 8px;
    width: 28px;
    height: 22px;
    font-size: 12px;
    color: #fff;
    background: #f86060;
    border-radius: 2px;
  }
  .countDownStyle {
    font-size: 14px;
    color: #f86060;
    display: flex;
    align-items: baseline;

    ::v-deep(.ant-statistic-content-value) {
      font-size: 14px;
      color: #f86060;
    }
  }
</style>
