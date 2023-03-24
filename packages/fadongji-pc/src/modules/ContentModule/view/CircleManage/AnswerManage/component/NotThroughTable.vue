<template>
  <div style="background-color: white">
    <EraSwitchTable change-space="special">
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
            <a-button type="link" class="submit-btn" @click="changeItem(record)">查看评论</a-button>

            <a-button type="link" class="submit-btn" @click="rejected">删除</a-button>
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
    title="Basic Drawer"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
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
      <a-form>
        <a-textarea :rows="10" :maxlength="500" />
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
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
      width: '240px',
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
      title: '审核时间',
      dataIndex: 'isAudit',
      key: 'isAudit',
      slots: { customRender: '' },
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
      width: '300px',
      slots: { customRender: 'operation' },
      align: 'center',
    },
  ]
  export default defineComponent({
    components: { EraSwitchTable, Table, VoPagination },
    setup() {
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

      const changeItem = (record) => {
        console.log(record)
        visible.value = true
      }
      const audit = (visible: boolean) => {
        modal2Visible.value = visible
      }
      const modal2Visible = ref<boolean>(false)
      //【以上是问题抽屉】
      const data = reactive([
        {
          id: '1',
          key: 4,
          category: '1000001',
          move: '测试-4',
          addChildCategory: '李海1',
          mobilePhone: '13212345678',
          isMonitor: '2022-3-16 19:33:34',
          operation: '操作',
          personnel: '张三',
          isState: '3',
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
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
          isAudit: '2022-3-16 19:33:34',
          isparent: true,
        },
      ])
      const rejected = (visible: boolean) => {
        console.log('1111')

        rejectedVisible.value = visible
      }
      const rejectedVisible = ref<boolean>(false)
      return {
        rejected,
        rejectedVisible,
        modal2Visible,
        audit,
        paginations,
        paginationChange,
        data,
        columns,
        //抽屉
        visible,
        afterVisibleChange,
        changeItem,
        //以上是抽屉
      }
    },
  })
</script>

<style lang="less" scoped></style>
