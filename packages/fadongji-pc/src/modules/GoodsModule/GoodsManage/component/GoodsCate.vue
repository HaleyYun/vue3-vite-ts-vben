<template>
 <div>
  <div class="attribute-search">
    <CaseFilterForm @rest="handlerFilterRest" @submit="handlerFilterSubmit" />
  </div>
  <div class="attribute-search__btn">
    <AButton class="table-operations__button" @click="allDelete()">批量删除</AButton>
    <AButton class="table-operations__button" @click="importAttribute()">导入属性</AButton>
    <AButton @click="addAttBute(item)">添加属性</AButton>
  </div>
  <!-- table 区域 -->
  <EraSwitchTable change-space="special">
    <template #content>
      <Table
        @expand="innerOpen"
        :dataSource="categoryData"
        :columns="categoryColumns"
        :row-key="(record) => record.id"
        :pagination="false"
        default-expand-all-rows
        class="components-table-demo-nested"
      >
        <template #expandedRowRender="{ expanded, record: r }">
          <div>
            <div v-for="(c, i) in childrenData[r.id]" :key="i">
              <div class="all-built">
                <div class="built-handler" @click="nickHandler(r.id, c.id)">+{{ c.name }}</div>
                <div class="add-atrribute" @click="addRowAttribute(c)">添加属性</div>
              </div>
              <Table
                v-if="c.open"
                :columns="innerColumns"
                bordered
                :data-source="c.list"
                :pagination="false"
              >
                <template #order>
                  <VerticalAlignTopOutlined class="action-triangle__space" />
                  <ArrowUpOutlined class="action-triangle__space" />
                  <ArrowDownOutlined class="action-triangle__space" />
                  <VerticalAlignBottomOutlined class="action-triangle__space" />
                </template>
                <template #switch="{ record }">
                  <Switch
                    @change="stateEnable(record, r.id, c.id)"
                    :checked="record.isEnable"
                    checked-children="开"
                    un-checked-children="关"
                  />
                </template>
                <template #action="{ record }">
                  <a class="action-space" @click="editItem(record)">编辑</a>
                  <Popconfirm
                    title="确认要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="deleteAtrributeItem(record)"
                  >
                    <a class="action-space">删除</a>
                  </Popconfirm>
                </template>
              </Table>
            </div>
          </div>
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
  </EraSwitchTable>
  <!-- </div> -->

  <EraColumnForm
    :title="modelTitle"
    :data="editForm"
    ref="editFormContent"
    @submit="submitFilterFormEvent"
  >
    <template #content="{ row }">
      <template v-if="VoUtils.hasOwn(row, 'isSelectTree')">
        <TreeSelect
          v-model:value="editForm.categoryId"
          style="width: 100%"
          :field-names="{ label: 'name', value: 'id' }"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择商品类别"
          allow-clear
          :showCheckedStrategy="SHOW_CHILD"
          tree-default-expand-all
          :tree-data="treeData"
        />
      </template>
      <template v-if="VoUtils.hasOwn(row, 'Radio')">
        <RadioGroup v-model:value="attributeValue" @change="changeAttributeFormat">
          <template v-for="item of row.Radio" :key="item.name">
            <Radio :value="item.value">{{ item.name }}</Radio>
          </template>
        </RadioGroup>
        <div v-if="attributeValue === 1">
          <div class="attribute-units">
            <div class="attribute-units__label">属性单位</div>
            <div class="attribute-units__value">
              <Input v-model:value="attributeNum" disabled />
            </div>
          </div>
        </div>
      </template>
      <!-- 设置属性值 -->
      <template v-if="VoUtils.hasOwn(row, 'assetsValue')">
        <div class="attribute-scroll">
          <template v-for="(val, index) of attributeArr" :key="val.id">
            <div class="attribute-flex">
              <div class="attribute-input">
                <Input v-model:value="val.value" />
              </div>
              <div class="attribute-btn__area">
                <span class="attibute-btn__space" v-if="index !== 0" @click="moveUp(val)"
                  >上移</span
                >
                <span
                  class="attibute-btn__space"
                  v-if="attributeArr.length - 1 !== index"
                  @click="moveDown(val)"
                  >下移</span
                >
                <span class="attibute-btn__space" @click="deleteAttriItem(val)">删除</span>
              </div>
            </div>
          </template>
          <span class="more-attribute" @click="addMoreAttrValue()">+添加更多属性值</span>
        </div>
      </template>
      <!-- 是否启用 -->
      <template v-if="VoUtils.hasOwn(row, 'isShow')">
        <ASwitch v-model:checked="isShow" checked-children="开" un-checked-children="关" />
      </template>
    </template>
  </EraColumnForm>
  <!-- 导入属性 -->
  <Modal v-model:visible="isImport" :title="importTitle" @ok="handleOk" @cancel="cancelOk">
    <div class="import-flex"></div>
  </Modal>
  <AModal
    v-model:visible="brandModal.visibles"
    title="添加属性"
    centered
    destroy-on-close
    :confirm-loading="brandModal.confirmLoading"
    @ok="BrandsAdd"
    @cancel="BrandsCancel"
  >
    <div class="p-10">
      <AForm
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <AFormItem label="商品类别" name="brandName">
          <TreeSelect
            v-model:value="formState.brandName"
            style="width: 100%"
            :field-names="{ label: 'name', value: 'id' }"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择商品类别"
            allow-clear
            :showCheckedStrategy="SHOW_CHILD"
            tree-default-expand-all
            :tree-data="treeData"
          />
        </AFormItem>
        <AFormItem label="属性名称" name="brandLoGo">
          <AInput v-model:value="formState.brandLoGo" placeholder="请输入属性名称" />
        </AFormItem>
        <AFormItem label="属性值格式" name="radioGroup">
          <a-radio-group v-model:value="formState['radioGroup']">
            <a-radio value="1">文本</a-radio>
            <a-radio value="2">数值</a-radio>
          </a-radio-group>
        </AFormItem>
        <AFormItem name="attribute" label="设置属性值">
          <AInput v-model:value="formState.attribute" placeholder="请输入属性值" />
          <!-- <AInput v-model:value="formState.attribute" />
		  <AInput v-model:value="formState.attribute" /> -->
        </AFormItem>
        <AFormItem name="switch" label="是否启用">
          <a-switch v-model:checked="formState.switch" />
        </AFormItem>
        <!--v-model:file-list="fileList1"-->
      </AForm>
    </div>
  </AModal>
 </div>
