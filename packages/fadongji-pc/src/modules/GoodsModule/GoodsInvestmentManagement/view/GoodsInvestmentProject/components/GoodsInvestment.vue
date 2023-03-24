<template>
  <div>
    <div class="page-wrap bg-white p-24px m-24px mb-82px">
      <div class="page-left" :class="{ toggle: menuSetting.collapsed }">
        <ASteps v-model:current="current" direction="vertical">
          <a-step
            class="step-title"
            title="卖家信息"
            #description
            @click.stop="targetHandler(0, '#seller-list')"
          >
            <div class="step-title" @click.stop="targetHandler(0, '#seller-list')"> 卖家信息</div>
          </a-step>
          <a-step
            class="step-title"
            title="投资信息"
            #description
            @click.stop="targetHandler(0, '#investment-list')"
          >
            <div class="step-title" @click.stop="targetHandler(0, '#investment-list')">
              投资信息
            </div>
          </a-step>
          <a-step
            class="step-title"
            title="商品信息"
            #description
            @click.stop="targetHandler(0, '#goods-list')"
          >
            <div class="step-title" @click.stop="targetHandler(0, '#goods-list')"> 商品信息</div>
            <div class="step-title" @click.stop="targetHandler(1, '#sale-list')"> 销售信息</div>
            <div class="step-title" @click.stop="targetHandler(2, '#goodsProfitSharing')">
              商品分润
            </div>
            <div class="step-title" @click.stop="targetHandler(3, '#warehouseOperationFee ')">
              仓库服务费
            </div>
            <div class="step-title" @click.stop="targetHandler(5, '#param')"> 参数属性</div>
            <div class="step-title" @click.stop="targetHandler(6, '#applicableModels')">
              适配车型
            </div>
            <div class="step-title" @click.stop="targetHandler(7, '#service')"> 服务信息</div>
            <div class="step-title" @click.stop="targetHandler(8, '#picture')"> 商品头图</div>
            <div class="step-title" @click.stop="targetHandler(9, '#details')"> 图文介绍</div>
          </a-step>
        </ASteps>
      </div>
      <div class="page-right pl-24px" id="container">
        <section>
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
              <div class="template--title mt-30px mb-15px">卖家信息</div>
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
                    <!--提交人-->
                    <template v-if="column.dataIndex === 'submitterName'">
                      <div class="mr-5px">{{ record.submitterName }}</div>
                      <div>{{ record.submitterMobile }}</div>
                    </template>
                    <template v-if="column.dataIndex === 'shopName'">
                      <div>
                        <div class="mr-5px">{{ record.shopName }}</div>
                        <div>{{ record.shopMobile }}</div>
                      </div>
                    </template>
                  </template>
                </ATable>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div id="investment-list">
            <div class="border-assets margin-t-10">
              <div class="template--title mt-30px mb-15px">投资信息</div>
              <div>
                <ATable
                  :columns="investmentProviderColumn"
                  :loading="tableLoading"
                  :dataSource="investmentDetailsData"
                  size="small"
                  :scroll="{ x: 1200 }"
                  :pagination="false"
                  bordered
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'investmentCashPrice'">
                      <div>{{ record.investmentCashPrice }}元</div>
                      <div>{{ record.investmentAccountPeriodDays }}</div>
                    </template>
                    <template v-if="column.dataIndex === 'investableArea'">
                      <AButton type="link" @click="investArea">查看详情</AButton>
                    </template>
                    <template v-if="column.dataIndex === 'minOrderNumber'">
                      <div v-if="investmentCost">
                        <a-input
                          style="width: 90px"
                          maxlength="8"
                          v-model:value="startingPoint"
                          @change="verification"
                          @pressEnter="verification"
                        />
                        <AButton type="link" @click="editSave(record)">保存</AButton>
                        <AButton type="link" @click="investmentSave()">取消</AButton>
                      </div>
                      <div v-else>
                        <span>{{ record.minOrderNumber }}</span>
                        <AButton type="link" @click="editMinOrder()">编辑</AButton>
                      </div>
                    </template>
                    <template v-if="column.dataIndex === 'investmentLimit'">
                      <div v-if="iLimitCost">
                        <a-input
                          style="width: 90px"
                          maxlength="8"
                          v-model:value="limitPoint"
                          @change="verification"
                          @pressEnter="verification"
                        />
                        <AButton type="link" @click="limitSave(record)">保存</AButton>
                        <AButton type="link" @click="iLimitCostSave()">取消</AButton>
                      </div>
                      <div v-else>
                        <span>{{ record.investmentLimit }}</span>
                        <AButton type="link" @click="editMinLimit()">编辑</AButton>
                      </div>
                    </template>
                  </template>
                </ATable>
              </div>
              <div>
                <div class="template--title mt-30px mb-15px">项目详情</div>
                <div class="figure-content-header">
                  <VoPreviewHeadImg :data-source="investmentDesc" />
                </div>
              </div>
              <div>
                <div class="template--title mt-30px mb-15px">项目分润</div>
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
                        <AButton class="float-right" type="link" @click="preservationCost()"
                          >保存
                        </AButton>
                      </div>
                      <AButton v-else class="float-right" type="link" @click="switchCost = true">
                        <div
                          v-if="
                            (goodsStatus === 2 && violtionStatus === 3) ||
                            (goodsStatus === 3 && violtionStatus === 3) ||
                            (violtionStatus === 3 && goodsStatus === 5)
                          "
                        >
                        </div>
                        <div v-else> 编辑 </div>
                      </AButton>
                    </div>
                  </template>
                </div>

                <div>
                  <ATable
                    v-if="projectProfit.length"
                    :dataSource="projectForm"
                    :columns="projectProfit"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, record }">
                      <template v-if="switchCost || (goodsStatus == 2 && violtionStatus == 3)">
                        <div class="flex justify-between items-center">
                          <a-input-number
                            :min="0"
                            :max="99999999"
                            :precision="2"
                            style="width: 100%"
                            v-model:value="record[column.dataIndex]"
                          />
                          <div class="ml-5px">元</div>
                        </div>
                      </template>
                      <template v-else>
                        {{ record[column.dataIndex] != null ? record[column.dataIndex] : '--' }}元
                      </template>
                    </template>
                  </ATable>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div id="goods-list">
            <div class="border-assets">
              <div>
                <div class="template--title mt-30px mb-15px">商品信息</div>
                <div>
                  <Description
                    size="middle"
                    :bordered="true"
                    :column="2"
                    :data="personData"
                    :schema="personSchema"
                  />
                </div>
                <!-- 销售信息 -->
                <div class="template--title mt-30px mb-15px" id="sale-list">销售信息</div>
                <div>
                  <ATable
                    :dataSource="serviceSaleColumn"
                    :columns="serviceProviderDetailsSaleColumn"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.dataIndex === 'salesTerritory'">
                        <AButton type="link" @click="salesArea()">查看详情</AButton>
                      </template>
                    </template>
                    <template></template>
                  </ATable>
                </div>
                <div id="goodsProfitSharing" class="template--title mt-30px mb-15px">商品分润</div>
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
                      {{ record[column.key] != null ? record[column.key] : '--' }}元
                    </template>
                  </ATable>
                </div>
                <div class="template--title mt-30px mb-15px" id="warehouseOperationFee"
                  >仓库运营费用
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
                      {{ record[column.key] != null ? record[column.key] : '--' }}元
                    </template>
                  </ATable>
                </div>
                <!-- 参数属性 -->
                <div class="template--title mt-30px mb-15px" id="param">参数属性</div>
                <div>
                  <ATable
                    :dataSource="paramsData"
                    :columns="paramsColumn"
                    size="small"
                    :pagination="false"
                    :scroll="{ x: 1200 }"
                    bordered
                  />
                </div>

                <!-- 适配车型 -->
                <div v-if="vehiclesData != ''">
                  <div class="template--title mt-30px mb-15px" id="applicableModels">适配车型</div>

                  <ATable
                    :dataSource="vehiclesData"
                    :columns="adaptationModelColumn"
                    size="small"
                    :pagination="false"
                    bordered
                  >
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.dataIndex === 'model'">
                        <div class="flex justify-center">
                          <div class="mr-15px">{{ record.brand }}</div>
                          <div>{{ record.model }}</div>
                        </div>
                      </template>
                      <template v-if="column.dataIndex === 'powerKw'">
                          <div >{{ record.powerKw }}KW</div>
                        </template>
                    </template>
                  </ATable>
                </div>

                <div id="service">
                  <div>
                    <!-- 服务保障 -->
                    <div class="template--title mt-30px mb-15px">服务保障</div>
                    <div v-for="(item, index) in serviceConfig" :key="index">
                      <div v-if="item">
                        <div class="mb-5 mt-5">{{ index + 1 }}. {{ item.key }}</div>
                        <div class="mb-10">
                          <div class="mr-3 mb-24px">{{ index + 1 }} ( 2 ). 安装图片</div>
                          <div>
                            <VoPreviewHeadImg
                              type="1"
                              :data-source="JSON.parse(item.value)"
                              v-if="item.value && Array.isArray(JSON.parse(item.value))"
                            />
                          </div>
                        </div>

                        <div>
                          <div class="mr-3 mb-24px">{{ index + 1 }} ( 2 ). 安装视频:</div>
                          <div>
                            <VoPreviewHeadImg
                              type="2"
                              :data-source="JSON.parse(item.value)"
                              v-if="item.value && Array.isArray(JSON.parse(item.value))"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="clothing-content">
                      <div class="margin-t-10"> 7*24小时人工技术支持</div>
                      <div class="margin-t-10">质保时长{{ warrantyDays }}个月</div>
                      <div>售后坐席服务托管：{{ serviceHosting ? '是' : '否' }}</div>
                    </div>
                  </div>
                </div>

                <div id="picture">
                  <div>
                    <div class="template--title mt-30px mb-15px">商品头图</div>
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
                    <div class="template--title mt-30px mb-15px">图文介绍</div>
                    <div class="figure-content">
                      <VoPreviewHeadImg :data-source="detailsDesc" />
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
      class="fixed bg-white left-251px right-24px bottom-0 flex items-center justify-center p-15px"
    >
      <!--
  status	  状态 1：已上架   2：待审核 3：审核未通过 4：已下架
  violationStatus	违规状态 1：已违规  2：违规审核 3：未违规 -->
      <template v-if="goodsStatus === 1 && violtionStatus === 3">
        <Button type="primary" class="margin-r-10" @click="offShelf()">下架</Button>
        <Button type="primary" class="margin-r-10" @click="openViolationModal()">违规</Button>
      </template>
      <template v-if="goodsStatus === 4 && violtionStatus === 3">
        <Button type="primary" class="margin-r-10" @click="putShelf()">上架</Button>
      </template>

      <template
        v-if="
          `[${goodsStatus},${violtionStatus}]` === '[2,3]' ||
          `[${goodsStatus},${violtionStatus}]` == '[2,2]'
        "
      >
        <Button type="primary" class="margin-r-20" @click="approved()">审核通过</Button>
        <Button type="primary" class="margin-r-10" @click="auditFailed()">审核不通过</Button>
      </template>
    </div>
    <AreaDrawer :salesCode="areaSalesCode" v-model:areaInfo="areaInfo"></AreaDrawer>
    <AuditModal v-model:visible="showAuditModal" @change="AuditSubmit"></AuditModal>
    <!-- 操作日志 -->
    <AModal v-model:visible="logVisible" width="1000px" title="操作日志" :footer="null">
      <div class="p-5 h-70vh overflow-y-auto">
        <ATable
          :dataSource="tableDataColumns"
          :columns="handleColumns"
          bordered
          :pagination="false"
        >
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </template>
          </template>
        </ATable>
      </div>
    </AModal>
    <!--违规下架-->
    <AModal
      title="违规下架"
      :zIndex="1001"
      centered
      v-model:visible="violationModal.visible"
      :confirm-loading="violationModal.confirmLoading"
      @ok="violation"
    >
      <div class="padding-10">
        <AForm :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <AFormItem label="违规类型" v-bind="violationValidateInfos.type">
            <a-radio-group v-model:value="violationModal.type">
              <a-radio :value="1">全网违规</a-radio>
              <a-radio :value="2">独立违规</a-radio>
            </a-radio-group>
          </AFormItem>
          <AFormItem v-bind="violationValidateInfos.rejectReason" label="违规下架原因">
            <ATextarea
              v-model:value="violationModal.rejectReason"
              placeholder="请输入原因"
              :rows="3"
            />
          </AFormItem>
        </AForm>
      </div>
    </AModal>
  </div>
