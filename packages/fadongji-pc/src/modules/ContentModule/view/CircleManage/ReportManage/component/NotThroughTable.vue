<template>
  <div style="background-color: white">
    <ReportSwitch change-space="special">
      <template #tableEdit>
        <a-button type="primary" class="submit-btn">新栏目</a-button>
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
            <a-button type="link" class="submit-btn" @click="changeItem(record)">查看详情</a-button>
            <a-button type="link" class="submit-btn" @click="changeItem(record)">
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
    </ReportSwitch>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import ReportSwitch from './ReportSwitch.vue'

  const columns = [
    {
      title: '记录ID',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '内容类型',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: 'move' },
      align: 'center',
    },
    {
      title: '举报内容',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: '' },
      width: '200px',
      ellipsis: 'true',
      align: 'center',
    },
    {
      title: '被举报人',
      dataIndex: 'personnel',
      key: 'personnel',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '举报原因',
      dataIndex: 'isMonitor',
      key: 'isMonitor',
      slots: { customRender: '' },
      ellipsis: 'true',
      width: '120px',
      align: 'center',
    },
    {
      title: '举报人',
      dataIndex: 'editor',
      key: 'editor',
      slots: { customRender: '' },
      align: 'center',
    },
    ,
    {
      title: '举报时间',
      dataIndex: 'lastTime',
      key: 'lastTime',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'createTime',
      key: 'createTime',
      slots: { customRender: 'state' },
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
    components: { Table, VoPagination, ReportSwitch },
    setup() {
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
      const changeItem = (record) => {
        console.log(record)
      }
      //【以上是问题抽屉】
      const data = reactive([
        {
          id: '1',
          key: 4,
          category: '1000001',
          move: '测试-4',
          addChildCategory:
            '上课就发绿卡就是的开发.sss我十三时时彩是多少是的撒所所多撒洒水多撒撒达成',
          mobileTime: '启用',
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
          isMonitor: '不公平不公正...',
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
      return {
        radioValue,
        paginations,
        paginationChange,
        deleteItem,
        data,
        columns,
        //操作
        changeItem,
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
