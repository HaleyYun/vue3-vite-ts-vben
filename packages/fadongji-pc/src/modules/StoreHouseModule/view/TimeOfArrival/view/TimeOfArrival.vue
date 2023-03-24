<template>
  <div>
    <div class="m-24px">
    <div class="flex">
      <div class="mr-4 overflow-hidden tree-bg bg-white">
        <div class="p-4 text-base">供应商列表</div>
        <div class="flex p-4 pr-4">
          <!-- fullName -->
          <a-input v-model:value="fullName" placeholder="输入企业名搜索" />
        </div>
        <!-- 地区 -->
        <div class="flex pl-4 pr-4">
          <ACascader
            class="codeCity"
            v-model:value="cityValue"
            :field-names="{ label: 'name', value: 'code', children: 'children' }"
            :options="options"
            placeholder="请选择地区"
            @change="onChange"
          />

          <AButton class="ml-4" type="primary" @click="search()">搜索</AButton>
        </div>
        <!-- 列表获取.ant-select-single:not(.ant-select-customize-input) .ant-select-selector -->
        <div class="p-4">
          <AList item-layout="horizontal" :data-source="merchantList">
            <template #renderItem="{ item }">
              <AListItem>
                <AListItemMeta>
                  <template #title>
                    <ARadioGroup v-model:value="merchantList.item">
                      <ARadio
                        type="link"
                        :style="radioStyle"
                        @click="merchantRender(item, key)"
                        :value="item"
                        >{{ item.fullName }}
                      </ARadio>
                    </ARadioGroup>
                  </template>
                </AListItemMeta>
              </AListItem>
            </template>
          </AList>
        </div>
      </div>
      <div class="content border-assets border-assets-l">
        <div class="margin-10">
          <ATabs v-model:activeKey="activeKey" type="card" @change="slipTabEventApi">
            <ATabPane key="one" tab="供应商仓库" />
            <ATabPane key="two" tab="平台仓库" />
          </ATabs>
          <div class="page-containner">
            <div class="filter-form">
              <BasicForm
                @register="registerForm"
                @reset="handlerRest"
                @submit="filterStoreTableDataApiEvent"
              >
                <template #slotWareHouse="{ model, field }">
                  <ASelect
                    v-model:value="model[field]"
                    placeholder="请选择仓库"
                    :options="wareHouseOptions"
                    @change="change"
                  />
                </template>
              </BasicForm>
            </div>
            <div class="page-container">
              <ArrivalTable>
                <template #tableName>
                  <EraTableTitle :total="paginations.total" />
                </template>
                <template #tableEdit>
                  <div class="pb-10px">
                    <AButton
                    type="primary"
                    @click="addPrescription()"
                    v-auth="'/v1/warehouse/arrival'"
                    >新建到货时效</AButton
                  >
                  </div>
                   <!--  -->
                </template>
                <template #content>
                  <ATable
                    :loading="tableLoading"
                    :rowKey="(record) => record.id"
                    :columns="tabColumns"
                    :data-source="tableData"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.dataIndex === 'operation'">
                        <APopconfirm
                          title="确认要删除吗？"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="deleteWarehouse(record)"
                          v-auth="'/v1/warehouse/arrival'"
                        >
                          <AButton type="link">删除</AButton>
                        </APopconfirm>
                      </template>
                      <template v-if="column.dataIndex === 'arrivalTime'">
                        <span>{{ record.arrivalTime }}天</span>
                        <AButton
                          type="link"
                          @click="modifyDay(record)"
                          v-auth="'/v1/warehouse/arrival'"
                          >修改</AButton
                        >
                      </template>
                    </template>
                  </ATable>
                </template>
                <template #pagination>
                  <VoPagination
                    :size="'default'"
                    :total="paginations.total"
                    :current="paginations.pageNo"
                    :page-size="paginations.pageSize"
                    @pagination="paginationChange"
                  />
                </template>
              </ArrivalTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AModal
    width="800px"
    v-model:visible="brandModal.visible"
    title="新建到货时效"
    centered
    destroy-on-close
    :confirm-loading="brandModal.confirmLoading"
    @ok="BrandsAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-10">
      <AForm
        layout="horizontal"
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 12 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <AFormItem label="选择仓库" name="warehouseName">
          <!-- @focus="focus" -->
          <a-select
            ref="select"
            v-model:value="warehouseValue"
            :options="wareHouseOptions"
            @change="change"
            placeholder="请选择仓库"
          />
        </AFormItem>
        <AFormItem label="到货时间" name="createdTime">
          <div>
            <a-input-number
              style="width: 360px"
              id="inputNumber"
              v-model:value="formState.createdTime"
              placeholder="请输入到货时间"
              :min="1"
              :max="999"
              @change="changeTime"
              addon-after="天"
            />
          </div>
        </AFormItem>
        <AFormItem label="到货区域" name="warehouseAddress">
          <ACascader
            class=""
            v-model:value="formState.warehouseAddress"
            :field-names="{ label: 'name', value: 'code', children: 'children' }"
            :options="options"
            placeholder="请选择地区"
            @change="onChange"
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  <AModal
    width="500px"
    v-model:visible="modifyModal.visible"
    title="修改到货天数"
    centered
    destroy-on-close
    :confirm-loading="modifyModal.confirmLoading"
    @ok="modifyAdd"
    @cancel="modifyCancel"
  >
    <div class="p-10">
      <AForm
        layout="horizontal"
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 12 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <AFormItem label="设置到货时间" name="modifyTime">
          <div class="flex">
            <a-input-number
              style="width: 200px"
              id="inputNumber"
              v-model:value="formState.modifyTime"
              placeholder="请输入到货时间"
              :min="1"
              :max="99"
              @change="changeTime"
              addon-after="天"
            />
          </div>
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, watch, onBeforeMount } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import ArrivalTable from '../component/ArrivalTable.vue'
  import type { CascaderProps } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'

  import type { FormInstance } from 'ant-design-vue'
  //   import uponArrivalForm from '/@/modules/StoreHouseModule/view/TimeOfArrival/conponents/uponArrivalForm.vue'
  import { uponArrival } from '/@/modules/StoreHouseModule/view/TimeOfArrival/data/uponArrival'
  import { filterTimeOfArrivalData } from '/@/modules/StoreHouseModule/view/TimeOfArrival/data/TimeOfArrivalData'
  import type { SelectProps } from 'ant-design-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { Pattern } from '@vocen/shared'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const fullName = ref('')
  const options = ref<CascaderProps['options']>([])
  const warehouseList = ref<SelectProps['options']>([])
  const cityValue = ref<string[]>([])
  const warehouseValue = ref<string[]>([])
  let areaCode = ref('')
  let companyId = ref('')
  const formRef = ref<FormInstance>()
  const filterData = ref()
  const merchantList = ref([])
  let arrivalStore = ref('')
  let arrivalCode = ref([])
  let arrivalStoreId = ref('')
  const { createMessage } = useMessage()
  const activeKey = ref('one')
  const tableLoading = ref(false)
  let wareHouseOptions = ref([] as any[])
  const loadingCtxkey = 'handlerRow'
  let warehouseId = ref('')

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
  //增加到货时效
  const modifyModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //增加到货时效
  const brandModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //新建到货时效弹框
  const addPrescription = async () => {
    formState.createdTime = ''
    formState.warehouseAddress = ''
    brandModal.visible = true

    filterStoreSelectList()
  }
  // table 列
  const tabColumns = ref(uponArrival)
  //列表数据
  let tableData = ref([])
  //左侧列表样式
  const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
  })
  const [registerForm] = useForm({
    labelWidth: 120,
    schemas: filterTimeOfArrivalData,
  })
  const slipTabEventApi = async () => {
    await filterStoreSelectList()
  }
  //省市区
  const initArea = () => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        console.log('省市区信息=>', res)
        options.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  //选择完拿到code
  const onChange: CascaderProps['onChange'] = (item) => {
    areaCode.value = item[2]
  }

  //搜索到供应商列表d的发货时效
  const search = async () => {
    adminHttp.CUSTOMER.companyInfoListStorehouse({
      areaCode: areaCode.value,
      platformCode: 'supplier',
      fullName: fullName.value,
    })
      .then((res) => {
        console.log('供应商列表信息=>', res)

        merchantList.value = res.data[0]?.companyInfoList ? res.data[0]?.companyInfoList : []
        // merchantList.value = res.data[0].companyInfoList[0].fullName
        createMessage.success({ content: `操作成功` })
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}` })
      })
  }
  //点击供应商列表中的某个供应商
  const merchantRender = async (item) => {
    console.log(item, 'item')
    companyId.value = item.id
    loadTableData()
  }
  //修改时效/v1/warehouse/arrival/{id}
  const modifyDay = async (record) => {
    modifyModal.visible = true
    const data = await adminHttp.Store.warehouseArrivalDay({ id: record.id })
    console.log(data, 'data')
    arrivalStore.value = data.data.warehouseId
    arrivalCode.value = data.data.areaCode
    arrivalStoreId.value = data.data.id
    formState.modifyTime = data.data.arrivalTime
  }
  //删除wareHouseArrivalid
  const deleteWarehouse = (record) => {
    console.log(record, '删除')
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Store.wareHouseArrival({ id: record.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //添加
  const BrandsAdd = () => {
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
            brandModal.visible = false
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
  //取消
  const BrandsCancel = () => {
    brandModal.visible = false
    formState.warehouseAddress = ''
  }
  //修改到货时效
  const modifyAdd = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        let map = {
          id: arrivalStoreId.value,
          // warehouseId: arrivalStore.value,
          arrivalTime: formState.modifyTime,
          // areaCode: arrivalCode.value,
        }
        adminHttp.Store.warehouseArrivalTime(map)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
            modifyModal.visible = false
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

  //取消到货时效
  const modifyCancel = () => {
    modifyModal.visible = false
    formState.modifyTime = ''
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //查询
  const filterStoreTableDataApiEvent = async (item) => {
    console.log(item.wareHouseName, 'iiii')
    // storeModel.name = item.name
    // storeModel.status = item.status
    await loadTableData(item.wareHouseName)
  }
  const paginations = reactive({
    total: 0,
    pageNo: 1,
    pageSize: 10,
  })
  //仓库下拉, id: companyId.value
  const filterStoreSelectList = async () => {
    wareHouseOptions.value = []
    let map = { type: statusAttrs[activeKey.value], companyId: companyId.value }
    const res = await adminHttp.Store.queryWareHouseDropDown(map)
    if (res.code === '20001') {
      res.data.filter((item) => {
        // console.log(item)label: 'name', value: 'id',
        let map = { value: item.id, label: item.name }
        wareHouseOptions.value.push(map)
      })
    }
  }

  const change = (item) => {
    console.log(item)
    warehouseId.value = item
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //查询
  //   const handlerFilterRest = ({ values }) => {
  //     filterData.value = values
  //     loadTableData()
  //   }
  //   const handlerFilterSubmit = ({ values }) => {
  //     filterData.value = values
  //     loadTableData()
  //   }
  //初始化
  let statusAttrs = { one: 1, two: 0 }
  const loadTableData = async (value = '') => {
    tableLoading.value = true
    const filterParams = {
      // ...filterData.value,
      type: statusAttrs[activeKey.value],
      ...paginations,
      companyId: companyId.value,
      warehouseId: value,
    }

    if (statusAttrs[activeKey.value] === 0) {
      delete filterParams.companyId
    }
    const { records, total } = await adminHttp.Store.warehouseArrivalQueryWarehouseArrivalTimePage(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    console.log(records)
    paginations.total = total
    tableData.value = records
  }
  const handlerRest = () => {
    paginations.pageNo = 1
    loadTableData()
  }
  const isIntNum = (val) => {
    var regPos = /^[0-9]+.?[0-9]*$/

    if (regPos.test(val)) {
      return true
    } else {
      return false
    }
  }
  const changeTime = () => {
    console.log('klkkk')
    if (formState.createdTime > 99) {
      formState.createdTime = ''
    }
    if (!formState.createdTime) return
    if (!isIntNum(formState.createdTime)) {
      console.log('222')
      formState.createdTime = ''
    }
  }
  //positiveNumber
  onMountedOrActivated(() => {
    loadTableData()
    initArea()
    filterStoreSelectList()
  })
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .tree-bg {
    height: calc(100vh - 58px);
    width: 350px;
  }

  .content {
    width: calc(100% - 350px);
    box-sizing: border-box;
  }

  .codeCity {
    width: 233px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }
</style>
