<template>
  <div>
    <div v-if="false" class="padding-t-10 padding-r-10 filter-bg">
    <BasicForm
      v-if="false"
      ref="opForm"
      @register="register"
      @submit="handlerFilterSubmit"
      @reset="handlerFilterRest"
    >
      <template #categorySlot="{ model, field }">
        <TreeSelect
          v-model:value="model[field]"
          style="width: 100%"
          :field-names="{ label: 'categoryName', value: 'categoryId' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择商品类别"
          allow-clear
          multiple
          :showCheckedStrategy="SHOW_CHILD"
          tree-default-expand-all
          :tree-data="goodsKeyWordList"
        />
      </template>
    </BasicForm>
  </div>
  <div class="m-24px p-24px bg-white">
    <EraTableTitle :total="total">
      <template #tableEdit>
        <Button v-if="false" type="primary" size="small" @click="searchKeyword" />
        <div class="text-gray-600">
          小贴示：产品类型是打在商品标题上的标签。一级分类的不启用时，操作其下二级分类的开关，无法生效。
        </div>
      </template>
    </EraTableTitle>

    <div>
      <Table
        :row-key="(record) => record.categoryId"
        :row-selection="rowSelection"
        @refresh-father="searchKey"
        class="table-space"
        :columns="columns"
        :data-source="goodsKeyWordList"
        size="small"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'productType'">
            <div v-if="record.parentId !== '0'">
              <ParamGoodsTags
                :pattern="false"
                v-if="!record.parentId !== 0 && !getDisabled(record)"
                :tag-data="record.prodTypeList || []"
                :current-item="record"
                @refreshFather="searchKey"
              />
            </div>
          </template>
          <template v-if="column.dataIndex === 'isEnable'">
            <Switch
              :disabled="getDisabled(record)"
              @change="openEnable(record)"
              :checked="record.isEnable"
              checked-children="开"
              un-checked-children="关"
            />
          </template>
        </template>
      </Table>
    </div>
    <div class="flex justify-end py-15px bg-white">
      <VoPagination
        :total="total"
        :current="pageQuery.pageNo"
        :page-size="pageQuery.pageSize"
        @pagination="paginationChange"
      />
    </div>
  </div>
  </div>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form'
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table, Switch, Button, TreeSelectProps } from 'ant-design-vue'
  import { TreeSelect } from 'ant-design-vue'
  import ParamGoodsTags from '/@/modules/GoodsModule/GoodsConfigation/ParameterGoodsType/components/ParamGoodsTags.vue'

  const { SHOW_CHILD } = TreeSelect
  // table slot
  // 商品类型 筛选项
  import { filterParamGoodsTypeForm } from '/@/modules/GoodsModule/GoodsConfigation/ParameterGoodsType/ParamGoodsTypeData/ParamGoodsTypeData'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { usePermission } from '/@/hooks/web/usePermission'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { hasPermission } = usePermission() // 判断有没有权限
  const { createMessage } = useMessage()

  const columns = [
    {
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '400px',
      slots: { customRender: '' },
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      width: '500px',
    },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
    },
  ]

  const childColumns = [
    {
      title: '分类',
      dataIndex: 'prodTypeList',
      key: 'prodTypeList',
      width: '40%',
      slots: { customRender: '' },
    },
    {
      title: '产品类型',
      dataIndex: 'prodTypeList',
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

  export default defineComponent({
    name: 'ParamGoodsType',
    components: {
      Table,
      Switch,
      ParamGoodsTags,
      VoPagination,
      Button,
      BasicForm,
      TreeSelect,
      EraTableTitle,
    },
    setup() {
      const total = ref(0)
      const pageQuery = reactive({
        pageNo: 1,
        pageSize: 10,
      })
      const [register] = useForm({
        labelWidth: 120,
        schemas: filterParamGoodsTypeForm,
      })
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        pageQuery.pageNo = current
        pageQuery.pageSize = pageSize
        loadData()
      }

      const getDisabled = (record) => {
        if (+record.parentId !== 0) {
          const parentObj = goodsKeyWordList.value.find(
            (item) => item.categoryId === record.parentId,
          )
          console.log(parentObj)
          return !parentObj.isEnable
        } else {
          return false
        }
      }

      const treeData = ref<TreeSelectProps['treeData']>([])
      const openEnable = (record) => {
        if (!hasPermission('/v1/goods/type/status/update')) {
          createMessage.error('暂无该操作权限！')
          return
        }
        const changeSwitchMap = {
          idList: [record.categoryId],
          isEnable: !record.isEnable,
        }
        AdminHttp.goodsTypeStatusUpdate(changeSwitchMap)
          .then((res) => {
            // loadData()
            record.isEnable = !record.isEnable
          })
          .catch((error) => {
            console.log('error===', error)
          })
      }
      const handlerFilterRest = () => {}
      const handlerFilterSubmit = (values) => {
        console.log(values)
        loadData(values)
      }

      const loadData = (queryForm = null) => {
        const queryFormObj = {
          categoryIdList: queryForm ? queryForm['categoryId'] : [],
          orderProperty: 'sort',
          orderType: 'ASC',
        }
        adminHttp.goodsTypeStatusList({ ...pageQuery, ...queryFormObj }).then((res) => {
          goodsKeyWordList.value = res.data.records
          total.value = res.data.total
        })
      }
      const searchKey = () => {
        loadData()
      }

      // 查询关键词
      const searchKeyword = () => {}
      onMountedOrActivated(() => {
        // searchKey()
        loadData()
      })
      return {
        getDisabled,
        total,
        pageQuery,
        register,
        openEnable,
        paginationChange,
        searchKeyword,
        searchKey,
        handlerFilterRest,
        handlerFilterSubmit,
        treeData,
        SHOW_CHILD,
        goodsKeyWordList,
        columns,
        childColumns,
        rowSelection,
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

  .filter-bg {
    background-color: white;
  }
</style>
