<template>
  <div class="m-24px">
    <div class="bg-white my-24px bg-white p-24px pb-4px">
      <MotorcycleTypeForm
        @rest="handlerFilterRest"
        @submit="handlerFilterSubmit"
        :currentTabIndex="activeKey"
      />
    </div>
    <div class="p-24px bg-white">
      <div>
        <div>
          <EraTableTitle :total="paginations.total">
            <template #tableEdit>
              <div>
                <AButton :disabled="!hasSelected" @click="bindingAll">批量绑定</AButton>
              </div>
            </template></EraTableTitle
          >
          <ATable
            v-if="tableData.length"
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            :rowKey="(record) => record.levelid"
            size="small"
            bordered
            :row-selection="{
              selectedRowKeys: state.selectedRowKeys,
              onChange: onSelectChange,
            }"
            :scroll="{ x: 1200,y:600 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'modelCorrelation'">
                <template v-if="record.modelCorrelation!='' && record.modelCorrelation!=null">
                  <span>{{ record.modelCorrelation.toString() }}</span>
                  <!-- <div class="flex-1 flex-wrap flex -ml-110px">
                    <div
                      class="px-5px pb-3px"
                      v-for="(item, index) in record.modelCorrelation"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div> -->
                  <FormOutlined
                    :style="{ color: '#1890ff' }"
                    class="margin-l-10 text-blue-500"
                    @click="bindingModelCorrelation(record)"
                  />
                </template>
                <template v-else>
                  <AButton type="link" @click="bindingRemark(record)">关联</AButton>
                </template>
              </template>
              <template v-if="column.dataIndex === 'remark'">
                <template v-if="record.modelCorrelation!='' && record.modelCorrelation!=null">
                  <template v-if="record.remark">
                    <span v-if="record.remark">{{ record.remark }}</span>
                  <FormOutlined
                    :style="{ color: '#1890ff' }"
                    class="margin-l-10 text-blue-500"
                    @click="bindingModelCorrelation(record)"
                  />
                  </template>
                  <template v-else>
                  <AButton type="link" @click="bindingModel(record)">录入</AButton>
                </template>
                </template>
                <template v-else>
                  <span>{{ record.remark }}</span>
                  <AButton type="link" @click="bindingRemarkModel(record)">录入</AButton>
                </template>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <AButton type="link" class="submit-btn" @click="viewModel(record)">查看 </AButton>
              </template>
            </template>
          </ATable>
        </div>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
    <AModal
      v-model:visible="motorcycleModal.visible"
      width="600px"
      :title="motorcycleModal.title"
      centered
      destroy-on-close
      :confirm-loading="motorcycleModal.confirmLoading"
      @ok="BrandsAdd"
      @cancel="BrandsCancel"
    >
      <div class="p-15px">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
          autocomplete="off"
        >
          <AFormItem label="选择型号" name="brandLoGo">
            <a-select
            v-model:value="formState.brandLoGo"
            mode="multiple"
            placeholder="请选择型号"
            :options="classData"
            show-search
            :max-tag-count="8"
            allow-clear
            :filter-option="false"
            :not-found-content="fetchStoreing ? undefined : null"
            @search="onStorageSearch"
          />
          <template v-if="fetchStoreing" #notFoundContent>
          <a-spin size="small" />
         </template>
          </AFormItem>
          <AFormItem label="随车备注" name="brandName">
            <a-textarea
              :rows="4"
              v-model:value="formState.brandName"
              :maxlength="50"
              placeholder="请输入随车备注"
              show-count
              allow-clear
            />
          </AFormItem>
        </AForm>
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts" name="ModelConfiguration">
  import { reactive, ref, watch, computed, onBeforeMount } from 'vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import MotorcycleTypeForm from './component/MotorcycleTypeForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { FormOutlined } from '@ant-design/icons-vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig,resettingTypeList } from './data/MotorcycleTypeData'
  import { _ } from '@vocen/shared'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'
  const { createMessage } = useMessage()
  const router = useRouter()
  let classData = ref([] as any[])
  const fetchStoreing = ref(false)
  interface FormState {
    brandName: any
    brandLoGo: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    brandName: '',
    brandLoGo: [],
  })

  //绑定
  const motorcycleModal = reactive({
    visible: false,
    title: '关联平台发动机型号',
    currentItem: null,
    correlationId: '',
    confirmLoading: false,
    currentId: '',
  })

  /** reject action end **/

  const activeKey = ref('one')

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
    resettingTypeList()
    
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = values
    loadTableData()
  }

  // table 列
  const tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  watch(activeKey, async () => {
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    await loadTableData()
  })

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelModelList(
      clearObjectUnalbeAttr(filterParams),
    )
    tableLoading.value = false
    paginations.total = data.total
    tableData.value = data.records
  }

  const state = reactive<{ selectedRowKeys: []; selectedRows: [] }>({
    selectedRowKeys: [], // Check here to configure the default column
    selectedRows: [],
  })
  //全选
  const bindingAll = () => {
    motorcycleModal.visible = true
  }
  //无值弹窗
  const bindingRemark = (record) => {
    formState.brandName = record.remark
    motorcycleModal.currentId = record.levelid
    motorcycleModal.visible = true
  }
  //录入
  const bindingModel=(record) => {
    motorcycleModal.currentId = record.levelid
    formState.brandLoGo = record.modelCorrelationId.split(',')
    motorcycleModal.visible = true
  }
  //有值弹窗
  const bindingModelCorrelation = (record) => {
    formState.brandName = record.remark
    motorcycleModal.currentId = record.levelid
    formState.brandLoGo = record.modelCorrelationId.split(',')
    motorcycleModal.visible = true
  }
  const bindingRemarkModel=(record) => {
    formState.brandLoGo = []
    formState.brandName = record.remark
    motorcycleModal.currentId = record.levelid
    motorcycleModal.visible = true
  }
  //是否选中
  const hasSelected = computed(() => state.selectedRowKeys.length > 0)

  //选中的值
  const onSelectChange = (selectedRowKeys: [], selectedRows: any) => {
    state.selectedRowKeys = selectedRowKeys
    const dataRows = selectedRows
    if (selectedRows) {
      state.selectedRows = dataRows.map((item) => ({
        levelId: item.levelid,
        // model: formState.brandLoGo,
        // remark: formState.brandName,
        // id: item.correlationId ? item.correlationId : '',
      }))
      console.log(state.selectedRows)
    }
  }

  //点击确定
  const BrandsAdd = async () => {
    if (state.selectedRowKeys.length > 0) {
      let vehicleData = { modelId: formState.brandLoGo, remark: formState.brandName }

      const params = state.selectedRows.map((item: any) => {
        return {
          ...item,
          ...vehicleData,
        }
      })
      try {
        const { code } = await adminHttp.VEHICLE.communityVehicleModelBindBatchModel(params)
        if (+code == 20001) {
          loadTableData()
          motorcycleModal.visible = false
          formState.brandLoGo = []
          formState.brandName = ''
          state.selectedRowKeys=[]
        }
      } catch (e: any) {
        console.log(e)
        console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      }
    } else {
      let paramsData = {
        modelId: formState.brandLoGo,
        remark: formState.brandName,
        levelId: motorcycleModal.currentId,
        // id: motorcycleModal.correlationId,
      }

      try {
        const { code } = await adminHttp.VEHICLE.communityVehicleModelBindBatchModel([paramsData])
        if (+code == 20001) {
          loadTableData()
          motorcycleModal.visible = false
          formState.brandLoGo = []
          formState.brandName = ''
        }
      } catch (e: any) {
        console.log(e)
        console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      }
    }
  }
  //获取型号
  const getClassData = async (keyword:string) => {
    try {
      fetchStoreing.value = true
      const res = await adminHttp.GOODS.goodsModelSelectList({ pageSize: 999 ,keyword})
      if (res.code === '20001') {
        classData.value = res.data.map((item) => ({
          label: item.model,
          value: item.id,
        }))
        fetchStoreing.value = false
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }
  onBeforeMount(() => {
    loadTableData()
    getClassData('')
  })
  // 查看详情
  const viewModel = (record) => {
    router.push({
      path: '/goodsManage/goodsConfigation/configurationDetails',
      query: { id: record.levelid },
    })
  }
  const BrandsCancel = () => {
    motorcycleModal.visible = false
    formState.brandName = ''
    formState.brandLoGo = []
  }
  const onStorageSearch = _.debounce(getClassData, 300)
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }
  ::v-deep(.ant-select-selection-item){
    width: 120px;
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

  .rich-column {
    display: flex;

    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
    }

    .rich-content {
    }
  }

  .show-row {
    margin-bottom: 10px;

    &__label {
      color: #555;
    }

    &__content {
      color: #000;
    }
  }

  .table-operations__button {
    margin: 15px 15px 0 15px;
  }
</style>
