<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <InstallFilterForm @rest="handlerRest" @submit="handlerSubmit" />
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="paginations.total" />
        <div class="text-center min-h-150px">
          <div class="w-full flex text-center items-contents head-style">
            <div
              class="p-16px headItem"
              v-for="(item, index) of tableColumns"
              :key="index + 'order'"
              :style="{ width: item.width }"
            >
              {{ item.title }}
            </div>
          </div>
          <a-spin tip="加载中..." :spinning="tableLoading">
            <TableList
              v-for="(item, index) of tableData"
              :key="index + 'order'"
              :tab-data="item"
              @updateTable="loadTableData"
            />
            <a-empty class="pt-40px" v-if="!tableLoading && tableData.length == 0" />
          </a-spin>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
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
  import { ref, reactive, onBeforeMount } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import { orderRefund } from './data/InvestData'
  import InstallFilterForm from './component/InstallFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'

  import { tableColumns } from './data/InstallAssignData'
  import TableList from './component/tableList.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import adminHttp from '/@/utils/http/adminHttp'

  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  //----- 加载列表数据 ---------
  //   0: 全部
  // 1: 待处理（待指派、安装中投诉、已完成投诉状态的订单）
  // 2: 待付款：显示待付款状态的订单
  // 3: 待接单：显示待接单状态的订单
  // 4: 待安装：显示待安装、安装中状态的订单
  // 5: 已完成：显示已完成状态的订单
  // 9: 已取消：显示已取消、已关闭状态的订单
  const tableLoading = ref(false)
  let tableData = ref<any>([])
  const statusAttrs = {
    one: 0,
    two: 1,
    three: 2,
    four: 3,
    five: 4,
    six: 5,
    seven: 9,
  }
  const loadTableData = async () => {
    await handlerStatus()
    const filterParams = {
      ...filterData.value,
      orderStatus: statusAttrs[activeKey.value],
      ...paginations,
    }
    try {
      tableLoading.value = true
      const { code, data } = await adminHttp.SUPPORT.supportInstallQueryList(
        clearObjectUnalbeAttr(filterParams),
      )
      console.log(tableData)
      if (code == '20001') {
        paginations.total = data.total
        // paginations.current = data.pages
        tableData.value = data.records
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length == 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      tableLoading.value = false
    }
  }
  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部订单', totalCount: 0 },
    { key: 'two', name: '待处理', totalCount: 0 },
    { key: 'three', name: '待付款', totalCount: 0 },
    { key: 'four', name: '待接单', totalCount: 0 },
    { key: 'five', name: '待安装', totalCount: 0 },
    { key: 'six', name: '已完成', totalCount: 0 },
    { key: 'seven', name: '已取消', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10

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
    const { data } = await adminHttp.SUPPORT.supportInstallListCount()
    tabsList.value = [
      { key: 'one', name: '全部订单', totalCount: data.total },
      { key: 'two', name: '待处理', totalCount: data.pending },
      { key: 'three', name: '待付款', totalCount: data.waitingQa },
      { key: 'four', name: '待接单', totalCount: data.waitingOrders },
      { key: 'five', name: '待安装', totalCount: data.waitingVisit },
      { key: 'six', name: '已完成', totalCount: data.finished },
      { key: 'seven', name: '已取消', totalCount: data.canceled },
    ]
  }
</script>

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
</style>
