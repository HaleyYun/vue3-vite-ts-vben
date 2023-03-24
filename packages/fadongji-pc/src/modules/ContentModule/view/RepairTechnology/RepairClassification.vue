<template>
 <div>
  <div class="classTitle bg-blue-100 h-8 w-full mb-10">
    <span class="leading-7 text-lg ml-2">分类管理</span>
  </div>
  <div class="mx-24px mt-50px mb-24px">
    <div class="p-24px bg-white">
      <EraTableHeader>
        <template #tableName>
          <!-- v-auth="'/v1/content/technical/category/delete'" -->
          <AButton type="primary" @click="addClassification(record, alertEnum.Add)" v-auth="'/v1/content/technical/category/save'"
            >新增分类
          </AButton>
        </template>
      </EraTableHeader>
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tabColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'isEnable'">
              <ASwitch
                @change="stateEnable(record)"
                :checked="record.isEnable"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="column.dataIndex === 'platformCode'">
              <span v-if="record.platformCode == 'garage'">修理厂</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" @click="addClassification(record, alertEnum.Edit)" v-auth="'/v1/content/technical/category/modify'">编辑</AButton>

              <APopconfirm
                title="确定要删除吗？删除后，该分类下内容也会被删除。"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handlerDeletedRow(record)"
                v-auth="'/v1/content/technical/category/delete'"
              >
                <AButton type="link">删除</AButton>
              </APopconfirm>
            </template>
            <template v-if="column.dataIndex === 'sort'">
              <ArrowUpOutlined
                v-if="hasShowUp !== record.id"
                class="margin-r-10"
                @click="ArrowUpOutlinedEvent(record)"
              />
              <ArrowDownOutlined
                v-if="hasShowDown !== record.id"
                class="margin-r-10"
                @click="ArrowDownOutlinedEvent(record)"
              />
              <VerticalAlignTopOutlined
                v-if="hasShowUp !== record.id"
                class="margin-r-10"
                @click="VerticalAlignTopOutEvent(record)"
              />
              <VerticalAlignBottomOutlined
                v-if="hasShowDown !== record.id"
                @click="VerticalAlignBottomOutEvent(record)"
              />
            </template>
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :size="'default'"
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
  <AModal
    v-model:visible="categoryModal.visible"
    :title="categoryModal.title"
    centered
    destroy-on-close
    :confirm-loading="categoryModal.confirmLoading"
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
        <AFormItem name="name" label="分类名称">
          <AInput v-model:value="formState.name" maxlength="8" />
        </AFormItem>
        <AFormItem name="select" label="所属角色">
          <a-select v-model:value="formState.select" placeholder="" disabled>
            <a-select-option value="garage">修理厂</a-select-option>
          </a-select>
        </AFormItem>
        <AFormItem name="switch" label="是否启用">
          <a-switch v-model:checked="formState.switch" />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
 </div>
