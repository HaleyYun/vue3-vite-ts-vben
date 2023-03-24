<template>
  <div>
    <div class="bg-white m-24px p-24px mb-82px">
      <div>
        <div class="py-8px px-24px">
          <div :style="{ width: stepsWidth, margin: '0 auto' }">
            <OrderSteps :stepsList="timeListSteps" :status="detail.orderStatus" />
          </div>
        </div>
        <div class="pt-30px">
          <OrderAlert
            :statusName="detail && detail.orderStatusEvent"
            :cancelReason="detail.cancelReason && detail.cancelReason"
          />
        </div>
      </div>
      <div class="">
        <section class="mb-30px">
          <div class="template--title my-16px">基本信息</div>
          <div class="card-box">
            <ADescriptions
              :column="3"
              bordered
              layout="vertical"
              :data="detail"
              :schema="orderRefund.baseData"
            >
              <ADescriptionsItem v-for="(item, index) of orderRefund.baseData" :label="item.title">
                <template v-if="item.title == '服务价格'">
                  <span>{{ detail.supportAmount }}元</span>
                </template>
                <template v-else-if="item.title == '修理厂'">
                  <AButton type="link" @click="depotOrder">{{ detail.buyerName }}</AButton>
                </template>
                <template v-else-if="item.title == '集师傅'">
                  <div>{{ detail.technicianInfo?.realName }}</div>
                  <div>{{ detail.technicianInfo?.userName }}</div>
                </template>
                <template v-else-if="item.title == '上门时间'">
                  <div
                    v-if="detail.homeStartTime && detail.homeEndTime"
                    v-html="doorTime(detail.homeStartTime, detail.homeEndTime)"
                  ></div>
                </template>
                <template v-else-if="item.title == '安装地址'">
                  <div>
                    <span>{{ addressDetail?.name }} {{ addressDetail?.phone }}</span>
                  </div>
                  <div>{{ addressDetail?.address }}{{ addressDetail?.addressDetail }}</div>
                </template>
                <template v-else-if="item.title == '关联购买订单'">
                  <AButton v-if="detail.supportType === 32" type="link" @click="salesOrder">
                    {{ detail.relationOrderId }}
                  </AButton>
                </template>
                <template v-else-if="item.title == '订单来源'">
                  <span v-if="detail.source === 1">安卓</span>
                  <span v-if="detail.source === 2">ios</span>
                  <span v-if="detail.source === 3">h5</span>
                  <span v-if="detail.source === 4">pc</span>
                  <span v-if="detail.source === 5">小程序</span>
                  <span v-if="detail.source === 6">公众号</span>
                </template>
                <template v-else-if="item.title == '支付方式'">
                  <span v-if="detail.payMethod === 1">微信</span>
                  <span v-if="detail.payMethod === 11">支付宝</span>
                  <span v-if="detail.payMethod === 51">银联</span>
                </template>
                <template v-else-if="item.title == '发票信息'">
                  <AButton type="link">发票明细</AButton>
                </template>
                <template v-else>
                  <div>
                    {{ detail[item.key] }}
                  </div>
                </template>
              </ADescriptionsItem>
            </ADescriptions>
          </div>
        </section>
        <section class="mb-30px" v-if="detail.supportQuality != null">
          <div class="template--title mb-16px">服务完成情况</div>
          <div class="bg-white p-16px border border-solid border-#EBEBEB">
            <div>
              <div class="pb-16px"> 安装完成视频:</div>
              <div v-if="detail?.supportQuality?.checkMsg">
                <VoPreviewHeadImg :data-source="finishVideo" />
              </div>
            </div>
            <div
              class="mt-10px"
              v-if="
                detail.supportQuality &&
                detail.supportQuality?.checkMsg &&
                detail.orderStatusEvent != '安装中'
              "
            >
              安装时长：<span>{{ durationChange() }}</span>
            </div>
          </div>
        </section>
        <section class="mb-30px" v-if="detail.contentEvaluate != null">
          <div class="template--title mb-16px">服务评价</div>
          <div>
            <div class="p-16px border border-solid border-#EBEBEB">
              <div class="flex mb-5 items-center">
                <div class="font-bold text-15px text-gray-800"> 星级：</div>
                <div class="text-14px text-gray-500">
                  <a-rate :value="starMark" disabled />
                </div>
              </div>
              <div class="flex mb-5 items-center">
                <div class="font-bold text-15px text-gray-800"> 内容：</div>
                <div class="text-14px text-gray-500">{{ serviceEvaluate }}</div>
              </div>
              <div class="flex items-center">
                <div class="font-bold text-15px text-gray-800"> 图片：</div>
                <div class="text-14px text-gray-500">
                  <VoPreviewHeadImg :data-source="installImgs" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-30px" v-if="detail?.noninductiveEvaluateRecordVO != null">
          <div class="template--title mb-16px">无感评价</div>
          <ATable
            :columns="orderRefund.evaluateData"
            :dataSource="serviceDetailsData"
            :pagination="false"
            bordered
            size="small"
          />
        </section>
        <section class="mb-30px" v-if="orderStatusArray.includes(detail.orderStatusEvent)">
          <div class="template--title mb-16px">分润信息</div>
          <ATable
            :columns="orderRefund.profitData"
            :dataSource="profitDetailsData"
            :pagination="false"
            bordered
            size="small"
          />
        </section>
      </div>
    </div>
    <div
      v-if="
        detail.orderStatusEvent != '已完成' &&
        detail.orderStatusEvent != '已取消' &&
        detail.orderStatusEvent != '待付款'
      "
      class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
    >
      <template v-if="detail.orderStatusEvent === '安装中'">
        <AButton
          v-auth="'/v1/support/install/confirm'"
          class="margin-r-20"
          type="primary"
          @click="confirmInstallation()"
        >
          确认安装完成
        </AButton>
      </template>
      <template v-else-if="detail.orderStatusEvent === '待安装'">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-20"
          type="primary"
          @click="assignOrder()"
          >改派
        </AButton>
      </template>
      <template v-else-if="detail.orderStatusEvent === '待指派'">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-30"
          type="primary"
          @click="assignOrder()"
          >指派接单
        </AButton>
        <AButton
          v-auth="'/v1/support/install/update'"
          class="margin-r-20"
          type="primary"
          @click="editOrder()"
          >修改订单
        </AButton>
      </template>
      <template v-else-if="detail.orderStatusEvent === '待接单'">
        <AButton
          v-auth="'/v1/order/assign/assign'"
          class="margin-r-30"
          type="primary"
          @click="assignOrder()"
          >指派接单
        </AButton>
        <AButton
          v-auth="'/v1/support/install/update'"
          class="margin-r-20"
          type="primary"
          @click="editOrder()"
          >修改订单
        </AButton>
      </template>
    </div>

    <!-- 指派接单 -->
    <AssignedModal v-model:orderInfo="assignedInfo" @updateData="loadTableData" />
    <!-- 修改订单 -->
    <EditOrderModal v-model:orderInfo="editOrderInfo" @updateData="loadTableData" />
  </div>
