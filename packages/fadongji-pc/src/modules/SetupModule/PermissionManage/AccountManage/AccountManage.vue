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
            >添加账号
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
            <template v-if="column.dataIndex === 'status'">
              <span>{{ record.status ? '禁用' : '启用' }}</span>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <AButton
                v-auth="'/v1/user/info/op/account'"
                type="link"
                size="small"
                @click="editItemDetails(record, alertEnum.Edit)"
              >
                编辑
              </AButton>
              <AButton type="link" size="small" @click="cancelReset(record)">重置密码</AButton>
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
          label="手机号"
          name="className"
          :rules="[
            { required: true, message: '请输入用户手机号' },
            {
              type: 'pattern',
              pattern: Pattern.phone,
              message: '手机号格式不正确',
              trigger: 'blur',
            },
          ]"
        >
          <AInput
            v-if="editBrand.id != ''"
            v-model:value="formState.className"
            :maxlength="11"
            placeholder="请输入用户手机号"
            allow-clear
            disabled
          />
          <AInput
            v-else
            v-model:value="formState.className"
            :maxlength="11"
            placeholder="请输入用户手机号"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="真实姓名"
          name="classRole"
          :rules="[{ required: true, message: '请输入真实姓名' }]"
        >
          <AInput
            v-model:value="formState.classRole"
            :maxlength="10"
            placeholder="请输入真实姓名"
            allow-clear
          />
        </AFormItem>
        <AFormItem
          label="邮箱"
          name="classEmail"
          :rules="[{ required: true, message: '请输入公司邮箱' }]"
        >
          <AInput
            v-model:value="formState.classEmail"
            :maxlength="20"
            placeholder="请输入公司邮箱，例zhangsan"
            allow-clear
            addon-after="@vocen.com"
          />
        </AFormItem>
        <AFormItem
          label="是否启用"
          name="classSwitch"
          :rules="[{ required: true, message: '请输入角色状态' }]"
        >
          <a-radio-group v-model:value="formState['classSwitch']">
            <a-radio value="false">启用</a-radio>
            <a-radio value="true">禁用</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem
          label="角色"
          name="roleCompany"
          :rules="[{ required: true, message: '未配置角色，确认提交吗，确认后该账号无角色权限；' }]"
        >
          <a-select
            :options="classData"
            v-model:value="formState.roleCompany"
            placeholder="请选择角色"
            @change="onChange"
          />
        </AFormItem>
      </AForm>
    </div>
  </AModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onBeforeMount, createVNode } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import SearchForm from './component/SearchForm.vue'
  import { tableColumns } from './data/configuration'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import dayjs from 'dayjs'
  import { Pattern } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  let classData = ref([] as any[])

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
    classEmail: any
    roleCompany: any
  }

  const formRef = ref<any>()
  const formState = reactive<FormState>({
    className: '',
    classRole: '',
    classSwitch: 'false',
    classEmail: '',
    roleCompany: null,
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
    Edit = '编辑账号',
    Add = '添加账号',
  }

  //新增或编辑
  const editItemDetails = (record, title) => {
    if (title == alertEnum.Add) {
      classModal.title = title
      classModal.visible = true
      formState.classSwitch = 'false'
      formState.className = ''
      formState.classRole = ''
      formState.classEmail = ''
      formState.roleCompany = null
    } else {
      classModal.title = title
      classModal.visible = true
      formState.classSwitch = record.status.toString()
      formState.className = record.userName
      formState.classRole = record.realName
      formState.classEmail = record.email.substring(record.email.length - 10, 0)
      formState.roleCompany = record.roleName
      editBrand.id = record.id
      editBrand.roleId = record.roleId
    }
  }
  //确定/v1 /vocen-jarvis/v1/
  const classAdd = () => {
    if (classModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          AdminHttp.USER.userInfoOpAccount$POST({
            email: formState.classEmail + '@vocen.com',
            realName: formState.classRole,
            roleId: editBrand.roleId,
            status: formState.classSwitch,
            userName: formState.className,
          })
            .then(({ code }) => {
              if (+code === 20001) {
                createMessage.success({ content: `操作成功` })
                classModal.visible = false
                loadTableData()
              }
            })
            .catch((err) => {
              createMessage.error(err.message)
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      formRef.value.validate().then(async () => {
        AdminHttp.USER.userInfoOpAccount$PUT({
          email: formState.classEmail + '@vocen.com',
          realName: formState.classRole,
          roleId: editBrand.roleId,
          status: formState.classSwitch,
          userName: formState.className,
          id: editBrand.id,
        })
          .then(({ code }) => {
            if (+code === 20001) {
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
      const { code, data } = await AdminHttp.USER.userInfoOpPage(params)
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
  const onChange = (item) => {
    editBrand.roleId = item
  }
  //重置
  const cancelReset = async (record) => {
    const modal = Modal.confirm({
      title: '重置密码',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '重置',
      content: '重置后密码为随机生成8位数字随机密码；短信发送至联系方式手机上。',
      async onOk() {
        let params = { userId: record.id }
        try {
          const { code, message } = await AdminHttp.USER.userInfoOpPasswordBy$userId(params)
          if (code === '20001') {
            createMessage.success('重置密码成功')
            // 重新加载列表页面
            loadTableData()
          } else {
            createMessage.error(message)
          }
        } catch (e) {
          console.log(e)
        }
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less"></style>
