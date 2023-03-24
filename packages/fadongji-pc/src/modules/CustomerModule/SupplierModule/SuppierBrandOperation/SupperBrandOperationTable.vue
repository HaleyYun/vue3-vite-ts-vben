<template>
  <div class="page-wrap">
	<div class="page-containner">
	  <div class="bg-white p-24px pb-4px mb-24px">
		<BrandFilterForm
		  @rest="handlerFilterRest"
		  @submit="handlerFilterSubmit"
		  :currentTabIndex="activeKey"
		/>
	  </div>
	  <div class="bg-white p-24px" >
		<EraTableTitle :total="paginations.total" />
		<EraSwitchTable>
		  <template #tableEdit>
			<!-- <ThinkOpForm />  BrandContainerData-->
		  </template>
		  <template #content>
			<ATable
			  :loading="tableLoading"
			  :rowKey="(record) => record.id"
			  :columns="tabColumns"
			  :data-source="tableData"
			  :pagination="false"
			  size="small"
			  bordered
			  @change="handleTableChange"
			>
			  <template #bodyCell="{ column, text, record }">
				<!-- //认证状态  1 未处理  2审批通过  3审批未通过 -->
				<template v-if="column.dataIndex === 'status'">
				  <span v-if="record.status === 1">未处理</span>
				  <span v-if="record.status === 2">已通过 </span>
				  <span v-if="record.status === 3">已拒绝</span>
				</template>
				
				<template v-if="column.dataIndex === 'operation'">
				  <!-- <AButton v-if="record.status === 0" type="link" @click="openDetailDialog(record)"
					>查看详情</AButton
				  > -->
				  
				  <AButton
					v-if="record.status === 1"
					@click="viewDetails(record)"
					v-auth="'/v1/goods/category/apply/update'"
					type="link"
				  >审核
				  </AButton>
				  
				  <AButton v-if="record.status === 2" type="link">--</AButton>
				  <AButton v-if="record.status === 3" type="link"
				  >拒绝原因：<span>{{ record.reason }}</span>
				  </AButton>
				</template>
			  </template>
			</ATable>
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
				  :label-col="{ span: 9 }"
				  :wrapper-col="{ span: 20 }"
				  :scroll="{ x: 1200 }"
				  @finish="onFinish"
				  @finishFailed="onFinishFailed"
				>
				  <AFormItem label="处理意见" name="radioGroup">
					<a-radio-group
					  v-model:value="formState['radioGroup']"
					  @change="formRadio($event)"
					>
					  <a-radio :value="true">审核通过</a-radio>
					  <a-radio :value="false">拒绝通过</a-radio>
					</a-radio-group>
				  </AFormItem>
				  <AFormItem
					class="text-current"
					:label-col="{ span: 11 }"
					:wrapper-col="{ span: 20 }"
					v-if="!formState.radioGroup"
					:rules="[{ required: true, message: '请填写拒绝原因',trigger: ['change', 'blur'] }]"
					name="replyValue"
				  >
					<ATextarea
					  v-model:value.trim="formState.replyValue"
					  placeholder="拒绝原因最多输入20字"
					  :showCount="true"
					  :rows="6"
					  :maxlength="20"
					/>
				  </AFormItem>
				</AForm>
			  </div>
			</AModal>
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
import {nextTick, reactive, ref, watch} from 'vue'
import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'

import {
  BrandContainerData
} from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/data/BrandContainerData'
import adminHttp from '/@/utils/http/adminHttp'
import BrandFilterForm
  from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/conponents/BrandFilterForm.vue'
import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
import {useMessage} from '/@/hooks/web/useMessage'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import type {FormInstance} from 'ant-design-vue'
import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'

const activeKey = ref('one')

const {createMessage} = useMessage()
const formState = reactive<FormState>({
  replyValue: '',
  radioGroup: true,
})

interface FormState {
  replyValue: string
  radioGroup: any
}

let categoryID = <any>ref([])
let status = <any>ref()
let supplierID = <any>ref()
let reason = <any>ref()
let shopId = <any>ref()
// 修改“运营类别”的
let tableData = ref([])
const loadingCtxkey = 'handlerRow'
//审核弹框
const viewDetails = (record) => {
  console.log(record, 'record')
  
  categoryID = record.categoryId.replace(/\[|]/g, '').split(',')
  supplierID = record.id
  status = record.status
  shopId = record.shopId
  formState.radioGroup = true;
  
  // console.log(status, 'status')
  brandModal.visible = true
}
const brandModal = reactive({
  visible: false,
  title: '审核详情',
  currentItem: null,
  rejectReason: '',
  confirmLoading: false,
  currentId: '',
})
//审核框取消
const BrandsCancel = () => {
  brandModal.visible = false
}
const onFinish = (values: any) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const formRef = ref<FormInstance | undefined>()
//审核确认框/v1/user/info/update/reason
const BrandsAdd = () => {
  formRef.value.validate().then((res) => {
	console.log(res, 'success')
	createMessage.loading({content: 'Loading...', key: loadingCtxkey})
	
	adminHttp
	  .goodsCategoryApplyUpdate({
		categoryId: categoryID,
		shopId: shopId,
		id: supplierID,
		flag: formState.radioGroup,
		status: status,
		reason: formState.replyValue,
	  })
	  .then(() => {
		loadTableData()
		createMessage.success({content: `操作成功`, key: loadingCtxkey})
		brandModal.visible = false
		formState.replyValue = ''
	  })
	  .catch((err) => {
		createMessage.error({content: `操作失败:${err.message}`, key: loadingCtxkey})
	  })
  })
}
const appear = ref(false)
//单选
const formRadio = (event) => {
  console.log(event, 'event')
  if (event.target.value === 'false') {
	appear.value = true
  } else {
	appear.value = false
	formState.replyValue = ''
  }
}
const filterData = ref({
  orderProperty: 'create_time',
  orderType: 'DESC'
})
const handlerFilterRest = ({values}) => {
  filterData.value = {
	orderProperty: 'create_time',
	orderType: 'ASC'
  }
  loadTableData()
}
// filterData.value.orderType = sorter.order == 'descend' ? 'DESC' : 'ASC'
const handlerFilterSubmit = ({values}) => {
  paginations.current = 1
  filterData.value = values
  console.log(values)
  loadTableData()
}

// table 列
const tabColumns = ref(BrandContainerData)
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
// 排序
const handleTableChange = (pagination, filters, sorter) => {
  filterData.value.orderProperty = sorter.field
  if (sorter.field == 'createTime') {
	filterData.value.orderProperty = 'create_time'
  }
  filterData.value.orderType = sorter.order == 'descend' ? 'ASC' : 'DESC'
  loadTableData()
}
//获取列表  v1/goods/category/apply/query/list
const loadTableData = async () => {
  tableLoading.value = true
  const filterParams = {
	...filterData.value,
	pageSize: paginations.pageSize,
	pageNo: paginations.current,
  }
  try {
	const {data, code} = await adminHttp.goodsCategoryApplyQueryList(
	  clearObjectUnalbeAttr(filterParams),
	)
	if (code === '20001') {
	  paginations.total = data ? data.total : 0
	  tableData.value = data && data.records ? data.records : []
	}
	tableLoading.value = false
  } catch (e) {
	tableLoading.value = false
  }
}

loadTableData()
</script>
<style lang="less" scoped>
::v-deep(.ant-tabs-nav) {
  margin: 0 !important;
}

.page-wrap {
  // margin: 15px;
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

.text-current {
  margin-left: 100px;
}
</style>