</template>

<script lang="ts" setup>
  import { createVNode, onBeforeMount, reactive, ref, nextTick } from 'vue'

  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { message, Modal } from 'ant-design-vue'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { doorTime, assignedTime } from '/@/utils/dateUtil'
  import { VoUtils } from '@vocen/shared'
  import { orderRefund } from './data/InvestData'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import RecoveryAssignForm from './component/InstallAssignForm.vue'
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import OrderAlert from '/@/modules/OrderModule/component/OrderAlert/OrderAlert.vue'
  import AssignedModal from '/@/modules/OrderModule/component/AssignedModal/AssignedModal.vue'
  import EditOrderModal from './component/EditOrderModal/EditOrderModal.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const router = useRouter()
  const assignVisible = ref<boolean>(false)
  const modifyVisible = ref<boolean>(false)
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const route = useRoute() //路由
  const detail = ref<any>({}) //详情对象
  const profitDetailsData = ref<any>([]) //分润信息
  const addressDetail = ref<any>([]) //安装地址
  const serviceDetailsData = ref<any>([]) //无感评价
  const stepsWidth = ref<any>('') //进度条小于3变化宽度
  const timeListSteps = ref<any>([]) //进度步骤条
  const finishVideo = ref<any>([]) //安装完成视频
  const starMark = ref<number>(2) //星级
  const serviceEvaluate = ref<any>('') //评价内容
  const formRef = ref() //校验
  const serviceAddress = ref([] as any[]) //回收地址下拉
  const serviceAddressId = ref<string>('') //地址id
  const installImgs = ref<any>([]) //安装评价图片

  const orderStatusArray = ref(['已完成', '安装中', '待安装', '待指派', '待接单', '待付款'])
  //获取详情
  // 3320：待查验，3330：待接单，3331：待指派，3340：待上门，3350：回收中，3351：待发货，3352：待收货，3360：已完成，3370：已取消，3380：已关闭；
  const loadTableData = () => {
    adminHttp.SUPPORT.supportInstallDetailBy$id({
      id: route.query.id as string,
    })
      .then((res) => {
        detail.value = res.data
        timeListSteps.value = res.data?.timeList
        if (timeListSteps.value?.length <= 3) {
          stepsWidth.value = '70%'
        }
        //安装地址
        if (res.data?.addressDetail && typeof res.data?.addressDetail == 'String') {
          try {
            addressDetail.value = JSON.parse(res.data?.addressDetail)
          } catch (e) {
            addressDetail.value = res.data?.addressDetail
          }
        } else {
          addressDetail.value = res.data?.addressDetail
        }

        //服务完成情况安装视频
        if (res.data?.supportQuality) {
          res.data.supportQuality.checkMsg = JSON.parse(res.data.supportQuality?.checkMsg)
          const resultVideo = res.data.supportQuality?.checkMsg?.pic.map((item) => {
            return item.src
          })
          finishVideo.value = Object.values(resultVideo)
        }
        //评价管理
        if (res.data?.contentEvaluate?.content) {
          serviceEvaluate.value = JSON.parse(res.data?.contentEvaluate?.content)?.content
          const prcListString = JSON.parse(res.data?.contentEvaluate?.content)?.pic
          const prcList = JSON.parse(prcListString)
          const serviceImgs = prcList.map((item) => {
            return item.src
          })
          installImgs.value = res.data?.contentEvaluate?.content ? serviceImgs : []
        }

        starMark.value = Math.ceil(res.data?.contentEvaluate?.starMark / 2)

        //分润信息
        if (res.data?.supportProfit) {
          profitDetailsData.value = [
            {
              platform: JSON.parse(res.data.supportProfit)[0]?.splitRule?.platform + '元',
              master: JSON.parse(res.data.supportProfit)[0]?.splitRule?.master + '元',
            },
          ]
        }
        if (res.data?.noninductiveEvaluateRecordVO) {
          serviceDetailsData.value = [
            {
              content: res.data.noninductiveEvaluateRecordVO.content,
              status: res.data.noninductiveEvaluateRecordVO.status === 1 ? '是' : '否',
            },
          ]
        }
      })
      .catch((err) => {
        console.log(err)
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
  }
  onMountedOrActivated(() => {
    loadTableData()
  })

  // 安装时长
  const durationChange = () => {
    let installation = timeListSteps.value.find((item) => item.status == 3250) // 安装中
    let complete = timeListSteps.value.find((item) => item.status == 3260) // 安装完成
    if (!installation || !complete || !installation.nextStageTime || !complete.nextStageTime) {
      return false
    }
    let installationTime = new Date(installation.nextStageTime).getTime()
    let completeTime = new Date(complete.nextStageTime).getTime()
    let duration = completeTime - installationTime
    console.log(duration)
    // 计算出小时数
    let residue1 = duration % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    let hours = Math.floor(residue1 / (3600 * 1000))

    // 计算相差分钟数
    let residue2 = residue1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(residue2 / (60 * 1000))

    // 计算相差秒数
    let residue3 = residue2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(residue3 / 1000)
    console.log(hours, minutes, seconds)
    return hours + '时' + minutes + '分' + seconds + '秒'
  }

  //确认安装完成
  const confirmInstallation = () => {
    const modal = Modal.confirm({
      title: '确认安装完成',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '安装完毕',
      content: '请确认该服务订单是否已安装完毕？',
      onOk() {
        // 调取完成的接口
        let params = { id: detail.value.id }
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
      const { code, message } = await adminHttp.SUPPORT.supportInstallConfirm(params)
      if (code === '20001') {
        createMessage.success('操作成功')

        router.back()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  //------ 指派接单 -----------------
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
    assignedInfo.areaCode = detail.value.addressDetail?.areaCode
    assignedInfo.supportType = detail.value.supportType
    assignedInfo.homeStartTime = detail.value.homeStartTime
    assignedInfo.homeEndTime = detail.value.homeEndTime
    assignedInfo.assignVisible = true
    console.log(assignedInfo.assignVisible)
  }
  //------以上指派订单--------

  //--------修改订单----------
  const editOrderInfo = reactive({
    id: null,
    assignVisible: false,
  })
  const editOrder = () => {
    editOrderInfo.id = detail.value.id
    editOrderInfo.assignVisible = true
  }
  //-----以上修改--------

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

  ::v-deep(.ant-descriptions-item-label) {
    width: 30%;
    color: #262626;
    font-weight: 700;
  }
</style>
