<template>
  <div>
    <div class="bg-white m-24px p-24px">
      <div class="page-step p-12px">
        <OrderSteps :stepsList="stepsList" :status="statusName"></OrderSteps>
      </div>
      <div class="page-table">
        <div class="payment-Status pb-1">
          <section>
            <a-alert
              :message="commodityStatus"
              :description="commodityDescription"
              :type="commodity"
            ></a-alert>
          </section>
        </div>

        <div class="basic-data pb-10 pt-16px">
          <div class="template--title mb-20px">基本信息</div>
          <div>
            <div class="card-box">
              <ADescriptions :data-source="basicData" :column="3" bordered layout="vertical">
                <ADescriptionsItem v-for="(item, index) of basicData" :label="item.title">
                  <template v-if="item.title === '投资人信息'">
                    <AButton type="link" @click="shopDetails()">{{ buyerName }}</AButton>
                    <div>{{ details.buyerContact }}-{{ details.buyerPhone }}</div>
                  </template>
                  <template v-else-if="item.title === '发票信息'">
                    <template v-if="details.invoiceList != ''">
                      <div>
                        商品服务费:
                        <AButton type="link" @click="commodityDetails()"> 发票明细 </AButton>
                      </div>
                      <div v-if="platformInvoice != ''">
                        平台服务费:
                        <AButton type="link" @click="invoiceDetails()"> 发票明细</AButton>
                      </div>
                    </template>
                  </template>
                  <template v-else-if="item.title === '支付方式'">
                    <span>{{ details.payType }}</span>
                  </template>
                  <template v-else-if="item.title === '订单来源'">
                    <span v-if="source === 1">安卓</span>
                    <span v-if="source === 2">IOS</span>
                    <span v-if="source === 3">H5</span>
                    <span v-if="source === 4">PC</span>
                    <span v-if="source === 5">小程序</span>
                    <span v-if="source === 6">公众号</span>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <span>{{ addressName }}</span>
                    <span>&nbsp;&nbsp;{{ addressPhone }}</span>
                    <div>{{ addressAddress }}{{ addressDetail }}</div>
                    <div><span>编码：</span>{{ addressAreaCode }}</div>
                  </template>
                  <template v-else-if="item.title === '卖家'">
                    <AButton type="link" @click="goBuyer()">{{ seller }}</AButton>
                  </template>
                  <template v-else-if="item.title === '备注'">
                    <div class="overflow-auto h-32 ...">{{ remarkList.remark}}</div>
                  </template>
                  <template v-else>
                    {{ stepStatus[item.key] }}
                  </template>
                </ADescriptionsItem>
              </ADescriptions>
            </div>
          </div>
        </div>
      </div>
      <div class="product-data pb-10" v-if="isLogistics">
        <div class="product-title pb-5 text-xl">
          <IconFont type="icon-morenbiaozhi" class="pr-2" />
          物流信息
        </div>
        <div>
          <ATable
            :dataSource="logisticsList"
            :columns="filterFormConfig.logisticsColumns"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'deliveryPic'">
                <a-image-preview-group>
                  <a-image :width="20" :height="20" :src="record.deliveryPic" />
                </a-image-preview-group>
              </template>
              <template v-if="column.dataIndex === 'goodsDetail'">
                <div v-for="(item, index) in record.goodsDetail" :key="index">
                  <span>{{ item.goodsName }}</span>
                  <span class="ml-10px"> *{{ item.goodsCount }}</span>
                </div>
              </template>
            </template>
          </ATable>
        </div>
      </div>
      <div class="profit-data pb-32px">
        <div class="template--title mb-20px">商品信息</div>
        <div>
          <ATable
            v-if="(details.status == 1240 || details.status == 1230) && details.investType != 2"
            :dataSource="dataSourceList"
            :columns="containerConfig.goodsColumns"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'engineNos'">
                <div class="flex">
                  <AButton
                    v-if="details.status === 1240 || details.status === 1230"
                    type="link"
                    @click="showModal(record)"
                    >查看明细
                  </AButton>
                </div>
              </template>
              <template v-if="column.dataIndex === 'goodsName'">
                <div class="flex">
                  <FileUrlPrase :file-url="record.pic[0]" />
                  <span>{{ record.goodsName }}</span></div
                >
              </template>
              <template v-if="column.dataIndex === 'goodsCount'">
                <div>{{ record.goodsCount }}</div>
                <div v-if="statusName === 1220">
                  <span v-if="record.goodsCount - record.deliveryCount > 0"
                    ><span class="text-red-600"
                      >{{ record.goodsCount - record.deliveryCount }}件未发货</span
                    ></span
                  >
                </div>
              </template>
              <template v-if="column.dataIndex === 'warehouseName'">
                <span>{{ details.warehouseName }}</span>
              </template>
              <template v-if="column.dataIndex === 'progress'">
                <template v-if="details.status == 1240 || details.status == 1230">
                  <template v-if="record.refundStatusName == ''">
                    <AButton type="link" @click="application(record)">申请退款退货</AButton>
                  </template>
                  <template v-else>
                    <AButton
                      v-if="details.status == 1240 || details.status == 1230"
                      type="link"
                      @click="seeDetails(record)"
                      >查看详情
                    </AButton>
                  </template>
                </template>
              </template>
            </template>
            <template #footer>
              <div class="footer">
                <div
                  >合计:{{ goodsAmount }}元
                  <span
                    >（现金金额:{{ details.cashAmount }}元，
                    <span class="mr-5px">账期金额：{{ details.accountAmount }}元</span>
                    <question-circle-outlined @click="showAccountDetail" />
                    ）
                  </span>
                </div>
              </div>
            </template>
          </ATable>
          <ATable
            v-else
            :dataSource="dataSourceList"
            :columns="containerConfig.progressColumns"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'engineNos'">
                <div class="flex">
                  <AButton
                    v-if="details.status === 1240 || details.status === 1230"
                    type="link"
                    @click="showModal(record)"
                    >查看明细
                  </AButton>
                </div>
              </template>
              <template v-if="column.dataIndex === 'goodsName'">
                <div class="flex">
                  <FileUrlPrase :file-url="record.pic[0]" />
                  <span>{{ record.goodsName }}</span></div
                >
              </template>
              <template v-if="column.dataIndex === 'goodsCount'">
                <div>{{ record.goodsCount }}</div>

                <div v-if="statusName === 1220">
                  <span v-if="record.goodsCount - record.deliveryCount > 0"
                    ><span class="text-red-600"
                      >{{ record.goodsCount - record.deliveryCount }}件未发货</span
                    ></span
                  >
                </div>
              </template>
              <template v-if="column.dataIndex === 'warehouseName'">
                <span>{{ details.warehouseName }}</span>
              </template>
              <template v-if="column.dataIndex === 'progress'">
                <template v-if="details.status == 1240 || details.status == 1230">
                  <template v-if="record.refundStatusName == ''">
                    <AButton type="link" @click="application(record)">申请退款退货</AButton>
                  </template>
                  <template v-else>
                    <AButton
                      v-if="details.status == 1240 || details.status == 1230"
                      type="link"
                      @click="seeDetails(record)"
                      >查看详情
                    </AButton>
                  </template>
                </template>
              </template>
            </template>
            <template #footer>
              <div class="footer">
                <div>合计:{{ goodsAmount }}元</div>
              </div>
            </template>
          </ATable>
        </div>
      </div>
      <div class="profit-data pb-32px">
        <div class="template--title mb-20px">分润信息</div>
        <div>
          <ATable
            :dataSource="profitSharingMockData"
            :columns="filterFormConfig.profitColumns"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'amount'">
                <span v-if="record.amount">{{ record.amount }}元</span>
              </template>
            </template>
          </ATable>
        </div>
      </div>
    </div>
    <AModal
      width="1200px"
      v-model:visible="afterSales"
      title="申请售后"
      centered
      destroy-on-close
      @ok="salesConfirmation"
      @cancel="salesCancel"
    >
      <!-- goodsPic: res.data.refundGoods.pic, -->
      <div class="flex">
        <div class="p-10 m-l-10 flex-4">
          <div class="goodsImg"><img :src="goodsPic" alt="商品图片" /></div>
          <div><span>订单编号：</span>{{ details.id }}</div>
          <div class="goodsTitle">
            <AButton type="link" @click="goDetails">
              <span>商品名称：</span>{{ goodsContent.goodsName }}
            </AButton>
          </div>
        </div>

        <div class="flex-1 pt-10 pb-10">
          <AForm
            layout="horizontal"
            ref="formRef"
            :model="formState"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
          >
            <AFormItem
              label="售后类型"
              name="isRefundOnlyValue"
              :rules="[{ required: true, message: '请选择售后类型' }]"
            >
              <a-select
                ref="select"
                v-model:value="formState.isRefundOnlyValue"
                :options="afterType"
                @change="isRefundOnlyChange"
                placeholder="请选择"
              />
            </AFormItem>
            <AFormItem
              label="是否已到货"
              name="whetherReceiptGoods"
              :rules="[{ required: true, message: '请选择是否收到货' }]"
            >
              <a-select
                ref="select"
                v-model:value="formState.whetherReceiptGoods"
                :options="receiptType"
                @change="receiptGoodsChange"
                placeholder="请选择"
              />
            </AFormItem>
            <AFormItem
              label="售后原因"
              name="orderReason"
              :rules="[{ required: true, message: '请选择售后原因' }]"
            >
              <a-select
                ref="select"
                v-model:value="formState.orderReason"
                :options="orderOptions"
                @change="changeReason"
                placeholder="请选择"
              />
            </AFormItem>
            <AFormItem
            label="请选择退货机器识别码"
            name="IdentificationCode"
            :rules="[{ required: true, message: '请选择退货机器识别码' }]"
          >
            <!-- <template> -->
              <a-checkbox-group
                v-model:value="formState.IdentificationCode"
                :options="plainOptions"
                @change="onCheckAllChange"
              />
            <!-- </template> -->
          </AFormItem>
            <AFormItem
              label="产品数量"
              name="productCount"
              :rules="[{ required: true, message: '请选择产品数量' }]"
            >
              <a-input-number
                id="inputNumber"
                disabled
                v-model:value="formState.productCount"
                :min="1"
                @change="countChange"
                placeholder="请选择"
              />
            </AFormItem>
            <AFormItem
              label="详细描述"
              name="receiptRemark"
              :rules="[{ required: true, message: '请填写详细描述' }]"
            >
              <a-textarea
                v-model:value="formState.receiptRemark"
                placeholder="详细描述"
                :showCount="true"
                :rows="6"
                :maxlength="100"
              />
            </AFormItem>
            <AFormItem label="上传凭证" name="voucher">
              <EraUpload
                :uploadType="'img'"
                :fileListData="fileUrl"
                :maxSize="30"
                :maxNumber="6"
                uploadFuncChannel="localStore"
                :multiple="true"
                upload-tip="点击上传图片"
                help-text="最多插入6张图片。"
                @done="handleDone"
                @delete="handerUpDel"
              />
            </AFormItem>
            <AFormItem label="退款金额" name="createdTime">
              <AInput disabled v-model:value="quantity" />
            </AFormItem>
          </AForm>
        </div>
      </div>
    </AModal>
    <a-modal v-model:visible="visible" width="800px" title="发动机识别码明细">
      <div class="p-15px">
        <div class="flex justify-between">
          <div>商品名称:{{ goodName }}</div>
          <div>商品数量:{{ goodCount }}</div>
        </div>
        <div class="pb-10">
          <!-- <div>{{IdentificationCode}}
      </div>   -->
          <div v-if="IdentificationCode">
            <div class="flex flex-wrap">
              <div v-for="(item, index) of IdentificationCode">
                <div class="text-xl p-10px flex w-4/12">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center">
          <AButton type="primary" @click="visible = false">关闭</AButton>
        </div>
      </template>
    </a-modal>
    <PaymentDaysSub
      :accountAmount="paymentSubModal.accountAmount"
      :list="paymentSubModal.list"
      v-model:visible="paymentSubModal.visible"
    ></PaymentDaysSub>
    <ReturnRecordsModal
      :idList="recordsModal.idLIst"
      :goodsCount="recordsModal.goodsCount"
      :goodsName="recordsModal.goodsName"
      v-model:visible="recordsModal.visible"
    ></ReturnRecordsModal>
    <a-modal
      v-model:visible="commodityInvoice"
      :footer="false"
      @cancel="commodityInvoice = false"
      width="1000px"
      title="商品发票明细"
    >
      <div class="p-15px">
        <a-image-preview-group>
          <template v-for="(item, index) in checkImg" :key="index">
            <!-- <p>{{item}}</p> -->
            <template v-for="(itemList, index1) in item" :key="index1">
              <a-image :width="200" :src="itemList + '&type=1'" :preview="{ src: itemList }" />
            </template>
          </template>
        </a-image-preview-group>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" name="agentInvestDetails" setup>
  import { reactive, onBeforeMount, ref,watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { createFromIconfontCN, QuestionCircleOutlined } from '@ant-design/icons-vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useRoute } from 'vue-router'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { containerConfig } from './data/AgentInvestContainerData'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import PaymentDaysSub from './component/PaymentDaysSub.vue'
  import ReturnRecordsModal from '/@/modules/OrderModule/component/ReturnRecordsModal/ReturnRecordsModal.vue'

  import { filterFormConfig } from './data/AgentInvestContainerData'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import { useRouter } from 'vue-router'
  import { isObject } from '/@/utils/is'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  const plainOptions = ref([])
  const remarkList=ref<any>([])
  const visible = ref<boolean>(false) //明细弹窗
  const goodName = ref<string>('') //明细商品名称
  const goodCount = ref<string>('') //明细商品数量
  const IdentificationCode = ref<any>() //明细
  const route = useRoute()
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  onMountedOrActivated(() => {
    loadTableData()
  })
  const logisticsDetails = ref<any>() //物流信息的转json
  const go = useRouter()
  const warehouseName = ref('')
  const receiveWarehouseName = ref('')
  const shopId = ref('')
  const buyerId = ref('')
  const buyerName = ref('')
  const PaymentMethod = ref('')
  const source = ref()
  const address = ref('')
  const photo = ref<any>('')
  const addressName = ref('')
  const addressPhone = ref('')
  const addressAddress = ref('')
  const addressDetail = ref('')
  const addressAreaCode = ref('')
  const seller = ref('')
  let stepsList = ref([])
  let commodityStatus = <any>ref()
  let commodityDescription = <any>ref()
  let commodity = <any>ref()
  let goodsAmount = ref({})
  let statusName = <any>ref({})
  const stepStatus = ref([])
  const dataSource = ref()
  let dataSourceList = ref([])
  const details = ref({}) //投资详情
  const checkImg = ref<any>()
  const profitSharingMockData = ref<any>() //分润信息
  const logisticsList = ref<any>([]) //物流
  const isLogistics = ref<any>()
  const platformInvoice = ref<any>('')
  const productDetails = ref<any>() //产品
  const serviceProviderProfitSharing = ref()

  //投资/v1/order/invest/{id}
  const loadTableData = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.orderInvest$id({
        id: route.query?.id,
      })
      //投资详情
      details.value = res.data
      //发票
      if (res.data?.invoiceList) {
        checkImg.value = res.data?.invoiceList
          .filter((item) => item.billType === 0)
          .map((item) => {
            return item.billUrl.split(',')
          })
        platformInvoice.value = res.data?.invoiceList
          .filter((item) => item.billType === 1)
          .map((item) => {
            return item.id
          })
        console.log(platformInvoice.value, ' checkImg.value')
      }
      if (res.data?.deliveryList.length != 0) {
        isLogistics.value = res.data?.deliveryList[0]?.deliveryType //物流
        const isDetail = res.data?.deliveryList.map((item) => {
          return {
            name: item.deliveryType,
            id: item.id,
            logisticsDetail: isObject(item.logisticsDetail)
              ? item.logisticsDetail
              : JSON.parse(item.logisticsDetail),
            goodsDetail: item.goodsDetail,
          }
        })

        logisticsDetails.value = isDetail
        isDetail.forEach((item) => {
          logisticsList.value.push({
            deliveryType: item.name,
            deliveryCompany: item.logisticsDetail?.deliveryCompany || '无',
            deliveryNum: item.logisticsDetail?.deliveryNum || '无',
            deliveryMobile: item.logisticsDetail?.deliveryMobile || '无',
            deliveryPic: item.logisticsDetail?.deliveryPic ? item.logisticsDetail?.deliveryPic : '',
            goodsDetail: item.goodsDetail || '无',
          })
        })
        console.log(logisticsList.value, 'lll')

        // logisticsList.value = [
        //   {
        //     deliveryType: isDetail,
        //     // company: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.company,
        //     // mobile: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.mobile,
        //     // orderNumber: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.orderNumber,
        //     // logisticsUrl: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.logisticsUrl,
        //   },
        // ]
      }

      buyerName.value = res.data.buyerName
      shopId.value = res.data.shopId
      buyerId.value = res.data.buyerId
      source.value = res.data.source
      PaymentMethod.value = res.data.isCash
      // address.value = res.data.orderAddress.addressDetail
      address.value = res.data.orderAddress
      addressName.value = res.data.orderAddress?.name
      addressPhone.value = res.data.orderAddress?.phone
      addressAddress.value = res.data.orderAddress?.address
      addressDetail.value = res.data.orderAddress?.addressDetail
      addressAreaCode.value = res.data.orderAddress?.areaCode
      remarkList.value = res.data?.remarkList.find((item) => item.type === 1)
      seller.value = res.data.shopName
      //基础信息
      stepStatus.value = res.data
      dataSource.value = res.data.source
      //步骤条
      stepsList.value = res.data.timeList
      //商品
      goodsAmount.value = res.data.goodsAmount
      dataSourceList.value = res.data.goodsDetail
      photo.value = res.data.goodsDetail[0].pic[0] || []
      warehouseName.value = res.data.warehouseName
      receiveWarehouseName.value = res.data.receiveWarehouseName
      //分润
      profitSharingMockData.value = res.data.orderProfitInfoList
      //状态
      statusName.value = res.data.status
      if (statusName.value === 1210) {
        commodityStatus.value = '当前订单状态：待付款'
        commodity.value = 'error'
        commodityDescription.value = res.data.nextStageTime
      } else if (statusName.value === 1220) {
        commodityStatus.value = '当前订单状态：待发货'
        commodity.value = 'success'
      } else if (statusName.value === 1230) {
        commodityStatus.value = '当前订单状态：待收货'
        commodity.value = 'success'
      } else if (statusName.value === 1240) {
        commodityStatus.value = '当前订单状态：已完成'
        commodity.value = 'success'
      } else if (statusName.value === 1250) {
        commodityStatus.value = '当前订单商品状态：已取消'
        commodity.value = 'error'
      } else if (statusName.value === 1260) {
        commodityStatus.value = '当前订单商品状态：已关闭'
        commodity.value = 'error'
      }
      createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }

  const current = ref<number>(0)
  const basicData: any[] = [
    {
      title: '订单编号',
      key: 'id',
    },
    {
      title: '投资人信息',
      key: 'buyerName',
    },
    {
      title: '支付方式',
      key: 'orderCompanyId',
    },
    {
      title: '订单来源',
      key: 'source',
    },
    {
      title: '可得积分',
      key: '',
    },
    {
      title: '活动信息',
      key: 'activityDetail',
    },
    {
      title: '收货地址',
      key: '',
    },
    {
      title: '卖家',
      key: 'shopName',
    },
    {
      title: '备注',
      key: 'remark',
    },
    {
      title: '发票信息',
      key: '',
    },
  ]

  //跳转卖家
  const goBuyer = () => {
    go.push({
      path: '/customerModule/supplier/EmployeeManagement',
      query: {
        type: 'one',
        id: shopId.value,
      },
    })
  }
  //跳转投资人
  const shopDetails = () => {
    go.push({
      path: '/customerModule/agent/agentOut',
      query: {
        id: buyerId.value,
        type: 'one',
      },
    })
  }
  //跳转发票
  const invoiceDetails = () => {
    go.push({
      path: '/financial/ticket/alreadyInvoiceDetail',
      query: {
        id: platformInvoice.value.toString(),
      },
    })
  }

  /**申请售后 */
  const formRef = ref<any>()
  let projectId = ref('')
  let goodsPic = ref<any>('')
  const goodsContent = ref<any>('')
  let orderOptions = ref([] as any[])
  let quantity = <any>ref('')
  const formState = reactive<FormState>({
    afterGoods: '',
    createdTime: '',
    warehouseName: '',
    modifyTime: '',
    isRefundOnlyValue: null,
    whetherReceiptGoods: null,
    orderReason: null,
    productCount: '',
    receiptRemark: '',
    IdentificationCode:[]
  })
  const afterSales = ref(false)

  interface FormState {
    afterGoods: any
    createdTime: any
    warehouseName: any
    modifyTime: any
    isRefundOnlyValue: any
    whetherReceiptGoods: any
    orderReason: any
    productCount: any
    receiptRemark: any
    IdentificationCode:any
  }

  let isRefundOnlyValue = ref<any>('')
  let deliveryMethod = ref<string | undefined>()
  let whetherReceiptGoods = ref<any>('')
  let productCount = ref<any>('')
  let receiptRemark = ref<any>('')
  const fileUrl = ref([])
  const modeType = ref<SelectProps['options']>([
    { value: 1, label: '物流发货' },
    { value: 2, label: '无需物流' },
  ])
  const afterType = ref<SelectProps['options']>([
    { value: true, label: '仅退款' },
    { value: false, label: '退货退款' },
  ])
  const receiptType = ref<SelectProps['options']>([
    { value: true, label: '已收到货' },
    { value: false, label: '未收到货' },
  ])
  //是否退货退款
  const isRefundOnlyChange = (value) => {
    console.log(value, 'iiii')
  }
  //是否到货
  const receiptGoodsChange = (value) => {
    orderOptions.value = []
    adminHttp.Order.orderRefundCauseQueryList({
      type: value,
    })
      .then((res) => {
        res.data.filter((item) => {
          console.log(item)
          let map = { label: item, value: item }
          orderOptions.value.push(map)
        })
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  //数量变化/v1/order/refund/calculate/
  const countChange = (value) => {
    adminHttp.Order.orderRefundCalculateAmount({
      goodsId: goodsContent.value.goodsId,
      orderId: details.value.id,
      goodsCount: formState.productCount,
      projectId: goodsContent.value.projectId || 0,
    })
      .then((res) => {
        console.log('数量=>', res)
        quantity.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  //数量变化/v1/order/refund/calculate/
  const changeWareHouse = (item) => {
    console.log(item, 'item')
    wareId.value = item
    wareAddressCode.value = wareAddress[item] //收货点contact
    wareAddressName.value = wareContact[item] //收货人contact
    wareAddressPhone.value = warePhone[item] //手机号
    addressCode.value = wareCode[item]
    console.log(wareCode[item]) //地址code
    console.log(wareContact[item], '收货人') //收货人
    console.log(warePhone[item], '手机号') //手机号
  }
  //弹窗
  const application = async (record) => {
    console.log(record, 'record')
    try {
      const { code } = await adminHttp.Order.orderRefundCheckOrder({
        id: route.query?.id,
      })
      if (+code === 20001) {
        goodsPic.value = record.pic[0]
        goodsContent.value = record
        afterSales.value = true
      }
    } catch (e) {
      console.log(e)
    }
    try {
      const { code, data } = await adminHttp.Order.orderRefundGetRefundEngineCode({
        goodsId: goodsContent.value.goodsId,
        orderId: details.value.id,
        projectId:goodsContent.value.projectId || 0,
      })
      if (+code === 20001) {
		  plainOptions.value = data

        if (data.length === 1) {
          formState.IdentificationCode = data
		  formState.productCount = formState.IdentificationCode.length
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onCheckAllChange = (e: any) => {
    console.log(e,'pppppp');
    
    formState.IdentificationCode = e
    formState.productCount = formState.IdentificationCode.length
  }

  //确定 
  const salesConfirmation = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        let map = {
          goodsInfos: [
            {
              goodsId: goodsContent.value.projectId,
              amount: quantity.value,
              goodsCount: formState.productCount,
              engineNoList:formState.IdentificationCode
            },
          ],
          isRefundOnly: formState.isRefundOnlyValue,
          source: 4,
          shopId: shopId.value,
          shopPlatformCode: details.value.shopPlatformCode,
          orderId: details.value.id,
          reason: formState.orderReason,
          refundPic: fileUrl.value.toString() || '',
          whetherReceiptGoods: formState.whetherReceiptGoods,
          remark: formState.receiptRemark,
          projectId: goodsContent.value.projectId || 0,
        }
        adminHttp.Order.orderRefundCreateFeFundApply(map)
          .then(() => {
            afterSales.value = false
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
  }
  watch(
    () => formState.productCount,
    (val) => {
      adminHttp.Order.orderRefundCalculateAmount({
        goodsId: goodsContent.value.goodsId,
        orderId: details.value.id,
        goodsCount: formState.productCount,
        projectId: goodsContent.value.projectId|| 0,
      })
        .then((res) => {
          console.log('数量=>', res)
          quantity.value = res.data
        })
        .catch((err) => {
          createMessage.error({ content: `:${err.message}` })
        })
    },
  )
  //原因
  const changeReason = (item) => {
    console.log(item)
    formState.orderReason = item
  }
  //取消afterSales
  const salesCancel = () => {
    afterSales.value = false
    formState.orderReason = null
    formState.receiptRemark = ''
    // formState.productCount = ''
    formState.whetherReceiptGoods = null
    formState.isRefundOnlyValue = null
  }
  const goDetails = () => {
    go.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: {
        id: goodsContent.value.goodsId,
      },
    })
  }

  const handleDone = (info) => {
    fileUrl.value.push(info.file.filePath)
  }

  const handerUpDel = (record) => {
    fileUrl.value = fileUrl.value.filter((item) => item != record.url)
  }
  const recordsModal = reactive({
    visible: false,
    goodsName: '',
    goodsCount: '',
    idLIst: [],
  })
  const seeDetails = (record) => {
    recordsModal.goodsName = record.goodsName
    recordsModal.goodsCount = record.goodsCount
    recordsModal.idLIst = record.refundIdList.map((item) => {
      return item.id
    })
    recordsModal.visible = true
  }

  //账期应付款明细
  const paymentSubModal = reactive({
    visible: false,
    accountAmount: '',
    list: [],
  })
  const showAccountDetail = () => {
    paymentSubModal.accountAmount = details.value.accountAmount
    paymentSubModal.list = details.value.accountDayList
    paymentSubModal.visible = true
  }

  //查看明细
  const showModal = (record) => {
    visible.value = true
    goodName.value = record.goodsName
    goodCount.value = record.goodsCount
    IdentificationCode.value = record.engineNos.split(',')
  }

  //发票
  const commodityInvoice = ref(false)
  const commodityDetails = () => {
    commodityInvoice.value = true
  }
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 10px;

    .page-step {
      padding: 50px;
      background: #fff;
      margin-bottom: 10px;
    }

    .page-table {
      padding: 10px;
      background: #fff;

      .payment-Status {
        // display: flex;
        background-color: #fff;
      }
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

  .goodsImg {
    display: flex;
    width: 200px;
    height: 200px;
  }

  .goodsTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::v-deep(.ant-descriptions-item-content){
    width: 300px!important;
  }
</style>
