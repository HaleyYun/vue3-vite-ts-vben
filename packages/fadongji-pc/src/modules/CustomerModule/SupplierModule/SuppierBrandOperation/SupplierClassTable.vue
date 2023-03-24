<template>
  <div class="page-wrap">
	<div class="page-containner">
	  <div class="bg-white p-24px pb-4px mb-24px">
		<ClassFilterForm
		  @rest="handlerFilterRest"
		  @submit="handlerFilterSubmit"
		  :currentTabIndex="activeKey"
		/>
	  </div>
	  <div class="bg-white p-24px">
		<EraTableTitle :total="paginations.total" />
		<EraSwitchTable title="">
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
			  @change="handleTableChange"
			  bordered
			>
			  <template #bodyCell="{ column, text, record }">
				<template v-if="column.dataIndex === 'logoUrl'">
				  <div class="rich-column">
					<div class="rich-resource">
					  <FileUrlPrase :file-url="record.logoUrl"/>
					</div>
				  </div>
				</template>
				<template v-if="column.dataIndex === 'applicationType'">
				  <span v-if="record.applicationType === 1">已有品牌 </span>
				  <span v-if="record.applicationType === 2">自选品牌 </span>
				</template>
				<template v-if="column.dataIndex === 'source'">
				  <span v-if="record.source === 1">商品上架 </span>
				  <span v-if="record.source === 2">品牌申请 </span>
				</template>
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
				  
				  <template
					v-if="
                      record.status === 1 &&
                      (record.applicationType === 2 || record.applicationType === 1)
                    "
				  >
					<AButton @click="auditDetails(record,'audit')" type="link" v-auth="'/v1/goods/brand/apply/audit'">
					  审核
					</AButton>
				  </template>
				  
				  <AButton v-if="record.status === 2" type="link" v-auth="'/v1/goods/brand/apply'"
						   @click="auditDetails(record) "
				  >查看详情
				  </AButton
				  >
				  <AButton v-if="record.status === 3" type="link" v-auth="'/v1/goods/brand/apply'"
						   @click="auditDetails(record)"
				  >查看详情
				  </AButton>
				</template>
			  </template>
			</ATable>
			<AModal
			  v-model:visible="brandModal.visible"
			  :title="brandModal.title"
			  width="600px"
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
				  :label-col="{ span: 5 }"
				  :wrapper-col="{ span: 19 }"
				  :scroll="{ x: 1200 }"
				  @finish="onFinish"
				  @finishFailed="onFinishFailed"
				>
				  <EraSectionByTab title="申请信息">
					<div class="margin-t-10">
					  <AFormItem label="品牌名称" style="margin-bottom: 10px">
						<span>{{ brandModal.currentItem.name }}</span>
					  </AFormItem>
					  <AFormItem label="品牌logo" style="margin-bottom: 10px">
						<EraImage :width="60" :src="brandModal.currentItem.logoUrl"></EraImage>
					  </AFormItem>
					  <AFormItem label="申请理由" style="margin-bottom: 10px">
						<span>{{ brandModal.currentItem.applyReason }}</span>
					  </AFormItem>
					  <AFormItem label="提交人" style="margin-bottom: 10px">
						<span> {{ brandModal.currentItem.applicationName }} {{
							brandModal.currentItem.applicantPhone
						  }}</span>
					  </AFormItem>
					  <AFormItem label="供应商" style="margin-bottom: 10px">
                      <span
					  >{{ brandModal.currentItem.shopName }}
                        {{ brandModal.currentItem.shopPhone }}</span>
					  </AFormItem>
					</div>
				  </EraSectionByTab>
				  <EraSectionByTab title="处理信息" class="margin-t-15">
					<div class="margin-t-10" v-if="brandModal.action === 'audit'">
					  <AFormItem label="处理意见" name="radioGroup">
						<a-radio-group
						  v-model:value="formState['radioGroup']"
						  @change="formRadio($event)"
						>
						  <a-radio :value="true">通过</a-radio>
						  <a-radio :value="false">不通过</a-radio>
						</a-radio-group>
					  </AFormItem>
					  <AFormItem label="填写拒绝原因" v-if="!formState['radioGroup']" name="replyValue"
								 :rules="[{ required: true, message: '请填写拒绝原因',trigger: ['change', 'blur'] }]">
						<ATextarea
						  v-model:value.trim="formState.replyValue"
						  placeholder="拒绝原因最多输入50字"
						  :showCount="true"
						  :rows="6"
						  :maxlength="50"
						/>
					  </AFormItem>
					</div>
					<div class="margin-t-10" v-if="brandModal.action === 'show'">
					  <AFormItem label="处理方式" style="margin-bottom: 10px">
						<span v-if="brandModal.currentItem.status === 1">未处理</span>
						<span v-if="brandModal.currentItem.status === 2">已通过 </span>
						<span v-if="brandModal.currentItem.status === 3">已拒绝</span>
					  </AFormItem>
					  
					  <AFormItem label="原因说明" style="margin-bottom: 10px" v-if="brandModal.currentItem.status === 3">
						<span>{{ brandModal.currentItem.reason }}</span>
					  </AFormItem>
					  <AFormItem label="绑定品牌" style="margin-bottom: 10px" v-else>
						<span>{{ brandModal.currentItem.name }}</span>
					  </AFormItem>
					  <AFormItem label="处理人" style="margin-bottom: 10px">
						<span>{{ brandModal.currentItem.handlerName }}</span>
						<span>{{ brandModal.currentItem.handlerPhone }}</span>
					  </AFormItem>
					  <AFormItem label="处理时间" style="margin-bottom: 10px">
						<span>{{ brandModal.currentItem.approvalTime }}</span>
					  </AFormItem>
					</div>
				  
				  </EraSectionByTab>
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
import {nextTick, onBeforeMount, onMounted, reactive, ref, watch} from 'vue'
import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'

