<template>
  <div class="p-4">
    <div class="page-step bg-white py-35px">
      <div class="p-24px">
        <OrderSteps :stepsList="stepsList" :status="detail.status" />
      </div>
      
      <div class="text-18px bg-white px-24px mt-3">
        <a-alert type="error" showIcon>
          <template #icon><exclamation-circle-outlined /></template>
          <!-- <template #icon><smile-outlined /></template> -->
          <template #message>
            <div class="py-10px">售后状态： {{ detail.statusName }} {{ detail.result }}</div>
          </template>
        </a-alert>
      
        <span
          class="ml-10px text-red-600 text-sm"
          v-if="detail.oriOrderInfo && !detail.oriOrderInfo.isInitial"
          >本次售后非原单商品，为换机商品售后</span
        >
      </div>
      <div class="page-table bg-white px-24px">
        <section class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">售后商品</div>
          <ADescriptions :column="2" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="原订单编号">
              {{ detail.oriOrderId }}
              <span
                class="ml-2 text-green-600 cursor-pointer"
                @click="handleCopy(detail.oriOrderId, $event)"
                >复制</span
              >
            </ADescriptionsItem>
            <ADescriptionsItem label="ID">
              {{ saleData.id }}
            </ADescriptionsItem>
            <ADescriptionsItem label="商品信息">
              <div class="flex items-center">
                <a-image
                  v-if="detail.pic"
                  class="mr-3 flex-1"
                  style="width: 50px; height: 50px"
                  :src="
                    Pattern.isVideoUrl(detail.pic[0].toLowerCase())
                      ? detail.pic[0] + '&type=3'
                      : detail.pic[0]
                  "
                />
                <div class="flex-1 w-100px truncate">{{ detail.goodsName }}</div>
              </div>
            </ADescriptionsItem>
            <ADescriptionsItem label="商品识别码">
              {{ saleData.engineNo }}
            </ADescriptionsItem>
            <ADescriptionsItem label="销售价格">
              {{ detail.originalPrice ? detail.originalPrice : '--' }}元
            </ADescriptionsItem>
            <ADescriptionsItem label="质保时间">
              {{ detail.warrantyMonth }}
            </ADescriptionsItem>
            <ADescriptionsItem label="激活时间">
              {{ detail.activeTime }}
            </ADescriptionsItem>
            <ADescriptionsItem label="支付方式">
              {{ detail.payMethod }}
            </ADescriptionsItem>
            <ADescriptionsItem label="实付款">
              {{ detail.payAmountTotal ? detail.payAmountTotal : '--' }}元
            </ADescriptionsItem>
            <ADescriptionsItem label="买家">
              {{ detail.buyerName }}
              {{ detail.buyerPhone }}
            </ADescriptionsItem>
            <ADescriptionsItem label="卖家">
              {{ detail.shopName }}
              {{ detail.shopPhone }}
            </ADescriptionsItem>
            <ADescriptionsItem label="生产商">
              {{ detail.supplierName }}
              {{ detail.supplierPhone }}
            </ADescriptionsItem>
          </ADescriptions>
        </section>
        <section class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">订单信息</div>
          <ADescriptions :column="2" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="服务单号">
              {{ detail?.id }}
            </ADescriptionsItem>
            <ADescriptionsItem label="状态">
              {{ saleData.statusName }}
            </ADescriptionsItem>
            <ADescriptionsItem label="申请时间">
              {{ detail.createTime }}
            </ADescriptionsItem>
            <ADescriptionsItem label="用户账号">
              {{ detail.buyerPhone }}
            </ADescriptionsItem>
            <ADescriptionsItem label="联系人">
              {{ detail.buyerName }}
            </ADescriptionsItem>
            <ADescriptionsItem label="商品识别码">
              {{ detail.engineNo }}
            </ADescriptionsItem>
            <ADescriptionsItem label="售后类型">
              {{ detail.typeName }}
            </ADescriptionsItem>
            <ADescriptionsItem label="故障部件">
              {{ detail.afterSaleFaultDetail?.unit }}
            </ADescriptionsItem>
            <ADescriptionsItem label="是否返旧件">
              {{ detail.isSendBack ? '是' : '否' }}
            </ADescriptionsItem>
            <ADescriptionsItem label="描述">
              <div>{{ detail.afterSaleFaultDetail?.desc }}</div>
              <div v-if="detail.afterSaleFaultDetail?.voice" class="min-w-300px mt-5px">
                <VoAudio :autoplay="false" :source="detail.voice" />
              </div>
            </ADescriptionsItem>
            <ADescriptionsItem label="凭证照片">
              <div v-if="detail.afterSaleFaultDetail?.pic" class="py-10px">
                <VoPreviewHeadImg :data-source="detail.afterSaleFaultDetailPic" />
              </div>
            </ADescriptionsItem>
          </ADescriptions>
        </section>
        <section
          v-if="
            detail.type != 1 &&
            detail.isSendBack &&
            detail.sendBackAddress &&
            detail.status != 4110 &&
            detail.status != 4180
          "
          class="rounded-md mt-3 overflow-hidden"
        >
          <div class="template--title my-16px">旧件寄回信息</div>
          <ADescriptions :column="1" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="收货人姓名">
              {{ detail.sendBackAddress.name }}
            </ADescriptionsItem>
            <ADescriptionsItem label="收货地址">
              {{ detail.sendBackAddress.address }}
              {{ detail.sendBackAddress.addressDetail }}
            </ADescriptionsItem>
            <ADescriptionsItem label="联系电话">
              {{ detail.sendBackAddress.phone }}
            </ADescriptionsItem>
            <template v-if="detail.sendBackList && detail.sendBackList.length > 0">
              <template v-for="(item, index) of detail.sendBackList" :key="index + 'sendList'">
                <ADescriptionsItem label="物流公司">
                  {{ item.logisticsDetail.company }}
                </ADescriptionsItem>
                <ADescriptionsItem label="运单号">
                  {{ item.logisticsDetail.orderId }}
                </ADescriptionsItem>
                <ADescriptionsItem label="物流公司电话">
                  {{ item.logisticsDetail.companyPhoneNm }}
                </ADescriptionsItem>
                <ADescriptionsItem label="寄回凭证">
                  <div
                    class="content border-l px-20px py-10px flex items-center flex-1"
                    v-if="item.logisticsDetail.pic"
                  >
                    <VoPreviewHeadImg :data-source="item.logisticsDetail.pic" />
                  </div>
                </ADescriptionsItem>
                <ADescriptionsItem label="故障部件">
                  {{ detail.afterSaleFaultDetail?.unit }}
                </ADescriptionsItem>
                <ADescriptionsItem label="是否返旧件">
                  {{ detail.isSendBack ? '是' : '否' }}
                </ADescriptionsItem>
                <ADescriptionsItem label="描述">
                  <div>{{ detail.afterSaleFaultDetail?.desc }}</div>
                  <div v-if="detail.afterSaleFaultDetail?.voice" class="min-w-300px mt-5px">
                    <VoAudio :autoplay="false" :source="detail.voice" />
                  </div>
                </ADescriptionsItem>
                <ADescriptionsItem label="凭证照片">
                  <div v-if="detail.afterSaleFaultDetail?.pic" class="py-10px">
                    <VoPreviewHeadImg :data-source="detail.afterSaleFaultDetailPic" />
                  </div>
                </ADescriptionsItem>
                <div
                  class="flex border-1 border-b-0"
                  v-if="detail.status == 4150 || detail.status == 4161"
                >
                  <ADescriptionsItem label="签收时间">
                    {{ detail.receiveTime }}
                  </ADescriptionsItem>
                </div>
              </template>
            </template>
          </ADescriptions>
        </section>
        <!--v2.2.1需求去掉处理结果-->
        <section
          v-if="false && detail.statusName === '待处理'"
          class="rounded-md mt-3 overflow-hidden"
        >
          <div class="template--title my-16px">处理结果</div>
          <div class="bg-white p-5">
            <a-form
              :model="formState"
              name="basic"
              ref="auditForm"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="onFinish"
            >
              <!--<a-form-item label="是否通过" name="isPass" :rules="[{ required: true }]">-->
              <!--<a-radio-group-->
              <!--v-model:value="formState.isPass"-->
              <!--name="radioGroup"-->
              <!--@change="-->
              <!--(val) => {-->
              <!--formState.type = null-->
              <!--}-->
              <!--"-->
              <!--&gt;-->
              <!--<a-radio :value="true">是</a-radio>-->
              <!--<a-radio :value="false">否</a-radio>-->
              <!--</a-radio-group>-->
              <!--</a-form-item>-->

              <a-form-item
                label="处理结果"
                name="type"
                :rules="[{ required: true, message: '请选择处理结果' }]"
              >
                <a-select
                  v-model:value="formState.type"
                  placeholder="请选择处理结果"
                  style="width: 250px"
                  allow-clear
                  @change="
                    () => {
                      formState.money = null
                    }
                  "
                >
                  <a-select-option :value="1">仅换机</a-select-option>
                  <a-select-option :value="2">换机+补偿</a-select-option>
                  <a-select-option :value="3">退机+补偿</a-select-option>
                  <a-select-option :value="4">非质量问题</a-select-option>
                  <a-select-option :value="5">维修补偿</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                v-if="[2, 3, 5].includes(formState.type)"
                label="补偿金额"
                name="money"
                :rules="[{ required: true, message: '请输入补偿金额' }]"
              >
                <a-input-number
                  style="width: 250px"
                  v-model:value="formState.money"
                  :min="0"
                  placeholder="请输入"
                  allow-clear
                />
              </a-form-item>
              <a-form-item name="remark" label="备注">
                <a-textarea v-model:value="formState.remark" placeholder="请输入" allow-clear />
              </a-form-item>
            </a-form>
          </div>
        </section>
        <section v-if="detail.makeUpDetail" class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">处理结果</div>
          <ADescriptions :column="1" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="处理结果">
              {{ detail.makeUpDetail.makeUpType }}
            </ADescriptionsItem>
            <ADescriptionsItem label="处理备注">
              {{ detail.makeUpDetail.remark ? detail.makeUpDetail.remark : '--' }}
            </ADescriptionsItem>
            <!--type 对应 result,有三种类型,1, "仅换机 2, "换机+补偿 3, "仅补偿-->
            <div v-if="detail.makeUpDetail.type !== 1">
              <ADescriptionsItem label="补偿金额">
                {{ detail.makeUpDetail.makeUpAmount ? detail.makeUpDetail.makeUpAmount : '--' }}元
              </ADescriptionsItem>
            </div>
            <div v-if="detail.makeUpDetail.type !== 1">
              <ADescriptionsItem label="补偿到账时间">
                {{ detail.makeUpDetail.makeUpTime }}
              </ADescriptionsItem>
            </div>
            <div v-if="detail.makeUpDetail.type !== 3">
              <ADescriptionsItem label="新机订单编号">
                {{ detail.newOrderInfo?.id }}
              </ADescriptionsItem>
            </div>
          </ADescriptions>
        </section>
        <!-- 售后上门服务 -->
        <section v-if="detail.supportOrderId" class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">售后上门服务</div>
          <ADescriptions :column="1" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="售后上门服务订单">
              {{ detail.supportOrderId }}
            </ADescriptionsItem>
            <ADescriptionsItem label="订单状态">
              {{ detail.supportOrderStatusName }}
            </ADescriptionsItem>
          </ADescriptions>
        </section>
        <!-- 服务评价 -->
        <section v-if="detail.afterSaleComment" class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">服务评价</div>
          <ADescriptions :column="1" :contentStyle="{ background: '#fff' }" bordered>
            <ADescriptionsItem label="服务满意度">
              <a-rate :value="detail.afterSaleComment.star" disabled />
            </ADescriptionsItem>
            <div v-if="detail.afterSaleComment" class="flex border-1 border-b-0">
              <ADescriptionsItem label="服务是否解决了问题">
                {{ detail.afterSaleComment.isResolve ? '已解决' : '未解决' }}
              </ADescriptionsItem>
            </div>
            <ADescriptionsItem label="服务感受">
              {{ detail.afterSaleComment.comment }}
            </ADescriptionsItem>
          </ADescriptions>
        </section>
        <!-- 处理记录 -->
        <section class="rounded-md mt-3 overflow-hidden">
          <div class="template--title my-16px">处理记录</div>
          <a-table :columns="logColumns" :pagination="false" :data-source="stepsList" />
        </section>
        <!--v2.2.1需求去掉审核按钮-->
        <div v-if="false && detail.status === 4110" class="flex justify-center bg-white p-4 mt-4">
          <a-space>
            <a-button
              v-auth="'/v1/order/support/after/sale/save'"
              type="success"
              @click="visible = true"
              >下发售后任务
            </a-button>
            <a-button
              type="success"
              v-auth="'/v1/order/after/sale/audit'"
              v-if="detail.statusName === '待处理'"
              @click="submitAuditHandler"
            >
              提交审核结果
            </a-button>
          </a-space>
        </div>
      </div>
      <SendSaleAfterTask :detail="detail" v-model:visible="visible" @refresh="loadTableData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { createVNode, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRoute, useRouter } from 'vue-router'
  import { message, Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import handleCopy from '/@/utils/copy'
  import { SmileOutlined } from '@ant-design/icons-vue';
  import { saleAfterDetailTableColumns } from './data/ServerAssignData'
  import VoAudio from '/@/components/VoAudio/VoAudio.vue'
  import SendSaleAfterTask from './component/SendSaleAfterTask.vue'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { Pattern } from '@vocen/shared'
  import { red } from '@ant-design/colors'
  import { white } from '@vocen/shared/src/pattern/patterns'

  const visible = ref(false)
  const starMark = ref<number>(2) //评价星级
  const router = useRouter()

  const auditForm = ref()
  const formState = reactive({
    isPass: false,
    money: null,
    orderId: '',
    reason: '',
    type: null,
    remark: '',
  })
  const activeKey = ref(1)
  let stepsList = ref([])
  const route = useRoute()

  const detail = ref({})
  const saleAfterData = ref<any>([])
  const saleData = ref<any>({})

  // 提交审核结果
  const submitAuditHandler = async () => {
    const data = await auditForm.value.validate()
    console.log(data)

    const modal = Modal.confirm({
      title: '温馨提示',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      content: '是否确认提交当前审核结果？',
      async onOk() {
        // 调取解除角色的接口
        const postForm = {
          ...data,
          orderId: formState.orderId,
          reason: '',
        }
        console.log(postForm)
        try {
          const { code } = await adminHttp.ORDER.orderAfterSaleAudit(postForm)
          if (+code === 20001) {
            message.success('提交成功')
            router.back()
          }
        } catch (e: any) {
          const msg = e?.message || e?.data?.message || e?.error || '服务端错误'
          console.warn(msg)
          message.error(msg)
        }
      },

      onCancel() {
        modal.destroy()
      },
    })
  }

  const onFinish = () => {}

  const logColumns = [
    {
      title: '操作者',
      dataIndex: 'creator',
      ellipsis: true,
      width: '120px',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      ellipsis: true,
      width: '120px',
    },
    {
      title: '操作项',
      dataIndex: 'timeName',
      ellipsis: true,
      width: '120px',
    },
    {
      title: '退货状态',
      dataIndex: 'statusEvent',
      ellipsis: true,
      width: '120px',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      width: '120px',
    },
  ]
  const isJsonParse = (data) => {
    if (data instanceof String) {
      try {
        if (JSON.parse(data)) {
          return JSON.parse(data)
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  }

  const loadTableData = async () => {
    try {
      const res = await adminHttp.ORDER.orderAfterSaleBy$id({
        id: route.query?.id,
      })

      formState.orderId = res.data?.id
      stepsList.value = res.data?.timeList.filter(item => item.type!=null)
      // fileNameUrl
      let voice = res.data?.afterSaleFaultDetail.voice
      detail.value = {
        ...res.data,
        ...res.data.goodsDetail[0],
        afterSaleFaultDetailPic: res.data.afterSaleFaultDetail.pic.map((item) => item.pic),
        voice: voice ? (isJsonParse(voice) ? isJsonParse(voice).fileNameUrl : '') : '',
      }
      console.log(detail.value)
      saleAfterData.value = [
        {
          ...res.data,
          ...res.data.goodsDetail[0],
        },
      ]
      saleData.value = res.data
      console.log(saleAfterData.value.pic, 'saleAfterDatasaleAfterDatasaleAfterData')
      if (detail.value.sendBackList) {
        try {
          detail.value.sendBackList[0].logisticsDetail = JSON.parse(
            detail.value.sendBackList[0].logisticsDetail,
          )
          let pic = detail.value.sendBackList[0].logisticsDetail.pic
          if (pic && pic.length > 0) {
            detail.value.sendBackList[0].logisticsDetail.pic = pic.map((item) => item.url)
          }
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e: any) {
      console.log(e)
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }

  loadTableData()
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
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

  .edit-table {
    width: 100%;
  }

  .edit-table td,
  .edit-table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 50px;
  }

  .edit-table td:nth-child(odd) {
    width: 200px;
    background: #f6f7f8;
  }
</style>
