<template>
  <div>
	<div class="bg-white m-24px p-24px mb-82px">
	  <div class="page-step p-12px">
		<OrderSteps :stepsList="stepsList" :status="orderInfo.status"></OrderSteps>
	  </div>
	  <div class="page-table">
		<OrderAlert :statusName="orderInfo.statusName"
					:cancelReason="orderInfo.cancelReason&&orderInfo.cancelReason"></OrderAlert>
		<div class="basic-data pb-10 pt-10">
		  <div class="template--title mb-20px">基本信息</div>
		  <ADescriptions :column="3" bordered layout="vertical" :data="orderInfo" :schema="baseData">
			<ADescriptionsItem v-for="(item, index) of baseData" :label="item.title">
			  <template v-if="item.key == 'desc'">
				<div>
				  <div>{{ orderInfo.faultDetail && orderInfo.faultDetail.desc }}</div>
				  <div v-if="orderInfo.faultDetail && orderInfo.faultDetail.voice">
					<VoAudio :source="orderInfo.faultDetail.voice"></VoAudio>
				  </div>
				</div>
			  </template>
			  <template v-else-if="item.key == 'pic'">
				<VoPreviewHeadImg v-if="orderInfo.faultDetail"
								  :data-source="orderInfo.faultDetail.pic"></VoPreviewHeadImg>
			  </template>
			  <template v-else-if="item.key == 'buyerName'">
              <span
			  ><a @click="shopDetails">{{ orderInfo.buyerName }}</a></span
			  >
			  </template>
			  <template v-else-if="item.key == 'orderAddress'">
				<span>{{ orderAddress.name }}</span>
				<span>&nbsp;&nbsp;{{ orderAddress.phone }}</span>
				<div>{{ orderAddress.address }}{{ orderAddress.addressDetail }}</div>
			  </template>
			  <template v-else-if="item.key == 'masterName'">
				<div>{{ orderInfo.masterName }}</div>
				<div>{{ orderInfo.masterPhone }}</div>
			  </template>
			  <template v-else-if="item.key == 'homeStartTime'">
				<div v-if="orderInfo.homeStartTime "
					 v-html="doorTime(orderInfo.homeStartTime,orderInfo.homeEndTime)"></div>
			  </template>
			  <template v-else-if="item.key == 'relationOrderId'">
				<a @click="goRelationOrder">{{ orderInfo.relationOrderId }}</a>
			  </template>
			  <template v-else>
				{{ orderInfo[item.key] }}
			  </template>
			</ADescriptionsItem>
		  </ADescriptions>
		</div>
		<div class="profit-data pb-50" v-if="orderInfo.status == 3160 || orderInfo.status == 3170">
		  <div class="template--title mb-20px">旧机确认结果</div>
		  <div>
			<a-form
			  :model="orderInfo.faultDetail"
			  name="basic"
			  :label-col="{ span: 3 }"
			  :wrapper-col="{ span: 20 }"
			  autocomplete="off"
			>
			  <a-form-item label="旧机识别码：">
				{{ orderInfo.qualityResult.engineNo }}
			  </a-form-item>
			  <a-form-item label="旧机故障图片：">
				<div>
				  <VoPreviewHeadImg :data-source="faultPic"></VoPreviewHeadImg>
				</div>
			  </a-form-item>
			  <a-form-item label="旧机故障视频：">
				<VoPreviewHeadImg :data-source="faultVideo"></VoPreviewHeadImg>
			  </a-form-item>
			</a-form>
		  </div>
		</div>
	  </div>
	</div>
	<div v-if="orderInfo.status == 3130 ||orderInfo.status == 3140||orderInfo.status == 3160"
		 class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px">
	  <template v-if="orderInfo.status == 3130">
		<AButton v-auth="'/v1/order/assign/assign'" type="primary" class="margin-r-30" @click="appointedOrder">指派接单
		</AButton>
		<AButton v-auth="'/v1/order/support/after/sale/cancel'" type="primary" class="margin-r-30"
				 @click="cancelOrder()">
		  取消订单
		</AButton>
		<AButton v-auth="'/v1/order/support/after/sale/update'" type="primary" class="margin-r-20"
				 @click="editOrder(orderInfo)"
		>修改订单
		</AButton
		>
	  </template>
	  <template v-if="orderInfo.status == 3140">
		<AButton v-auth="'/v1/order/assign/assign'" type="primary" class="margin-r-20" @click="appointedOrder">改派
		</AButton>
	  </template>
	  <template v-if="orderInfo.status == 3160">
		<AButton v-auth="'/v1/order/support/after/sale/confirm'" type="primary" class="margin-r-20"
				 @click="confirmCompletion">
		  确认完成
		</AButton>
	  </template>
	</div>
	<!-- 操作日志 -->
	<AModal v-model:visible="logVisible" width="1000px" title="操作日志" @ok="handleOk">
	  <div class="p-5">
		<ATable
		  :dataSource="tableData"
		  :columns="orderRefund.handleColumns"
		  bordered
		  :pagination="false"
		>
		  <template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'status'">
			  <span v-if="record.status === 2110">待审核</span>
			  <span v-if="record.status === 2120">待发货</span>
			  <span v-if="record.status === 2140">待签收</span>
			  <span v-if="record.status === 2130">待退款</span>
			  <span v-if="record.status === 2150">已完成</span>
			  <span v-if="record.status === 2160">已关闭</span>
			</template>
		  </template>
		</ATable>
	  </div>
	</AModal>
	<AssignedModal v-model:orderInfo="assignedInfo" @updateData="loadTableData"></AssignedModal>
	<EditOrderModal v-model:orderInfo="editOrderInfo" @updateData="loadTableData"></EditOrderModal>
  </div>

