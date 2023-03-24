<template>
  <div>
    <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <!-- <template #tableEdit>
		  <a-button
			type="primary"
			class="margin-l-r-10"
			@click="editItemDetails(record, alertEnum.Add)"
			>添加脱敏</a-button
		  >
		</template> -->
      </EraTableTitle>
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ (paginations.pageNo - 1) * paginations.pageSize + index + 1 }}
            </template>
            <template v-if="column.dataIndex === 'status'">
              <span>{{ record.status ? '启用' : '禁用' }}</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" size="small" @click="editItemDetails(record, alertEnum.Edit)"
                >编辑
              </AButton>
              <APopconfirm
                title="确认要删除吗?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="cancelReset(record)"
              >
                <a>删除</a>
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
    v-model:visible="classModal.visible"
    width="1000px"
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
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem
          label="字段名"
          name="classRole"
          :rules="[{ required: true, message: '请输入字段名' }]"
        >
          <AInput
            v-if="editBrand.id"
            v-model:value="formState.classRole"
            :maxlength="10"
            placeholder="请输入字段名"
            allow-clear
            disabled
          />
          <AInput
            v-else
            v-model:value="formState.classRole"
            :maxlength="10"
            placeholder="请输入字段名"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="字段描述"
          name="describe"
          :rules="[{ required: true, message: '请输入脱敏字段描述' }]"
        >
          <AInput
            v-if="editBrand.id"
            v-model:value="formState.describe"
            placeholder="请输入脱敏字段描述"
            allow-clear
            disabled
          />
          <AInput
            v-else
            v-model:value="formState.describe"
            placeholder="请输入脱敏字段描述"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="脱敏方向"
          name="classDirection"
          :rules="[{ required: true, message: '请输入角色状态' }]"
        >
          <a-radio-group v-model:value="formState['classDirection']">
            <a-radio value="0">从左向右</a-radio>
            <a-radio value="1">从右向左</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem
          label="脱敏起始位数"
          name="roleCompany"
          :rules="[
            { required: true, message: '请输入脱敏起始位数' },
            {
              type: 'pattern',
              pattern: Pattern.positive_number,
              message: '起始位数为正数',
              trigger: 'blur',
            },
          ]"
        >
          <AInput
            v-model:value="formState.roleCompany"
            placeholder="请输入脱敏起始位数"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="脱敏字符数"
          name="characters"
          :rules="[
            { required: true, message: '请输入脱敏字符数' },
            {
              type: 'pattern',
              pattern: Pattern.positive_number,
              message: '脱敏字符数格式不正确',
              trigger: 'blur',
            },
          ]"
        >
          <AInput v-model:value="formState.characters" placeholder="请输入脱敏字符数" allow-clear />
        </AFormItem>
        <AFormItem
          label="状态"
          name="classSwitch"
          :rules="[{ required: true, message: '请输入角色状态' }]"
        >
          <a-radio-group v-model:value="formState['classSwitch']">
            <a-radio value="1">启用</a-radio>
            <a-radio value="0">禁用</a-radio>
          </a-radio-group>
        </AFormItem>
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
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { Pattern } from '@vocen/shared'
  import dayjs from 'dayjs'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  let classData = ref([] as any[])
  // --------全局参数---------------
  const { createMessage } = useMessage()

  // ------操作按钮----------
  /**
   *@desc 新增/编辑
   */
  interface FormState {
    voName: string
    classRole: any
    classSwitch: any
    describe: any
    roleCompany: any
    characters: any
    classDirection: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    voName: '',
    classRole: '',
    classSwitch: '1',
    describe: '',
    roleCompany: '',
    characters: '',
    classDirection: '1',
  })
  let editBrand = {
    id: '',
    roleId: '',
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
    Edit = '编辑脱敏字段',
    Add = '添加脱敏字段',
  }

  //新增或编辑
  const editItemDetails = (record, title) => {
    if (title == alertEnum.Add) {
      classModal.title = title
      classModal.visible = true
      formState.voName = ''
      formState.classSwitch = '1'
      formState.classRole = ''
      formState.describe = ''
      formState.characters = ''
      formState.roleCompany = ''
      formState.classDirection = '1'
    } else {
      classModal.title = title
      classModal.visible = true
      formState.voName = record.tableName
      formState.classRole = record.columnName
      formState.describe = record.columnDesc
      formState.classDirection = record.direction.toString()
      formState.roleCompany = record.startIndex
      formState.characters = record.wordNum
      formState.classSwitch = record.status === true ? '1' : '0'
      editBrand.id = record.id
    }
  }
  //确定/v1 /vocen-jarvis/v1/
  const classAdd = () => {
    if (classModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          createMessage.loading({ content: 'Loading...' })
          AdminHttp.ROLE.accountMaskAdd({
            tableName: formState.voName,
            columnName: formState.classRole,
            columnDesc: formState.describe,
            direction: formState.classDirection,
            startIndex: formState.roleCompany,
            wordNum: formState.characters,
            status: formState.classSwitch,
          })
            .then(() => {
              createMessage.success({ content: `操作成功` })
              classModal.visible = false
              loadTableData()
            })
            .catch((err) => {
              createMessage.error({ content: `操作失败:${err.message}` })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      formRef.value.validate().then(async () => {
        AdminHttp.ROLE.accountMaskEdit({
          tableName: formState.voName,
          columnName: formState.classRole,
          columnDesc: formState.describe,
          direction: formState.classDirection,
          startIndex: formState.roleCompany,
          wordNum: formState.characters,
          status: formState.classSwitch,
          id: editBrand.id,
        })
          .then(() => {
            createMessage.success({ content: `操作成功` })
            // item.status = 1
            loadTableData()
            classModal.visible = false
            formState.voName = ''
            formState.classRole = ''
            formState.classSwitch = ''
            editBrand.id = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}` })
          })
      })
    }
  }
  //取消
  const classCancel = () => {
    formState.classSwitch = ''
    formState.classRole = []
    formState.voName = ''
    editBrand.id = ''
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
    await getClassDataEvent()
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.ROLE.accountMaskPage(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.records
          ? data.records.map((item) => {
              return {
                ...item,
                qualityBeginTimeOne: dayjs(item.qualityBeginTime).format('YYYY-MM-DD'),
                qualityEndTime: dayjs(item.qualityEndTime).format('YYYY-MM-DD'),
              }
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
  const getClassDataEvent = async () => {
    try {
      const res = await AdminHttp.ROLE.roleCompany()
      if (res.code === '20001') {
        classData.value = []
        classData.value = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }
  //删除
  const cancelReset = async (record) => {
    try {
      const deleteMap = { id: record.id }
      const { code } = await AdminHttp.ROLE.accountMask$Id(deleteMap)
      if (code == '20001') {
        await loadTableData()
        createMessage.success({ content: `删除成功` })
      }
    } catch (err) {
    } finally {
      // createMessage.error({ content: `删除失败`, key: loadingCtxkey })
    }
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
