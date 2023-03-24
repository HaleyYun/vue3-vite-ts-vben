<template>
  <div>
    <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <RecoveryFilterForm @rest="handlerRest" @submit="handlerSubmit" />
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
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          :size="'default'"
          :total="paginations.total"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import RecoveryFilterForm from './component/RecoveryFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { onBeforeMount, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { doorTime } from '/@/utils/dateUtil'
  import TableList from './component/tableList.vue'
  import { useRouter } from 'vue-router'
  import { tableColumns } from './data/RecoveryAssignData'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/repairShopOrder/recoveryDetails',
      query: {
        id: record.id,
      },
    })
  }
  //关联订单
  const goRelation = (record) => {
    go.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: {
        id: record.relationOrderId,
      },
    })
  }
  //----- 加载列表数据 ---------
  let tableData = ref<any>([])
  const tableLoading = ref(false)
  // 查全部时传0,1待处理,2待查验,3待接单,4待上门,5待寄回,6待收货,7已完成,9已取消
  const statusAttrs = {
    one: 0,
    two: 1,
    three: 2,
    four: 3,
    five: 4,
    six: 5,
    seven: 6,
    eight: 7,
    nine: 9,
  }
  const loadTableData = async () => {
    await handlerStatus()
    const filterParams = {
      ...filterData.value,
      ...paginations,
      orderStatus: statusAttrs[activeKey.value],
    }
    try {
      tableLoading.value = true
      const { code, data } = await adminHttp.ORDER.orderRecyclePage(
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
    { key: 'three', name: '待查验', totalCount: 0 },
    { key: 'four', name: '待接单', totalCount: 0 },
    { key: 'five', name: '待上门', totalCount: 0 },
    { key: 'six', name: '待寄回', totalCount: 0 },
    { key: 'seven', name: '待收货', totalCount: 0 },
    { key: 'eight', name: '已完成', totalCount: 0 },
    { key: 'nine', name: '已取消', totalCount: 0 },
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
  //页签数量
  const handlerStatus = async () => {
    const { data } = await adminHttp.ORDER.orderRecycleListCount()
    tabsList.value = [
      { key: 'one', name: '全部订单', totalCount: data.total },
      { key: 'two', name: '待处理', totalCount: data.pending },
      { key: 'three', name: '待查验', totalCount: data.waitingQa },
      { key: 'four', name: '待接单', totalCount: data.waitingOrders },
      { key: 'five', name: '待上门', totalCount: data.waitingVisit },
      { key: 'six', name: '待寄回', totalCount: data.waitingDelivery },
      { key: 'seven', name: '待收货', totalCount: data.delivered },
      { key: 'eight', name: '已完成', totalCount: data.finished },
      { key: 'nine', name: '已取消', totalCount: data.canceled },
    ]
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
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
        // border-top: unset;
        // align-items: center;
        // justify-content: center;
      }
    }
  }
</style>
