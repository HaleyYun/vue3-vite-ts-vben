<template>
  <div class="m-24px">
    <div class="bg-white my-24px bg-white p-24px pb-4px">
      <!--<ProblemForm />-->
      <BrandFilterForm
        @rest="handlerFilterRest"
        @submit="handlerFilterSubmit"
        :currentTabIndex="activeKey"
      />
    </div>
    <div class="p-24px bg-white">
      <div class="flex justify-between mb-24px">
        <div>
          <AButton
            v-auth="'/v1/goods/brand/delete/batch'"
            :disabled="!hasSelected"
            class="mr-15px"
            @click="deleteAll"
            >批量删除
          </AButton>

          <AButton
            v-auth="'/v1/goods/brand/save'"
            type="primary"
            @click="addBrand(record, alertEnum.Add)"
            >添加新品牌
          </AButton>
        </div>
        <span class="text-gray-500"
          >小贴士：当品牌下还没有商品的时候，买家端分类页的品牌区将不会显示该品牌。</span
        >
      </div>
      <div>
        <div>
          <EraTableTitle :total="paginations.total" />
          <ATable
            v-if="tableData.length"
            :row-selection="{
              selectedRowKeys: state.selectedRowKeys,
              onChange: onSelectChange,
              getCheckboxProps: getCheckboxProps,
            }"
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            :rowKey="(record) => record.id"
            size="small"
            bordered
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'logoUrl'">
                <!--@click="changeItem(record)"-->
                <div class="rich-column">
                  <div class="rich-resource">
                    <a-image style="width: 80px" :src="record.logoUrl" />
                    <FileUrlPrase v-if="false" :file-url="record.logoUrl" />
                  </div>
                  <div class="rich-content"></div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'isEnable'">
                <!--@click="changeItem(record)"-->
                <ASwitch
                  @change="stateEnable(record)"
                  :checked="record.isEnable"
                  checked-children="开"
                  un-checked-children="关"
                />
              </template>
              <template v-if="column.dataIndex === 'isHot'">
                <!--@click="changeItem(record)"-->
                <ASwitch
                  @change="statesHot(record)"
                  :checked="record.isHot"
                  checked-children="开"
                  un-checked-children="关"
                />
              </template>
              <!-- 0 未审核 ，1 审核通过，2审核不通过，默认0 -->
              <!--<template v-if="column.dataIndex === 'status'">-->
              <!--  <span v-if="record.status === 0">待审核</span>-->
              <!--  <span v-else-if="record.status === 1">审核通过</span>-->
              <!--  <span v-else-if="record.status === 2">审核不通过</span>-->
              <!--</template>-->
              <template v-if="column.dataIndex === 'operation'">
                <!--@click="releaseQuest"-->
                <AButton
                  v-auth="'/v1/goods/brand/update'"
                  type="link"
                  class="submit-btn"
                  @click="addBrand(record, alertEnum.Edit)"
                  >编辑
                </AButton>
                <template v-if="record.isAllowDelete == 0">
                  <a-tooltip>
                    <template #title>有商品或模板在使用，无法删除</template>
                    <AButton
                      v-auth="'/v1/goods/brand/delete/batch'"
                      type="link"
                      :disabled="record.isAllowDelete == 0"
                      >删除
                    </AButton>
                  </a-tooltip>
                </template>
                <template v-else>
                  <APopconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerDeletedRow(record)"
                  >
                    <AButton v-auth="'/v1/goods/brand/delete/batch'" type="link">删除</AButton>
                  </APopconfirm>
                </template>
              </template>
            </template>
          </ATable>
        </div>
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
    <AModal
      v-model:visible="brandModal.visible"
      :title="brandModal.title"
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
        >
          <AFormItem
            label="品牌名称"
            name="brandName"
            :rules="[{ required: true, message: '请填写品牌名称' }]"
          >
            <AInput
              v-model:value="formState.brandName"
              :maxlength="50"
              placeholder="请输入品牌名称"
              show-count
              allow-clear
            />
          </AFormItem>
          <AFormItem
            label="品牌logo"
            name="brandLoGo"
            :rules="[{ required: true, message: '请上传LoGo', trigger: 'blur,change' }]"
          >
            <div class="flex">
              <FormLocalUpload
                :limit="2"
                :accept="'image/jpg,image/jpeg'"
                v-model:value="formState.brandLoGo"
              />
            </div>
            <div class="text-gray-400">仅支持JPG,JPGE格式，尺寸800*800，大小在2M以内图片</div>
          </AFormItem>
          <!--v-model:file-list="fileList1"-->
        </AForm>
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, computed, createVNode } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import BrandFilterForm from '/@/modules/GoodsModule/GoodsBrand/component/BrandFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/GoodsModule/GoodsBrand/data/BrandListContainerData'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import FormLocalUpload from '/@/modules/components/FormLocalUpload.vue'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  enum alertEnum {
    Edit = '编辑品牌',
    Add = '添加品牌',
  }

  interface FormState {
    brandName: string
    brandLoGo: any
  }

  // 获取 imgPath 的路径
  let imgPath = ref('')
  const formRef = ref<any>()
  const formState = reactive<FormState>({
    brandName: '',
    brandLoGo: '',
  })

  //增加
  const brandModal = reactive({
    visible: false,
    title: '',
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  let editBrand = {
    id: '',
    name: '',
  }
  // 修改
  const addBrand = async (record, title) => {
    if (title == alertEnum.Add) {
      brandModal.title = title
      brandModal.visible = true
    } else {
      brandModal.title = title
      brandModal.visible = true
      const data = await adminHttp.goodsBrand$id({ id: record.id })

      formState.brandName = data.data.name
      formState.brandLoGo = data.data.logoUrl
      editBrand.id = data.data.id
    }
  }

  // /v1/goods/brand/batch
  // //删除列表o
  const handlerDeletedRow = (item) => {
    // alert('删除===' + item)
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsBrandBatch({ ids: [item.id] })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        // item.status = 1
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  /** reject action end **/

  const activeKey = ref('one')

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values

    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    filterData.value = values
    loadTableData()
  }

  // table 列
  const tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  watch(activeKey, async () => {
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    await loadTableData()
  })

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  const statusAttrs = { one: 0, two: 1, three: 2 }
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      status: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { data } = await adminHttp.goodsBranchQueryPage(clearObjectUnalbeAttr(filterParams))
    tableLoading.value = false
    paginations.total = data.total
    tableData.value = data.records
  }
  //启用状态
  const stateEnable = (record) => {
    const changeSwitchMap = {
      idList: [record.id],
      isEnable: !record.isEnable,
    }
    adminHttp
      .goodsBrandStatusUpdate(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //是否热门/v1/goods/brand/hot/update
  const statesHot = (record) => {
    const changeSwitchMap = {
      idList: [record.id],
      isEnable: !record.isHot,
    }
    adminHttp
      .goodsBrandHotUpdate(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  const state = reactive<{ selectedRowKeys: [] }>({
    selectedRowKeys: [], // Check here to configure the default column
  })
  const deleteAll = () => {
    Modal.confirm({
      title: '确认删除',
      icon: createVNode(ExclamationCircleOutlined),
      content: `共${state.selectedRowKeys.length}条数据被选中，确定要删除吗？`,
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            adminHttp
              .goodsBrandBatch({
                ids: state.selectedRowKeys,
              })
              .then(({ code }) => {
                if (+code === 20001) {
                  createMessage.success('删除成功')
                  loadTableData()
                  state.selectedRowKeys = []
                  // 本地模拟删除数据
                  // delTableDataLocal(batchSelectedRowKeys.value)
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
    // createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    // adminHttp
    //   .goodsBrandBatch({ ids: state.selectedRowKeys })
    //   .then(() => {
    //     createMessage.success({ content: `操作成功`, key: loadingCtxkey })
    //     loadTableData()
    //   })
    //   .catch((err) => {
    //     createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
    //   })
    // state.selectedRowKeys = []
  }
  const hasSelected = computed(() => state.selectedRowKeys.length > 0)
  const onSelectChange = (selectedRowKeys: []) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  const getCheckboxProps = (record) => ({ disabled: record.isAllowDelete == 0 })
  //添加品牌
  const BrandsAdd = () => {
    if (brandModal.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then((res) => {
          adminHttp
            .goodsBrandSave({ name: res.brandName, logoUrl: formState.brandLoGo })
            .then(({ code }) => {
              if (code == '20001') {
                createMessage.success({ content: `操作成功`, key: loadingCtxkey })
                loadTableData()
                brandModal.visible = false
                formState.brandName = ''
                formState.brandLoGo = ''
              }
            })
            .catch((err) => {
              createMessage.error({ content: `${err.message}`, key: loadingCtxkey })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      // 编辑
      editBrand.name = formState.brandName
      if (!imgPath.value) {
        if (formState.brandLoGo) {
          imgPath.value = formState.brandLoGo
        } else {
          createMessage.info('上传图片不能为空')
          return false
        }
      }
      editBrand['logoUrl'] = imgPath.value
      // const data = adminHttp.goodsBrand({ id: record.id })
      formRef.value.validate().then(async (res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsBrandUpdate(editBrand)
          .then(({ code }) => {
            if (+code === 20001) {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              // item.status = 1
              loadTableData()
              brandModal.visible = false
              formState.brandName = ''
              formState.brandLoGo = ''
            }
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
    }
  }
  const BrandsCancel = () => {
    brandModal.visible = false
    formState.brandName = ''
    formState.brandLoGo = ''
  }
  loadTableData()
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }

  .rich-column {
    display: flex;

    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
    }

    .rich-content {
    }
  }

  .show-row {
    margin-bottom: 10px;

    &__label {
      color: #555;
    }

    &__content {
      color: #000;
    }
  }

  .table-operations__button {
    margin: 15px 15px 0 15px;
  }
</style>
