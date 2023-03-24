<template>
  <div style="background-color: white">
    <EraSwitch>
      <template #tableEdit>
        <a-button type="primary" class="submit-add" @click="AddSupply()">新增供应商</a-button>
        <a-button type="primary" class="submit-add" @click="AddSupply()">数据导出</a-button>
      </template>
      <template #content>
        <Table
          :columns="columns"
          :row-selection="rowSelection"
          :data-source="data"
          :pagination="false"
          :row-key="(record) => record.id"
          size="small"
          :scroll="{ x: 'calc(700px + 50%)', y: 650 }"
          bordered
        >
          <template #supName="{ record }">
            <span>{{ record.category }}</span>
            <span>
              <a-button class="submit-add" type="link" @click="seeInvitation(record)" size="small"
                >查看邀请码</a-button
              ></span
            >
          </template>
          <template #store="{ record }">
            <span>{{ record.mobilePhone }}</span>

            <span>
              <a-button class="submit-add" type="link" @click="showModal(record)" size="small"
                >编辑</a-button
              >
            </span></template
          >
          <template #certification="{ record }">
            <p v-if="record.isShow">未认证</p> <p v-else>认证中</p></template
          >
          <template #parent="{ record }">
            <a-switch
              v-model:checked="record.isShow"
              checked-children="开"
              un-checked-children="关"
            />
          </template>
          <template #operation>
            <a-button type="link" class="submit-details" @click="audit">详情</a-button>
            <a-button type="link" class="submit-details" @click="rejected">加入黑名单</a-button>
            <a-button type="link" class="submit-details" @click="rejected">审核</a-button>
            <a-button type="link" class="submit-details" @click="rejected">解除角色</a-button>
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
    </EraSwitch>
  </div>
  <a-modal
    v-model:visible="modal2Visible"
    title="江陵动力禹州的邀请码"
    centered
    @ok="modal2Visible = false"
  >
    <div style="padding: 20px">
      <div style="width: 160px; height: 160px">
        <img src="../../../../../assets/images/assets.png" alt="" />
      </div>
    </div>
  </a-modal>
  <a-modal v-model:visible="editor" centered title="更改主体状态" @ok="handleOk">
    <div style="padding: 20px">
      <a-checkbox-group v-model:value="check" style="width: 100%">
        <a-row>
          <a-col :span="12">
            <a-checkbox value="A">逾期</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="B">禁言</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="C">禁止共创</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="D">禁止直播</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
  </a-modal>
  <a-modal v-model:visible="blacklist" centered title="加入黑名单" @ok="handleOk">
    <div style="padding: 20px"> <p>确定要加入黑名单吗？</p></div>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, unref } from 'vue'
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import EraSwitch from './EraSwitch.vue'
  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'category',
      key: 'category',
      slots: { customRender: 'supName' },
      align: 'center',
      width: '250px',
    },
    {
      title: '手机号',
      dataIndex: 'move',
      key: 'move',
      slots: { customRender: '' },
      align: 'center',
    },
    {
      title: '所在地区',
      dataIndex: 'addChildCategory',
      key: 'addChildCategory',
      slots: { customRender: '' },
      align: 'center',
      width: '160px',
    },
    {
      title: '店铺状态',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      slots: { customRender: 'store' },
      align: 'center',
    },
    {
      title: '认证状态',
      dataIndex: 'isMonitor',
      key: 'isMonitor',
      slots: { customRender: 'certification' },
      align: 'center',
    },
    {
      title: '店铺名称',
      dataIndex: 'isState',
      key: 'isState',
      slots: { customRender: '' },
      align: 'center',
      width: '180px',
    },
    {
      title: '渠道经理',
      dataIndex: 'personnel',
      key: 'personnel',
      slots: { customRender: '' },
      align: 'center',
    },
    // {
    //   title: '等级',
    //   dataIndex: 'isparent',
    //   key: 'isparent',
    //   slots: { customRender: '' },
    //   align: 'center',
    // },
    {
      title: '注册时间',
      dataIndex: 'person',
      key: 'person',
      slots: { customRender: '' },
      align: 'center',
      // width: '180px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '200px',
      slots: { customRender: 'operation' },
      align: 'center',
      fixed: 'right',
    },
  ]
  interface DataType {
    key: string | number
    name: string
    age: number
    address: string
  }
  export default defineComponent({
    components: { EraSwitch, Table, VoPagination },
    setup() {
      const AddSupply = () => {
        go(PageEnum.SUP_ADD)
      }
      const seeInvitation = (record) => {
        console.log(record, '111')
        modal2Visible.value = true
      }
      const go = useGo()
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

      const audit = () => {
        go(PageEnum.SUP_DETAILS)
      }
      const rowSelection = computed(() => {
        return {
          selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
              key: 'odd',
              text: 'Select Odd Row',
              onSelect: (changableRowKeys) => {
                let newSelectedRowKeys = []
                newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
                  if (index % 2 !== 0) {
                    return false
                  }
                  return true
                })
                selectedRowKeys.value = newSelectedRowKeys
              },
            },
            {
              key: 'even',
              text: 'Select Even Row',
              onSelect: (changableRowKeys) => {
                let newSelectedRowKeys = []
                newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
                  if (index % 2 !== 0) {
                    return true
                  }
                  return false
                })
                selectedRowKeys.value = newSelectedRowKeys
              },
            },
          ],
        }
      })
      const modal2Visible = ref<boolean>(false)
      //【以下是编辑】
      const editor = ref<boolean>(false)
      const showModal = (record) => {
        console.log(record)
        editor.value = true
      }

      const handleOk = (e: MouseEvent) => {
        console.log(e)
        editor.value = false
      }
      //【黑名单】
      const blacklist = ref<boolean>(false)
      const rejected = (record) => {
        console.log(record)

        blacklist.value = true
      }

      const data = reactive([
        {
          id: '1',
          key: 4,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: true,
        },
        {
          id: '2',
          key: 4,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: true,
        },
        {
          id: '3',
          key: 4,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: true,
        },
        {
          id: '5',
          key: 5,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          personnel: '张三',
          operation: '操作',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '6',
          key: 6,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '7',
          key: 7,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '8',
          key: 8,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '9',
          key: 9,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '10',
          key: 10,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '11',
          key: 11,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
        {
          id: '12',
          key: 12,
          category: '用户133****1234',
          move: '13333331234',
          addChildCategory: '河南省-郑州市-金水区',
          mobilePhone: '正常',
          isMonitor: '江陵动力禹州工厂店',
          operation: '操作',
          personnel: '张三',
          isState: '江陵动力禹州工厂店',
          isparent: 'LV3',
          person: '2022.10.01 22:22:00',
          isShow: false,
        },
      ])
      const selectedRowKeys = ref<DataType['key'][]>([]) // Check here to configure the default column

      const onSelectChange = (changableRowKeys: string[]) => {
        console.log('selectedRowKeys changed: ', changableRowKeys)
        selectedRowKeys.value = changableRowKeys
      }
      const check = ref([])
      return {
        blacklist,
        check,
        editor,
        handleOk,
        showModal,
        seeInvitation,
        AddSupply,
        rowSelection,
        rejected,
        modal2Visible,
        audit,
        paginations,
        paginationChange,
        data,
        columns,
      }
    },
  })
</script>

<style lang="less" scoped>
  .submit-add {
    margin-left: 10px;
  }
  .submit-details {
    width: 80px;
  }
</style>