</template>

<script lang="ts" setup>
import {onBeforeMount, ref, createVNode, reactive, nextTick} from 'vue'

import adminHttp from '/@/utils/http/adminHttp'
import {clearObjectUnalbeAttr} from '/@/utils/helper/formHelper'
import {Modal} from 'ant-design-vue'
import {useRoute} from 'vue-router'
import {useRouter} from 'vue-router'
import {useMessage} from '/@/hooks/web/useMessage'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {createFromIconfontCN} from '@ant-design/icons-vue'
import {doorTime} from '/@/utils/dateUtil'
import {baseData} from './data/DoorAssignData'
import {orderRefund} from '../InstallationOrder/data/InvestData'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
import VoAudio from '/@/components/VoAudio/VoAudio.vue'
import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
import EditOrderModal from './component/EditOrderModal/EditOrderModal.vue'
import OrderAlert from '/@/modules/OrderModule/component/OrderAlert/OrderAlert.vue'
import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
})
const go = useRouter()
const route = useRoute()
const {createMessage} = useMessage()

const orderInfo = ref({}) // 订单详情信息
const orderAddress = ref({}) // 订单地址
let stepsList = ref([])
let statusName = <any>ref({})
const faultVideo = ref([])
const faultPic = ref([])
const loadingCtxkey = 'handlerRow'
const loadTableData = async () => {
  try {
	const res = await adminHttp.ORDER.orderSupportAfterSaleDetailBy$id({
	  id: route.query?.id,
	})
	orderInfo.value = res.data
	
	orderAddress.value = res.data.orderAddress
	if (res.data.qualityResult) {
	  faultPic.value = res.data.qualityResult.pic
	  try {
		if (typeof res.data.qualityResult.video == 'string') {
		  res.data.qualityResult.video = JSON.parse(res.data.qualityResult.video)
		}
		faultVideo.value = res.data.qualityResult.video.map(item => {
		  return item.src
		})
		console.log(faultPic.value)
	  } catch (e) {
		console.log(e)
	  }
	}
	if (orderInfo.value.faultDetail && orderInfo.value.faultDetail.pic) {
	  orderInfo.value.faultDetail.pic = orderInfo.value.faultDetail.pic.map(item => {
		return item.pic
	  })
	}
	//步骤条
	stepsList.value = res.data.timeList
	//状态
	statusName.value = res.data.status
  } catch (e: any) {
	console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
	createMessage.error(e.message)
  }
}
onMountedOrActivated(() => {
  loadTableData()
})

const getStepsList = (stepsList) => {
  if (orderInfo.value.status == 3180) {
	console.log(stepsList.length - 1, 'getStepsList')
	return stepsList.length - 1
  } else {
	const index = stepsList.findIndex(item => !item.createTime)
	console.log(index)
	if (index >= 0) {
	  return index
	} else {
	  return stepsList.length
	}
	
  }
}

//跳转修理厂
const shopDetails = () => {
  go.push({
	path: '/customerModule/garageRouter/repairShopDetails',
	query: {
	  id: orderInfo.value.buyerId,
	  status: 1,
	},
  })
}
// 跳转关联订单
const goRelationOrder = () => {
  go.push({
	path: '/OrderModule/repairShopOrder/afterServiceDetails',
	query: {
	  id: orderInfo.value.relationOrderId,
	},
  })
}
//操作记录
const logVisible = ref<boolean>(false)
const operationLog = () => {
  logVisible.value = true
  tabColumns()
}
//ok
const handleOk = () => {
  logVisible.value = false
}
let tableData = ref([])
//查询日志/v1/order/refund/query/operatelog
const tabColumns = async () => {
  const data = await adminHttp.Order.orderRefundQueryOperatelog({
	orderId: route.query?.id,
  })
	.then((res) => res.data)
	.catch((err) => {
	  console.log(`获取列表失败:${err.message}`)
	  return {records: [], total: 0}
	})
  
  tableData.value = data
  
  console.log(data, 'res.data')
}

