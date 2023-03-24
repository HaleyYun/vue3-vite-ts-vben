<template>
  <div style="background-color: white">
    <VideoSwitch change-space="special">
      <template #tableEdit> </template>
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
            <div class="action-space" @click="changeItem(record)">
              <div class="space-span">
                <IconFont style="font-size: 24px; margin-right: 10px" type="icon-icon_video" /><div
                  >标题:[共创项目]</div
                ><div class="space-content">123456778955555555555555555555555555</div></div
              >
            </div>
          </template>
          <template #state="{ record }">
            <p v-if="record.isState == '1'">待审核</p>
            <p v-else-if="record.isState == '2'">未通过</p>
            <p v-else-if="record.isState == '3'">已通过</p>
          </template>
          <template #operation="{ record }">
            <a-button type="link" class="submit-btn" @click="changeItem(record)">查看详情</a-button>
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
    </VideoSwitch>
  </div>
</template>

<script lang="ts">
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_d3ckyhca86k.js',
  })
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import VideoSwitch from './VideoSwitch.vue'

  const columns = [
    {
      title: '记录ID',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '视频内容',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: 'move' },
      align: 'center',
      width: '280px',
    },

    {
      title: '栏目',
      dataIndex: 'editor',
      key: 'editor',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '作者',
      dataIndex: 'personnel',
      key: 'personnel',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '提交时间',
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
      width: '280px',
    },
  ]
  export default defineComponent({
    components: { Table, VoPagination, VideoSwitch, IconFont },
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
          editor: '人力资源',
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
  .action-space {
    .space-span {
      display: flex;
      justify-content: flex-start;
      .space-content {
        width: 100px;
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本溢出时显示省略标记*/
        -webkit-line-clamp: 3; /*文本占的行数,如果要设置2行加...则设置为2*/
        -webkit-box-orient: vertical; /*子代元素垂直显示*/
        white-space: nowrap;
      }
    }
  }
</style>
