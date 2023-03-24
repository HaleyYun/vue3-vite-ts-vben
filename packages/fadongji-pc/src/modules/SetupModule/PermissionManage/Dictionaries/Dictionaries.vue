<template>
 <div>
  <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-20px bg-white">
      <EraSwitchTable>
        <template #tableEdit>
          <a-button
            type="primary"
            class="margin-l-r-10"
            @click="editItemDetails(record, alertEnum.Add)"
            >添加一级菜单
          </a-button>
        </template>
      </EraSwitchTable>
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          row-key="id"
          bordered
          defaultExpandAllRows
          v-if="tableData.length"
        >
          <template #bodyCell="{ column, text, record, index }">
            <template v-if="column.dataIndex === 'icon'">
              <div>
                <Icon v-if="record.icon" :icon="record.icon" />
                <span v-else class="text-gray-600">无</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'seq'">
              <div v-if="editObject.isFocus == record.id">
                <a-input-number
                  style="width: 70px"
                  maxlength="4"
                  v-model:value="formState.seq"
                  :autofocus="true"
                  :min="1"
                  :max="100"
                  @blur="blur"
                  @pressEnter="Enter"
                />
              </div>
              <div v-else>
                <AButton type="link" @click="editMinOrder(record)">{{ record.seq }}</AButton>
              </div>
            </template>
            <template v-if="column.dataIndex === 'resourceTypeName'">
              <div>
                <a-tag :color="record.resourceType === 1 ? 'blue' : 'green'">
                  {{ record.resourceTypeName }}
                </a-tag>
              </div>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <div>
                <a-tag :color="record.status ? 'green' : '#cd201f'">
                  {{ record.status ? '启用' : '禁用' }}
                </a-tag>
              </div>
            </template>
            <template v-if="column.dataIndex === 'visible'">
              <div>
                <a-tag :color="record.visible ? 'green' : '#cd201f'">
                  {{ record.visible ? '显示' : '隐藏' }}
                </a-tag>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link" size="small" @click="editItemDetails(record, alertEnum.Edit)">
                编辑
              </AButton>
              <APopconfirm
                title="确认要删除吗?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="cancelReset(record)"
              >
                <AButton type="link" size="small">删除</AButton>
              </APopconfirm>
              <AButton type="link" size="small" @click="editItemDetails(record, alertEnum.AddSon)"
                >添加子级菜单
              </AButton>
            </template>
          </template>
        </ATable>
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
    @cancel="classCancel"
    :footer="false"
  >
    <div class="p-10">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="submitForm"
      >
        <AFormItem v-if="operateRow" label="类型" name="type">
          <a-radio-group
            @change="switchType"
            :options="radioOptions"
            v-model:value="formState.type"
          />
        </AFormItem>
        <AFormItem v-if="operateRow" label="上级菜单" name="name">
          {{ operateRow.name }}
        </AFormItem>
        <AFormItem label="权限树名称" name="name">
          <AInput
            v-model:value="formState.name"
            :maxlength="50"
            placeholder="请输入权限树名称"
            allow-clear
          />
        </AFormItem>
        <AFormItem label="图标" name="icon">
          <IconPicker v-model:value="formState.icon" />
        </AFormItem>
        <AFormItem label="API" name="API">
          <AInput v-model:value="formState.API" placeholder="请输入API" allow-clear />
        </AFormItem>
        <AFormItem label="路由" name="url">
          <AInput v-model:value="formState.url" placeholder="请输入路由" allow-clear />
        </AFormItem>
        <AFormItem label="组件" name="component">
          <AInput v-model:value="formState.component" placeholder="请输入组件" allow-clear />
        </AFormItem>
        <AFormItem label="排序" name="seq">
          <a-input-number
            id="inputNumber"
            style="width: 540px"
            v-model:value="formState.seq"
            :min="1"
            :max="100000"
            placeholder="请输入排序"
          />
        </AFormItem>
        <AFormItem label="是否启用" name="status">
          <a-radio-group v-model:value="formState['status']">
            <a-radio value="1">启用</a-radio>
            <a-radio value="0">禁用</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem label="是否显示" name="visible">
          <a-radio-group v-model:value="formState['visible']">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem :wrapper-col="{ span: 14, offset: 8 }">
          <AButton type="primary" html-type="submit">提交</AButton>
          <AButton style="margin-left: 10px" @click="classCancel">取消</AButton>
        </AFormItem>
      </AForm>
    </div>
  </AModal>
 </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import { IconPicker, Icon } from '/@/components/Icon'

  import AdminHttp from '/@/utils/http/adminHttp'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  // --------全局参数---------------
  const { createMessage } = useMessage()
  const operateRow = ref<any>(null)
  const alternative = ref<any>(1)
  const editSort = ref<boolean>(false)
  const radioOptions = [
    { label: '菜单', value: 1 },
    { label: '按钮', value: 2 },
  ]
  const powerObject = ref({})
  const editObject = reactive({})

  /**
   *@desc 新增/编辑
   */
  interface FormState {
    parentId: string
    name: string
    terminalType?: any
    url?: any
    perms?: any
    resourceType?: any
    icon?: any
    status?: any
    visible?: any
    isCache?: any
    component?: any
    API?: any
    type?: any
    seq?: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    parentId: '0',
    name: '',
    terminalType: 'web',
    url: '',
    perms: '',
    resourceType: '1',
    icon: 'ci:dot-03-m',
    status: '',
    component: '',
    API: '',
    type: 1,
    visible: true,
    seq: '',
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
    Edit = '编辑菜单',
    Add = '添加菜单',
    AddSon = '添加子级菜单',
  }

  // ------操作按钮----------
  const switchType = (e) => {
    if (e.target.value === 1) {
      alternative.value = 1
    } else {
      alternative.value = 2
    }
  }

  //新增或编辑
  const editItemDetails = (record, title) => {
    if (title == alertEnum.Add) {
      classModal.title = title
      classModal.visible = true
      formState.name = ''
      formState.status = '1'
      formState.visible = true
      formState.url = ''
      formState.component = ''
      formState.icon = ''
      formState.API = ''
      formState.seq = ''
      operateRow.value = null
    } else if (title == alertEnum.AddSon) {
      operateRow.value = {
        name: record.name,
        id: record.id,
      }
      classModal.title = title
      classModal.visible = true
      formState.name = ''
      formState.status = '1'
      formState.visible = true
      formState.url = ''
      formState.component = ''
      formState.icon = ''
      formState.API = ''
      formState.type = 1
      formState.seq = ''
      formState.parentId = record.id
    } else {
      classModal.title = title
      classModal.visible = true
      editBrand.id = record.id
      if (record.pid === '0') {
        operateRow.value = null
        formState.name = record.name
        formState.status = record.status ? '1' : '0'
        formState.url = record.url
        formState.icon = record.icon
        formState.visible = record.visible
        formState.component = record.component
        formState.parentId = '0'
        formState.seq = record.seq
      } else {
        operateRow.value = {
          name: record.name,
          id: record.id,
        }
        formState.type = record.resourceType
        formState.name = record.name
        formState.API = record.perms
        formState.status = record.status ? '1' : '0'
        formState.parentId = record.pid
        formState.url = record.url
        formState.icon = record.icon
        formState.component = record.component
        formState.visible = record.visible
        formState.seq = record.seq
      }
    }
  }
  //确定/v1 /vocen-jarvis/v1/
  const submitForm = () => {
    if (classModal.title === alertEnum.AddSon) {
      formRef.value
        .validate()
        .then(() => {
          createMessage.loading({ content: 'Loading...' })
          AdminHttp.MENU.menu$POST({
            parentId: formState.parentId,
            name: formState.name,
            terminalType: formState.terminalType,
            component: formState.component,
            url: formState.url,
            icon: formState.icon,
            status: formState.status,
            visible: formState.visible ? '1' : '0',
            perms: formState.API,
            resourceType: formState.type,
            seq: formState.seq,
          })
            .then(() => {
              createMessage.success({ content: `操作成功` })
              classModal.visible = false
              loadTableData()
              operateRow.value = null
            })
            .catch((err) => {
              createMessage.error({ content: `操作失败:${err.message}` })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else if (classModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          createMessage.loading({ content: 'Loading...' })
          AdminHttp.MENU.menu$POST({
            parentId: 0,
            name: formState.name,
            terminalType: formState.terminalType,
            component: formState.component,
            url: formState.url,
            resourceType: formState.type,
            icon: formState.icon,
            visible: formState.visible ? '1' : '0',
            status: formState.status,
            perms: formState.API,
            seq: formState.seq,
          })
            .then(() => {
              createMessage.success({ content: `操作成功` })
              classModal.visible = false
              operateRow.value = null
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
        AdminHttp.MENU.menu$PUT({
          id: editBrand.id,
          parentId: formState.parentId,
          name: formState.name,
          terminalType: formState.terminalType,
          component: formState.component,
          url: formState.url,
          resourceType: formState.type,
          icon: formState.icon,
          status: formState.status,
          visible: formState.visible ? '1' : '0',
          perms: formState.API,
          seq: formState.seq,
        })
          .then(() => {
            createMessage.success({ content: `操作成功` })
            // item.status = 1
            loadTableData()
            classModal.visible = false
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
    classModal.visible = false
    formState.name = ''
    formState.icon = ''
    formState.url = ''
    formState.component = ''
    editBrand.id = ''
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    filterData.value = {
      ...values,
    }
    loadTableData()
  }

  //----- 加载列表数据 ---------/vocen-jarvis/v1/menu/name/tree
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
      }
      const { code, data } = await AdminHttp.MENU.menuNameTree(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  //删除
  const cancelReset = async (record) => {
    try {
      const deleteMap = { id: record.id }
      const { code, message } = await AdminHttp.MENU.menu$Id(deleteMap)
      if (code == '20001') {
        await loadTableData()
        createMessage.success({ content: `删除成功` })
      }
    } catch (err) {
      createMessage.error({ content: err.message })
    } finally {
      // createMessage.error({ content: `删除失败`, key: loadingCtxkey })
    }
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
  //编辑
  const editMinOrder = (record) => {
    editObject.isFocus = record.id
    console.log(record, 'pp')
    powerObject.value = {
      id: record.id,
      parentId: record.pid,
      name: record.name,
      terminalType: record.terminalType,
      component: record.component,
      url: record.url,
      resourceType: record.resourceType,
      icon: record.icon,
      status: record.status,
      visible: record.visible ? '1' : '0',
      perms: record.perms,
      seq: record.seq,
    }
    editSort.value = true
    operateRow.value = record
  }
  const blur = (e) => {
    editSort.value = false
    editObject.isFocus = ''
    // AdminHttp.MENU.menu$PUT({
    //   id: powerObject.value.id,
    //   parentId: powerObject.value.parentId,
    //   name: powerObject.value.name,
    //   terminalType: 'web',
    //   component: powerObject.value.component,
    //   url: powerObject.value.url,
    //   resourceType: powerObject.value.resourceType,
    //   icon: powerObject.value.icon,
    //   status: powerObject.value.status ? '1' : '0',
    //   visible: powerObject.value.visible ? '1' : '0',
    //   perms: powerObject.value.perms,
    //   seq: formState.seq,
    // })
    //   .then(() => {
    //     createMessage.success({ content: `操作成功` })
    //     // item.status = 1
    //     loadTableData()
    //     editBrand.id = ''
    //   })
    //   .catch((err) => {
    //     createMessage.error({ content: `操作失败:${err.message}` })
    //   })
  }
  const Enter = () => {
    editSort.value = false
    editObject.isFocus = ''
    AdminHttp.MENU.menu$PUT({
      id: powerObject.value.id,
      parentId: powerObject.value.parentId,
      name: powerObject.value.name,
      terminalType: 'web',
      component: powerObject.value.component,
      url: powerObject.value.url,
      resourceType: powerObject.value.resourceType,
      icon: powerObject.value.icon,
      status: powerObject.value.status ? '1' : '0',
      visible: powerObject.value.visible ? '1' : '0',
      perms: powerObject.value.perms,
      seq: formState.seq,
    })
      .then(() => {
        createMessage.success({ content: `操作成功` })
        // item.status = 1
        loadTableData()
        editBrand.id = ''
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}` })
      })
  }
</script>

<style scoped lang="less"></style>
