<template>
  <div>
    <div class="classTitle bg-blue-100 h-8 w-full mb-10">
    <span class="leading-7 text-lg ml-2">分类管理</span>
  </div>
  <div class="mx-24px mt-40px mb-24px">
    <div class="p-24px bg-white">
      <EraTableHeader>
        <!-- <template #tableName>
          <AButton type="primary" @click="addClassification(record, alertEnum.Add)"
            >新增分类</AButton
          >
        </template> -->
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
            <template v-if="column.dataIndex === 'platformCode'">
              <span v-if="record.platformCode === 'skilledWorker'">集师傅</span>
              <span v-if="record.platformCode === 'supplier'"> 供应商 </span>
              <span v-if="record.platformCode === 'agent'"> 服务商 </span>
              <span v-if="record.platformCode === 'garage'"> 修理厂 </span>
            </template>
            <template v-if="column.dataIndex === 'isEnable'">
              <ASwitch
                disabled
                @change="stateEnable(record)"
                :checked="record.isEnable"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" disabled @click="addClassification(record, alertEnum.Edit)"
                >编辑</AButton
              >
              <AButton type="link" disabled>删除</AButton>
              <!-- <APopconfirm
                title="确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handlerDeletedRow(record)"
              >
                <AButton type="link" disabled>删除</AButton>
              </APopconfirm> -->
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
        @finish="onFinish"
        @finishFailed="onFinishFailed"
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
  import { Classification } from '/@/modules/ContentModule/view/Authentication/data/configuration'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  //   import { useRouter } from 'vue-router'
  import type { FormInstance } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  //   const go = useRouter()
  let hasShowUp = ref('')
  let hasShowDown = ref('')
  let isShowOutMove = ref(false)
  const formRef = ref<FormInstance | undefined>()
  const formState = reactive<FormState>({
    name: '',
    select: '修理厂',
    switch: false,
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

  ///v1/content/help/category/save
  const categoryAdd = () => {
    if (categoryModal.title === alertEnum.Add) {
      formRef.value.validate().then((res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENTMENT.contentHelpCategorySave({
          name: formState.name,
          platformCode: formState.select,
          isEnable: formState.switch,
        })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
            categoryModal.visible = false
            formState.name = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    } else {
      //编辑逻辑
    }
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
  const addClassification = async (record, title) => {
    if (title == alertEnum.Add) {
      categoryModal.title = title
      categoryModal.visible = true
    } else {
      categoryModal.title = title
      categoryModal.visible = true
      //   const data = await adminHttp.goodsBrand$id({ id: record.id })

      //   formState.brandName = data.data.name
      //   formState.brandLoGo = data.data.logoUrl
      //   editBrand.id = data.data.id
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
  //初始/v1/content/help/category/condition
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      platformCode: 'skilledWorker',
    }
    const { records, total } = await adminHttp.CONTENT.contentCertificationCourseCategoryCondition(
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

  // //删除列表已修改不许需要删除
  const handlerDeletedRow = () => {}
  //启用状态
  const stateEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      isEnable: !record.isEnable,
    }
    adminHttp.CONTENT.contentCertificationCourseCategoryEnable(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
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
      { id: items.id, sort: tableData.value[upIndex]['sort'] },
      { id: tableData.value[upIndex]['id'], sort: items.sort },
    ]
    const arrowUpMap = {
      id: parseInt(items.id),
      platformCode: 'skilledWorker',
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
      platformCode: 'skilledWorker',
      sortType: 2,
      categoryBOList: sortArr,
    }
    await sortEvent(arrowUpMap)
  }
  //置顶
  const VerticalAlignTopOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, sortType: 1, platformCode: 'skilledWorker' }
    await sortEvent(arrowUpMap)
  }
  //置底
  const VerticalAlignBottomOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, sortType: 3, platformCode: 'skilledWorker' }
    await sortEvent(arrowUpMap)
  }
  const sortEvent = async (param) => {
    const { code } = await adminHttp.CONTENT.contentCertificationCourseCategorySort(param)
    if (code == '20001') {
      createMessage.success('排序操作成功')
      loadTableData()
    } else {
      createMessage.error({ content: '排序操作失败' })
    }
  }

  //以上移动
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
