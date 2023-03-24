<template>
  <div class="bg-white m-24px p-24px">
    <EraTableTitle :total="paginations.total">
      <template #tableEdit>
        <span class="text-gray-700">
          小贴示：一级分类不启用时，操作其下二级分类的开关无法生效。
        </span>
      </template>
    </EraTableTitle>
    <div>
      <Table
        @refresh-father="searchKey"
        class="table-space"
        :columns="columns"
        :data-source="goodsKeyWordList"
        :row-key="(record) => record.categoryId"
        size="small"
        :pagination="false"
        bordered
      >
        <template #action="{ record }">
          <!-- {{ JSON.stringify(record) }} -->

          <a-switch
            @change="openEnable(record)"
            :checked="record.isEnable"
            checked-children="是"
            un-checked-children="否"
          />
        </template>
        <!--parentId: "148356971714707456"-->
        <template #sign="{ record: { isLeaf, keyWordList }, record }">
          <div v-if="record.parentId !== '0'">
            <VoTag
              :tag-data="keyWordList"
              :maxLength="50"
              :current-item="record"
              @refreshFather="searchKey"
            />
          </div>
        </template>
      </Table>
    </div>
    <div class="flex justify-end py-15px bg-white">
      <VoPagination
        :total="paginations.total"
        :current="paginations.current"
        :page-size="paginations.pageSize"
        @pagination="paginationChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { TreeSelect, TreeSelectProps } from 'ant-design-vue'
  import { defineComponent, reactive, ref } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table, Switch, Button } from 'ant-design-vue'
  import VoTag from '/@/components/VoTag/VoTag.vue'
  // table slot
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { filterCommitForm } from '/@/modules/GoodsModule/GoodsConfigation/GoodsCommitKey/data/GoodsCommitKeyData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()

  const { SHOW_CHILD } = TreeSelect
  const columns = [
    {
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '40%',
      slots: { customRender: '' },
    },
    {
      title: '评价关键词',
      dataIndex: 'keyWordList',
      key: 'keyWordList',
      width: '50%',
      slots: { customRender: 'sign' },
    },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      key: 'isEnable',
      slots: { customRender: 'action' },
    },
  ]

  interface DataItem {
    key: number
    ruleProperties: string
    keyWords: number
    forbidden: Boolean
    children?: DataItem[]
  }

  // 参数模型
  let paramModel = ref({ categoryId: [] })
  const [registerForm] = useForm({
    labelWidth: 120,
    schemas: filterCommitForm,
  })
  const goodsKeyWordList = ref([])
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
      console.log(selected, selectedRows, changeRows)
    },
  })
  const treeData = ref<TreeSelectProps[]>([])
  export default defineComponent({
    name: 'CommitKey',
    components: {
      Table,
      Switch,
      VoTag,
      VoPagination,
      EraTableTitle,
      Button,
      BasicForm,
      TreeSelect,
    },
    setup() {
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        searchKey()
      }
      const paginations = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const searchKey = () => {
        let categoryId = []
        if (paramModel.value.categoryId.length > 0) {
          categoryId = paramModel.value.categoryId
        } else {
          categoryId = []
        }
        const map = {
          categoryId: categoryId,
          pageNo: paginations.current,
          pageSize: paginations.pageSize,
          orderProperty: 'sort',
          orderType: 'ASC',
        }
        AdminHttp.goodsKeywordList(map)
          .then((res) => {
            goodsKeyWordList.value = res.data.records
            console.log(goodsKeyWordList, '关键词列表')
            paginations.total = res.data.total
          })
          .catch((error) => {
            console.log('error===', error)
          })
      }
      const openEnable = (record) => {
        // 一级分类和二级分类分开独立控制，若一级分类被关闭，则所有二级被可操作但不生效。
        const changeSwitchMap = {
          idList: [record.categoryId],
          isEnable: !record.isEnable,
        }
        AdminHttp.goodsKeywordStatusUpdate(changeSwitchMap)
          .then((res) => {
            searchKey()
          })
          .catch((error) => {
            console.log('error===', error)
          })
        searchKey()
      }
      const contentCategoryContentEvent = async () => {
        const map = { name: '' }
        const { data } = await adminHttp.goodsCategoryCategorySelect(map)
        treeData.value = []
        treeData.value = data.map((item) => {
          item.disabled = true
          if (item.children) {
            item.children.map((innerItem) => {
              innerItem.disabled = false
            })
          }
          return item
        })

        // hierarchy
      }
      const filterCommitEvent = (item) => {
        paramModel.value.categoryId = item.categoryId
        searchKey()
      }
      // 查询关键词
      const searchKeyword = () => {}
      contentCategoryContentEvent()
      searchKey()
      return {
        treeData,
        goodsKeyWordList,
        columns,
        rowSelection,
        paginations,
        paramModel,
        SHOW_CHILD,
        contentCategoryContentEvent,
        filterCommitEvent,
        registerForm,
        openEnable,
        paginationChange,
        searchKeyword,
        searchKey,
      }
    },
  })
</script>
<style scoped lang="less">
  .commit-key__box {
    margin: 0 15px;
  }

  .table-list {
    padding-top: 10px;

    .table-list-title {
      display: flex;
      padding: 0 15px;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
  }

  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }
</style>
