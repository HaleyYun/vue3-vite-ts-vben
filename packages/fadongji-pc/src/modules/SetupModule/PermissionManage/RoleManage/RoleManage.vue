<template>
  <div>
    <div class="mx-24px mt-20px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>

    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit>
          <a-button
            type="primary"
            class="margin-l-r-10"
            @click="editItemDetails(record, alertEnum.Add)"
            >添加角色
          </a-button>
        </template>
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
            <template v-if="column.dataIndex === 'isDisabled'">
              <span>{{ record.isDisabled ? '启用' : '禁用' }}</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                v-auth="'/v1/role/perms'"
                type="link"
                size="small"
                @click="jurisdiction(record)"
              >
                配置权限
              </AButton>
              <AButton type="link" size="small" @click="desensitization(record)">配置脱敏</AButton>
              <AButton type="link" size="small" @click="editItemDetails(record, alertEnum.Edit)"
                >编辑
              </AButton>
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
    :title="classModal.title"
    centered
    destroy-on-close
    :confirm-loading="classModal.confirmLoading"
    @ok="classAdd"
    @cancel="classCancel"
  >
    <div class="p-15px">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem
          label="角色名称"
          name="className"
          :hasFeedback="true"
          :rules="[{ required: true, message: '角色名称不能为空，请录入角色名称' }]"
        >
          <AInput
            v-model:value="formState.className"
            :maxlength="10"
            placeholder="请输入角色名称"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="角色描述"
          name="classRole"
          :hasFeedback="true"
          :rules="[{ required: true, message: '请输入角色描述' }]"
        >
          <AInput
            v-model:value="formState.classRole"
            :maxlength="30"
            placeholder="请输入角色描述"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="是否启用"
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
  <a-drawer title="权限配置" :visible="treeVisible" :width="720" @close="onClose">
    <div class="p-15px">
      <div class="pb-10px">
        <span>角色名称：</span><span>{{ storeMenuName }}</span>
      </div>
      <a-tree
        v-if="treeVisible && treeData?.length"
        v-model:checkedKeys="checkedKeys"
        checkable
        :tree-data="treeData"
        @check="checkMatch"
        :fieldNames="{ children: 'children', title: 'name', key: 'id' }"
        default-expand-all
      />
    </div>
    <template #footer>
      <a-button type="primary" @click="submit">保存权限</a-button>
    </template>
  </a-drawer>

  <a-drawer title="脱敏权限配置" :visible="sensitiveVisible" width="1200px" @close="onSensitive">
    <div class="p-15px">
      <ATable
        :loading="tableLoading"
        :columns="sensitiveColumns"
        :data-source="sensitiveData"
        :pagination="false"
        size="small"
        row-key="id"
        bordered
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ (paginations.pageNo - 1) * paginations.pageSize + index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'status'">
            <ASwitch
              @change="stateEnable(record)"
              v-model:checked="record.status"
              checked-children="开"
              un-checked-children="关"
            />
          </template>
        </template>
      </ATable>
    </div>
    <template #footer>
      <a-button type="primary" @click="submitSensitive">保存脱敏配置权限</a-button>
    </template>
  </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import type { TreeProps } from 'ant-design-vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns, sensitiveColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import dayjs from 'dayjs'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const treeData = ref<TreeProps['treeData']>([])
  const storeMenuData = ref<any>([])
  const treeVisible = ref<boolean>(false)
  const sensitiveVisible = ref<boolean>(false)
  const storeMenuID = ref<string>('')
  let checkedKeys = ref<string[]>([])
  // --------全局参数---------------
  const { createMessage } = useMessage()

  // ------操作按钮----------
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
    classRole: '',
    classSwitch: '1',
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
    Edit = '编辑角色',
    Add = '添加角色',
  }

  //新增或编辑
  const editItemDetails = (record, title) => {
    if (title == alertEnum.Add) {
      classModal.title = title
      classModal.visible = true
      formState.classSwitch = '1'
    } else {
      classModal.title = title
      classModal.visible = true
      formState.classRole = record.remark
      formState.className = record.name
      formState.classSwitch = record.isDisabled ? '1' : '0'
      editBrand.id = record.id
    }
  }
  //确定/v1 /vocen-jarvis/v1/
  const classAdd = () => {
    if (classModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          AdminHttp.ROLE.role({
            status: formState.classSwitch,
            name: formState.className,
            remark: formState.classRole,
          })
            .then((res) => {
              if (res.code === '20001') {
                createMessage.success({
                  content: `${formState.className}角色添加成功，请及时配置角色权限`,
                })
              }
              classModal.visible = false
              formState.className = ''
              formState.classRole = ''
              formState.classSwitch = ''
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
      formRef.value.validate().then(async (res) => {
        AdminHttp.ROLE.modifyRole({
          status: formState.classSwitch,
          name: formState.className,
          remark: formState.classRole,
          id: editBrand.id,
        })
          .then((res) => {
            if (res.code === '20001') {
              createMessage.success({ content: `操作成功` })
              // item.status = 1
              loadTableData()
              classModal.visible = false
              formState.className = ''
              formState.classRole = ''
              formState.classSwitch = ''
              editBrand.id = ''
            }
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
    formState.className = ''
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

  //----- 加载列表数据sensitiveData ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  const loadTableData = async () => {
    await initJurisdiction()
    try {
      tableLoading.value = true
      let params = {
        ...filterData.value,
        ...paginations,
      }
      const { code, data } = await AdminHttp.ROLE.rolePage(params)
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
  //配置权限
  //权限
  const initJurisdiction = () => {
    AdminHttp.MENU.menuOrgTree()
      .then((res) => {
        treeData.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `获取失败:${err.message}` })
      })
  }
  //id获取权限反显
  const JurisdictionIds = () => {
    AdminHttp.MENU.menuTreeRoleLeaf({ roleId: storeMenuID.value })
      .then((res) => {
        // investCode.value = res.data
        checkedKeys.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `获取失败:${err.message}` })
      })
  }
  const storeMenuName = ref<string>('')
  const jurisdiction = async (item) => {
    storeMenuName.value = item.name
    storeMenuID.value = item.id
    treeVisible.value = true
    await JurisdictionIds()
  }
  //权限
  const checkMatch = (checkedKeys, e) => {
    storeMenuData.value = checkedKeys.concat(e.halfCheckedKeys)
  }

  //)保存
  const submit = async () => {
    try {
      let params = { roleId: storeMenuID.value, permsIds: storeMenuData.value }
      const { code, message } = await AdminHttp.ROLE.rolePerms(params)
      if (code === '20001') {
        createMessage.success('操作成功')
        loadTableData()
        treeVisible.value = false
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onClose = async () => {
    treeVisible.value = false
  }
  //配置权限
  const roleId = ref<string>('')
  //配置脱敏
  const desensitization = async (item) => {
    roleId.value = item.id
    console.log(item)

    await loadData(item)
    sensitiveVisible.value = true
  }
  const onSensitive = async () => {
    sensitiveVisible.value = false
  }

  //)保存
  const submitSensitive = async (item) => {
    try {
      const params = sensitiveData.value.map((item) => {
        return {
          maskId: item.id,
          status: item.status ? '1' : '0',
          roleId: roleId.value,
        }
      })
      console.log(params, 'params')
      const { code, message } = await AdminHttp.ROLE.accountMaskRole$Post(params)
      if (code === '20001') {
        createMessage.success('操作成功')
        // loadData(item)
        treeVisible.value = false
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }
  //----- 加载列表数据---------
  const sensitiveData = ref([])
  const loadData = async (item) => {
    try {
      tableLoading.value = true
      const { code, data } = await AdminHttp.ROLE.accountMaskRole({ roleId: item.id })
      console.log(tableData)
      if (code === '20001') {
        sensitiveData.value = data
      }

      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }
  //启用状态
  const stateEnable = (record) => {
    console.log(record.status)
  }
  //配置脱敏
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
