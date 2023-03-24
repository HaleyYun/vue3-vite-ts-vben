<template>
  <div>
    <EraTabs :tabsList="agentTabData" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class="m-24px mt-72px">
      <div class="filter-bg p-24px pb-4px mb-24px">
        <BasicForm
          @register="registerForm"
          @reset="handlerFilterRest"
          @submit="handleFilterTable"
        ></BasicForm>
      </div>

      <div class="bg-white p-24px">
        <EraTableTitle :total="pagination.total">
          <template #tableEdit>
            <a-button type="primary" @click="addSuppliers" v-auth="'/v1/api/company/legal/supplier'"
              >新增供应商
            </a-button>
            <a-button v-if="false" type="primary" ghost class="margin-l-r-10" @click="exportData"
              >数据导出
            </a-button>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :scroll="{ x: 1200 }"
            :columns="supplierColumn"
            :data-source="tableData"
            :loading="tableLoading"
            :pagination="false"
            :rowKey="(record) => record.id"
            bordered
            size="small"
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'fullName'">
                <div v-if="record.isSelf"
                  ><div class="pb-2px">{{ record.fullName }}</div>
                  <div><a-tag color="red">自营</a-tag></div></div
                >
                <div v-else>{{ record.fullName }}</div>
              </template>
              <template v-if="column.dataIndex === 'agentNum'">
                <span v-if="record.isSelf">
                  <a-button type="link" @click="seeFullName(record)">{{
                    record.agentNum
                  }}</a-button></span
                >
                <span v-else> </span>
              </template>
              <template v-if="column.dataIndex === 'areaStr'">
                <template v-if="record['areaStr'] === null">----</template>
              </template>
              <template v-if="column.dataIndex === 'channelManagerName'">
                <template v-if="record.channelManagerName === null">----</template>
              </template>
              <template v-if="column.dataIndex === 'garageNum'">
                <template v-if="record['garageNum'] === null">----</template>
              </template>
              <template v-if="column.dataIndex === 'statusStr'">
                <div class="flex justify-between">
                  <span v-if="record.statusStr == '正常'">
                    <a-tag color="processing">{{ record['statusStr'] }}</a-tag>
                  </span>
                  <span v-if="record.statusStr == '逾期'">
                    <a-tag color="warning">{{ record['statusStr'] }}</a-tag>
                  </span>
                  <span v-if="record.statusStr == '禁言'">
                    <a-tag color="error">{{ record['statusStr'] }}</a-tag>
                  </span>
                  <!-- <FormOutlined
                  :style="{ color: '#1890ff' }"
                  class="margin-l-10 text-blue-500"
                  @click="editShopStatusFunc(record)"
                /> -->
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="editShopStatusFunc(record)">
                      编辑
                      <DownOutlined />
                    </a>
                    <template #overlay>
                      <a-menu>
                        <ARadioGroup
                          v-model:value="shopModel.status"
                          name="radioGroup"
                          @Change="shopModelStatus(record)"
                        >
                          <a-menu-item key="1">
                            <ARadio value="1">正常</ARadio>
                          </a-menu-item>
                          <a-menu-item key="2">
                            <ARadio value="2">逾期</ARadio>
                          </a-menu-item>
                          <a-menu-item key="3">
                            <ARadio value="3">禁言</ARadio>
                          </a-menu-item>
                        </ARadioGroup>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </template>
              <template v-if="column.dataIndex === 'roleCode'">
                <span v-if="record.roleCode === 'supplier'"> 供应商 </span>
                <span v-else-if="record.roleCode === 'agent'"> 服务商 </span>
                <span v-if="record.roleCode === 'garage'"> 汽修厂 </span>
                <span v-else-if="record.roleCode === 'op'"> 运营平台 </span>
              </template>
              <template v-if="column.dataIndex === 'action'">
                <a
                  v-auth="'/v1/company/info/manage'"
                  size="small"
                  class="mr-10px"
                  type="link"
                  @click="stepDetailsFunc(record)"
                  >详情</a
                >
                <template v-if="record.isBlacklist === false">
                  <a
                    class="mr-10px"
                    v-auth="'/v1/company/info/change/black'"
                    @click="JoinTheBlacklistEvent(record, true)"
                    >加入黑名单</a
                  >
                </template>

                <template v-if="record.isBlacklist === true">
                  <a class="mr-10px" @click="JoinTheBlacklistEvent(record, false)">取消黑名单</a>
                </template>
                <!--与后端沟通，只有审核中的才有审核按钮操作 checkStatus =2 && isBindMobile = true-->
                <template v-if="record.checkStatus === 2 && record.isBindMobile === true">
                  <AButton size="small" type="link" @click="customerReview(record)">审核</AButton>
                </template>

                <APopconfirm
                  cancel-text="取消"
                  ok-text="确认"
                  title="确认要解除角色吗?"
                  @confirm="releaseRoleFunc(record)"
                >
                  <a
                    v-if="+record.checkStatus === 0"
                    class="mr-10px margin-b-10"
                    v-auth="'/v1/company/info/unbind/role'"
                  >
                    解除角色
                  </a>
                </APopconfirm>

                <div v-if="record.checkStatus == 4">
                  <a
                    class="margin-r-10"
                    @click="employManagementFunc(record)"
                    v-auth="'/v1/company/info/staff/page'"
                  >
                    员工管理
                  </a>
                  <a
                    class="margin-b-10"
                    type="primary"
                    v-auth="'/v1/goods/goods/query/list/page'"
                    @click="checkInventory(record)"
                    >查看库存</a
                  >
                </div>
              </template>
            </template>
          </ATable>
          <!--审核弹窗 -->
          <AModal
            v-model:visible="brandModal.visible"
            :confirm-loading="brandModal.confirmLoading"
            :title="brandModal.title"
            centered
            destroy-on-close
            @cancel="BrandsCancel"
            @ok="BrandsAdd"
          >
            <div class="p-5">
              <AForm
                ref="formRef"
                :label-col="{ span: 9 }"
                :model="formState"
                :wrapper-col="{ span: 20 }"
                autocomplete="off"
                name="basic"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <AFormItem label="处理意见" name="radioTwoGroup">
                  <a-radio-group
                    v-model:value="formState['radioTwoGroup']"
                    @change="formRadio($event)"
                  >
                    <a-radio value="4">审核成功</a-radio>
                    <a-radio value="5">审核失败</a-radio>
                  </a-radio-group>
                </AFormItem>
                <AFormItem
                  v-if="appear"
                  :label-col="{ span: 11 }"
                  :wrapper-col="{ span: 20 }"
                  class="text-current"
                  name="replyValue"
                >
                  <ATextarea
                    v-model:value="formState.replyValue"
                    :maxlength="20"
                    :rows="6"
                    :showCount="true"
                    placeholder="拒绝原因最多输入20字"
                  />
                </AFormItem>
              </AForm>
            </div>
          </AModal>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :current="pagination.current"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </div>

    <EraColumnForm ref="editShopRef" title="编辑店铺" @submit="editShopStatusApiEvent">
      <template #NilFileContent>
        <div class="pb-20px">
          <ARadioGroup v-model:value="shopModel.status" name="radioGroup">
            <ARadio value="1">正常</ARadio>
            <ARadio value="2">逾期</ARadio>
            <ARadio value="3">禁言</ARadio>
            <!-- <ARadio value="4">禁止共创</ARadio>
		  <ARadio value="5">禁止直播</ARadio> -->
          </ARadioGroup>
        </div>
      </template>
    </EraColumnForm>
  </div>
