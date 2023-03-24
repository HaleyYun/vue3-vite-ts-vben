<template>
  <div style="background-color: white">
    <ColumnSwitch change-space="special">
      <template #tableEdit>
        <a-button type="primary" class="submit-btn" @click="changeItem(alertEnum.Add)"
          >新增栏目</a-button
        >
      </template>
      <template #content>
        <Table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :row-key="(record) => record.id"
          size="small"
          :scroll="{ x: 'calc(700px + 50%)', y: 500 }"
          bordered
        >
          <template #action> </template>
          <template #addChildCategory> </template>
          <template #move="{ record }">
            <div class="action-space">
              <p v-if="record.isPlate == '1'">视频</p>
              <p v-else-if="record.isPlate == '2'">问答</p>
              <p v-else-if="record.isPlate == '3'">等等</p>
            </div>
          </template>
          <template #state="{ record }">
            <p v-if="record.isState == '1'">待审核</p>
            <p v-else-if="record.isState == '2'">未通过</p>
            <p v-else-if="record.isState == '3'">已通过</p>
          </template>
          <template #operation="{ record }">
            <a-button type="link" class="submit-btn" @click="changeItem(alertEnum.Edit)"
              >编辑</a-button
            >
            <a-button type="link" class="submit-btn" @click="change(record)">
              <a-popconfirm
                title="确认要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="deleteItem(record)"
              >
                <a>删除</a>
              </a-popconfirm>
            </a-button>
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
    </ColumnSwitch>
  </div>
  <a-modal v-model:visible="modal2Visible" :title="modelTitle" centered @ok="modal2Visible = false">
    <div style="padding: 20px">
      <a-form
        :model="formState"
        name="basic"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        autocomplete="off"
        @ok="confirmFormEdit"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="所属模块"
          name="resource"
          :rules="[{ required: true, message: '请选择模块' }]"
        >
          <a-radio-group v-model:value="formState.resource">
            <a-radio value="1">问答</a-radio>
            <a-radio value="2">视频</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="栏目名称"
          name="name"
          :rules="[{ required: true, message: '请输入名称' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="状态启用" name="enable">
          <a-radio-group v-model:value="formState.enable">
            <a-radio value="1">启用</a-radio>
            <a-radio value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="排序" name="desc">
          <a-input v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 10, offset: 9 }">
          <a-button style="margin-right: 60px" @click="modal2Visible = false">取消</a-button>
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form></div
    >
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import type { UnwrapRef } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import ColumnSwitch from './ColumnSwitch.vue'
  //form
  interface FormState {
    name: string
    resource: string
    enable: string
    desc: string
  }
  // “编辑” 或者 “或者” 得标识  Edit：编辑； Add: 新增
  enum alertEnum {
    Edit = 'edit',
    Add = 'add',
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '所属模块',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: 'move' },
      align: 'center',
    },
    {
      title: '栏目名称',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'mobileTime',
      key: 'mobileTime',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'isMonitor',
      key: 'isMonitor',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '最后编辑人',
      dataIndex: 'editor',
      key: 'editor',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '最后编辑时间',
      dataIndex: 'lastTime',
      key: 'lastTime',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'personnel',
      key: 'personnel',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: { customRender: 'operation' },
      align: 'center',
    },
  ]
  export default defineComponent({
    components: { Table, VoPagination, ColumnSwitch },
    setup() {
      // “编辑” 或者 “新增” 标题
      const modelTitle = ref<string>()
      //对画框的form
      const formState: UnwrapRef<FormState> = reactive({
        name: '',
        resource: '',
        enable: '',
        desc: '',
      })
      //对话框
      const modal2Visible = ref<boolean>(false)
      const radioValue = ref<number>()
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
      const change = (record) => {
        console.log(record)
      }
      const changeItem = (title) => {
        // console.log(record)
        modelTitle.value = title
        modal2Visible.value = true
      }
      const confirmFormEdit = () => {}
      //【以上是问题抽屉】
      const data = reactive([
        {
          id: '1',
          key: 4,
          category: '1000001',
          move: '测试-4',
          addChildCategory: '卖货攻略',
          mobileTime: '启用',
          isMonitor: '1',
          operation: '操作',
          personnel: '张三/1345678912',
          editor: '李四/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '3',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '2',
          key: 2,
          category: '1000002',
          move: '测试-4',
          addChildCategory: '人力资源',
          mobileTime: '启用',
          isMonitor: '2',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          isState: '1',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isPlate: '2',
          isparent: true,
        },
        {
          id: '3',
          key: 3,
          category: '1000003',
          move: '测试-4',
          addChildCategory: '卖货攻略',
          mobileTime: '启用',
          isMonitor: '3',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '2',
          isPlate: '3',
          isparent: true,
        },
        {
          id: '4',
          key: 4,
          category: '1000003',
          move: '测试-4',
          addChildCategory: '卖货攻略',
          mobileTime: '启用',
          isMonitor: '4',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          isState: '2',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isPlate: '3',
          isparent: true,
        },
        {
          id: '5',
          key: 5,
          category: '1000004',
          move: '测试-5',
          addChildCategory: '卖货攻略',
          mobileTime: '禁用',
          isMonitor: '5',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          operation: '操作',
          isState: '2',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '6',
          key: 6,
          category: '1000005',
          move: '测试-6',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '6',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '1',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '7',
          key: 7,
          category: '1000006',
          move: '测试-7',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '7',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '3',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '8',
          key: 8,
          category: '1000007',
          move: '测试-8',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '8',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '3',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '9',
          key: 9,
          category: '1000008',
          move: '测试-9',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '9',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '2',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '10',
          key: 10,
          category: '1000009',
          move: '测试-10',
          addChildCategory: '人力资源',
          mobileTime: '禁用',
          isMonitor: '10',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '2',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '11',
          key: 11,
          category: '10000010',
          move: '测试-11',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '11',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '2',
          isPlate: '1',
          isparent: true,
        },
        {
          id: '12',
          key: 12,
          category: '10000011',
          move: '测试-12',
          addChildCategory: '找货攻略',
          mobileTime: '禁用',
          isMonitor: '12',
          operation: '操作',
          editor: '李四/1345678912',
          personnel: '张三/1345678912',
          lastTime: '2022-3-16 19:33:34',
          createTime: '2022-3-16 19:33:34',
          isState: '2',
          isPlate: '1',
          isparent: true,
        },
      ])
      const deleteItem = (item) => {
        alert('删除===' + item)
      }
      const onFinish = (values: any) => {
        if (modelTitle.value === alertEnum.Add) {
          modal2Visible.value = false
        } else {
          modal2Visible.value = false
        }
        console.log('Success:', values)
      }

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      return {
        modal2Visible,
        radioValue,
        //以上对话
        paginations,
        paginationChange,
        deleteItem,
        data,
        columns,
        //操作
        changeItem,
        confirmFormEdit,
        change,
        //对话框form
        labelCol: { style: { width: '150px' } },
        wrapperCol: { span: 14 },
        formState,
        modelTitle,
        alertEnum,
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
</style>
