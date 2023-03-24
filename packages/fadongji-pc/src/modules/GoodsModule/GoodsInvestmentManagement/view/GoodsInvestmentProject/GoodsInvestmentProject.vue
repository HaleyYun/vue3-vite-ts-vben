<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div>
      <div class="bg-white p-24px pb-4px mb-24px">
        <InvestmentFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="bg-white p-24px">
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit>
            <div class="buttons">
              <a-button
                type="primary"
                v-auth="'/v1/goods/investment/update/status'"
                v-if="activeKey == 'two'"
                :disabled="selectedRow.length == 0"
                class="margin-l-r-10"
                @click="openMultipleAuditDialog"
                >批量审核
              </a-button>
              <a-button
                type="primary"
                v-auth="'/v1/goods/investment/update/status'"
                v-if="activeKey == 'four'"
                :disabled="selectedRow.length == 0"
                class="margin-l-r-10"
                @click="batchShelvesDialog"
                >批量下架
              </a-button>
            </div>
          </template>
          <template #content>
            <ATable
              v-if="activeKey == 'four' || activeKey == 'five' || activeKey == 'seven'"
              :loading="tableLoading"
              :row-selection="rowSelection"
              :rowKey="(record) => record.id"
              :columns="tabColumns"
              :data-source="tableData"
              :pagination="false"
              size="small"
              :scroll="{ x: 1200 }"
              @change="handleTableChange"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'questionAndContent'">
                  <div class="rich-column">
                    <div class="rich-resource">
                      <FileUrlPrase :file-url="record.fileUrl" />
                    </div>
                    <div class="rich-content"> [{{ record.title }}] {{ record.content }}</div>
                  </div>
                </template>
                <!-- 平台服务费		-->
                <template v-if="column.dataIndex === 'platformService'">
                  <div>
                    <a>
                      {{ transferFee('platform', record.shareProfitInfo) }}
                    </a>
                    <span class="text-green-500">
                      <EditOutlined
                        style="color: #08a225; font-size: 16px; margin-left: 5px"
                        @click="editFeeHandler(record)"
                      />
                    </span>
                  </div>
                </template>
                <template v-if="column.dataIndex == 'investmentNum'">
                  {{ record.investmentNum }}/
                  {{ record.totalInvestment ? record.totalInvestment : '--' }}
                </template>
                <template v-if="column.dataIndex === 'nickNameAndMobile'">
                  <div class="rich-column">
                    <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                  </div>
                </template>
                <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                <template v-if="column.dataIndex === 'status'">
                  <span>{{ statusText[record.status + ',' + record.violationStatus] }}</span>
                </template>
                <template v-if="column.dataIndex === 'cashPrice'">
                  <div>{{ record.cashPrice }}元</div>
                  <div v-if="record.accountPeriodDays > 0"
                    >{{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                  </div>
                </template>
                <template v-if="column.dataIndex === 'rol'">
                  <span>{{ record.rol }}%</span>
                </template>
                <template v-if="column.dataIndex === 'shopName'">
                  <div>{{ record.shopName }}</div>
                  <div>{{ record.shopMobile }}</div>
                </template>
                <template v-if="column.dataIndex === 'submitterName'">
                  <div>{{ record.submitterName }}</div>
                  <div>{{ record.submitterMobile }}</div>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <template v-if="record.violationStatus === 3 && record.status === 2">
                    <AButton
                      v-auth="'/v1/goods/investment/update/status'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      去审核
                    </AButton>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <!-- 违规下架 -->
                  <template v-else-if="record.violationStatus === 1 && record.status === 4">
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <template v-else-if="record.status === 1 && record.violationStatus === 3">
                    <APopconfirm
                      title="确认下架？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="takeItDownEvent(record)"
                    >
                      <AButton v-auth="'/v1/goods/investment/update/status'" type="link"
                        >下架
                      </AButton>
                    </APopconfirm>
                    <!--<APopconfirm-->
                    <!--  title="确认违规下架？"-->
                    <!--  ok-text="确定"-->
                    <!--  cancel-text="取消"-->
                    <!--  @confirm="handlerAccessRow(record)"-->
                    <!--&gt;-->
                    <!--  <AButton type="link">违规下架</AButton>-->
                    <!--</APopconfirm>-->
                    <AButton
                      v-auth="'/v1/goods/investment/update/status'"
                      type="link"
                      @click="openViolationModal(record)"
                      >违规下架
                    </AButton>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <template v-else-if="record.status === 4 && record.violationStatus === 3">
                    <APopconfirm
                      title="确认上架？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="shelvesEvent(record)"
                    >
                      <AButton v-auth="'/v1/goods/investment/update/status'" type="link">
                        上架
                      </AButton>
                    </APopconfirm>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      查看详情
                    </AButton>
                  </template>
                  <template v-else>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      查看详情
                    </AButton>
                  </template>
                </template>
              </template>
            </ATable>
            <ATable
              v-else
              :loading="tableLoading"
              :row-selection="rowSelection"
              :rowKey="(record) => record.id"
              :columns="platformColumns"
              :data-source="tableData"
              :pagination="false"
              size="small"
              :scroll="{ x: 1200 }"
              @change="handleTableChange"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'questionAndContent'">
                  <div class="rich-column">
                    <div class="rich-resource">
                      <FileUrlPrase :file-url="record.fileUrl" />
                    </div>
                    <div class="rich-content"> [{{ record.title }}] {{ record.content }}</div>
                  </div>
                </template>
                <!-- 平台服务费		-->
                <template v-if="column.dataIndex === 'platformService'">
                  <div v-if="activeKey == 'four' || activeKey == 'five' || activeKey == 'seven'">
                    <a>
                      {{ transferFee('platform', record.shareProfitInfo) }}
                    </a>
                    <span class="text-green-500">
                      <EditOutlined
                        style="color: #08a225; font-size: 16px; margin-left: 5px"
                        @click="editFeeHandler(record)"
                      />
                    </span>
                  </div>
                  <div v-else>
                    <span>--</span>
                  </div>
                </template>
                <template v-if="column.dataIndex == 'investmentNum'">
                  {{ record.investmentNum }}/
                  {{ record.totalInvestment ? record.totalInvestment : '--' }}
                </template>
                <template v-if="column.dataIndex === 'nickNameAndMobile'">
                  <div class="rich-column">
                    <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                  </div>
                </template>
                <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                <template v-if="column.dataIndex === 'status'">
                  <span>{{ statusText[record.status + ',' + record.violationStatus] }}</span>
                </template>
                <template v-if="column.dataIndex === 'cashPrice'">
                  <div>{{ record.cashPrice }}元</div>
                  <div v-if="record.accountPeriodDays > 0"
                    >{{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                  </div>
                </template>
                <template v-if="column.dataIndex === 'rol'">
                  <span>{{ record.rol }}%</span>
                </template>
                <template v-if="column.dataIndex === 'shopName'">
                  <div>{{ record.shopName }}</div>
                  <div>{{ record.shopMobile }}</div>
                </template>
                <template v-if="column.dataIndex === 'submitterName'">
                  <div>{{ record.submitterName }}</div>
                  <div>{{ record.submitterMobile }}</div>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <template v-if="record.violationStatus === 3 && record.status === 2">
                    <AButton
                      v-auth="'/v1/goods/investment/update/status'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      去审核
                    </AButton>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <!-- 违规下架 -->
                  <template v-else-if="record.violationStatus === 1 && record.status === 4">
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <template v-else-if="record.status === 1 && record.violationStatus === 3">
                    <APopconfirm
                      title="确认下架？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="takeItDownEvent(record)"
                    >
                      <AButton v-auth="'/v1/goods/investment/update/status'" type="link"
                        >下架
                      </AButton>
                    </APopconfirm>
                    <!--<APopconfirm-->
                    <!--  title="确认违规下架？"-->
                    <!--  ok-text="确定"-->
                    <!--  cancel-text="取消"-->
                    <!--  @confirm="handlerAccessRow(record)"-->
                    <!--&gt;-->
                    <!--  <AButton type="link">违规下架</AButton>-->
                    <!--</APopconfirm>-->
                    <AButton
                      v-auth="'/v1/goods/investment/update/status'"
                      type="link"
                      @click="openViolationModal(record)"
                      >违规下架
                    </AButton>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                      >查看详情
                    </AButton>
                  </template>
                  <template v-else-if="record.status === 4 && record.violationStatus === 3">
                    <APopconfirm
                      title="确认上架？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="shelvesEvent(record)"
                    >
                      <AButton v-auth="'/v1/goods/investment/update/status'" type="link">
                        上架
                      </AButton>
                    </APopconfirm>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      查看详情
                    </AButton>
                  </template>
                  <template v-else>
                    <AButton
                      v-auth="'/v1/goods/investment'"
                      type="link"
                      @click="viewDetailsFunc(record)"
                    >
                      查看详情
                    </AButton>
                  </template>
                </template>
              </template>
            </ATable>
          </template>
          <template #pagination>
            <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
            />
          </template>
        </EraSwitchTable>
      </div>
      <!--批量下架-->
      <ShelevesModal v-model:visible="shelevesVisible" @change="shelevesChange" />
      <!--违规-->
      <AModal
        title="违规下架"
        :zIndex="1001"
        centered
        v-model:visible="violationModal.visible"
        :confirm-loading="violationModal.confirmLoading"
        @ok="handlerAccessRow"
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
        <!--<div class="padding-10">-->
        <!--  <a-textarea-->
        <!--    v-model:value="violationModal.rejectReason"-->
        <!--    :auto-size="{ minRows: 2, maxRows: 5 }"-->
        <!--    placeholder="请输入违规下架原因"-->
        <!--    :maxlength="100"-->
        <!--  />-->
        <!--</div>-->
      </AModal>
      <!--批量审核-->
      <AModal
        v-model:visible="multipleAuditDialog.visible"
        :title="multipleAuditDialog.title"
        centered
        destroy-on-close
        width="900px"
        :confirm-loading="multipleAuditDialog.confirmLoading"
        @ok="multipleAuditHandler"
        @cancel="restMultipleAuditDialog"
      >
        <div class="p-5">
          <AForm :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <AFormItem label="审核结果" v-bind="multipleValidateInfos.flag">
              <a-radio-group v-model:value="multipleAuditDialog.flag">
                <a-radio :value="true">审核通过</a-radio>
                <a-radio :value="false">审核不通过</a-radio>
              </a-radio-group>
            </AFormItem>
            <AFormItem
              v-if="!multipleAuditDialog.flag"
              v-bind="multipleValidateInfos.reason"
              required
              label="审核不通过原因"
            >
              <ATextarea
                v-model:value="multipleAuditDialog.reason"
                placeholder="请输入原因"
                :rows="5"
              />
            </AFormItem>
            <AFormItem
              v-if="multipleAuditDialog.flag"
              v-bind="multipleValidateInfos.profitSharingRows"
              required
              label="分润信息"
            >
              <ARow :gutter="16">
                <ACol :span="8" v-for="(domain, idx) in multipleAuditDialog.profitSharingRows">
                  <AFormItem
                    :key="idx"
                    labelAlign="left"
                    :label="domain.name"
                    :label-col="{ span: 10 }"
                  >
                    <AInputNumber
                      v-model:value="domain.value"
                      decimalSeparator="."
                      :precision="2"
                      :max="9999999999"
                      placeholder="请输入"
                      addon-after="元"
                    />
                  </AFormItem>
                </ACol>
              </ARow>
            </AFormItem>
          </AForm>
        </div>
      </AModal>
    </div>
  </div>
  <ProfitModel
    v-if="operateRow"
    :id="operateRow.id"
    :cashPrice="operateRow.cashPrice"
    :shareProfitInfo="operateRow.shareProfitInfo"
    v-model:visible="feeVisible"
    @success="loadTableData"
  />
 </div>
</template>
<script setup lang="ts">
  import { reactive, ref, toRaw, nextTick } from 'vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Form } from 'ant-design-vue'
  import ShelevesModal from '/@/modules/GoodsModule/GoodsManage/component/ShelvesModal.vue'
  import { investmentFiterColumns ,platformFiterColumns} from '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/data/investmentFiterColumns'
  import adminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import InvestmentFilterForm from '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/components/investmentFilterForm.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'
  import { Pattern, VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import ProfitModel from './components/ProfitModel.vue'
  import { EditOutlined } from '@ant-design/icons-vue'

  const go = useRouter()
  const operateRow = ref<any>(null)
  const feeVisible = ref(false)
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部项目', totalCount: 0 },
    { key: 'two', name: '待审核', totalCount: 0 },
    { key: 'three', name: '审核未通过', totalCount: 0 },
    { key: 'four', name: '进行中', totalCount: 0 },
    { key: 'five', name: '已下架', totalCount: 0 },
    { key: 'six', name: '已完成', totalCount: 0 },
    { key: 'seven', name: '违规', totalCount: 0 },
  ])

  const { createMessage } = useMessage()

  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'

  // let commodityStatus = <any>ref()
  // let commodity = <any>ref()
  // let commodityDescription = <any>ref()
  //查看详情 /v1/goods/goods/{id}
  const viewDetailsFunc = (record) => {
    console.log('列表的投资id===>', record.id)
    go.push({
      path: '/goodsManage/goods/goodsInvestment',
      query: {
        id: record.id,
      },
    })
  }
  // 全选
  const selectedRow = ref([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectedRow.value = selectedRowKeys
    },
  }

  // ---批量下架--------
  const shelevesVisible = ref(false)
  const batchShelvesDialog = () => {
    shelevesVisible.value = true
  }
  //批量下架确认框
  const shelevesChange = (reason) => {
    adminHttp
      .goodsInvestmentUpdateStatus({
        id: selectedRow.value,
        status: 2,
        violationStatus: 3,
        reason: reason,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        shelevesVisible.value = false
        selectedRow.value = []
        initData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  /**--------- 批量审核 start------------- **/

  interface profitItem {
    key: string
    name?: string
    type: number
    value: number
  }

  interface multipleAuditDialogInterface {
    visible: boolean
    title: string
    profitSharingRows: profitItem[]
    reason: string
    flag: boolean
    confirmLoading: boolean
  }

  //校验批量设置
  let validateProfitSharingRows = async (_rule, _value) => {
    if (
      multipleAuditDialog.flag &&
      multipleAuditDialog.profitSharingRows.filter(({ value }) => value == null).length > 0
    ) {
      return Promise.reject('分润信息不能为空')
    } else if (
      multipleAuditDialog.flag &&
      multipleAuditDialog.profitSharingRows.filter(
        ({ value }) => !Pattern.isPositiveNumber(String(value)),
      ).length > 0
    ) {
      return Promise.reject('分润信息填写错误')
    } else {
      return Promise.resolve()
    }
  }
  let validateReason = async (rule, value) => {
    if (!multipleAuditDialog.flag && value.trim() === '') {
      return Promise.reject('不通过原因必填')
    } else {
      return Promise.resolve()
    }
  }
  const multipleAuditFormRules = reactive({
    flag: [
      {
        required: true,
        trigger: 'change',
        message: '审核结果必选',
      },
    ],
    reason: [
      {
        validator: validateReason,
        trigger: 'change',
      },
    ],
    profitSharingRows: [
      {
        validator: validateProfitSharingRows,
      },
    ],
  })

  let multipleAuditDialog = reactive<multipleAuditDialogInterface>({
    visible: false,
    title: '批量审核',
    profitSharingRows: [],
    reason: '',
    flag: true,
    confirmLoading: false,
  })
  const {
    resetFields: multipleAuditRest,
    validate: multipleValidate,
    validateInfos: multipleValidateInfos,
  } = Form.useForm(multipleAuditDialog, multipleAuditFormRules, {
    // onValidate: (...args) => console.log(...args),
  })

  const goodsTemplateProfit = async () => {
    try {
      const { data } = await adminHttp.GOODS.goodsInvestmentProfitRole()

      multipleAuditDialog.profitSharingRows = data.map((item) => {
        // multipleAuditDialog.priceFormObj[item.key] = price
        return {
          ...item,
          value: null,
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const openMultipleAuditDialog = () => {
    if (VoUtils.checkIsEmpty(multipleAuditDialog.profitSharingRows)) goodsTemplateProfit()
    multipleAuditDialog.visible = true
  }

  const restMultipleAuditDialog = () => {
    // selectedRow.value = []
    multipleAuditDialog.visible = false
    multipleAuditDialog.profitSharingRows = []
    multipleAuditDialog.reason = ''
    multipleAuditDialog.flag = true
    multipleAuditDialog.confirmLoading = false
  }
  //批量审核通过
  const multipleAuditHandler = async () => {
    try {
      const formData = await multipleValidate().then(() => {
        return toRaw(multipleAuditDialog)
      })

      let postData: any = {
        id: selectedRow.value,
        status: formData.flag ? 3 : 4, // 3审核通过 4审核不通过
      }
      if (!formData.flag) {
        postData.reason = formData.reason
        postData.profitSharing = []
      } else {
        postData.profitSharing = formData.profitSharingRows.map((item: any) => {
          const { name, ...info } = item
          return info
        })
      }

      multipleAuditDialog.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const { code } = await adminHttp.goodsInvestmentUpdateStatus(postData)
      if (code === '20001') {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      }
      restMultipleAuditDialog()
      await initData()
    } catch (err: any) {
      createMessage.error({ content: err.message, key: loadingCtxkey })
      console.log(err)
    } finally {
      multipleAuditDialog.confirmLoading = false
    }
  }

  /**--------- 批量审核 end------------- **/

  /** 违规下架start **/
  //驳回
  const violationModal = reactive({
    visible: false,
    currentItem: {},
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
    type: 1,
  })

  const openViolationModal = (item) => {
    violationModal.currentItem = { ...item }
    violationModal.currentId = item.id
    violationModal.rejectReason = ''
    violationModal.visible = true
  }

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

  const restViolationModal = () => {
    violationModal.visible = false
    violationModal.currentItem = {}
    violationModal.rejectReason = ''
  }

  //违规下架/v1/goods/goods/violation
  const handlerAccessRow = async () => {
    try {
      // console.log(record, '违规下架')

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
        id: [formData.currentId],
        type: formData.type,
        status: 5,
        reason: formData.rejectReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      restViolationModal()
      loadTableData()
    } catch ({ message }) {
      if (message !== 'form validate fail')
        createMessage.error({ content: `操作失败:${message}`, key: loadingCtxkey })
    } finally {
      violationModal.confirmLoading = false
    }

    // const formData = await violationValidate().then(() => {
    //   return toRaw(violationModal)
    // })
    // const record = formData.currentItem
  }

  /** 违规下架 end **/

  //上架
  const shelvesEvent = (record) => {
    console.log(record, '上架')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsInvestmentUpdateStatus({
        id: [record.id],
        status: 1,
        violationStatus: record.violationStatus,
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
  //下架
  const takeItDownEvent = (record) => {
    console.log(record, '下架')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsInvestmentUpdateStatus({
        id: [record.id],
        status: 2,
        violationStatus: record.violationStatus,
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

  const filterData = ref({
    orderProperty: 'update_time',
    orderType: 'DESC',
  })
  const handlerFilterRest = ({}) => {
    paginations.current = 1
    filterData.value = {
      orderProperty: 'update_time',
      orderType: activeKey.value == 'two' ? 'ASC' : 'DESC',
    }
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = {
      ...values,
      categoryId: values.categoryId ? values.categoryId[1] : '',
      warehouseId: values?.warehouseId?.key,
      orderProperty: 'update_time',
      orderType: activeKey.value == 'two' ? 'ASC' : 'DESC',
    }
    paginations.current = 1
    loadTableData()
  }

  // table 列
  const tabColumns = ref(investmentFiterColumns)
  const platformColumns = ref(platformFiterColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  const tabsChange = (key) => {
    activeKey.value = key
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    filterData.value = {
      orderProperty: 'update_time',
      orderType: activeKey.value == 'two' ? 'ASC' : 'DESC',
    }
    loadTableData()
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    filterData.value.orderProperty = sorter.field
    if (sorter.field == 'brandName') {
      filterData.value.orderProperty = 'brand_id'
    }
    if (sorter.field == 'shopName') {
      filterData.value.orderProperty = 'shop_id'
    }
    if (sorter.field == 'cashPrice') {
      filterData.value.orderProperty = 'cash_price'
    }
    if (sorter.field == 'updateTime') {
      filterData.value.orderProperty = 'update_time'
    }
    if (activeKey.value == 'two') {
      filterData.value.orderType = sorter.order == 'descend' ? 'DESC' : 'ASC'
    } else {
      filterData.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'
    }
    loadTableData()
  }
  //初始/v1/goods/investment/query/list/page
  const statusAttrs = { two: [2], three: [3], four: [1], five: [4], six: [5] }
  const violationAttrs = { two: [3], three: [3], four: [3], five: [3], six: [3], seven: [1, 2] }
  const statusText = {
    '2,3': '待审核',
    '3,3': '审核未通过',
    '1,3': '进行中',
    '4,3': '已下架',
    '1,2': '违规',
    '4,1': '违规',
    '5,3': '已完成',
  }
  // const violationAttrs = { one: 0, two: 3, three: 3, four: 1 }
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams: any = {
      ...filterData.value,
      // 状态 状态 1：已上架   2：待审核 3：审核未通过 4：已下架  5：已完成
      statusList: activeKey.value == 'one' ? undefined : statusAttrs[activeKey.value],
      //违规状态 违规状态 1：已违规  2：违规审核 3：未违规
      violationStatusList: activeKey.value == 'one' ? undefined : violationAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    if (filterParams.violationTime) {
      filterParams.logGreateStartTime = filterParams.violationTime[0] + ' 00:00:00'
      filterParams.logGreateEndTime = filterParams.violationTime[1] + ' 23:59:59'
    }
    if (filterParams.updateTime) {
      filterParams.updateStartTime = filterParams.updateTime[0] + ' 00:00:00'
      filterParams.updateEndTime = filterParams.updateTime[1] + ' 23:59:59'
    }
    ///v1/goods/investment/query/list/page
    const { records, total } = await adminHttp
      .goodsInvestmentQueryListPage(filterParams)
      .then((res) => {
        //res?.data?.records)
        if (res && res.data && res.data.records) {
          return res.data
        } else {
          return {
            records: [],
            total: 0,
          }
        }
      })
      .catch((err) => {
        // console.log(err)
        console.log(`获取服务商列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
    console.log(tableData.value, '投资列表')
  }
  //投资角标/v1/goods/investment/list/count
  const handlerOrderStatus = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.goodsInvestmentListCount()
      tabsList.value[1].totalCount = res.data.waitingAudit //待审核
      tabsList.value[2].totalCount = res.data.auditFail //审核未通过
      tabsList.value[3].totalCount = res.data.onGoing //进行中
      tabsList.value[4].totalCount = res.data.down //已下架
      tabsList.value[5].totalCount = res.data.complete //已完成
      tabsList.value[6].totalCount = res.data.violated //违规
      let whole =
        parseInt(res.data.waitingAudit) +
        parseInt(res.data.auditFail) +
        parseInt(res.data.onGoing) +
        parseInt(res.data.down) +
        parseInt(res.data.complete) +
        parseInt(res.data.violated)
      tabsList.value[0].totalCount = whole
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }
  const initData = async () => {
    await handlerOrderStatus()
    await loadTableData()
  }
  onMountedOrActivated(async () => {
    await handlerOrderStatus()
    await loadTableData()
  })

  const editFeeHandler = (row) => {
    console.log(row, 'rowrowrowrowrow')
    operateRow.value = row
    nextTick(() => {
      feeVisible.value = true
    })
  }

  const transferFee = (key, list) => {
    if (!Array.isArray(list)) {
      return 0
    }
    const target = list.find((item) => {
      return item.key === key
    })
    if (target) {
      return +target.value
    }
    return 0
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }

  .table-list {
    .table-list-title {
      display: flex;
      padding: 10px;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
  }

  .rich-column {
    display: flex;

    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
    }

    .rich-content {
    }
  }
</style>