</template>

<script lang="ts">
  // 分页
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import AgentForm from '/@/modules/CustomerModule/AgentPages/component/AgentForm.vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import BasicForm from '/@/components/Form/src/BasicForm.vue'
  import { useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import type { FormInstance } from 'ant-design-vue'

  const { createMessage } = useMessage()
  const loadingHandleRow = 'handlerRow'
  import {
    filterSupplierForm,
    supplierColumn,
  } from '/@/modules/CustomerModule/SupplierModule/SupplierList/data/supplierData'
  import { useRouter } from 'vue-router'
  import { CascaderProps, Modal } from 'ant-design-vue'
  import { PageEnum } from '/@/enums/pageEnum'
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'AgentManager',
    components: {
      EraColumnForm,
      BasicForm,
      EraTabs,
      EraTableTitle,
      AgentForm,
      VoPagination,
      DownOutlined,
    },
    setup() {
      const formState = reactive<FormState>({
        replyValue: '',
        radioTwoGroup: '',
      })
      interface FormState {
        replyValue: string
        radioTwoGroup: any
      }

      let appear = <any>ref(false)
      let customerID = <any>ref('')
      let tagProNum = 0
      let areaCodeStr = ref('')
      let valueCascader = ref('')
      const go = useRouter()
      const loadingCtxkey = 'handlerRow'
      // 关联 弹框 --“修改状态”
      const editShopRef = ref()
      // 解决初始化以及 选择选项卡后的冲突问题
      // agent Tab
      const agentTabData = ref([])
      const activeKey = ref<any>(null)
      // 改变店铺状态
      let shopModel = reactive({
        id: '',
        status: '',
      })
      // 查询条件
      let filterMap = ref()
      const tableLoading = ref(false)
      const pagination = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      let tableData = ref([])
      const [registerForm, { resetFields }] = useForm({
        fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
        labelWidth: 120,
        autoSubmitOnEnter: true,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8, offset: 16 },
        schemas: filterSupplierForm,
      })
      const initSupplierTabData = async () => {
        try {
          const { data } = await adminHttp.CUSTOMER.companyInfoSupplierTab()
          console.log(activeKey.value)
          console.log(data)
          agentTabData.value = data.map((item) => {
            return {
              key: item.checkStatus === null ? 0 : item.checkStatus + 1,
              name: item.checkStatusStr,
              totalCount: item.count,
            }
          })
          console.log(agentTabData.value, 'xx')
          if (!activeKey.value) {
            activeKey.value = agentTabData.value[0]['key']
          }
        } catch (err) {
        } finally {
        }
      }

      // 分页
      const paginationChange = ({ current, pageSize }) => {
        pagination.current = current
        pagination.pageSize = pageSize
        initCompanyInfoSupplierTabData()
      }
      const handleFilterTable = async (values) => {
        pagination.current = 1
        filterMap.value = values
        if (filterMap.value.areaCode && filterMap.value.areaCode.length > 0) {
          filterMap.value.areaCode = filterMap.value.areaCode[filterMap.value.areaCode.length - 1]
        }
        if (filterMap.value.startTime && filterMap.value.endTime) {
          filterMap.value.startTime = filterMap.value.startTime + ' 00:00:00'
          filterMap.value.endTime = filterMap.value.endTime + ' 23:59:59'
        }
        await initCompanyInfoSupplierTabData()
      }

      const handlerFilterRest = () => {
        filterMap.value = {}
        initCompanyInfoSupplierTabData()
      }
      const tabsChange = (index) => {
        activeKey.value = index
        filterMap.value = {}
        pagination.total = 0
        pagination.current = 1
        pagination.pageSize = 10
        resetFields()
        initCompanyInfoSupplierTabData()
        initSupplierTabData()
      }
      const onChange = (item) => {
        if (item) {
          areaCodeStr.value = item[2]
        } else {
          areaCodeStr.value = ''
        }
      }
      /**
       *@desc 改变状态
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       *@return config [Object] 配置对象
       */
      const initCompanyInfoSupplierTabData = async () => {
        tableLoading.value = true
        const filterParams = {
          ...filterMap.value,
          pageSize: pagination.pageSize,
          pageNo: pagination.current,
          platformCode: 'supplier',
          checkStatus: activeKey.value - 1 < 0 ? null : activeKey.value - 1,
        }
        console.log(filterParams, 'filterData')
        try {
          tableData.value = []
          const { data } = await adminHttp.CUSTOMER.companyInfoPage(filterParams)
          tableData.value = data.records
          pagination.total = data.total
        } catch (err) {
        } finally {
          tableLoading.value = false
        }
      }
      const unbindEvent = async (record) => {
        try {
          const map = { id: record.id }

          const { code } = await adminHttp.CUSTOMER.companyInfoUnbindRole(map)
          if (code == '20001') {
            createMessage.success('解绑成功')
            initData()
          } else {
            createMessage.error('解绑失败')
          }
        } catch (err: any) {
          createMessage.error(err)
        }
      }
      const options = ref<CascaderProps['options']>([])

      const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        // load options lazily
        console.log('targetOptidddon====', targetOption)
        setTimeout(() => {
          targetOption.loading = false

          targetOption.children = [
            {
              label: `${targetOption.label} Dynamic 1`,
              value: 'dynamic1',
            },
            {
              label: `${targetOption.label} Dynamic 2`,
              value: 'dynamic2',
            },
          ]
          options.value = [...options.value]
        }, 1000)
      }
      /**
       *@desc 点击【员工管理】进入详情
       *@param id [String] 改变对象的id
       */
      const employManagementFunc = (item) => {
        go.push({
          path: PageEnum.EMPLOYEE_MANAGEMENT,
          query: {
            type: 'two',
            id: item.id,
          },
        })
      }
      /**
       *@desc 进入详情
       */
      const stepDetailsFunc = (item) => {
        go.push({
          path: PageEnum.EMPLOYEE_MANAGEMENT,
          query: {
            type: 'one',
            id: item.id,
          },
        })
      }
      const JoinTheBlacklistEvent = async (item, status) => {
        Modal.confirm({
          title: status ? '加入黑名单' : '解除黑名单',
          content: status ? '确定要加入黑名单吗？' : '确定要解除黑名单吗？',
          onOk() {
            joinBlackList(item, status)
          },
          onCancel() {
            console.log('Cancel')
          },
          class: 'test',
        })
      }
      const joinBlackList = async (item, status) => {
        const map = { id: item.id, isBlacklist: status }
        const { code } = await adminHttp.CUSTOMER.companyInfoChangeBlack(map)

        if (code == '20001') {
          initData()
          createMessage.success({ content: `操作成功`, key: loadingHandleRow })
        } else {
          createMessage.error({ content: `操作成功`, key: loadingHandleRow })
        }
      }
      /**
       *@desc 编辑店铺状态 弹出弹框
       *@param id [String] 改变对象的id
       * @param status [String] 改变对象的status
       */
      const editShopStatusFunc = (item) => {
        shopModel.id = item.id
        shopModel.status = item.status
        // editShopRef.value.isOpenAlertShow()
      }
      const editShopStatusApiEvent = async () => {
        createMessage.loading({ content: '编辑中...', key: loadingHandleRow })
        try {
          const res = await adminHttp.CUSTOMER.companyInfoChangeStoreStatus(shopModel)
          if (res.code == '20001') {
            createMessage.success({ content: '修改店铺成功', key: loadingHandleRow })
            await initCompanyInfoSupplierTabData()
          }
        } catch (err: any) {
          createMessage.error({ content: err.message, key: loadingHandleRow })
        } finally {
        }
      }
      /**
       *@desc 解除角色
       *@param id
       */
      const releaseRoleFunc = async (item) => {
        const roleMap = { id: item.id }
        createMessage.loading({ content: '编辑中...', key: loadingHandleRow })
        try {
          const res = await adminHttp.CUSTOMER.companyInfoUnbindRole(roleMap)
          if (res.code == '20001') {
            createMessage.success({ content: '解绑角色成功', key: loadingHandleRow })
            initData()
          }
        } catch (err: any) {
          createMessage.error({ content: err.message, key: loadingHandleRow })
        } finally {
        }
      }

      //审核弹窗状态
      const brandModal = reactive({
        visible: false,
        title: '审核详情',
        currentItem: null,
        rejectReason: '',
        confirmLoading: false,
        currentId: '',
      })
      const formRef = ref<FormInstance | undefined>()
      //审核
      const customerReview = async (record) => {
        console.log(record, '审核详情')
        customerID = record.id
        formState['radioTwoGroup'] = '4'
        brandModal.visible = true
      }
      //审核确认框
      const BrandsAdd = () => {
        formRef.value.validate().then((res) => {
          console.log(res, 'success')
          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          // /vocen-jarvis/v1/company/info/audit
          adminHttp.CUSTOMER.companyInfoAudit$Post({
            id: customerID,
            status: formState.radioTwoGroup,
            result: formState.replyValue,
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

      //单选
      const formRadio = (event) => {
        console.log(event, 'event')
        if (event.target.value === '5') {
          appear.value = true
        } else {
          appear.value = false
          formState.replyValue = ''
        }
      }
      //审核框取消
      const BrandsCancel = () => {
        brandModal.visible = false
      }

      // 查看库存
      const checkInventory = (record) => {
        console.log(record)
        go.push({
          path: '/GoodsManage/goods/goodsApply',
          query: { shopId: record.id, name: record.storeName },
        })
      }

      // 新增供应商
      const addSuppliers = () => {
        go.push({ path: '/customerModule/supplier/supplierNewAdd' })
      }

      // 导出数据
      const exportData = () => {}

      const onFinish = (values: any) => {
        console.log('Success:', values)
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }

      const seconeApi = async (code) => {
        const codeNum = code.code
        const map = { parentCode: codeNum }
        const { data } = await adminHttp.CUSTOMER.apiSixHotAreaSub(map)
        console.log(data, '011111103030303003')
        if (data !== null) {
          data.map((item) => {
            item.isLeaf = false
            return item
          })
        }
        return data
      }
      const loadDatas = async (e) => {
        const targetOptions = e[e.length - 1]
        targetOptions.loading = true
        const data = await seconeApi(targetOptions)
        targetOptions.loading = false
        if (data !== null) {
          targetOptions.loading = false
          targetOptions.children = [...data]
        }
        options.value = [...options.value]
      }
      const initData = () => {
        initCompanyInfoSupplierTabData()
        initSupplierTabData()
      }
      onMountedOrActivated(() => {
        initData()
      })
      //自营服务商
      const seeFullName = (record) => {
        go.push({
          path: '/customerModule/supplier/serviceProvider',
          query: {
            id: record.id,
          },
        })
      }
      const shopModelStatus = async (record) => {
        shopModel.id = record.id
        try {
          const res = await adminHttp.CUSTOMER.companyInfoChangeStoreStatus(shopModel)
          if (res.code == '20001') {
            createMessage.success({ content: '修改店铺成功', key: loadingHandleRow })
            await initCompanyInfoSupplierTabData()
          }
        } catch (err: any) {
          createMessage.error({ content: err.message, key: loadingHandleRow })
        } finally {
        }
      }
      return {
        shopModelStatus,
        seeFullName,
        formRef,
        formState,
        supplierColumn,
        editShopStatusApiEvent,
        handlerFilterRest,
        handleFilterTable,
        tabsChange,
        employManagementFunc,
        editShopStatusFunc,
        registerForm,
        paginationChange,
        JoinTheBlacklistEvent,
        options,
        areaCodeStr,
        loadData,
        onChange,
        loadDatas,
        valueCascader,
        tagProNum,
        unbindEvent,
        releaseRoleFunc,
        stepDetailsFunc,
        editShopRef,
        shopModel,
        filterMap,
        tableData,
        agentTabData,
        activeKey,
        tableLoading,
        pagination,
        customerReview,
        brandModal,
        BrandsAdd,
        BrandsCancel,
        onFinish,
        onFinishFailed,
        formRadio,
        appear,
        customerID,
        checkInventory,
        addSuppliers,
        exportData,
      }
    },
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-container {
    padding: 24px;
    background: #fff;
  }

  .spanStyle {
    white-space: nowrap; /*强制span不换行*/
    display: inline-block; /*将span当做块级元素对待*/
    width: 32px; /*限制宽度*/
    overflow: hidden; /*超出宽度部分隐藏*/
    text-overflow: ellipsis; /*超出部分以点号代替*/
    line-height: 0.9; /*数字与之前的文字对齐*/
  }
</style>