</template>
<script lang="ts">
  import { useMessage } from '/@/hooks/web/useMessage'
  import CaseFilterForm from '/@/modules/GoodsModule/GoodsManage/component/CaseFilterForm.vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import EraSlotTable from '/@/components/EraSlotTable/EraSlotTable.vue'
  import { computed, defineComponent, reactive, ref } from 'vue'
  import {
    Table,
    Switch,
    Popconfirm,
    Radio,
    RadioGroup,
    Input,
    Select,
    Modal,
    TreeSelect,
    TreeSelectProps,
  } from 'ant-design-vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  // 查询条件
  // mock数据
  import { goodsAttributeSearch } from '/@/modules/GoodsModule/GoodsConfigation/CategoryAttribute/mock/mock'
  // 校验工具类
  import { VoUtils } from '@vocen/shared'
  // form 列表 编辑
  import EraColumnForm from '/@/components/EraColumnForm/EraColumnForm.vue'

  // 动态id
  import { buildUUID } from '/@/utils/uuid'

  // “属性值”数据集 格式
  interface attributeItem {
    value: string
    id: string
  }

  import AdminHttp from '/@/utils/http/adminHttp'
  import {
    categoryColumns,
    innerColumns,
    categoryThirdColumn,
    secondaryClassification,
    addRowAttributeData,
  } from '/@/modules/GoodsModule/GoodsConfigation/CategoryAttribute/mock/mock'
  import type { SelectProps } from 'ant-design-vue'
  import type { FormInstance } from 'ant-design-vue'
  import {
    VerticalAlignTopOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignBottomOutlined,
  } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'AttibuteManager',
    components: {
      CaseFilterForm,
      EraSwitchTable,
      TreeSelect,
      Table,
      Switch,
      VoPagination,
      Popconfirm,
      EraColumnForm,
      RadioGroup,
      Radio,
      Input,
      Select,
      Modal,
      VerticalAlignTopOutlined,
      ArrowUpOutlined,
      ArrowDownOutlined,
      VerticalAlignBottomOutlined,
      EraSlotTable,
    },

    setup() {
      //增加
      const { SHOW_CHILD } = TreeSelect
      const brandModal = reactive({
        visibles: false,
        title: '',
        currentItem: null,
        rejectReason: '',
        confirmLoading: false,
        currentId: '',
      })

      interface FormState {
        brandName: string | null
        brandLoGo: any
        radioGroup: any
        switch: any
        attribute: any
      }

      const formRef = ref<FormInstance>()
      const formState = reactive<FormState>({
        brandName: null,
        brandLoGo: '',
        radioGroup: '',
        switch: false,
        attribute: '',
      })
      const treeData = ref<TreeSelectProps['treeData']>([])
      const { createMessage } = useMessage()
      const childrenData = ref({})
      const nickHandler = (id, cid, flag = true) => {
        ///v1/goods/sku/property/query/list
        AdminHttp.goodsSkuPropertyQueryList({ categoryId: cid })
          .then((res) => {
            innerData.value = res.data
            childrenData.value[id] = childrenData.value[id].map((item) => {
              if (item.id === cid) {
                item.open = flag ? !item.open : item.open
                item.list = innerData.value
              }
              return item
            })
          })
          .catch((error) => {
            console.log('error===', error)
          })
      }
      const editModal = {
        id: '',
        isEnable: '',
        name: '',
        isRequired: '',
        value: '',
      }
      const contentCategoryContentEvent = async () => {
        const map = { name: '' }
        const { data } = await AdminHttp.goodsCategoryCategorySelect(map)
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
      const addAttBute = async (item) => {
        // 调用接口
        const result = await contentCategoryContentEvent()
        // 给options进行组装数据
        options.value = result

        brandModal.visibles = true
      }
      //确定
      const submitFilterFormEvent = (filterForm, rid, cid) => {
        console.log(filterForm.formData[4], 'formData')

        // filterForm.filter(item => {
        //   if(item.label === '商品类别') {
        //     editModal.id = item.id
        //   } else if
        // })
        // editModal.id = filterData.value[].id
        editModal.name = filterForm.formData[1].value
        editModal.isRequired = filterForm.formData[2].isRequire
        editModal.isEnable = filterForm.formData[4].isShow
        editModal.value = filterForm.formData[3].value
        console.log(editModal.isEnable, 'ssssss')

        AdminHttp.goodsParamPropertyUpdate(editModal)
          .then((res) => {
            console.log(res, '111dfasgbf ')

            loadTableData()
            nickHandler(rid, cid, false)
            console.log('222')
          })
          .catch((error) => {
            console.log('error===', error)
          })
      }
      const rowRender = (record) => {
        console.log(record, 'rowRender')
      }
      // onMounted(() => {
      //   initParameterData()
      // })
      // //初始/v1/goods/param/property/save
      // const initParameterData = () => {
      //   AdminHttp.goodsParamPropertyCategory()
      //     .then((res) => {
      //       categoryData.value = res.data.records.map((item) => {
      //         item['list'] = item.children
      //         delete item.children
      //         return item
      //       })
      //       // console.log(res.records, '111')
      //       console.log(categoryData.value, '属性列表')
      //     })
      //     .catch((error) => {
      //       console.log('error===', error)
      //     })
      // }
      const isShow = ref(false)
      const innerOpen = (expanded, record) => {
        console.log(categoryData, expanded)
        console.log(record)
        childrenData.value[record.id] = record.list.map((item) => {
          delete item.children
          return item
        })
      }
      const onFinish = (values: any) => {
        console.log('Success:', values)
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
      }
      // 是否显示"导入属性"
      const isImport = ref(false)
      // 弹框标题
      const modelTitle = ref('')
      // 商品类别
      const options = ref<SelectProps['options']>([])
      // 属性单位
      const attributeNum = ref(1)
      const editForm = ref()
      // 属性值格式 value
      let attributeValue = ref(0)
      // “属性内容”数据集
      let attributeArr = ref<attributeItem[]>([])

      let filterMap = ref()
      // "编辑属性"内容
      let editFormContent = ref()
      // “全部选中”的数据集
      const selectedRowKeys = ref([])
      // 是否显示全部删除
      const hasSelected = computed(() => selectedRowKeys.value.length > 0)
      const paginations = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      // 全部选中的事件
      const onSelectChange = (changeableRowKeys) => {
        console.log('selectedRowKeys changed: ', changeableRowKeys)
        selectedRowKeys.value = changeableRowKeys
      }
      // 批量删除
      const allDelete = () => {
        alert('批量删除')
      }
      // 导入属性
      const importAttribute = () => {
        isImport.value = true
      }
      // 添加属性
      const addAttribute = () => {
        modelTitle.value = '添加属性'
        editForm.value = addRowAttributeData

        editFormContent.value.isOpenAlertShow()
      }
      // 编辑“属性管理”的item编辑
      const editItem = async (record) => {
        // console.log(record, 'ssdsds')

        try {
          const data = await AdminHttp.goodsParamPropertyDetail({ id: record.id })
          console.log(data, 'data')
          editModal.id = data.data.id
          console.log(editModal.id, 'editModal.id ')
          secondaryClassification[0].value = data.data.categoryName
          secondaryClassification[1].value = data.data.name

          attributeValue.value = data.data.type

          isShow.value = data.data.isEnable
          attributeNum.value = data.data.unit

          // secondaryClassification[3].value = record.name
          attributeArr.value = []
          data.data.value.forEach((val) => {
            console.log('33333===', val)
            attributeArr.value.push({ value: val, id: buildUUID() })
          })
        } catch (err) {
          console.log(`列表失败:${err.message}`)
        } finally {
        }
        modelTitle.value = '编辑'
        editForm.value = secondaryClassification
        console.log(editForm.value, 'sssss')

        editFormContent.value.isOpenAlertShow()
      }
      // 删除“属性管理”的item
      const deleteAtrributeItem = (item) => {
        // /v1/goods/param/property/{id}
        console.log('确认删除====', item)

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        ///v1/goods/sku/property/{id}
        AdminHttp.goodsSkuProperty$id({ id: item.id })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }
      // 分页“效果”
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        loadTableData()
      }
      // 添加row属性
      const addRowAttribute = (item) => {
        console.log(item, 'ookok')
        modelTitle.value = '添加属性'
        editForm.value = addRowAttributeData
        console.log(addRowAttributeData, 'xx')
        editFormContent.value.isOpenAlertShow()
      }
      // 弹框“添加更多属性”
      const addMoreAttrValue = () => {
        const attrParam = {
          value: '',
          id: buildUUID(),
        }
        attributeArr.value.push(attrParam)
      }
      // 弹框“删除更多属性”
      const deleteAttriItem = (id) => {
        if (attributeArr.value.length === 1) {
          return false
        }
        attributeArr.value = attributeArr.value.filter((item) => {
          return item.id != id
        })
      }
      //添加属性/v1/goods/sku/property/save
      const BrandsAdd = () => {
        formRef.value
          .validate()
          .then((res) => {
            console.log(res, 'success')
            createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
            AdminHttp.goodsSkuPropertySave({
              categoryId: formState.brandName,
              isEnable: formState.switch,
              name: formState.brandLoGo,
              type: formState.radioGroup,
              value: [formState.attribute],
            })
              .then(() => {
                createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                // item.status = 1
                loadTableData()
                brandModal.visibles = false
                formState.brandName = ''
                formState.brandLoGo = ''
                formState.radioGroup = ''
                formState.switch = ''
                formState.attribute = ''
              })
              .catch((err) => {
                createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
              })
          })
          .catch((e) => {
            console.log(e, '校验不通过')
          })
      }
      // 弹框“上移”一位
      const moveUp = (Item) => {
        let currentIndex = attributeArr.value.findIndex((item) => {
          return item.id == Item.id
        })
        let templateValue = Item
        attributeArr.value[currentIndex] = attributeArr.value[currentIndex - 1]
        attributeArr.value[currentIndex - 1] = templateValue
      }
      // 弹框“下移”一位
      const moveDown = (Item) => {
        console.log(Item, '111111')

        let currentIndex = attributeArr.value.findIndex((item) => {
          return item.id == Item.id
        })
        console.log(currentIndex, 'currentIndex')
        let templateValue = Item
        attributeArr.value[currentIndex] = attributeArr.value[currentIndex + 1]
        attributeArr.value[currentIndex + 1] = templateValue
      }
      // Radio 切换事件
      const changeAttributeFormat = (item) => {}
      // 导入属性
      const handleOk = () => {
        isImport.value = true
      }
      const cancelOk = () => {
        isImport.value = false
      }
      const categoryData = ref([])
      const handlerFilterSubmit = ({ values }) => {
        // console.log({ values }, 'values')
        // filterData.value = values

        loadTableData()
      }

      const BrandsCancel = () => {
        brandModal.visibles = false
        formState.brandName = ''
        formState.brandLoGo = ''
        formState.radioGroup = ''
        formState.switch = ''
      }
      const handlerFilterRest = ({ values }) => {
        filterData.value = values
        loadTableData()
      }
      const loadingCtxkey = 'handlerRow'
      const filterData = ref()
      const innerData = ref([])
      const stateEnable = (record, rid, cid) => {
        console.log('9999')

        console.log(record, 'ssssss')

        const changeSwitchMap = {
          id: record.id,
          value: !record.isEnable,
        }
        AdminHttp.goodsParamPropertyForbidden(changeSwitchMap)
          .then((res) => {
            console.log(res, '11111')
            nickHandler(rid, cid, false)
          })
          .catch((error) => {
            console.log('error=', error)
          })
      }
      // /v1/goods/sku/property/query/category
      const loadTableData = async () => {
        try {
          const { data } = await AdminHttp.goodsSkuPropertyQueryCategory({
            pageNo: paginations.current,
            pageSize: paginations.pageSize,
          })
          const tableData = data.records
          paginations.total = data.total
          categoryData.value = tableData.map((item) => {
            item['list'] = item.children
            delete item.children
            return item
          })
        } catch (err) {
          console.log(`获属性列表失败:${err.message}`)
        } finally {
        }
      }
      console.log('11111')

      loadTableData()
      console.log('222222')

      return {
        contentCategoryContentEvent,
        onFinish,
        onFinishFailed,
        formState,
        brandModal,
        formRef,
        BrandsCancel,
        BrandsAdd,
        addAttBute,
        createMessage,
        editModal,
        filterMap,
        handlerFilterRest,
        submitFilterFormEvent,
        stateEnable,
        childrenData,
        nickHandler,
        innerData,
        SHOW_CHILD,
        innerOpen,
        rowRender,
        handlerFilterSubmit,
        categoryData,
        categoryColumns,
        innerColumns,
        categoryThirdColumn,
        goodsAttributeSearch,
        VoUtils,
        paginations,
        hasSelected,
        editFormContent,
        attributeValue,
        attributeArr,
        editForm,
        attributeNum,
        options,
        value: ref<string | undefined>(undefined),
        importTitle: ref('导入属性'),
        modelTitle,
        isImport,
        handleOk,
        cancelOk,
        changeAttributeFormat,
        moveUp,
        moveDown,
        addMoreAttrValue,
        deleteAttriItem,
        addRowAttribute,
        onSelectChange,
        allDelete,
        importAttribute,
        addAttribute,
        editItem,
        deleteAtrributeItem,
        paginationChange,
        isShow,
        loadingCtxkey,
        treeData,
      }
    },
  })
