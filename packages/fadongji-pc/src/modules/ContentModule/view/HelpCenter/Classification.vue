<template>
 <div>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="filter-form">
        <ClassForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="page-container">
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit>
            <AButton
              type="primary"
              class="m-10px"
              @click="viewDetails(record, alertEnum.Add)"
              v-auth="'/v1/content/help/category/save/batch'"
              >新增分类
            </AButton>
            <!-- v-auth="'/v1/content/help/content/condition'" -->
            <AButton
              type="primary"
              class="m-10px"
              @click="helpClass()"
              v-auth="'/v1/content/help/content/condition'"
            >
              返回帮助中心
            </AButton>
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
                <template v-if="column.dataIndex === 'platformCode'">
                  <template v-if="record.platformCode === 'supplier'"> 供应商</template>
                  <template v-else-if="record.platformCode === 'agent'"> 服务商</template>
                  <template v-else-if="record.platformCode === 'garage'"> 修理厂</template>
                  <template v-else-if="record.platformCode === 'skilledWorker'">集师傅</template>
                  <template v-else-if="record.platformCode === 'oldMachine'"> 旧机买家</template>
                  <template v-else-if="record.platformCode === 'recycling'"> 回收公司</template>
                  <template v-else-if="record.platformCode === 'investmentManager'">
                    招商经理
                  </template>
                  <template v-else-if="record.platformCode === 'channelManager'">
                    渠道经理
                  </template>
                </template>
                <template v-if="column.dataIndex === 'isEnable'">
                  <ASwitch
                    checked-children="开"
                    un-checked-children="关"
                    :checked="record.isEnable"
                    @change="helpCategoryEnable(record)"
                  />
                </template>
                <template v-if="column.dataIndex === 'action'">
                  <AButton
                    type="link"
                    @click="viewDetails(record, alertEnum.Edit)"
                    v-auth="'/v1/content/help/category/modify'"
                    >编辑
                  </AButton>
                  <APopconfirm
                    title="确认要删除吗?"
                    ok-text="确认"
                    cancel-text="取消"
                    @confirm="deleteItemEvent(record)"
                    v-auth="'/v1/content/help/category/delete'"
                  >
                    <AButton type="link">删除</AButton>
                  </APopconfirm>
                </template>
              </template>
            </ATable>
          </template>

          <template #pagination>
            <VoPagination
              :total="paginations.total"
              :current="paginations.current"
              :page-size="paginations.pageSize"
              @pagination="paginationChange"
            />
          </template>
        </EraSwitchTable>
      </div>
    </div>
  </div>
  <AModal
    v-model:visible="classModal.visible"
    :title="classModal.title"
    centered
    destroy-on-close
    :confirm-loading="classModal.confirmLoading"
    @ok="classAdd"
    @cancel="classCancel"
  >
    <div class="p-10">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem
          label="分类名称"
          name="className"
          :rules="[{ required: true, message: '请填写分类名称' }]"
        >
          <AInput
            v-model:value="formState.className"
            :maxlength="8"
            placeholder="请输入分类名称"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="所属角色"
          name="classRole"
          :rules="[{ required: true, message: '请选择所属角色' }]"
        >
          <a-select
            v-if="editBrand.id != ''"
            v-model:value="formState.classRole"
            placeholder="请选择所属角色"
          >
            <a-select-option value="supplier">供应商</a-select-option>
            <a-select-option value="agent">服务商</a-select-option>
            <a-select-option value="garage">修理厂</a-select-option>
            <a-select-option value="skilledWorker">集师傅</a-select-option>
            <a-select-option value="oldMachine">旧机买家</a-select-option>
            <a-select-option value="recycling">回收公司</a-select-option>
            <a-select-option value="investmentManager">招商经理</a-select-option>
            <a-select-option value="channelManager">渠道经理</a-select-option>
          </a-select>
          <a-select
            v-else
            v-model:value="formState.classRole"
            placeholder="请选择所属角色"
            mode="multiple"
          >
            <a-select-option value="supplier">供应商</a-select-option>
            <a-select-option value="agent">服务商</a-select-option>
            <a-select-option value="garage">修理厂</a-select-option>
            <a-select-option value="skilledWorker">集师傅</a-select-option>
            <a-select-option value="oldMachine">旧机买家</a-select-option>
            <a-select-option value="recycling">回收公司</a-select-option>
            <a-select-option value="investmentManager">招商经理</a-select-option>
            <a-select-option value="channelManager">渠道经理</a-select-option>
          </a-select>
        </AFormItem>
        <AFormItem label="是否启用" name="classSwitch">
          <a-switch v-model:checked="formState.classSwitch" />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
 </div>
