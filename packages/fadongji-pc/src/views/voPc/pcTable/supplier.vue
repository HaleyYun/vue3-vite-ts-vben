<template>
  <div style="padding: 20px">
    <div class="bgBox">
      <p class="strip">共有{{ 17 }}条数据</p>
      <Button class="sort">新增供货商</Button>
      <Button class="sort">数据导出</Button>
      <Button class="sort">排序方式</Button>
    </div>

    <Table
      :dataSource="dataSource"
      :columns="columns"
      :row-selection="rowSelection"
      :pagination="paginationProps"
      bordered
    >
      <template #action>
        <span>
          <Button type="link" style="color: #25b97e">查看</Button>
          <Button type="link" style="color: #25b97e">编辑</Button>
          <Button type="link" style="color: #25b97e">删除</Button>
        </span>
        <p>
          <Button type="link" style="color: #25b97e">员工管理</Button>
        </p>
      </template>

      <template #enable="text">
        <span>
          <a-switch
            checked-children="开"
            un-checked-children="关"
            v-model:checked="text.record.Enable"
          />
        </span>
      </template>
    </Table>
    <!-- //------------------------------- -->
    <!-- <p>{{ dataSource.length }}</p> -->
    <!-- <a-pagination
	  style="margin-top: 50px; text-align: center"
	  size="small"
	  :total="dataSource.length"
	  v-model:current="cunt"
	  :page-size="7"
	  show-size-changer
	  show-quick-jumper
	/> -->
  </div>
</template>

<script lang="ts">
  // import { reqTradeMarkList } from '/@/api/supplier/supplierList'
  import { defineComponent, ref, computed, unref, onMounted, toRefs, reactive } from 'vue'
  import { Button, Table } from 'ant-design-vue'

  export default defineComponent({
    components: { Button, Table },
    setup() {
      const selectedRowKeys = ref([]) // Check here to configure the default column
      const onSelectChange = (changableRowKeys) => {
        // console.log('selectedRowKeys changed: ', changableRowKeys)
        selectedRowKeys.value = changableRowKeys
      }
      const cunt = ref(3)
      const rowSelection = computed(() => {
        return {
          selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
        }
      })
      const state = reactive({
        dataSource: [
          {
            key: '1',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'false',
          },
          {
            key: '2',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'false',
          },
          {
            key: '3',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'false',
          },
          {
            key: '4',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'false',
          },
          {
            key: '5',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '6',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '7',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '8',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '9',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件  13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '10',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '11',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件  13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '12',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件  13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '13',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '14',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '15',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '16',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件 13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
          {
            key: '17',
            supplierID: '8447466',
            information: ' 上海左班汽车零部件13200000000',
            region: '河南省-郑州市-金水区',
            Grade: 'Lv3',
            operation: '张三',
            agent: '10',
            register: '2021-09-12 12:00:00',
            certification: '未认证',
            Enable: 'true',
          },
        ],
      })
      onMounted(() => {
        // console.log('mounted in the api!')
        // userInfo().then((res) => {
        //   console.log(res, '1111')
        // })totals
      })

      function clickFn(res) {
        // console.log(res, '1111')
      }

      const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: () => `共${17}条`,
        pageSize: 5,
        current: 3,
        total: 3,
        position: 'bottom',
        defaultPageSize: 5,
        pageSizeOptions: [3, 5, 10],
        style: 'margin-top: 50px; text-align: center',
      }
      return {
        paginationProps,
        clickFn,
        ...toRefs(state),
        selectedRowKeys,
        rowSelection,
        cunt,

        columns: [
          {
            align: 'center',
            title: '供应商ID',
            dataIndex: 'supplierID',
            key: '1',
          },
          {
            align: 'center',
            title: '供应商信息',
            dataIndex: 'information',
            key: '2',
          },
          {
            align: 'center',
            title: '所属地区',
            dataIndex: 'region',
            key: '3',
          },
          {
            align: 'center',
            title: '等级',
            dataIndex: 'Grade',
            key: '4',
          },
          {
            align: 'center',
            title: '产品运营',
            dataIndex: 'operation',
            key: '5',
          },
          {
            align: 'center',
            title: '关联代理商',
            dataIndex: 'agent',
            key: '6',
          },
          {
            align: 'center',
            title: '注册时间',
            dataIndex: 'register',
            key: '7',
          },
          {
            align: 'center',
            title: '注册认证状态',
            dataIndex: 'certification',
            key: '8',
          },
          {
            align: 'center',
            title: '启用状态',
            dataIndex: 'Enable',
            key: '9',
            slots: { customRender: 'enable' },
          },
          {
            align: 'center',
            title: '操作',
            key: '10',
            width: '20%',
            slots: { customRender: 'action' },
          },
        ],
      }
    },
  })
</script>

<style lang="less" scoped>
  .bgBox {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #e6e6e6;
    justify-content: space-between;
    align-items: center;

    .strip {
      flex-grow: 1;
      margin-left: 40px;
      margin-top: 15px;
      align-items: center;
      line-height: 50px;
      font-size: 14px;
    }

    .sort {
      margin: auto 40px;
    }
  }
</style>