</template>
<script setup lang="ts">
  import { reactive, ref, onBeforeMount } from 'vue'
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import EraTableHeader from '/@/components/EraTableHeader/EraTableHeader.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Classification } from '/@/modules/ContentModule/view/RepairTechnology/data/configuration'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  let hasShowUp = ref('')
  let hasShowDown = ref('')
  let isShowOutMove = ref(false)
  const formRef = ref<any>()
  const formState = reactive<FormState>({
    name: '',
    select: 'garage',
    switch: true,
  })

  interface FormState {
    name: string
    select: any
    switch: any
  }

  const { createMessage } = useMessage()

  // 修改
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'

  //确认分类
  const categoryAdd = () => {
    if (categoryModal.title === alertEnum.Add) {
      formRef.value.validate().then((res) => {
        console.log(res, 'success')
        // createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENT.contentTechnicalCategorySave({
          name: formState.name,
          platformCodeList: [formState.select],
          isEnable: formState.switch,
        })
          .then((res) => {
            if (res.code === '20001') {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            }

            loadTableData()
            categoryModal.visible = false
            formState.name = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    } else {
      formRef.value.validate().then(() => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENT.contentTechnicalCategoryModify({
          name: formState.name,
          platformCode: formState.select,
          isEnable: formState.switch,
          id: editTechnical.id,
        })
          .then(({ code }) => {
            if (+code === 20001) {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
              categoryModal.visible = false
              formState.name = ''
              formState.switch = ''
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
    categoryModal.visible = false
  }

  enum alertEnum {
    Edit = '编辑分类',
    Add = '新增分类',
  }

  //新增
  let editTechnical = {
    id: '',
  }
  const addClassification = async (record, title) => {
    if (title == alertEnum.Add) {
      categoryModal.title = title
      categoryModal.visible = true
      formState.switch = true
    } else {
      categoryModal.title = title
      categoryModal.visible = true
      formState.name = record.name
      formState.switch = record.isEnable
      editTechnical.id = record.id
    }
  }
  //对话框
  const categoryModal = reactive({
    visible: false,
    title: '新增分类',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  const filterData = ref()
  // table 列
  const tabColumns = ref(Classification)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始化
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      platformCode: 'garage',
    }
    const { records, total } = await adminHttp.CONTENT.contentTechnicalCategoryCondition(
      clearObjectUnalbeAttr(filterParams),
    )
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
        console.log(`获取分类列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    paginations.total = total
    tableData.value = records
    if (tableData.value.length > 1) {
      hasShowUp.value = tableData.value[0]['id']
      hasShowDown.value = tableData.value[tableData.value.length - 1]['id']
      isShowOutMove.value = true
    } else {
      isShowOutMove.value = false
    }
    if (paginations.current > 1 && tableData.value.length === 0) {
      paginations.current = paginations.current - 1
      loadTableData()
    }
    console.log(tableData.value, '分类列表')
  }

  //删除列表
  const handlerDeletedRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.CONTENT.contentTechnicalCategoryDelete({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
  //移动
  //向上
  const ArrowUpOutlinedEvent = async (items) => {
    let currentIndex = tableData.value.findIndex((item) => {
      return items.id == item['id']
    })
    const upIndex = currentIndex - 1
    // const currentItem = { id: items.id, sort: tableData.value[upIndex]['sort'] }
    // const upItem = { id: tableData.value[upIndex]['id'], sort: items.sort }
    const sortArr = [
      { id: items.id, sort: tableData.value[upIndex]['sort'], platformCode: 'garage' },
      { id: tableData.value[upIndex]['id'], sort: items.sort, platformCode: 'garage' },
    ]
    const arrowUpMap = {
      id: parseInt(items.id),
      sortType: 2,
      categoryBOList: sortArr,
    }
    await sortEvent(arrowUpMap)
  }

  //向下
  const ArrowDownOutlinedEvent = async (items) => {
    let currentIndex = tableData.value.findIndex((item) => {
      return items.id == item['id']
    })
    const upIndex = currentIndex + 1
    // const currentItem = { id: items.id, sort: tableData.value[upIndex]['sort'] }
    // const upItem = { id: tableData.value[upIndex]['id'], sort: items.sort }
    const sortArr = [
      { id: items.id, sort: tableData.value[upIndex]['sort'] },
      { id: tableData.value[upIndex]['id'], sort: items.sort },
    ]
    const arrowUpMap = {
      id: parseInt(items.id),
      sortType: 2,
      categoryBOList: sortArr,
    }
    await sortEvent(arrowUpMap)
  }
  //置顶
  const VerticalAlignTopOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, sortType: 1, platformCode: 'garage' }
    await sortEvent(arrowUpMap)
  }
  //置底
  const VerticalAlignBottomOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, sortType: 3, platformCode: 'garage' }
    await sortEvent(arrowUpMap)
  }
  const sortEvent = async (param) => {
    const { code } = await adminHttp.CONTENT.contentTechnicalCategorySort(param)
    if (code == '20001') {
      createMessage.success('排序操作成功')
      await loadTableData()
    } else {
      createMessage.error({ content: '排序操作失败' })
    }
  }

  //以上移动
  //启用状态
  const stateEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      isEnable: !record.isEnable,
    }
    adminHttp.CONTENT.contentTechnicalCategoryEnable(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .classTitle {
    padding: 0 16px;
    position: fixed;
    z-index: 999;
    /* width: 100%; */
    width: calc(100% - 210px);
    top: 48px;
    flex: 0 0 auto;
    transition: width 0.2s;
  }
</style>
