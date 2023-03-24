<template>
  <div>
    <GoodsTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange"></GoodsTabs>
    <div class="page-wrap">
      <div class="filter-form">
        <ApplyFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="page-containner">
        <div class="page-container">
          <EraSwitchTable :total="paginations.total">
            <template #tableEdit>
              <div class="buttons">
                <a-button
                  type="primary"
                  v-auth="'/v1/goods/goods/audit'"
                  v-if="activeKey === 'two'"
                  :disabled="selectedRow.length === 0"
                  class="margin-l-r-10"
                  @click="openMultipleAuditDialog"
                  >批量审核
                </a-button>
                <a-button
                  type="primary"
                  v-auth="'/v1/goods/goods/status/update'"
                  v-if="activeKey === 'four'"
                  :disabled="selectedRow.length === 0"
                  class="margin-l-r-10"
                  @click="batchShelvesDialog"
                  >批量下架
                </a-button>
              </div>
            </template>
            <template #content>
              <ATable
                v-if="activeKey == 'four' || activeKey == 'five' || activeKey == 'six'"
                :loading="tableLoading"
                :columns="getColums(activeKey)"
                :data-source="tableData"
                :pagination="false"
                size="small"
                :scroll="{ x: 1200 }"
                bordered
                @change="handleTableChange"
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
                  <template v-if="column.dataIndex === 'label'">
                    <div class="py-2px" v-for="(item, index) in record.labelMap" :key="index">
                      <a-tag  color="#1890ff">{{ item ==='质保时长'? record.warrantyDays +'个月'+'质保时长' : item}}</a-tag>
                      </div>
                  </template>
                  <template v-if="column.dataIndex === 'nickNameAndMobile'">
                    <div class="rich-column">
                      <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'shopName'">
                    <div class="whitespace-normal break-all">
                      <div class="rich-content">{{ record.shopName }}</div>
                      <div class="rich-content">{{ record.shopMobile }}</div>
                    </div>
                  </template>
                  <!--价格-->
                  <template v-if="column.dataIndex == 'cash_price'">
                    {{ record.cashPrice }}元
                    <div v-if="record.accountPeriodDays != 0">
                      {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                    </div>
                  </template>

                  <template v-if="column.dataIndex === 'availableNumber'">
                    <a v-if="record.availableNumber" @click="showAvailable(record)">
                      {{ record.availableNumber }}</a
                    >
                    <span v-else>--</span>
                  </template>
                  <!--提交人-->
                  <template v-if="column.dataIndex === 'submitterName'">
                    <div>{{ record.submitterName }}</div>
                    <div>{{ record.submitterMobile }}</div>
                  </template>
                  <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                  <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                  <template v-if="column.dataIndex === 'status'">
                    <span>
                      {{ statusText[record.status + ',' + record.violationStatus] }}
                    </span>
                  </template>
                  <!-- 平台服务费-->
                  <template v-if="column.dataIndex === 'platformFee'">
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
                  <!-- 推荐费		-->
                  <template v-if="column.dataIndex === 'recommendFee'">
                    <div>
                      <a>
                        {{ transferFee('recommender', record.shareProfitInfo) }}
                      </a>
                      <span class="text-green-500">
                        <EditOutlined
                          style="color: #08a225; font-size: 16px; margin-left: 5px"
                          @click="editFeeHandler(record)"
                        />
                      </span>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'operation'">
                    <!-- 违规 -->
                    <template
                      v-if="
                        record.violationStatus != 3 ||
                        (record.status === 3 && record.violationStatus === 3)
                      "
                    >
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <!-- 待审核 -->
                    <template v-if="record.violationStatus === 3 && record.status === 2">
                      <AButton
                        v-auth="'/v1/goods/goods/audit'"
                        type="link"
                        size="small"
                        @click="toCheckPage(record)"
                      >
                        去审核
                      </AButton>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 1 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认下架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="takeItDownEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">下架</AButton>
                      </APopconfirm>

                      <AButton
                        v-auth="'/v1/goods/goods/violation'"
                        type="link"
                        size="small"
                        @click="addOrder(record)"
                      >
                        违规下架
                      </AButton>

                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 4 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认上架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="shelvesEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">上架</AButton>
                      </APopconfirm>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        @click.stop="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                  </template>
                </template>
              </ATable>
              <ATable
                v-else-if="activeKey == 'two'"
                :loading="tableLoading"
                :row-selection="rowSelection"
                :rowKey="(record) => record.id"
                :columns="platformColumns(activeKey)"
                :data-source="tableData"
                :pagination="false"
                size="small"
                :scroll="{ x: 1200 }"
                bordered
                @change="handleTableChange"
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
                  <template v-if="column.dataIndex === 'nickNameAndMobile'">
                    <div class="rich-column">
                      <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'label'">
                      <div class="py-2px" v-for="(item, index) in record.labelMap" :key="index">
                        <a-tag  color="#1890ff">{{ item ==='质保时长'? record.warrantyDays + '个月' + '质保时长' : item}}</a-tag>
                      </div>
                  </template>
                  <template v-if="column.dataIndex === 'shopName'">
                    <div class="whitespace-normal break-all">
                      <div class="rich-content">{{ record.shopName }}</div>
                      <div class="rich-content">{{ record.shopMobile }}</div>
                    </div>
                  </template>
                  <!--价格-->
                  <template v-if="column.dataIndex == 'cash_price'">
                    {{ record.cashPrice }}元
                    <div v-if="record.accountPeriodDays != 0">
                      {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                    </div>
                  </template>

                  <template v-if="column.dataIndex === 'availableNumber'">
                    <a v-if="record.availableNumber" @click="showAvailable(record)">
                      {{ record.availableNumber }}</a
                    >
                    <span v-else>--</span>
                  </template>
                  <!--提交人-->
                  <template v-if="column.dataIndex === 'submitterName'">
                    <div>{{ record.submitterName }}</div>
                    <div>{{ record.submitterMobile }}</div>
                  </template>
                  <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                  <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                  <template v-if="column.dataIndex === 'status'">
                    <span>
                      {{ statusText[record.status + ',' + record.violationStatus] }}
                    </span>
                  </template>
                  <template v-if="column.dataIndex === 'operation'">
                    <!-- 违规 -->
                    <template
                      v-if="
                        record.violationStatus != 3 ||
                        (record.status === 3 && record.violationStatus === 3)
                      "
                    >
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <!-- 待审核 -->
                    <template v-if="record.violationStatus === 3 && record.status === 2">
                      <AButton
                        v-auth="'/v1/goods/goods/audit'"
                        type="link"
                        size="small"
                        @click="toCheckPage(record)"
                      >
                        去审核
                      </AButton>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 1 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认下架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="takeItDownEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">下架</AButton>
                      </APopconfirm>

                      <AButton
                        v-auth="'/v1/goods/goods/violation'"
                        type="link"
                        size="small"
                        @click="addOrder(record)"
                      >
                        违规下架
                      </AButton>

                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 4 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认上架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="shelvesEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">上架</AButton>
                      </APopconfirm>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        @click.stop="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                  </template>
                </template>
              </ATable>
              <ATable
                v-else
                :loading="tableLoading"
                :columns="platformColumns(activeKey)"
                :data-source="tableData"
                :pagination="false"
                size="small"
                :scroll="{ x: 1200 }"
                bordered
                @change="handleTableChange"
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
                  <template v-if="column.dataIndex === 'nickNameAndMobile'">
                    <div class="rich-column">
                      <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'label'">
                      <div class="py-2px" v-for="(item, index) in record.labelMap" :key="index">
                        <a-tag  color="#1890ff">{{ item ==='质保时长'? record.warrantyDays + '个月' + '质保时长' : item}}</a-tag>
                      </div>
                  </template>
                  <template v-if="column.dataIndex === 'shopName'">
                    <div class="whitespace-normal break-all">
                      <div class="rich-content">{{ record.shopName }}</div>
                      <div class="rich-content">{{ record.shopMobile }}</div>
                    </div>
                  </template>
                  <!--价格-->
                  <template v-if="column.dataIndex == 'cash_price'">
                    {{ record.cashPrice }}元
                    <div v-if="record.accountPeriodDays != 0">
                      {{ record.accountPeriodDays }}天账期{{ record.accountPrice }}元
                    </div>
                  </template>

                  <template v-if="column.dataIndex === 'availableNumber'">
                    <a v-if="record.availableNumber" @click="showAvailable(record)">
                      {{ record.availableNumber }}</a
                    >
                    <span v-else>--</span>
                  </template>
                  <!--提交人-->
                  <template v-if="column.dataIndex === 'submitterName'">
                    <div>{{ record.submitterName }}</div>
                    <div>{{ record.submitterMobile }}</div>
                  </template>
                  <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                  <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                  <template v-if="column.dataIndex === 'status'">
                    <span>
                      {{ statusText[record.status + ',' + record.violationStatus] }}
                    </span>
                  </template>
                  <template v-if="column.dataIndex === 'operation'">
                    <!-- 违规 -->
                    <template
                      v-if="
                        record.violationStatus != 3 ||
                        (record.status === 3 && record.violationStatus === 3)
                      "
                    >
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <!-- 待审核 -->
                    <template v-if="record.violationStatus === 3 && record.status === 2">
                      <AButton
                        v-auth="'/v1/goods/goods/audit'"
                        type="link"
                        size="small"
                        @click="toCheckPage(record)"
                      >
                        去审核
                      </AButton>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                      >
                        查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 1 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认下架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="takeItDownEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">下架</AButton>
                      </APopconfirm>

                      <AButton
                        v-auth="'/v1/goods/goods/violation'"
                        type="link"
                        size="small"
                        @click="addOrder(record)"
                      >
                        违规下架
                      </AButton>

                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        size="small"
                        @click="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                    <template v-if="record.status === 4 && record.violationStatus === 3">
                      <APopconfirm
                        title="确认上架？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="shelvesEvent(record)"
                      >
                        <AButton v-auth="'/v1/goods/goods/status/update'" type="link">上架</AButton>
                      </APopconfirm>
                      <AButton
                        v-auth="'/v1/goods/goods'"
                        type="link"
                        @click.stop="viewDetailsFunc(record)"
                        >查看详情
                      </AButton>
                    </template>
                  </template>
                </template>
              </ATable>
            </template>

            <template #pagination>
              <VoPagination
                :size="'default'"
                :total="paginations.total"
                :current="paginations.current"
                :page-size="paginations.pageSize"
                @pagination="paginationChange"
              />
            </template>
          </EraSwitchTable>
        </div>
      </div>
      <AModal
        v-model:visible="brandModal.visible"
        :title="brandModal.title"
        centered
        destroy-on-close
        :confirm-loading="brandModal.confirmLoading"
        @ok="BrandsAdd"
        @cancel="BrandsCancel"
      >
        <div class="p-5">
          <AForm
            ref="formRef"
            :model="formState"
            name="basic"
            autocomplete="off"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 20 }"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <AFormItem label="商品名称">
              <span>{{ brandModal.currentItem.name }}</span>
            </AFormItem>
            <AFormItem
              label="选择违规类型"
              name="radioGroup"
              :rules="[{ required: true, message: '请选择违规类型' }]"
            >
              <a-radio-group v-model:value="formState['radioGroup']" @change="formRadio($event)">
                <a-radio value="1">全网违规</a-radio>
                <a-radio value="2">独立违规</a-radio>
              </a-radio-group>
            </AFormItem>
            <AFormItem
              label="具体违规说明"
              class="text-current"
              name="replyValue"
              :rules="[{ required: true, message: '请填写具体违规说明' }]"
            >
              <ATextarea
                v-model:value.trim="formState.replyValue"
                placeholder="请填写具体违规说明"
                :rows="6"
              />
            </AFormItem>
          </AForm>
        </div>
      </AModal>
      <!--批量下架-->
      <ShelevesModal v-model:visible="shelevesVisible" @change="shelevesChange"></ShelevesModal>
      <!--库存-->
      <stockModel ref="inventory"></stockModel>
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
  <supplierModel
    v-if="operateRow"
    :id="operateRow.id"
    :cashPrice="operateRow.cashPrice"
    :shareProfitInfo="operateRow.shareProfitInfo"
    v-model:visible="feeVisible"
    @success="loadTableData"
  />
</template>
<script setup name="GoodsApply" lang="ts">
  import {
    nextTick,
    reactive,
    ref,
    watch,
    watchEffect,
    toRaw,
    onBeforeMount,
    createVNode,
  } from 'vue'
  import { Form, Modal } from 'ant-design-vue'

  const useForm = Form.useForm
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import stockModel from '/@/modules/GoodsModule/GoodsManage/component/stockModel.vue'
  import { getColums, platformColumns } from '../GoodsApply/data/ApplyFiterColumns'

  import ShelevesModal from '/@/modules/GoodsModule/GoodsManage/component/ShelvesModal.vue'
  import ApplyFilterForm from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/components/ApplyFilterForm.vue'
  import GoodsTabs from '/@/modules/GoodsModule/GoodsManage/view/GoodsApply/components/GoodsTabs.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter, useRoute } from 'vue-router'
  import { Pattern, VoUtils } from '@vocen/shared'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { onBeforeMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { EditOutlined } from '@ant-design/icons-vue'
  import supplierModel from './components/supplierModel.vue'

  const go = useRouter()
  const route = useRoute()
  const activeKey = ref('one')
  const operateRow = ref<any>(null)
  const feeVisible = ref(false)

  const { createMessage } = useMessage()
  const tabsList = ref([
    { key: 'one', name: '全部商品' },
    { key: 'two', name: '待审核', totalCount: 0 },
    { key: 'three', name: '审核未通过', totalCount: 0 },
    { key: 'four', name: '在售', totalCount: 0 },
    { key: 'five', name: '待售', totalCount: 0 },
    { key: 'six', name: '违规', totalCount: 0 },
  ])
  const getGoodsGoodsListCount = async () => {
    try {
      const filterCount = { shopId: route.query?.shopId }
      const { code, data } = await adminHttp.GOODS.goodsGoodsListCount(filterCount)
      if (code === '20001') {
        tabsList.value[1]['totalCount'] = data.waitingAudit
        tabsList.value[2]['totalCount'] = data.auditFail
        tabsList.value[3]['totalCount'] = data.onSale
        tabsList.value[4]['totalCount'] = data.waitingSale
        tabsList.value[5]['totalCount'] = data.violated
      }
    } catch (e) {}
  }
  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'

  interface tableListRow {
    id: string
  }

  const selectedRow = ref<tableListRow[]>([])

  // 全选
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: tableListRow[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      selectedRow.value = selectedRows
    },
    getCheckboxProps: (record) => ({
      disabled: !record.brandStatus,
    }),
  }

  // ---批量下架--------
  const shelevesVisible = ref(false)
  const batchShelvesDialog = () => {
    shelevesVisible.value = true
  }
  //批量下架确认框
  const shelevesChange = (reason) => {
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: selectedRow.value.map((item) => item.id),
        status: 4,
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

  //驳回
  const rejectModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  /** 批量审核 start **/

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

  let multipleAuditDialog = reactive<multipleAuditDialogInterface>({
    visible: false,
    title: '批量审核',
    profitSharingRows: [],
    reason: '',
    flag: true,
    confirmLoading: false,
  })

  const goodsTemplateProfit = async () => {
    const { data } = await adminHttp.goodsTemplateGetProfit()
    //脏数据，有null的情况

    multipleAuditDialog.profitSharingRows = data.map((item) => {
      const price = item.value ? item.value : null
      // multipleAuditDialog.priceFormObj[item.key] = price
      return {
        ...item,
        value: price,
      }
    })
  }

  const openMultipleAuditDialog = () => {
    if (selectedRow.value.length < 1) {
      createMessage.error('请至少选中一行记录')
      return
    }
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
    selectedRow.value = []
  }

  let validateReason = async (rule, value) => {
    if (!multipleAuditDialog.flag && value.trim() === '') {
      return Promise.reject('不通过原因必填')
    } else {
      return Promise.resolve()
    }
  }

  //校验批量设置
  let validateProfitSharingRows = async (_rule, _value) => {
    if (
      multipleAuditDialog.flag &&
      multipleAuditDialog.profitSharingRows.filter(({ value }) => value === null).length > 0
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

  const {
    resetFields: multipleAuditRest,
    validate: multipleValidate,
    validateInfos: multipleValidateInfos,
  } = useForm(multipleAuditDialog, multipleAuditFormRules, {
    // onValidate: (...args) => console.log(...args),
  })

  interface goodsAuditGoodsItem {
    id: number
    isAvailable: boolean
  }

  interface goodsAuditPostData {
    audits: goodsAuditGoodsItem[]
    flag: boolean
    reason?: string
    profitSharing?: profitItem[]
  }

  //批量审核通过
  const multipleAuditHandler = async () => {
    if (multipleAuditDialog.flag) {
      try {
        const formData = await multipleValidate().then(() => {
          return toRaw(multipleAuditDialog)
        })

        let postData: goodsAuditPostData = {
          audits: selectedRow.value.map((item) => ({ id: item.id, isAvailable: item.isAvailable })),
          flag: formData.flag,
        }
        if (!formData.flag) {
          postData.reason = formData.reason
          postData.profitSharing = []
        } else {
          postData.profitSharing = formData.profitSharingRows.map((item) => {
            const { name, ...info } = item
            return info
          })
        }

        multipleAuditDialog.confirmLoading = true
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })

        await adminHttp.goodsGoodsDistributionAudit(postData)

        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        restMultipleAuditDialog()
        await initData()
      } catch (err) {
        console.log(err)
      } finally {
        multipleAuditDialog.confirmLoading = false
      }
    } else {
      try {
        const formData = await multipleValidate().then(() => {
          return toRaw(multipleAuditDialog)
        })

        let postData: goodsAuditPostData = {
          audits: selectedRow.value.map((item) => ({ id: item.id, isAvailable: item.isAvailable })),
          flag: formData.flag,
        }
        if (!formData.flag) {
          postData.reason = formData.reason
          postData.profitSharing = []
        } else {
          postData.profitSharing = formData.profitSharingRows.map((item) => {
            const { name, ...info } = item
            return info
          })
        }

        multipleAuditDialog.confirmLoading = true
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })

        await adminHttp.goodsGoodsAudit(postData)

        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        restMultipleAuditDialog()
        await initData()
      } catch (err) {
        console.log(err)
      } finally {
        multipleAuditDialog.confirmLoading = false
      }
    }
  }

  /** 批量审核 end **/

  //查看详情 /v1/goods/goods/{id}
  const toCheckPage = (record) => {
    console.log(record, '审核')
    go.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: {
        id: record.id,
        check: 1,
      },
    })
  }
  let goodsReason = <any>ref('')
  let goodsName = <any>ref('')

  const viewDetailsFunc = (record) => {
    console.log(record, '查看详情')
    go.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: {
        id: record.id,
        check: 0,
      },
    })
  }
  const formState = reactive<FormState>({
    replyValue: '',
    radioGroup: '',
  })

  interface FormState {
    replyValue: string
    radioGroup: any
  }

  //违规审核弹窗状态
  const brandModal = reactive({
    visible: false,
    title: '审核详情',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  const formRef = ref<any | undefined>()
  const inventory = ref()
  //审核确认框
  const BrandsAdd = () => {
    formRef.value.validate().then((res) => {
      console.log(res, 'success')
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      // /v1/goods/brand/apply/audit
      adminHttp
        .goodsGoodsViolation({
          id: categoryID,
          type: formState.radioGroup,
          reason: formState.replyValue,
        })
        .then(() => {
          initData()
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          brandModal.visible = false
          formState.replyValue = ''
        })
        .catch((err) => {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
        })
    })
  }
  //审核框取消
  const BrandsCancel = () => {
    brandModal.visible = false
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const appear = ref(false)
  //单选
  const formRadio = (event) => {
    console.log(event, 'event')
    if (event.target.value === '2') {
      appear.value = true
    } else {
      appear.value = false
      formState.replyValue = ''
    }
  }
  let categoryID = <any>ref('')
  //违规审核
  const addOrder = async (record) => {
    console.log(record, '审核详情')
    categoryID = record.id
    brandModal.currentItem = record
    brandModal.visible = true
  }

  //上架
  const shelvesEvent = (record) => {
    console.log(record, '上架')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsGoodsStatusUpdata({
        ids: [record.id],
        status: 1,
        violationStatus: record.violationStatus,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        initData()
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
      .goodsGoodsStatusUpdata({
        ids: [record.id],
        status: 4,
        violationStatus: record.violationStatus,
      })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        initData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  // 获取库存详情
  const showAvailable = (record) => {
    console.log(inventory, record)
    inventory.value.showModal(record.id, record.name)
  }

  const filterData = ref({
    shopId: '',
    orderProperty: 'update_time',
    orderType: 'DESC',
  })
  const handlerFilterRest = ({ values }) => {
    filterData.value = {
      orderProperty: 'update_time',
      orderType: activeKey.value == 'two' ? 'ASC' : 'DESC',
      categoryId: values.categoryId ? values.categoryId[1] : '',
    }
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    console.log(values, 'values')
    filterData.value = {
      ...values,
      categoryId: values && values.categoryId ? values.categoryId[1] : '',
    }
    loadTableData()
  }

  // table 列
  const tabColumns = ref()
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  const tabsChange = (Key) => {
    selectedRow.value = []
    activeKey.value = Key
    filterData.value = {
      orderProperty: 'update_time',
      orderType: activeKey.value == 'two' ? 'ASC' : 'DESC',
    }
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10

    //loadTableData()
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
  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始
  const statusAttrs = { two: [2], three: [3], four: [1], five: [4] }
  const violationAttrs = { two: [3], three: [3], four: [3], five: [3], six: [1, 2] }
  const statusText = {
    '2,3': '待审核',
    '3,3': '审核未通过',
    '1,3': '在售',
    '4,3': '待售',
    '1,2': '违规',
    '4,1': '违规',
    '2,2': '违规',
  }
  const loadTableData = async () => {
    console.log('route.query?.id', route.query?.shopId)

    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
      statusList: activeKey.value === 'one' ? undefined : statusAttrs[activeKey.value],
      //违规状态 1：已违规  2：违规审核 3：未违规
      violationStatusList: activeKey.value === 'one' ? undefined : violationAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      shopId: filterData.value.shopId ? filterData.value.shopId : route.query?.shopId,
      role: 1,
    }
    console.log(statusAttrs[activeKey.value], violationAttrs[activeKey.value], filterParams)
    const { records, total } = await adminHttp
      .goodsGoodsQueryListPage(filterParams)
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
  }
  const initData = () => {
    getGoodsGoodsListCount()
    loadTableData()
  }
  onBeforeMountedOrActivated(() => {
    getGoodsGoodsListCount()
    loadTableData()
  })
  const editFeeHandler = (row) => {
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

  ::v-deep(.ant-btn-link) {
    padding: 0 !important;
    padding-right: 10px !important;
  }

  .page-wrap {
    margin: 72px 24px 24px 24px;
    //   max-width: 1200px;
  }

  .filter-form {
    background: #fff;
    margin: 24px 0;
    padding: 24px 24px 4px 24px;
  }

  .page-container {
    background-color: white;
    padding: 24px;
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
  }

  @media screen and (max-width: 1600px) {
    .page-wrap {
      padding: 0 20px;
    }
  }
</style>
