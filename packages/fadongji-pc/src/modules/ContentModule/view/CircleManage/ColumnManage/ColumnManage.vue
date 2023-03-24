<template>
  <div class="mx-24px mt-24px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <ColumnFilterForm @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
    </div>
    <div class="page-container padding-24">
      <!--<ProblemTable />-->
      <EraSwitchTable :total="paginations.total">
        <template #tableEdit>
          <AButton
            type="primary"
            @click="changeItem(alertEnum.Add, record)"
            v-auth="'/v1/community/column/save'"
            >新增栏目</AButton
          >
        </template>
        <template #content>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            :rowKey="(record) => record.id"
            size="small"
            :scroll="{ y: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'businessType'">
                <span v-if="record.businessType === 1">问答</span>
                <span v-if="record.businessType === 2">视频</span>
              </template>
              <template v-if="column.dataIndex === 'editorNickName'">
                <span>{{ record.editorNickName }}</span
                >/<span>{{ record.editorMobile }}</span>
              </template>
              <template v-if="column.dataIndex === 'nickName'">
                <span>{{ record.nickName }}</span
                >/<span>{{ record.mobile }}</span>
              </template>
              <template v-if="column.dataIndex === 'isEnable'">
                <span v-if="record.isEnable === 0">启用</span>
                <span v-else-if="record.isEnable === 1">禁用</span>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <!--@click="releaseQuest"-->
                <AButton
                  type="link"
                  @click="changeItem(alertEnum.Edit, record)"
                  v-auth="'/v1/community/column/modify'"
                  >编辑</AButton
                >
                <APopconfirm
                  title="删除该栏目后，用户将无法在发布内容时选择该栏目，确定操作吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handlerRow(record)"
                >
                  <AButton type="link" v-auth="'/v1/community/column/delete/'">删除</AButton>
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

    <a-modal
      destroy-before-close
      v-model:visible="modal2Visible"
      :title="modelTitle"
      centered
      @ok="confirmFormEdit"
    >
      <div style="padding: 20px">
        <a-form
          :model="formState.data"
          ref="formRef"
          name="basic"
          :label-col="{ style: { width: '150px' } }"
          :wrapper-col="{ span: 14 }"
          autocomplete="off"
        >
          <a-form-item
          v-if="formState.data.id"
            label="所属模块"
            name="businessTypes"
            :rules="[{ required: true, message: '请选择模块' }]"
          >
            <a-checkbox-group v-model:value="formState.data.businessType" :options="plainOptions" disabled>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item
            v-else
            label="所属模块"
            name="businessTypes"
            :rules="[{ required: true, message: '请选择模块' }]"
          >
            <a-checkbox-group v-model:value="formState.data.businessTypes" :options="plainOptions">
            </a-checkbox-group>
          </a-form-item>
          <a-form-item
            label="栏目名称"
            name="columnName"
            :rules="[{ required: true, message: '请输入名称' }]"
          >
            <a-input
              :maxLength="6"
              placeholder="请输入名称"
              v-model:value="formState.data.columnName"
              allow-clear
            />
          </a-form-item>
          <a-form-item label="状态启用" name="enable">
            <a-radio-group v-model:value="formState.data.isEnable">
              <a-radio :value="0">启用</a-radio>
              <a-radio :value="1">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="排序" name="sort" :rules="[{ required: true, message: '请输入排序' }]">
            <a-input placeholder="请输入排序" v-model:value="formState.data.sort" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import ColumnFilterForm from '/@/modules/ContentModule/view/CircleManage/ColumnManage/component/ColumnFilterForm.vue'
  // import VideoFilterForm from '/@/modules/ContentModule/view/CircleManage/VideoManage/component/'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/ContentModule/view/CircleManage/ColumnManage/data/ColumnListContainerData'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const formRef = ref<FormInstance>()
  const plainOptions = [
    { label: '问答', value: 1 },
    { label: '视频', value: 2 },
  ]
  //form
  interface FormState {
    columnName: string
    businessTypes: any
    isEnable: Number
    sort: any
    id?: string
  }

  // “编辑” 或者 “或者” 得标识  Edit：编辑； Add: 新增
  //对画框的form
  const formState = reactive({
    data: <any>{
      columnName: '',
      businessTypes: [],
      isEnable: 0,
      sort: '',
    },
  })
  // “编辑” 或者 “新增” 标题
  const modelTitle = ref<string>()

  enum alertEnum {
    Edit = '编辑',
    Add = '新增',
  }

  const modal2Visible = ref<boolean>(false)
  const changeItem = (title, data) => {
    if (data) {
      const { id, columnName, isEnable, sort } = data
      formState.data = { id, columnName, isEnable, sort }
      formState.data.businessType = [data.businessType]
      console.log(data)
    } else {
      formState.data = <any>{
        columnName: '',
        businessTypes: [],
        businessType: '',
        isEnable: 0,
        sort: '',
      }
    }
    modelTitle.value = title
    modal2Visible.value = true
  }
//   {
//     "businessTypes":[1,2],
//     "columnName":"批量新增栏目测试",
//     "isEnable":1,
//     "sort":1
// }
  const confirmFormEdit = async () => {
    // formRef.value.validate()
    // return
    //communityColumnSave
    let params = {
      id:formState.data.id,
      columnName:formState.data.columnName,
      isEnable:formState.data.isEnable,
      sort:formState.data.sort,
      businessTypes:formState.data.businessTypes,
    }
    let param = {
      id:formState.data.id,
      columnName:formState.data.columnName,
      isEnable:formState.data.isEnable,
      sort:formState.data.sort,
      businessType:formState.data.businessType.toString(),
    }
    try {
      if (formState.data.id) {
        const { code } = await adminHttp.COMMUNITY.communityColumnModify(param)
        if (code == '20001') {
          createMessage.success('编辑成功')
          loadTableData()
          modal2Visible.value = false
        } else {
          createMessage.error('编辑失败')
        }
      } else {
        formRef.value
          .validate()
          .then(async () => {
            const { code } = await adminHttp.COMMUNITY.communityColumnSaveBatch(params)
            if (code == '20001') {
              createMessage.success('添加成功')
              loadTableData()
              modal2Visible.value = false
            }
          })
          .catch((e) => {
            console.log(e, '校验不通过')
          })
      }
    } catch (e) {
      console.log(e)
    }
  }
  //删除
  const handlerRow = (record) => {
    adminHttp.COMMUNITY.communityColumnDelete$id({ id: record.id }).then((res) => {
      loadTableData()
    })
  }

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = values
    paginations.current = 1
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
    const { records, total } = await adminHttp.COMMUNITY.communityColumnCondition(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取想法列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
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
    padding: 24px 24px 4px 24px;
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
</style>
