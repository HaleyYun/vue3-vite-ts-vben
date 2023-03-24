<template>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px flex bg-white items-center justify-between">
      <div>
        <span class="font-bold text-base">{{ companyName }}</span>
        <span class="ml-5px text-xs text-gray-300">数据更新至 {{ updateTime }}</span>
      </div>
      <div class>账户余额：{{ amount }}</div>
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
            <template v-if="column.dataIndex === 'amountType'">
              <div>{{ record.amountType == 1 ? '支' : '收' }}</div>
            </template>
            <template v-if="column.dataIndex === 'detailType'">
              <div>{{ getDetailType(record.detailType) }}</div>
            </template>
            <template v-if="column.dataIndex == 'amount'">
              {{ record.amountType == 1 ? '-' : '+' }}{{ record.amount }}
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
  import { Modal } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useRouter, useRoute } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, mockTableData } from './data/configuration'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  // --------全局参数---------------
  const { createMessage } = useMessage()
  const router = useRouter()
  const route = useRoute()
  const companyName = route.query.companyName

  const getDetailType = (type) => {
    let title
    // 明细类型（明细类型（1.提现；2.货款（订单金额）；3.批发收益(前端展示 -- 货款)；
    // 4.拓客收益；5.仓储费用；6.提现失败退回；7.服务费（集师傅）；8.违约金（集师傅）；9.退款）
    switch (type) {
      case 1:
        title = '提现'
        break
      case 2:
        title = '卖货收益'
        break
      case 3:
        title = '卖货收益'
        break
      case 4:
        title = '拓客收益'
        break
      case 5:
        title = '仓储费用'
        break
      case 6:
        title = '提现失败退回'
        break
      case 7:
        title = '服务费'
        break
      case 8:
        title = '违约金'
        break
      case 9:
        title = '退款'
        break
    }
    return title
  }
  const amount = ref(0)

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

  const initAmount = async () => {
    const { code, data } = await AdminHttp.COMPANY.companyStatisticsAgentAccountAmount({
      companyId: route.query.companyId,
    })
    if (+code === 20001) {
      console.log(data, 'xx')
      amount.value = data
    }
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
        companyId: route.query.companyId,
      }
      await initAmount()
      const { code, data } = await AdminHttp.COMPANY.companyStatisticsAgentAccountDetail(params)
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
