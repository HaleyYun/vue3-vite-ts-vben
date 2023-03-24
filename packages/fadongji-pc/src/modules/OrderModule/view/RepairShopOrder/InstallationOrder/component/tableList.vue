<template>
  <div class="orderTable my-15px">
    <div class="orderHead p-16px">
      <div class="lift">
        <span class="font-bold">订单：{{ format(tabData.id) }}</span>
        <span class="ml-25px">下单时间：{{ tabData.createTime }}</span>
        <span v-if="tabData.supportType === 32 && tabData.relationOrderId != '0'" class="top_con_time ml-30px">
          关联订单号：<a @click="goRelation(tabData)">{{ tabData['relationOrderId'] }}</a>
        </span>
        <span v-if="tabData.isComplaint" class="order-tag ml-16px ">已投诉</span>
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
        <template v-if="column.dataIndex == 'supportName'">
          <div class="title ellipsis-2">
            <a-tooltip :title="record.supportName">
              {{ record.supportName }}
            </a-tooltip>
          </div>
        </template>
        <!--服务价格-->
        <template v-if="column.dataIndex == 'supportAmount'">
          <div>{{ record.supportAmount }}元</div>
        </template>
        <!--上门时间 -->
        <template v-if="column.dataIndex == 'homeStartTime'">
          <div v-html="doorTime(record.homeStartTime,record.homeEndTime)"></div>
        </template>
        <!--修理厂-->
        <template v-if="column.dataIndex == 'buyerName'">
          <div>{{ record.buyerName }}</div>
        </template>
        <!--集师傅-->
        <template v-if="column.dataIndex == 'realName'">
          <div>{{ record.technicianInfo?.realName }}</div>
          <div>{{record.technicianInfo?.userName}}</div>
        </template>
        <!--地区-->
        <template v-if="column.dataIndex == 'repayment'">
          <div v-if="record.addressDetail">{{ JSON.parse(record.addressDetail)?.address }}</div>
        </template>
        <!--订单状态-->
        <template v-if="column.dataIndex == 'statusName'">
          <template v-if="record.isComplaint">
            <div>{{ record['orderStatusEvent'] }}</div>
            <div class="text-red-400	">修理厂发起投诉</div>
          </template>
          <template v-else>
            <span>{{ record['orderStatusEvent'] }}</span>
          </template>

        </template>
        <!--操作-->
        <template v-if="column.dataIndex == 'operation'">
          <div style="flex-direction: column">
            <template v-if="record.orderStatusEvent === '待指派'">
              <AButton v-auth="'/v1/order/assign/assign'" type="link" @click="assignOrder(record)">改派</AButton>
              <AButton v-auth="'/v1/support/install/update'" type="link" @click="editOrder(record)">修改订单</AButton>
            </template>
            <template v-else-if="record.orderStatusEvent === '待接单'">
              <AButton v-auth="'/v1/order/assign/assign'" type="link" @click="assignOrder(record)">指派订单</AButton>
              <AButton v-auth="'/v1/support/install/update'" type="link" @click="editOrder(record)">修改订单</AButton>

            </template>
            <template v-else-if="record.orderStatusEvent === '待安装'">
              <AButton v-auth="'/v1/order/assign/assign'" type="link" @click="assignOrder(record)">改派</AButton>
            </template>
            <template v-else-if="record.orderStatusEvent === '安装中'">
              <AButton v-auth="'/v1/support/install/order/handel'" v-if="record.isComplaint" type="link" @click="handleComplete(record)"
              >处理完成</AButton>
              <AButton v-auth="'/v1/support/install/confirm'" v-if="!record.isComplaint" type="link" @click="goDetails(record)"
              >确认安装完成</AButton>
            </template>
            <template v-else-if="record.orderStatusEvent === '已完成'">
              <AButton v-auth="'/v1/support/install/order/handel'" v-if="record.isComplaint" type="link" @click="handleComplete(record)"
              >处理完成</AButton>
            </template>
            <AButton v-auth="'/v1/support/install/detail'" type="link" @click="goDetails(record)">详情</AButton>

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

  <!-- 修改订单 -->
  <EditOrderModal v-model:orderInfo="editOrderInfo" @updateData="updateData"></EditOrderModal>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch,defineEmits,reactive } from 'vue'
  import { getTableColumns } from '../data/InstallAssignData'
  import { useRouter } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import {doorTime} from '/@/utils/dateUtil'
  import {message} from 'ant-design-vue'
  import { VoUtils } from '@vocen/shared'
  import RecoveryAssignForm from './InstallAssignForm.vue'
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'
  import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
  import EditOrderModal from './EditOrderModal/EditOrderModal.vue'

  let detailedData = ref([])

  // --------公用参数---------------
  const router = useRouter() // 路由跳转函数

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
  // 详情页面
  const goDetails = (record) => {
    console.log(record, 'record')
    router.push({
      path: '/OrderModule/repairShopOrder/installationDetails',
      query: {
        id: record.id,
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
    const {code} = await adminHttp.SUPPORT.supportInstallHandel({
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
    const {code} = await adminHttp.SUPPORT.supportInstallHandel({
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
    id:null,
    supportType:null,
    homeStartTime:null,
    homeEndTime:null,
    assignVisible:false,
    areaCode:null,
  })
  const assignOrder = (record)=>{
    assignedInfo.id = record.id;
    let addressDetail = null;
    try {
      console.log(record.addressDetail)
      if(record.addressDetail &&typeof  record.addressDetail == 'string'){
        addressDetail = JSON.parse(record.addressDetail)
      }else {
        addressDetail = record.addressDetail
      }
    }catch (e) {
      console.log(e)
      addressDetail = record.addressDetail
    }
    assignedInfo.areaCode = addressDetail?.areaCode;
    assignedInfo.supportType = record.supportType
    assignedInfo.homeStartTime = record.homeStartTime;
    assignedInfo.homeEndTime = record.homeEndTime;
    assignedInfo.assignVisible = true;
    console.log(assignedInfo.assignVisible)
  }
  //-----以上指派订单--------


  //------修改订单------------
  const editOrderInfo = reactive({
    id:null,
    assignVisible:false,
  })
  const editOrder = (record)=>{
    editOrderInfo.id = record.id;
    editOrderInfo.assignVisible = true;
  }
  //----以上修改--------
  const updateData = ()=>{
    emit('updateTable')
  }

  watch(
    () => props.tabData,
    (val) => {
      let length = 1;
      tableCoumns.value = getTableColumns(length)
      console.log(tableCoumns.value, length)
    },
    { immediate: true },
  )

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