//-----修改订单--------
const editOrderInfo = reactive({
  id: null,
  buyerId: null,
  relationOrderId: null,
  modelId: null,
  engineNo: null,
  buyerName: null,
  assignVisible: false,
})
const editOrder = (record) => {
  
  editOrderInfo.id = record.id;
  editOrderInfo.buyerId = record.buyerId;
  editOrderInfo.relationOrderId = record.relationOrderId;
  editOrderInfo.modelId = record.engineDetail && record.engineDetail.modelId ? record.engineDetail.modelId : null;
  editOrderInfo.engineNo = record.engineNo;
  editOrderInfo.buyerName = record.buyerName;
  editOrderInfo.assignVisible = true;
  console.log(editOrderInfo, record)
}

// ---取消订单-------
const cancelOrder = () => {
  const modal = Modal.confirm({
	title: '取消订单',
	icon: createVNode(ExclamationCircleOutlined),
	okText: '确认取消',
	cancelText: '我再想想',
	content: '请确认是否取消该服务订单？',
	onOk() {
	  // 调取完成的接口
	  AfterSaleCancel(orderInfo.value.id)
	  modal.destroy()
	},
	
	onCancel() {
	  modal.destroy()
	},
  })
}
const AfterSaleCancel = async (id) => {
  // orderSupportAfterSaleCancel
  try {
	const {code} = await adminHttp.ORDER.orderSupportAfterSaleCancel({orderId: id})
	if (code === '20001') {
	  createMessage.success('操作成功')
	  loadTableData()
	}
  } catch (e) {
	createMessage.success(e.message)
  }
}
//确认安装完成
const confirmCompletion = () => {
  const modal = Modal.confirm({
	title: '确认完成',
	icon: createVNode(ExclamationCircleOutlined),
	okText: '确认完成',
	content: '请确认该服务订单是否已完成？',
	onOk() {
	  // 调取完成的接口
	  let params = {orderId: orderInfo.value.id}
	  commpdityComplete(params)
	  modal.destroy()
	},
	
	onCancel() {
	  modal.destroy()
	},
  })
}

//完成的接口
const commpdityComplete = async (params) => {
  try {
	const {code, message} = await adminHttp.ORDER.orderSupportAfterSaleConfirm(params)
	if (code === '20001') {
	  createMessage.success('操作成功')
	  loadTableData()
	} else {
	  createMessage.error(message)
	}
  } catch (e) {
	console.log(e)
  }
}
//------指派接单-------
//---指派接单------
const assignedInfo = reactive({
  id: null,
  supportType: null,
  homeStartTime: null,
  homeEndTime: null,
  assignVisible: false,
  areaCode: null,
})
const appointedOrder = () => {
  assignedInfo.id = orderInfo.value.id;
  assignedInfo.areaCode = orderInfo.value.orderAddress.areaCode;
  assignedInfo.supportType = orderInfo.value.supportType
  assignedInfo.homeStartTime = orderInfo.value.homeStartTime;
  assignedInfo.homeEndTime = orderInfo.value.homeEndTime;
  console.log(assignedInfo.homeStartTime)
  assignedInfo.assignVisible = true;
}


</script>

<style lang="less" scoped>
::v-deep(.ant-steps-item-description) {
  width: 127px !important;
}

::v-deep(.ant-tabs-bar) {
  margin: 0 !important;
}

::v-deep(.ant-descriptions-item-label) {
  width: 30%;
  color: #262626;
  font-weight: 700;
}

.page-wrap {
  margin: 40px 10px 10px 10px;
  
  .page-step {
	padding: 50px;
	background: #fff;
	margin-bottom: 10px;
  }
  
  .page-table {
	padding: 10px;
	background: #fff;
  }
}

.card-box {
  .ant-row > div {
	margin-right: -1px !important;
  }
  
  ::v-deep(.ant-list-grid .ant-list-item) {
	margin-bottom: -1px !important;
  }
  
  .ant-card-bordered {
	height: 180px;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
}

.orderTitle {
  padding: 0 16px;
  position: fixed;
  z-index: 999;
  /* width: 100%; */
  width: calc(100% - 210px);
  top: 48px;
  flex: 0 0 auto;
  transition: width 0.2s;
}
</style>
