<template>
  <div class="page-wrap">
	<div class="page-containner">
	  <div class="filter-form">
		<HelpFilterForm
		  @rest="handlerFilterRest"
		  @submit="handlerFilterSubmit"
		  :currentTabIndex="activeKey"
		/>
	  </div>
	  <!-- v-auth="'/v1/content/help/category/condition'" -->
	  <div class="page-container padding-24">
		<EraSwitchTable :total="paginations.total">
		  <template #tableEdit>
			<AButton
			  type="primary"
			  class="margin-r-10"
			  @click="addItemFunc(record)"
			  v-auth="'/v1/content/help/content/save/batch'"
			>新增内容
			</AButton>
			<AButton
			  type="primary"
			  class="margin-r-10"
			  @click="merchantUniversityFunc"
			  v-auth="'/v1/content/help/category/condition'"
			>分类管理
			</AButton>
		  </template>
		  <template #content>
			<ATable
			  :loading="tableLoading"
			  :rowKey="(record) => record.id"
			  :columns="tabColumns"
			  :data-source="tableData"
			  :pagination="false"
			  :scroll="{ y: 1200 }"
			  size="small"
			  bordered
			>
			  <template #bodyCell="{ column, text, record }">
				<template v-if="column.dataIndex === 'platformCode'">
				  <template v-if="record.platformCode === 'supplier'"> 供应商</template>
				  <template v-else-if="record.platformCode === 'agent'"> 服务商</template>
				  <template v-else-if="record.platformCode === 'garage'"> 修理厂</template>
				  <template v-else-if="record.platformCode === 'skilledWorker'">集师傅</template>
				  <template v-else-if="record.platformCode === 'oldMachine'"> 旧机买家</template>
				  <template v-else-if="record.platformCode === 'recycling'"> 回收公司</template>
				  <template v-else-if="record.platformCode === 'investmentManager'">
					招商经理
				  </template>
				  <template v-else-if="record.platformCode === 'channelManager'">渠道经理</template>
				</template>
				<template v-if="column.dataIndex === 'isEnable'">
				  <ASwitch
					checked-children="开"
					un-checked-children="关"
					v-model:checked="record.isEnable"
					@change="contentContentEnableEvent(record.id, record.isEnable)"
				  />
				</template>
				<template v-if="column.dataIndex === 'operation'">
				  <div class="rich-column">
					<div class="rich-content">
					  <a
						class="margin-r-10"
						@click="editItemFunc(record)"
						v-auth="'/v1/content/help/category/condition'"
					  >编辑</a
					  >
					  <APopconfirm
						title="确认要删除吗?"
						ok-text="确认"
						cancel-text="取消"
						@confirm="deleteItemEvent(record.id)"
					  >
						<!-- v-auth="'/v1/content/help/content/delete'" -->
						<a v-auth="'/v1/content/help/content/delete'">删除</a>
					  </APopconfirm>
					</div>
				  </div>
				</template>
				<template v-if="column.dataIndex === 'dealReason'">
				  <div class="rich-column">
					<div v-if="record.dealStatusStr === '未处理'">
					  <AButton type="link" @click="viewDetails(record)">回复</AButton>
					</div>
					<div v-else class="rich-content">{{ record.dealReason }}</div>
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
				</template>
			  </template>
			</ATable>
		  </template>
		  
		  <template #pagination>
			<VoPagination
			  hideOnSinglePage
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
<script setup name="HelpCenter" lang="ts">
import {nextTick, reactive, ref, watch, toRefs, unref} from 'vue'
import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import HelpFilterForm from '/@/modules/ContentModule/view/HelpCenter/compontents/HelpFilterForm.vue'
import {HelpFiterColumns} from '/@/modules/ContentModule/view/HelpCenter/data/HelpFiterColumns'

import {useRouter} from 'vue-router'
import {router} from '/@/router'
import type {FormInstance} from 'ant-design-vue'
import adminHttp from '/@/utils/http/adminHttp'
import {useMessage} from '/@/hooks/web/useMessage'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import {useContentWithOut} from '/@/store/modules/content'
import {onBeforeMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

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
const editItemFunc = (record) => {
  const useStore = useContentWithOut()
  console.log(unref(record.id))
  useStore.setDetailList({...toRefs(record)})
  router.push({
	path: '/contentModule/content/addCenterDetails',
	query: {
	  id: unref(record.id),
	},
  })
}
const addItemFunc = (record) => {
  router.push({
	path: '/contentModule/content/addCenterDetails',
	// query: {
	//   id: record.id,
	// },
  })
}
//删除/v1/content/help/content/delete
const deleteItemEvent = async (itemId) => {
  createMessage.loading({content: 'Loading...', key: loadingCtxkey})
  try {
	createMessage.success({content: `删除成功`, key: loadingCtxkey})
	const deleteMap = {id: itemId}
	const {code} = await adminHttp.CONTENTMENT.contentHelpContentDelete(deleteMap)
	if (code == '20001') {
	  await loadTableData()
	}
  } catch (err) {
  } finally {
	// createMessage.error({ content: `删除失败`, key: loadingCtxkey })
  }
}
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
///v1/content/help/content/enable
const contentContentEnableEvent = async (ID, eventStatus) => {
  let isEnableMap = {id: ID, isEnable: eventStatus}
  createMessage.loading({content: 'Loading...', key: loadingCtxkey})
  try {
	const {code} = await adminHttp.CONTENTMENT.contentHelpContentEnable(isEnableMap)
	
	if (code === '20001') {
	  // await initStudyData()
	  createMessage.success({content: `修改成功`, key: loadingCtxkey})
	} else {
	  createMessage.error({content: `操作失败`, key: loadingCtxkey})
	  await loadTableData()
	}
  } catch (err) {
  } finally {
  }
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
  filterData.value = values
  paginations.current = 1
  loadTableData()
}

// table 列
const tabColumns = ref(HelpFiterColumns)
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
//初始/v1/content/help/category/condition adminHttp.CONTENTMENT.contentContentDelete(deleteMap)
const loadTableData = async () => {
  tableLoading.value = true
  const filterParams = {
	...filterData.value,
	pageSize: paginations.pageSize,
	pageNo: paginations.current,
  }
  const {records, total} = await adminHttp.CONTENTMENT.contentHelpContentCondition(
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
	  console.log(`获取列表失败:${err.message}`)
	  return {records: [], total: 0}
	})
	.finally(() => {
	  tableLoading.value = false
	})
  // console.log(records)
  paginations.total = total
  tableData.value = records
}
onBeforeMountedOrActivated(() => {
  loadTableData()
})
//分类管理
const merchantUniversityFunc = () => {
  go.push({
	path: '/contentModule/content/classification',
  })
}
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
  padding: 24px 24px 4px 24px;
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
