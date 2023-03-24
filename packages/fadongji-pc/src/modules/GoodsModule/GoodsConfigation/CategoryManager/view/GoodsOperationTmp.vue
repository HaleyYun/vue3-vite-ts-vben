<template>
  <div>
    <div class="commit-key__box">
    <div class="table-list">
      <div class="form-list-choice">
        <Button :disabled="!hasSelected" class="table-operations__button" @click="allDelete()"
          >批量删除
        </Button>
        <Button class="table-operations__button" @click="expandTable()">全部展开</Button>
        <Button @click="allClose()">全部收起</Button>
      </div>
    </div>
  </div>

  <div style="background-color: white">
    <EraSwitchTable change-space="special">
      <template #content>
        <ATable
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :expandRowByClick="true"
          :row-key="(record) => record.id"
          size="small"
          @expand="onExpand"
          bordered
          :row-selection="rowSelection"
          :expandedRowKeys="defaultExpandedRowKeys"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>

            <template v-if="column.dataIndex === 'move'">
              <VerticalAlignTopOutlined class="action-space" @click="topOrder(record)" />
              <ArrowUpOutlined class="action-space" @click="upOrder(record)" />
              <ArrowDownOutlined class="action-space" @click="downOrder(record)" />
              <VerticalAlignBottomOutlined class="action-space" @click="bottomOrder(record)" />
            </template>

            <template v-if="column.dataIndex === 'addChildCategory'">
              <a>添加子组件</a>
            </template>
            <template v-if="column.dataIndex === 'isMonitor'">
              <Switch
                v-model:checked="record.forbidden"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="column.dataIndex === 'linkGoodsCategory'">
              <template v-for="innerItem of record.linkGoodsCategory" :key="innerItem.id">
                <a class="action-space">{{ innerItem.categoryName }}</a>
              </template>
            </template>

            <template v-if="column.dataIndex === 'operation'">
              <a class="action-space" @click="changeItem(record)">修改</a>
              <Popconfirm
                title="确认要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="deleteItem(record)"
              >
                <a>删除</a>
              </Popconfirm>
            </template>
          </template>

          <template #expandedRowRender="{ column, text, record }">
            <ATable
              :columns="childColumns"
              :pagination="false"
              :row-key="(record) => record.id"
              :row-selection="rowSelection"
              size="small"
              bordered
              :expandRowByClick="true"
            />
          </template>
        </ATable>
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

  <EraColumnForm :title="modalTitle" :data="modelData" ref="editColumnForm">
    <template #content="{ row }">
      <template v-if="VoUtils.hasOwn(row, 'isSelect')">
        <Cascader
          v-model:value="value"
          style="width: 100%"
          multiple
          max-tag-count="responsive"
          :options="options"
          placeholder="请选择关联商品"
        />
      </template>
    </template>
  </EraColumnForm>
  </div>
