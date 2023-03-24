<template>
  <div class="page-wrap">
	<div class="page-containner">
	  <div class="bg-white p-24px pb-4px mb-24px">
		<CancellationFilterForm
		  @rest="handlerFilterRest"
		  @submit="handlerFilterSubmit"
		  :currentTabIndex="activeKey"
		/>
	  </div>
	  <div class="page-container p-24px">
		<EraSwitchTable title="" :total="paginations.total">
		  <template #content>
			<ATable
			  :loading="tableLoading"
			  :rowKey="(record) => record.id"
			  :columns="tabColumns"
			  :data-source="tableData"
			  :pagination="false"
			  :scroll="{ x: 1200 }"
			  size="small"
			  bordered
			>
			  <template #bodyCell="{ column, text, record }">
				<!-- （1:待审核，2：审核成功，3:审核失败 -->
				<template v-if="column.dataIndex === 'logoffStatus'">
				  <span v-if="record.status === '1'">待审核</span>
				  <span v-if="record.status === '2'">审核成功</span>
				  <span v-if="record.status === '3'">审核失败</span>
				</template>
				<!-- （0:未认证；1:待审核，2：审核成功，3:审核失败 ，4：认证成功，5：认证失败） -->
				<template v-if="column.dataIndex === 'checkStatus'">
				  <span v-if="record.status === '0'">未认证</span>
				  <span v-if="record.status === '1'">待审核</span>
				  <span v-if="record.status === '2'">审核成功</span>
				  <span v-if="record.status === '3'">审核失败</span>
				  <span v-if="record.status === '4'">认证成功</span>
				  <span v-if="record.status === '5'">认证失败</span>
				</template>
				<!-- //店铺状态（1：正常，2：逾期，3：禁言，4：禁止共创，5：禁止直播） -->
				<template v-if="column.dataIndex === 'status'">
				  <span v-if="record.status === '1'">正常</span>
				  <span v-if="record.status === '2'">逾期</span>
				  <span v-if="record.status === '3'">禁言</span>
				  <span v-if="record.status === '4'">禁止共创</span>
				  <span v-if="record.status === '5'">禁止直播</span>
				</template>
			  </template>
			</ATable>
		  </template>
		  
		  <template #pagination>
			<VoPagination
			  :total="paginations.total"
			  :current="paginations.current"
			  :page-size="paginations.pageSize"
			  @pagination="paginationChange"
			/>
		  </template>
		</EraSwitchTable>
	  </div>
	</div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onBeforeMount, reactive, ref, watch} from 'vue'
import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'

import {
  CancellationFiterColumns
} from '/@/modules/CustomerModule/AgentPages/view/AgentCancellation/data/CancellationFiterColumns'
import adminHttp from '/@/utils/http/adminHttp'
// import ThinkOpForm from '/@/modules/ContentModule/view/ThinkManager/conponents/ThinkOpForm.vue'
import CancellationFilterForm
  from '/@/modules/CustomerModule/AgentPages/view/AgentCancellation/conponents/CancellationFilterForm.vue'
import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
import {useMessage} from '/@/hooks/web/useMessage'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import {useRouter} from 'vue-router'
import type {FormInstance} from 'ant-design-vue'

const go = useRouter()
const activeKey = ref('one')
const formRef = ref<FormInstance | undefined>()
const formState = reactive<FormState>({
  replyValue: '',
})

interface FormState {
  replyValue: string
}

const {createMessage} = useMessage()

// 修改“运营类别”的
let tableData = ref([])

const loadingCtxkey = 'handlerRow'

const onFinish = (values: any) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
let replyID = <any>ref()

//回复框取消
const BrandsCancel = () => {
  brandModal.visible = false
}
//回复
const viewDetails = (record) => {
  replyID = record.id
  brandModal.visible = true
}
//回复对话框
const brandModal = reactive({
  visible: false,
  title: '处理投诉',
  currentItem: null,
  rejectReason: '',
  confirmLoading: false,
  currentId: '',
})
const filterData = ref()
const handlerFilterRest = ({values}) => {
  filterData.value = values
  loadTableData()
}
const handlerFilterSubmit = ({values}) => {
  paginations.current = 1
  filterData.value = values
  loadTableData()
}

// table 列
const tabColumns = ref(CancellationFiterColumns)
const tableLoading = ref(false)
const paginations = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
})

watch(activeKey, async () => {
  paginations.total = 0
  paginations.current = 1
  paginations.pageSize = 10
  loadTableData()
})

// 分页
const paginationChange = ({current, pageSize}) => {
  paginations.current = current
  paginations.pageSize = pageSize
  loadTableData()
}
//初始/v1/user/info/user/page     const res = await adminHttp.USER.userInfoDetail({ userId: userDetailId.value })
// const statusAttrs = { one: 0, two: 1, three: 2, four: 3, five: 4, six: 5, seven: 6 }
// const violationAttrs = { one: 0, two: 3, three: 3, four: 1 }//v1/company/info/asset/page
const loadTableData = async () => {
  tableLoading.value = true
  const filterParams = {
	...filterData.value,
	pageSize: paginations.pageSize,
	pageNo: paginations.current,
	platformCode: 'agent',
  }
  console.log(filterParams)
  
  ///v1/goods/investment/query/list/page
  const {records, total} = await adminHttp.CUSTOMER.companyInfoLogoffPage(
	clearObjectUnalbeAttr(filterParams),
  )
	.then((res) => {
	  //res?.data?.records)
	  if (res && res.data && res.data.records) {
		return res.data
	  } else {
		return {
		  records: [],
		  total: 0,
		}
	  }
	})
	.catch((err) => {
	  // console.log(err)
	  console.log(`获取服务商列表失败:${err.message}`)
	  return {records: [], total: 0}
	})
	.finally(() => {
	  tableLoading.value = false
	})
  // console.log(records)
  paginations.total = total
  tableData.value = records
  console.log(tableData.value, '投资列表')
}

onBeforeMount(() => {
  loadTableData()
})
</script>
<style lang="less" scoped>
::v-deep(.ant-tabs-nav) {
  margin: 0 !important;
}

.page-wrap {
  margin: 24px;
}

.filter-form {
  background: #fff;
  margin-bottom: 15px;
  padding: 10px 10px 0;
}

.page-container {
  background-color: white;
}

.table-list {
  .table-list-title {
	display: flex;
	padding: 10px;
	height: 40px;
	justify-content: space-between;
	align-items: center;
	border-bottom: none;
	background-color: #fff;
  }
}

.rich-column {
  display: flex;
  
  .rich-resource {
	margin-right: 10px;
	cursor: pointer;
  }
  
  .rich-content {
  }
}
</style>
