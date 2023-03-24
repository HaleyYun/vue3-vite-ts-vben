<template>
  <div>
    <div class="page-wrap">
    <div class="bg-blue-100 h-8 w-full mb-2">
      <span class="leading-7 text-lg ml-2">订单详情</span>
    </div>
    <div class="page-table">
      <div class="payment-Status pb-5">
        <div>
          <GoodsAlert :message="commodityStatus" :error="commodity" />
        </div>
      </div>
      <div class="product-data pb-20">
        <div class="product-title pb-5 text-xl"
          ><IconFont type="icon-morenbiaozhi" class="pr-2" />商品信息</div
        >
        <!-- <p>{{ options }}</p> -->
        <div>
          <ATable :dataSource="refundGoods" :columns="columns" bordered :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'payPrice'">
                {{ payPrice }}*{{ goodsCount }}
              </template>
              <template v-if="column.dataIndex === 'increment'">
                <span v-if="payment === 1">微信</span>
                <span v-if="payment === 11">支付宝</span>
                <span v-if="payment === 51">银联</span>
              </template>
            </template>
            <template #title>
              <div>退款商品</div>
            </template>
          </ATable>
        </div>
      </div>
      <div class="order-data pb-50">
        <ATabs v-model:activeKey="activeKey" type="card" @tabClick="tabColumns">
          <ATabPane key="one" tab="订单信息">
            <!-- 仅退款待审核 -->
            <template v-if="statusName === 2110 && isRefundOnly === true">
              <table class="edit-table pb-20">
                <tr v-for="item in orderRefund.basisData" :key="index">
                  <td class="edit-table-title">{{ item.title }}</td>
                  <template v-if="item.title == '状态'">
                    <td class="leading-13" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13" v-if="statusName === 2120">待发货</td>
                    <td class="leading-13" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title == '退款金额'">
                    <td class="leading-13">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title == '确认退款金额'">
                    <td> <AInput prefix="￥" v-model:value="money" /></td>
                  </template>
                  <template v-else-if="item.title == '退换货类型'">
                    <td class="leading-13">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title == '退款方式'">
                    <td class="leading-13"> 退回到原支付渠道 </td>
                  </template>
                  <template v-else-if="item.title == '处理备注'">
                    <td class="leading-13"> <AInput v-model:value="remarks" /> </td>
                  </template>
                  <template v-else-if="item.title == '凭证照片'">
                    <td class="leading-13">
                      <FileUrlPrase :file-url="refundPic" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content">{{ serviceList[item.key] }} </td>
                </tr>
              </table>
            </template>
            <!-- 仅退款待退款 -->
            <template v-else-if="statusName === 2130 && isRefundOnly === true">
              <table class="edit-table pb-20">
                <tr v-for="item in orderRefund.ReturnOnlyRefund" :key="index">
                  <td class="edit-table-title">{{ item.title }}</td>
                  <template v-if="item.title == '状态'">
                    <td class="leading-13" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13" v-if="statusName === 2120">待发货</td>
                    <td class="leading-13" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title == '退款金额'">
                    <td class="leading-13">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title == '确认退款金额'">
                    <td> <AInput disabled prefix="￥" v-model:value="money" /></td>
                  </template>
                  <template v-else-if="item.title == '退换货类型'">
                    <td class="leading-13">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title == '退款方式'">
                    <td class="leading-13"> 退回到原支付渠道 </td>
                  </template>
                  <template v-else-if="item.title == '处理备注'">
                    <td class="leading-13"> <AInput disabled v-model:value="remarks" /> </td>
                  </template>
                  <template v-else-if="item.title == '凭证照片'">
                    <td class="leading-13">
                      <FileUrlPrase :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title == '退款支付途径'">
                    <td class="leading-13">
                      <span v-if="payment === 1">微信</span>
                      <span v-if="payment === 11">支付宝</span>
                      <span v-if="payment === 51">银联</span>
                    </td>
                  </template>
                  <td v-else class="edit-table-content">{{ serviceList[item.key] }} </td>
                </tr>
              </table>
            </template>
            <!-- 仅退款已完成 -->
            <template v-else-if="statusName === 2150 && isRefundOnly === true">
              <table class="edit-table pb-20">
                <tr v-for="item in orderRefund.OnlyRefundCompleted" :key="index">
                  <td class="edit-table-title">{{ item.title }}</td>
                  <template v-if="item.title == '状态'">
                    <td class="leading-13" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13" v-if="statusName === 2120">待发货</td>
                    <td class="leading-13" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title == '退款金额'">
                    <td class="leading-13">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title == '确认退款金额'">
                    <td> <AInput disabled prefix="￥" v-model:value="money" /></td>
                  </template>
                  <template v-else-if="item.title == '退换货类型'">
                    <td class="leading-13">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title == '退款方式'">
                    <td class="leading-13"> 退回到原支付渠道 </td>
                  </template>
                  <template v-else-if="item.title == '处理备注'">
                    <td class="leading-13"> <AInput disabled v-model:value="remarks" /> </td>
                  </template>
                  <template v-else-if="item.title == '凭证照片'">
                    <td class="leading-13">
                      <FileUrlPrase :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title == '退款支付途径'">
                    <td class="leading-13">
                      <span v-if="payment === 1">微信</span>
                      <span v-if="payment === 11">支付宝</span>
                      <span v-if="payment === 51">银联</span>
                    </td>
                  </template>
                  <td v-else class="edit-table-content">{{ serviceList[item.key] }} </td>
                </tr>
              </table>
            </template>
            <!-- 仅退款已关闭 -->
            <template v-else-if="statusName === 2160 && isRefundOnly === true">
              <table class="edit-table pb-20">
                <tr v-for="item in orderRefund.RefundOnlyClosed" :key="index">
                  <td class="edit-table-title">{{ item.title }}</td>
                  <template v-if="item.title == '状态'">
                    <td class="leading-13" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13" v-if="statusName === 2120">待发货</td>
                    <td class="leading-13" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title == '退款金额'">
                    <td class="leading-13">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title == '确认退款金额'">
                    <td> <AInput disabled prefix="￥" v-model:value="money" /></td>
                  </template>
                  <template v-else-if="item.title == '退换货类型'">
                    <td class="leading-13">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title == '退款方式'">
                    <td class="leading-13"> 退回到原支付渠道 </td>
                  </template>
                  <template v-else-if="item.title == '处理备注'">
                    <td class="leading-13"> <AInput disabled v-model:value="remarks" /> </td>
                  </template>
                  <template v-else-if="item.title == '凭证照片'">
                    <td class="leading-13">
                      <FileUrlPrase :file-url="refundPic" />
                    </td>
                  </template>

                  <td v-else class="edit-table-content">{{ serviceList[item.key] }} </td>
                </tr>
              </table>
            </template>
            <template v-else>
              <table class="edit-table pb-20">
                <tr v-for="item in orderRefund.basisData" :key="index">
                  <td class="edit-table-title">{{ item.title }}</td>
                  <template v-if="item.title == '状态'">
                    <td class="leading-13" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13" v-if="statusName === 2120">待发货</td>
                    <td class="leading-13" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title == '退款金额'">
                    <td class="leading-13">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title == '确认退款金额'">
                    <td> <AInput disabled prefix="￥" v-model:value="money" /></td>
                  </template>
                  <template v-else-if="item.title == '退换货类型'">
                    <td class="leading-13">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title == '退款方式'">
                    <td class="leading-13"> 退回到原支付渠道 </td>
                  </template>
                  <template v-else-if="item.title == '处理备注'">
                    <td class="leading-13"> <AInput disabled v-model:value="remarks" /> </td>
                  </template>
                  <template v-else-if="item.title == '凭证照片'">
                    <td class="leading-13">
                      <FileUrlPrase :file-url="refundPic" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content">{{ serviceList[item.key] }} </td>
                </tr>
              </table>
            </template>
          </ATabPane>
          <ATabPane key="two" tab="处理记录">
            <div>
              <ATable :dataSource="tableData" :columns="handleColumns" bordered :pagination="false">
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
          </ATabPane>
        </ATabs>
        <div class="handle-btn">
          <template v-if="statusName === 2110">
            <AButton type="primary" class="margin-r-30" @click="approved()">审核通过</AButton>
            <AButton type="primary" danger ghost class="margin-r-20" @click="auditFailed()"
              >审核不通过</AButton
            >
          </template>
          <template v-else-if="statusName === 2160">
            <AButton type="primary" danger ghost class="margin-r-20" @click="application()"
              >修改申请</AButton
            >
          </template>
        </div>
      </div>
    </div>
  </div>
  <AModal
    width="1000px"
    v-model:visible="afterSales.visible"
    title="申请售后"
    centered
    destroy-on-close
    @ok="salesCancel"
    @cancel="salesConfirmation"
  >
    <!-- goodsPic: res.data.refundGoods.pic, -->
    <div class="flex">
      <div class="p-10 m-l-10 flex-1">
        <div class="gondsImg"> <img :src="goodsPic" alt="商品图片" /></div>
        <div><span>订单编号：</span>{{ orderId }}</div>
        <div class="goodsTitle"><span>商品名称：</span>{{ orderGoodsName }}</div>
      </div>

      <div class="p-10 flex-2">
        <AForm
          layout="horizontal"
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 12 }"
          autocomplete="off"
        >
          <AFormItem label="售后类型" name="afterGoods">
            <!-- @focus="focus" -->
            <a-select
              ref="select"
              v-model:value="isRefundOnlyValue"
              :options="afterType"
              @change="isRefundOnlyChange"
              placeholder="请选择售后类型"
            />
          </AFormItem>
          <AFormItem label="是否已收到货" name="whetherReceiptGoods">
            <a-select
              ref="select"
              v-model:value="whetherReceiptGoods"
              :options="receiptType"
              @change="receiptGoodsChange"
              placeholder="请选择"
            />
          </AFormItem>
          <AFormItem label="售后原因" name="createdTime">
            <a-select
              ref="select"
              v-model:value="warehouseValue"
              @change="change"
              placeholder="请选择售后原因"
            />
          </AFormItem>
          <AFormItem label="产品数量" name="createdTime">
            <a-input-number
              id="inputNumber"
              v-model:value="productCount"
              :min="1"
              @change="countChange"
            />
          </AFormItem>
          <AFormItem label="详细描述" name="receiptRemark">
            <a-textarea v-model:value="receiptRemark" placeholder="Basic usage" :rows="4" />
          </AFormItem>
          <AFormItem label="上传凭证" name="createdTime">
            <a-select
              ref="select"
              v-model:value="warehouseValue"
              @change="change"
              placeholder="请选择产品数量"
            />
          </AFormItem>
          <AFormItem label="退款金额" name="createdTime">
            <AInput disabled v-model:value="amount" />
          </AFormItem>
        </AForm>
      </div>
    </div>
  </AModal>
  </div>
