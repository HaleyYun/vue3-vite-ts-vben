<template>
  <div>
    <div class="m-24px">
      <div class="flex">
        <div class="mr-4 overflow-hidden tree-bg bg-white">
          <div class="p-4 text-base">供应商列表</div>
          <div class="flex p-4 pr-4">
            <a-input v-model:value="fullName" placeholder="输入企业名搜索" />
          </div>
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
                          @click="merchantRender(item)"
                          :value="item"
                        >
                          {{ item.fullName }}
                        </ARadio>
                      </ARadioGroup>
                    </template>
                  </AListItemMeta>
                </AListItem>
              </template>
            </AList>
          </div>
        </div>
        <div class="content border-assets">
          <div class="margin-10">
            <ATabs v-model:activeKey="activeKey" type="card" @change="slipTabEventApi">
              <ATabPane key="one" tab="供应商仓库" />
              <ATabPane key="two" tab="平台仓库" />
            </ATabs>
          </div>
          <div class="filter-assets">
            <BasicForm
              @register="registerForm"
              @reset="handlerRest"
              @submit="filterStoreTableDataApiEvent"
            />
          </div>
          <div>
            
            <EraSlotTable>
              <template #leftContent>
                <EraTableTitle :total="paginations.total" />
              </template>
              <template #tableEdit>
                <AButton
                  v-if="activeKey == 'one' && companyId"
                  type="primary"
                  @click="addStoreEventApi(record, alertEnum.Add)"
                  v-auth="'/v1/warehouse'"
                >
                  <PlusCircleOutlined class="margin-r-5" />
                  新增仓库
                </AButton>
              </template>
              <template #content>
                <ATable
                  class="table-space"
                  :columns="propsChildColumn"
                  :pagination="false"
                  :data-source="columnTypeData"
                  size="small"
                  bordered
                  :scroll="{ x: 1000,y:500 }"
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'status'">
                      <span v-if="record.status === 0">禁用</span>
                      <span v-if="record.status === 1">启用</span>
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                      <div class="flex margin-b-5">
                        <AButton
                          type="link"
                          class="margin-r-5"
                          @click="storeLogFunc(record)"
                          v-auth="'/v1/warehouse/statis/supplier/transfer'"
                          >仓库日志
                        </AButton>
                        <AButton
                          type="link"
                          v-if="activeKey == 'one'"
                          @click="viewStoreListFunc(record)"
                          >查看库存
                        </AButton>
                      </div>
                      <div class="flex margin-b-5">
                        <AButton
                          type="link"
                          class="margin-r-5"
                          @click="deliveryFunc(record)"
                          v-auth="'/v1/warehouse/delivery/page'"
                          >发货时效
                        </AButton>
                        <AButton
                          type="link"
                          @click="thenFunc(record)"
                          v-auth="'/v1/warehouse/queryWareHouseDropDown'"
                        >
                          到货时效
                        </AButton>
                      </div>
                      <div class="flex margin-b-5" v-if="activeKey == 'one'">
                        <AButton
                          type="link"
                          class="margin-r-5"
                          @click="addStoreEventApi(record, alertEnum.Edit)"
                          v-auth="'/v1/warehouse'"
                          >修改
                        </AButton>
                        <APopconfirm
                          title="确认要禁用吗？"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="disableEventApi(record)"
                          v-auth="'/v1/warehouse/forbidden'"
                        >
                          <template v-if="record.status === 1">
                            <AButton type="link">禁用</AButton>
                          </template>
                        </APopconfirm>
                        <APopconfirm
                          title="确认要启用吗？"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="startUseEventApi(record)"
                          v-auth="'/v1/warehouse/startup'"
                        >
                          <template v-if="record.status === 0">
                            <AButton type="link">启用</AButton>
                          </template>
                        </APopconfirm>
                      </div>
                    </template>
                  </template>
                </ATable>
              </template>
            </EraSlotTable>
            <div class="flex justify-end py-15px mr-24px bg-white">
              <VoPagination
                :size="'default'"
                :total="paginations.total"
                :current="paginations.pageNo"
                :page-size="paginations.pageSize"
                @pagination="paginationChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EraColumnForm
      :width="propsAlertW"
      :title="alertModel.handleStoreType"
      ref="viewDetailsFormRef"
      @submit="createStoreApiEvent"
      @close="closeBackOrign"
    >
      <template #NilFileContent>
        <BasicForm @register="registerAlertForm" @submit="handleCreateStore" />
      </template>
    </EraColumnForm>
    <!--查看库存-->
    <EraColumnForm
      :width="propsAlertW"
      title="仓库日志"
      ref="TimeOfArrivalRef"
      @submit="confirmStoreApiEvent"
    >
      <template #NilFileContent>
        <StoreLogManagement :propsRecord="propsRecord" />
      </template>
    </EraColumnForm>
    <!--发货时效-->
    <EraColumnForm
      :width="propsAlertW"
      title="发货时效"
      ref="deliveryRef"
      @submit="confirmStoreApiEvent"
    >
      <template #NilFileContent>
        <StoreDeliveryTimeLimit :propsRecord="propsRecord" />
      </template>
    </EraColumnForm>
    <AModal
      width="1200px"
      v-model:visible="brandModal.visible"
      :title="brandModal.title"
      centered
      destroy-on-close
      :confirm-loading="brandModal.confirmLoading"
      @ok="BrandsAdd"
      okText="添加"
      @cancel="BrandsCancel"
    >
      <div class="p-10">
        <AForm
          layout="inline"
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <AFormItem
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 22 }"
            label="供应商"
            name="brandName"
          >
            <AInput disabled v-model:value="corporateName" />
          </AFormItem>
          <AFormItem
            :label-col="{ span: 16 }"
            :wrapper-col="{ span: 22 }"
            label="仓库名"
            name="warehouseName"
          >
            <AInput
              :maxlength="20"
              v-model:value="formState.warehouseName"
              placeholder="请输入仓库"
            />
          </AFormItem>
          <AFormItem
            :label-col="{ span: 16 }"
            :wrapper-col="{ span: 24 }"
            label="仓库地址"
            name="warehouseAddress"
          >
            <a-input
              v-model:value="formState.warehouseAddress"
              readonly
              placeholder="请选择详细地址"
            >
              <template #addonAfter>
                <div @click="chooseMapHandler">选择</div>
              </template>
            </a-input>
            <!-- <ACascader
			  class="codeCity"
			  v-model:value="formState.warehouseAddress"
			  :field-names="{ label: 'name', value: 'code', children: 'children' }"
			  :options="options"
			  placeholder="请选择地区"
			  @change="onChange"
			/> -->
          </AFormItem>
        </AForm>
      </div>
    </AModal>
    <a-modal v-model:visible="tipsVisible" :footer="null">
      <div class="p-15px">
        <a-result status="success" title="添加成功！" sub-title="您可以选择以下操作">
          <template #extra>
            <a-button key="console" type="primary" @click="deliverGoods">创建发货时效</a-button>
            <a-button key="buy" @click="arrivalGoods">创建到货时效</a-button>
          </template>
        </a-result>
      </div>
    </a-modal>
    <VoMap
      v-model:visible="showMapBoo"
      :value="warehouseAddress"
      @select="mapAddressSelectHandler"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, reactive, onBeforeMount } from 'vue'
  import { PlusCircleOutlined } from '@ant-design/icons-vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import TreeSupplier from '/@/modules/StoreHouseModule/view/StoreManager/component/TreeSupplier.vue'
  import EraSlotTable from '/@/components/EraSlotTable/EraSlotTable.vue'
  import VoMap from '/@/components/VoMap/VoMap.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import type { CascaderProps } from 'ant-design-vue'
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import {
    filterStoreContent,
    filterStoreManagerData,
    platformColumn,
    storeCommonColumn,
    createStore,
  } from '/@/modules/StoreHouseModule/view/StoreManager/component/filterStoreManagerData/filterStoreManagerData'
  import filterStoreManagerTable from '/@/modules/StoreHouseModule/view/StoreManager/component/filterStoreManagerTablel.vue'
  import StoreLogManagement from '/@/modules/StoreHouseModule/view/StoreManager/view/StoreLogManagement.vue'
  import StoreDeliveryTimeLimit from '/@/modules/StoreHouseModule/view/StoreManager/view/StoreDeliveryTimeLimit.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'

  const { createMessage } = useMessage()
  const loadingkey = 'handlerRow'
  import adminHttp from '/@/utils/http/adminHttp'
  import type { FormInstance } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'StoreManager',
    components: {
      EraColumnForm,
      TreeSupplier,
      BasicForm,
      EraSlotTable,
      VoPagination,
      PlusCircleOutlined,
      StoreDeliveryTimeLimit,
      StoreLogManagement,
      filterStoreManagerTable,
      VoMap,
      EraTableTitle,
    },
    setup() {
      const fullName = ref('')
      const tipsVisible = ref<boolean>(false)
      const go = useRouter()

      // “编辑” 或者 “或者” 得标识  Edit：编辑； Add: 新增
      enum alertEnum {
        Edit = '修改',
        Add = '新建仓库',
      }

      interface FormState {
        brandName: string
        warehouseName: any
        warehouseAddress: any
      }

      const formState = reactive<FormState>({
        brandName: '',
        warehouseName: '',
        warehouseAddress: '',
        latitude: '', //
        longitude: '',
      })
      const warehouseAddress = ref<string>('')
      const warehouseId = ref('')
      const warehouseLocal = ref('')
      const loadingCtxkey = 'handlerRow'
      const merchantList = ref([])
      const vagueList = ref([])
      const corporateName = ref('')
      const formRef = ref<FormInstance>()
      const options = ref<CascaderProps['options']>([])
      let areaCode = ref('')
      let companyId = ref('')
      let deliveryRef = ref()
      let propsRecord = ref<Object>({})
      let propsAlertW = ref<Number>(520)
      let changeItem = ref<Object>({})
      let storeType = ref<Boolean>(false)
      let viewDetailsFormRef = ref()
      let TimeOfArrivalRef = ref()
      let switchTableContentRef = ref()
      let propsChildColumn = ref<any>([])
      let activeKey = ref('one')
      let filterStoreManagerTableData = ref<any>([])
      let columnTypeData = ref([])
      const deliverWarehouseId = ref<any>('')

      const [registerForm] = useForm({
        labelWidth: 120,
        schemas: filterStoreContent,
        autoSubmitOnEnter: true,
      })
      const statusAttrs = {
        one: 1,
        two: 0,
      }
      const storeModel = reactive({
        name: '',
        status: '',
        type: statusAttrs[activeKey.value],
      })
      // const storeValue = {

      //   type: activeKey.value,
      // }
      const alertModel = {
        handleStoreType: '创建仓库',
        changeStore: '修改仓库',
      }
      // 选择地址
      const chooseMapHandler = () => {
        showMapBoo.value = true
      }
      // 选择地图
      const showMapBoo = ref(false)
      // 选择地址回显
      const mapAddressSelectHandler = (data) => {
        formState.warehouseAddress = data.name + `(${data.address})`
        const { location } = data
        warehouseAddress.value = data.address
        formState.latitude = location.lat
        formState.longitude = location.lng
      }
      watch(
        () => activeKey.value,
        (newValue) => {
          console.log(newValue)
          propsChildColumn.value = []
          storeModel.type = newValue
          if (newValue === 'one') {
            propsChildColumn.value = storeCommonColumn
          } else {
            propsChildColumn.value = platformColumn
          }
        },
        { deep: true, immediate: true },
      )
      const filterParams = (obj) => {
        let _newPar = {}
        for (let key in obj) {
          if (
            (obj[key] === 0 || obj[key] === false || obj[key]) &&
            obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
          ) {
            _newPar[key] = obj[key]
          }
        }
        return _newPar
      }
      //搜索到供应商列表
      const search = async () => {
        adminHttp.CUSTOMER.companyInfoListStorehouse({
          areaCode: areaCode.value,
          platformCode: 'supplier',
          fullName: fullName.value,
        })
          .then((res) => {
            console.log('供应商列表信息=>', res.data)
            //这里map  模糊搜这个  郑州江陵动力科技有限公司
            merchantList.value = []
            res.data.forEach((item) => {
              item.companyInfoList.forEach((info) => {
                merchantList.value.push(info)
              })
            })
            console.log(merchantList.value, 'vagueList.value')

            // merchantList.value = res.data[0]?.companyInfoList
            // console.log(merchantList.value,'merchantList.value');
            corporateName.value = res.data[0]?.companyInfoList[0].fullName
          })
          .catch((err) => {
            createMessage.error({ content: `获取列表失败:${err.message}` })
          })
      }
      //左侧列表样式
      const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
      })
      //点击供应商列表中的某个供应商
      const merchantRender = async (item) => {
        companyId.value = item.id
        filterTableData()
      }
      //初始化

      const filterTableData = async () => {
        let storeModelMap = filterParams(storeModel)
        try {
          let map: any = {
            ...paginations,
            ...storeModelMap,
            type: statusAttrs[activeKey.value],
            companyId: companyId.value,
          }
          if (statusAttrs[activeKey.value] === 0) {
            delete map.companyId
          }
          const { code, data } = await adminHttp.Store.warehouseQueryWareHousePage(map)
          if (code == '20001') {
            columnTypeData.value = data.records
            paginations.total = data.total
            // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
            if (paginations.pageNo > 1 && columnTypeData.value.length === 0) {
              paginations.pageNo = paginations.pageNo - 1
              filterTableData()
            }
          }
        } catch (e: any) {
          createMessage.error({ content: `操作失败:${e.message}`, key: loadingkey })
        }
      }
      //查询表单
      const filterStoreTableDataApiEvent = async (item) => {
        storeModel.name = item.name
        storeModel.status = item.status
        await filterTableData()
      }
      const handlerRest = () => {
        paginations.pageNo = 1
        storeModel.name = ''
        storeModel.status = ''
        filterTableData()
      }
      //禁用
      const disableEventApi = async (record) => {
        try {
          const map = { warehouseId: record.warehouseId }
          const res = await adminHttp.Store.warehouseforbidden(map)
          if (res.code === '20001') {
            createMessage.success({ content: `禁用操作成功`, key: loadingkey })
            await filterTableData()
            viewDetailsFormRef.value.isCloseAlertShow()
          }
        } catch (err: any) {
          createMessage.error({ content: `禁用操作失败`, key: loadingkey })
        }
      }
      //启用
      const startUseEventApi = async (record) => {
        try {
          const map = { warehouseId: record.warehouseId }
          const res = await adminHttp.Store.warehouseStartup(map)
          if (res.code === '20001') {
            createMessage.success({ content: `启用操作成功`, key: loadingkey })
            await filterTableData()
            viewDetailsFormRef.value.isCloseAlertShow()
          }
        } catch (err: any) {
          createMessage.error({ content: `禁用操作失败`, key: loadingkey })
        }
      }
      const paginations = reactive({
        total: 0,
        pageNo: 1,
        pageSize: 10,
      })
      const paginationChange = ({ current, pageSize }) => {
        console.log('999999')

        paginations.pageNo = current
        paginations.pageSize = pageSize
        filterTableData()
      }
      const slipTabEventApi = async () => {
        await filterTableData()
      }
      //增加
      const brandModal = reactive({
        visible: false,
        title: '',
        currentItem: null,
        rejectReason: '',
        confirmLoading: false,
        currentId: '',
      })
      //新建仓库/修改/v1/warehouse/{id}
      const addStoreEventApi = async (record, title) => {
        if (title == alertEnum.Add) {
          brandModal.title = title
          brandModal.visible = true
        } else {
          brandModal.title = title
          brandModal.visible = true
          formState.warehouseName = record.warehouseName
          formState.warehouseAddress = record.address
          warehouseLocal.value = record.areaCode
          warehouseId.value = record.warehouseId
        }
      }
      const handleCreateStore = async (item) => {
        if (storeType.value === true) {
          await requestCreateStoreApi(item)
        } else {
          await requestChangeStoreApi(item)
        }
      }
      //仓库日志
      const storeLogFunc = async (record) => {
        propsRecord.value = record
        propsAlertW.value = 1200
        TimeOfArrivalRef.value.isOpenAlertShow()
      }
      //添加
      const requestCreateStoreApi = async (item) => {
        try {
          let map = { name: item.name, status: storeModel.status, type: storeModel.type }
          createMessage.loading({ content: 'Loading...', key: loadingkey })
          const res = await adminHttp.Store.warehouseAdd(map)
          if (res.code === '20001') {
            createMessage.success({ content: `获取列表成功`, key: loadingkey })
            await filterTableData()
            viewDetailsFormRef.value.isCloseAlertShow()
          }
        } catch (err: any) {
          createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingkey })
        }
      }
      //修改
      const requestChangeStoreApi = async (item) => {
        let changeMap = { name: item.name, id: changeItem.value['warehouseId'] }
        createMessage.loading({ content: 'Loading...', key: loadingkey })
        try {
          let res = await adminHttp.Store.warehouseChange(changeMap)
          if (res.code === '20001') {
            createMessage.success({ content: `获取列表成功`, key: loadingkey })
            await filterTableData()
            viewDetailsFormRef.value.isCloseAlertShow()
          }
        } catch (err: any) {
          createMessage.error({ content: `获取列表失败: ${err.message}`, key: loadingkey })
        }
      }
      const createStoreApiEvent = async () => {
        await opFormSubmit()
      }
      const closeBackOrign = () => {}
      const confirmStoreApiEvent = async () => {
        TimeOfArrivalRef.value.isCloseAlertShow()
        propsAlertW.value = 520
      }
      const changeStoreFunc = (item) => {
        alertModel.handleStoreType = '修改仓库信息'
        setTimeout(() => {
          setFieldsValue({
            name: item.warehouseName,
            address: item.address,
          })
        }, 100)
        changeItem.value = item
        viewDetailsFormRef.value.isOpenAlertShow()
        storeType.value = false
      }
      //跳转库存
      const viewStoreListFunc = (item) => {
        console.log(item, 'item')

        go.push({
          path: '/goodsManage/goods/goodsApply',
          query: {
            shopId: item.companyId,
          },
        })
      }
      //
      const thenFunc = (item) => {
        go.push({
          path: '/store/timeOfArrivalManager/timeOfArrival',
          query: {
            item: item,
            id: item.id,
          },
        })
      }
      /**
       * @description: 发货时效
       */
      const deliveryFunc = (item) => {
        go.push({
          path: '/store/storeManagerList/storeDeliverGoods',
          query: {
            id: item.warehouseId,
          },
        })
      }
      const [registerAlertForm, { submit: opFormSubmit, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: createStore,
        showSubmitButton: false,
        showResetButton: false,
      })
      //省市区
      const initArea = () => {
        adminHttp
          .sixHotAreaTree()
          .then((res) => {
            console.log('省市区信息=>', res)
            options.value = res.data
            createMessage.success({ content: `获取列表成功` })
          })
          .catch((err) => {
            createMessage.error({ content: `获取列表失败:${err.message}` })
          })
      }
      /**
       * @description: 发货时效
       */
      const deliverGoods = () => {
        go.push({
          path: '/store/storeManagerList/storeDeliverGoods',
          query: {
            id: deliverWarehouseId.value,
          },
        })
      }
      //选择完地区拿到code
      const onChange: CascaderProps['onChange'] = (item) => {
        areaCode.value = item[2]
      }
      //添加/修改
      const BrandsAdd = () => {
        if (brandModal.title === alertEnum.Add) {
          formRef.value
            .validate()
            .then((res) => {
              console.log(res, 'success')

              createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
              let map = {
                name: formState.warehouseName,
                status: storeModel.status,
                type: 1,
                address: warehouseAddress.value,
                companyId: companyId.value,
                latitude: formState.latitude,
                longitude: formState.longitude,
              }
              adminHttp.Store.warehouseAdd(map)
                .then((res) => {
                  createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                  tipsVisible.value = true
                  deliverWarehouseId.value = res.data
                  filterTableData()
                  brandModal.visible = false
                  formState.brandName = ''
                  formState.warehouseName = ''
                  formState.warehouseAddress = ''
                })
                .catch((err) => {
                  createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
                })
            })
            .catch((e) => {
              console.log(e, '校验不通过')
            })
        } else {
          // 修改
          formRef.value.validate().then((res) => {
            let changeMap = {
              id: warehouseId.value,
              name: formState.warehouseName,
              address: warehouseAddress.value,
              latitude: formState.latitude,
              longitude: formState.longitude,
            }
            console.log(res, 'success')
            createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
            adminHttp.Store.warehouseChange(changeMap)
              .then(() => {
                createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
                // item.status = 1
                filterTableData()
                brandModal.visible = false
                formState.brandName = ''
                formState.warehouseName = ''
                formState.warehouseAddress = ''
              })
              .catch((err) => {
                createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
              })
          })
        }
      }
      //取消
      const BrandsCancel = () => {
        brandModal.visible = false
        formState.brandName = ''
        formState.warehouseName = ''
        formState.warehouseAddress = ''
      }

      const onFinish = (values: any) => {
        console.log('Success:', values)
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      //
      const arrivalGoods = () => {
        go.push({
          path: '/store/timeOfArrivalManager/timeOfArrival',
        })
      }
      onMountedOrActivated(() => {
        initArea()
        filterTableData()
      })

      return {
        deliverGoods,
        arrivalGoods,
        tipsVisible,
        deliverWarehouseId,
        warehouseId,
        onFinish,
        onFinishFailed,
        brandModal,
        BrandsCancel,
        BrandsAdd,
        merchantRender,
        onChange,
        showMapBoo,
        areaCode,
        filterStoreManagerData,
        confirmStoreApiEvent,
        createStoreApiEvent,
        closeBackOrign,
        handleCreateStore,
        filterStoreTableDataApiEvent,
        registerForm,
        handlerRest,
        registerAlertForm,
        slipTabEventApi,
        paginationChange,
        addStoreEventApi,
        disableEventApi,
        startUseEventApi,
        changeStoreFunc,
        storeLogFunc,
        viewStoreListFunc,
        deliveryFunc,
        chooseMapHandler,
        mapAddressSelectHandler,
        deliveryRef,
        propsRecord,
        propsAlertW,
        TimeOfArrivalRef,
        changeItem,
        storeType,
        alertModel,
        viewDetailsFormRef,
        columnTypeData,
        switchTableContentRef,
        propsChildColumn,
        filterStoreManagerTableData,
        storeModel,
        activeKey,
        options,
        cityValue: ref<string[]>([]),
        search,
        merchantList,
        radioStyle,
        companyId,
        paginations,
        alertEnum,
        formState,
        formRef,
        corporateName,
        warehouseLocal,
        thenFunc,
        fullName,
        warehouseAddress,
      }
    },
  })
</script>
<style scoped lang="less">
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
</style>
