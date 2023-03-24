<template>
  <div>
    <div class="page-wrap">
      <div class="page-step">
        <OrderSteps :stepsList="stepsList" :status="statusName"></OrderSteps>
      </div>

      <div class="page-table">
        <div class="pb-30px pt-15px">
          <OrderGoods :statusName="statusName">
            <template #description>
              <span  v-if="salesDetails?.isConsignmentSale"
                  ><a-tag  color="blue">寄售</a-tag></span>
              <span class="pl-16px" v-if="salesDetails?.cancelReason != null">
                <span v-if="salesDetails.status === 1150"
                  >取消原因:{{ salesDetails?.cancelReason }}</span
                >
                <span v-else-if="salesDetails.status === 1160"
                  >关闭原因:{{ salesDetails?.cancelReason }}</span
                >
              </span>
            </template>
          </OrderGoods>
        </div>
        <div class="basic-data pb-10">
          <div class="template--title mb-20px">基本信息</div>
          <div>
            <div class="card-box" v-if="isValet">
              <ADescriptions :data-source="data" :column="3" bordered layout="vertical">
                <ADescriptionsItem v-for="(item, index) of data" :label="item.title">
                  <template v-if="item.title === '买家'">
                    <div class="break-normal ..."
                      ><a @click="shopDetails()">{{ buyerName }}</a></div
                    >
                    <div>{{ salesDetails.buyerContact }}{{ salesDetails.buyerPhone }}</div>
                  </template>
                  <template v-else-if="item.title === '代客下单人'">
                    <template v-if="isValet">
                      <div>{{ orderCompanyStoreName }}</div>
                      <div>{{ orderCompanyPhone }}</div>
                    </template>
                  </template>
                  <template v-else-if="item.title === '支付方式'">
                    <span>{{ salesDetails.payType }}</span>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <span>{{ addressName }}</span>
                    <span>&nbsp;&nbsp;{{ addressPhone }}</span>
                    <div>{{ addressAddress }}{{ addressDetail }}</div>
                    <div><span>编码：</span>{{ addressAreaCode }}</div>
                  </template>
                  <template v-else-if="item.title === '订单来源'">
                    <span v-if="source === 1">安卓</span>
                    <span v-if="source === 2">IOS</span>
                    <span v-if="source === 3">H5</span>
                    <span v-if="source === 4">PC</span>
                    <span v-if="source === 5">小程序</span>
                    <span v-if="source === 6">公众号</span>
                  </template>
                  <template v-else-if="item.title === '卖家'">
                    <AButton type="link" @click="goBuyer()">{{ salesDetails.shopName }}</AButton>
                  </template>
                  <template v-else-if="item.title === '备注'">
                    <div class="overflow-auto h-32 ...">{{ remarkList.remark }}</div>
                  </template>
                  <template v-else-if="item.title === '发票信息'">
                    <template v-if="salesDetails.invoiceList != ''">
                      <div>
                        商品服务费:
                        <AButton type="link" @click="commodityDetails()"> 发票明细</AButton>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    {{ stepStatus[item.key] }}
                  </template>
                </ADescriptionsItem>
              </ADescriptions>
            </div>
            <div v-else class="card-box">
              <ADescriptions
                :data-source="containerConfig.dataCompanyId"
                :column="3"
                bordered
                layout="vertical"
              >
                <ADescriptionsItem v-for="(item, index) of data" :label="item.title">
                  <template v-if="item.title === '买家'">
                    <div class="break-normal ..."
                      ><a @click="shopDetails()">{{ buyerName }}</a></div
                    >
                    <div>{{ salesDetails.buyerContact }}{{ salesDetails.buyerPhone }}</div>
                  </template>
                  <template v-else-if="item.title === '支付方式'">
                    <span>{{ salesDetails.payType }}</span>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <span>{{ addressName }}</span>
                    <span>&nbsp;&nbsp;{{ addressPhone }}</span>
                    <div>{{ addressAddress }}{{ addressDetail }}</div>
                    <div><span>编码：</span>{{ addressAreaCode }}</div>
                  </template>
                  <template v-else-if="item.title === '订单来源'">
                    <span v-if="source === 1">安卓</span>
                    <span v-if="source === 2">IOS</span>
                    <span v-if="source === 3">H5</span>
                    <span v-if="source === 4">PC</span>
                    <span v-if="source === 5">小程序</span>
                    <span v-if="source === 6">公众号</span>
                  </template>
                  <template v-else-if="item.title === '卖家'">
                    <AButton type="link" @click="goBuyer()">{{ salesDetails.shopName }}</AButton>
                  </template>
                  <template v-else-if="item.title === '备注'">
                    <template v-if="salesDetails?.remarkList">
                      <span>{{ salesDetails?.remarkList[0]?.remark }}</span>
                    </template>
                  </template>
                  <template v-else-if="item.title === '发票信息'">
                    <template v-if="salesDetails.invoiceList != ''">
                      <div>
                        商品服务费:
                        <AButton type="link" @click="commodityDetails()"> 发票明细</AButton>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    {{ stepStatus[item.key] }}
                  </template>
                </ADescriptionsItem>
              </ADescriptions>
            </div>
          </div>
        </div>
        <div class="product-data pb-10" v-if="isLogistics">
          <div class="template--title mb-20px">物流信息</div>
          <div>
            <ATable
              :dataSource="logisticsList"
              :columns="containerConfig.logisticsColumns"
              bordered
              :pagination="false"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'logisticsUrl'">
                  <div v-if="record.logisticsUrl">
                    <a-image-preview-group>
                      <a-image :width="40" :height="40" :src="record.logisticsUrl" />
                    </a-image-preview-group>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'product'">
                  <div>
                    <span>{{ productDetails.goodsName }}</span>
                    <span>{{ productDetails.goodsCode }}</span>
                    <span>*{{ productDetails.goodsCount }}</span>
                  </div>
                </template>
              </template>
            </ATable>
          </div>
        </div>
        <div class="product-data pb-10">
          <div class="template--title mb-20px">商品信息</div>
          <div>
            <template v-if="salesDetails.status == 1140 || salesDetails.status == 1130">
              <ATable
                :dataSource="dataSourceList"
                :columns="containerConfig.goodsColumns"
                bordered
                :pagination="false"
              >
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'goodsName'">
                    <div class="flex">
                      <FileUrlPrase :file-url="record.pic[0]" />
                      <span>{{ record.goodsName }}</span></div
                    >
                  </template>
                  <template v-if="column.dataIndex === 'originalPrice'">
                    <div v-if="periodDetails != ''">{{ salesDetails.periodDays }}天账期</div>
                    <div v-if="periodDetails != ''">{{ record.originalPrice }}元</div>
                  </template>
                  <template v-if="column.dataIndex === 'warehouseName'">
                    <span>{{ salesDetails.warehouseName }}</span>
                  </template>
                  <template v-if="column.dataIndex === 'progress'">
                    <template v-if="salesDetails.status == 1140 || salesDetails.status == 1130">
                      <template v-if="record.refundStatusName == ''">
                        <AButton type="link" @click="application(record)">申请售后</AButton>
                      </template>
                      <template v-else>
                        <div>{{ record.refundStatusName }}</div>
                        <AButton type="link" @click="seeDetails(record)">售后详情</AButton>
                      </template>
                    </template>
                  </template>
                </template>
                <template #footer>
                  <div class="footer">
                    <div>
                      <div>合计:{{ goodsAmount }}元</div>
                      <div v-if="periodDetails != ''"
                        >预计还款日{{ periodDetails[0].accountTime }}</div
                      >
                    </div>
                  </div>
                </template>
              </ATable>
            </template>

            <template v-else>
              <ATable
                :dataSource="dataSourceList"
                :columns="containerConfig.progressColumns"
                bordered
                :pagination="false"
              >
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'goodsName'">
                    <div class="flex">
                      <FileUrlPrase :file-url="record.pic[0]" />
                      <span>{{ record.goodsName }}</span></div
                    >
                  </template>
                  <template v-if="column.dataIndex === 'warehouseName'">
                    <span>{{ salesDetails.warehouseName }}</span>
                  </template>
                  <template v-if="column.dataIndex === 'originalPrice'">
                    <div v-if="periodDetails != ''">{{ salesDetails.periodDays }}天账期</div>
                    <div v-if="periodDetails != ''">{{ record.originalPrice }}元</div>
                  </template>
                  <template v-if="column.dataIndex === 'progress'">
                    <template v-if="salesDetails.status == 1140 || salesDetails.status == 1130">
                      <template v-if="record.refundStatusName == ''">
                        <AButton type="link" @click="application(record)">申请售后</AButton>
                      </template>
                      <template v-else>
                        <div>{{ record.refundStatusName }}</div>
                        <AButton type="link" @click="seeDetails(record)">查看详情</AButton>
                      </template>
                    </template>
                  </template>
                </template>
                <template #footer>
                  <div class="footer">
                    <div>
                      <div>合计:{{ goodsAmount }}元</div>
                      <div v-if="periodDetails != ''"
                        >预计还款日{{ periodDetails[0].accountTime }}</div
                      >
                    </div>
                  </div>
                </template>
              </ATable>
            </template>
          </div>
        </div>
        <div class="product-data pb-10" v-if="supportDetailList != ''">
          <div class="template--title mb-20px">增值服务</div>
          <div>
            <ATable
              :dataSource="supportDetailList"
              :columns="incrementColumns"
              bordered
              :pagination="false"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'orderStatus'">
                  <span v-if="record.orderStatus === 0">打码服务</span>
                  <span v-else>{{ record.orderStatusName }}</span>
                </template>
                <template v-if="column.dataIndex === 'supportAmount'">
                  <span>{{ record?.supportAmount }}元</span>
                </template>
                <template v-if="column.dataIndex === 'homeStartTime'">
                  <template v-if="record.supportType === 34">{{}}</template>
                  <template v-else>
                    <div>{{ record.homeStartTime }}</div>
                    <div>{{ record.homeEndTime }}</div>
                  </template>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <AButton type="link" @click="addedView(record)">查看详情</AButton>
                </template>
              </template>
              <template #footer>
                <!-- <div class="flex flex-col"> -->
                <div class="flex flex-row-reverse">
                  增值服务合计: {{ totalPrice.toFixed(2) }}元</div
                >
                <div class="flex flex-row-reverse"> 订单总合计: {{ salesDetails.payAmount }}元</div>
                <!-- </div> -->
              </template>
            </ATable>
          </div>
        </div>
        <div class="profit-data pb-50">
          <div class="template--title mb-20px">分润信息</div>
          <div>
            <ATable
              :dataSource="orderProfitInfoList"
              :columns="containerConfig.profitColumns"
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
    </div>

    <a-modal v-model:visible="visible" title="打码服务" @ok="handleOk">
      <div class="p-15px">
        <VoPreviewHeadImg :data-source="supportImg" />
      </div>
    </a-modal>

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
          <div><span>订单编号：</span>{{ salesDetails.id }}</div>
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
                placeholder="数量"
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
    <a-modal v-model:visible="commodityInvoice" width="1000px" :footer="false" title="商品发票明细">
      <div class="p-15px">
        <a-image-preview-group v-if="checkImg.length">
          <template v-for="(item, index) in checkImg" :key="index">
            <!-- <p>{{item}}</p> -->
            <template v-for="(itemList, index1) in item" :key="index1">
              <a-image :width="200" :src="itemList + '&type=1'" :preview="{ src: itemList }" />
            </template>
          </template>
        </a-image-preview-group>
        <a-empty v-else />
      </div>
    </a-modal>
    <ReturnRecordsModal
      :idList="recordsModal.idList"
      :goodsCount="recordsModal.goodsCount"
      :goodsName="recordsModal.goodsName"
      v-model:visible="recordsModal.visible"
    ></ReturnRecordsModal>
  </div>
