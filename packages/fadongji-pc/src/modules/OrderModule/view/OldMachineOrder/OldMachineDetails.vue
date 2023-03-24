<template>
  <div class="bg-white m-24px p-24px">
    <div class="page-step p-12px">
      <OrderSteps :stepsList="stepsList" :status="orderInfo.status"></OrderSteps>
    </div>
    <div class="page-table">
      <OrderAlert :statusName="orderInfo.statusName">
        <template #description>
          <span v-if="orderInfo.status === 1350">取消原因:{{ orderInfo.lastRemark }}</span>
          <span v-if="orderInfo.status === 1360">关闭原因:{{ orderInfo.lastRemark }}</span>
        </template>

      </OrderAlert>
      <div class="basic-data pb-10 pt-16px">
        <div class="template--title mb-20px">基本信息</div>
        <div>
          <div v-if="orderInfo">
            <ADescriptions
              :column="3"
              bordered
              layout="vertical"
              :data="orderInfo"
              :schema="getBaseData(orderInfo.status)"
            >
              <ADescriptionsItem
                v-for="(item, index) of getBaseData(orderInfo.status)"
                :label="item.title"
              >
                <template v-if="item.key == 'buyerName'">
                  <AButton type="link" @click="goBuyer()">{{ orderInfo.buyerName }}</AButton>
                </template>
                <template v-else-if="item.key == 'deliveryId'">
                  <span v-if="orderInfo.deliveryList.length > 0">{{
                    orderInfo.deliveryList[0].id
                  }}</span>
                </template>
                <template v-else-if="item.title == '支付方式'">
                  <span>{{ orderInfo.payType }}</span>
                </template>
                <template v-else-if="item.key == 'orderAddress'">
                  <span>{{ orderAddress.name }}</span>
                  <span>&nbsp;&nbsp;{{ orderAddress.phone }}</span>
                  <div>{{ orderAddress.address }}{{ orderAddress.addressDetail }}</div>
                  <div><span>编码：</span>{{ orderAddress.areaCode }} </div>
                </template>
                <template v-else-if="item.title == '订单来源'">
                  <span>{{ sourceList[orderInfo.source - 1] }}</span>
                </template>
                <template v-else-if="item.title == '卖家'">
                  <span>{{ orderInfo.shopName }}</span>
                </template>
                <template v-else-if="item.key == 'remarkList'">
                  <div v-for="(item, index) of orderInfo.remarkList" :key="index + 'remark'">
                    {{ item.remark }}
                  </div>
                </template>
                <template v-else>
                  {{ orderInfo[item.key] }}
                </template>
              </ADescriptionsItem>
            </ADescriptions>
          </div>
        </div>
      </div>
      <div class="profit-data pb-32px" v-if="orderInfo.status == 1330 || orderInfo.status == 1340">
        <div class="template--title mb-20px">物流信息</div>
        <div>
          <ATable
            :dataSource="orderInfo.deliveryList"
            :columns="logisticsColumn"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex == 'goodsDetail'">
                <div v-for="(item, index) of record.goodsDetail" :key="index + 'detail'">
                  <span v-if="item.level"
                    >{{ item.level }}<a-divider style="border-color: #999" type="vertical" />
                  </span>
                  {{ item.goodsName }}
                </div>
              </template>
              <template v-if="column.dataIndex == 'goodsName'">
                <div :width="50" :height="50" v-if="record.logisticsDetail">{{
                  record.logisticsDetail.deliveryCompany
                }}</div>
                <div v-else>--</div>
              </template>
              <template v-if="column.dataIndex == 'payPrice'">
                <div :width="50" :height="50" v-if="record.logisticsDetail">{{
                  record.logisticsDetail.deliveryMobile
                }}</div>
                <div v-else>--</div>
              </template>
              <template v-if="column.dataIndex == 'deliveryNum'">
                <div :width="50" :height="50" v-if="record.logisticsDetail">{{
                  record.logisticsDetail.deliveryNum
                }}</div>
                <div v-else>--</div>
              </template>
              <template v-if="column.dataIndex == 'credentials'">
                <a-image
                  :width="50"
                  :height="50"
                  v-if="record.logisticsDetail && record.logisticsDetail.deliveryPic"
                  :src="record.logisticsDetail.deliveryPic"
                />
                <div v-else>--</div>
              </template>
            </template>
          </ATable>
        </div>
      </div>
      <div class="profit-data pb-32px">
        <div class="template--title mb-20px">商品信息</div>
        <div>
          <ATable
            :dataSource="orderInfo.goodsDetail"
            :columns="orderInfo.statusName == '待付款' ? payMentColumn : goodsColumn"
            bordered
            :pagination="false"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex == 'goodsName'">
                <span v-if="record.level"
                  >{{ record.level }}类<a-divider style="border-color: #999" type="vertical" />
                </span>
                {{ record.goodsName }}
              </template>
            </template>
            <template #footer>
              <div class="font-weight-700"
                >合计：<span class="text-red-500">{{ orderInfo.goodsAmount }}元</span></div
              >
            </template>
          </ATable>
        </div>
      </div>
      <div
        class="profit-data pb-32px"
        v-if="orderInfo.orderProfitInfoList && orderInfo.orderProfitInfoList.length > 0"
      >
        <div class="template--title mb-20px">分润信息</div>
        <div>
          <ATable
            :dataSource="profitSharingMockData"
            :columns="serviceProviderProfitSharing"
            bordered
            :pagination="false"
          >
          </ATable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  //exclamationCircleOutlined
  import { createFromIconfontCN, ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import OrderSteps from '/@/modules/OrderModule/component/OrderSteps/OrderSteps.vue'
  import OrderAlert from '/@/modules/OrderModule/component/OrderAlert/OrderAlert.vue'
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  import { getBaseData, goodsColumn, logisticsColumn, payMentColumn } from './data/OldAssignData'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // 公共参数
  const go = useRouter()
  const route = useRoute()
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  const orderInfo = ref({}) // 订单详情信息
  const orderAddress = ref({}) // 订单地址
  const sourceList = ref(['安卓', 'IOS', 'H5', 'PC', '小程序', '公众号']) // 订单来源的状态
  const profitSharingMockData = ref([]) // 分润信息
  // const serviceProviderProfitSharing = ref()
  let stepsList = ref([]) // 时间戳步骤条
  let orderProfitInfoList = ref([])
  let commodityDescription = <any>ref()

  // 买家
  const goBuyer = () => {
    go.push({
      path: '/customerModule/OldMachineBuyers/OldMachineBuyersDetail',
      query: { id: orderInfo.value.buyerId },
    })
  }

  const loadTableData = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.ORDER.orderOldBy$id({
        id: route.query?.id,
      })
      orderInfo.value = res.data
      orderAddress.value = res.data.orderAddress
      orderProfitInfoList.value = res.data.orderProfitInfoList
      //分润
      // let fenrunColumns: any = []
      // let fenrunItem: any = {}
      // fenrunColumns = res.data.orderProfitInfoList.map(({ key, keyName, value, amount }) => {
      //   fenrunItem[key] = value || amount
      //   return {
      //     title: keyName,
      //     dataIndex: key,
      //     key: key,
      //     align: 'center',
      //   }
      // })
      // serviceProviderProfitSharing.value = fenrunColumns
      profitSharingMockData.value = [{
        id:res.data.orderProfitTotal
      }
      ]
      //步骤条
      stepsList.value = res.data.timeList
      //状态
      if (res.data.status === 1110) {
        commodityDescription.value = res.data.nextStageTime
      }
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }
  onMountedOrActivated(() => {
    loadTableData()
  })

  let tableData = ref([])
  //查询日志/v1/order/refund/query/operatelog
  const tabColumns = async () => {
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
  //增值服务
  const serviceProviderProfitSharing = [
    {
      title: '平台服务费',
      dataIndex: 'id',
    },
  ]
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
  .labelStyle {
    max-width: 120px;
  }
  .contentStyle {
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
</style>
