<template>
  <div class="page-wrap">
    <ATabs v-model:activeKey="activeKey" type="card">
      <ATabsPane key="one" tab="操作日志" />
      <ATabsPane key="two" tab="登录日志" />
    </ATabs>
    <div class="page-containner">
      <div class="filter-form">
        <!--<ProblemForm />-->
        <UserFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>

      <div class="page-container">
        <EraSwitchTable>
          <template #title>
            <AButton class="table-operations__button" :disabled="!hasSelected" @click="deleteAll()"
              >批量删除
            </AButton>
          </template>
          <template #tableEdit>
            <div class="flex" style="align-items: center">
              <a-form layout="inline">
                <AFormItem label="清除日志" :label-col="{ span: 6 }">
                  <ASelect v-model:value="value1" :size="size" :options="options" />
                </AFormItem>
              </a-form>
              <AButton type="primary" class="table-operations__button" @click="addBrand()"
                >确定
              </AButton>
              <AButton type="primary" class="table-operations__button" @click="addBrand()" />
            </div>
          </template>
          <template #content>
            <ATable
              :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
              :loading="tableLoading"
              :columns="tabColumns"
              :data-source="tableData"
              :pagination="false"
              :rowKey="(record) => record.id"
              size="small"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'logoUrl'">
                  <!--@click="changeItem(record)"-->
                  <div class="rich-column">
                    <div class="rich-resource">
                      <FileUrlPrase :file-url="record.fileUrl" />
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
                <!-- 0 未审核 ，1 审核通过，2审核不通过，默认0 -->
                <template v-if="column.dataIndex === 'status'">
                  <span v-if="record.status === 0">待审核</span>
                  <span v-else-if="record.status === 1">审核通过</span>
                  <span v-else-if="record.status === 2">审核不通过</span>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <!--@click="releaseQuest"-->
                  <AButton type="link" class="submit-btn" @click="addBrand()">编辑</AButton>

                  <APopconfirm
                    title="确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerDeletedRow(record)"
                  >
                    <AButton type="link">删除</AButton>
                  </APopconfirm>
                  <APopconfirm
                    v-if="record.status === 0"
                    title="该操作将允许该问题在信息流中展示，确定操作吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerAccessRow(record)"
                  >
                    <AButton type="link">审核通过</AButton>
                  </APopconfirm>
                  <AButton v-if="record.status === 0" type="link" @click="openRejectDialog(record)"
                    >驳回
                  </AButton>

                  <AButton v-if="record.status === 1" type="link" @click="handlerDeletedRow(record)"
                    >删除
                  </AButton>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerDisabledRow(record)"
                    >下架
                  </AButton>
                  <AButton v-if="record.status === 2" type="link" @click="showRejectReason(record)"
                    >查看原因
                  </AButton>
                </template>
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
    </div>
    <AModal
      v-model:visible="brandModal.visible"
      :title="brandModal.title"
      centered
      destroy-on-close
      :confirm-loading="brandModal.confirmLoading"
      @ok="BrandsAdd"
    >
      <div class="p-10">
        <AForm
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 11 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <AFormItem
            label="品牌名称"
            name="brandName"
            :rules="[{ required: true, message: '请填写品牌名称' }]"
          >
            <AInput v-model:value="formState.brandName" />
          </AFormItem>
          <AFormItem
            label="品牌LoGo"
            name="brandLoGo"
            :rules="[{ required: true, message: '请填写品牌名称' }]"
          >
            <AInput v-model:value="formState.brandLoGo" />
          </AFormItem>
          <!-- <AFormItem
			label="品牌LoGo"
			name="brandLoGo"
			:rules="[{ required: false, message: '请上传LoGo' }]"
		  >
			<EraUpload
			  :maxSize="50"
			  :maxNumber="9"
			  :multiple="true"
			  :uploadParams="uploadCommonParams"
			  upload-tip="点击上传图片"
			  help-text="最多插入9张图片。"
			  @change="handleChange"
			  @done="handleDone"
			  @delete="handerUpDel"
			  @preview-delete="handerUpDelByPreview"
			  :accept="['jpg', 'jpeg', 'png']"
			  :api="uploadApi"
			/>
		  </AFormItem> -->
        </AForm>
      </div>
    </AModal>
    <AModal
      title="驳回原因"
      :zIndex="1001"
      v-model:visible="rejectModal.visible"
      :confirm-loading="rejectModal.confirmLoading"
      @ok="handlerRejectRow"
    >
      <div class="padding-10">
        <a-textarea
          v-model:value="rejectModal.rejectReason"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入驳回原因,该原因会通知作者"
          show-count
          maxlength="100"
        />
      </div>
    </AModal>

    <!-- <AModal width="800px" :title="detailModal.title" v-model:visible="detailModal.visible">
	  <div class="padding-15 fz-16">
		<div class="show-row">
		  <div class="show-row__label">问题</div>
		  <div class="show-row__content">{{ detailModal.vo.title }}</div>
		</div>
		<div class="show-row">
		  <div class="show-row__label">补充内容</div>
		  <div class="show-row__content">{{ detailModal.vo.content }}</div>
		</div>
		<div>
		  <FileUrlPrase height="80px" :file-url="detailModal.vo.fileUrl" />
		</div>
		<a-row>
		  <a-col :span="8">发布时间:{{ detailModal.vo.createTime }}</a-col>
		  <a-col :span="8">作者:{{ detailModal.vo.authorStr }}</a-col>
		  <a-col :span="8">发布人:{{ detailModal.vo.authorStr }}</a-col>
		</a-row>
	  </div>

	  <template #footer>
		<AButton v-if="detailModal.vo.status === 0" @click="handlerRejectRowByModal">驳回</AButton>
		<APopconfirm
		  v-if="detailModal.vo.status === 0"
		  title="该操作将允许该问题在信息流中展示，确定操作吗？"
		  ok-text="确定"
		  cancel-text="取消"
		  @confirm="handlerAccessRowByModal"
		>
		  <AButton type="primary" :loading="detailModal.confirmLoading">审核通过</AButton>
		</APopconfirm>
	  </template>
	</AModal> -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, computed } from 'vue'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import UserFilterForm from '/@/modules/JournalModule/view/LogModule/LogUser/component/UserFilterForm.vue'
  // import VideoFilterForm from '/@/modules/ContentModule/view/CircleManage/VideoManage/component/'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/JournalModule/view/LogModule/LogUser/data/UserContainerData'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { uploadFileFnByTencentCos } from '/@/api/sys/upload'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  import type { FormInstance } from 'ant-design-vue'
  //弹窗
  // “编辑” 或者 “新增” 标题
  // const modelTitle = ref<string>()
  // “编辑” 或者 “或者” 得标识  Edit：编辑； Add: 新增
  // enum alertEnum {
  //   Edit = '编辑',
  //   Add = '添加品牌',
  // }
  interface FormState {
    brandName: string
    brandLoGo: any
  }

  const formRef = ref<FormInstance>()
  const formState = reactive<FormState>({
    brandName: '',
    brandLoGo: '',
  })
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const uploadCommonParams = {}
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
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
  const handerUpDelByPreview = (url: string) => {
    console.log({ url })
  }
  const uploadApi = async (params) => {
    console.log('start up file')
    console.log(params)
    const url = await uploadFileFnByTencentCos(
      { file: params.file, data: { temporary: 0 } },
      onUploadProgress,
    )
      .then((res) => {
        return res.filePath
      })
      .catch((err) => {
        createMessage.error(`文件上传失败:${err.message}`)
        console.log(err)
        params.onError(err)
        // console.log(`文件上传失败:${err.message}`)
        // return 'https://img2.woyaogexing.com/2022/06/03/980e5fc2b7315cda!400x400.jpg'
        // params.onError()
      })
    if (url) params.onSuccess({ url }, params.file)
  }
  const onUploadProgress = function (evt) {
    // console.log(evt)
  }
  // 增加品牌
  const addBrand = () => {
    brandModal.title = '添加品牌'
    brandModal.visible = true
  }
  const handlerRejectRowByModal = () => {
    openRejectDialog(detailModal.vo)
  }
  const handleChange = () => {
    // console.log(info.file)
    // createMessage.info(`已上传文件444`)
    // createMessage.info(`已上传文件${JSON.stringify(list)}`)
  }
  const restDetailModel = () => {
    detailModal.currentId = ''
    detailModal.vo = {}
    detailModal.visible = false
  }

  const openDetailDialog = async (item) => {
    detailModal.title = '内容详情'
    detailModal.currentId = item.id

    adminHttp.COMMUNITY.communityContentQuestionGetOne({ id: item.id }).then((res) => {
      console.log(res)
      detailModal.vo = res.data
      detailModal.visible = true
    })
  }

  const handlerAccessRowByModal = () => {
    detailModal.confirmLoading = true
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentQuestionApproved({ id: detailModal.currentId })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        const currentRow = tableData.value.filter((item) => item.id === detailModal.currentId)[0]
        currentRow.status = 1

        //rest
        restDetailModel()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
      .finally(() => {
        detailModal.confirmLoading = false
      })
  }

  /** detail modal end **/

  /** easy action start (access,deleted,disabled) **/
  const handleDone = (info) => {
    console.log(info.file)
    const url: string = info.file.response.url
    // if (resrouceType.value === 'img') {
    //   imgs.value.push(url)
    // } else {
    //   video.value = url
    // }
    // createMessage.info(`已上传文件444`)
    // createMessage.info(`已上传文件${JSON.stringify(list)}`)
  }
  const handlerAccessRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentQuestionApproved({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        item.status = 1
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
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
  const handlerDisabledRow = (item) => {
    alert('删除===' + item)
  }
  const handerUpDel = (record) => {
    console.log({
      record,
    })
  }

  const showRejectReason = (item) => {
    alert('删除===' + item)
  }
  /** easy action end **/

  /** reject action start **/
  const rejectModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })

  const openRejectDialog = (item) => {
    rejectModal.currentItem = { ...item }
    rejectModal.currentId = item.id
    rejectModal.rejectReason = ''
    rejectModal.visible = true
  }

  const restRejectModal = () => {
    rejectModal.visible = false
    rejectModal.currentItem = null
    rejectModal.rejectReason = ''
  }
  const handlerRejectRow = () => {
    try {
      if (!rejectModal.rejectReason) {
        throw Error('拒绝内容必填')
      }
      rejectModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      adminHttp.COMMUNITY.communityContentQuestionReject({
        id: rejectModal.currentId,
        reason: rejectModal.rejectReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })

      const currentRow = tableData.value.filter((item) => item.id === rejectModal.currentId)[0]
      currentRow.status = 2

      //rest modal data
      restRejectModal()

      //rest
      restDetailModel()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      rejectModal.confirmLoading = false
    }
  }
  /** reject action end **/

  const activeKey = ref('one')

  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
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
    loadTableData()
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
    const { records, total } = await adminHttp
      .goodsBranchQueryPage(clearObjectUnalbeAttr(filterParams))
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取品牌列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
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
  const state = reactive<{ selectedRowKeys: Key[] }>({
    selectedRowKeys: [], // Check here to configure the default column
  })
  const deleteAll = () => {
    // ajax request after empty completing

    alert('批量删除')
    state.selectedRowKeys = []
  }
  const hasSelected = computed(() => state.selectedRowKeys.length > 0)
  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    state.selectedRowKeys = selectedRowKeys
  }
  //添加品牌
  const BrandsAdd = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsBrandSave({ licenseId: 123, name: res.brandName, logoUrl: res.brandName })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
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
    margin: 10px;
  }
</style>