</template>

<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue'
  import { onBeforeMount, ref, reactive, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { PageEnum } from '/@/enums/pageEnum'
  // 根据不同状态 顶部提醒样式  不同
  import { useRoute, useRouter } from 'vue-router'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import OrderGoods from '/@/modules/OrderModule/component/OrderAlert/OrderGoods.vue'
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { containerConfig } from './data/PurchaseContainerData'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import ReturnRecordsModal from '/@/modules/OrderModule/component/ReturnRecordsModal/ReturnRecordsModal.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  const plainOptions = ref([])
  const visible = ref<boolean>(false)
  const go = useRouter()
  const isValet = ref('')
  const orderCompanyStoreName = ref<string>('')
  const orderCompanyName = ref('')
  const orderCompanyPhone = ref('')
  const addressName = ref('')
  const buyerId = ref('')
  const shopId = ref('')
  const addressPhone = ref('')
  const addressAddress = ref('')
  const addressDetail = ref('')
  const addressAreaCode = ref('')
  const stepStatus = ref([])
  const PaymentMethod = ref('')
  const address = ref('')
  const source = ref<any>()
  const buyerName = ref<any>('')
  let stepsList = ref<any>([])
  const route = useRoute()
  let statusName = ref<any>({})
  let goodsAmount = ref({})
  let orderProfitInfoList = ref()
  let commodityStatus = ref<any>()
  let dataSourceList = ref()
  let commodityDescription = <any>ref()
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const logisticsList = ref<any>([]) //物流
  const supportDetailList = ref<any>() //增值服务
  let totalPrice = ref<any>(0) //增值服务
  const salesDetails = ref({}) //销售详情
  const remarkList = ref<any>([])
  const periodDetails = ref([]) //账期
  const orderDetails = ref({}) //订单详情
  const productDetails = ref<any>() //产品
  const checkImg = ref<any>()
  const platformInvoice = ref<any>('')
  const isLogistics = ref<any>()
  const supportImg = ref<any>([])
  const loadTableData = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.orderSell$id({
        id: route.query?.id,
      })
      orderProfitInfoList.value = res.data.orderProfitInfoList

      if (res.data?.deliveryList.length != 0) {
        isLogistics.value = res.data?.deliveryList[0]?.deliveryType //物流
        logisticsList.value = [
          {
            deliveryType: res.data.deliveryList[0]?.deliveryType,
            company: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.deliveryCompany,
            mobile: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.deliveryMobile,
            orderNumber: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.deliveryNum,
            logisticsUrl: JSON.parse(res.data?.deliveryList[0]?.logisticsDetail)?.deliveryPic,
          },
        ]
        productDetails.value = res.data?.deliveryList[0]?.goodsDetail[0] //产品
      }
      //增值服务
      supportDetailList.value = res.data.supportDetailList
      supportDetailList.value.forEach((item) => {
        totalPrice.value += item.supportAmount
      })

      //销售详情
      salesDetails.value = res.data
      remarkList.value = res.data?.remarkList.find((item) => item.type === 1)

      //账期
      if (res.data.accountDayList != '') {
        periodDetails.value = res.data.accountDayList
      }

      //发票
      if (res.data?.invoiceList) {
        const sales = res.data?.invoiceList
          .filter((item) => item.billType === 0)
          .map((item) => {
            return item?.billUrl.split(',')
          })
        console.log(sales)
        checkImg.value = sales != '' ? sales : ''
        platformInvoice.value = res.data?.invoiceList
          .filter((item) => item.billType === 1)
          .map((item) => {
            return item.id
          })
        console.log(platformInvoice.value, ' checkImg.value')
      }

      //123
      isValet.value = res.data.isValet
      orderCompanyStoreName.value = res.data.orderCompanyStoreName
      orderCompanyName.value = res.data.orderCompanyName
      orderCompanyPhone.value = res.data.orderCompanyPhone
      buyerName.value = res.data.buyerName
      buyerId.value = res.data.buyerId
      shopId.value = res.data.shopId
      PaymentMethod.value = res.data.isCash
      address.value = res.data.orderAddress.address
      source.value = res.data.source
      //商品
      goodsAmount.value = res.data.goodsAmount

      dataSourceList.value = res.data.goodsDetail

      stepStatus.value = res.data
      addressName.value = res.data.orderAddress.name
      addressPhone.value = res.data.orderAddress.phone
      addressAddress.value = res.data.orderAddress.address
      addressDetail.value = res.data.orderAddress.addressDetail
      addressAreaCode.value = res.data.orderAddress.areaCode
      //步骤条
      stepsList.value = res.data.timeList
      console.log(res.data.status)
      //状态
      if (res.data.status === 1110) {
        statusName.value = '待付款'
      } else if (res.data.status === 1120) {
        statusName.value = '待发货'
      } else if (res.data.status === 1130) {
        statusName.value = '待收货'
      } else if (res.data.status === 1140) {
        statusName.value = '已完成'
      } else if (res.data.status === 1150) {
        statusName.value = '已取消'
      } else if (res.data.status === 1160) {
        statusName.value = '已关闭'
      }
      createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }
  const current = ref<number>(5)
  onMountedOrActivated(() => {
    loadTableData()
  })
  //跳转卖家
  const goBuyer = () => {
    go.push({
      path: '/customerModule/supplier/EmployeeManagement',
      query: {
        id: shopId.value,
        type: 'one',
      },
    })
  }
  //跳转买家
  const shopDetails = () => {
    go.push({
      path: '/customerModule/garageRouter/repairShopDetails',
      query: {
        id: buyerId.value,
        status: 1,
      },
    })
  }
  //增值服务跳转
  const addedView = (val) => {
    if (val.supportType === 32) {
      go.push({
        path: '/OrderModule/repairShopOrder/installationDetails',
        query: {
          id: val.id,
        },
      })
    } else if (val.supportType === 33) {
      go.push({
        path: '/OrderModule/repairShopOrder/recoveryDetails',
        query: {
          id: val.id,
        },
      })
    } else {
      supportImg.value = val.pic
      visible.value = true
    }
  }

  const data: any[] = [
    {
      title: '订单编号',
      key: 'id',
    },
    {
      title: '买家',
      key: 'buyerName',
    },
    {
      title: '代客下单人',
      key: '',
      content: '张木子   18000000000',
    },
    {
      title: '支付方式',
      key: 'isCash',
      content: '支付宝',
    },
    {
      title: '订单来源',
      key: '',
      content: '小程序',
    },
    {
      title: '可得积分',
      key: '',
      content: '200',
    },
    {
      title: '活动信息',
      key: 'activityDetail',
      content: 'APP首单减免8元',
    },
    {
      title: '收货地址',
      key: 'orderAddress',
      content: '张木子 18000000000 河南省郑州市金水区正商木华广场A座编码：450000',
    },
    {
      title: '卖家',
      key: 'shopName',
      content: '上海左班汽车零部件',
    },
    {
      title: '备注',
      key: 'remarkList',
      content: '备注信息',
    },
    {
      title: '发票信息',
      key: '',
    },
  ]

  //增值服务
  const incrementColumns = [
    {
      title: '服务单号',
      dataIndex: 'id',
    },
    {
      title: '服务名称',
      dataIndex: 'supportName',
      width: '280px',
    },
    {
      title: '服务金额',
      dataIndex: 'supportAmount',
    },
    {
      title: '上门时间',
      dataIndex: 'homeStartTime',
    },
    {
      title: '集师傅',
      dataIndex: 'price',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  const handleOk = () => {
    visible.value = false
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
    IdentificationCode: [],
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
    IdentificationCode: any
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
      orderId: salesDetails.value.id,
      goodsCount: formState.productCount,
      projectId: projectId.value || 0,
    })
      .then((res) => {
        console.log('数量=>', res)
        quantity.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  watch(
    () => formState.productCount,
    (val) => {
      adminHttp.Order.orderRefundCalculateAmount({
        goodsId: goodsContent.value.goodsId,
        orderId: salesDetails.value.id,
        goodsCount: formState.productCount,
        projectId: projectId.value || 0,
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
  //数量变化/v1/order/refund/calculate/

  // const changeWareHouse = (item) => {
  //   console.log(item, 'item')
  //   wareId.value = item
  //   wareAddressCode.value = wareAddress[item] //收货点contact
  //   wareAddressName.value = wareContact[item] //收货人contact
  //   wareAddressPhone.value = warePhone[item] //手机号
  //   addressCode.value = wareCode[item]
  //   console.log(wareCode[item]) //地址code
  //   console.log(wareContact[item], '收货人') //收货人
  //   console.log(warePhone[item], '手机号') //手机号
  // }

  //弹窗
  const application = async (record) => {
    console.log(record, 'record')
    // route.query?.id
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
        orderId: salesDetails.value.id,
        projectId: projectId.value || 0,
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
              goodsId: goodsContent.value.goodsId,
              amount: quantity.value,
              goodsCount: formState.productCount,
              engineNoList: formState.IdentificationCode,
            },
          ],
          isRefundOnly: formState.isRefundOnlyValue,
          source: 4,
          shopId: shopId.value,
          shopPlatformCode: salesDetails.value.shopPlatformCode,
          orderId: salesDetails.value.id,
          reason: formState.orderReason,
          refundPic: fileUrl.value.toString() || '',
          whetherReceiptGoods: formState.whetherReceiptGoods,
          remark: formState.receiptRemark,
        }
        adminHttp.Order.orderRefundCreateFeFundApply(map)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            afterSales.value = false
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
  //原因
  const changeReason = (item) => {
    console.log(item)
    formState.orderReason = item
  }
  //取消
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
    idList: [],
  })
  const seeDetails = (record) => {
    recordsModal.visible = true
    recordsModal.goodsName = record.goodsName
    recordsModal.goodsCount = record.goodsCount
    recordsModal.idList = record.refundIdList.map((item) => {
      return item.id
    })
    console.log(record.refundIdList)
  }
  //发票
  const commodityInvoice = ref(false)
  const commodityDetails = () => {
    commodityInvoice.value = true
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
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;

    .page-step {
      padding: 30px 30px 15px 30px;
      background: #fff;
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

  .footer {
    display: flex;
    justify-content: flex-end;
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
  ::v-deep(.ant-descriptions-item-content) {
    width: 300px !important;
  }
</style>
