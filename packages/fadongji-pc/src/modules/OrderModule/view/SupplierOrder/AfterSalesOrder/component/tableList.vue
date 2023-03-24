<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span class="font-bold">订单号：{{ format(tabData.id) }}</span>
        <span class="ml-25px">下单时间：{{ tabData.createTime }}</span>
        <span class="top_con_time ml-30px">
          关联订单号：<span>{{ tabData['oriOrderId'] }}</span>
        </span>
        <span class="ml-20"> 售后类型：{{ tabData.isRefundOnly ? '仅退款' : '退货退款' }}</span>
      </div>
    </div>
    <a-table
      :columns="tableCoumns"
      :pagination="false"
      :showHeader="false"
      :data-source="[tabData]"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex == 'goodsDetails'">
          <div class="title ellipsis-2">
            {{ record.goodsName }}
          </div>
        </template>
        <!--单价/数量-->
        <template v-if="column.dataIndex == 'columnName'">
          <div v-if="record.periodDays === 0">
            <div>{{ record.payPrice }}元</div>
            <div>*{{ record.goodsCount }}</div>
          </div>
          <div v-else>
            <div>{{ record.periodDays }}天账期{{ record.payPrice }}元</div>
            <div>*{{ record.goodsCount }}</div>
          </div>
        </template>
        <!--售后数量 -->
        <template v-if="column.dataIndex == 'afterSales'">
          <div>{{ record.refundGoodsCount}}</div>
        </template>
        <!--退款金额-->
        <template v-if="column.dataIndex == 'refundAmount'">
          <div>{{ record.amount }}</div>
        </template>
        <!--卖家-->
        <template v-if="column.dataIndex == 'seller'">
          <div>{{ record.shopName }}</div>
        </template>
        <!--买家-->
        <template v-if="column.dataIndex == 'Buyer'">
          <div>{{ record.buyerName }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'creatorState'">
          <template v-if="record.status === 2110">
            <span>待审核</span>
          </template>
          <template v-else-if="record.status === 2120">
            <span>待退货</span>
          </template>
          <template v-else-if="record.status === 2140">
            <span>待签收</span>
          </template>
          <template v-else-if="record.status === 2130">
            <span>待退款</span>
          </template>
          <template v-else-if="record.status === 2150">
            <span>已完成</span>
          </template>
          <template v-else-if="record.status === 2160">
            <span>已关闭</span>
          </template>
        </template>
        <!--操作-->
        <template v-if="column.dataIndex == 'operation'">
          <div class="flex" style="flex-direction: column">
            <AButton
              type="link"
              v-auth="'/v1/order/refund/audit'"
              v-if="record.status === 2110"
              @click="goDetails(record)"
              >审核
            </AButton>
            <AButton
              type="link"
              v-auth="'/v1/order/refund/update/apply'"
              v-if="record.status === 2160 && record.isCanUpdateRefund"
              @click="goDetails(record)"
              >修改申请
            </AButton>
            <AButton
              type="link"
              v-auth="'/v1/order/refund/receipt'"
              v-if="record.status === 2140"
              @click="cancelActivation(record)"
            >
              确认收货
            </AButton>
            <AButton v-auth="'/v1/order/refund/detail'" type="link" @click="goDetails(record)"
              >详情</AButton
            >
            <APopconfirm
              title="手动退款，确定操作吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handlerAccessRowByModal(record)"
            >
              <AButton type="link" v-auth="'/v1/order/refund/refund'" v-if="record.status === 2130"
                >手动退款
              </AButton>
            </APopconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <AModal v-model:visible="reasonVisible" width="650px" title="处理完成" :footer="null">
    <div class="p-5">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <AFormItem
          label="修改结果"
          name="manufacturerReason"
          :rules="[{ required: true, message: '请填写原因' }]"
        >
          <a-textarea
            placeholder="请填写原因"
            v-model:value="formState.manufacturerReason"
            show-count
            :maxlength="200"
            :rows="6"
          />
        </AFormItem>
        <AFormItem :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="onSubmit">订单完成</a-button>
          <a-button style="margin-left: 50px" @click="onCancel">订单关闭</a-button>
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  <!-- 指派接单 -->
  <AssignedModal v-model:orderInfo="assignedInfo" @updateData="updateData"></AssignedModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, defineEmits, reactive,createVNode } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { getTableColumns } from '../data/AfterContainerData'
  import { useRouter } from 'vue-router'
  import { Modal } from 'ant-design-vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { doorTime } from '/@/utils/dateUtil'
  import { message } from 'ant-design-vue'
  import { VoUtils } from '@vocen/shared'
  import RecoveryAssignForm from './InstallAssignForm.vue'
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'
  import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
  //   import EditOrderModal from './EditOrderModal/EditOrderModal.vue'

  let detailedData = ref([])

  // --------公用参数---------------

  const props = defineProps({
    tabData: {
      type: Object,
      default: {},
    },
    type: {
      type: Number,
      default: 11,
    },
  })
  const emit = defineEmits(['updateTable'])

  const tableCoumns = ref([])
  const format = (value) => {
    if (!value) return '--'
    else {
      return value
    }
  }
  //关联订单
  const goRelation = (record) => {
    router.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: {
        id: record.relationOrderId,
      },
    })
  }


  //处理弹窗
  const reasonVisible = ref<boolean>(false)
  const formRef = ref() //校验
  const reasonId = ref('')
  const handleComplete = (item) => {
    reasonId.value = item.id
    reasonVisible.value = true
  }
  //订单完成
  const onSubmit = async () => {
    const retForm = await formRef.value.validate()
    const { code } = await adminHttp.SUPPORT.supportInstallHandel({
      id: reasonId.value,
      type: 1,
      result: retForm.manufacturerReason,
    })
    if (+code === 20001) {
      message.success('操作成功')
      emit('updateTable')
    }
    reasonVisible.value = false
  }
  //订单关闭
  const onCancel = async () => {
    const retForm = await formRef.value.validate()
    const { code } = await adminHttp.SUPPORT.supportInstallHandel({
      id: reasonId.value,
      type: 2,
      result: retForm.manufacturerReason,
    })
    if (+code === 20001) {
      message.success('操作成功')
      emit('updateTable')
    }
    reasonVisible.value = false
  }

  const loadingCtxkey = 'handlerRow'
  const detail = ref<any>({}) //详情对象

  //---指派接单------
  const assignedInfo = reactive({
    id: null,
    supportType: null,
    homeStartTime: null,
    homeEndTime: null,
    assignVisible: false,
    areaCode: null,
  })
  const assignOrder = (record) => {
    assignedInfo.id = record.id
    let addressDetail = null
    try {
      console.log(record.addressDetail)
      if (record.addressDetail && typeof record.addressDetail == 'string') {
        addressDetail = JSON.parse(record.addressDetail)
      } else {
        addressDetail = record.addressDetail
      }
    } catch (e) {
      console.log(e)
      addressDetail = record.addressDetail
    }
    assignedInfo.areaCode = addressDetail?.areaCode
    assignedInfo.supportType = record.supportType
    assignedInfo.homeStartTime = record.homeStartTime
    assignedInfo.homeEndTime = record.homeEndTime
    assignedInfo.assignVisible = true
    console.log(assignedInfo.assignVisible)
  }
  //-----以上指派订单--------

  //------修改订单------------
  const editOrderInfo = reactive({
    id: null,
    assignVisible: false,
  })
  const editOrder = (record) => {
    editOrderInfo.id = record.id
    editOrderInfo.assignVisible = true
  }
  //----以上修改--------
  const updateData = () => {
    emit('updateTable')
  }
  const go = useRouter()
  const goDetails = (record) => {
    go.push({
      path: '/OrderModule/supplierOrder/afterDetails',
      query: {
        id: record.id,
        isCanUpdateRefund:record.isCanUpdateRefund
      },
    })
  }
  watch(
    () => props.tabData,
    (val) => {
      let length = 1
      tableCoumns.value = getTableColumns(length)
      console.log(tableCoumns.value, length)
    },
    { immediate: true },
  )
  //确认收货
  const cancelActivation = (record) => {
    console.log(record, 'record')

    const modal = Modal.confirm({
      title: '是否到货',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '已收货',
      cancelText: '未收货',
      content: '您是否收到该订单商品？',
      onOk() {
        let params = { orderId: record.id }
        cancelDeactivate(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const cancelDeactivate = async (params) => {
    try {
      const { code, message } = await adminHttp.Order.orderRefundReceipt(params)
      if (code === '20001') {
        // 重新加载列表页面
        emit('updateTable')
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }
  //手动退款
  const handlerAccessRowByModal = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Order.orderRefundRefund({ orderId: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        //rest
        emit('updateTable')
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
      .finally(() => {
      })
  }
</script>

<style scoped lang="less">
  .orderTable {
    border-top: 1px solid #f0f0f0;
    text-align: left;
    .orderHead {
      background: #fafafa;
    }
  }
</style>
