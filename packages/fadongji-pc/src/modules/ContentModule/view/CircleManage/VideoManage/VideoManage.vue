<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <VideoFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="p-24px bg-white">
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit>
            <AButton type="primary" @click="showModal(alertEnum.Add)">发布视频</AButton>
          </template>
          <template #content>
            <ATable
              :loading="tableLoading"
              :columns="tabColumns"
              :data-source="tableData"
              :pagination="false"
              :rowKey="(record) => record.id"
              size="small"
              :scroll="{ y: 1200 }"
              bordered
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'content'">
                  <!--@click="changeItem(record)"-->
                  <div class="flex items-center">
                    <VoContent
                      v-if="record?.fileUrl.indexOf('.mp4') > -1"
                      :source="record?.fileUrl?.replaceAll(',', '|').split('|')[0]"
                      :poster="record?.fileUrl?.replaceAll(',', '|').split('|')[1]"
                      :title="record.title"
                      :content="null"
                    />
                    <div
                      v-else
                      class="mt-10px"
                      v-for="(item, index) in record?.fileUrl?.replaceAll(',', '|').split('|')"
                    >
                      <VoContent
                        :key="index"
                        :source="item"
                        :poster="item"
                        :title="record.title"
                        :content="null"
                      />
                    </div>
                  </div>
                  <div v-if="false" class="rich-column">
                    <div class="rich-resource">
                      <FileUrlPrase :file-url="record.fileUrl" />
                    </div>
                    <div class="rich-content">
                      <span>标题:</span><span>{{ record.title }}</span>
                    </div>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'creator'">
                  <!--@click="changeItem(record)"-->
                  <span>{{ record.creator }}</span> <span>{{ record.phone }}</span>
                </template>
                <!-- 0 未审核 ，1 审核通过，2审核不通过，默认0 -->
                <template v-if="column.dataIndex === 'status'">
                  <span v-if="record.status === 0">待审核</span>
                  <span v-else-if="record.status === 1">审核通过</span>
                  <span v-else-if="record.status === 2">审核不通过</span>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <!--@click="releaseQuest"-->
                  <!-- <AButton type="link" class="submit-btn">写回答</AButton> -->

                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="openDetailDialog(record)"
                    v-auth="'/v1/community/content/video/query/comment'"
                    >查看评论
                  </AButton>
                  <APopconfirm
                    v-if="record.status === 0"
                    title="该操作将允许该问题在信息流中展示，确定操作吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerAccessRow(record)"
                  >
                    <AButton type="link" v-auth="'/v1/community/content/video/approved'"
                      >审核通过
                    </AButton>
                  </APopconfirm>
                  <AButton
                    v-if="record.status === 0"
                    type="link"
                    @click="openRejectDialog(record)"
                    v-auth="'/v1/community/content/question/reject'"
                    >驳回
                  </AButton>
                  <APopconfirm
                    title="确定要取消推荐吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerRecommend(record)"
                  >
                    <AButton
                      v-if="record.status === 1 && record.isRecommend === 1"
                      type="link"
                      v-auth="'/v1/community/content/video/recommend'"
                      >取消推荐
                    </AButton>
                  </APopconfirm>
                  <APopconfirm
                    title="确定要推荐吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerRecommendPut(record)"
                  >
                    <AButton
                      v-if="record.status === 1 && record.isRecommend === 0"
                      type="link"
                      v-auth="'/v1/community/content/video/recommend'"
                      >推荐
                    </AButton>
                  </APopconfirm>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerDeletedRow(record, 2)"
                    v-auth="'/v1/community/content/video/delete'"
                    >删除
                  </AButton>
                  <AButton
                    v-if="record.status === 1 && record.isOffSale === 0"
                    type="link"
                    @click="handlerShelfRow(record)"
                    v-auth="'/v1/community/content/video/off/sale'"
                    >下架
                  </AButton>
                  <APopconfirm
                    title="确定要上架吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="putOn(record)"
                  >
                    <AButton
                      v-if="record.status === 1 && record.isOffSale === 1"
                      type="link"
                      v-auth="'/v1/community/content/video/off/sale'"
                      >上架
                    </AButton>
                  </APopconfirm>
                  <AButton
                    v-if="record.status === 2"
                    type="link"
                    @click="showRejectReason(record)"
                    v-auth="'/v1/community/content/video/condition'"
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
              @pagination="paginationsChange"
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
            :auto-size="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入驳回原因,该原因会通知作者"
            show-count:maxlength="100"
          />
        </div>
      </AModal>
      <AModal
        title="删除原因"
        :zIndex="1001"
        v-model:visible="deleteModal.visible"
        :confirm-loading="deleteModal.confirmLoading"
        @ok="handlerDeleteRow(deleteModal.type)"
      >
        <div class="padding-10">
          <a-textarea
            v-model:value="deleteModal.deleteReason"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入删除原因,该原因会通知作者"
            show-count:maxlength="100"
          />
        </div>
      </AModal>
      <AModal
        title="下架原因"
        :zIndex="1001"
        v-model:visible="shelfModal.visible"
        :confirm-loading="shelfModal.confirmLoading"
        @ok="handlerShelf"
      >
        <div class="padding-10">
          <a-textarea
            v-model:value="shelfModal.deleteReason"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入下架原因,该原因会通知作者"
            show-count:maxlength="100"
          />
        </div>
      </AModal>
      <AModal
        title="查看原因"
        :zIndex="1001"
        v-model:visible="reasonModal.visible"
        @ok="reasonShelf"
      >
        <div class="padding-10">
          <a-textarea
            v-model:value="reasonModal.deleteReason"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            show-count:maxlength="100"
            disabled
          />
        </div>
      </AModal>
      <AModal
        width="1000px"
        :title="detailModal.title"
        v-model:visible="detailModal.visible"
        :footer="null"
        destroy-on-close
      >
        <div class="p-5">
          <CommentAssignForm @rest="handlerRest" @submit="handlerSubmit" />

          <ATable :dataSource="assignData" :columns="assignColumns" bordered :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'operation'">
                <APopconfirm
                  title="确定要再置顶吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="againTopping(record)"
                >
                  <AButton type="link" v-if="record.isTop === 1">再置顶</AButton>
                </APopconfirm>
                <div v-if="classData.length >= 3">
                  <AButton
                    v-if="record.isTop === 0 && record.level === 1"
                    type="link"
                    @click="topGreater(record)"
                    >置顶
                  </AButton>
                </div>
                <div v-else>
                  <APopconfirm
                    title="确定要置顶吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="topping(record)"
                  >
                    <AButton v-if="record.isTop === 0 && record.level === 1" type="link"
                      >置顶
                    </AButton>
                  </APopconfirm>
                </div>
                <APopconfirm
                  title="确定要取消置顶吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handlerTopping(record)"
                >
                  <AButton type="link" v-if="record.isTop === 1">取消置顶</AButton>
                </APopconfirm>
                <!-- <APopconfirm
				  title="确定要删除吗？"
				  ok-text="确定"
				  cancel-text="取消"
				  @confirm="handlerDeleteRow(record)">
				  <AButton type="link" @click="handlerDeleteRow">删除</AButton>
				</APopconfirm> -->
                <AButton type="link" @click="handlerDeletedRow(record, 1)">删除</AButton>
              </template>
              <template v-if="column.dataIndex === 'comment'">
                <AButton type="text" @click="dialogComment(record)"
                  ><p class="overflow-ellipsis overflow-hidden ..." style="width: 120px">
                    {{ JSON.parse(record.comment)?.json }}</p
                  ></AButton
                >
              </template>
            </template>
          </ATable>
          <div class="flex justify-end py-15px bg-white">
            <VoPagination
              size="'default'"
              :total="total"
              :current="pageCurrent"
              :page-size="currentPageSize"
              @pagination="pagesChange"
            />
          </div>
        </div>
      </AModal>
    </div>
    <a-modal
      v-model:visible="ideaVisible.visible"
      width="1000px"
      :title="ideaVisible.title"
      @ok="handleOk"
      ok-text="发布"
    >
      <div class="p-15px">
        <AForm ref="formRef" :model="formState" name="basic" autocomplete="off">
          <a-row :gutter="24">
            <a-col class="gutter-row" :span="12">
              <AFormItem
                :label-col="{ span: 10 }"
                :wrapper-col="{ span: 14 }"
                name="selectColumn"
                label="请选择栏目"
                :rules="[{ required: true, message: '请选择栏目' }]"
              >
                <a-select
                  :options="columnData"
                  v-model:value="formState.selectColumn"
                  placeholder="请选择栏目名称"
                />
              </AFormItem>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <AFormItem
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                name="selectCategory"
                label="请输入标题"
                :rules="[{ required: true, message: '请输入标题' }]"
              >
                <a-input
                  v-model:value="formState.selectCategory"
                  @change="inputValue"
                  placeholder="请输入标题"
                  :maxlength="50"
                />
              </AFormItem>
            </a-col>
          </a-row>

          <AFormItem
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            name="urlVideo"
            label="请输入上传视频"
            :rules="[
              {
                required: true,
                message: '请输入上传视频',
              },
            ]"
          >
            <EraUpload
              uploadType="video"
              :fileListData="fileUrlVideo"
              :showUploadList="true"
              uploadFuncChannel="cos"
              upload-tip="点击上传视频"
              :maxSize="1024"
              :maxNumber="1"
              :multiple="true"
              help-text="建议上传 16:9 、mp4格式视频"
              @done="handleDoneVideo"
              @delete="handerUpDelVideo"
            />
          </AFormItem>
          <AFormItem
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            name="inputIdeas"
            label="请输入上传封面"
          >
            <EraUpload
              uploadType="img"
              :fileListData="fileUrl"
              :maxSize="50"
              :maxNumber="1"
              uploadFuncChannel="cos"
              :multiple="true"
              upload-tip="点击上传封面"
              help-text="小提示：上传视频后，若不上传封面则默认以视频第一帧为封面"
              @done="handleDone"
              @delete="handerUpDel"
            />
          </AFormItem>
          <AFormItem
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 14 }"
            name="range"
            label="可见范围"
            :rules="[{ required: true, message: '请选择可见范围' }]"
          >
            <a-checkbox-group v-model:value="formState.range" :options="plainOptions" />
          </AFormItem>
          <a-row :gutter="24">
            <a-col class="gutter-row" :span="12">
              <AFormItem
                :label-col="{ span: 10 }"
                :wrapper-col="{ span: 12 }"
                name="thumbs"
                label="请输入点赞数"
              >
                <AInput
                  v-model:value="formState.thumbs"
                  @change="thumbsChange"
                  :maxlength="5"
                  placeholder="请输入点赞数"
                />
              </AFormItem>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <AFormItem
                :label-col="{ span: 10 }"
                :wrapper-col="{ span: 12 }"
                name="author"
                label="请选择作者"
                :rules="[{ required: true, message: '请选择作者' }]"
              >
                <a-select
                  :options="authorData"
                  v-model:value="formState.author"
                  placeholder="请选择作者"
                />
              </AFormItem>
            </a-col>
          </a-row>
        </AForm>
      </div>
    </a-modal>
    <AModal
      title="置顶操作"
      v-model:visible="eraModal.visible"
      :confirmLoading="confirmLoading"
      @ok="eraModalOk(eraModal.value)"
    >
      <div class="p-24px">置顶评论已有3条，继续设置则会默认将此条评论设置为第一条展示</div>
    </AModal>
    <AModal
      title="评论内容"
      v-model:visible="dialog.visible"
      :footer="null"
      width="1000px"
      destroy-on-close
    >
      <div class="p-24px">{{ dialog.value }}</div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, onBeforeMount, nextTick } from 'vue'
  import { Pattern } from '@vocen/shared'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import VideoFilterForm from '/@/modules/ContentModule/view/CircleManage/VideoManage/component/VideoFilterForm.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import CommentAssignForm from './component/CommentAssignForm.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/ContentModule/view/CircleManage/VideoManage/data/VideoListContainerData'
  import { commentConfig } from '/@/modules/ContentModule/view/CircleManage/VideoManage/data/assignColumns'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  // import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import VoContent from '/@/components/VoContent/VoContent.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  // 内容组件

  /** 查看评论 **/
  const detailModal = reactive({
    title: '评论列表',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
  const restDetailModel = () => {
    detailModal.currentId = ''
    detailModal.vo = {}
    detailModal.visible = false
  }
  //查看评论/v1/community/content/video/query/comment
  const openDetailDialog = (item) => {
    detailModal.visible = true
    detailModal.currentId = item.id
    loadAssignData()
  }

  const assignColumns = ref(commentConfig.commentColumns)
  const assignData = ref([])
  // 分页
  const currentPageSize = ref(5)
  const pageCurrent = ref(1)
  const total = ref()
  const pagesChange = ({ current, pageSize }) => {
    pageCurrent.value = current
    currentPageSize.value = pageSize
    loadAssignData()
  }
  // 分页
  const paginationsChange = ({ current, pageSize }) => {
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  const loadAssignData = async () => {
    try {
      const filterParams = {
        ...commentData.value,
        // ...paginations,
        pageSize: currentPageSize.value,
        pageNo: pageCurrent.value,
        id: detailModal.currentId,
      }
      const { code, data } = await adminHttp.COMMUNITY.communityContentVideoQueryComment(
        clearObjectUnalbeAttr(filterParams),
      )
      if (code === '20001') {
        total.value = data.total
        assignData.value = data.records
        classData.value = data.records.filter((item) => item.isTop === 1)
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 搜索
  const commentData = ref({})
  const handlerSubmit = (values) => {
    current.value = 1
    commentData.value = {
      ...values,
    }
    loadAssignData()
  }
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    commentData.value = {
      ...values,
    }
    loadAssignData()
  }
  // 查看评论
  /** detail modal end **/

  /** 审核通过**/
  const handlerAccessRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentVideoApproved({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        item.status = 1
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  /**删除*/
  const restDeleteModal = () => {
    deleteModal.visible = false
    deleteModal.currentItem = null
    deleteModal.deleteReason = ''
  }
  const deleteModal = reactive({
    visible: false,
    currentItem: null,
    deleteReason: '',
    confirmLoading: false,
    currentId: '',
    type: '',
  })
  //删除弹框
  const handlerDeletedRow = (item, type) => {
    deleteModal.currentItem = { ...item }
    deleteModal.currentId = item.id
    deleteModal.deleteReason = ''
    deleteModal.visible = true
    deleteModal.type = type
  }
  //删除按钮
  const handlerDeleteRow = async (type) => {
    if (type === 1) {
      try {
        if (!deleteModal.deleteReason) {
          throw Error('删除内容必填')
        }

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        await adminHttp.COMMUNITY.communityContentAnswerDelete({
          id: deleteModal.currentId,
          reason: deleteModal.deleteReason,
        })
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        restDeleteModal()

        loadTableData()
        loadAssignData()
      } catch (e) {
        createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
      } finally {
      }
    } else {
      try {
        if (!deleteModal.deleteReason) {
          throw Error('删除内容必填')
        }

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        await adminHttp.COMMUNITY.communityContentVideoDelete({
          id: deleteModal.currentId,
          reason: deleteModal.deleteReason,
        })
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        restDeleteModal()

        loadTableData()
      } catch (e) {
        createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
      } finally {
      }
    }
  }
  /**删除*/
  //推荐
  const handlerRecommend = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentVideoCancelRecommend({
        id: record.id,
        contentId: record.contentId,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  //推荐
  const handlerRecommendPut = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.COMMUNITY.communityContentVideoRecommend({
        id: record.id,
        contentId: record.contentId,
      })
      if (res === '20001') {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      }
      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  /**下架*/
  const restShelfModal = () => {
    shelfModal.visible = false
    shelfModal.currentItem = null
    shelfModal.deleteReason = ''
  }
  const shelfModal = reactive({
    visible: false,
    currentItem: null,
    deleteReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //下架弹框
  const handlerShelfRow = (item) => {
    shelfModal.currentItem = { ...item }
    shelfModal.currentId = item.id
    shelfModal.deleteReason = ''
    shelfModal.visible = true
  }
  //下架按钮
  const handlerShelf = async () => {
    try {
      if (!shelfModal.deleteReason) {
        throw Error('下架原因必填')
      }
      shelfModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentVideoOffSale({
        id: shelfModal.currentId,
        reason: shelfModal.deleteReason,
        isOffSale: 1,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      restShelfModal()

      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      shelfModal.confirmLoading = false
    }
  }
  //上架
  const putOn = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentVideoOffSale({
        id: record.id,
        reason: '',
        isOffSale: 0,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  /**下架*/

  // 查看原因
  const reasonModal = reactive({
    visible: false,
    currentItem: null,
    deleteReason: '',
    confirmLoading: false,
    currentId: '',
  })
  const showRejectReason = async (item) => {
    reasonModal.visible = true
    try {
      // createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.COMMUNITY.communityContentVideoDetail({
        id: item.id,
      })
      reasonModal.deleteReason = res.data.reason
      // createMessage.success({ content: `操作成功`, key: loadingCtxkey })
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  const reasonShelf = () => {
    reasonModal.visible = false
  }
  //查看原因
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
  //驳回
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
  const tabsList = ref([
    { key: 'one', name: '待审核' },
    { key: 'two', name: '已通过' },
    { key: 'three', name: '未通过' },
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
    if (filterParams.time) {
      filterParams.startTime = filterParams.time[0] + ' 23:59:59'
      filterParams.endTime = filterParams.time[1] + ' 23:59:59'
    }
    const { records, total } = await adminHttp.COMMUNITY.communityContentVideoCondition(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取视频列表失败:${err.message}`)
        return { records: [], total: 0 }
      })
      .finally(() => {
        tableLoading.value = false
      })
    // console.log(records)
    paginations.total = total
    tableData.value = records
  }

  onMountedOrActivated(() => {
    loadTableData()
    getClassDataEvent()
    getOpRealNameList()
  })
  // 评论communityContentAnswerTop
  const topping = async (record) => {
    await adminHttp.COMMUNITY.communityContentAnswerTop({
      id: record.id,
      contentId: record.contentId,
      isTop: 1,
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadAssignData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  const handlerTopping = async (record) => {
    await adminHttp.COMMUNITY.communityContentAnswerTop({
      id: record.id,
      contentId: record.contentId,
      isTop: 0,
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadAssignData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //再置顶
  const againTopping = async (record) => {
    await adminHttp.COMMUNITY.communityContentAnswerReset({
      id: record.id,
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadAssignData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //大于三
  const confirmLoading = ref(false)
  const eraModal = reactive({
    visible: false,
    value: '',
  })
  const topGreater = (record) => {
    eraModal.visible = true
    eraModal.value = record
  }
  const eraModalOk = async (record) => {
    confirmLoading.value = true
    try {
      const { code, message } = await adminHttp.COMMUNITY.communityContentAnswerTop({
        id: record.id,
        contentId: record.contentId,
        isTop: 1,
      })
      if (code === '20001') {
        createMessage.success('置顶成功')
        eraModal.visible = false
        // 重新加载列表页面
        await loadAssignData()
      } else {
        createMessage.success(message)
      }
      confirmLoading.value = false
    } catch (e) {
      console.log(e)
      confirmLoading.value = false
    }
  }
  // //删除评论
  // const commentDeletion = async(record) => {
  //   await adminHttp.COMMUNITY.communityContentAnswerReset({
  //       id: record.id,
  //     }).then(() => {
  //       createMessage.success({ content: `操作成功`, key: loadingCtxkey })
  //       loadAssignData()
  //     })
  //     .catch((err) => {
  //       createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
  //     })
  // }
  const dialog = reactive({
    visible: false,
    value: '',
  })
  const dialogComment = (record) => {
    dialog.visible = true
    dialog.value = JSON.parse(record.comment)?.json
  }
  // 评论
  /**发布视频 */
  //1
  // const [{ setFieldsValue }] = createFormRegisterInstance({
  // })
  // const reg =replace(/\s/,'')
  const inputValue = () => {
    console.log('8888')
    if (formState.selectCategory.replace(/\s/, '') === '') {
      createMessage.error('标题不能为空')
      formState.selectCategory = ''
    }
  }
  const plainOptions = [
    { label: '供应商', value: 'supplier' },
    { label: '服务商', value: 'agent' },
    { label: '修理厂', value: 'garage' },
    { label: '集师傅', value: 'skilledWorker' },
    { label: '回收公司', value: 'recycling' },
    { label: '旧机买家', value: 'oldMachine' },
  ]
  //1
  const classData = ref([])
  const fileUrlVideo = ref([])
  const fileUrl = ref([])
  const resrouceType = ref('img')
  let columnData = ref([] as any[])
  let authorData = ref([] as any[])
  const formRef = ref<FormInstance | undefined>()
  const formState = reactive<FormState>({
    selectColumn: null,
    selectCategory: '',
    createTogether: null,
    inputIdeas: '',
    range: [],
    thumbs: '',
    author: null,
    urlVideo: '',
  })

  interface FormState {
    selectColumn: any
    selectCategory: any
    createTogether: any
    inputIdeas: any
    range: any
    thumbs: any
    author: any
    urlVideo: String
  }

  enum alertEnum {
    Edit = '修改视频',
    Add = '发布视频',
  }

  /** 视频 **/
  const ideaVisible = reactive({
    title: '',
    visible: false,
    id: '',
  })
  const showModal = (title) => {
    if (title == alertEnum.Add) {
      ideaVisible.title = '发布视频'
      formState.selectColumn = null
      formState.selectCategory = ''
      formState.range = null
      formState.author = null
      formState.inputIdeas = ''
      formState.thumbs = ''
      fileUrl.value = []
      fileUrlVideo.value = []
      ideaVisible.id = ''
    } else {
      // ideaVisible.title = '修改想法'
      // formState.selectColumn = record.columnId
      // formState.selectCategory = null
      // formState.range = record.platformCode
      // formState.author = record.userId
      // formState.inputIdeas = record.content
      // formState.thumbs = record.likeNum
      // ideaVisible.id = record.id
      // // const extString = record.fileUrl.split('|').pop().toLowerCase()
      // const extString = record.fileUrl.split(checkSplitType(record.fileUrl))
      // console.log(extString, '======')
      // const isMp4 = extString?.[0].match(/.mp4/g)
      // console.log(isMp4)
      // if (!isMp4) {
      //   fileUrl.value = record.fileUrl.split(checkSplitType(record.fileUrl))
      //   resrouceType.value = 'img'
      // } else {
      //   console.log('1111', extString)
      //   fileUrlVideo.value = record.fileUrl.split(checkSplitType(record.fileUrl))
      //   resrouceType.value = 'video'
      // }
    }
    ideaVisible.visible = true
  }
  // CONTENTMENT.communityContentIdeaRelease
  const handleOk = () => {
    if (ideaVisible.title === alertEnum.Add) {
      formRef.value
        .validate()
        .then(() => {
          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          adminHttp.CONTENTMENT.communityContentIdeaReleaseBatch({
            columnId: formState.selectColumn,
            title: formState.selectCategory,
            fileUrl: fileUrlVideo.value ? fileUrlVideo.value + '|' + fileUrl.value : '',
            likeCount: formState.thumbs,
            userId: formState.author,
            content: '',
            platformCodes: formState.range,
            businessType: '2',
          })
            .then(() => {
              createMessage.success({ content: `操作成功`, key: loadingCtxkey })
              loadTableData()
              ideaVisible.visible = false
              formState.selectColumn = null
              formState.selectCategory = null
              formState.range = null
              formState.author = null
              formState.inputIdeas = ''
              formState.thumbs = ''
              formState.inputIdeas = ''
            })
            .catch((err) => {
              createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
            })
        })
        .catch((e) => {
          console.log(e, '校验不通过')
        })
    } else {
      // adminHttp.COMMUNITY.communityContentIdeaModify({
      //   id: ideaVisible.id,
      //   columnId: formState.selectColumn || '',
      //   categoryId: formState.selectCategory || '',
      //   content: formState.inputIdeas,
      //   fileUrl:
      //     resrouceType.value === 'img' ? fileUrl.value.join(',') : fileUrlVideo.value.join(','),
      //   likeCount: formState.thumbs,
      //   userId: formState.author || '',
      //   platformCodes: formState.range,
      // })
      //   .then(() => {
      //     createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      //     loadTableData()
      //     ideaVisible.visible = false
      //   })
      //   .catch((err) => {
      //     createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      //   })
    }
  }
  const thumbsChange = () => {
    if (!Pattern.isPositiveNumber(formState.thumbs)) {
      createMessage.error('请输入数字')
      formState.thumbs = ''
    }
  }
  //类别
  const getClassDataEvent = async () => {
    try {
      const res = await adminHttp.COMMUNITY.communityColumnCondition({
        pageSize: 99,
        isEnable: 0,
        businessType: 2,
      })
      if (res.code === '20001') {
        columnData.value = []
        columnData.value = res.data.records.map((item) => ({
          label: item.columnName,
          value: item.id,
        }))
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }

  const handleDoneVideo = (info) => {
    console.log(info, 'xx')
    fileUrlVideo.value = [info.file.filePath]
    setTimeout(() => {
      fileUrl.value = [info.file.picUrl]
    }, 1500)
    formState.urlVideo = info.file.filePath
    // fileUrlVideo.value = [info.file.filePath]
    // fileUrlVideo.value = [info.file.filePath, info.file.picUrl]
    // formState.urlVideo = info.file.filePath + '' + info.file.picUrl
  }
  const handerUpDelVideo = (record) => {
    if (resrouceType.value === 'img') {
      console.log(fileUrl.value)
      fileUrl.value = fileUrl.value.filter((item) => item != record.url)
      console.log(fileUrl.value)
    } else {
      fileUrlVideo.value = []
    }
    fileUrlVideo.value = []
    nextTick(() => {
      formState.urlVideo = ''
    })
  }
  const handleDone = (info) => {
    if (resrouceType.value === 'img') {
      fileUrl.value.push(info.file.filePath)
    } else {
      fileUrl.value = [info.file.filePath, info.file.picUrl]
    }

    console.log(fileUrl)
  }
  const handerUpDel = (record) => {
    if (resrouceType.value === 'img') {
      console.log(record, fileUrl.value)
      fileUrl.value = fileUrl.value.filter((item) => item != record.url)
      console.log(fileUrl.value)
    } else {
      fileUrl.value = []
    }
    fileUrl.value = []
  }

  // 模糊查询运营平台用户列表
  const getOpRealNameList = async () => {
    try {
      const res = await adminHttp.USER.userInfoOpRealName({
        pageSize: 999999,
      })
      if (res.code === '20001') {
        authorData.value = []
        authorData.value = res.data.map((item) => ({
          label: item.realName,
          value: item.id,
        }))
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }
  /**发布视频 */
  watch(
    formState.urlVideo,
    (val) => {
      ;({
        fileUrlVideo: val,
      })
    },
    { deep: true },
  )
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .rich-column {
    .list {
      display: flex;
    }

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
