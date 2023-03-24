<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
    <div class="m-24px mt-72px">
      <div class="bg-white p-24px pb-4px mb-24px">
        <!--<ProblemForm />-->
        <CaseFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="bg-white p-24px">
        <EraTableTitle :total="paginations.total">
          <template #tableEdit>
            <AButton
              type="primary"
              v-if="activeKey != 'three'"
              :disabled="selectedRow.length == 0"
              class="mr-10px"
              @click="batchRelease"
              >批量发布
            </AButton>
            <AButton
              type="primary"
              v-if="activeKey == 'three'"
              :disabled="selectedRow.length == 0"
              class="mr-10px"
              @click="batchCanceling"
              >批量取消发布
            </AButton>
            <AButton
              type="primary"
              v-if="activeKey != 'three'"
              :disabled="selectedRow.length == 0"
              class="mr-10px"
              @click="batchDelete"
              >批量删除
            </AButton>
            <AButton type="primary" class="title-strip-sort" @click="addButton">添加模板</AButton>
          </template>
        </EraTableTitle>
        <div>
          <ATable
            :loading="tableLoading"
            :row-selection="rowSelection"
            :rowKey="(record) => record.id"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            size="small"
            bordered
            :scroll="{ x: 1200 }"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, text, record }">
              <!--发布状态，0：待发布，1：已发布，2：已取消发布priceCap -->
              <template v-if="column.dataIndex === 'priceCap'">
                <div class="rich-column">
                  <div class="rich-content"
                    >￥{{ record.priceFloor }}——￥{{ record.priceCap }}
                  </div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'codeList'">
                <AButton v-auth="'/v1/goods/template/update'" type="link" @click="stepEdit(record)">修改</AButton>
                <AButton v-auth="'/v1/goods/template/profit'" type="link" @click="openPg(record)">设置分润</AButton>
                <AButton v-auth="'/v1/goods/template/detail'" type="link" @click="stepDetails(record)">查看详情</AButton>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <!-- 1：已发布  0：待发布  2：已取消发布-->
                <span v-if="record.status === '0'">待发布</span>
                <span v-else-if="record.status === '1'">已发布</span>
                <span v-else-if="record.status === '2'">已取消发布</span>
              </template>

              <template v-if="column.dataIndex === 'operation'">
                <!--@click="releaseQuest"-->
                <APopconfirm
                  title="确定要发布吗？发布后该模版将公开到平台。"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handlerAccessRow(record, 'single')"
                >
                  <AButton v-auth="'/v1/goods/template/publish'" v-if="record.status === '0' || record.status === '2'" type="link"
                    >发布
                  </AButton>
                </APopconfirm>

                <APopconfirm
                  title="确定要取消发布吗？取消发布后，客户将无法再使用该模版。"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="cancelRelease(record, 'single')"
                >
                  <AButton v-auth="'/v1/goods/template/unpublish'" v-if="record.status === '1'" type="link">取消发布</AButton>
                </APopconfirm>
                <APopconfirm
                  title="确定要删除吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="deleteStep(record, 'single')"
                >
                  <AButton v-auth="'/v1/goods/template/delete/batch'" type="link">删除</AButton>
                </APopconfirm>
              </template>
            </template>
          </ATable>
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
    </div>

    <AModal
      :title="batchModal.title"
      :zIndex="1001"
      v-model:visible="batchModal.visible"
      :confirm-loading="batchModal.confirmLoading"
      @ok="batchOK"
    >
      <div class="p-40px">
        {{ batchModal.content }}
      </div>
    </AModal>
  </div>
  <VoBenefit
          @finish="profitFinish"
          title="设置分润信息"
          :goodsName="benefitModel.benefitName"
          :profit-Share="benefitModel.profitShare"
          :props-data="benefitModel.profitData"
          v-model:visible="benefitModel.benefitVisible"
  />
 </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, nextTick, toRaw,onBeforeMount } from 'vue'
  import CaseFilterForm from '/@/modules/GoodsModule/GoodsManage/view/GoodsCase/component/CaseFilterForm.vue'

  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/GoodsModule/GoodsManage/view/GoodsCase/data/GoodsCaseListContainerData'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useGo } from '/@/hooks/web/usePage'
  import { PageEnum } from '/@/enums/pageEnum'
  import VoBenefit from '/@/components/VoBenefit/VoBenefit.vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  // import { nextTick } from 'process'
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  const go = useGo()

  let resultData = ref([])
  const stepEdit = (row) => {
    // console.log(row, 'xx')
    go({
      path: PageEnum.GOOD_DRAFT,
      query: {
        id: row.id,
        edit: 1,
        categoryId: row.categoryId,
        categoryName: row.categoryName,
        type: 'show',
        from: 1,
      },
    })
  }
  const voBeneFitRef = ref()
  const addButton = () => {
    go(PageEnum.GOOD_ADD)
  }
  // 进入【查看详情】
  const stepDetails = (row) => {
    go({ path: PageEnum.GOOD_DETA, query: { id: row.id } })
  }
  const benefitModel = reactive({
    benefitVisible:false,
    benefitName:'',
    id:null,
    profitShare:[],
    profitData:[]
  })
  const openPg = (item) => {
    benefitModel.benefitName = item.name;
    benefitModel.id = item.id;
    adminHttp.goodsTemplateProfitGet({ id: item.id }).then((res) => {
      benefitModel.profitData = res.data.map((item) => {
        return {
          ...item,
          isRequired: true,
        }
      })
      benefitModel.profitShare = res.data;
      nextTick(() => {
        benefitModel.benefitVisible = true
      })
    })
  }
  const profitFinish = async (data)=>{
     console.log(data)
    try {
      const {code} = await adminHttp.goodsTemplateProfit({ tempLateId: benefitModel.id, shareProfit: data })
      if (+code === 20001) {
        createMessage.success('设置成功')
      }
    }catch (e) {

    }
  }
  // ---------批量操作--------

  const selectedRow = ref([])
  // 全选
  const rowSelection = {
    onChange: (selectedRowKeys: string[], selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      selectedRow.value = selectedRowKeys
    },
  }
  const batchModal = reactive({
    title: '',
    visible: false,
    confirmLoading: false,
    content: '',
    type: 1, // 1批量发布 2批量取消发布 3批量删除
  })
  // 批量发布
  const batchRelease = () => {
    batchModal.title = '确认发布'
    batchModal.content = `共${selectedRow.value.length}条数据被选中，确定要发布吗？发布后这些模版将会在平台公开`
    batchModal.type = 1
    batchModal.visible = true
  }
  // 批量取消发布
  const batchCanceling = () => {
    batchModal.title = '确认取消发布'
    batchModal.content = `共${selectedRow.value.length}条数据被选中，确定要取消发布吗？取消发布后用户将无法再使用这些模版`
    batchModal.type = 2
    batchModal.visible = true
  }
  // 批量删除
  const batchDelete = () => {
    batchModal.title = '确认删除'
    batchModal.content = `共${selectedRow.value.length}条数据被选中，确定要删除吗？`
    batchModal.type = 3
    batchModal.visible = true
  }
  const batchOK = () => {
    switch (batchModal.type) {
      case 1:
        handlerAccessRow(null, 'all')
        break
      case 2:
        cancelRelease(null, 'all')
        break
      case 3:
        deleteStep(null, 'all')
        break
    }
  }

  /** detail modal start **/

  //bai   goods/template/delete/batch
  // 删除操作接口
  const deleteStep = (record, type) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp
      .goodsTemplateDeleteBatch({ ids: type == 'single' ? [record.id] : selectedRow.value })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        initData()
        if (type == 'all') {
          batchModal.visible = false
        }
        // item.status = 1
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  // 取消发布操作接口
  const cancelRelease = (item, type) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    let params = { ids: type == 'single' ? [item.id] : selectedRow.value }
    adminHttp
      .goodsTemplateUnPublish(params)
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        initData()
        batchModal.visible = false
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  // 发布操作接口
  const handlerAccessRow = async (item, type) => {
    // console.log(item, '000990909090090')
    const changeSwitchMap = {
      ids: type == 'single' ? [item.id] : selectedRow.value,
    }
    try {
      const { code, data } = await adminHttp.goodsTemplatePublish(changeSwitchMap)
      if (code === '20001') {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        initData()
        batchModal.visible = false
      }
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }

  const activeKey = ref('one')

  const filterData = ref({})
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    paginations.current = 1
    const v = toRaw(values)
    const cid = toRaw(v.categoryIds)
    // console.log(cid, 'xx')

    filterData.value = {
      ...values,
      categoryIds: cid ? [cid[1]] : [],
    }
    loadTableData()
  }

  // table 列
  let tableData = ref([])
  const tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })
  const tabsList = ref([
    { key: 'one', name: '全部模板', totalCount: 0 },
    { key: 'two', name: '待发布', totalCount: 0 },
    { key: 'three', name: '已发布', totalCount: 0 },
    { key: 'four', name: '已取消发布', totalCount: 0 },
  ])
  const tabsChange = (key) => {
    activeKey.value = key
    paginations.current = 1
    paginations.pageSize = 10
    filterData.value = {}
    loadTableData()
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  // 排序
  const handleTableChange = (pagination, filters, sorter) => {
    filterData.value.orderProperty = sorter.field
    filterData.value.orderType = sorter.order == 'ascend' ? 'ASC' : 'DESC'
    loadTableData()
  }
  //  1：已发布  0：待发布  2：已取消发布
  const statusAttrs = { two: 0, three: 1, four: 2 }

  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      status: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
    }
    const { records, total } = await adminHttp
      .goodsTemplateList(filterParams)
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.warn(`获取模板列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }
  const goodsCount = async ()=>{
    try {
      const {code,data} = await adminHttp.GOODS.goodsTemplateCount();
      if(code == '20001'){
        console.log(data)
        tabsList.value[0]['totalCount'] = data.total;
        tabsList.value[1]['totalCount'] = data.unPublish;
        tabsList.value[2]['totalCount'] = data.published;
        tabsList.value[3]['totalCount'] = data.cancel;
      }
    }catch (e) {
      console.log(e)
    }
  }

  const handleParamAttribute = async () => {
    await adminHttp
  }
  const initData = async ()=>{
    await goodsCount()
    loadTableData()
  }
  onMountedOrActivated(()=>{
    initData()
  })
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
</style>
