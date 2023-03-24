<template>
  <div>
    <div class="commit-key__box comp-wrap">
    <div class="table-list">
      <div class="form-list-choice flex items-center">
        <ComponentCategoryManager
          :disabled="!hasSelected"
          @props-create="taggleOpFormDialog(false)"
          @expand="onExpand()"
          @close="alltablecollaps"
          @batch="batchDelete()"
        />
        <div class="pt-10px mb-10px text-right flex-1">
          <span class="ant-system__red">
            小贴示：类别只有在启用状态，才可以使用。若父级类别被禁用，其下方所有子级类别都无法使用
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="px-10px bg-white mt-10px">
    <ATable
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      row-key="id"
      :row-selection="rowSelection"
      @expand="onExpand"
      :expandedRowKeys="defaultExpandedRowKeys"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'move'">
          <template v-if="isShowOutMove === true">
            <ArrowUpOutlined
              v-if="hasShowUp !== record.id"
              class="margin-r-10"
              @click="ArrowUpOutlinedEvent(record)"
            />
            <ArrowDownOutlined
              v-if="hasShowDown !== record.id"
              class="margin-r-10"
              @click="ArrowDownOutlinedEvent(record)"
            />
            <VerticalAlignTopOutlined
              v-if="hasShowUp !== record.id"
              class="margin-r-10"
              @click="VerticalAlignTopOutEvent(record)"
            />
            <VerticalAlignBottomOutlined
              v-if="hasShowDown !== record.id"
              @click="VerticalAlignBottomOutEvent(record)"
            />
          </template>
          <template v-else>
            <span>----</span>
          </template>
        </template>
        <template v-if="column.dataIndex === 'addChildCategory' && record.hierarchy === 1">
          <a @click="editSecondaryCategoryName(record)">添加子分类</a>
        </template>
        <template v-if="column.dataIndex === 'isEnable'">
          <Switch
            v-model:checked="record.isEnable"
            checked-children="开"
            un-checked-children="关"
            @change="changeIsEnableEvent($event, record)"
          />
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a class="margin-r-10" @click="modifyEvent(record)">修改</a>
          <Popconfirm
            title="确认要删除吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="deleteItem([record.id])"
          >
            <a>删除</a>
          </Popconfirm>
        </template>
      </template>
      <template v-if="false" #expandedRowRender="{ column, text, record }">
        <ATable
          :columns="childColumns"
          :data-source="record.secondVOList"
          :pagination="false"
          row-key="id"
          :row-selection="rowSelection"
          @expand="onExpand"
          :expandedRowKeys="defaultExpandedRowKeys"
          size="small"
          :expandRowByClick="true"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'move'">
              <template v-if="isShowInnerMove === true">
                <ArrowUpOutlined
                  v-if="hasInnerShowUp !== record.id"
                  class="margin-r-10"
                  @click="ArrowUpOutlinedEvent(record)"
                />
                <ArrowDownOutlined
                  v-if="hasInnerShowUp !== record.id"
                  class="margin-r-10"
                  @click="ArrowDownOutlinedEvent(record)"
                />
                <VerticalAlignTopOutlined
                  v-if="hasInnerShowUp !== record.id"
                  class="margin-r-10"
                  @click="VerticalAlignTopOutEvent(record)"
                />
                <VerticalAlignBottomOutlined
                  v-if="hasInnerShowDown !== record.id"
                  @click="VerticalAlignBottomOutEvent(record)"
                />
              </template>
              <template v-else>
                <span>----</span>
              </template>
            </template>
            <template v-if="column.dataIndex === 'isEnable'">
              <Switch
                v-model:checked="record.isEnable"
                checked-children="开"
                un-checked-children="关"
                @change="changeIsEnableEvent($event, record)"
              />
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <a class="margin-r-10" @click="ChildModifyEvent(record)">修改</a>
              <Popconfirm
                title="确认要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="deleteItem([record.id])"
              >
                <a>删除</a>
              </Popconfirm>
            </template>
          </template>
        </ATable>
      </template>
    </ATable>
    <div class="p-10px text-right">
      <VoPagination
        :total="paginations.total"
        :current="paginations.current"
        :page-size="paginations.pageSize"
        @pagination="paginationChange"
      />
    </div>
  </div>

  <EraColumnForm :title="modalTitle" ref="opForm" @submit="hanlderOpFormSubmit">
    <template #NilFileContent>
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 15 }"
        autocomplete="off"
      >
        <AFormItem
          label="一级分类名称"
          name="name"
          :rules="[{ required: true, message: '请输入一级类目名称!' }]"
        >
          <a-input :maxlength="10" v-model:value="formState.name" placeholder="请输入名称" />
        </AFormItem>
      </AForm>
    </template>
  </EraColumnForm>

  <EraColumnForm :title="modalTitle" ref="opSeconedFormRef" @submit="handlerEditSeconedApiEvent">
    <template #NilFileContent>
      <AForm
        ref="editRef"
        :model="formSeconedaryState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <AFormItem label="一级分类名称" name="name">
          <span>{{ seconedModel.name }}</span>
        </AFormItem>
        <AFormItem
          label="二级分类名称"
          name="secondaryCategoryName"
          :rules="[{ required: true, message: '请输入二级类目名称!' }]"
        >
          <a-input
            :maxlength="10"
            v-model:value="formSeconedaryState.secondaryCategoryName"
            placeholder="请输入二级分类"
          />
        </AFormItem>
      </AForm>
    </template>
  </EraColumnForm>
  </div>
