<template>
  <div>
    <div>
      <EraTabs :tabsList="agentTabData" :tabs-active="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <BasicForm @register="registerForm" @submit="handleFilterTable" @reset="handlerFilterRest">
          <template #areaCodeSlot="{ model, field }">
            <a-cascader
              v-model:value="valueCascader"
              :options="options"
              :load-data="loadDatas"
              placeholder="请选择所属地区"
              :field-names="{ label: 'name', value: 'code', children: 'children' }"
              @change="onChange"
              change-on-select
            />
          </template>
        </BasicForm>
      </div>
      <div class="p-24px bg-white">
        <EraTableTitle :total="pagination.total">
          <template #tableEdit>
            <a-button type="primary" @click="addAgent" v-auth="'/v1/api/company/legal/supplier'"
              >新增服务商</a-button
            >
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :loading="tableLoading"
            :rowKey="(record) => record.id"
            :columns="agentTableColumn"
            :data-source="tableData"
            :pagination="false"
            :scroll="{ x: 1200 }"
            size="small"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <!-- 拓客 -->
              <template v-if="column.dataIndex === 'showStatus'">
                <ASwitch
                  @change="stateVisible(record)"
                  :checked="record.showStatus"
                  checked-children="开启"
                  un-checked-children="关闭"
                />
              </template>
              <template v-if="column.dataIndex === 'areaStr'">
                <template v-if="record['areaStr'] === null">----</template>
              </template>
              <template v-if="column.dataIndex === 'channelManagerName'">
                <template v-if="record.channelManagerName === null">----</template>
              </template>
              <template v-if="column.dataIndex === 'garageNum'">
                <!-- <template v-if="!record['garageNum']"> -->
                  <template v-if="!record.garageNum">
                  {{ record['garageNum'] == null ? '----' : record['garageNum'] }}
                </template>
                <template v-else>
                  <span v-if="record['garageNum'] == 0"></span>
                  <a @click="goAssociated(record)">{{ record['garageNum'] }}</a>
                </template>
              </template>
              <template v-if="column.dataIndex === 'statusStr'">
                <!-- <span>{{ record['statusStr'] }}</span>
                <FormOutlined class="margin-l-10" @click="editShopStatusFunc(record)" /> -->
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
                      <ARadioGroup v-model:value="shopModel.status" name="radioGroup" @Change="shopModelStatus(record)">
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
                <span v-if="record.roleCode === 'garage'"> 修理厂 </span>
                <span v-else-if="record.roleCode === 'op'"> 运营平台 </span>
              </template>
              <template v-if="column.dataIndex === 'action'">
                <AButton
                  type="link"
                  class="margin-r-10 margin-b-10"
                  @click="stepDetailsFunc(record)"
                  v-auth="'/v1/company/info/manage/'"
                  >详情
                </AButton>
                <template v-if="record.isBlacklist === true">
                  <AButton
                    type="link"
                    class="margin-r-10 margin-b-10"
                    @click="JoinTheBlacklistEvent(record, false)"
                    v-auth="'/v1/company/info/change/black'"
                  >
                    取消黑名单
                  </AButton>
                </template>
                <template v-if="record.checkStatus === 2 && record.isBindMobile === true">
                  <AButton
                    type="link"
                    @click="customerReview(record)"
                    v-auth="'/v1/company/info/audit'"
                    >审核
                  </AButton>
                </template>
                <template v-if="record.isBlacklist === false">
                  <AButton
                    type="link"
                    class="margin-r-10 margin-b-10"
                    @click="JoinTheBlacklistEvent(record, true)"
                    v-auth="'/v1/company/info/change/black'"
                    >加入黑名单
                  </AButton>
                </template>

                <APopconfirm
                  title="确认要解除角色吗?"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="releaseRoleFunc(record)"
                >
                  <AButton
                    v-auth="'/v1/company/info/unbind/role'"
                    type="link"
                    v-if="+record.checkStatus === 0"
                    class="margin-r-10 margin-b-10"
                    >解除角色
                  </AButton>
                </APopconfirm>

                <template v-if="+record.checkStatus === 4">
                  <AButton
                    type="link"
                    class="margin-r-10 margin-b-10"
                    @click="employManagementFunc(record)"
                    v-auth="'/v1/company/info/staff/page'"
                    >员工管理
                  </AButton>
                  <AButton
                    type="link"
                    class="margin-r-10 margin-b-10"
                    @click="checkInventory(record)"
                    v-auth="'/v1/api/company/legal/supplier'"
                  >
                    查看库存
                  </AButton>
                </template>
              </template>
            </template>
          </ATable>
          <!--审核弹窗 -->
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
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 20 }"
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
                  class="text-current"
                  :label-col="{ span: 11 }"
                  :wrapper-col="{ span: 20 }"
                  v-if="appear"
                  name="replyValue"
                >
                  <ATextarea
                    v-model:value="formState.replyValue"
                    placeholder="拒绝原因最多输入20字"
                    :showCount="true"
                    :rows="6"
                    :maxlength="20"
                  />
                </AFormItem>
              </AForm>
            </div>
          </AModal>
        </div>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </div>
    <EraColumnForm title="编辑店铺" ref="editShopRef" @submit="editShopStatusApiEvent">
      <template #NilFileContent>
        <ARadioGroup v-model:value="shopModel.status" name="radioGroup">
          <ARadio value="1">正常</ARadio>
          <ARadio value="2">逾期</ARadio>
          <ARadio value="3">禁言</ARadio>
        </ARadioGroup>
      </template>
    </EraColumnForm>
    <a-modal v-model:visible="visible" title="操作确认" @ok="handleOk">
      <div class="p-14px">请确定是否{{ InfoVisible.showStatus ? '关闭' : '开启' }}该客户推广扩客功能</div>
    </a-modal>
	</div>