</template>
<script setup lang="ts">
  // '/@/modules/ContentModule/view/HelpCenter/data/ClassColumns'
  import { reactive, ref } from 'vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { router } from '/@/router'
  import { Classification } from '/@/modules/ContentModule/view/HelpCenter/data/ClassColumns'
  import adminHttp from '/@/utils/http/adminHttp'
  // import ThinkOpForm from '/@/modules/ContentModule/view/ThinkManager/conponents/ThinkOpForm.vue'
  import ClassForm from '/@/modules/ContentModule/view/HelpCenter/compontents/ClassForm.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { useRouter } from 'vue-router'
  import type { FormInstance } from 'ant-design-vue'

  const go = useRouter()
  const activeKey = ref('one')
  const { createMessage } = useMessage()

  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'
  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = values
    loadTableData()
  }

  // table 列
  const tabColumns = ref(Classification)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  const helpClass = () => {
    router.go(-1)
  }
  /**
   *@desc 是否启用
   *@param id [String] 改变对象的id
   *@param status [String] 改变对象的status/v1/content/help/content/enable
   */
  const helpCategoryEnable = (record) => {
    const changeSwitchMap = {
      id: record.id,
      isEnable: !record.isEnable,
    }
    adminHttp.CONTENTMENT.contentHelpCategoryEnable(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
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
    }
    console.log(filterParams)

    ///v1/goods/investment/query/list/page
    const { records, total } = await adminHttp.CONTENTMENT.contentHelpCategoryCondition(
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
        // console.log(err)
        console.log(`获取分类列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
    if (paginations.current > 1 && tableData.value.length === 0) {
      paginations.current = paginations.current - 1
      loadTableData()
    }
    console.log(tableData.value, '分类列表')
  }
  /**
   *@desc 删除列表项/v1/content/help/content/delete
   *@param id [String] 改变对象的id
   */
  const deleteItemEvent = async (record) => {
    try {
      const deleteMap = { id: record.id }
      const { code } = await adminHttp.CONTENTMENT.contentHelpCategoryDelete(deleteMap)
      if (code == '20001') {
        createMessage.success({ content: `删除成功`, key: loadingCtxkey })
        loadTableData()
      }
    } catch (err) {
      createMessage.error({ content: `删除失败`, key: loadingCtxkey })
    }
  }

  /**
   *@desc 新增/编辑
   */
  interface FormState {
    className: string
    classRole: any
    classSwitch: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    className: '',
    classRole: [],
    classSwitch: 'true',
  })
  let editBrand = {
    id: '',
  }
  //增加
  const classModal = reactive({
    visible: false,
    title: '',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  enum alertEnum {
    Edit = '编辑',
    Add = '新增',
  }

  const viewDetails = (record, title) => {
    if (title == alertEnum.Add) {
      classModal.title = title
      classModal.visible = true
      formState.classSwitch = true
    } else {
      classModal.title = title
      classModal.visible = true
      formState.classRole = record.platformCode
      formState.className = record.name
      formState.classSwitch = record.isEnable
      editBrand.id = record.id
    }
  }

  //确定/v1/contentCategorySave
  const classAdd = () => {
    if (classModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          adminHttp.CONTENT.contentHelpCategorySaveBatch({
            name: formState.className,
            platformCodeList: formState.classRole,
            isEnable: formState.classSwitch,
          })
            .then(() => {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
              classModal.visible = false
              formState.className = ''
              formState.classRole = []
              formState.classSwitch = ''
            })
            .catch((err) => {
              createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      formRef.value.validate().then(async (res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENTMENT.contentHelpCategoryModify({
          name: formState.className,
          platformCode: formState.classRole,
          isEnable: formState.classSwitch,
          id: editBrand.id,
        })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
            classModal.visible = false
            formState.className = ''
            formState.classRole = []
            formState.classSwitch = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    }
  }
  //取消
  const classCancel = () => {
    formState.classSwitch = ''
    formState.classRole = []
    formState.className = ''
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