</template>

<script setup lang="ts">
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { ref, onBeforeMount, reactive } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import type { SelectProps } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import GoodsAlert from '/@/modules/GoodsModule/GoodsManage/component/GoodsAlert.vue'
  import { orderRefund } from '/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/data/ReturnRefund'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import type { FormInstance } from 'ant-design-vue'
  import { useRoute } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const { createMessage } = useMessage()

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })

  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  onMountedOrActivated(() => {
    loadTableData()
  })
  let oriOrderId = <any>ref('')
  let orderGoodsName = <any>ref('')
  let goodsPic = <any>ref('')
  const options = ref<SelectProps['options']>([])
  let refundPic = <any>ref('')
  let money = <any>ref('')
  let remarks = <any>ref('')
  let amount = <any>ref('')
  let goodId = <any>ref('')
  let commodityStatus = <any>ref('')
  let commodity = <any>ref({})
  let commodityDescription = <any>ref()
  let statusName = <any>ref({})
  let refundGoods = <any>ref()
  let payPrice = <any>ref({})
  let goodsCount = <any>ref({})
  let serviceList = <any>ref({})
  let payment = <any>ref('')
  let orderId = <any>ref('')
  let isRefundOnly = <any>ref('')
  const refundOnly = <any>ref()
  const value = <any>ref()
  let reason = <any>ref({})

  let shopId = <any>ref('')
  let shopPlatformCode = <any>ref('')
  const formRef = ref<FormInstance>()
  interface FormState {
    warehouseAddress: any
    createdTime: any
    warehouseName: any
    modifyTime: any
  }
  const formState = reactive<FormState>({
    warehouseAddress: '',
    createdTime: '',
    warehouseName: '',
    modifyTime: '',
  })
  //退换货//v1/order/refund/detail
  const loadOperatelog = async () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    await adminHttp.Order.orderRefundQueryOperatelog({
      orderId: orderId,
    })
      .then((res) => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        console.log(res, 'vue')

        // item.status = 1
        loadTableData()
        loadOperatelog()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  let tableData = ref([])
  //查询日志/v1/order/refund/query/operatelog
  const tabColumns = async () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    const data = await adminHttp.Order.orderRefundQueryOperatelog({
      orderId: route.query?.id,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })

    tableData.value = data

    console.log(data, 'res.data')
  }

  const loadTableData = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.Order.orderRefundDetail({
        id: route.query?.id,
      })
      // baiyun.value = res.data
      // remarks.value = res.data.refundInformation.remark
      oriOrderId.value = res.data.refundInformation.oriOrderId
      shopId.value = res.data.refundGoods.shopId
      shopPlatformCode.value = res.data.refundGoods.shopPlatformCode
      refundOnly.value = res.data.refundInformation.isRefundOnly
      money.value = res.data.refundInformation.amount
      amount.value = res.data.refundInformation.amount
      payment.value = res.data.refundInformation.payType
      goodId.value = res.data.refundGoods.goodsId
      //服务
      goodsPic.value = res.data.refundGoods.pic
      refundPic.value = res.data.refundInformation.refundPic
      serviceList.value = res.data.refundInformation
      //订单id isRefundOnly
      orderId.value = res.data.refundInformation.id
      isRefundOnly.value = res.data.refundInformation.isRefundOnly
      reason.value = res.data.refundInformation.reason
      orderGoodsName.value = res.data.refundGoods.goodsName
      //商品
      payPrice.value = res.data.refundGoods.payPrice
      goodsCount.value = res.data.refundGoods.goodsCount
      refundGoods.value = [
        {
          goodsId: res.data.refundGoods.goodsId,
          shopName: res.data.refundGoods.shopName,
          goodsName: res.data.refundGoods.goodsName,
          warehouseName: res.data.refundGoods.warehouseName,
          goodsCount: res.data.refundGoods.goodsCount,
          amount: res.data.refundGoods.amount,
        },
      ]

      //状态
      statusName.value = res.data.refundInformation.status
      if (statusName.value === 2110) {
        commodityStatus.value = '当前订单状态：待审核'
        commodity.value = 'error'
        // commodityDescription.value = ''
      } else if (statusName.value === 2120) {
        commodityStatus.value = '当前订单状态：待发货'
        commodity.value = 'success'
      } else if (statusName.value === 2140) {
        commodityStatus.value = '当前订单状态：待签收'
        commodity.value = 'success'
      } else if (statusName.value === 2130) {
        commodityStatus.value = '当前订单状态：待退款'
        commodity.value = 'success'
      } else if (statusName.value === 2150) {
        commodityStatus.value = '当前订单商品状态：已完成'
        commodity.value = 'error'
      } else if (statusName.value === 2160) {
        commodityStatus.value = '当前订单商品状态：已关闭'
        commodity.value = 'error'
      }
      createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
      console.log('1111')

      wareHouse()
      console.log('2222')
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }
  //仓库获取/v1/order/refund/query/warehouses
  const wareHouse = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Order.orderRefundQueryWarehouses({
      companyId: shopId.value,
      platformCode: shopPlatformCode.value,
    })
      .then((res) => {
        console.log(res, 'wwwww')

        // options.value = res.data
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        // loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //审核通过/v1/order/refund/audit
  const approved = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Order.orderRefundAudit({
      cause: reason.value,
      isRefundOnly: isRefundOnly.value,
      orderId: orderId.value,
      status: 2,
      goodsId: goodId.value,
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //取消
  const salesCancel = () => {
    afterSales.visible = false
    formState.warehouseAddress = ''
  }
  //确定
  const salesConfirmation = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        let map = {
          // id: companyId.value,
          warehouseId: warehouseId.value,
          arrivalTime: formState.createdTime,
          areaCode: [areaCode.value],
        }
        adminHttp.Store.warehousePrescription(map)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
            afterSales.visible = false
            formState.warehouseAddress = ''
            formState.createdTime = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
  }
  //修改售后
  const afterSales = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',

    currentId: '',
  })
  //修改申请
  const application = () => {
    afterSales.visible = true
  }
  //审核不通过
  const auditFailed = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })

    const auditMap = {
      cause: reason.value,
      isRefundOnly: isRefundOnly.value,
      orderId: orderId.value,
      status: 3,
      goodsId: goodId.value,
    }
    adminHttp.Order.orderRefundAudit(auditMap)
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  const activeKey = ref('one')
  const basisData = [
    {
      title: '服务单号',
      key: 'id',
    },
    {
      title: '状态',
      key: 'status',
    },
    {
      title: '关联订单编号',
      key: 'oriOrderId',
    },
    {
      title: '申请时间',
      key: 'createTime',
    },
    {
      title: '用户账号',
      key: 'userName',
    },
    {
      title: '联系人',
      key: 'name',
    },
    {
      title: '退换货类型',
      key: 'isRefundOnly',
    },
    {
      title: '退款原因',
      key: 'reason',
    },
    {
      title: '描述',
      key: 'remark',
    },
    {
      title: '凭证照片',
      key: 'refundPic',
    },
    {
      title: '退款金额',
      key: 'amount',
    },
    {
      title: '确认退款金额',
      key: 'amount',
    },
    {
      title: '退款方式',
      key: 'status',
    },
    {
      title: '收货点',
      key: 'status',
    },
    {
      title: '收货人姓名',
      key: 'status',
    },
    {
      title: '收货地址',
      key: 'status',
    },
    {
      title: '联系电话',
      key: 'status',
    },
    {
      title: '处理备注',
      key: 'status',
    },
  ]

  const handleDataSource = [
    {
      key: '1',
      name: '管理员',
      age: '2021-09-12 12:00:00',
      one: '拒绝退货申请',
      two: '已拒绝',
      price: '拒绝原因展示',
      three: '7800元',
      increment: '支付宝',
      address: '3',
    },
  ]
  //   createTime: "2022-06-27 14:34:29"
  // creatorName: ""
  // remark: null
  // status: 2110
  // statusEvent: null
  const handleColumns = [
    {
      title: '操作者',
      dataIndex: 'creatorName',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      width: '280px',
    },
    {
      title: '操作项',
      dataIndex: 'statusEvent',
    },
    {
      title: '退货状态',
      dataIndex: 'statused',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ]
  const columns = [
    {
      title: '商品id',
      dataIndex: 'goodsId',
    },
    {
      title: '卖家',
      dataIndex: 'shopName',
      width: '280px',
    },
    {
      title: '商品信息',
      dataIndex: 'goodsName',
    },
    {
      title: '销售价格*数量',
      dataIndex: 'payPrice',
    },
    {
      title: '发货仓',
      dataIndex: 'warehouseName',
    },
    {
      title: '支付方式',
      dataIndex: 'increment',
    },
    {
      title: '退款数量',
      dataIndex: 'goodsCount',
    },
    {
      title: '小计',
      dataIndex: 'amount',
    },
  ]
  //是否退货退款
  const isRefundOnlyChange = (value) => {
    console.log(value, 'iiii')
  }
  //是否到货
  const receiptGoodsChange = (value) => {
    console.log(value, 'aaaa')
  }
  //数量变化/v1/order/refund/calculate/
  const countChange = (value) => {
    console.log(value, 'kiioi')
    adminHttp.Order.orderRefundCalculateAmount({
      goodsId: goodId.value,
      orderId: oriOrderId.value,
      goodsCount: value,
    })
      .then((res) => {
        console.log('数量=>', res)
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
</script>

<style lang="less" scoped>
  .page-wrap {
    margin: 10px;

    .page-table {
      padding: 10px;
      background: #fff;

      .payment-Status {
        // display: flex;
        background-color: #fff;
      }
      .handle-btn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        width: 100vw;
        bottom: 10px;
        left: 0;
        height: 40px;
      }
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
  }
  .gondsImg {
    display: flex;
    width: 200px;
    height: 200px;
  }
  .goodsTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
