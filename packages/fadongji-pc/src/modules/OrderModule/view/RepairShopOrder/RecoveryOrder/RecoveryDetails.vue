<template>
  <div>
    <div class="pt-30px">
      <div class="m-20px p-20px bg-white">
        <div :style="{ width: stepsWidth, margin: '0 auto' }">
          <OrderSteps :stepsList="timeListSteps" :status="detail?.orderStatus" />
        </div>
      </div>
      <div class="flex p-20px items-center justify-between">
        <div class="text-16px">
          当前商品状态：
          <span class="text-blue-700 text-15px cursor-pointer">{{ statusName }}</span>
          <span class="pl-5px" v-if="detail?.cancelReason != null"
            >取消原因:{{ detail?.cancelReason }}</span
          >
        </div>
        <!-- 二期不做  以后做 先留着 -->
        <!-- <AButton @click="operationLog">操作记录</AButton> -->
      </div>
    </div>
    <div class="p-3 px-20px pb-100px">
      <section class="rounded-md overflow-hidden shadow-md">
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          基本信息
        </div>
        <ATable
          :columns="orderRefund.baseData"
          :dataSource="serviceDetailsData"
          :pagination="false"
          bordered
          size="small"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'masterName'">
              <div>{{ record.masterName?.masterName }}</div>
              <div>{{ record.masterName?.phone }}</div>
            </template>
            <template v-if="column.dataIndex === 'homeStartTime'">
              <div
                v-if="record.homeStartTime"
                v-html="doorTime(record.homeStartTime, record.homeEndTime)"
              ></div>
            </template>
            <template v-if="column.dataIndex === 'buyerName'">
              <AButton type="link" @click="depotOrder">{{ record.buyerName }}</AButton>
            </template>
            <template v-if="column.dataIndex === 'orderAddressVO'">
              <div v-if="record.orderAddressVO">
                <div>
                  <span>{{ record.orderAddressVO?.name }} {{ record.orderAddressVO.phone }}</span>
                </div>
                <div>
                  <span>{{ record.orderAddressVO.address }}</span>
                  <span>{{ record.orderAddressVO.addressDetail }}</span>
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'relationOrderId'">
              <div v-if="detail?.supportType === 33">
                <AButton type="link" @click="salesOrder">{{ detail.relationOrderId }}</AButton>
              </div>
            </template>
          </template>
        </ATable>
      </section>
      <section v-if="detail?.qualityList != null" class="mt-5 rounded-md overflow-hidden shadow-md">
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          验收情况
        </div>
        <div class="p-5 bg-white">
          <div>
            验收结果：<span v-if="detail.qualityList">{{
              JSON.parse(detail?.qualityList?.quality) === true ? '验收合格' : '验收不合格'
            }}</span>
          </div>
          <div class="pt-3">
            <span> 验收视频: </span>
            <div v-if="detail?.qualityList" class="pt-3">
              <VoPreviewHeadImg :data-source="checkVideo" />
            </div>
          </div>

          <div class="pt-3">
            <span> 验收图片: </span>
            <div v-if="detail?.qualityList" class="pt-3">
              <VoPreviewHeadImg :data-source="JSON.parse(detail.qualityList?.checkMsg)?.pic" />
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="statusName === '已完成' || statusName === '待收货'"
        class="mt-5 rounded-md overflow-hidden shadow-md"
      >
        <div v-if="detail?.orderDeliveryList[0].logisticsDetail != '{}'">
          <div class="bg-section px-20px">
            <BarChartOutlined class="mr-2" />
            物流信息
          </div>
          <ATable
            v-if="logisticsDetails"
            :columns="orderRefund.logisticsData"
            :dataSource="logisticsDetailsData"
            :pagination="false"
            bordered
            size="small"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'shippingVoucher'">
                <VoPreviewHeadImg :data-source="[logisticsDetails.sendCerti]" />
              </template>
            </template>
          </ATable>
        </div>
      </section>
      <!--服务评价 有评价的话才显示-->
      <section
        v-if="detail.orderServiceEvaluateVO != null"
        class="mt-5 rounded-md overflow-hidden shadow-md"
      >
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          服务评价
        </div>
        <div>
          <div class="border-assets p-5">
            <div class="flex mb-5 items-center">
              <div></div>
              <div class="font-bold text-15px text-gray-800"> 星级：</div>
              <div class="text-14px text-gray-500">
                <a-rate :value="starMark" disabled />
              </div>
            </div>
            <div class="flex mb-5 items-center">
              <div class="font-bold text-15px text-gray-800"> 内容：</div>
              <div class="text-14px text-gray-500"> {{ evaluateContent }}</div>
            </div>
            <div class="flex items-center">
              <div class="font-bold text-15px text-gray-800"> 图片：</div>
              <div class="text-14px text-gray-500">
                <VoPreviewHeadImg :data-source="evaluateImgs" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="detail?.noninductiveEvaluateRecordVO != null"
        class="mt-5 rounded-md overflow-hidden shadow-md"
      >
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          无感评价
        </div>
        <ATable
          :columns="orderRefund.evaluateData"
          :dataSource="serviceEvaluateData"
          :pagination="false"
          bordered
          size="small"
        />
      </section>
      <section class="mt-5 rounded-md overflow-hidden shadow-md">
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          旧机信息
        </div>
        <div class="p-5 bg-white">
          <div>
            发动机识别号：<span v-if="detail?.engineMsg">{{
              JSON.parse(detail.engineMsg)?.no
            }}</span>
          </div>
          <div class="pt-3">
            <div v-if="detail?.engineMsg" class="pt-3">
              <VoPreviewHeadImg :data-source="engineMsgDetails" />
            </div>
          </div>
          <div class="pt-3">
            <span> 缸体照片: </span>
            <div v-if="detail?.engineMsg" class="pt-3">
              <VoPreviewHeadImg :data-source="engineMsgList" />
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="orderStatusArray.includes(statusName) || detail?.orderStatus === 3320"
        class="mt-5 rounded-md overflow-hidden shadow-md"
      >
        <div class="bg-section px-20px">
          <BarChartOutlined class="mr-2" />
          分润信息
        </div>
        <ATable
          :columns="orderRefund.profitData"
          :dataSource="profitDetailsData"
          :pagination="false"
          bordered
          size="small"
        />
      </section>
    </div>
    <!-- 判断不同状态展示操作 -->
    <div class="flex justify-center pb-20">
      <template v-if="detail?.orderStatus === 3340">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-20"
          type="primary"
          @click="assignOrder()"
          >改派
        </AButton>
        <AButton
          v-auth="'/v1/order/recycle/update'"
          class="margin-r-20"
          type="primary"
          @click="modifyOrder()"
          >修改订单
        </AButton>
      </template>
      <template v-else-if="detail?.orderStatus === 3331">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-30"
          type="primary"
          @click="assignOrder()"
          >指派接单
        </AButton>
        <AButton
          v-auth="'/v1/order/recycle/update'"
          class="margin-r-20"
          type="primary"
          @click="modifyOrder()"
          >修改订单
        </AButton>
      </template>
      <template v-else-if="detail?.orderStatus === 3330">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-30"
          type="primary"
          @click="assignOrder()"
          >指派接单
        </AButton>
      </template>
      <template v-else></template>
    </div>

    <!-- 操作日志 -->
    <AModal v-model:visible="logVisible" :footer="false" title="操作日志" width="1000px">
      <div class="p-5">
        <ATable
          :columns="orderRefund.handleColumns"
          :dataSource="tableData"
          :pagination="false"
          bordered
        />
        <div class="text-right pt-15px">
          <a-button type="primary" @click="logVisible = false">关闭</a-button>
        </div>
      </div>
    </AModal>
    <!-- 指派接单 -->
    <AssignedModal v-model:orderInfo="assignedInfo" @updateData="loadTableData" />
    <!-- 修改订单-->
    <EditOrderModal v-model:orderInfo="editOrderInfo" @updateData="loadTableData" />
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref, nextTick } from 'vue'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import RecoveryAssignForm from './component/RecoveryAssignForm.vue'
  import EditOrderModal from './component/EditOrderModal/EditOrderModal.vue'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
  import { doorTime } from '/@/utils/dateUtil'

  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { message } from 'ant-design-vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { orderRefund } from './data/RecoveryData'
  import { Pattern } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const assignVisible = ref<boolean>(false)
  const modifyVisible = ref<boolean>(false)
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const route = useRoute() //路由
  const detail = ref<any>({}) //数据详情对象
  const statusName = ref<string>('') //订单状态值
  const serviceDetailsData = ref<any>([]) //基本详细信息数据
  const serviceEvaluateData = ref<any>([]) //无感评价数据
  const logVisible = ref<boolean>(false) //操作记录弹窗变量
  const profitDetailsData = ref<any>([]) //分润详细信息数据
  const logisticsDetailsData = ref<any>([]) //物流新信息数据
  const logisticsDetails = ref<any>() //物流信息的转json
  const starMark = ref<number>(2) //评价星级
  const serviceEvaluate = ref<any>([]) //获取评价
  const evaluateContent = ref<any>('') //评价管理的内容
  const evaluateImgs = ref<any>([]) //评价管理的图片
  const engineMsgDetails = ref<any>([]) //旧机信息的图片
  const engineMsgList = ref<any>([]) //旧机信息的图片
  const timeListSteps = ref<any>([]) //步骤条数据
  const stepsWidth = ref<any>() //步骤条小于3变化
  const serviceAddress = ref([] as any[]) //回收地址的数组
  const formRef = ref() //form校验
  const checkVideo = ref<any>([]) //验收视频
  const serviceAddressId = ref<string>('') //修改订单地址id
  const orderStatusArray = ref([
    '待查验',
    '待付款',
    '已完成',
    '待收货',
    '待寄回',
    '回收中',
    '待上门',
    '待指派',
    '待接单',
  ]) //判断是否显示分润
  const router = useRouter()
  const beforeStatusArray = ref(['已完成', '待收货', '待寄回']) //判断是否显示验收
  //获取详情
  // 3320：待查验，3330：待接单，3331：待指派，3340：待上门，3350：回收中，3351：待发货，3352：待收货，3360：已完成，3370：已取消，3380：已关闭；
  const loadTableData = () => {
    adminHttp.ORDER.orderRecycleDetailBy$id({
      id: route.query.id as string,
    })
      .then((res) => {
        detail.value = res.data
        //步骤条数据
        timeListSteps.value = res.data?.timeList
        if (timeListSteps.value?.length <= 3) {
          stepsWidth.value = '70%'
        }
        //评价管理信息
        if (res.data?.orderServiceEvaluateVO?.content) {
          serviceEvaluate.value = JSON.parse(res.data?.orderServiceEvaluateVO?.content)
          evaluateContent.value = serviceEvaluate.value.content
          if (serviceEvaluate.value?.fileList) {
            const serviceImgs = serviceEvaluate.value?.fileList.map((item) => {
              return item.src
            })
            evaluateImgs.value = serviceEvaluate.value?.fileList ? serviceImgs : []
          }
        }
        //星级
        starMark.value = Math.ceil(res.data?.orderServiceEvaluateVO?.starMark / 2)

        //无感评价
        if (res.data?.noninductiveEvaluateRecordVO?.content) {
          serviceEvaluateData.value = [
            {
              content: res.data.noninductiveEvaluateRecordVO.content,
              status: res.data.noninductiveEvaluateRecordVO.status === 1 ? '是' : '否',
            },
          ]
        }
        //验收视频
        if (res.data?.qualityList) {
          const resultVideo = JSON.parse(res.data?.qualityList?.checkMsg)?.video.map((item) => {
            return item.src
          })
          checkVideo.value = Object.values(resultVideo)
        }

        //物流信息
        if (res.data?.orderDeliveryList && res.data?.orderDeliveryList.logisticsDetail != {}) {
          logisticsDetails.value = JSON.parse(res.data?.orderDeliveryList[0]?.logisticsDetail)
        }
        //旧机信息
        if (res.data?.engineMsg) {
          const resultImgs = Object.values(JSON.parse(res.data?.engineMsg)?.pic).filter(
            (item, index) => {
              return index === 0
            },
          )
          engineMsgDetails.value = res.data.engineMsg ? resultImgs : []
        }
        if (res.data?.engineMsg) {
          const resultImgs = Object.values(JSON.parse(res.data?.engineMsg)?.pic).filter(
            (item, index) => {
              return index != 0
            },
          )

          engineMsgList.value = res.data.engineMsg ? resultImgs : []
        }

        if (detail.value?.orderStatus === 3320) {
          statusName.value = '待查验 '
        } else if (detail.value?.orderStatus === 3330) {
          statusName.value = '待接单'
        } else if (detail.value?.orderStatus === 3331) {
          statusName.value = '待指派'
        } else if (detail.value?.orderStatus === 3340) {
          statusName.value = '待上门'
        } else if (detail.value?.orderStatus === 3350) {
          statusName.value = '回收中'
        } else if (detail.value?.orderStatus === 3351) {
          statusName.value = '待寄回'
        } else if (detail.value?.orderStatus === 3352) {
          statusName.value = '待收货'
        } else if (detail.value?.orderStatus === 3360) {
          statusName.value = '已完成'
        } else if (detail.value?.orderStatus === 3370) {
          statusName.value = '已取消'
        } else if (detail.value?.orderStatus === 3380) {
          statusName.value = '已关闭'
        } else if (detail.value?.orderStatus === 3310) {
          statusName.value = '待付款'
        }
        //基本信息
        serviceDetailsData.value = [
          {
            orderId: res.data?.id,
            supportName: res.data?.supportName,
            supportAmount: res.data?.supportAmount + '元',
            orderAddressVO: res.data?.orderAddressVO,
            buyerName: res.data?.buyerName,
            masterName: res.data?.orderTechnicianVO,
            homeStartTime: res.data?.homeStartTime,
            homeEndTime: res.data?.homeEndTime,
          },
        ]
        //分润信息
        profitDetailsData.value = [
          {
            platform: JSON.parse(res.data?.supportProfit)[0]?.splitRule?.platform + '元',
            master: JSON.parse(res.data?.supportProfit)[0]?.splitRule?.master + '元',
          },
        ]
        //物流信息
        if (res.data?.orderDeliveryList && res.data?.orderDeliveryList[0].logisticsDetail != '{}') {
          logisticsDetailsData.value = [
            {
              deliveryType: res.data?.orderDeliveryList[0]?.deliveryType,
              company: logisticsDetails.value.logCompany,
              waybill: logisticsDetails.value.trackNum,
              logisticsMobile: logisticsDetails.value.logPhone,
              shippingProducts: res.data.supportName,
              shippingVoucher: '',
            },
          ]
        }
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //初始化
  onMountedOrActivated(() => {
    loadTableData()
  })

  //操作记录
  let tableData = ref([])
  const operationLog = async () => {
    const ret = await adminHttp.Order.orderRecycleOperateList({ id: detail.value.id })
    tableData.value = ret.data
    logVisible.value = true
  }

  //------ 指派订单 -----------------
  const assignedInfo = reactive({
    id: null,
    supportType: null,
    homeStartTime: null,
    homeEndTime: null,
    assignVisible: false,
    areaCode: null,
  })
  const assignOrder = () => {
    assignedInfo.id = detail.value.id
    assignedInfo.areaCode = detail.value.orderAddressVO.areaCode
    assignedInfo.supportType = detail.value.supportType
    assignedInfo.homeStartTime = detail.value.homeStartTime
    assignedInfo.homeEndTime = detail.value.homeEndTime
    assignedInfo.assignVisible = true
  }
  //-------以上指派订单--------

  //------修改订单-------
  const editOrderInfo = reactive({
    id: null,
    buyerId: null,
    supportName: null,
    homeEndTime: null,
    homeStartTime: null,
    buyerName: null,
    addressDetail: null,
    assignVisible: false,
  })
  const modifyOrder = async () => {
    editOrderInfo.id = detail.value.id
    editOrderInfo.buyerId = detail.value.buyerId
    editOrderInfo.buyerName = detail.value.buyerName
    editOrderInfo.supportName = detail.value.supportName
    editOrderInfo.homeEndTime = detail.value.homeEndTime
    editOrderInfo.homeStartTime = detail.value.homeStartTime
    editOrderInfo.addressDetail = detail.value.orderAddressVO
    editOrderInfo.assignVisible = true
  }
  //------以上修改订单-------

  // 关联单号
  const salesOrder = () => {
    router.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: { id: detail.value.relationOrderId },
    })
  }
  // 修理厂
  const depotOrder = () => {
    router.push({
      path: '/customerModule/garageRouter/repairShopDetails',
      query: { id: detail.value.buyerId },
    })
  }
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
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
