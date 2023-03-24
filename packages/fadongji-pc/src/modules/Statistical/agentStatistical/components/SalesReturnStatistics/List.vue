<template>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <span class="font-bold text-base">{{ companyName }}</span>
      <span class="ml-5px text-xs text-gray-300">数据更新至 {{ updateTime }}</span>
    </div>
    <a-divider style="margin: 0; border-color: rgb(243, 243, 243)" />
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'salesCount'">
              <a @click="goOrder(record)">{{ record.salesCount }}</a>
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
</template>

<script lang="ts" setup>
  import { ref, reactive, createVNode, onBeforeMount } from 'vue'
  import { message, Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useRouter, useRoute } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, mockTableData } from './data/configuration'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { VoUtils } from '@vocen/shared'

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()
  const route = useRoute()
  import { usePermission } from '/@/hooks/web/usePermission'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { hasPermission } = usePermission()
  const companyName = route.query.companyName
  // 详情
  const goOrder = (record) => {
    console.log(record.sellerId, 'sellerIdsellerId')

    const flag = hasPermission('/v1/order/refund/query/page')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    //跳转服务商投资订单 传递参数买家名称进行搜索
    // agentId:route.query.companyId,
    // 点击退货量，跳转到【服务商】-【退换货处理订单】全部列表，筛选出：
    //卖方为此服务商
    //筛选区间内，该品牌的所有已完成的退货退款、仅退款的订单。
    router.push({
      path: '/OrderModule/agentOrder/agentHandleOrder',
      query: {
        buyerName: record.buyerName,
        brandId: record.brandId,
        shopId: record.sellerId,
      },
    })
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    filterData.value = {
      ...values,
    }
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

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
        agentId: route.query.companyId,
      }
      const { code, data } = await AdminHttp.ORDER.orderCountSellRefundBrandCount(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        // mock 数据
        //tableData.value = mockTableData;
        paginations.total = data.total
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  const updateTime = ref('')
  onMountedOrActivated(() => {
    updateTime.value = VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