import {BrandClassData} from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/data/BrandClassData'
import adminHttp from '/@/utils/http/adminHttp'
import ClassFilterForm
  from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/conponents/ClassFilterForm.vue'
import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
import {useMessage} from '/@/hooks/web/useMessage'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import type {FormInstance} from 'ant-design-vue'
import EraSectionByTab from '/@/components/EraSectionByTab/EraSectionByTab.vue'
import EraImage from '/@/components/EraImage/EraImage.vue'
import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

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
  console.log(record, '审核详情')
  
  categoryID = record.brandId
  supplierID = record.id
  status = record.status
  shopId = record.shopId
  
  brandModal.currentItem = record
  formState.radioGroup = true // 默认为通过
  //1已有品牌2自选品牌
  brandModal.applicationType = record.applicationType
  brandModal.visible = true
}
//审核详情/goods/brand/apply/{id}
const auditDetails = async (item, action = 'show') => {
  brandModal.action = action
  await adminHttp
	.goodsBrandApplyId({id: item.id})
	.then((res) => {
	  // createMessage.success({ content: `操作成功`, key: loadingCtxkey })
	  console.log(res, 'res')
	  
	  viewDetails(Object.assign({}, res.data, item))
	  
	  // item.status = 1
	  // loadTableData()
	})
	.catch((err) => {
	  createMessage.error({content: `操作失败:${err.message}`, key: loadingCtxkey})
	})
}
const brandModal = reactive({
  action: 'audit',
  applicationType: null,
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
  if (brandModal.action !== 'audit') {
	brandModal.visible = false
	return;
  }
  formRef.value.validate().then((res) => {
	console.log(res, 'success')
	createMessage.loading({content: 'Loading...', key: loadingCtxkey})
	// /v1/goods/brand/apply/audit
	adminHttp
	  .goodsBrandApplyAudit({
		brandId: categoryID,
		flag: formState.radioGroup,
		id: supplierID,
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
const handlerFilterSubmit = ({values}) => {
  paginations.current = 1
  filterData.value = values
  loadTableData()
}

// table 列
const tabColumns = ref(BrandClassData)
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
  await loadTableData()
})

// 分页
const paginationChange = ({current, pageSize}) => {
  paginations.current = current
  paginations.pageSize = pageSize
  loadTableData()
}
const handleTableChange = (pagination, filters, sorter) => {
  filterData.value.orderProperty = sorter.field
  if (sorter.field == 'createTime') {
	filterData.value.orderProperty = 'create_time'
  }
  console.log(sorter.order)
  filterData.value.orderType = sorter.order == 'descend' ? 'DESC' : 'ASC'
  loadTableData()
}
onMountedOrActivated(() => {
  loadTableData()
})
//获取列表  /goods/brand/apply/page
const loadTableData = async () => {
  tableLoading.value = true
  const filterParams = {
	...filterData.value,
	pageSize: paginations.pageSize,
	pageNo: paginations.current,
	// status:'0'
  }
  const {records, total} = await adminHttp
	.goodsBrandApplyPage(clearObjectUnalbeAttr(filterParams))
	.then((res) => res.data)
	.catch((err) => {
	  // console.log(err)
	  console.log(`获取列表失败:${err.message}`)
	  return {records: [], total: 0}
	})
	.finally(() => {
	  tableLoading.value = false
	})
  paginations.total = total
  tableData.value = records
}

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
