<template>
  <div style="background-color: white">
    <EraSwitchTable change-space="special">
      <template #tableEdit>
        <a-button type="primary" class="submit-btn" @click="releaseQuest()">发布问题</a-button>
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
          <template #action="{ record }"> </template>
          <template #addChildCategory> </template>
          <template #move="{ record }">
            <div class="action-space" @click="changeItem(record)">
              <span>问题:</span><span>点击问题不超过50字</span>
              <div> <span>补充:</span><span>补充问题不超过500字</span> </div>
            </div>
          </template>
          <template #state="{ record }">
            <p v-if="record.isState == '1'">待审核</p>
            <p v-else-if="record.isState == '2'">未通过</p>
            <p v-else-if="record.isState == '3'">已通过</p>
          </template>
          <template #operation="{ record }">
            <a-button type="link" class="submit-btn" @click="changeItem(record)">查看详情</a-button>
            <a-button type="link" class="submit-btn" @click="audit">审核通过</a-button>
            <a-button type="link" class="submit-btn" @click="rejected">驳回</a-button>
            <a-button type="link" class="submit-btn" @click="releaseQuest">写回答</a-button>
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
    </EraSwitchTable>
  </div>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="问题详情"
    placement="right"
    width="736px"
    :footer-style="{ textAlign: 'center' }"
    @after-visible-change="afterVisibleChange"
  >
    <div style="padding: 20px"> <ThinkAlertDetail /> </div>
    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onClose">确认</a-button>
    </template>
  </a-drawer>
  <a-modal v-model:visible="releaseVisible" width="1000px" title="发布问题" @ok="handleOk">
    <div class="release">
      <a-form
        layout="inline"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="请选择栏目" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
              <a-input v-model:value="formState.column" /> </a-form-item
          ></a-col>
          <a-col :span="8">
            <a-form-item label="请选择品类" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
              <a-input v-model:value="formState.category" /> </a-form-item
          ></a-col>
          <a-col :span="8">
            <a-form-item
              label="请选择共创项目"
              :label-col="{ span: 9 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-input v-model:value="formState.project" /> </a-form-item
          ></a-col>
        </a-row>
        <p>请输入问题</p>
        <a-textarea
          v-model:value="formState.problem"
          placeholder="最多输入50字"
          :rows="3"
          :maxlength="50"
        />
        <p>请输入补充问题</p>
        <a-textarea
          v-model:value="formState.supplement"
          :rows="7"
          placeholder="最多输入500字"
          :maxlength="500"
        />
      </a-form>
      <div><ImageForm /></div>
      <div>
        <a-radio-group v-model:value="radioValue">
          <a-radio :value="1">仅供应商可见</a-radio>
          <a-radio :value="2">仅代理商可见</a-radio>
          <a-radio :value="3">仅投资人可见</a-radio>
        </a-radio-group>
        <div> 不勾选该选项则内容发布后全员可见。 </div>
      </div>
    </div>
  </a-modal>
  <a-modal v-model:visible="modal2Visible" title="系统提示" centered @ok="modal2Visible = false">
    <div style="padding: 20px">
      <p>该操作将允许该回答在信息流中展示，确定操作吗？</p>
    </div>
  </a-modal>
  <a-modal
    v-model:visible="rejectedVisible"
    title="驳回原因"
    centered
    @ok="rejectedVisible = false"
  >
    <div style="padding: 20px">
      <a-form
        layout="inline"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-textarea v-model:value="formState.problem" :rows="10" :maxlength="50" />
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts">
  import ImageForm from './ImageForm.vue'
  import ThinkAlertDetail from '/@/modules/ContentModule/view/ThinkManager/conponents/ThinkAlertDetail.vue'
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  interface FormState {
    column: string
    category: string
    project: string
    problem: string
    supplement: string
  }
  const columns = [
    {
      title: '记录ID',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '问题内容',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: 'move' },
      align: 'center',
    },
    {
      title: '作者',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: '' },
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
      title: '提交时间',
      dataIndex: 'isMonitor',
      key: 'isMonitor',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'isState',
      key: 'isState',
      slots: { customRender: 'state' },
      align: 'center',
    },
    {
      title: '审核人',
      dataIndex: 'personnel',
      key: 'personnel',
      slots: { customRender: '' },
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
    components: { EraSwitchTable, Table, VoPagination, ImageForm, ThinkAlertDetail },
    setup() {
      const radioValue = ref<number>()
      //发布表单
      const formState = reactive<FormState>({
        column: '',
        category: '',
        project: '',
        problem: '',
        supplement: '',
      })
      const onFinish = (values: any) => {
        console.log('Success:', values)
        releaseVisible.value = false
      }

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      //发布问题
      const releaseQuest = () => {
        releaseVisible.value = true
      }

      const releaseVisible = ref<boolean>(false)
      const handleOk = (e: MouseEvent) => {
        console.log(e)
        releaseVisible.value = false
      }
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
      //【以下是问题抽屉】
      const visible = ref<boolean>(false)

      const afterVisibleChange = (bool: boolean) => {
        console.log('visible', bool)
      }
      //操作
      const changeItem = (record) => {
        console.log(record)
        visible.value = true
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
          category: '1000001',
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
          category: '1000002',
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
          category: '1000003',
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
          category: '1000004',
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
          category: '1000005',
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
          category: '1000006',
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
          category: '1000007',
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
          category: '1000008',
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
          category: '1000009',
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
          category: '10000010',
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
          category: '10000011',
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
        visible.value = false
      }
      return {
        onClose,
        rejected,
        modal2Visible,
        rejectedVisible,
        radioValue,
        paginations,
        paginationChange,
        data,
        columns,
        //抽屉
        visible,
        afterVisibleChange,
        //操作
        changeItem,
        audit,
        //以上是抽屉
        //发布
        releaseQuest,
        releaseVisible,
        handleOk,
        //发布表单
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
</style>
