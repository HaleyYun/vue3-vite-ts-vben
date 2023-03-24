<template>
 <div>
  <div class="commit-key__box comp-wrap">
    <div class="table-list px-24px">
      <div class=" form-list-choice pt-24px flex items-center">
        <div>
          <a-space>
            <a-button v-auth="'/v1/goods/category/operate/batch/delete'" type="danger" :disabled="!hasSelect" @click="batchDeleteHandler"
              >批量删除
            </a-button>
            <a-button v-auth="'/v1/goods/category/operate/save'" type="primary" @click="addNewHandler">添加新分类</a-button>
          </a-space>
        </div>
        <div class=" text-right flex-1">
          <span class="ant-system__red">
            小贴示：只有关联了商品类别后，用户才能筛选商品。
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="p-24px bg-white pt-10px">
    <EraTableTitle :total="total" />
    <ATable
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      row-key="id"
      :row-selection="rowSelection"
      @expand="expandHandler"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="record.hierarchy >= 1">
          <!--	置顶操作	  -->
          <VerticalAlignTopOutlined
            v-if="column.dataIndex === 'move' && record.index > 0"
            class="margin-r-10"
            @click="VerticalAlignTopOutEvent(record)"
          />
          <!--  向上移动	-->
          <ArrowUpOutlined
            v-if="column.dataIndex === 'move' && record.index > 0"
            class="margin-r-10"
            @click="ArrowUpOutlinedEvent(record)"
          />
          <!--	向下移动  -->
          <ArrowDownOutlined
            v-if="column.dataIndex === 'move' && record.index + 1 < record.total"
            class="margin-r-10"
            @click="ArrowDownOutlinedEvent(record)"
          />
          <!--	置底操作	  -->
          <VerticalAlignBottomOutlined
            v-if="column.dataIndex === 'move' && record.index + 1 < record.total"
            @click="VerticalAlignBottomOutEvent(record)"
          />
        </template>

        <template v-if="column.dataIndex === 'addChildCategory' && record.hierarchy === 1">
          <a v-auth="'/v1/goods/category/operate/save'" @click="addChildCategory(record)">添加子分类</a>
        </template>
        <template v-if="column.dataIndex === 'isEnable'">
          <a-switch
            v-model:checked="record.isEnable"
            checked-children="是"
            un-checked-children="否"
            :checked-value="1"
            :un-checked-value="0"
            :disabled="getDisabled(record)"
            @change="changeIsEnableEvent($event, record)"
          />
        </template>
        <template v-if="column.dataIndex === 'categoryList'">
          <div>
            <a-space>
              <a-tag color="blue" v-for="(item, index) in record.categoryList" :key="index"
                >{{ item.name }}
              </a-tag>
            </a-space>
          </div>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a v-auth="'/v1/goods/category/update'" class="margin-r-10" @click="modifyEvent(record)">修改</a>
          <a-popconfirm
            title="确认要删除吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="deleteItem(record)"
          >
            <a v-auth="'/v1/goods/category/batch/delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </ATable>
    <div class="p-10px text-right">
      <VoPagination
        :total="total"
        :current="paginations.pageNo"
        :page-size="paginations.pageSize"
        @pagination="paginationChange"
      />
    </div>
  </div>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :footer="null"
    destroy-on-close
    @cancel="modalCloseHandler"
    width="550px"
  >
    <div class="p-3">
      <a-form
        :model="postForm"
        name="postForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        ref="postFormRef"
        @finish="onFinishForm"
      >
        <a-form-item
          v-if="postForm.hierarchy === 2"
          label="所属分类"
          name="parentId"
          :rules="[{ required: true, message: '请选择所属分类', trigger: 'blur,change' }]"
        >
          <a-select v-model:value="postForm.parentId" disabled style="width: 100%">
            <a-select-option :value="options.id">{{ options.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="类别名称"
          name="name"
          :rules="[{ required: true, message: '未填写分类名称', trigger: 'blur' }]"
        >
          <a-input
            v-model:value.trim="postForm.name"
            :maxlength="10"
            placeholder="请输入类别名称"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          v-if="postForm.hierarchy === 2"
          label="关联商品类别"
          name="categoryIds"
          :rules="[{ required: true, message: '未选择关联分类名称', trigger: 'blur,change' }]"
        >
          <TreeSelect
            v-model:value="postForm.categoryIds"
            style="width: 100%"
            :field-names="{ label: 'name', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择所属分类"
            allow-clear
            tree-checkable
            tree-default-expand-all
            :tree-data="categoryTreeData"
          />
          <a-cascader
            v-if="false"
            expand-trigger="click"
            :field-names="{ label: 'name', value: 'id' }"
            v-model:value="postForm.categoryIds"
            style="width: 100%"
            multiple
            show-search
            max-tag-count="responsive"
            :options="categoryTreeData"
            placeholder="请选择所属分类"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 9, span: 16 }">
          <a-space>
            <a-button @click="resetPostFormHandler">取消</a-button>
            <a-button :loading="loading" type="primary" html-type="submit">确定</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
 </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref, onBeforeMount, createVNode } from 'vue'
  // import { VoUtils } from '@vocen/shared'
  import { _ } from '/@/../../shared/src/index'

  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  // @ts-ignore
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue'

  import { message, Modal, TreeSelect } from 'ant-design-vue'

  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const { createMessage } = useMessage()

  const postFormRef = ref()
  const loading = ref(false)
  const categoryTreeData = ref([])
  const tableData = ref<any>([])
  const expandedDataStorage = ref<any>([])
  const visible = ref(false)
  const editabled = ref(false)
  const title = ref('添加新分类')
  const total = ref(0)
  const currentRow = ref<any>(null)
  const selectKeysData = ref<any>([])
  const hasSelect = computed(() => selectKeysData.value.length > 0)
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
  })

  const options = ref({})

  // const plain

  const defaultForm = {
    parentId: 0,
    hierarchy: 1,
    id: '',
    name: '',
    categoryIds: [],
  }

  const postForm = ref<any>(_.cloneDeep(defaultForm))

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
      dataIndex: 'categoryList',
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

  const batchDeleteHandler = () => {
    Modal.confirm({
      title: '确认删除',
      icon: createVNode(ExclamationCircleOutlined),
      content: `共${selectKeysData.value.length}条数据被选中，确定要删除吗？`,
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            AdminHttp.goodsCategoryOperateDelete({
              ids: selectKeysData.value,
            })
              .then(({ code }) => {
                if (+code === 20001) {
                  message.success('删除成功')
                  initGoodsCategoryData()
                  selectKeysData.value = []
                  // 本地模拟删除数据
                  resolve(true)
                }
              })
              .catch(reject)
          })
        } catch {
          return console.log('Oops errors!')
        }
      },
      onCancel() {},
    })
  }

  // 删除分类
  const deleteItem = async (record) => {
    const { code } = await AdminHttp.goodsCategoryOperateDelete({ ids: [record.id] })
    if (+code === 20001) {
      createMessage.success('删除成功')
      if (record.hierarchy === 2) {
        tableData.value = tableData.value.map((item) => {
          if (item.id === record.pid) {
            item.children = item.children.filter((f) => f.id !== record.id)
            return item
          } else {
            return item
          }
        })
      } else {
        await initGoodsCategoryData()
      }
    }
  }

  const changeIsEnableEvent = async (val, record) => {
    const { code } = await AdminHttp.goodsCategoryOperateDisableTypeUpdate({
      id: record.id,
      hierarchy: record.hierarchy,
      isEnable: val,
    })
    if (+code === 20001) {
      createMessage.success('设置成功')
    }
    if (+record.hierarchy === 1 && !val) {
      tableData.value = tableData.value.map((item) => {
        return {
          ...item,
          children:
              record.id === item.id
                  ? item.children.map((i) => {
                    return {
                      ...i,
                      isEnable: false,
                    }
                  })
                  : item.children,
        }
      })
    }
  }
  const getDisabled = (record) => {
    if (+record.hierarchy === 2) {
      const pobj: any = tableData.value.find((item) => item.id === record.pid)
      console.log(pobj)
      return !pobj.isEnable
    }
    return false
  }

  // 修改操作
  const modifyEvent = (record) => {
    title.value = record.hierarchy === 1 ? '编辑一级分类' : '编辑二级分类'

    if (record.hierarchy === 2) {
      options.value = tableData.value.find((item) => item.id === record.pid)
    }
    currentRow.value = unref(record)
    editabled.value = true
    visible.value = true
    if (record.hierarchy === 1) {
      postForm.value = {
        hierarchy: record.hierarchy,
        name: record.name,
      }
    }
    if (record.hierarchy === 2) {
      postForm.value = {
        hierarchy: record.hierarchy,
        name: record.name,
        parentId: record.pid,
        categoryIds: record.categoryList.map((item) => item.id),
      }
    }
  }

  // 提交表单重置
  const resetPostFormHandler = () => {
    postFormRef.value.resetFields()
    modalCloseHandler()
  }

  // 表单关闭
  const modalCloseHandler = () => {
    visible.value = false
  }

  // 添加新分类
  const addNewHandler = () => {
    postForm.value = _.cloneDeep(defaultForm)
    visible.value = true
    editabled.value = false
  }

  // 添加子分类
  const addChildCategory = (record) => {
    postForm.value = {
      ..._.cloneDeep(defaultForm),
      hierarchy: 2,
      parentId: record.id,
    }
    options.value = record
    editabled.value = false
    visible.value = true
    title.value = '添加二级分类'
    currentRow.value = unref(record)
  }

  // 表单提交
  const onFinishForm = async () => {
    if (editabled.value) {
      // 编辑
      loading.value = true
      try {
        const { code } = await AdminHttp.goodsCategoryOperateUpdate({
          ...postForm.value,
          id: currentRow.value.id,
        })
        loading.value = false
        if (+code === 20001) {
          createMessage.success('修改成功')
          if (postForm.value.hierarchy === 1) {
            await initGoodsCategoryData()
          }
          if (postForm.value.hierarchy === 2) {
            const cData = expandedDataStorage.value.find(
              (item) => item.id === postForm.value.parentId,
            )
            if (cData) {
              await expandHandler(true, cData)
            }
          }
          modalCloseHandler()
        }
      } catch (e) {
        loading.value = false
      }
    } else {
      // 新增
      loading.value = true
      try {
        const { code } = await AdminHttp.goodsCategoryOperateSave(postForm.value)
        loading.value = false
        if (+code === 20001) {
          createMessage.success('添加成功')
          if (postForm.value.hierarchy === 1) {
            await initGoodsCategoryData()
          }
          if (postForm.value.hierarchy === 2) {
            const cData = expandedDataStorage.value.find(
              (item) => item.id === postForm.value.parentId,
            )
            if (cData) {
              await expandHandler(true, cData)
            }
          }
          modalCloseHandler()
        }
      } catch (e) {
        loading.value = false
      }
    }
  }

  // 展开操作
  const expandHandler = async (expanded, record) => {
    // 存储临时展开数据
    if (expanded) {
      const flag = expandedDataStorage.value.find((item) => item.id === record.id)
      if (!flag) {
        expandedDataStorage.value.push(record)
      }
    } else {
      const index = expandedDataStorage.value.findIndex((item) => item.id === record.id)
      expandedDataStorage.value.splice(index, 1)
    }
    // const expandData = defaultExpandedRowKeys.value.find((item) => item === record.id)
    if (expanded) {
      // 展开
      // 获取二级数据 并添加到一级节点里面
      const { data } = await AdminHttp.goodsCategoryOperateSelectSecondCategory({ id: record.id })
      tableData.value = tableData.value.map((item) => {
        if (item.id === record.id) {
          return {
            ...item,
            children: data.map((d, index) => {
              return {
                ...d,
                pid: item.id,
                index,
                total: data.length,
              }
            }),
          }
        }
        return item
      })
    } else {
      // 关闭
    }
  }
  // 选择配置
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: []) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      selectKeysData.value = selectedRowKeys
    },
  })

  const initGoodsCategoryTreeData = async () => {
    const { data } = await AdminHttp.goodsCategoryCategorySelect({ name: '' })
    categoryTreeData.value = data.map((item) => {
      return {
        ...item,
        disabled: true,
      }
    })
  }

  // 初始化页面数据
  const initGoodsCategoryData = async () => {
    try {
      const { data } = await AdminHttp.goodsCategoryOperateList({
        ...paginations,
        orderProperty: 'sort',
        orderType: 'ASC',
      })
      tableData.value = data.records.map((item, index) => {
        return {
          ...item,
          hierarchy: +item.hierarchy,
          children: [],
          index,
          total: data.records.length,
        }
      })
      total.value = data.total
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  // 置底操作
  const VerticalAlignBottomOutEvent = async (item) => {
    currentRow.value = item
    const arrowUpMap = { id: item.id, type: 3, hierarchy: item.hierarchy }
    if (item.hierarchy === 2) {
      arrowUpMap['parentId'] = item.pid
    }
    await sortEvent(arrowUpMap)
  }

  // 向下移动
  const ArrowDownOutlinedEvent = async (items) => {
    currentRow.value = items
    if (items.hierarchy === 1) {
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
    } else {
      // 二级的修改
      const parentData = tableData.value.find((t) => t.id === items.pid)
      console.log(parentData)
      let currentIndex = items.index
      const upIndex = currentIndex + 1
      const currentItem = { id: items.id, sort: parentData.children[upIndex]['sort'] }
      const upItem = { id: parentData.children[upIndex]['id'], sort: items.sort }
      const sortArr = [currentItem, upItem]
      const arrowUpMap = {
        hierarchy: items.hierarchy,
        type: 2,
        sortBOList: sortArr,
      }
      await sortEvent(arrowUpMap)
    }
  }

  // 向上移动
  const ArrowUpOutlinedEvent = async (items) => {
    currentRow.value = items
    if (items.hierarchy === 1) {
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
    } else {
      // 二级的修改
      const parentData = tableData.value.find((t) => t.id === items.pid)
      let currentIndex = items.index
      const upIndex = currentIndex - 1
      const currentItem = { id: items.id, sort: parentData.children[upIndex]['sort'] }
      const upItem = { id: parentData.children[upIndex]['id'], sort: items.sort }
      const sortArr = [currentItem, upItem]
      const arrowUpMap = {
        hierarchy: items.hierarchy,
        type: 2,
        sortBOList: sortArr,
      }
      await sortEvent(arrowUpMap)
    }
  }

  // 置顶操作
  const VerticalAlignTopOutEvent = async (item) => {
    currentRow.value = item
    const arrowUpMap = { id: item.id, type: 1, hierarchy: item.hierarchy }
    if (item.hierarchy === 2) {
      arrowUpMap['parentId'] = item.pid
    }
    await sortEvent(arrowUpMap)
  }
  const sortEvent = async (param) => {
    const { code } = await AdminHttp.goodsCategoryOperateSortUpdate(param)
    if (code == '20001') {
      createMessage.success('排序操作成功')

      if (currentRow.value.hierarchy === 2) {
        const cData = expandedDataStorage.value.find((item) => item.id === currentRow.value.pid)
        if (cData) {
          await expandHandler(true, cData)
        }
      } else {
        await initGoodsCategoryData()
      }
    } else {
      createMessage.error({ content: '排序操作失败' })
    }
  }
  onMountedOrActivated(() => {
    initGoodsCategoryData()
    initGoodsCategoryTreeData()
  })

  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    initGoodsCategoryData()
  }
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
    width: 100%;
    box-sizing: border-box;
    // border-bottom: 1px solid #f0f0f0;

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
