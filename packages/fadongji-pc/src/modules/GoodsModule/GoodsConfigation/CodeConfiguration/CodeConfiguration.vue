<template>
  <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <ATable
          :loading="tableLoading"
          :columns="shareColumn"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" size="small" @click="cancelActivation(record)">编辑</AButton>
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
    <AModal
      v-model:visible="categoryModal.visible"
      :title="categoryModal.title"
      centered
      destroy-on-close
      :confirm-loading="categoryModal.confirmLoading"
      @ok="categoryAdd"
    >
      <div class="p-5">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          autocomplete="off"
        >
          <AFormItem name="name" label="型号" :label-col="{ span: 6 }" :wrapper-col="{ span: 5 }">
            <div>{{ categoryModal.modelName }}</div>
          </AFormItem>
          <template v-for="(item, index) in categoryModal.warehouseList" :key="index">
            <AFormItem name="select" :label="item.warehouseName">
              <div class="flex">
                <div class="mt-6px">
                  <a-switch @change="stateEnable(item)" v-model:checked="item.isEnable" />
                </div>

                <div v-if="item.isEnable" class="flex mx-30px">
                  <div class="mt-6px">打码费</div>
                  <div class="w-60px mx-10px"><a-input v-model:value="item.price" /></div>
                  <div class="mt-6px">元/台</div>
                </div>
              </div>
            </AFormItem>
          </template>
        </AForm>
      </div>
    </AModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, operationColumn } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { _ } from '@vocen/shared'
  // --------全局参数---------------
  const { createMessage } = useMessage()

  // ------操作按钮----------
  //对话框
  const categoryModal = reactive<any>({
    visible: false,
    title: '编辑',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    modelId: '',
    modelName: '',
    warehouseList: [],
  })

  // 编辑
  const cancelActivation = (record) => {
    console.log(record.warehouseCodingVOS, 'record')
    categoryModal.modelName = record.modelName
    categoryModal.warehouseList = _.cloneDeep(record.warehouseCodingVOS)
    categoryModal.visible = true
    categoryModal.modelId = record.modelId
  }

  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1

    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  const formState = reactive<FormState>({
    name: '',
    select: '',
  })

  interface FormState {
    name: string
    select: any
  }

  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.WAREHOUSE.warehouseCodingQueryList(params)
      if (code === '20001') {
        tableData.value = data.records
          ? data.records.map((item) => {
              const warehouseCodingVOS = item.warehouseCodingVOS
              const obj = { ...item }
              warehouseCodingVOS.forEach((item) => {
                if (item.isEnable) {
                  obj[item.warehouseId] = item.price === 0 ? '此仓库免费打码' : item.price
                } else {
                  obj[item.warehouseId] = '不支持打码'
                }
              })
              return obj
            })
          : []
        paginations.total = data.total

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  //仓库打码 /v1/warehouse/plat
  let shareColumn = ref(tableColumns)
  let operation = ref(operationColumn)
  const getTemplateData = async () => {
    try {
      const { code, data } = await AdminHttp.WAREHOUSE.warehousePlat()
      if (code === '20001') {
        let templateData = data
        if (templateData.length > 0) {
          templateData = templateData.map((item) => {
            return { title: item['name'] + '打码费(元/台)', dataIndex: item['id'], width: 150 }
          })
          shareColumn.value = [...shareColumn.value, ...templateData, ...operation.value]
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //启用状态
  const displayChecked = ref(false)
  const stateEnable = (row) => {
    categoryModal.warehouseList = categoryModal.warehouseList.map((item: any) => {
      return {
        ...item,
        price: item.warehouseId === row.warehouseId ? 0 : item.price,
      }
    })
    // if (checked) {
    //   displayChecked.value = true
    // } else {
    //   displayChecked.value = false
    // }
  }
  const categoryAdd = () => {
    console.log(categoryModal.warehouseList, 'categoryModal.warehouseList')
    AdminHttp.WAREHOUSE.warehouseCodingUpdate({
      codingList: categoryModal.warehouseList
        .filter((item: any) => {
          return item.isEnable === true
        })
        .map((item) => {
          return {
            warehouseId: item.warehouseId,
            price: item.price,
          }
        }),
      modelId: categoryModal.modelId,
    })
      .then((res) => {
        if (res.code === '20001') {
        }
        loadTableData()
        categoryModal.visible = false
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}` })
      })
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
    getTemplateData()
  })
</script>

<style scoped lang="less"></style>