</template>
<script lang="ts">
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import { defineComponent, reactive, ref, computed, unref, toRaw } from 'vue'
  import { VoUtils } from '@vocen/shared'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import { Switch, Popconfirm } from 'ant-design-vue'
  // 封装流水Form
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'
  import {
    opFormColumns,
    secondaryClassification,
    options,
  } from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/data/opFormTmpls'
  import { cateListMockData } from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/mock/mock'
  import AdminHttp from '/@/utils/http/adminHttp'
  import ComponentCategoryManager from '/@/modules/GoodsModule/GoodsConfigation/CategoryManager/components/ComponentCategoryManager.vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()

  interface FormState {
    name: string
  }

  interface FormSeconedaryState {
    parentId: String
    secondaryCategoryName: String
    hierarchy: Number
    id: String
    name: String
  }

  const formState = reactive<FormState>({
    name: '',
  })
  const formSeconedaryState = reactive<FormSeconedaryState>({
    parentId: '',
    secondaryCategoryName: '',
    hierarchy: 2,
    id: '',
    name: '',
  })
  // 判断是“新增” 还是 “编辑”
  let changeType = ref('')
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
      title: '是否启用',
      dataIndex: 'isEnable',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
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
      title: '是否启用',
      dataIndex: 'isEnable',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ]
  const pagination = reactive({
    showSizeChanger: true,
    showQuickJumper: true,
    showTatal: () => '共${dataSourceList.length}条',
    pageSize: 10,
    pageNo: 1,
    pageSizeOptions: ['3', '5', '10'],
    style: 'margin-top: 50px; text-align: center; margin-right: 20px',
  })
  const handleEditItem = (item) => {}
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  export default defineComponent({
    name: 'CommitKey',
    components: {
      Switch,
      Popconfirm,
      EraColumnForm,
      VoPagination,
      VerticalAlignTopOutlined,
      ArrowUpOutlined,
      ArrowDownOutlined,
      VerticalAlignBottomOutlined,
      EraSwitchTable,
      ComponentCategoryManager,
    },
    setup() {
      const formRef = ref()
      const opSeconedFormRef = ref()
      const editRef = ref()
      let hasShowUp = ref('')
      let hasShowDown = ref('')
      let hasInnerShowUp = ref('')
      let hasInnerShowDown = ref('')
      let isShowOutMove = ref(false)
      let isShowInnerMove = ref(false)

      const tableData = ref([])
      const defaultExpandedRowKeys = ref([])
      const paginations = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const editModel = reactive({
        hierarchy: 0,
        id: '',
        name: '',
      })
      const seconedModel = reactive({
        parentId: '',
        parentName: '',
        secondaryCategoryName: '',
        hierarchy: 2,
        id: '',
        name: '',
      })
      let opForm = ref()
      let modelData = ref()
      // model 标题
      const modalTitle = ref('')
      // 修改弹框的表示符 changeVisible--> 显示 false --> 隐藏
      const changeVisible = ref(false)
      // 选中item的数据集
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

      // 单项“修改”
      const taggleOpFormDialog = (item) => {
        changeType.value = '1'
        if (!item) {
          modalTitle.value = '新增分类'
          modelData.value = opFormColumns
        } else if (item.isparent === true) {
          modalTitle.value = '编辑分类'
          modelData.value = opFormColumns
        } else {
          modalTitle.value = '编辑二级分类'
          modelData.value = secondaryClassification
        }
        opForm.value.isOpenAlertShow()
      }

      // 2022-06-05
      const setDefaultExpandedKeys = () => {
        let arr = []
        setTimeout(() => {
          //单独设置--展开所有功能
          let datas = data
          datas.length &&
            datas.forEach((item) => {
              if (item.children && item.children.length) {
                arr.push(item.id)
                item.children.forEach((item) => {
                  arr.push(item.id)
                  if (item.children && item.children.length) {
                    arr.push(item.id)
                    item.children.forEach((item) => {
                      arr.push(item.id)
                    })
                  }
                })
              }
            })
          defaultExpandedRowKeys.value = arr
        }, 200)
      }
      // 分类 --- 批量删除
      const batchDelete = () => {
        let allArray = []
        selectedRowKeys.value.forEach((item) => {
          console.log(item, 'item')
          allArray.push(item)
        })
        console.log(allArray, 'allArray')
        deleteItem(allArray)
      }
      const hasSelected = computed(() => selectedRowKeys.value.length > 0)
      const onSelectChange = (changeableRowKeys) => {
        selectedRowKeys.value = changeableRowKeys
      }
      const rowSelection = computed(() => {
        return {
          selectedRowKeys: unref(selectedRowKeys),
          onChange: onSelectChange,
          hideDefaultSelections: true,
        }
      })
      // 全部展开table
      const alltableExpand = () => {
        expandedRowKeys.value = []
        for (let item of data) {
          let itemId = item.id
          expandedRowKeys.value.push(itemId)
        }
      }

      // 全部关闭table
      const alltablecollaps = () => {
        defaultExpandedRowKeys.value = []
      }
      // 单个item关闭展开状态
      const expandbtn = (expanded, record) => {
        let isRef = expandedRowKeys.value.some((item, index) => {
          if (item[index] === record.id) {
            return true
          }
        })
        if (expanded === false) {
          if (isRef) {
            for (let key in expandedRowKeys.value) {
              if (expandedRowKeys.value[key] === record.id) {
                // Reflect.deleteProperty(expandedRowKeys.value, key)
                expandedRowKeys.value[key] = ''
              }
            }
          }
        } else {
          if (!isRef) {
            expandedRowKeys.value.push(record.id)
          }
        }
      }
      const onExpand = (expanded, record) => {
        if (expanded === true) {
          console.log('recordrecord===', record)
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
      const getChildListEvent = async (item) => {
        const { code, data } = await AdminHttp.goodsCategorySecondCategory({ id: item.id })
        if (code == '20001') {
          tableData.value.map((itemIndex) => {
            if (itemIndex['id'] == item.id) {
              if (data.length > 1) {
                isShowInnerMove.value = true
              } else {
                isShowInnerMove.value = false
              }
              item.secondVOList = data
              if (data.length > 1) {
                hasInnerShowUp.value = data[0]['id']
                hasInnerShowDown.value = data.value[data.length - 1]['id']
              }
            }
            return itemIndex
          })
        }
      }
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        initGoodsCategoryData()
      }
      // 修改“运营类别”的
      let data = reactive(cateListMockData)
      const deleteItem = async (item: any) => {
        let map = { ids: item }
        const res = await AdminHttp.goodsCategoryBatchDelete(map)
        if (res.success) {
          await initGoodsCategoryData()
          createMessage.success('操作成功')
        } else {
          createMessage.error(res.message)
        }
      }
      const objOfValue = (object) => {
        var arr = []
        var i = 0
        for (var item in object) {
          arr[i] = object[item]
          i++
        }
        return arr
      }
      const initGoodsCategoryData = async () => {
        try {
          const map = {
            orderProperty: 'sort',
            orderType: 'sec',
            pageNo: paginations.current,
            pageSize: paginations.pageSize,
          }
          const { data } = await AdminHttp.goodsCategoryList(map)
          tableData.value = data.records.map((item) => {
            return {
              ...item,
              hierarchy: +item.hierarchy,
              children: item.secondVOList,
            }
          })
          paginations.total = data.total
          if (tableData.value.length > 1) {
            hasShowUp.value = tableData.value[0]['id']
            hasShowDown.value = tableData.value[tableData.value.length - 1]['id']
            isShowOutMove.value = true
          } else {
            isShowOutMove.value = false
          }
        } catch (err) {
          console.log(err)
        } finally {
        }
      }

      const ArrowUpOutlinedEvent = async (items) => {
        let currentIndex = tableData.value.findIndex((item) => {
          return items.id == item['id']
        })
        const upIndex = currentIndex - 1
        const currentItem = { id: items.id, sort: tableData.value[upIndex]['sort'] }
        const upItem = { id: tableData.value[upIndex]['id'], sort: items.sort }
        const sortArr = [currentItem, upItem]
        const arrowUpMap = {
          hierarchy: items.hierarchy,
          type: 2,
          sortBOList: sortArr,
        }
        await sortEvent(arrowUpMap)
      }
      const ArrowDownOutlinedEvent = async (items) => {
        let currentIndex = tableData.value.findIndex((item) => {
          return items.id == item['id']
        })
        const upIndex = currentIndex + 1
        const currentItem = { id: items.id, sort: tableData.value[upIndex]['sort'] }
        const upItem = { id: tableData.value[upIndex]['id'], sort: items.sort }
        const sortArr = [currentItem, upItem]
        const arrowUpMap = {
          hierarchy: items.hierarchy,
          type: 2,
          sortBOList: sortArr,
        }
        await sortEvent(arrowUpMap)
      }
      const VerticalAlignTopOutEvent = async (item) => {
        const arrowUpMap = { id: item.id, type: 1, hierarchy: item.hierarchy }
        await sortEvent(arrowUpMap)
      }
      const VerticalAlignBottomOutEvent = async (item) => {
        const arrowUpMap = { id: item.id, type: 3, hierarchy: item.hierarchy }
        await sortEvent(arrowUpMap)
      }
      const sortEvent = async (param) => {
        const { code } = await AdminHttp.goodsCategorySortUpdate(param)
        if (code == '20001') {
          createMessage.success('排序操作成功')
          await initGoodsCategoryData()
        } else {
          createMessage.error({ content: '排序操作失败' })
        }
      }
      const changeIsEnableEvent = async (status, item) => {
        const switchMap = {
          id: item.id,
          hierarchy: item.hierarchy,
          isEnable: status,
        }
        const { code } = await AdminHttp.goodsCategoryDisableTypeUpdate(switchMap)
        if (code == '20001') {
          createMessage.success('切换状态成功')
          await initGoodsCategoryData()
          opForm.value.closeBtnLoaidng()
        } else {
          createMessage.error('切换状态失败')
        }
      }
      const updateClassApi = async () => {
        editModel.name = toRaw(formState).name
        const { code } = await AdminHttp.goodsCategoryUpdate(editModel)
        if (code == '20001') {
          createMessage.success('修改成功')
          await initGoodsCategoryData()
          opForm.value.isCloseAlertShow()
        } else {
          createMessage.error('修改失败')
        }
      }
      const modifyEvent = (record) => {
        changeType.value = '2'
        modalTitle.value = '修改一级分类'
        formState.name = record.name
        editModel.id = record.id
        editModel.hierarchy = record.hierarchy
        opForm.value.isOpenAlertShow()
      }
      initGoodsCategoryData()
      const insertListItem = async () => {
        try {
          const postData = {
            name: toRaw(formState).name,
            hierarchy: 1,
          }
          const { code } = await AdminHttp.goodsCategorySave(postData)
          if (code == '20001') {
            createMessage.success('添加成功')
            opForm.value.isCloseAlertShow()
            await initGoodsCategoryData()
          } else {
            createMessage.error('添加失败')
          }
        } catch (e) {
          createMessage.error('添加失败')
        }
      }
      const hanlderOpFormSubmit = async () => {
        try {
          await formRef.value.validateFields()
          if (changeType.value == '1') {
            await insertListItem()
          } else {
            await updateClassApi()
          }
        } catch (errorInfo) {
          console.log('Failed:', errorInfo)
        }
      }
      const handlerEditSeconedApiEvent = async () => {
        try {
          await editRef.value.validateFields()

          if (changeType.value == '3') {
            await editSecondaryCategory()
          } else {
            // await updateClassApi()
            await eidtSeconedaryItem()
          }
        } catch (errorInfo) {
          console.log('Failed:', errorInfo)
        }
      }
      /**
       * @description  “新增” 二级 类目
       */
      const editSecondaryCategory = async () => {
        let addChildCategoryMap = {
          name: seconedModel.name,
          parentId: seconedModel.id,
          secondaryCategoryName: toRaw(formSeconedaryState).secondaryCategoryName,
          hierarchy: seconedModel.hierarchy,
        }
        const { code } = await AdminHttp.goodsCategorySave(addChildCategoryMap)
        if (code == '20001') {
          await initGoodsCategoryData()
          createMessage.success('二级类目创建成功')
          opSeconedFormRef.value.isCloseAlertShow()
        } else {
          createMessage.error('二级类目创建成功')
        }
      }
      /**
       * @description  “编辑” 二级 类目
       */
      const eidtSeconedaryItem = async () => {
        let addChildCategoryMap = {
          name: seconedModel.name,
          parentId: seconedModel.parentId,
          id: seconedModel.id,
          hierarchy: seconedModel.hierarchy,
        }
        const { code } = await AdminHttp.goodsCategoryUpdate(addChildCategoryMap)
        if (code == '20001') {
          await initGoodsCategoryData()
          createMessage.success('二级类目编辑成功')
          opSeconedFormRef.value.isCloseAlertShow()
        } else {
          createMessage.error('二级类目编辑失败')
        }
      }
      /**
       * @description "增加" 或者 “编辑” 二级 类目
       * @function { editSecondaryCategoryName }
       * @return void
       */
      const editSecondaryCategoryName = (record) => {
        changeType.value = '3'
        modalTitle.value = '新增二级分类'
        seconedModel.parentName = record.parentName
        seconedModel.name = record.name
        seconedModel.id = record.id
        opSeconedFormRef.value.isOpenAlertShow()
      }
      /**
       * @description 编辑“二级”分类
       */
      const ChildModifyEvent = (item) => {
        changeType.value = '4'
        modalTitle.value = '修改二级分类'
        seconedModel.name = item.name
        seconedModel.id = item.id
        seconedModel.parentId = item.parentId
        seconedModel.hierarchy = item.hierarchy
        opSeconedFormRef.value.isOpenAlertShow()
      }
      return {
        data,
        columns,
        rowSelection,
        pagination,
        radioBtn,
        hasSelected,
        expandedRowKeys,
        changeVisible,
        modalTitle,
        modelData,
        editModel,
        opSeconedFormRef,
        ChildModifyEvent,
        editSecondaryCategoryName,
        handlerEditSeconedApiEvent,
        onFinishFailed,
        hanlderOpFormSubmit,
        onFinish,
        secondaryClassification,
        opFormColumns,
        opForm,
        VoUtils,
        childColumns,
        paginations,
        hasShowUp,
        hasShowDown,
        hasInnerShowUp,
        hasInnerShowDown,
        isShowOutMove,
        isShowInnerMove,
        editRef,
        formState,
        formRef,
        changeType,
        seconedModel,
        formSeconedaryState,
        handleEditItem,
        modifyEvent,
        changeIsEnableEvent,
        ArrowUpOutlinedEvent,
        ArrowDownOutlinedEvent,
        VerticalAlignTopOutEvent,
        VerticalAlignBottomOutEvent,
        batchDelete,
        paginationChange,
        topOrder,
        upOrder,
        downOrder,
        bottomOrder,
        alltablecollaps,
        alltableExpand,
        deleteItem,
        taggleOpFormDialog,
        expandbtn,
        objOfValue,
        value: ref<string[]>([]),
        options,
        defaultExpandedRowKeys,
        setDefaultExpandedKeys,
        onExpand,
        tableData,
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
      padding: 10px;
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