</script>
<style lang="less" scoped>
  .attribute-box {
    background-color: white;
  }

  .attribute-search {
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
  }

  .attribute-search__btn {
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
  }

  .space-right {
    margin-right: 10px;
  }

  .table-operations__button {
    margin-right: 8px;
  }

  .add-attribute {
    //color: #1abc9c;
  }

  ::v-deep(.ant-table-thead > tr > th) {
    position: relative;
    padding: 0;
    height: 39px;
  }

  .action-space {
    margin-right: 5px;
    color: #0960bd;
  }

  .action-triangle__space {
    margin-right: 10px;
  }

  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }

  .attribute-scroll {
    max-height: 180px;
    overflow-y: scroll;
    width: 400px;
  }

  .attribute-flex {
    display: flex;
    align-content: center;
    width: 350px;
    margin-bottom: 10px;

    .attribute-input {
      width: 158px;
    }

    .attibute-btn__area {
      width: 150px;
    }

    .attibute-btn__space {
      width: 50px;
      margin-left: 10px;
      color: #0960bd;
    }
  }

  .more-attribute {
    color: #0960bd;
  }

  .attribute-units {
    display: flex;
    margin-top: 15px;
    height: 32px;
    align-items: center;

    .attribute-units__label {
      width: 70px;
    }

    .attribute-units__value {
      width: 60px;
    }
  }

  .import-flex {
    width: 80%;
    margin-left: 10%;
    height: 93px;
    background-color: #fde6c8;

    .import-flex-title {
      color: #02ade6;
      font-size: 16px;
    }
  }

  .goods-box {
    background-color: white;
  }

  .all-built {
    display: flex;

    .built-handler {
      padding: 10px;
      margin-left: 40px;
    }

    .add-atrribute {
      padding: 10px;
      color: #0960bd;
      margin-left: 300px;
    }
  }
</style>
