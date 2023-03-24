<template>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="page-container p-20px">
        <ReasonTable>
          <template #tableName>
            <EraTableTitle :total="paginations.total" />
          </template>
          <template #tableEdit>
            <AButton
              v-auth="'/v1/order/cancel/cause/save'"
              type="primary"
              @click="addOrder(record, alertEnum.Add)"
              size="default"
              >添加取消订单原因
            </AButton>
          </template>
          <template #content>
            <div class="pt-10px">
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
                  <template v-if="column.dataIndex === 'isDisplay'">
                    <div class="rich-column">
                      <ASwitch
                        @change="stateEnable(record)"
                        :checked="record.isDisplay"
                        checked-children="开"
                        un-checked-children="关"
                      />
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'operation'">
                    <AButton
                      v-auth="'/v1/order/cancel/cause/update'"
                      type="link"
                      @click="addOrder(record, alertEnum.Edit)"
                      >编辑
                    </AButton>
                    <APopconfirm
                      title="确定要删除吗？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="handlerDeletedRow(record)"
                    >
                      <AButton v-auth="'/v1/order/cancel/cause/batch/delete'" type="link"
                        >删除</AButton
                      >
                    </APopconfirm>
                  </template>
                </template>
              </ATable>
            </div>
          </template>
          <template #pagination>
            <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
            />
          </template>
        </ReasonTable>
      </div>
    </div>
    <AModal
      v-model:visible="brandModal.visible"
      :title="brandModal.title"
      centered
      destroy-on-close
      :confirm-loading="brandModal.confirmLoading"
      @ok="BrandsAdd"
      @cancel="BrandsCancel"
    >
      <div class="p-10">
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
          <AFormItem
            label="取消订单原因名称"
            name="brandName"
            :rules="[{ required: true, message: '请填写取消订单原因名称' }]"
          >
            <AInput
              maxlength="50"
              v-model:value="formState.brandName"
              placeholder="取消订单原因名称"
            />
          </AFormItem>
          <AFormItem label="是否启用" name="orderFinish">
            <div class="flex">
              <ASwitch v-model:checked="formState.orderFinish" />
            </div>
          </AFormItem>
          <!--v-model:file-list="fileList1"-->
        </AForm>
      </div>
    </AModal>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import ReasonTable from './component/ReasonTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  // @ts-ignore
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import type { FormInstance } from 'ant-design-vue'
  import { CancelData } from '/@/modules/OrderModule/view/OrderSettings/CancelOrder/data/CancelData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { usePermission } from '/@/hooks/web/usePermission'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'

  const { hasPermission } = usePermission()

  const activeKey = ref('one')
  let hasShowUp = ref('')

  let hasShowDown = ref('')
  let tableData = ref([])
  let isShowOutMove = ref(false)
  const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()
  const formRef = ref<any>()
  // table 列
  const tabColumns = ref(CancelData)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
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
      type: 2,
      sortBOList: sortArr,
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
      type: 2,
      sortBOList: sortArr,
    }
    await sortEvent(arrowUpMap)
  }
  //置顶
  const VerticalAlignTopOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, type: 1 }
    await sortEvent(arrowUpMap)
  }
  //置底
  const VerticalAlignBottomOutEvent = async (item) => {
    const arrowUpMap = { id: item.id, type: 3 }
    await sortEvent(arrowUpMap)
  }
  ///v1/order/cancel/cause/update/sort
  const sortEvent = async (param) => {
    const { code } = await adminHttp.Order.orderCancelCauseUpdateSort(param)
    if (code == '20001') {
      createMessage.success('排序操作成功')
      await loadTableData()
    } else {
      createMessage.error({ content: '排序操作失败' })
    }
  }

  //以上移动
  //切换启用状态 /v1/order/cancel/cause/update
  const stateEnable = (record) => {
    console.log(record, 'record')
    if (!hasPermission('/v1/order/cancel/cause/update')) {
      createMessage.error('暂无该操作权限！')
      return
    }
    const changeSwitchMap = {
      id: record.id,
      isDisplay: !record.isDisplay,
      name: record.name,
    }
    adminHttp.Order.orderCancelCauseUpdate(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  watch(activeKey, async () => {
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    loadTableData()
  })

  // “编辑” 或者 “或者” 得标识  Edit：编辑； Add: 新增
  enum alertEnum {
    Edit = '编辑取消订单原因',
    Add = '添加取消订单原因',
  }

  const formState = reactive<FormState>({
    brandName: '',
    orderFinish: true,
  })

  interface FormState {
    brandName: string
    orderFinish: any
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //添加 or 修改
  const brandModal = reactive({
    visible: false,
    title: '',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //添加 or 修改/v1/order/cancel/cause/details
  const addOrder = async (record, title) => {
    if (title == alertEnum.Add) {
      brandModal.title = title
      brandModal.visible = true
      formState.orderFinish = true
    } else {
      brandModal.title = title
      brandModal.visible = true
      const data = await adminHttp.Order.orderCancelCauseDetails({ id: record.id })

      formState.brandName = data.data.name
      formState.orderFinish = data.data.isDisplay
      editBrand.id = data.data.id
    }
  }
  let editBrand = {
    id: '',
    name: '',
    isDisplay: '',
  }
  //添加/v1/order/cancel/cause/save
  const BrandsAdd = () => {
    if (brandModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then((res) => {
          console.log(res, 'success')

          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          adminHttp.Order.orderCancelCauseSave({ isDisplay: res.orderFinish, name: res.brandName })
            .then(() => {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              // item.status = 1
              loadTableData()
              brandModal.visible = false
              formState.brandName = ''
              formState.orderFinish = ''
            })
            .catch((err) => {
              createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      // 编辑
      editBrand.name = formState.brandName
      editBrand.isDisplay = formState.orderFinish
      formRef.value.validate().then((res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.Order.orderCancelCauseUpdate(editBrand)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
            brandModal.visible = false
            formState.brandName = ''
            formState.orderFinish = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    }
  }
  // //删除/v1/order/cancel/cause/batch/delete
  const handlerDeletedRow = (item) => {
    // alert('删除===' + item)
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.Order.orderCancelCauseBatchDelete({ ids: [item.id] })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //取消
  const BrandsCancel = () => {
    brandModal.visible = false
    formState.brandName = ''
    formState.orderFinish = ''
  }
  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //初始化调用/v1/order/cancel/cause/page
  // const statusAttrs = { one: 0, two: 1, three: 2 }

  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      // status: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { records, total } = await adminHttp.Order.orderCancelCausePage(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取取消设置列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
    if (tableData.value.length > 1) {
      hasShowUp.value = tableData.value[0]['id']
      hasShowDown.value = tableData.value[tableData.value.length - 1]['id']
      isShowOutMove.value = true
    } else {
      isShowOutMove.value = false
    }
  }

  loadTableData()
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
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
</style>
