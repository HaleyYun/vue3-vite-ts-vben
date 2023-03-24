<template>
  <div>
    <div>
      <EraTabs :tabsList="tabData" :tabs-active="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div>
        <div class="my-24px bg-white p-24px pb-4px">
          <GarageFilterForm
            :currentTabIndex="activeKey"
            @rest="handlerFilterRest"
            @submit="handlerFilterSubmit"
          />
        </div>
        <div class="p-24px bg-white">
          <EraTableTitle :total="paginations.total">
            <template #tableEdit>
              <a-button
                type="primary"
                class="margin-l-r-10"
                v-auth="'/v1/api/company/legal/garage'"
                @click="add"
                >新增修理厂
              </a-button>
            </template>
          </EraTableTitle>
          <div>
            <ATable
              :columns="tabColumns"
              :data-source="tableData"
              :loading="tableLoading"
              :pagination="false"
              :scroll="{ x: 1200 }"
              :rowKey="(record) => record.id"
              bordered
              size="small"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'storeUrl'">
                  <div class="rich-column">
                    <div class="rich-resource">
                      <FileUrlPrase width="40px" height="40px" :file-url="record.storeUrl" />
                    </div>
                    <!--<div class="rich-content"> [{{ record.title }}] {{ record.content }}</div>-->
                  </div>
                </template>
                <template v-if="column.dataIndex === 'carSeriesStr'">
                  <div class="rich-column">
                    <div class="rich-content">
                      <span>{{ record.carSeriesStr }}</span>
                    </div>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'userName'">
                  <div>
                    <a-tag v-if="record.source && record.source === 5" color="orange">小程序</a-tag>
                    <div class="mt-2px">
                      <a-tag  v-if="!record.downloadStatus" color="red">未下载APP</a-tag>
                    </div>
                    <div class="mt-5px">{{ record.userName }}</div>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'contractPhone'">
                  <div>
                    <a-tag v-if="record.source && record.source === 5" color="orange">小程序</a-tag>
                    <div class="mt-2px">
                      <a-tag  v-if="!record.downloadStatus" color="red">未下载APP</a-tag>
                    </div>
                    <div class="mt-5px">{{ record.contractPhone }}</div>
                  </div>
                </template>
                <!-- 4状态 1：已上架   2：待审核 3：审核未通过 4：已下架 -->
                <!-- 违规状态 1：已违规  2：违规审核 3：未违规 -->
                <!-- 所在地区  -->
                <template v-if="column.dataIndex === 'address'">
                  <div>
                    <span>{{ record.areaStr }} </span>
                    <span>{{ record.address }}</span>
                    <AButton v-if="record.address" type="link" @click="openAddressFn(record)"
                      >详细地址
                    </AButton>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'bindInviteeStatus'">
                  <div v-if="record.bindInviteeStatus">
                    <div
                      v-if="record.bindInviteeRole === 'agent'"
                      >{{ record.bindInviteeName }}</div
                    >
                    <div>{{ record.bindInviteeRealName }}</div>
                    <div>{{ record.bindInviteePhone }}</div>
                    <div>{{ transferRoleName(record.bindInviteeRole) }}</div>
                  </div>
                </template>
                <!-- 绑定人  -->
                <template v-if="column.dataIndex === 'bindingFullName'">
                  <div v-if="record.bindingStatus">
                    <div >{{ record.bindingFullName }}</div>
                    <div>{{ record.bindRealName }}</div>
                    <div>{{ record.bindPhone }}</div>
                    <AButton
                      type="link"
                      @click="removeBindFn(record, 1)"
                      v-auth="'/v1/company/info/remove/binder'"
                    >
                      解除绑定
                    </AButton>
                  </div>
                  <div v-else>
                    <AButton type="link" @click="bindGarageFn(record, 1)">未绑定</AButton>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'bindCommissionStatus'">
                  <div v-if="record.bindCommissionStatus">
                    <!-- <div
                      v-if="record.bindInviteeRole === 'agent'"
                      class="w-100px !whitespace-nowrap"
                      >{{ record.bindCommissionName }}</div
                    > -->
                    <!-- bindCommissionName -->
                    <div>{{ record.bindCommissionName }}</div>
                    <div>{{ record.bindCommissionRealName }}</div>
                    <div>{{ record.bindCommissionPhone }}</div>
                    <div>{{ transferRoleName(record.bindCommissionRole) }}</div>

                    <AButton
                      type="link"
                      @click="removeBindFn(record, 2)"
                      v-auth="'/v1/company/info/remove/binder'"
                    >
                      解除绑定
                    </AButton>
                  </div>
                  <div v-else>
                    <AButton type="link" @click="bindGarageFn(record, 2)">未绑定</AButton>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'operation'">
                  
                  <AButton
                    type="link"
                    @click="shopDetails(record, 1)"
                    v-auth="'/v1/company/info/garage/get/'"
                    >详情
                  </AButton>

                  <!-- 未认证 -->
                  <template v-if="+record.checkStatus === 0">
                    <a-popconfirm title="确定要为该用户解除角色？" @confirm="unbindFn(record)">
                      <AButton v-auth="'/v1/company/info/unbind/role'" type="link"
                        >解除角色</AButton
                      >
                    </a-popconfirm>
                  </template>
                  <!-- 待审核 -->
                  <template v-if="record.checkStatusStr === '待审核'">
                    <AButton type="link" @click="customerReview(record)">审核</AButton>
                  </template>
                  <!--  已认证 -->
                  <template v-if="record.checkStatusStr === '已认证'">
                    <AButton
                      type="link"
                      @click="shopDetails(record, 2)"
                      v-auth="'/v1/company/info/garage/get/'"
                      >员工管理
                    </AButton>

                    <a-popconfirm
                      title="确定要把该用户加入黑名单？"
                      @confirm="changeBlackFn(record, true)"
                    >
                      <AButton
                        v-auth="'/v1/company/info/change/black'"
                        v-if="!record.isBlacklist"
                        type="link"
                        >加入黑名单
                      </AButton>
                    </a-popconfirm>
                  </template>
                    <!-- 待绑定手机 -->
                    <template v-if="record.checkStatusStr === '待绑定手机'">
                    <a-popconfirm
                      title="确定要把该用户加入黑名单？"
                      @confirm="changeBlackFn(record, true)"
                    >
                      <AButton
                        v-auth="'/v1/company/info/change/black'"
                        v-if="!record.isBlacklist"
                        type="link"
                        >加入黑名单
                      </AButton>
                    </a-popconfirm>
                  </template>
                  <!--黑名单-->
                  <a-popconfirm
                    title="确定要把该用户取消黑名单？"
                    @confirm="changeBlackFn(record, false)"
                  >
                    <AButton
                      v-auth="'/v1/company/info/change/black'"
                      v-if="record.isBlacklist"
                      type="link"
                      >取消黑名单
                    </AButton>
                  </a-popconfirm>
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
                  :label-col="{ span: 4 }"
                  :model="formState"
                  :wrapper-col="{ span: 20 }"
                  autocomplete="off"
                  name="basic"
                  @finish="onFinish"
                  @finishFailed="onFinishFailed"
                >
                  <AFormItem label="修理厂名称">{{ brandModal.name }}</AFormItem>
                  <AFormItem label="审核结果" name="radioTwoGroup">
                    <a-radio-group
                      v-model:value="formState['radioTwoGroup']"
                      @change="formRadio($event)"
                    >
                      <a-radio value="4">审核成功</a-radio>
                      <!-- <a-radio value="5">审核失败</a-radio> -->
                    </a-radio-group>
                  </AFormItem>
                  <AFormItem
                    v-if="formState['radioTwoGroup'] == 5"
                    label="拒绝原因"
                    class="text-current"
                    name="replyValue"
                    :rules="[{ required: true, message: '请填写拒绝原因' }]"
                  >
                    <ATextarea
                      v-model:value="formState.replyValue"
                      :maxlength="20"
                      :rows="4"
                      :showCount="true"
                      placeholder="拒绝原因最多输入20字"
                    />
                  </AFormItem>
                </AForm>
              </div>
            </AModal>

            <a-modal
              v-model:visible="removeBindingShow"
              cancelText="取消"
              okText="解除绑定"
              title="解除绑定"
              @ok="removeBindingSureFn"
              destroy-on-close
            >
              <div class="p-5">
                该操作会导致修理厂再次下单后，绑定人无法获取新订单的分佣收益，已支付订单可继续获得订单分佣收益，确定要解除绑定人关系吗？
              </div>
            </a-modal>

            <a-modal
              v-model:visible="showBindBoo"
              cancelText="取消"
              okText="确认绑定"
              :title="bindInfoType === 1 ? '绑定人(服务商)' : '绑定人（分佣）'"
              @ok="toBindingSureFn"
              destroy-on-close
            >
              <div class="flex justify-center">
                <div class="p-5">
                  <div class="flex flex-vertical-c">
                    <div class="m-r-2 w120"> 请选择绑定人角色</div>
                    <a-select
                      v-model:value="bindInfo.platformCode"
                      class="w200"
                      placeholder="请选择绑定人角色"
                      @change="changePlatFormCodeFn"
                      allow-clear
                    >
                      <a-select-option v-if="bindInfoType === 2" value="supplier"
                        >供应商</a-select-option
                      >
                      <a-select-option value="agent">服务商</a-select-option>
                      <a-select-option v-if="bindInfoType === 2" value="garage"
                        >修理厂</a-select-option
                      >
                      <a-select-option v-if="bindInfoType === 2" value="skilledWorker"
                        >集师傅</a-select-option
                      >
                    </a-select>
                  </div>
                  <div class="flex flex-vertical-c">
                    <div class="m-r-2 w120"> 请选择绑定人</div>
                    <a-select
                      :default-active-first-option="false"
                      :filter-option="false"
                      :not-found-content="null"
                      @change="searchUserName"
                      v-model:value="bindInfo.userName"
                      :disabled="!bindInfo.platformCode"
                      :options="bindInfoData"
                      class="w200"
                      show-search
                      placeholder="请选择绑定人"
                      @search="searchUserName"
                      allow-clear
                    >
                    </a-select>
                  </div>
                </div>
              </div>
            </a-modal>

            <VoMap v-model:visible="showMapBoo" :mark-position="markPosition"></VoMap>
          </div>
          <div class="flex justify-end py-15px bg-white">
            <VoPagination
              :current="paginations.current"
              :page-size="paginations.pageSize"
              :total="paginations.total"
              @pagination="paginationChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, ref, watch, onBeforeMount } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'

  import { GarageFiterColumns } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageFiterColumns'
  import adminHttp from '/@/utils/http/adminHttp'
  import GarageFilterForm from '/@/modules/CustomerModule/Garage/view/GarageList/view/component/GarageFilterForm.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import type { FormInstance } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'
  import VoMap from '/@/components/VoMap/VoMap.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { transferRoleName } from '/@/utils'

  const go = useRouter()
  const activeKey = ref<any>('')
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
  const { createMessage } = useMessage()

  const bindInfoType = ref<number>(1)

  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'

  const shopDetails = (record, status) => {
    go.push({
      path: '/customerModule/garageRouter/repairShopDetails',
      query: {
        id: record.id,
        status: status,
      },
    })
  }

  // 新增修理厂
  const add = () => {
    go.push('/customerModule/garageRouter/garageNew')
  }

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values

    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = values
  
    loadTableData()
  }

  // table 列
  const tabColumns = ref(GarageFiterColumns)
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
    loadTableData()
    getTabsData()
  }
  //审核弹窗状态
  const brandModal = reactive({
    visible: false,
    title: '修理厂审核',
    name: '',
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
    formState.replyValue = ''
    brandModal.name = record.storeName
    brandModal.visible = true
  }
  //审核确认框
  const BrandsAdd = () => {
    if (!formState['radioTwoGroup']) {
      createMessage.error('请选择审核结果')
      return
    }

    formRef.value.validate().then(async (res) => {
      if (res) {
        try {
          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          const { code } = await adminHttp.CUSTOMER.companyInfoAudit$Post({
            id: customerID,
            status: formState.radioTwoGroup,
            result: formState.replyValue,
          })
          if (code == '20001') {
            initData()
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            brandModal.visible = false
          }
        } catch (e) {
          console.log(e)
          createMessage.error({ content: e.message, key: loadingCtxkey })
        }
      }
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
  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始
  const loadTableData = async () => {
    tableLoading.value = true
    let filterParams = {
      ...filterData.value,
      checkStatus: activeKey.value - 1 < 0 ? null : activeKey.value - 1,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      role: 1,
    }
	if (filterParams.areaCode &&filterParams.areaCode.length >0) {
		filterParams.areaCode = filterParams.areaCode[filterParams.areaCode.length -1]
        }
    if (filterParams.time) {
      filterParams.startTime = filterParams.time[0]
      filterParams.endTime = filterParams.time[1]
    }
    const { records, total } = await adminHttp.CUSTOMER.companyInfoGaragePage(filterParams)
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
  const tabData = ref([])
  const getTabsData = async () => {
    try {
      const { code, data } = await adminHttp.CUSTOMER.companyInfoGarageTab()
      if (code === '20001') {
        tabData.value = data.map((item) => {
          return {
            key: item.checkStatus === null ? 0 : item.checkStatus + 1,
            name: item.checkStatusStr,
            totalCount: item.count,
          }
        })
        if (!activeKey.value) {
          activeKey.value = tabData.value[0]['key']
          console.log(activeKey.value)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const tapsPageFunc = (index) => {
    paginations.current = 1
    activeKey.value = index
    initData()
  }

  // 解除绑定人相关
  const removeBindingShow = ref(false)
  const removeInfo = ref({})
  const removeBindFn = (res, type) => {
    removeInfo.value = res
    console.log(res, 'xx')
    removeBindingShow.value = true
    bindInfoType.value = type
    console.log(res, 'resresresresresres')
  }

  const removeCommitBindFn = (res) => {
    removeInfo.value = res
    removeBindingShow.value = true
    console.log(res, 'resresresresresres')
  }
  /**
   * 确认接触绑定
   */
  const removeBindingSureFn = () => {
    if (bindInfoType.value === 1) {
      adminHttp
        .companyInfoRemoveBinder({
          id: removeInfo.value.id,
          oldBinderId: removeInfo.value.bindingCompanyId,
        })
        .then((res) => {
          if (+res.code === 20001) {
            initData()
            removeBindingShow.value = false
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          }
        })
        .catch((err) => {})
    }
    if (bindInfoType.value === 2) {
      adminHttp.COMPANY.companyInfoRemoveRelation({
        id: removeInfo.value.id,
        oldBinderId: removeInfo.value.bindCommissionCompanyId,
      })
        .then((res) => {
          if (+res.code === 20001) {
            initData()
            removeBindingShow.value = false
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          }
        })
        .catch((err) => {})
    }
  }
  /**
   * 绑定人
   */
  const toBindingSureFn = () => {
    if (!bindInfo.value.platformCode) {
      createMessage.error({ content: `请选择绑定人角色`, key: loadingCtxkey })
      return
    }
    if (!bindInfo.value.userName) {
      createMessage.error({ content: `请选择绑定人`, key: loadingCtxkey })
      return
    }

    if (bindInfoType.value === 1) {
      adminHttp
        .companyInfoChangeBinder({
          id: removeInfo.value.id,
          oldBinderId: removeInfo.value.bindingCompanyId,
          newBinderId: bindInfo.value.userName,
        })
        .then((res) => {
          initData()

          showBindBoo.value = false
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        })
        .catch((err) => {})
    }

    if (bindInfoType.value === 2) {
      console.log(removeInfo.value)
      adminHttp.COMPANY.companyInfoChangeRelation({
        id: removeInfo.value.id,
        oldBinderId: removeInfo.value.bindingCompanyId,
        newBinderId: bindInfo.value.userName,
      })
        .then((res) => {
          initData()

          showBindBoo.value = false
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        })
        .catch((err) => {})
    }
  }
  const markPosition = ref<string | number[]>([])
  const showBindBoo = ref(false)
  const bindInfoData = ref<any>([])
  const bindInfo = ref<any>({
    platformCode: null,
    userName: null,
    data: [],
    type: 1,
  })
  let timeout: any = null
  // 模糊搜索名称
  const searchUserName = (userName) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    timeout = setTimeout(() => {
      getPlatListFn({ userName })
    }, 300)
  }

  const getPlatListFn = (info = {}) => {
    let param: any = {
      pageSize: 100,
      pageNo: 1,
      platformCode: bindInfo.value.platformCode,
      isCommission: +bindInfoType.value === 2,
      ...info,
    }
    adminHttp.CUSTOMER.companyInfoSelectPage(param).then((res) => {
      const tmp = res.data.records.map((item) => {
        return {
          label: item.realName + item.userName,
          value: item.companyId,
        }
      })
      bindInfoData.value.length = 0
      bindInfoData.value = tmp

      // initData()

      console.log(bindInfoData.value, 'bindInfo.value.databindInfo.value.data')
    })
  }
  const changePlatFormCodeFn = () => {
    getPlatListFn()
  }
  const bindGarageFn = (row, type) => {
    removeInfo.value = row
    bindInfo.value.platformCode = null
    bindInfo.value.userName = null
    bindInfoType.value = type
    showBindBoo.value = true
  }

  //解除绑定人结束

  //地址相关
  const showMapBoo = ref(false)
  const openAddressFn = (res) => {
    let result = [res.longitude, res.latitude]

    markPosition.value = result

    console.log(removeInfo.value, '9999')
    showMapBoo.value = true
  }
  //地址结束

  //操作相关
  const unbindFn = (row) => {
    adminHttp.CUSTOMER.companyInfoUnbindRole({ id: row.id }).then((res) => {
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      initData()
    })
  }
  //更改黑名单状态
  const changeBlackFn = (row, isBlacklist) => {
    adminHttp.CUSTOMER.companyInfoChangeBlack({ id: row.id, isBlacklist }).then((res) => {
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      initData()
    })
  }
  //操作相关结束
  const initData = () => {
    getTabsData()
    loadTableData()
  }
  onMountedOrActivated(() => {
    initData()
  })
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 15px;
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

  .w120 {
    width: 120px;
  }

  .w200 {
    width: 200px;
  }
</style>
