<template>
  <div>
    <div class="page-wrap p-24px m-24px mb-82px">
      <div v-if="detailInfo" class="page-left" :class="{ toggle: menuSetting.collapsed }">
        <a-anchor :offsetTop="87" :target-offset="targetOffset" @click="tabClick">
          <a-anchor-link href="#seller-list" title="卖家信息" />
          <a-anchor-link href="#goods-list" title="商品信息">
            <a-anchor-link href="#goods-list" title="商品信息" />
            <a-anchor-link href="#sale-list" title="销售信息" />
            <a-anchor-link href="#goodsProfitSharing" title="商品分润" />
            <a-anchor-link href="#warehouseOperationFee" title="仓库运营费用" />
            <a-anchor-link href="#warehouseInfo" title="仓库信息" />
            <a-anchor-link href="#param" title="参数属性" />
            <a-anchor-link href="#applicableModels" title="适配车型" />
            <a-anchor-link href="#service" title="服务保障" />
            <a-anchor-link href="#picture" title="商品头图" />
            <a-anchor-link href="#details" title="图文介绍" />
          </a-anchor-link>
          <a-anchor-link href="#investment-list" title="投资信息" />
        </a-anchor>
      </div>
      <div v-if="detailInfo" class="page-right pl-24px" id="container">
        <!-- 抬头提醒 -->
        <section id="all">
          <GoodsAlert
            :message="commodityStatus"
            :description="commodityDescription"
            :error="commodity"
          >
            <template #description>
              <div v-if="!brandStatus"
                >商品中使用的品牌尚未通过审核,请先
                <AButton type="link" @click="toAudit">去审核</AButton>
                品牌申请
              </div>
            </template>
            <template #options>
              <div>
                <AButton @click="operation">查看操作记录</AButton>
              </div>
            </template>
          </GoodsAlert>
        </section>
        <section>
          <div id="seller-list">
            <div class="border-assets">
              <div class="template--title mt-20px mb-15px">卖家信息</div>
              <div>
                <ATable
                  :columns="serviceProviderDetailsBasicInfoColumn"
                  :loading="tableLoading"
                  :dataSource="serviceDetailsData"
                  size="small"
                  :pagination="false"
                  bordered
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'shopName'">
                      <div>{{ record.shopName }}</div>
                      <div>{{ shopMobile }}</div>
                    </template>
                    <!--submitterName-->
                    <template v-if="column.dataIndex === 'submitterName'">
                      <div>{{ record.submitterName }}</div>
                      <div>{{ record.submitterMobile }}</div>
                    </template>
                  </template>
                </ATable>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div id="goods-list">
            <div class="border-assets">
              <div>
                <!--商品信息-->
                <div class="template--title mt-30px mb-15px">商品信息</div>
                <div class="border-assets">
                  <Description
                    size="middle"
                    :bordered="true"
                    :column="2"
                    :data="personData"
                    :schema="personSchema"
                  />
                </div>
                <!-- 销售信息 -->
                <div id="sale-list" class="template--title mt-30px mb-15px">销售信息</div>
                <div>
                  <ATable
                    :dataSource="serviceSaleColumn"
                    :columns="serviceProviderDetailsSaleColumn"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.dataIndex == 'accountPrice'">
                        <div v-if="record.accountPrice != 0 && record.accountPeriodDays != 0">
                          {{ record.accountPeriodDays }}天账期 {{ record.accountPrice }}元
                        </div>
                        <div v-else>--</div>
                      </template>
                      <template v-if="column.dataIndex === 'salesTerritory'">
                        <AButton type="link" @click="salesArea()">查看详情</AButton>
                      </template>
                    </template>
                  </ATable>
                </div>
                <div class="pt-20px flex" v-if="!route.query.violationStatus">
                  <div class="text-lg text-black bold">商品标签:</div>
                  <div class="px-20px pt-5px flex">
                    <!-- <a-tag color="#33FF99">爆款</a-tag> filterTags-->
                    <div v-for="(item, index) in hotData" :key="index">
                      <a-checkable-tag
                        v-model:checked="item.active"
                        @change="switchTags(item)"
                        :color="item.active ? '#33FF99' : ''"
                      >
                        {{
                          item.key == 1003 ? `${warrantyDays}个月${item.value}` : item.value
                        }}</a-checkable-tag
                      >
                    </div>
                  </div>
                </div>
                <!--商品分润-->
                <div id="goodsProfitSharing" class="template--title mt-30px mb-15px">商品分润</div>
                <div>
                  <template v-if="goodsStatus == 2 && violtionStatus == 3">
                    <AButton class="float-right" type="link" />
                  </template>
                  <template v-else>
                    <div>
                      <div v-if="switchCost">
                        <AButton class="float-right" type="link" @click="switchCost = false"
                          >取消
                        </AButton>
                        <AButton
                          class="float-right"
                          type="link"
                          @click="preservationCost('switchCost')"
                          >保存
                        </AButton>
                      </div>
                      <AButton v-else class="float-right" type="link" @click="editCost()">
                        <template
                          v-if="(goodsStatus === 2 && violtionStatus === 3) || goodsStatus === 3"
                        >
                        </template>
                        <template v-else> 编辑 </template>
                      </AButton>
                    </div>
                  </template>
                </div>
                <div>
                  <ATable
                    v-if="profitSharingMockData.length && serviceProviderProfitSharing.length"
                    :dataSource="profitSharingMockData"
                    :columns="serviceProviderProfitSharing"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, record }">
                      <template
                        v-if="
                          (switchCost || (goodsStatus == 2 && violtionStatus == 3)) &&
                          serviceProviderProfitSharingKey.includes(column.key)
                        "
                      >
                        <div class="flex justify-between items-center">
                          <a-input-number
                            style="width: 100%"
                            :precision="2"
                            :min="0"
                            :max="999999999"
                            v-model:value="inputForm[column.key]"
                            @blur="tableInputChange"
                          />
                          <div class="ml-5px">元</div>
                        </div>
                      </template>
                      <template v-else>
                        {{ record[column.key] != null ? record[column.key] : '--' }}元
                      </template>
                    </template>
                  </ATable>
                </div>
                <!--仓库运营费用-->
                <div id="warehouseOperationFee" class="template--title mt-30px mb-15px"
                  >仓库运营费用
                </div>
                <div>
                  <template v-if="goodsStatus == 2 && violtionStatus == 3">
                    <AButton class="float-right" type="link" />
                  </template>
                  <template v-else>
                    <div>
                      <div v-if="switchWarehouse">
                        <AButton class="float-right" type="link" @click="switchWarehouse = false"
                          >取消
                        </AButton>
                        <AButton
                          class="float-right"
                          type="link"
                          @click="preservationCost('switchWarehouse')"
                          >保存
                        </AButton>
                      </div>
                      <AButton v-else class="float-right" type="link" @click="editWarehouse()">
                        <template
                          v-if="(goodsStatus === 2 && violtionStatus === 3) || goodsStatus === 3"
                        >
                        </template>
                        <template v-else> 编辑 </template>
                      </AButton>
                    </div>
                  </template>
                </div>
                <div>
                  <ATable
                    v-if="warehouseData.length && warehouseExpenses.length"
                    :dataSource="warehouseData"
                    :columns="warehouseExpenses"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, record }">
                      <template
                        v-if="
                          (switchWarehouse || (goodsStatus == 2 && violtionStatus == 3)) &&
                          warehouseExpensesKey.includes(column.key)
                        "
                      >
                        <div class="flex justify-between items-center">
                          <a-input-number
                            style="width: 100%"
                            :precision="2"
                            :min="0"
                            :max="999999999"
                            v-model:value="warehouseForm[column.key]"
                            @blur="tableInputChange"
                          />
                          <div class="ml-5px">元</div>
                        </div>
                      </template>
                      <template v-else>
                        {{ record[column.key] != null ? record[column.key] : '--' }}元
                      </template>
                    </template>
                  </ATable>
                </div>
                <!--仓储信息-->
                <div id="warehouseInfo" class="template--title mt-30px mb-15px">仓储信息</div>
                <div>
                  <ATable
                    :dataSource="storageInformation"
                    :columns="serviceProviderWarehouseInformationColumn"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.dataIndex === 'isCoding'">
                        <span v-if="record.isCoding" class="ant-system__red">√</span>
                        <span v-else>×</span>
                      </template>
                      <template v-if="column.dataIndex === 'expected'">
                        <div>{{ record.expectedCashPrice }}元</div>
                        <div v-if="detailInfo.accountPeriodDays > 0 && record.expectedAccountPrice">
                          账期{{ record.expectedAccountPrice }}元
                        </div>
                      </template>
                      <template v-if="column.dataIndex === 'deliverySpeed'">
                        <a-button type="link" @click="deliveryTime(record)">查看详情</a-button>
                      </template>
                      <template v-if="column.dataIndex === 'assetsSpeed'">
                        <a-button type="link" @click="matchTime(record)">查看详情</a-button>
                      </template>
                      <template v-if="column.dataIndex === 'number'">
                        <template v-if="route.query.role === 'supplier'">
                          <a v-if="record.number" @click="showAvailable(record)">
                            {{ record.number }}
                          </a>
                          <span v-else>--</span>
                        </template>
                        <template v-else-if="route.query.code === '1'">
                          <a v-if="record.number" @click="showNumber(record)">
                            {{ record.number }}</a
                          >
                          <span v-else>--</span>
                        </template>
                        <template v-else>
                          <a v-if="record.number" @click="showAvailable(record)">
                            {{ record.number }}</a
                          >
                          <span v-else>--</span>
                        </template>
                      </template>
                    </template>
                  </ATable>
                </div>

                <!-- 参数属性 -->
                <div id="param" class="template--title mt-30px mb-15px">参数属性</div>
                <div>
                  <ATable
                    :dataSource="parameterData"
                    :columns="parameterColumn"
                    size="small"
                    :pagination="false"
                    :scroll="{ x: 1200 }"
                    bordered
                  />
                </div>

                <!-- 适配车型 -->
                <div v-if="vehiclesData != ''">
                  <div class="template--title mt-30px mb-15px" id="applicableModels">适配车型</div>
                  <div>
                    <ATable
                      :dataSource="vehiclesData"
                      :columns="adaptationColumn"
                      size="small"
                      :pagination="false"
                      bordered
                    >
                      <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'model'">
                          <div class="flex justify-center">
                            <div class="mr-15px">{{ record.brand }}</div>
                          <div >{{ record.model }}</div>
                          </div>
                        </template>
                        <template v-if="column.dataIndex === 'powerKw'">
                          <div >{{ record.powerKw }}KW</div>
                        </template>
                      </template>
                    </ATable>
                  </div>
                </div>

                <!-- <div>
                  <a-list
                    item-layout="horizontal"
                    :grid="{ column: 2 }"
                    bordered
                    :data-source="vehiclesData"
                  >
                    <template #renderItem="{ item }">
                      <a-list-item class="p-15px m-0px listStyle">
                        <a-list-item-meta>
                          <template #title>
                            <div>{{ item }}</div>
                          </template>
                        </a-list-item-meta>
                      </a-list-item>
                    </template>
                  </a-list>
                </div> -->

                <div id="service">
                  <div class="bg-section__sub">
                    <!-- 服务保障 -->
                    <div class="template--title mb-10px">服务保障</div>
                    <div v-for="(item, index) in serviceConfig" :key="index">
                      <div v-if="item">
                        <div class="m-5">{{ item.key }}</div>
                        <VoPreviewHeadImg
                          v-if="isJsonString(item.value)"
                          :data-source="item.value != '' ? JSON.parse(item.value) : []"
                        />
                      </div>
                    </div>

                    <div class="clothing-content">
                      <div class="margin-t-10">质保时长{{ warrantyDays }}个月</div>
                      <div>售后坐席服务托管：{{ serviceHosting ? '是' : '否' }}</div>
                    </div>
                  </div>
                </div>

                <div id="picture">
                  <div class="bg-section__sub">
                    <div class="template--title mb-10px">商品头图</div>
                    <div class="figure-content">
                      <div class="figure-content-header">
                        <VoPreviewHeadImg :data-source="detailsPic" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 图文详情 -->
                <div id="details">
                  <div class="bg-section__sub">
                    <div class="template--title mb-10px">图文介绍</div>
                    <div class="figure-content">
                      <VoPreviewHeadImg :data-source="detailsDesc" />
                    </div>
                  </div>
                </div>
                <!--投资信息 projects-->
                <div id="investment-list">
                  <div>
                    <div class="template--title mb-10px">投资信息</div>
                    <div class="my-15px"
                      >是否配置投资信息：{{
                        detailInfo.projects && detailInfo.projects.length > 0 ? '是' : '否'
                      }}
                    </div>
                    <div class="flex" v-if="detailInfo.projects && detailInfo.projects.length > 0">
                      <div class="w-70px">投资项目:</div>
                      <div class="flex1">
                        <a
                          class="flex justify-between ..."
                          v-for="(item, index) of detailInfo.projects"
                          :key="index"
                          @click="goProjectsDetail(item.id)"
                        >
                          {{ item.name }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div
      v-if="detailInfo"
      class="fixed bg-white left-251px right-24px bottom-0 flex items-center justify-center p-15px"
    >
      <!-- <span v-else-if="record.status === 2 && record.violationStatus === 2"/v1/goodsGoodsViolationAudit
		>待审核</span
		> -->
      <template v-if="goodsStatus === 2 && violtionStatus === 2">
        <Button
          v-auth="'/v1/goods/goods/audit'"
          :disabled="!detailInfo.brandStatus"
          type="primary"
          class="margin-r-10"
          @click="offViolations()"
          >审核通过
        </Button>
        <Button
          v-auth="'/v1/goods/goods/audit'"
          :disabled="!detailInfo.brandStatus"
          type="primary"
          class="margin-r-10"
          @click="BadReviewFailed()"
        >
          审核不通过
        </Button>
      </template>
      <template v-if="goodsStatus === 1 && violtionStatus === 3">
        <Button
          type="primary"
          v-auth="'/v1/goods/goods/status/update'"
          class="margin-r-10"
          @click="offShelf()"
          >下架
        </Button>
        <Button
          type="primary"
          v-auth="'/v1/goods/goods/violation'"
          class="margin-r-10"
          @click="showViolation()"
          >违规
        </Button>
      </template>
      <template v-if="goodsStatus === 4 && violtionStatus === 3">
        <Button
          type="primary"
          v-auth="'/v1/goods/goods/status/update'"
          class="margin-r-10"
          @click="putShelf()"
          >上架
        </Button>
      </template>
      <template v-if="goodsStatus === 2 && violtionStatus === 3">
        <Button
          v-auth="'/v1/goods/goods/audit'"
          :disabled="!detailInfo.brandStatus"
          type="primary"
          class="margin-r-20"
          @click="approved()"
          >审核通过
        </Button>
        <Button
          v-auth="'/v1/goods/goods/audit'"
          :disabled="!detailInfo.brandStatus"
          type="primary"
          class="margin-r-10"
          @click="auditFailed()"
          >审核不通过
        </Button>
      </template>
    </div>
    <a-modal
      v-model:visible="deliveryVisible"
      class="text-xl"
      title="发货时效详情"
      :footer="null"
      width="800px"
    >
      <div class="p-10">
        <span class="text-xl">发货仓库：{{ deliveryWarehouse }}</span>
        <div>
          <div class="pt-5 pb-3 text-xl"> 时效规则：</div>

          <div v-for="(item, index) in timeList" :key="index">
            <div class="timeFrame">
              <div class="text-xl">{{ item.name }}</div>
              <div class="text-xl pt-2 pb-2"
                ><span class="pr-2">当日订单截止时间</span> {{ item.orderStartTime }}时
                <span class="pl-1 pr-1">至</span> {{ item.orderEndTime }}时预计发货.
                <template v-if="item.estimatedDelivery == 0">
                  <span>当日</span>
                </template>
                <template v-else-if="item.estimatedDelivery == 1">
                  <span>明日</span>
                </template>
                <template v-else>
                  <span>第{{ item.estimatedDelivery }}天</span>
                </template>
                {{ item.deliveryStartTime }}时 <span class="pl-1 pr-1">至</span
                >{{ item.deliveryEndTime }}时
              </div>
              <div class="text-xl pt-1 pb-1">收货区域：{{ item.areaName }}</div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="matchVisible"
      class="text-xl"
      title="到货时效详情"
      :footer="null"
      width="800px"
    >
      <div class="p-10">
        <span class="text-xl">发货仓库：{{ deliveryWarehouse }}</span>
      </div>
    </a-modal>
    <AreaDrawer :salesCode="salesCode" v-model:areaInfo="areaInfo" />
    <!-- 操作日志 -->
    <AModal
      v-model:visible="logVisible"
      width="1000px"
      title="操作日志"
      @ok="handleOk"
      :footer="null"
    >
      <div class="p-5 max-h-70vh overflow-y-auto">
        <ATable
          :dataSource="tableDataColumns"
          :columns="handleColumns"
          bordered
          :pagination="false"
        >
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex == 'index'">
              {{ index + 1 }}
            </template>
          </template>
        </ATable>
      </div>
    </AModal>
    <AuditModal v-model:visible="showAuditModal" @change="AuditSubmit" />
    <BadReviewModal v-model:visible="showBadReviewModal" @change="violationShelves" />
    <InventoryModel ref="inventory" />
    <stockModel ref="operationModel" />
  </div>
</template>

<script lang="ts" name="GoodsDetailsAssets" setup>
  import InventoryModel from '/@/modules/GoodsModule/GoodsManage/component/inventoryModel.vue'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import AreaDrawer from '/@/modules/components/AreaDrawer/AreaDrawer.vue'
  import AuditModal from './AuditModal.vue'
  import BadReviewModal from '/@/modules/GoodsModule/GoodsManage/component/BadReviewModal.vue'
  import stockModel from '/@/modules/GoodsModule/GoodsManage/component/stockModel.vue'
  // 根据不同状态 顶部提醒样式  不同
  import GoodsAlert from '/@/modules/GoodsModule/GoodsManage/component/GoodsAlert.vue'
  import { useRoute } from 'vue-router'
  //  服务商商品列表详情-基础信息--table （column《=》serviceProviderDetailsBasicInfoColumn ； data<=> serviceProviderDetailsBasicInfoMockData  ）
  // @ts-ignore
  import {
    adaptationColumn,
    serviceProviderDetailsBasicInfoColumn,
    serviceProviderDetailsSaleColumn,
    serviceProviderWarehouseInformationColumn,
    personSchema,
    handleColumns,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/serviceProviderDetailsAssets'

  import { useAppStore } from '/@/store/modules/app'
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import { Button } from 'ant-design-vue'
  import { Description } from '/@/components/Description'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'

  const logVisible = ref<boolean>(false)
  const go = useRouter()
  const switchCost = ref<boolean>(false)
  const switchWarehouse = ref<boolean>(false)
  const salesCode = ref([])
  const serviceConfig = ref([])
  const timeList = ref([])
  const deliveryVisible = ref<boolean>(false)
  const matchVisible = ref<boolean>(false)
  const deliveryWarehouse = ref('')
  const detailsDesc = ref<any>([])
  const detailsPic = ref<any>([])
  const templateProfit = ref<any>([])
  const shopMobile = ref<any>('')
  const route = useRoute()
  const vehiclesData = ref<any>([])
  const serviceData = ref([])
  const serviceHosting = ref('')
  const warrantyDays = ref('')
  const warehouseForm = reactive({})
  const inputForm = reactive({})
  // const auditModal = ref()

  const tableInputChange = () => {
    // console.log(inputForm)
  }
  // 库存信息
  const inventory = ref()
  const operationModel = ref()
  // 获取库存详情
  const showAvailable = (record) => {
    console.log(inventory, record)
    inventory.value.showModal(route.query.id as string, record.name)
  }
  const showNumber = (record) => {
    console.log(operationModel, record)
    operationModel.value.showModal(route.query.id as string, record.name)
  }
  let warehouseData = ref<any>([])
  let parameterData = ref()
  let serviceProviderProfitSharing = ref<any>([])
  let serviceProviderProfitSharingKey = ref<any>([])
  let warehouseExpenses = ref<any>([])
  let warehouseExpensesKey = ref<any>([])
  let parameterColumn = ref<any>([])
  let parameterColumnKey = ref<any>([])
  onBeforeMount(async () => {
    await getprofit()
  })

  const tabClick = (e, link) => {
    e.preventDefault()
    console.log(link)
  }

  const targetOffset = ref<number | undefined>(undefined)
  onMounted(async () => {
    targetOffset.value = window.innerHeight / 4
  })
  // 动态 显示顶部提醒样式
  //--滑动--
  const appStore = useAppStore()
  const current = ref(0)
  const menuSetting = appStore.getMenuSetting
  const targetHandler = (index, target) => {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
    current.value = index
  }
  //审核通过/goods/goods/violation/audit
  const approved = () => {
    let profitSharingList = getPreservation()
    if (!profitSharingList) {
      return
    }
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsDistributionAudit({
        audits: [{ id: route.query.id, isAvailable: isAvailable.value }],
        flag: true,
        // status: goodsStatus.value,
        // violationStatus: violtionStatus.value,
        profitSharing: profitSharingList,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `${err.message}`, key: loadingCtxkey })
      })
  }
  //审核不通过
  const showAuditModal = ref(false)
  const showAuditType = ref(1) // 审核的类型 1普通审核不通过 2违规审核不通过
  const auditFailed = () => {
    showAuditType.value = 1
    showAuditModal.value = true
  }
  const AuditSubmit = (reason) => {
    if (showAuditType.value == 1) {
      passAudit(reason)
    } else {
      passViolationAudit(reason)
    }
  }
  // 普通审核不通过
  const passAudit = (reason) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    let auditArr: any = []
    auditArr.push({ id: route.query.id, isAvailable: isAvailable.value })
    const auditMap = {
      audits: auditArr,
      flag: false,
      reason: reason,
    }
    adminHttp
      .goodsGoodsAudit(auditMap)
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        showAuditModal.value = false
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  // 违规审核不通过
  const passViolationAudit = (reason) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    let auditArr: any = []
    auditArr.push({ id: route.query.id, violationType: detailInfo.value.violationType })
    adminHttp
      .goodsGoodsViolationAudit({
        audits: auditArr,
        flag: false,
        reason: reason,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        showAuditModal.value = false
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //下架
  const offShelf = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: [route.query.id],
        status: 4,
        violationStatus: violtionStatus.value,
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

  //商品编辑
  const editCost = () => {
    switchCost.value = true
  }
  //保存
  const preservationCost = async (cost) => {
    let profitSharingList = getPreservation()
    if (!profitSharingList) {
      return
    }
    try {
      const { code } = await adminHttp.goodsGoodsProfitSet({
        id: route.query.id,
        profitSharing: profitSharingList,
      })
      if (code === '20001') {
        createMessage.success('操作成功')
        if (cost == 'switchCost') {
          switchCost.value = false
        } else {
          switchWarehouse.value = false
        }
        loadTableData()
      }
    } catch (err: any) {
      createMessage.error(err.message)
    }
  }
  // 分润验证组合数据
  const getPreservation = () => {
    const profitSharingList: any = []
    let unInputForm = Object.keys(inputForm).filter((v) => !inputForm[v] && inputForm[v] != 0)
    let unWarehouse = Object.keys(warehouseForm).filter(
      (v) => !warehouseForm[v] && warehouseForm[v] != 0,
    )
    console.log(unWarehouse, unInputForm, inputForm, warehouseForm)
    if (unInputForm.length > 0 || unWarehouse.length > 0) {
      createMessage.error('尚未设置商品分润信息')
      return
    }
    for (var key in inputForm) {
      profitSharingList.push({
        key,
        type: 1,
        value: Number(inputForm[key]),
      })
    }
    for (var key in warehouseForm) {
      profitSharingList.push({
        key,
        type: warehouseExpenses.value.find((item) => item.dataIndex == key).type,
        value: Number(warehouseForm[key]),
      })
    }
    return profitSharingList
  }
  //上架
  const putShelf = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: [route.query.id],
        status: 1,
        violationStatus: violtionStatus.value,
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
  //违规
  const showBadReviewModal = ref(false)
  const showViolation = () => {
    showBadReviewModal.value = true
  }
  const violationShelves = (data) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsViolation({
        id: route.query.id,
        type: data.radioGroup, // 违规类型1：全网违规 2：独立违规
        reason: data.replyValue,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        showBadReviewModal.value = false
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  //--以上滑动--

  let tableDataColumns = ref([])
  const tableLoading = ref(false)
  const serviceDetailsData = ref()
  let personData = ref({})
  const serviceSaleColumn = ref()
  const storageInformation = ref()
  const profitSharingMockData = ref<any>([])
  //初始
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  let goodsStatus = ref<any>()
  let brandStatus = ref<any>()
  let isAvailable = ref<any>()
  let violtionStatus = ref<any>()
  let commodityStatus = ref<any>('')
  let commodity = ref<any>()
  let commodityDescription = ref<any>()
  const detailInfo = ref<any>(null)
  const loadTableData = async () => {
    await hotTags()
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoods$id({
        id: route.query.id as string,
      })
      .then((res) => {
        // console.log(res.data, 'res.data')
        detailInfo.value = res.data
        //卖家信息
        shopMobile.value = res.data.shopMobile
        //默认选中标签hotData.value

        const selectKeys = Object.values(res.data.label)
        const list: any = []
        console.log(selectKeys, 'ss')
        hotData.value.forEach((item) => {
          if (selectKeys.includes(item.value)) {
            item.active = true
          }
          list.push(item)
        })
        console.log(list, 'list')
        serviceDetailsData.value = [
          {
            shopCode: res.data.shopCode,
            shopName: res.data.shopName,
            submitterName: res.data.submitterName,
            submitterMobile: res.data.submitterMobile,
            createTime: res.data.createTime,
          },
        ]
        //区域
        salesCode.value = res.data.salesArea
        //商品信息
        personData.value = {
          category: res.data.categoryInfo,
          operationCategory: res.data.categoryOperateInfo,
          goodsBrand: res.data.brandName,
          goodsType: res.data.categoryType,
          goodsSize: res.data.skuProperty,
          goodsName: res.data.name,
          articleNumber: res.data.articleNumber,
        }

        //销售信息
        serviceSaleColumn.value = [
          {
            goodsCode: res.data.goodsCode,
            cashPrice: res.data.cashPrice,
            accountPeriodDays: res.data.accountPeriodDays,
            accountPrice: res.data.accountPrice,
            minOrderNumber: res.data.minOrderNumber,
            shippingType: res.data.shippingType ? '包邮' : '到付',
            salesArea: '',
          },
        ]
        //仓储信息
        storageInformation.value = res.data.warehouseInfo

        //商品分润
        let fenrunColumns: any = []
        let fenrunItem: any = {}

        const profitMap = new Map()

        res.data.profitSharing.forEach((item) => {
          profitMap.set(item.key, item.value)
        })
        const testKeys: any = []
        fenrunColumns = templateProfit.value
          .filter((item) => item.type == 1)
          ?.map(({ key, name }) => {
            inputForm[key] = profitMap.get(key) != undefined ? profitMap.get(key) : null
            fenrunItem[key] = profitMap.get(key) != undefined ? profitMap.get(key) : null
            testKeys.push(key)
            return {
              title: name,
              dataIndex: key,
              key: key,
              align: 'center',
            }
          })
        serviceProviderProfitSharingKey.value = testKeys
        serviceProviderProfitSharing.value = fenrunColumns
        profitSharingMockData.value = [fenrunItem]
        console.log(templateProfit.value, fenrunColumns, fenrunItem, '222222222222')

        //仓库费用
        const warehouseKeys: any = []
        let warehouseColumns: any = []
        let warehouseItem: any = {}
        warehouseColumns = templateProfit.value
          .filter((item) => item.type != 1)
          ?.map(({ key, name, type }) => {
            warehouseForm[key] = profitMap.get(key)
            warehouseItem[key] = profitMap.get(key)
            warehouseKeys.push(key)
            return {
              title: name,
              type: type,
              dataIndex: key,
              key: key,
              align: 'center',
            }
          })

        warehouseExpensesKey.value = warehouseKeys
        warehouseExpenses.value = warehouseColumns
        warehouseData.value = [warehouseItem]
        //----
        //参数属性
        let attributeColumns: any = []
        let attributeItem: any = {}
        if (res.data.paramsProperty.length > 0) {
          attributeColumns = res.data.paramsProperty?.map(({ key, name, value }) => {
            attributeItem[key] = value
            parameterColumnKey.value.push(key)
            return {
              title: name,
              dataIndex: key,
              key: key,
              align: 'center',
              width: 150,
            }
          })
          parameterColumn.value = attributeColumns
          parameterColumn.value.length > 0 && (parameterColumn.value[0]['fixed'] = 'lift')
          parameterData.value = [attributeItem]
        }

        //==========
        serviceConfig.value = res.data.serviceConfig
        //车型

        detailsDesc.value = res.data.desc
        detailsPic.value = res.data.pic || []
        vehiclesData.value = res.data.vehicles
        serviceData.value = res.data.serviceConfig
        serviceHosting.value = res.data.serviceHosting
        warrantyDays.value = res.data.warrantyDays
        goodsStatus.value = res.data.status
        brandStatus.value = res.data.brandStatus
        violtionStatus.value = res.data.violationStatus
        isAvailable.value = res.data.isAvailable
        if (goodsStatus.value === 4 && violtionStatus.value === 3) {
          commodityStatus.value = '当前商品状态：已下架'
          commodity.value = 'error'
          commodityDescription.value = '原因:' + res.data.reason
        } else if (goodsStatus.value === 1 && violtionStatus.value === 3) {
          commodityStatus.value = '当前商品状态：已上架'
          commodity.value = 'success'
          commodityDescription.value = ''
        } else if (goodsStatus.value === 2 && violtionStatus.value === 3) {
          commodityStatus.value = '当前商品状态：待审核'
          commodity.value = 'error'
          commodityDescription.value = ''
        } else if (goodsStatus.value === 3) {
          commodityStatus.value = '当前商品状态：审核         未通过'
          commodity.value = 'error'
          commodityDescription.value = '原因:' + res.data.reason
        } else if (violtionStatus.value === 1 || violtionStatus.value === 2) {
          commodityStatus.value = '当前商品状态：违规'
          commodity.value = 'error'
          commodityDescription.value =
            (res.data.violationType == 1 ? '全网违规：' : '独立违规：') + res.data.reason
        }
        console.log(33333333, goodsStatus.value, violtionStatus.value)

        createMessage.success({ content: `获取数据成功`, key: loadingCtxkey })
      })
      .catch((err) => {
        console.log(err)
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
    // loadTableData()
  }
  const hotData = ref<any>([])
  //获取标签  操作goodsGoodsSaveLabel
  const hotTags = async () => {
    const dataTags = await adminHttp
      .goodsGoodsQueryLabels()
      .then((res) => res.data)
      .catch((err) => {
        console.log(`商品标签配置查询:${err.message}`)
        return dataTags
      })
      .finally(() => {
        tableLoading.value = false
      })

    console.log(Object.values(dataTags), 'dataTags')
    const list: any = []
    Object.keys(dataTags).forEach((key) => {
      const item = {
        key: key,
        value: dataTags[key],
        active: false,
      }
      list.push(item)
    })
    hotData.value = list
  }
  //点击切换标签
  const switchTags = async (item: any) => {
    console.log(item, 'item')
    const list = hotData.value.filter((item) => item.active).map((item) => item.key)
    await adminHttp.goodsGoodsSaveLabel({
      id: route.query?.id,
      label: list,
    })
  }
  //违规审核通过
  const offViolations = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    let auditArr: any = []
    auditArr.push({ id: route.query.id, violationType: detailInfo.value.violationType })
    adminHttp
      .goodsGoodsViolationAudit({
        audits: auditArr,
        flag: true,
        // status: goodsStatus.value,
        // violationStatus: violtionStatus.value,
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
  //违规审核不通过
  const BadReviewFailed = () => {
    showAuditType.value = 2
    showAuditModal.value = true
  }

  const getprofit = () => {
    adminHttp
      .goodsTemplateGetProfit()
      .then((res) => {
        templateProfit.value = res.data
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //发货时效/v1/warehouse/delivery/warehouse/{warehouseId}
  const deliveryTime = (item) => {
    deliveryWarehouse.value = item.warehouseName
    deliveryVisible.value = true
    adminHttp
      .warehouseDeliveryWarehouse$id(item.warehouseId)
      .then((res) => {
        console.log(res)
        timeList.value = res.data
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //发货时效/v1/warehouse/arrival/warehouse
  const matchTime = (item) => {
    // matchWarehouse.value = item.warehouseName
    matchVisible.value = true
    adminHttp
      .warehouseArrivalWarehouse({ warehouseId: item.warehouseId })
      .then((res) => {
        console.log(res)
        // timeList.value = res.data
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //销售区域
  const areaInfo = reactive<any>({
    name: '',
    treeTitle: '',
    treeVisible: false,
    isNationwide: false,
  })
  const salesArea = () => {
    areaInfo.treeTitle = '销售区域'
    areaInfo.treeVisible = true
    areaInfo.name = personData.value.goodsName
  }

  //仓库分润编辑
  const editWarehouse = () => {
    switchWarehouse.value = true
  }

  //去审核
  const toAudit = () => {
    go.push({
      path: '/customerModule/supplier/suppierBrankOperation',
      query: { type: 2 },
    })
  }
  //查看操作
  const operation = () => {
    logVisible.value = true
    tabColumns()
  }
  //ok
  const handleOk = () => {
    logVisible.value = false
  }
  //查询日志/v1/goods/goods/query/operatelog/page
  const tabColumns = async () => {
    const data = await adminHttp.GOODS.goodsGoodsOperateList({
      id: route.query?.id,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })

    tableDataColumns.value = data ? data : []

    console.log(data, 'res.data')
  }
  const isJsonString = (str) => {
    try {
      const toObj = JSON.parse(str) // json字符串转对象

      if (toObj && typeof toObj === 'object') {
        return true
      }
    } catch {
      return false
    }
  }

  // 跳转到投资项目
  const goProjectsDetail = (id) => {
    go.push({ path: '/goodsManage/goods/goodsInvestment', query: { id: id } })
  }
</script>
<style>
  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style lang="less" scoped>
  /* For demo */
  .page-wrap {
    background-color: #fff;
    position: relative;

    .wrap-tabs {
      position: fixed;
    }

    .page-left {
      padding: 15px;
      transition: all 0.3s;
      width: 160px;
      position: absolute;
      left: 24px;
      top: 24px;
      //top: 230px;
      z-index: 99;

      &.toggle {
        left: 70px;
      }

      .step-title {
        font-size: 16px;
        font-weight: 800;
        margin-top: 10px;
      }

      ::v-deep .ant-steps-item-icon {
        width: 21px;
        height: 22px;
        line-height: 22px;
        margin-left: 5px;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
      }

      ::v-deep .ant-steps-item-description {
        .step-title {
          font-size: 14px;
          font-weight: 700;
        }
      }
    }

    .page-right {
      position: relative;
      margin-left: 180px;
      border-left: 1px solid #ebebeb;

      .basic {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;
          // background: #ff6400;
          &--title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }

          &-content {
            padding: 10px;
            background: #fff;
          }
        }
      }

      .price {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;

          &--title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }

          &-content {
            padding: 0 10px;
            // height: 200px;
            background: #fff;

            &--title {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;

              &--wild {
                color: red;
              }
            }

            &--parameter {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;

              &--wild {
                color: red;
              }
            }

            &-ginseng {
              width: 500px;
            }

            &-filter {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;

              &--wild {
                color: red;
              }
            }

            &-FenRun {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;

              &--wild {
                color: red;
              }
            }

            &-list {
              margin-bottom: 30px;
            }
          }
        }
      }

      .clothing {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;

          &-title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }

          &-content {
            padding: 10px;
            background: #fff;

            &-support {
              // color: #c1c1c1;
              padding: 10px;
              font-size: 16px;
            }

            &-install {
              padding: 10px;
              font-size: 16px;
            }

            &-installation {
              // padding: 10px 0;
            }
          }
        }
      }

      .figure {
        margin-top: 15px;
        border: 1px solid #c1c1c1;

        &--title {
          padding: 10px;
          font-size: 24px;
          font-weight: bold;
          background: #c1c1c1;
          border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          background: #fff;
          padding: 10px;

          &-header {
            margin-bottom: 20px;
          }
        }
      }

      .operation {
        &-button {
          display: flex;
          justify-content: center;
          align-items: center;

          &-item {
            margin: 70px;
            width: 120px;
          }
        }
      }
    }

    .page-mobile {
      position: relative;

      padding-left: 200px;
      height: calc(100vh - 10px);
      overflow-y: scroll;

      .price-mobile {
        // width: 749px;
      }
    }
  }

  .handle-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 10px;
    left: 0;
    height: 40px;
  }

  .timeFrame {
    border: 1px solid #d7d7d7;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
  }

  .listStyle {
    border-bottom: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    margin: 0;
  }
</style>
