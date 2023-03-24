<template>
  <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm ref="SearchRef" @rest="handlerRest" @submit="handlerSubmit" />
      <!-- <ModelForm
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
	  /> -->
    </div>

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
            <template v-if="column.dataIndex === 'storeName'">
              <AButton v-if="record.storeName" type="link" @click="goDetail(record)"
                >{{ record.storeName }}
              </AButton>
            </template>
            <template v-if="column.dataIndex === 'canWithdrawAmount'">
              <span v-if="record.canWithdrawAmount != null">{{ record.canWithdrawAmount }}</span>
              <span v-else>/</span>
            </template>
            <template v-if="column.dataIndex === 'awaitSettlementAmount'">
              <span v-if="record.awaitSettlementAmount != null">{{
                record.awaitSettlementAmount
              }}</span>
              <span v-else>/</span>
            </template>
          </template>
        </ATable>
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
  // import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useRouter } from 'vue-router'
  import { usePermission } from '/@/hooks/web/usePermission'
  import { message } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  // import ModelForm from './component/ModelForm.vue'
  // import InvestmentForm from './component/InvestmentForm.vue'

  const { hasPermission } = usePermission()
  const activeKey = ref('1')
  const tabsList = ref([
    { key: '1', name: '账户统计' },
    { key: '2', name: '应付账款统计' },
    { key: '3', name: '应收账款统计' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.total = 0
    filterData.value = {}
    loadTableData()
  }
  // --------全局参数---------------
  const SearchRef = ref()
  // const ModelRef = ref()
  // const InvestRef = ref()
  const router = useRouter() // 路由跳转函数
  // ------操作按钮----------

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
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

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.COMPANY.companyStatisticsAgentAccountInfo(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records ? data.records : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  // 服务商跳转详情
  const goDetail = (record) => {
    const flag = hasPermission('/v1/order/count/invest/brand/count')
    if (!flag) {
      return message.warn('暂无权限，无法操作')
    }
    router.push({
      path: '/statistical/account/agentStatistical',
      query: { companyId: record.id, companyName: record.storeName },
    })
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
