<template>
  <div>
    <div class="my-24px bg-white p-24px ">
      <a-form
              style="width: 100%"
              ref="formSearchRef"
              layout="inline"
              :model="formSearchState"
              name="formSearchState"
              autocomplete="off"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              @finish="onSearchFormFinish"
      >
        <a-col :span="8">
          <a-form-item name="name" label="属性名称">
            <a-input v-model:value="formSearchState.name" placeholder="输入名称" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item name="ids" label="商品类别">
            <a-cascader
                    v-model:value="formSearchState.ids"
                    :field-names="{ label: 'name', value: 'id' }"
                    placeholder="商品类别"
                    allow-clear
                    :options="treeCateFormData"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
                  :label-col="{ span: 0 }"
                  :wrapper-col="{ span: 24 }"
                  style="margin-right: 0; text-align: right"
          >
            <a-space>
              <a-button type="primary" html-type="submit">
                <template #icon>
                  <SearchOutlined />
                </template>
                查询
              </a-button>
              <a-button @click="resetSearchFormHandler">重置</a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-form>
    </div>
  </div>
  <div class="p-24px bg-white">
    <EraTableTitle :total="total">
      <template #tableEdit>
        <a-space>
          <a-button v-auth="'/v1/goods/sku/property'" :disabled="!batchSelectedRowKeys.length" type="danger" @click="batchDeleteHandler">
            <DeleteOutlined />
            批量删除
          </a-button>
          <a-button v-if="false" type="primary">
            <ExportOutlined />
            导入属性
          </a-button>
          <a-button v-auth="'/v1/goods/sku/property/save'" type="primary" @click.stop="addNewHandler">
            <PlusOutlined />
            添加属性
          </a-button>
        </a-space>
      </template>
    </EraTableTitle>
    <a-table
      v-if="tableData.length"
      :pagination="false"
      :columns="columns"
      :data-source="tableData"
      :row-selection="rowSelection"
      @expand="expandHandler"
      row-key="id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'hierarchy'">
          <div>
            <a-tag color="blue">{{ record.hierarchy }}</a-tag>
          </div>
        </template>
        <template v-if="column.key === 'move' && record.hierarchy === 3">
          <div>
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
          </div>
        </template>
        <template v-if="column.key === 'value' && record.hierarchy === 3">
          <div>
            {{ record.value.join('、') }}
          </div>
        </template>
        <template v-if="column.key === 'unit' && record.hierarchy === 3">
          <div>
            {{ record.unit }}
          </div>
        </template>
        <template v-if="column.key === 'isEnable' && record.hierarchy === 3">
          <div>
            <a-switch
              checked-children="是"
              un-checked-children="否"
              v-model:checked="record.isEnable"
              @change="isEnableChange($event, record)"
            />
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div v-if="record.hierarchy === 2">
            <a v-auth="'/v1/goods/sku/property/save'" @click="addValueByCategory(record)">添加属性</a>
          </div>
          <div v-if="record.hierarchy === 3">
            <a v-auth="'/v1/goods/sku/property/update'" @click="editSkuHandler(record)">编辑</a>
            <a-divider type="vertical" />
            <!--删除这个再对一下-->
            <a-popconfirm
              v-if="!record.isInUse"
              title="确认要删除吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteAtrributeItem(record)"
            >
              <a v-auth="'/v1/goods/sku/property'">删除</a>
            </a-popconfirm>
            <a-tooltip v-else v-auth="'/v1/goods/sku/property'">
              <template #title>有商品或模版在使用，无法删除。</template>
              <a disabled>删除</a>
            </a-tooltip>
          </div>
        </template>
      </template>
    </a-table>
    <div class="p-4 text-right">
      <VoPagination
        :total="total"
        :current="pageQuery.pageNo"
        :page-size="pageQuery.pageSize"
        size="default"
        @pagination="paginationHandler"
      />
    </div>
    <a-modal
      v-model:visible="visible"
      :title="editabled ? '编辑规格属性' : '添加规格属性'"
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
            label="商品类别"
            name="categoryId"
            :rules="[{ required: true, message: '请选择商品类别', trigger: 'blur,change' }]"
          >
            <TreeSelect
              :disabled="editabled"
              v-model:value="postForm.categoryId"
              style="width: 100%"
              :field-names="{ label: 'name', value: 'id' }"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择商品类别"
              allow-clear
              :showCheckedStrategy="SHOW_CHILD"
              tree-default-expand-all
              :tree-data="treeData"
            />
          </a-form-item>

          <a-form-item
            label="属性名称"
            name="name"
            :rules="[{ required: true, message: '请输入属性名称', trigger: 'blur' }]"
          >
            <a-input
              v-model:value.trim="postForm.name"
              :maxlength="10"
              placeholder="请输入属性名称"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            label="属性值类型"
            name="type"
            :rules="[{ required: true, message: '请选择属性值类型', trigger: 'blur' }]"
          >
            <a-radio-group v-model:value="postForm.type" :disabled="editabled" name="radioGroup">
              <a-radio :value="1">文本</a-radio>
              <a-radio :value="2">数字</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="postForm.type === 2"
            label="属性单位"
            name="unit"
            :rules="[{ required: true, message: '请输入属性单位', trigger: 'blur' }]"
          >
            <a-input
              v-model:value.trim="postForm.unit"
              :maxlength="5"
              placeholder="请输入属性单位"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            label="设置属性值"
            name="value"
            :rules="[
              {
                required: true,
                type: 'array',
                message: '请录入至少1个属性值！',
                trigger: 'blur,change',
              },
            ]"
          >
            <div class="post-form">
              <transition-group name="list-complete" tag="div">
                <div
                  v-for="(item, index) in postFormValue"
                  :key="item.key"
                  class="mb-15px list-complete-item"
                >
                  <div class="flex items-center">
                    <div class="flex-1">
                      <a-form-item>
                        <a-input
                          :disabled="item.disabled"
                          v-model:value.trim="item.value"
                          :maxlength="10"
                          placeholder="请输入"
                          allow-clear
                        />
                      </a-form-item>
                    </div>
                    <div class="pl-10px w-165px">
                      <a-space style="gap: 0px">
                        <a
                          v-if="
                            index > 0 &&
                            index <= postFormValue.length - 1 &&
                            postFormValue.length > 1
                          "
                          href="javascript:void(0)"
                          @click="upHandler(index)"
                        >
                          上移
                        </a>
                        <a-divider
                          v-if="
                            index > 0 &&
                            index <= postFormValue.length - 1 &&
                            postFormValue.length > 1
                          "
                          type="vertical"
                        />

                        <a
                          v-if="
                            index >= 0 &&
                            index < postFormValue.length - 1 &&
                            postFormValue.length > 1
                          "
                          href="javascript:void(0)"
                          @click="downHandler(index)"
                        >
                          下移
                        </a>
                        <a-divider
                          v-if="
                            index >= 0 &&
                            index < postFormValue.length - 1 &&
                            postFormValue.length > 1
                          "
                          type="vertical"
                          @click="upHandler(index)"
                        />

                        <AButton
                          type="link"
                          :disabled="item.disabled"
                          @click="removePostFormValue(index)"
                          >删除
                        </AButton>
                      </a-space>
                    </div>
                  </div>
                </div>
              </transition-group>
              <div class="pt-2px">
                <a href="javascript:void(0)" @click="addValueHandler">+添加更多属性值</a>
              </div>
            </div>
          </a-form-item>
          <a-form-item
            label="是否启用"
            name="isEnable"
            :rules="[{ required: true, message: '是否启用', trigger: 'blur' }]"
          >
            <a-switch v-model:checked="postForm.isEnable" />
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
  import {
    createVNode,
    nextTick,
    onBeforeMount,
    reactive,
    ref,
    toRaw,
    toRef,
    unref,
    watch,
  } from 'vue'
  import { Modal, TreeSelect } from 'ant-design-vue'
  // @ts-ignore
  import {
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExportOutlined,
    ExclamationCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'
  import { attributeDataItem, DataItem } from './types'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  import { treeMap } from '/@/utils/helper/treeHelper'
  import { _ } from '/@/../../shared/src/index'
  import { useMessage } from '/@/hooks/web/useMessage'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const { createMessage } = useMessage()

  const postFormValue = ref<any>([])

  const currentRow = ref()

  // 提交表单的节点控制
  const postFormRef = ref()
  // 搜索表单ref
  const formSearchRef = ref()
  const loading = ref(false)

  // 搜索表单
  const formSearchState = reactive({
    name: '',
    ids: null,
  })
  const { SHOW_CHILD } = TreeSelect

  const secondLevelData = new Map()

  // 展示提交表单
  const visible = ref(false)

  // 编辑或者新增状态
  const editabled = ref(false)

  // 数据总数
  const total = ref(100)

  // 分页搜索
  const pageQuery = reactive({
    pageSize: 10,
    pageNo: 1,
  })

  // 新增属性默认表单
  const defaultPostForm = {
    categoryId: null,
    isEnable: true,
    name: '',
    type: 1, // 1 字符  2 数字
    unit: '',
    value: '',
  }

  // 表单的提交
  const postForm = ref(_.cloneDeep(defaultPostForm))

  // 表格配置
  const columns = ref([
    {
      title: '类别名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '排序',
      dataIndex: 'move',
      key: 'move',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '属性值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
      ellipsis: true,
    },
    // {
    //   title: '是否必填',
    //   dataIndex: 'isRequire',
    //   key: 'age',
    //   align: 'center',
    //   ellipsis: true,
    // },
    {
      title: '是否启用',
      dataIndex: 'isEnable',
      key: 'isEnable',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      ellipsis: true,
    },
  ])

  const expandedDataStorage = ref<any>([])

  // 表格数据
  const tableData = ref<attributeDataItem[]>([])

  // 分类数据
  const treeCateFormData = ref([])

  const batchSelectedRowKeys = ref<string | number[]>([])

  // 置底操作
  const VerticalAlignBottomOutEvent = async (item) => {
    currentRow.value = item
    const arrowUpMap = {
      type: 3,
      categoryId: item.pid,
      objects: [
        {
          id: item.id,
          sort: item.sort,
        },
      ],
    }
    await sortEvent(arrowUpMap)
  }

  // 向下移动
  const ArrowDownOutlinedEvent = async (items) => {
    currentRow.value = items
    const data = secondLevelData.get(items.pid)
    let currentIndex = items.index
    const upIndex = currentIndex + 1
    const currentItem = { id: items.id, sort: data[upIndex]['sort'] }
    const upItem = { id: data[upIndex]['id'], sort: items.sort }
    const sortArr = [currentItem, upItem]
    const arrowUpMap = {
      categoryId: items.pid,
      type: 2,
      objects: sortArr,
    }
    await sortEvent(arrowUpMap)
  }

  // 向上移动
  const ArrowUpOutlinedEvent = async (items) => {
    currentRow.value = items
    const data = secondLevelData.get(items.pid)
    let currentIndex = items.index
    const upIndex = currentIndex - 1
    const currentItem = { id: items.id, sort: data[upIndex]['sort'] }
    const upItem = { id: data[upIndex]['id'], sort: items.sort }
    const sortArr = [currentItem, upItem]
    const arrowUpMap = {
      categoryId: items.pid,
      type: 2,
      objects: sortArr,
    }
    await sortEvent(arrowUpMap)
  }

  // 置顶操作
  const VerticalAlignTopOutEvent = async (item) => {
    console.log(item)
    currentRow.value = item
    const arrowUpMap = {
      type: 1,
      categoryId: item.pid,
      objects: [
        {
          id: item.id,
          sort: item.sort,
        },
      ],
    }
    await sortEvent(arrowUpMap)
  }

  const sortEvent = async (param) => {
    const { code } = await AdminHttp.goodsSkuPropertySort(param)
    if (code == '20001') {
      createMessage.success('排序操作成功')
      await expandHandler(true, { id: currentRow.value.pid, hierarchy: 2 })
    } else {
      createMessage.error({ content: '排序操作失败' })
    }
  }

  // 本地模拟删除
  const delTableDataLocal = (keys) => {
    tableData.value = treeMap(tableData.value, {
      children: 'children',
      conversion(item) {
        if (item.hierarchy === 2) {
          if (item.hasOwnProperty('children')) {
            item.children = item.children.filter((f) => {
              console.log(keys.includes(f.id))
              return !keys.includes(f.id)
            })
            console.log(item.children)
          }
        }
        return item
      },
    })
    batchSelectedRowKeys.value = []
  }

  const batchDeleteHandler = () => {
    Modal.confirm({
      title: '确认删除',
      icon: createVNode(ExclamationCircleOutlined),
      content: `共${batchSelectedRowKeys.value.length}条数据被选中，确定要删除吗？`,
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            AdminHttp.goodsSkuPropertyDeleteBatch({
              ids: batchSelectedRowKeys.value,
            })
              .then(({ code }) => {
                if (+code === 20001) {
                  message.success('删除成功')
                  // 本地模拟删除数据
                  delTableDataLocal(batchSelectedRowKeys.value)
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
  // 选择项
  const rowSelection = ref({
    selectedRowKeys: toRaw(batchSelectedRowKeys.value),
    onChange: (selectedRowKeys: [], selectedRows: DataItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      batchSelectedRowKeys.value = selectedRowKeys
      console.log(toRaw(batchSelectedRowKeys.value))
      rowSelection.value.selectedRowKeys = toRaw(batchSelectedRowKeys.value)
    },
    getCheckboxProps: (record) => ({
      disabled: record.isInUse,
    }),
  })

  // 切换禁用状态
  const isEnableChange = async (val, record) => {
    const { code } = await AdminHttp.goodsSkuPropertyForbidden({
      id: record.id,
      value: val,
    })
    if (+code === 20001) {
      message.success('设置成功')
    }
    const cData = expandedDataStorage.value.find((item) => item.id === record.categoryId)
    if (cData) {
      await expandHandler(true, cData)
    }
  }

  // 制定二级分类下添加分类
  const addValueByCategory = (record) => {
    editabled.value = false
    postForm.value = _.cloneDeep({
      ...defaultPostForm,
      categoryId: record.id,
    })
    getCategory()
    visible.value = true
  }

  // 编辑属性
  const editSkuHandler = (record) => {
    currentRow.value = record
    editabled.value = true
    postForm.value = _.cloneDeep(record)
    postFormValue.value = record.value.map((item) => {
      return {
        key: new Date().getTime(),
        value: item,
        disabled: true,
      }
    })
    console.log(postForm.value, postFormValue.value)
    getCategory()
    visible.value = true
  }

  // 删除某个属性
  const deleteAtrributeItem = async (record) => {
    try {
      const ret: any = await AdminHttp.goodsSkuProperty$id({ id: record.id })
      if (+ret.code === 20001) {
        message.success('删除成功')
        const cData = expandedDataStorage.value.find((item) => item.id === record.categoryId)
        if (cData) {
          await expandHandler(true, cData)
        }
      }
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误', 'CategoryAttribute')
      // message.warning(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }

  // 初始化商品类别数据
  const initCategoryData = async () => {
    try {
      const queryForm: any = _.cloneDeep(formSearchState)
      if (queryForm.ids && queryForm.ids.length > 1) {
        queryForm.id = queryForm.ids[0]
        queryForm['nodes'] = {
          id: queryForm.ids[1],
        }
      }
      const { data } = await AdminHttp.goodsSkuPropertyQueryCategory({
        ...queryForm,
        ...pageQuery,
      })
      total.value = data.total
      if (!treeCateFormData.value.length) {
        treeCateFormData.value = treeMap(data.records, {
          children: 'children',
          conversion(item) {
            return item
          },
        })
      }

      tableData.value = treeMap(data.records, {
        children: 'children',
        conversion(item) {
          const attributeItem: attributeDataItem = {
            code: '',
            categoryId: item.id,
            id: item.id,
            isEnable: false,
            name: '',
            categoryName: item.name,
            type: '',
            unit: '',
            value: '',
            isInUse: true,
            hierarchy: item.hierarchy,
            children: item.children,
          }
          return attributeItem
        },
      })
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误', 'CategoryAttribute')
      // message.warning(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }

  // 添加更多属性值
  const addValueHandler = () => {
    const flag = postFormValue.value.find((item) => !item.value)
    console.log(
      postFormValue.value,
      postFormValue.value.find((item) => !item.value),
    )
    if (flag) {
      message.warn('请完善属性值后操作')
      return
    }
    const valueForm: any = {
      value: '',
      key: new Date().getTime(),
    }
    nextTick(() => {
      postFormValue.value.push(valueForm)
    })
  }

  // 制定二级分类下添加分类
  const treeData = ref([]);
  const getCategory = async ()=>{
    try {
      const {code,data} =  await AdminHttp.goodsCategoryCategorySelect({ name: '' });
      if(code == '20001'){
        if (!treeData.value.length) {
          treeData.value = treeMap(data, {
            children: 'children',
            conversion(item) {
              item['disabled'] = item.parentId == '0'
              return item
            },
          })
        }
      }
    }catch (e) {
      console.log(e.message, '选择记录')
    }
  }

  // 新增属性
  const addNewHandler = () => {
    editabled.value = false
    postForm.value = _.cloneDeep(defaultPostForm)
    getCategory()
    visible.value = true
  }

  // 提交表单关闭
  const modalCloseHandler = () => {
    postFormValue.value = []
    visible.value = false
  }

  // 提交表单重置
  const resetPostFormHandler = () => {
    postFormValue.value = []
    postFormRef.value.resetFields()
    modalCloseHandler()
    visible.value = false
  }

  // 渲染之前，进行相关数据的初始化
  onMountedOrActivated(() => {
    initCategoryData()
  })

  // 分页变化触发加载分页数据
  const paginationHandler = ({ current, pageSize }) => {
    pageQuery.pageNo = current
    pageQuery.pageSize = pageSize
    initCategoryData()
  }

  // 上移
  const upHandler = (nowIndex) => {
    const arr = _.cloneDeep(toRaw(postFormValue.value))
    const preIndex = nowIndex - 1
    arr[nowIndex] = arr.splice(preIndex, 1, arr[nowIndex])[0]
    postFormValue.value = arr
  }

  // 下移
  const downHandler = (nowIndex) => {
    const arr = _.cloneDeep(toRaw(postFormValue.value))
    const preIndex = nowIndex + 1
    arr[nowIndex] = arr.splice(preIndex, 1, arr[nowIndex])[0]
    postFormValue.value = arr
  }

  // 删除属性值
  const removePostFormValue = (index) => {
    postFormValue.value.splice(index, 1)
  }

  // 重置搜索表单
  const resetSearchFormHandler = () => {
    formSearchRef.value.resetFields()
    formSearchState.ids = null
    initCategoryData()
  }

  const expandHandler = async (expanded, record) => {
    if (record.hierarchy === 2) {
      // 临时缓存供添加或者编辑调用
      if (expanded) {
        const flag = expandedDataStorage.value.find((item) => item.id === record.id)
        if (!flag) {
          expandedDataStorage.value.push(record)
        }
      } else {
        const index = expandedDataStorage.value.findIndex((item) => item.id === record.id)
        expandedDataStorage.value.splice(index, 1)
      }
      // 加载数据
      const { data } = await AdminHttp.goodsSkuPropertyQueryList({
        categoryId: record.id,
        orderType: 'ASC',
        orderProperty: 'sort',
        name: formSearchState.name,
      })
      tableData.value = treeMap(tableData.value, {
        children: 'children',
        conversion(item) {
          const dataList = data.map((d, index) => {
            return {
              ...d,
              hierarchy: 3,
              index,
              total: data.length,
              pid: item.id,
            }
          })
          if (item.id === record.id) {
            item.children = dataList
            secondLevelData.set(item.id, dataList)
          }
          return item
        },
      })
    }
  }

  // 表单提交触发
  const onFinishForm = async () => {
    const flag = postFormValue.value.find((item) => item.value)
    if (!flag) {
      return message.warn('请录入至少1个属性值！')
    }
    postForm.value['value'] = postForm.value['value'].filter((item) => item != '')
    console.log(postForm.value['value'])
    try {
      if (editabled.value) {
        // 编辑
        try {
          loading.value = true
          const ret = await AdminHttp.goodsSkuPropertyUpdate(postForm.value)
          loading.value = false
          if (+ret.code === 20001) {
            message.success('编辑成功')
            const cData = expandedDataStorage.value.find(
              (item) => item.id === postForm.value.categoryId,
            )
            if (cData) {
              await expandHandler(true, cData)
            }
            modalCloseHandler()
          }
        } catch (e) {
          loading.value = false
        }
      } else {
        // 编辑
        try {
          // 新增
          loading.value = true
          const ret = await AdminHttp.goodsSkuPropertySave(postForm.value)
          loading.value = false
          if (+ret.code === 20001) {
            message.success('录入成功')
            const cData = expandedDataStorage.value.find(
              (item) => item.id === postForm.value.categoryId,
            )
            initCategoryData()
            if (cData) {
              await expandHandler(true, cData)
            }
            modalCloseHandler()
          }
        } catch (e) {
          loading.value = false
        }
      }
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误', 'CategoryAttribute')
      message.warning(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }

  // 表单搜索触发
  const onSearchFormFinish = () => {
    tableData.value = []
    initCategoryData()
  }

  // 监控属性值变化
  watch(
    postFormValue,
    (val) => {
      postForm.value.value = val.map((item) => item.value)
    },
    {
      deep: true,
    },
  )
</script>

<style scoped lang="less">
  .list-complete-item {
    transition: all 0.8s ease;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter-from,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  ::v-deep {
    .post-form {
      .ant-form-item {
        margin-bottom: 0 !important;
      }
    }
  }
</style>
