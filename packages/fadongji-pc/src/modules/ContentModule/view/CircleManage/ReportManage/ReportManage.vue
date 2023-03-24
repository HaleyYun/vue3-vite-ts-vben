<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <ReportFilterForm
        @rest="handlerFilterRest"
        @submit="handlerFilterSubmit"
        :currentTabIndex="activeKey"
      />
    </div>
    <div class="p-24px bg-white">
      <EraSwitchTable :total="paginations.total">
        <template #tableEdit> </template>
        <template #content>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            :rowKey="(record) => record.id"
            :scroll="{ y: 1200 }"
            size="small"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'reason'">
                <span v-if="record.reason != null">{{ record.reason }}</span>
                <span v-else>/</span>
              </template>
              <template v-if="column.dataIndex === 'businessType'">
                <!-- : 0 问答，1 想法，2 视频，3 回答，4 评论 -->
                <span v-if="record.businessType === 0">问答</span>
                <span v-else-if="record.businessType === 1">想法</span>
                <span v-else-if="record.businessType === 2">视频</span>
                <span v-else-if="record.businessType === 3">回答</span>
                <span v-else-if="record.businessType === 4">评论</span>
              </template>
              <template v-if="column.dataIndex === 'nickName'">
                <!--@click="changeItem(record)"-->
                <span>{{ record.nickName }}</span> /<span>{{ record.mobile }}</span>
              </template>
              <template v-if="column.dataIndex === 'tipOffNickName'">
                <!--@click="changeItem(record)"-->
                <span>{{ record.tipOffNickName }}</span> /<span>{{ record.tipOffMobile }}</span>
              </template>
              <!-- 0 未审核 ，1 审核通过，2审核不通过-->
              <template v-if="column.dataIndex === 'status'">
                <span v-if="record.status === '0'">待审核</span>
                <span v-else-if="record.status === '1'">已通过</span>
                <span v-else-if="record.status === '2'">已驳回</span>
              </template>
              <template v-if="column.dataIndex === 'title'">
                <div v-if="record?.contentInfo?.businessType === 3">
                  <div
                    v-if="record.businessType === 4"
                    class="truncate ..."
                    v-html="JSON.parse(record?.contentInfo?.title).json"
                  ></div>
                  <div v-else-if="record.businessType === 3">
                    <AButton @click="openDetailAnswer(record)" type="link">查看详情</AButton>
                  </div>
                </div>
                <div v-else-if="record?.contentInfo?.businessType === 4">
                  <div
                    class="truncate ..."
                    v-html="JSON.parse(record?.contentInfo?.title).json"
                  ></div>
                </div>
                <div v-else-if="record?.contentInfo?.businessType === 1 ||record?.contentInfo?.businessType === 0">
                  <div
                    v-if="record?.contentInfo?.content"
                    class="truncate ..."
                    v-html="record?.contentInfo?.content"
                  ></div>
                  <div v-if="record?.contentInfo?.fileUrl">
                    <div class="flex items-center">
                      <div
                        class="mt-10px"
                        v-for="(item, index) in  record?.contentInfo?.fileUrl?.split('|')"
                      >
                        <EraContent :key="index" :source="item" :title="null" :content="null" />
                      </div>
                    </div>
      
                  </div>
                </div>
                <div v-else-if="record?.contentInfo?.businessType === 0">
                  <div
                    v-if="record?.contentInfo?.content"
                    class="truncate ..."
                    v-html="record?.contentInfo?.content"
                  ></div>
                  <div v-if="record?.contentInfo?.fileUrl">
                    <VoContent
                      :source="
                        record?.contentInfo?.fileUrl?.split(
                          checkSplitType(record?.contentInfo?.fileUrl),
                        )[0]
                      "
                      :poster="
                        record?.contentInfo?.fileUrl?.split(
                          checkSplitType(record?.contentInfo?.fileUrl),
                        )[1]
                      "
                      :title="null"
                      :content="null"
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="truncate ..." v-html="record?.contentInfo?.title"></div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'operation'">
                <AButton
                  type="link"
                  @click="openDetailDialog(record)"
                  v-auth="'/v1/community/content/tipoff/detail'"
                  >查看详情</AButton
                >
                <!-- </template> -->
                <AButton
                  type="link"
                  v-if="record.status === '0'"
                  @click="handlerAccessRow(record)"
                  v-auth="'/v1/community/content/tipoff/approved'"
                  >审核通过</AButton
                >
                <AButton
                  v-if="record.status === '0'"
                  type="link"
                  @click="openRejectDialog(record)"
                  v-auth="'/v1/community/content/tipoff/reject'"
                  >驳回</AButton
                >
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
          :auto-size="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入驳回原因,该原因会通知作者"
          show-count:maxlength="100"
        />
      </div>
    </AModal>
    <AModal
      title="通过原因"
      :zIndex="1001"
      v-model:visible="adopt.visible"
      :confirm-loading="adopt.confirmLoading"
      @ok="handlerRejectAdopt"
    >
      <div class="padding-10">
        <a-textarea
          v-model:value="adopt.rejectReason"
          :auto-size="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入审核通过原因，该原因会通知给作者"
          show-count:maxlength="100"
        />
      </div>
    </AModal>
    <AModal
      width="1000px"
      :title="detailModal.title"
      v-model:visible="detailModal.visible"
      :footer="null"
    >
      <div class="p-10">
        <a-descriptions bordered>
          <a-descriptions-item label="举报原因" :span="3">{{
            detailModal.vo?.content
          }}</a-descriptions-item>
          <a-descriptions-item :span="2" label="举报时间">{{
            detailModal.vo?.createTime
          }}</a-descriptions-item>
          <a-descriptions-item label="举报人">{{ detailModal.vo.nickName }}</a-descriptions-item>
          <!-- : 0 问答，1 想法，2 视频，3 回答，4 评论 -->
          <a-descriptions-item label="被举报内容" :span="3">
            <!-- {{ JSON.parse(detailModal.vo?.contentInfo?.title).json }} -->
            <!-- <div v-html="JSON.parse(detailModal.vo?.contentInfo?.title).json"></div> -->
            <div v-if="detailModal.vo?.contentInfo?.businessType === 3">
              <AButton @click="openDetailAnswer(detailModal.vo)" type="link">查看详情</AButton>
            </div>
            <div v-else-if="detailModal.vo?.contentInfo?.businessType === 4">
              <div v-html="JSON.parse(detailModal.vo?.contentInfo?.title).json"></div>
            </div>
            <div
              v-else-if="
                detailModal.vo?.contentInfo?.businessType === 1 ||
                detailModal.vo?.contentInfo?.businessType === 0
              "
            >
            <div v-if="detailModal.vo?.contentInfo?.title">标题:<span v-html="detailModal.vo?.contentInfo?.title"></span></div>
              <div v-html="detailModal.vo?.contentInfo?.content"></div>
              <div class="flex items-center">
                <div
                  class="mt-10px"
                  v-for="(item, index) in detail?.contentInfo?.fileUrl?.split('|')"
                >
                  <EraContent :key="index" :source="item" :title="null" :content="null" />
                </div>
              </div>
            </div>
            <div v-else>
              <div v-html="detailModal.vo?.contentInfo?.title"></div>
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="被举报人">
            {{ detailModal.vo?.tipOffNickName }}
          </a-descriptions-item>
          <a-descriptions-item label="内容类型">
            <span v-if="detailModal.vo.businessType === 0">问答</span>
            <span v-if="detailModal.vo.businessType === 1">想法</span>
            <span v-if="detailModal.vo.businessType === 2">视频</span>
            <span v-if="detailModal.vo.businessType === 3">回答</span>
            <span v-if="detailModal.vo.businessType === 4">评论</span>
          </a-descriptions-item>
        </a-descriptions>
        <div class="my-10" v-if="detailModal.vo.status === '1' || detailModal.vo.status === '2'">
          <a-descriptions title="处理内容" :column="1" size="middle">
            <a-descriptions-item label="结果">{{ detailModal.vo?.reason }}</a-descriptions-item>
            <a-descriptions-item label="处理人"
              >{{ detail?.reviewerNickName }}/{{ detail?.reviewerMobile }}</a-descriptions-item
            >
            <a-descriptions-item label="处理时间">
              {{ detailModal.vo?.updateTime }}</a-descriptions-item
            >
          </a-descriptions>
        </div>
      </div>
    </AModal>
    <AModal
      width="1200px"
      :title="detailAnswer.title"
      v-model:visible="detailAnswer.visible"
      :footer="null"
      :zIndex="1000"
    >
      <div class="p-10">
        <EraEditor :height="400" :width="500" ref="VoWangEditorRef" />
      </div>
    </AModal>
  </div>
 </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  // import VideoFilterForm from './component/VideoFilterForm.vue'
  import ReportFilterForm from '/@/modules/ContentModule/view/CircleManage/ReportManage/component/ReportFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import VoContent from '/@/components/VoContent/VoContent.vue'
  import EraContent from '/@/components/EraContent/EraContent.vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/ContentModule/view/CircleManage/ReportManage/data/ReportListContainerData'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  /** detail modal start **/
  const detail = ref<any>()
  const detailModal = reactive({
    title: '举报详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
  const detailAnswer = reactive({
    title: '举报详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })

  const VoWangEditorRef = ref()
  ///v1/community/content/tipoff/detail
  const openDetailDialog = async (item) => {
    detailModal.currentId = item.id
    detailModal.vo = item
    const { code, data } = await adminHttp.COMMUNITY.communityContentTipoffDetail({ id: item.id })
    if (+code === 20001) {
      if (data) {
        detail.value = data
      }
    }
    detailModal.visible = true
  }
  const openDetailAnswer = (item) => {
    // detailModal.currentId = item.id
    // detailModal.vo = item
    // const { code, data } = await adminHttp.COMMUNITY.communityContentTipoffDetail({ id: item.id })
    // if (+code === 20001) {
    //   if (data) {
    //     detail.value = data
    setTimeout(() => {
      VoWangEditorRef.value?.setHtml(JSON.parse(item.contentInfo.content).json)
    }, 300)

    //   }
    // }
    detailAnswer.visible = true
  }
  /** detail modal end **/
  const handlerAccessRow = (item) => {
    adopt.visible = true
    adopt.currentId = item.id
  }
  /** 审核通过 /v1/community/content/tipoff/approved **/
  const handlerRejectAdopt = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentTipoffApproved({
      id: adopt.currentId,
      reason: adopt.rejectReason,
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        item.status = 1
        adopt.visible = false
        loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }

  const adopt = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
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
  //驳回/v1/community/content/tipoff/reject
  const handlerRejectRow = async () => {
    try {
      if (!rejectModal.rejectReason) {
        throw Error('拒绝内容必填')
      }
      rejectModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentTipoffReject({
        id: rejectModal.currentId,
        reason: rejectModal.rejectReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })

      const currentRow = tableData.value.filter((item) => item.id === rejectModal.currentId)[0]
      currentRow.status = 2
      restRejectModal()
      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      rejectModal.confirmLoading = false
    }
  }
  /** reject action end **/

  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '待审核' },
    { key: 'two', name: '已通过' },
    { key: 'three', name: '已驳回' },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.current = 1
    paginations.pageSize = 10

    loadTableData()
  }
  const filterData = ref()
  const handlerFilterRest = ({ values }) => {
    filterData.value = values
    loadTableData()
  }
  const handlerFilterSubmit = ({ values }) => {
    filterData.value = values
    paginations.current = 1
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
  const checkSplitType = (value) => {
    if (value.indexOf('|') > 0) {
      return '|'
    } else if (value.indexOf(',') > 0) {
      return ','
    } else {
      return ','
    }
  }

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
    const { records, total } = await adminHttp.COMMUNITY.communityContentTipoffCondition(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取想法列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }

  loadTableData()
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }
  .rich-column {
    display: flex;
    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
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
