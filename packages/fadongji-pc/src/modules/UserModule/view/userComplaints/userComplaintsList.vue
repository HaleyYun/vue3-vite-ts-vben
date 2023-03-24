<template>
  <div class="m-24px">
	<div>
	  <div class="bg-white p-24px pb-4px mb-24px">
		<userFilterForm
		  @rest="handlerFilterRest"
		  @submit="handlerFilterSubmit"
		  :currentTabIndex="activeKey"
		/>
	  </div>
	  <div class="p-24px bg-white">
		<div>
		  <EraTableTitle :total="paginations.total"></EraTableTitle>
		</div>
		<div>
		  <ATable
			:loading="tableLoading"
			:rowKey="(record) => record.id"
			:columns="tabColumns"
			:data-source="tableData"
			:pagination="false"
			size="small"
			bordered
			:scroll="{ x: 1200}"
		  >
			<template #bodyCell="{ column, text, record }">
			  <template v-if="column.dataIndex === 'fileUrl'">
				<div class="rich-column">
				  <div class="rich-resource">
					<FileUrlPrase :file-url="JSON.parse(record.fileUrl)?.json"/>
				  </div>
				</div>
			  </template>
			  <template v-if="column.dataIndex === 'evaluationContent'">
				<div class="rich-column">
				  <div class="rich-content">{{ JSON.parse(record.evaluationContent)?.ces }}</div>
				</div>
			  </template>
			  <template v-if="column.dataIndex === 'dealReason'">
				<div class="rich-column">
				  <div v-if="record.dealStatusStr === '未处理'">
					<a-tooltip placement="top">
					  <template #title>
						<span>请去工单系统处理</span>
					  </template>
					  <AButton disabled type="link" @click="viewDetails(record)">回复</AButton>
					</a-tooltip>
				  </div>
				  <div v-else class="rich-content">{{ record.dealReason }}</div>
				</div>
			  </template>
			  <template v-if="column.dataIndex === 'evaluationContent'">
				{{ record.evaluationContent ? JSON.parse(record.evaluationContent).content : '' }}
			  </template>
			</template>
		  </ATable>
		</div>
		<div class="flex justify-end py-15px bg-white">
		  <VoPagination
			:total="paginations.total"
			:current="paginations.current"
			:page-size="paginations.pageSize"
			@pagination="paginationChange"
		  />
		</div>
		<AModal
		  v-model:visible="brandModal.visible"
		  :title="brandModal.title"
		  centered
		  destroy-on-close
		  :confirm-loading="brandModal.confirmLoading"
		  @ok="BrandsAdd"
		  @cancel="BrandsCancel"
		>
		  <div class="p-5">
			<AForm
			  ref="formRef"
			  :model="formState"
			  name="basic"
			  autocomplete="off"
			  @finish="onFinish"
			  @finishFailed="onFinishFailed"
			>
			  <AFormItem name="replyValue">
				<ATextarea
				  v-model:value="formState.replyValue"
				  placeholder="回复内容"
				  :rows="4"
				/>
			  </AFormItem>
			</AForm>
		  </div>
		</AModal>
	  </div>
	</div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, reactive, ref, watch} from 'vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
import userFilterForm from './conponents/userFilterForm.vue'
import {userFiterColumns} from '/@/modules/UserModule/view/userComplaints/data/userFiterColumns'
import adminHttp from '/@/utils/http/adminHttp'

import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
import {useMessage} from '/@/hooks/web/useMessage'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import {useRouter} from 'vue-router'
import type {FormInstance} from 'ant-design-vue'
import {usePermission} from '/@/hooks/web/usePermission'

const {hasPermission} = usePermission() // 判断有没有权限

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

//回复确认框/v1/user/info/update/reason
const BrandsAdd = () => {
  formRef.value.validate().then((res) => {
	console.log(res, 'success')
	createMessage.loading({content: 'Loading...', key: loadingCtxkey})
	adminHttp.USER.userInfoUpdateReason({id: replyID, dealReason: formState.replyValue})
	  .then(() => {
		createMessage.success({content: `操作成功`, key: loadingCtxkey})
		// item.status = 1
		loadTableData()
		brandModal.visible = false
		formState.replyValue = ''
	  })
	  .catch((err) => {
		createMessage.error({content: `操作失败:${err.message}`, key: loadingCtxkey})
	  })
  })
}

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
  if (!hasPermission('/v1/user/info/status')) {
	createMessage.error('暂无该操作权限！')
	return
  }
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
  console.log(values)
  loadTableData()
}

// table 列
const tabColumns = ref(userFiterColumns)
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
// const violationAttrs = { one: 0, two: 3, three: 3, four: 1 }
const loadTableData = async () => {
  tableLoading.value = true
  const filterParams = {
	...filterData.value,
	pageSize: paginations.pageSize,
	pageNo: paginations.current,
  }
  console.log(filterParams)
  
  ///v1/goods/investment/query/list/page
  const {records, total} = await adminHttp.USER.userInfoUserPage(
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
	  console.log(`获取用户投诉列表失败:${err.message}`)
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

loadTableData()
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
