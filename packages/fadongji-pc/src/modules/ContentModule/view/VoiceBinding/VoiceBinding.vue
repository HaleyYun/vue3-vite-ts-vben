<template>
 <div>
  <div class="mx-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <AButton
            type="primary"
            :disabled="selectedRow.length === 0"
            class="margin-l-r-10"
            @click="batchOperation"
            v-auth="'/v1/content/voice/recognize/bind/delete/batch'"
          >
            批量删除
          </AButton>
        
          <AButton type="primary" class="margin-l-r-10" @click="addDetails(record, alertEnum.Add)" v-auth="'/v1/content/voice/recognize/bind/save'"
            >新增内容
          </AButton>
        </template>
      </EraTableTitle>
      <div>
        <ATable
          :loading="tableLoading"
          :row-selection="rowSelection"
          :rowKey="(record) => record.id"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'isEnable'">
              <!--@click="changeItem(record)"-->
              <ASwitch
                @change="statesEnable(record)"
                :checked="record.isEnable"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
              <!-- v-auth="'/v1/content/voice/recognize/bind/'" -->
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" @click="addDetails(record, alertEnum.Edit)" v-auth="'/v1/content/voice/recognize/bind/update'">编辑</AButton>

              <APopconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handlerDeletedRow(record)"
                v-auth="'/v1/content/voice/recognize/bind/'"
              >
                <AButton type="link">删除</AButton>
              </APopconfirm>
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
  </div>
  <AModal
    v-model:visible="voiceModal.visible"
    :title="voiceModal.title"
    centered
    destroy-on-close
    :confirm-loading="voiceModal.confirmLoading"
    @ok="categoryAdd"
    @cancel="BrandsCancel"
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
        <AFormItem
          name="name"
          label="内容名称"
          :rules="[{ required: true, message: '请输入分类名称' }]"
        >
          <AInput v-model:value="formState.name" :maxlength="10" placeholder="请输入分类名称" />
        </AFormItem>
        <AFormItem
          name="select"
          label="跳转页面"
          :rules="[{ required: true, message: '请选择跳转页面' }]"
        >
          <a-select
            v-model:value="formState.select"
            placeholder="请选择功能区"
            :options="classData"
          />
        </AFormItem>
        <AFormItem name="switch" label="是否启用">
          <a-switch v-model:checked="formState.switch" />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  <AModal
    title="批量删除"
    v-model:visible="eraModal.visible"
    :confirmLoading="confirmLoading"
    @ok="eraModalOk"
  >
    <div class="p-24px">确定要删除这些数据吗？</div>
  </AModal>
 </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount, toRefs, unref } from 'vue'

  //   import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  //   import { useContentWithOut } from '/@/store/modules/content'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import type { FormInstance } from 'ant-design-vue'
  import { tableColumns } from './data/configuration'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const classData = ref([] as any[])
  const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()
  const formRef = ref<FormInstance | undefined>()
  const formState = reactive<FormState>({
    name: '',
    select: null,
    switch: true,
  })

  interface FormState {
    name: string
    select: any
    switch: any
  }

  //  --- 全选 筛选操作 ----
  const selectedRow = ref<string[]>([])
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows: object[]) => {
      // selectedRowKeys 返回id集合，selectedRows返回选中的那一条的数据
      console.log(selectedRows)
      selectedRow.value = selectedRowKeys
    },
  }
  // ----批量操作删除----
  const confirmLoading = ref(false)
  const eraModal = reactive({
    visible: false,
  })
  const batchOperation = () => {
    // 这里做一些初始化数据的操作 有可能弹出框是一批数据的设置
    eraModal.visible = true
  }
  const eraModalOk = async () => {
    confirmLoading.value = true
    try {
      let params = { ids: selectedRow.value }
      const { code, message } = await adminHttp.CONTENT.contentVoiceRecognizeBindDeleteBatch(params)
      if (code === '20001') {
        createMessage.success('删除成功')
        eraModal.visible = false
        // 重新加载列表页面
        selectedRow.value.length = 0
        await loadTableData()
      } else {
        createMessage.success(message)
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      confirmLoading.value = false
    }
  }
  // ---搜索-------
  const filterData = ref({})
  const handlerRest = () => {
    paginations.pageNo = 1
    filterData.value = {}
    loadTableData()
  }
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //--- 分页查询 ------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  })
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  // 加载数据
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
        orderProperty: 'update_time',
        orderType: 'DESC',
      }
      ///v1/content/voice/recognize/bind/query/list/page
      const { code, data } = await adminHttp.CONTENT.contentVoiceRecognizeBindQueryListPage(
        clearObjectUnalbeAttr(params),
      )
      console.log(tableData)
      if (code === '20001') {
        //tableData.value = data.records?data.records:[];
        paginations.total = data.total
        tableData.value = data.records
        await getClassDataEvent()
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
  //删除/v1/order/evaluate/delete
  const handlerDeletedRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.CONTENT.contentVoiceRecognizeBindBy$id({ id: item.id })
      .then(({ code }) => {
        if (+code === 20001) {
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          loadTableData()
        }
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //对话框
  const voiceModal = reactive({
    visible: false,
    title: '新增分类',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  enum alertEnum {
    Edit = '编辑内容',
    Add = '新增内容',
  }

  //新增
  let editBrand = {
    id: '',
  }
  const addDetails = async (record, title) => {
    if (title == alertEnum.Add) {
      voiceModal.title = title
      voiceModal.visible = true
      formState.name = ''
      formState.select = null
      formState.switch = true
    } else {
      voiceModal.title = title
      voiceModal.visible = true
      formState.name = record.name
      formState.select = record.functionId
      formState.switch = record.isEnable
      editBrand.id = record.id
    }
  }
  //添加/修改

  const categoryAdd = () => {
    if (voiceModal.title === alertEnum.Add) {
      formRef.value.validate().then((res) => {
        console.log(res, 'success')
        // createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENT.contentVoiceRecognizeBindSave({
          name: formState.name,
          functionId: formState.select,
          isEnable: formState.switch,
        })
          .then(({ code }) => {
            if (+code === 20001) {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              // item.status = 1
              loadTableData()
              voiceModal.visible = false
              formState.name = ''
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    } else {
      formRef.value.validate().then((res) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENT.contentVoiceRecognizeBindUpdate({
          id: editBrand.id,
          name: formState.name,
          functionId: formState.select,
          isEnable: formState.switch,
        })
          .then(({ code }) => {
            if (+code === 20001) {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              // item.status = 1
              loadTableData()
              voiceModal.visible = false
              formState.name = ''
              formState.select = null
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    }
  }
  //取消
  const BrandsCancel = () => {
    voiceModal.visible = false
    formState.name = ''
    formState.select = null
  }

  onMountedOrActivated(() => {
    loadTableData()
  })

  //是否启用/v1/goods/brand/hot/update
  const statesEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      isEnable: !record.isEnable,
    }
    adminHttp.CONTENT.contentVoiceRecognizeBindStatusUpdate(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //获取功能下拉列表
  const getClassDataEvent = async () => {
    try {
      const res = await adminHttp.CONTENT.contentFunctionRouteList()
      if (res.code === '20001') {
        classData.value = []
        classData.value = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
        console.log(classData.value)
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }
</script>

<style scoped lang="less"></style>