</template>

<script lang="ts">
  // 分页
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import AgentForm from '/@/modules/CustomerModule/AgentPages/component/AgentForm.vue'
  import type { FormInstance } from 'ant-design-vue'
  import { Modal } from 'ant-design-vue'
  import {DownOutlined} from '@ant-design/icons-vue'
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import BasicForm from '/@/components/Form/src/BasicForm.vue'
  import { useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const loadingHandleRow = 'handlerRow'
  import {
    filterAgentForm,
    agentTableColumn,
  } from '/@/modules/CustomerModule/AgentPages/view/AgentManage/data/AgentManager'
  import { useRouter } from 'vue-router'
  import { CascaderProps } from 'ant-design-vue'
  import { PageEnum } from '/@/enums/pageEnum'
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'AgentManager',
    components: {
      EraTabs,
      EraTableTitle,
      EraColumnForm,
      BasicForm,
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
      const InfoVisible = ref<any>('')
      const visible = ref<boolean>(false)
      const loadingCtxkey = 'handlerRow'
      let appear = <any>ref(false)
      let customerID = <any>ref('')
      const go = useRouter()
      let areaCodeStr = ref('')
      // 关联 弹框 --“修改状态”
      const editShopRef = ref()
      // 解决初始化以及 选择选项卡后的冲突问题
      // agent Tab
      const agentTabData = ref([])
      const activeKey = <any>ref('')
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
      const [registerForm] = useForm({
        labelWidth: 120,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8 ,offset:16},
        autoSubmitOnEnter: true,
        schemas: filterAgentForm,
        fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      })

      let valueCascader = ref('')
      const initAgentTabData = async () => {
        try {
          const { data } = await adminHttp.CUSTOMER.companyInfoAgentTab()
          agentTabData.value = data.map((item) => {
            return {
              key: item.checkStatus === null ? 0 : item.checkStatus + 1,
              name: item.checkStatusStr,
              totalCount: item.count,
            }
          })
          if (!activeKey.value) {
            activeKey.value = agentTabData.value[0]['key']
          }
        } catch (err) {
        } finally {
        }
      }
      const tabsChange = async (key) => {
        activeKey.value = key
        pagination.total = 0
        pagination.current = 1
        pagination.pageSize = 10
        await initCompanyInfoSupplierTabData()
        await initAgentTabData()
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

      const handlerFilterRest = (values) => {
        pagination.current = 1
        filterMap.value = {}
        console.log(values)
        initCompanyInfoSupplierTabData()
      }
      const tapsPageFunc = (index) => {
        activeKey.value = index
        initAgentTabData()
        initCompanyInfoSupplierTabData()
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
          platformCode: 'agent',
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
        console.log(record.id)
        const map = { id: record.id }

        const { code } = await adminHttp.CUSTOMER.companyInfoUnbindRole(map)
        if (code == '20001') {
          createMessage.success('解绑成功')
          initData()
        } else {
          createMessage.error('解绑失败')
        }
      }
      const options = ref<CascaderProps['options']>([])

      const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        // load options lazily
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
          path: PageEnum.SERVICE_MANAGEMENT,
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
          path: PageEnum.SERVICE_MANAGEMENT,
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
          await initCompanyInfoSupplierTabData()
          await initAgentTabData()
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
            await initCompanyInfoSupplierTabData()
          }
        } catch (err: any) {
          createMessage.error({ content: err.message, key: loadingHandleRow })
        } finally {
        }
      }
      const textApi = async (code) => {
        const map = { parentCode: code }
        const { data } = await adminHttp.CUSTOMER.apiSixHotAreaSub(map)
        console.log(data, '003030303003')
        data.map((item) => {
          item.isLeaf = false
          return item
        })
        options.value = data
      }
      const initData = () => {
        initCompanyInfoSupplierTabData()
        initAgentTabData()
        // textApi('86')
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
      const onFinish = (values: any) => {
        console.log('Success:', values)
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }

      // 关联修理厂
      const goAssociated = (record) => {
        go.push({ path: '/customerModule/agent/AssociatedWithGarage', query: { id: record.id } })
      }
      // 查看库存
      const checkInventory = (record) => {
        console.log(record)
        go.push({
          path: '/goodsManage/goods/goodsServiceProviderList',
          query: { shopId: record.id, name: record.storeName },
        })
      }

      // 新增服务商
      const addAgent = () => {
        go.push('/customerModule/agent/newMent')
      }

      const loadDatas = (e) => {
        const targetOptions = e[e.length - 1]
        targetOptions.loading = true

        targetOptions.loading = false

        options.value = [...options.value]
      }
      onMountedOrActivated(() => {
        initData()
      })
      //启用状态
      const stateShow = async(InfoVisible) => {
        const changeSwitchMap = {
          companyId: InfoVisible.value.id,
          showStatus: !InfoVisible.value.showStatus,
        }
		await adminHttp.COMPANY.companyInfoShowStatus(changeSwitchMap)
          .then(() => {
			 initCompanyInfoSupplierTabData()
          })
          .catch((error) => {
            console.log('error=', error)
          })
      }
      const handleOk = async (e: MouseEvent) => {
        await stateShow(InfoVisible)
        visible.value = false
      }
      const stateVisible = (record) => {
        InfoVisible.value = record
        visible.value = true
      }
      const shopModelStatus= async(record) => {
        shopModel.id=record.id
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
	    	handleOk,
        InfoVisible,
        visible,
        stateVisible,
        valueCascader,
        agentTableColumn,
        areaCodeStr,
        editShopStatusApiEvent,
        handleFilterTable,
        handlerFilterRest,
        tapsPageFunc,
        employManagementFunc,
        editShopStatusFunc,
        registerForm,
        paginationChange,
        JoinTheBlacklistEvent,
        loadData,
        unbindEvent,
        releaseRoleFunc,
        stepDetailsFunc,
        editShopRef,
        shopModel,
        options,
        filterMap,
        tableData,
        agentTabData,
        tabsChange,
        activeKey,
        tableLoading,
        pagination,
        onChange,
        loadDatas,
        formRef,
        formState,
        customerReview,
        brandModal,
        BrandsAdd,
        BrandsCancel,
        onFinish,
        onFinishFailed,
        formRadio,
        appear,
        customerID,
        goAssociated,
        addAgent,
        checkInventory,
      }
    },
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
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
