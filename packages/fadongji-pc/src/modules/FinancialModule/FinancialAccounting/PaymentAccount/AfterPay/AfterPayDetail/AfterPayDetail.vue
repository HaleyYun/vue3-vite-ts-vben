<template>
  <div class="bg-white h-100vh m-24px p-24px overflow-y-auto">
    <div>
      <div class="p-20px">
        <PayInfo :descData="payInfoDesc" :payInfo="payInfo"></PayInfo>
      </div>
    </div>
    <div>
      <div class="template--title mb-20px">关联订单</div>
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
        <TableList
          v-for="(item, index) of tableData"
          :key="index + 'order'"
          :tab-data="item"
        ></TableList>
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
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import PayInfo from './components/PayInfo.vue'
  import TableList from './components/tableList.vue'
  import { payInfoDesc } from './data/configuration'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { tableColumns } from './data/configuration'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { useRoute } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const route = useRoute()
  const payInfo = ref({})
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
        ...paginations,
        id: route.query.id as string,
      }
      const { code, data } = await AdminHttp.FINANCE.financeAdvancesStandingDetailBy$id(params)
      if (code === '20001') {
        tableData.value = data.relationOrder
          ? [{ ...data.relationOrder, orderStatusName: data.orderStatusName }]
          : []
        payInfo.value = data
        paginations.total = data.total
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  onMountedOrActivated(() => {
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
