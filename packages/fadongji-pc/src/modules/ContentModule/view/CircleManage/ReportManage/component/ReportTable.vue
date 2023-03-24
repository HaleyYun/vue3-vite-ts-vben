<template>
  <div style="background-color: white">
    <ReportSwitch change-space="special">
      <template #tableEdit>
        <a-button type="primary" class="submit-btn">新增栏目</a-button>
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
            <a-button type="link" class="submit-btn" @click="checkDetails(record)"
              >查看详情</a-button
            >
            <a-button type="link" class="submit-btn" @click="changeItem(record)">审核通过</a-button>
            <a-button type="link" class="submit-btn" @click="checkReject(record)">驳回</a-button>
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
  <a-modal
    v-model:visible="rejectedVisible"
    title="驳回原因"
    centered
    @ok="rejectedVisible = false"
  >
    <div style="padding: 20px">
      <a-form>
        <a-textarea
          :rows="10"
          :maxlength="500"
          placeholder="请输入审核驳回原因，该原因会通知给原作者"
        />
      </a-form>
    </div>
  </a-modal>
  <!--  审核通过-->
  <Modal
    v-model:visible="accessCheckVisible"
    title="审核通过"
    centered
    @ok="accessCheckVisible = false"
  >
    <div style="padding: 20px">
      <a-form>
        <a-textarea
          :rows="10"
          :maxlength="500"
          placeholder="请输入审核通过原因，该原因会通知给原作者"
        />
      </a-form>
    </div>
  </Modal>
  <!--   查看详情 -->
  <ContentDrawer
    :close-btn="false"
    :visible="checkDetailsVisible"
    title="查看详情"
    @check-details="checkDetails()"
  >
    <template #confirmBtn>
      <Popconfirm
        title="该操作将允许该问题在信息流中展示，确定操作吗？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="checkDetailsVisible = false"
        @cancel="checkDetailsVisible = false"
      >
        <a-button type="primary">确定</a-button>
      </Popconfirm>
    </template>
    <template #default>
      <ThinkAlertDetail />
    </template>
  </ContentDrawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table, Popconfirm, Modal } from 'ant-design-vue'
  import ReportSwitch from './ReportSwitch.vue'
  // 抽屉效果公共类
  import ContentDrawer from '/@/modules/ContentModule/view/CircleManage/ReportManage/component/ContentDrawer.vue'
  import ThinkAlertDetail from '/@/modules/ContentModule/view/ThinkManager/conponents/ThinkAlertDetail.vue'

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
      width: '280px',
    },
  ]
  export default defineComponent({
    components: {
      Table,
      VoPagination,
      ReportSwitch,
      Popconfirm,
      Modal,
      ContentDrawer,
      ThinkAlertDetail,
    },
    setup() {
      // 查看详情，点击页面退出弹框的触发boolean标识
      const checkDetailsVisible = ref<boolean>(false)

      // 驳回
      const rejectedVisible = ref(false)
      // 审核通过 -- 弹出弹框
      const accessCheckVisible = ref(false)
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
      // 查看详情
      const checkDetails = () => {
        checkDetailsVisible.value = true
      }
      // 驳回原因
      const checkReject = () => {
        rejectedVisible.value = true
      }
      //操作
      const changeItem = (record) => {
        accessCheckVisible.value = true
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
        rejectedVisible,
        accessCheckVisible,
        checkDetailsVisible,
        data,
        columns,
        checkReject,
        checkDetails,
        paginationChange,
        deleteItem,
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