</template>
<script lang="ts">
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import { defineComponent, reactive, ref, computed, unref } from 'vue'
  // import { VoUtils } from '@vocen/shared'
  import { VoUtils } from '../../../../../../../shared/src/index'
  import { Cascader } from 'ant-design-vue'
  import {
    opFormColumns,
    secondaryClassification,
    options,
  } from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/data/opFormTmpls'
  // 封装流水Form
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import { Table, Switch, Button, Popconfirm } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'

  const columns = [
    {
      title: '分类',
      dataIndex: 'name',
    },
    {
      title: '移动',
      dataIndex: 'move',
    },
    {
      title: '添加子分类',
      dataIndex: 'addChildCategory',
    },
    {
      title: '关联商品类别',
      dataIndex: 'linkGoodsCategory',
    },
    {
      title: '禁用',
      dataIndex: 'isMonitor',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]

  interface DataItem {
    name: string
    id: number
  }

  export default defineComponent({
    name: 'GoodsOperationTble',
    components: {
      Table,
      Switch,
      Button,
      Popconfirm,
      EraColumnForm,
      Cascader,
      VoPagination,
      VerticalAlignTopOutlined,
      ArrowUpOutlined,
      ArrowDownOutlined,
      VerticalAlignBottomOutlined,
      EraSwitchTable,
    },
    setup() {
      const defaultExpandedRowKeys = ref([])
      const childColumns = [
        {
          title: '分类',
          dataIndex: 'name',
        },
        {
          title: '移动',
          dataIndex: 'move',
        },
        {
          title: '添加子分类',
          dataIndex: 'addChildCategory',
        },
        {
          title: '禁用',
          dataIndex: 'isMonitor',
        },
        {
          title: '操作',
          dataIndex: 'operation',
        },
      ]
      let editColumnForm = ref()
      let modelData = ref()
      // model 标题
      const modalTitle = ref('')
      let expandedRowKeys = ref<string[]>([])
      const radioBtn = ref<string>('a')
      const selectedRowKeys = ref([])
      const topOrder = (item) => {
        alert('置顶===' + item)
      }
      const upOrder = (item) => {
        alert('up===' + item)
      }
      const downOrder = (item) => {
        alert('down===' + item)
      }
      const bottomOrder = (item) => {
        alert('置底===' + item)
      }
      const paginations = reactive({
        total: 158,
        current: 1,
        pageSize: 20,
      })
      // 分页“效果”
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        initGoodsCategoryOperateData()
      }
      // 批量删除
      const allDelete = () => {}
      const hasSelected = computed(() => selectedRowKeys.value.length > 0)
      const onSelectChange = (changeableRowKeys) => {
        console.log('selectedRowKeys changed: ', changeableRowKeys)
        selectedRowKeys.value = changeableRowKeys
      }
      const rowSelection = computed(() => {
        return {
          selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
        }
      })
      const allClose = () => {
        expandedRowKeys.value = []
      }
      const expandTable = () => {
        expandedRowKeys.value = []
        for (let item of tableData) {
          let itemId = item.id
          expandedRowKeys.value.push(itemId)
        }
      }
      // 单项“修改”
      const changeItem = (item) => {
        editColumnForm.value.isOpenAlertShow()
        if (item.isparent === true) {
          modalTitle.value = '编辑分类'
          modelData.value = opFormColumns
        } else {
          modalTitle.value = '编辑二级分类'
          modelData.value = secondaryClassification
        }
      }

      const tableData = ref([])
      const deleteItem = (item) => {
        alert('删除===' + item)
      }

      const initGoodsCategoryOperateData = async () => {
        try {
          const map = {
            orderProperty: 'sort',
            orderType: 'sec',
            pageNo: paginations.current,
            pageSize: paginations.pageSize,
          }
          const { data } = await AdminHttp.goodsCategoryOperateList(map)

          tableData.value = data.records
          paginations.total = data.total
        } catch (err) {
          console.log(err)
        } finally {
        }
      }
      const getChildListEvent = async (item) => {
        // http://10.0.2.42:11122/mock/49/goods/category/operate/second/category
        const { code, data } = await AdminHttp.goodsCategoryOperateSelectSecondCategory({
          id: item.id,
        })
        if (code == '20001') {
        }
      }
      const onExpand = (expanded, record) => {
        if (expanded === true) {
          getChildListEvent(record)
          // 设置展开窗Key
          defaultExpandedRowKeys.value.push(record.id)
        } else if (expanded === false) {
          if (defaultExpandedRowKeys.value.length) {
            defaultExpandedRowKeys.value = defaultExpandedRowKeys.value.filter((v) => {
              return v != record.id
            })
          }
        } else {
          data.filter((item) => {
            if (!defaultExpandedRowKeys.value.includes(item.id)) {
              defaultExpandedRowKeys.value.push(item.id)
            }
          })
        }
      }
      initGoodsCategoryOperateData()
      return {
        tableData,
        columns,
        rowSelection,
        paginations,
        radioBtn,
        hasSelected,
        expandedRowKeys,
        childColumns,
        opFormColumns,
        secondaryClassification,
        options,
        value: ref<string[]>([]),
        defaultExpandedRowKeys,
        editColumnForm,
        modalTitle,
        modelData,
        VoUtils,
        onExpand,
        paginationChange,
        changeItem,
        topOrder,
        upOrder,
        downOrder,
        bottomOrder,
        allDelete,
        expandTable,
        deleteItem,
        allClose,
        initGoodsCategoryOperateData,
      }
    },
  })
</script>
<style scoped lang="less">
  .commit-key__box {
    //margin: 0 15px;
  }

  .table-list {
    .table-list-title {
      display: flex;
      padding: 0 10px;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
  }

  .action-space {
    margin-right: 10px;
  }

  .form-list-choice {
    padding: 10px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;

    .choice-btnItem {
      margin-right: 10px;

      .choice-content {
        color: #ff1a20;
      }

      &.ant-radio-button-wrapper-checked:hover {
        color: #fff !important;

        .choice-content {
          color: #fff !important;
        }
      }

      :hover .choice-content {
        color: #0960bd !important;
      }
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      z-index: 1;
      color: #fff;
      background: #0960bd;

      .choice-content {
        color: #fff;
      }
    }
  }

  .table-operations__button {
    margin-right: 8px;
  }

  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }
</style>
