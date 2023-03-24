<template>
  <div style="background-color: white">
    <SupplierSwitch change-space="special">
      <template #tableEdit>
        <a-button type="primary" size="small" class="submit-open" @click="releaseQuest()"
          >配置角色权限</a-button
        >
        <a-button type="primary" size="small" class="submit-open" @click="releaseQuest()"
          >添加员工账号</a-button
        >
      </template>
      <template #content>
        <Table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :row-key="(record) => record.id"
          @expand="expandbtn"
          size="small"
          :scroll="{ x: 'calc(700px + 50%)', y: 500 }"
          bordered
        >
          <template #action="{ record }"> </template>
          <template #addChildCategory> </template>
          <template #move="{ record }">
            <!-- <div class="action-space" @click="changeItem(record)"> </div> -->
            <a-select
              v-model:value="roleValue"
              size="small"
              style="width: 200px"
              :options="options"
            />
          </template>
          <template #state="{ record }">
            <a-switch
              v-model:checked="record.isShow"
              checked-children="开"
              un-checked-children="关"
            />
          </template>
          <template #operation="{ record }">
            <a-button type="link" class="submit-btn" @click="changeItem(record)">重置密码</a-button>
            <a-button type="link" class="submit-btn" @click="audit">登录日志</a-button>
          </template>
        </Table>
      </template>
      <template #pagination>
        <VoPagination
          :total="paginations.total"
          :current="paginations.current"
          :page-size="paginations.pageSize"
          @pagination="paginationChange"
        />
      </template>
    </SupplierSwitch>
  </div>
  <a-modal v-model:visible="releaseVisible" centered title="添加员工账号" :footer="null">
    <div style="padding: 20px">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 10 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="所属角色"
          name="username"
          :rules="[{ required: true, message: '请选择所属角色' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="手机号"
          name="password"
          :rules="[{ required: true, message: '该手机号未注册，请先注册' }]"
        >
          <a-input v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button @click="cancel" style="margin-right: 15px">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form></div
    >
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import type { SelectProps } from 'ant-design-vue'
  import SupplierSwitch from './SupplierSwitch.vue'
  interface FormState {
    username: string
    password: string
  }
  const columns = [
    {
      title: '员工名称',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '所属角色',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: 'move' },
      align: 'center',
    },

    {
      title: '手机号',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'isMonitor',
      key: 'isMonitor',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '是否启用',
      dataIndex: 'isState',
      key: 'isState',
      slots: { customRender: 'state' },
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '330px',
      slots: { customRender: 'operation' },
      align: 'center',
    },
  ]
  export default defineComponent({
    components: { SupplierSwitch, Table, VoPagination },
    setup() {
      const radioValue = ref<number>()

      const formState = reactive<FormState>({
        username: '',
        password: '',
      })
      const onFinish = (values: any) => {
        console.log('Success:', values)
      }

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      //发布问题
      const releaseQuest = () => {
        releaseVisible.value = true
      }
      const cancel = () => {
        releaseVisible.value = false
      }

      const releaseVisible = ref<boolean>(false)

      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
      }
      const paginations = reactive({
        total: 158,
        current: 1,
        pageSize: 20,
      })
      //操作
      const changeItem = (record) => {
        console.log(record)
        // visible.value = true
      }
      const audit = (visible: boolean) => {
        modal2Visible.value = visible
      }
      const rejected = (visible: boolean) => {
        rejectedVisible.value = visible
      }
      //【以上是问题抽屉】
      const data = reactive([
        {
          id: '1',
          key: 4,
          category: '张三1',
          move: '测试-4',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '3',
          isparent: true,
        },
        {
          id: '2',
          key: 4,
          category: '张三2',
          move: '测试-4',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '1',
          isparent: true,
        },
        {
          id: '3',
          key: 4,
          category: '张三3',
          move: '测试-4',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '2',
          isparent: true,
        },
        {
          id: '5',
          key: 5,
          category: '张三4',
          move: '测试-5',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          personnel: '张三',
          operation: '操作',
          isState: '2',
          isparent: true,
        },
        {
          id: '6',
          key: 6,
          category: '张三5',
          move: '测试-6',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '1',
          isparent: true,
        },
        {
          id: '7',
          key: 7,
          category: '张三6',
          move: '测试-7',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '3',
          isparent: true,
        },
        {
          id: '8',
          key: 8,
          category: '张三7',
          move: '测试-8',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '3',
          isparent: true,
        },
        {
          id: '9',
          key: 9,
          category: '张三8',
          move: '测试-9',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '2',
          isparent: true,
        },
        {
          id: '10',
          key: 10,
          category: '张三9',
          move: '测试-10',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '2',
          isparent: true,
        },
        {
          id: '11',
          key: 11,
          category: '张三10',
          move: '测试-11',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '2',
          isparent: true,
        },
        {
          id: '12',
          key: 12,
          category: '张三11',
          move: '测试-12',
          addChildCategory: '李海',
          mobilePhone: '13212345678',
          isMonitor: true,
          operation: '操作',
          personnel: '张三',
          isState: '2',
          isparent: true,
        },
      ])
      const modal2Visible = ref<boolean>(false)
      const rejectedVisible = ref<boolean>(false)
      const onClose = () => {
        // visible.value = false
      }
      const options = ref<SelectProps['options']>([
        { value: '技术', label: '技术' },
        { value: '销售', label: '销售' },
      ])
      return {
        roleValue: ref(''),
        options,
        onClose,
        rejected,
        modal2Visible,
        rejectedVisible,
        radioValue,
        paginations,
        paginationChange,
        data,
        columns,
        //操作
        changeItem,
        audit,
        //发布
        releaseQuest,
        cancel,
        releaseVisible,

        formState,
        onFinish,
        onFinishFailed,
      }
    },
  })
</script>

<style lang="less" scoped>
  .release {
    padding: 15px;
    margin: 10px;
    background: #fff;
  }
  .submit-open {
    margin-right: 10px;
  }
</style>