</template>

<script name="goodsInvestment" lang="ts">
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import VoGoodsHeaderImage from '/@/components/VoGoodsHeaderImage/VoGoodsHeaderImage.vue'
  import AreaDrawer from '/@/modules/components/AreaDrawer/AreaDrawer.vue'
  import { detailList } from '/@/modules/GoodsModule/GoodsManage/component'
  import { parameterList } from '/@/modules/GoodsModule/GoodsManage/component'
  import { detailSource } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { Pattern } from '@vocen/shared'
  // 根据不同状态 顶部提醒样式  不同
  import GoodsAlert from '/@/modules/GoodsModule/GoodsManage/component/GoodsAlert.vue'
  import AuditModal from './AuditModal.vue'
  import { useRoute } from 'vue-router'
  //  服务商商品列表详情-基础信息--table （column《=》serviceProviderDetailsBasicInfoColumn ； data<=> serviceProviderDetailsBasicInfoMockData  ）
  import { adaptationModelColumn } from '../data/investmentFiterColumns'
  import {
    serviceProviderDetailsBasicInfoColumn,
    investmentProviderColumn,
    serviceProviderDetailsBasicInfoMockData,
    serviceProviderDetailsSaleColumn,
    serviceProviderDetailsSaleMockData,
    serviceProviderProfitSharingMockData,
    serviceProviderWarehouseOperationManagementColumn,
    serviceProviderWarehouseOperationManagementMockData,
    serviceProviderWarehouseInformationColumn,
    serviceProviderParamColumn,
    serviceProviderParamMockData,
    serviceProviderApplicableModelsColumn,
    serviceProviderApplicableModelsMockData,
    personSchema,
    handleColumns,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/serviceProviderDetailsAssets'

  import { ginsengSource } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { modelsSource } from '/@/modules/GoodsModule/GoodsManage/mock' //过滤
  import { modelsList } from '/@/modules/GoodsModule/GoodsManage/component'

  import SupplyTotal from '/@/modules/SupplierPages/component/SupplyTotal.vue'
  import { useAppStore } from '/@/store/modules/app'
  import { defineComponent, ref, reactive, toRefs, toRaw } from 'vue'
  import { Form, Table, Button } from 'ant-design-vue'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { Description } from '/@/components/Description'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  interface Option {
    value: string
    label: string
    children?: Option[]
  }

  const options: Option[] = [
    {
      value: '发动机系列',
      label: '发动机系列',
      children: [
        {
          value: '发动机',
          label: '发动机',
        },
      ],
    },
  ]

  export default defineComponent({
    name: 'GoodsInvestmentManage',
    components: {
      VoGoodsHeaderImage,
      Form,
      FormItem: Form.Item,
      Table,
      SupplyTotal,
      Button,
      BarChartOutlined,
      Description,
      GoodsAlert,
      VoPreviewHeadImg,
      AuditModal,
      AreaDrawer,
    },
    setup() {
      const go = useRouter()
      const investmentCost = ref<boolean>(false)
      const iLimitCost = ref<boolean>(false)
      const startingPoint = ref<string>('')
      const limitPoint = ref<string>('')
      let warehouseData = ref([])
      const warehouseForm = reactive({})
      let warehouseExpenses = ref<any>([])
      let warehouseExpensesKey = ref<any>([])
      const salesCode = ref([])
      const investCode = ref([])
      const vehiclesData = ref<any>([])
      const detailsPic = ref<any>([])
      const detailsDesc = ref<any>([])
      const investmentDesc = ref<any>([])
      const route = useRoute()
      const templateProfit = ref<any>([])
      const inputForm = reactive({})
      const projectForm = ref([{}])
      const serviceConfig = ref([])
      const warrantyDays = ref('')
      const serviceHosting = ref('')
      let brandStatus = ref<any>()
      const tableInputChange = () => {
        console.log(inputForm)
      }

      let serviceProviderProfitSharing = ref<any>([])
      let serviceProviderProfitSharingKey = ref<any>([])

      onMountedOrActivated(async () => {
        projectProfit.value = []
        await getProfit()
        await getProjectData()
        loadTableData()
      })
      // 动态 显示顶部提醒样式
      const router = useRoute()
      const message = router.params.message
      const description = ref<String>(router.params.description)
      const error = ref<String>(router.params.error)
      //--滑动--
      const appStore = useAppStore()
      const current = ref(0)
      const visible = ref(false)
      const target = ref('#basic-list')
      const style = reactive({})
      const menuSetting = appStore.getMenuSetting
      const targetHandler = (index, target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
        current.value = index
      }
      //审核通过/v1/goods/investment/update/status
      const approved = () => {
        let profitSharing = getPreservation()
        if (!profitSharing) {
          return
        }
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsInvestmentUpdateStatus({
            id: [route.query.id],
            status: 3, // 状态  1上架  2下架  3审核通过 4审核不通过  5违规下架
            profitSharing,
          })
          .then(({ code }) => {
            if (code == '20001') {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      //审核不通过
      const showAuditModal = ref(false)
      const auditFailed = () => {
        showAuditModal.value = true
      }
      const AuditSubmit = (reason) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        console.log(reason, 'xxxxxx')

        const auditMap = {
          id: [route.query.id],
          status: 4,
          reason: reason,
          profitSharing: [inputForm],
        }
        adminHttp
          .goodsInvestmentUpdateStatus(auditMap)
          .then(({ code }) => {
            if (code == '20001') {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }

      // 查看操作记录
      //查看操作
      const logVisible = ref(false)
      const tableDataColumns = ref([])
      const operation = () => {
        logVisible.value = true
        tabColumns()
      }

      //查询日志
      const tabColumns = async () => {
        try {
          const { code, data } = await adminHttp.GOODS.goodsInvestmentOperateList({
            id: route.query?.id,
          })
          if (code === '20001') {
            tableDataColumns.value = data ? data : []
          }
        } catch (e) {
          console.log(e)
        }
      }
      //下架
      const offShelf = () => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsInvestmentUpdateStatus({
            id: [route.query.id],
            status: 2,
          })
          .then(({ code }) => {
            if (code == '20001') {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      //上架
      const putShelf = () => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsInvestmentUpdateStatus({
            id: [route.query.id],
            status: 1,
            violationStatus: violtionStatus.value,
          })
          .then(({ code }) => {
            if (code == '20001') {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      /** 违规下架start **/
      const violationModal = reactive({
        visible: false,
        rejectReason: '',
        confirmLoading: false,
        type: 1,
      })
      const violationFormRules = reactive({
        type: [
          {
            required: true,
            message: '违规类型必选',
          },
        ],
        rejectReason: [
          {
            required: true,
            message: '原因必填',
          },
        ],
      })
      const {
        // resetFields: violationRest,
        validate: violationValidate,
        validateInfos: violationValidateInfos,
      } = Form.useForm(violationModal, violationFormRules, {
        // onValidate: (...args) => console.log(...args),
      })
      const openViolationModal = () => {
        violationModal.rejectReason = ''
        violationModal.visible = true
      }
      const violation = async () => {
        try {
          const formData = await violationValidate()
            .then(() => {
              return toRaw(violationModal)
            })
            .catch(() => {
              throw Error('form validate fail')
            })
          violationModal.confirmLoading = true

          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          await adminHttp.goodsInvestmentUpdateStatus({
            id: [route.query.id],
            type: formData.type,
            status: 5,
            reason: formData.rejectReason,
          })
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          violationModal.visible = false
          loadTableData()
        } catch (err) {
          console.log(err)
          if (err.message !== 'form validate fail')
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
        } finally {
          violationModal.confirmLoading = false
        }
      }
      const dingHandler = (targetEl) => {
        target.value = targetEl
        visible.value = true
      }
      const queryScroll = () => {
        const c = document.querySelector('#container') as HTMLElement
        console.log(c.scrollTop)
      }
      //--以上滑动--
      const stateDetail = reactive({ detailSource })
      const stateGinseng = reactive({ ginsengSource })
      const stateModels = reactive({ modelsSource })
      // const stateFenRun = reactive({ FenRunList })
      const onChange = (current: number) => {
        console.log(current)
      }
      let tableData = ref([])
      const tableLoading = ref(false)
      const serviceDetailsData = ref()
      const investmentDetailsData = ref()
      let personData = ref({})
      const serviceSaleColumn = ref()
      const profitSharingMockData = ref([])
      //初始
      const { createMessage } = useMessage()
      const loadingCtxkey = 'handlerRow'
      let goodsStatus = <any>ref()
      let isAvailable = <any>ref()
      let violtionStatus = <any>ref()
      let commodityStatus = <any>ref()
      let commodity = <any>ref()
      let commodityDescription = <any>ref()

      let paramsData = ref([])
      let paramsColumn = ref([])
      ///v1/goods/investment/{id}
      const loadTableData = () => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        console.log('测试===>投资id', route.query.id)

        adminHttp
          .goodsInvestment$id({
            id: route.query.id,
          })
          .then((res) => {
            brandStatus.value = res.data.brandStatus

            //卖家信息
            serviceDetailsData.value = [
              {
                shopCode: res.data.shopCode,
                shopName: res.data.shopName,
                shopMobile: res.data.shopMobile,
                submitterName: res.data.submitterName,
                submitterMobile: res.data.submitterMobile,
                createTime: res.data.createTime,
              },
            ]
            //投资信息
            investmentDetailsData.value = [
              {
                name: res.data.name,
                investmentCashPrice: res.data.investmentCashPrice,
                investmentAccountPeriodDays:
                  res.data.investmentAccountPeriodDays +
                  '天账期' +
                  res.data.investmentAccountPrice +
                  '元',
                totalInvestment: res.data.investmentNum + '/' + res.data.totalInvestment,
                warehouseName: res.data.warehouseName,
                rol: res.data.rol + '%',
                minOrderNumber: res.data.startNumber,
                investmentLimit: res.data.investmentLimit,
                shippingType: res.data.investmentShippingType === 1 ? '包邮' : '到付',
              },
            ]
            //起投量
            startingPoint.value = res.data.startNumber
            //限投量
            limitPoint.value = res.data.investmentLimit
            //销售区域
            salesCode.value = res.data.salesArea
            //投资区域
            investCode.value = res.data.investableArea
            investmentDesc.value = res.data.investmentDesc || []
            //商品信息
            personData.value = {
              category: res.data.categoryInfo,
              operationCategory: res.data.categoryOperateInfo,
              goodsBrand: res.data.brandName,
              goodsType: res.data.categoryType,
              goodsSize: res.data.skuProperty,
              goodsName: res.data.goodsName,
              articleNumber: res.data.articleNumber,
            }
            //销售信息
            serviceSaleColumn.value = [
              {
                goodsCode: res.data.goodsCode,
                cashPrice: res.data.cashPrice ? res.data.cashPrice : '--' + '元',
                accountPrice: res.data.accountPeriodDays
                  ? res.data.accountPeriodDays + '天账期' + (res.data.accountPrice + '元')
                  : '--',
                minOrderNumber: res.data.minOrderNumber,
                shippingType: res.data.shippingType === 1 ? '包邮' : '到付',
                salesArea: '',
              },
            ]
            //商品分润
            let fenrunColumns: any = []
            let fenrunItem: any = {}

            const profitMap = new Map()

            res.data.profitSharing &&
              res.data.profitSharing.forEach((item) => {
                profitMap.set(item.key, item.value)
              })
            const testKeys = []
            fenrunColumns = templateProfit.value
              .filter((item) => item.type == 1)
              ?.map(({ key, name }) => {
                inputForm[key] = profitMap.get(key)
                fenrunItem[key] = profitMap.get(key)
                testKeys.push(key)
                return {
                  title: name,
                  dataIndex: key,
                  key: key,
                  align: 'center',
                }
              })
            console.log(res.data.investmentProfitSharing)
            if (res.data.warehouseId) {
              projectProfit.value[3] = {
                title: '仓库运营费用',
                dataIndex: res.data.warehouseId,
                type: 2,
              }
            }
            console.log(projectProfit)

            if (res.data.investmentProfitSharing) {
              //projectForm
              res.data.investmentProfitSharing.forEach((item) => {
                projectForm.value[0][item.key] = item.value
                if (item.type == 2) {
                  projectForm.value[0][res.data.warehouseId] = item.value
                }
              })
            } else {
              projectForm.value[0][res.data.warehouseId] = ''
            }

            serviceProviderProfitSharingKey.value = testKeys
            serviceProviderProfitSharing.value = fenrunColumns
            profitSharingMockData.value = [fenrunItem]
            //仓库费用
            const warehouseKeys = []
            let warehouseColumns: any = []
            let warehouseItem: any = {}
            warehouseColumns = templateProfit.value
              .filter((item) => item.type != 1)
              ?.map(({ key, name }) => {
                warehouseForm[key] = profitMap.get(key)
                warehouseItem[key] = profitMap.get(key)
                warehouseKeys.push(key)
                return {
                  title: name,
                  dataIndex: key,
                  key: key,
                  align: 'center',
                }
              })
            warehouseExpensesKey.value = warehouseKeys
            warehouseExpenses.value = warehouseColumns
            warehouseData.value = [warehouseItem]
            // 参数信息 paramsProperty
            if (res.data.paramsProperty.length > 0) {
              paramsData.value = [{}]
              paramsColumn.value =
                res.data.paramsProperty &&
                res.data.paramsProperty.map(({ key, name, value }) => {
                  let params = {}
                  params[key] = value
                  paramsData.value[0][key] = value
                  return {
                    title: name,
                    dataIndex: key,
                    key: key,
                    align: 'center',
                    width: 150,
                  }
                })
              paramsColumn.value[0]['fixed'] = 'lift'
            }
            //车型
            vehiclesData.value = res.data.vehicles
            //服务
            serviceConfig.value = res.data.serviceConfig
            warrantyDays.value = res.data.warrantyDays
            serviceHosting.value = res.data.serviceHosting
            //头图
            detailsPic.value = res.data.pic || []
            detailsDesc.value = res.data.desc || []
            goodsStatus.value = res.data.status
            violtionStatus.value = res.data.violationStatus
            isAvailable.value = res.data.isAvailable
            if (goodsStatus.value === 4 && violtionStatus.value === 3) {
              commodityStatus.value = '当前商品状态：已暂停'
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
            } else if (goodsStatus.value === 3 && violtionStatus.value === 3) {
              commodityStatus.value = '当前商品状态：审核未通过'
              commodity.value = 'error'
              commodityDescription.value = '原因:' + res.data.reason
            } else if (violtionStatus.value === 1 || violtionStatus.value === 2) {
              commodityStatus.value = '当前商品状态：违规商品'
              commodity.value = 'error'
              commodityDescription.value =
                (res.data.violationType == 1 ? '全网违规：' : '独立违规：') +
                (res.data.reason ? res.data.reason : '--')
            } else if (violtionStatus.value === 3 && goodsStatus.value === 5) {
              commodityStatus.value = '当前商品状态：已完成'
              commodity.value = 'error'
              commodityDescription.value = ''
            }
            createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
          })
          .catch((err) => {
            console.log(err.message)
            createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
          })
        // loadTableData()
      }
      //99999
      const state = reactive({
        value1: [],
      })

      interface formValue {
        goodsClassfy: string[]
        initClassfy: string
      }

      const formState = reactive<formValue>({
        goodsClassfy: [],
        initClassfy: '机油>润滑油',
      })
      const choiceInitClassfy = () => {
        console.log('选中问题====', formState.goodsClassfy)
        formState.goodsClassfy = ['machine-oil', 'runhua-oil']
      }
      //商品分润信息
      const getProfit = () => {
        adminHttp
          .goodsTemplateGetProfit()
          .then((res) => {
            templateProfit.value = res.data
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      // 获取项目分润信息
      const projectProfit = ref([])
      const getProjectData = async () => {
        try {
          const { code, data } = await adminHttp.GOODS.goodsInvestmentProfitRole()
          if (code === '20001') {
            let templateData = data
            if (templateData.length > 0) {
              templateData.forEach((item) => {
                if (item.type != 2) {
                  projectForm.value[0][item['key']] = null
                  projectProfit.value.push({
                    title: item['name'],
                    dataIndex: item['key'],
                    type: item.type,
                  })
                }
              })
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      // 保存项目分润信息
      const switchCost = ref(false)
      // 保存项目信息
      const getPreservation = () => {
        let unProjectForm = Object.keys(projectForm.value[0]).filter(
          (v) => !projectForm.value[0][v] && projectForm.value[0][v] != 0,
        )
        console.log(projectForm)
        if (unProjectForm.length > 0) {
          createMessage.error('尚未设置项目分润信息')
          return
        }
        let profitSharingList = []
        projectProfit.value.forEach((item) => {
          if (item) {
            profitSharingList.push({
              key: item['dataIndex'],
              type: item.type,
              value: projectForm.value[0][item['dataIndex']],
            })
          }
        })
        return profitSharingList
      }
      const preservationCost = async () => {
        try {
          let profitSharing = getPreservation()
          if (!profitSharing) {
            return
          }
          let prarams = { id: route.query.id, profitSharing }
          const { code } = await adminHttp.GOODS.goodsInvestmentProfit(prarams)
          if (code === '20001') {
            createMessage.success('操作成功')
            switchCost.value = false
          }
        } catch (err) {
          createMessage.error(err.message)
        }
      }

      const areaSalesCode = ref([])
      const areaInfo = reactive({
        name: '',
        treeTitle: '',
        treeVisible: false,
        isNationwide: false,
      })
      const investArea = () => {
        areaInfo.treeTitle = '投资区域'
        areaInfo.treeVisible = true
        areaInfo.name = investmentDetailsData.value[0]['name']
        areaSalesCode.value = investCode.value
      }
      //销售区域
      const salesArea = () => {
        areaInfo.treeTitle = '销售区域'
        areaInfo.treeVisible = true
        areaInfo.name = personData.value.goodsName
        areaSalesCode.value = salesCode.value
      }

      //关闭
      const viewBack = () => {
        treeVisible.value = false
      }
      //编辑起投
      const editMinOrder = () => {
        investmentCost.value = true
      }
      //编辑限投
      const editMinLimit = () => {
        iLimitCost.value = true
      }
      //保存起投
      const editSave = (record) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })

        adminHttp
          .goodsInvestmentNumberSet({
            id: route.query.id,
            startNumber: startingPoint.value,
          })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            investmentCost.value = false
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      //保存限投
      const limitSave = (record) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })

        adminHttp
          .goodsInvestmentNumberSet({
            id: route.query.id,
            investmentLimit: limitPoint.value,
          })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            iLimitCost.value = false
            loadTableData()
          })
          .catch((err) => {
            // createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      const investmentSave = () => {
        investmentCost.value = false
        loadTableData()
      }
      const iLimitCostSave = () => {
        iLimitCost.value = false
        loadTableData()
      }
      //去审核
      const toAudit = () => {
        go.push({
          path: '/customerModule/supplier/suppierBrankOperation',
          query: {
            type: 2,
          },
        })
      }

      //校验规则
      const verification = () => {
        // 校验
        if (startingPoint.value) {
          if (Pattern.isIntNumber(startingPoint.value)) {
            if (startingPoint.value > limitPoint.value) {
              startingPoint.value = ''
            }
            return
          } else {
            startingPoint.value = ''
            return
          }
        } else if (limitPoint.value) {
          if (Pattern.isIntNumber(limitPoint.value)) {
            if (limitPoint.value < startingPoint.value) {
              limitPoint.value = ''
            }
            return
          } else {
            limitPoint.value = ''
            return
          }
        }
      }
      return {
        limitPoint,
        startingPoint,
        verification,
        investmentSave,
        iLimitCostSave,
        limitSave,
        editSave,
        editMinOrder,
        editMinLimit,
        warehouseExpenses,
        warehouseData,
        warehouseForm,
        warehouseExpensesKey,

        viewBack,
        getProfit,
        templateProfit,
        vehiclesData,
        detailsPic,
        detailsDesc,
        serviceConfig,
        serviceHosting,
        warrantyDays,
        investmentDesc,
        tableInputChange,
        inputForm,
        investmentProviderColumn,
        serviceProviderDetailsBasicInfoColumn,
        serviceProviderDetailsBasicInfoMockData,
        serviceProviderDetailsSaleColumn,
        serviceProviderDetailsSaleMockData,
        serviceProviderProfitSharing,
        serviceProviderProfitSharingKey,
        serviceProviderProfitSharingMockData,
        serviceProviderWarehouseOperationManagementColumn,
        serviceProviderWarehouseOperationManagementMockData,
        serviceProviderWarehouseInformationColumn,
        serviceProviderParamColumn,
        serviceProviderParamMockData,
        serviceProviderApplicableModelsColumn,
        serviceProviderApplicableModelsMockData,
        personData,
        personSchema,
        profitSharingMockData,
        //以下滑动
        current,
        visible,
        menuSetting,
        style,
        target,
        message,
        description,
        error,
        targetHandler,
        queryScroll,
        dingHandler,
        //以上滑动
        ...toRefs(stateDetail),
        ...toRefs(stateGinseng),
        ...toRefs(stateModels),
        // ...toRefs(stateFenRun),
        detailList,
        parameterList,
        modelsList,
        // FenRunTitle,
        onChange,
        choiceInitClassfy,
        formState,
        activeKey: ref('1'),
        ...toRefs(state),
        options,
        category: ref<string[]>(['发动机系列']),
        //2222
        serviceSaleColumn,
        tableData,
        tableLoading,
        commodityStatus,
        commodity,
        commodityDescription,
        serviceDetailsData,
        investmentDetailsData,
        approved,
        auditFailed,
        goodsStatus,
        violtionStatus,
        offShelf,
        putShelf,
        violation,
        openViolationModal,
        adaptationModelColumn,
        violationModal,
        violationValidateInfos,
        isAvailable,
        paramsColumn,
        paramsData,
        investmentCost,
        iLimitCost,
        showAuditModal,
        AuditSubmit,
        projectProfit,
        switchCost,
        preservationCost,
        projectForm,
        logVisible,
        operation,
        handleColumns,
        tableDataColumns,
        toAudit,
        brandStatus,

        areaSalesCode,

        salesCode,
        investCode,
        salesArea,
        investArea,

        areaInfo,
      }
    },
  })
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
    position: relative;

    .wrap-tabs {
      position: fixed;
    }

    .page-left {
      padding: 15px;
      transition: all 0.3s;
      width: 200px;
      position: absolute;
      left: 24px;
      top: 24px;
      z-index: 99;

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

      &.toggle {
        left: 70px;
      }

      .step-title {
        font-size: 16px;
        font-weight: 800;
        margin-top: 10px;
      }
    }

    .page-right {
      position: relative;
      margin-left: 230px;
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

  .listStyle {
    border-bottom: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    margin: 0;
  }
</style>
