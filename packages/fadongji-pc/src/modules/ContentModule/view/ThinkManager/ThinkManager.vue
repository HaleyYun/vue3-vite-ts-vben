<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <ThinkFilterForm
        @rest="handlerFilterRest"
        @submit="handlerFilterSubmit"
        :currentTabIndex="activeKey"
      />
    </div>
    <!-- v-auth="'/v1/community/content/idea/cancel/recommend'" -->
    <div class="p-24px bg-white">
      <EraSwitchTable :total="paginations.total">
        <template #tableEdit>
          <!-- <ThinkOpForm type="think" text="想法" @resetData="resetData" /> -->
          <AButton
            type="primary"
            @click="showModal(record, alertEnum.Add)"
            v-auth="'/v1/community/content/idea/release'"
            >发布想法
          </AButton>
        </template>
        <template #content>
          <ATable
            :loading="tableLoading"
            :columns="tabColumns"
            :data-source="tableData"
            :pagination="false"
            :scroll="{ y: 1200 }"
            bordered
          >
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'questionAndContent'">
                <div class="rich-column">
                  <div class="rich-resource">
                    <div class="flex items-center">
                      <VoContent
                        v-if="record?.fileUrl.indexOf('.mp4') > -1"
                        :source="record?.fileUrl?.replaceAll(',', '|').split('|')[0]"
                        :poster="record?.fileUrl?.replaceAll(',', '|').split('|')[1]"
                        :title="null"
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
                          :title="null"
                          :content="null"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="rich-content ellipsis-2" @click="openDetailDialog(record)">
                    <div style="width: 100%" class="truncate ...">{{ record.content }}</div>
                  </div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'nickNameAndMobile'">
                <div class="rich-column">
                  <div class="rich-content">{{ record.nickName }}/{{ record.mobile }}</div>
                </div>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <span v-if="record.status === 0">未审核</span>
                <span v-if="record.status === 1">审核通过</span>
                <span v-if="record.status === 2">审核不通过</span>
              </template>

              <template v-if="column.dataIndex === 'operation'">
                <AButton
                  v-if="record.status === 0"
                  type="link"
                  @click="openDetailDialog(record)"
                  v-auth="'/v1/community/content/idea/detail'"
                  >查看详情
                </AButton>
                <APopconfirm
                  v-if="record.status === 0"
                  title="该操作将允许该想法在信息流中展示，确定操作吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handlerAccessRow(record)"
                >
                  <AButton v-auth="'/v1/community/content/idea/approved'" type="link"
                    >审核通过
                  </AButton>
                </APopconfirm>
                <AButton
                  v-if="record.status === 0"
                  type="link"
                  @click="openRejectDialog(record)"
                  v-auth="'/v1/community/content/idea/cancel/recommend'"
                  >驳回
                </AButton>
                <AButton
                  v-if="record.status === 1"
                  type="link"
                  @click="handlerDeletedRow(record, 2)"
                  v-auth="'/v1/community/content/idea/delete'"
                  >删除
                </AButton>
                <AButton
                  v-if="record.status === 1"
                  type="link"
                  @click="openDetailComment(record)"
                  v-auth="'/v1/community/content/idea/query/comment'"
                  >查看评论
                </AButton>
                <AButton
                  v-if="record.status === 1"
                  type="link"
                  @click="showModal(record, alertEnum.Edit)"
                  v-auth="'/v1/community/content/idea/modify'"
                  >修改
                </AButton>
                <AButton
                  v-if="record.status === 1 && record.isOffSale === 0"
                  type="link"
                  @click="handlerShelfRow(record)"
                  v-auth="'/v1/community/content/idea/off/sale'"
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
                    v-auth="'/v1/community/content/idea/off/sale'"
                    >上架
                  </AButton>
                </APopconfirm>

                <APopconfirm
                  title="确定要取消推荐吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handlerRecommend(record)"
                >
                  <AButton
                    v-if="record.status === 1 && record.isRecommend === 1"
                    type="link"
                    v-auth="'/v1/community/content/idea/recommend'"
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
                    v-auth="'/v1/community/content/idea/recommend'"
                    >推荐
                  </AButton>
                </APopconfirm>
                <AButton
                  v-if="record.status === 2"
                  type="link"
                  @click="showRejectReason(record)"
                  v-auth="'/v1/community/content/idea/condition'"
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

    <AModal
      title="驳回原因"
      :zIndex="1001"
      centered
      v-model:visible="rejectModal.visible"
      :confirm-loading="rejectModal.confirmLoading"
      @ok="handlerRejectRow"
    >
      <div class="padding-10">
        <a-textarea
          v-model:value="rejectModal.rejectReason"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入驳回原因,该原因会通知作者"
          :maxlength="100"
        />
      </div>
    </AModal>

    <AModal width="800px" :title="detailModal.title" v-model:visible="detailModal.visible">
      <div class="padding-15 fz-16">
        <div class="p-5px text-gray-400">想法</div>
        <div class="p-15px">{{ detailModal.vo.content }}</div>
        <div class="p-15px">
          <div class="flex items-center">
            <div class="mt-10px" v-for="(item, index) in detailModal.vo?.fileUrl?.split('|')">
              <VoContent :key="index" :source="item" :title="null" :content="null" />
            </div>
          </div>
        </div>
        <div class="pb-15px" v-if="detailModal.vo.goodsName != null">
          <ShoppingCartOutlined />
          {{ detailModal.vo.goodsName }}
        </div>
        <a-row>
          <a-col :span="8">发布时间:{{ detailModal.vo.createTime }}</a-col>
          <a-col :span="8">
            <a-form-item
              :wrapper-col="{ span: 16 }"
              :labelCol="{ span: 4 }"
              labelAlign="left"
              label="作者"
            >
              <a-input disabled v-model:value="detailModal.vo.nickName" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :wrapper-col="{ span: 16 }"
              :labelCol="{ span: 5 }"
              labelAlign="left"
              label="发布人"
            >
              <a-input v-model:value="detailModal.vo.releaseNickName" disabled />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <template #footer>
        <AButton v-if="detailModal.vo.status === 0" @click="handlerRejectRowByModal">驳回</AButton>
        <APopconfirm
          v-if="detailModal.vo.status === 0"
          title="该操作将允许该想法在信息流中展示，确定操作吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handlerAccessRowByModal"
        >
          <AButton type="primary" :loading="detailModal.confirmLoading">审核通过</AButton>
        </APopconfirm>
      </template>
    </AModal>
    <AModal
      title="查看原因"
      :zIndex="1002"
      centered
      v-model:visible="checkModal.visible"
      :footer="null"
      :confirm-loading="checkModal.confirmLoading"
    >
      <div class="padding-10">
        <a-textarea
          v-model:value="checkModal.rejectReason"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          show-count:maxlength="100"
          disabled
        />

        <div class="text-center">
          <AButton :loading="detailModal.confirmLoading" @click="shutDown">关闭</AButton>
        </div>
      </div>
    </AModal>
  </div>
  <AModal
    title="删除原因"
    :zIndex="1001"
    v-model:visible="deleteModal.visible"
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
              label="请选择品类"
            >
              <a-select
                :options="categoryData"
                v-model:value="formState.selectCategory"
                placeholder="请选择品类"
              />
            </AFormItem>
          </a-col>
        </a-row>
        <AFormItem
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          name="inputIdeas"
          label="请输入想法"
          :rules="[{ required: true, message: '请输入想法' }]"
        >
          <a-textarea
            v-model:value="formState.inputIdeas"
            placeholder="请输入想法"
            :rows="4"
            show-count
            :maxlength="500"
          />
        </AFormItem>
        <AFormItem
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          name="uploadType"
          label="图片/视频"
        >
          <div class="margin-b-10">
            <a-radio-group v-model:value="resrouceType">
              <a-radio value="img">图片</a-radio>
              <a-radio value="video">视频</a-radio>
            </a-radio-group>
          </div>
          <EraUpload
            v-if="resrouceType === 'img'"
            :uploadType="resrouceType"
            :fileListData="fileUrl"
            :maxSize="50"
            :maxNumber="1"
            uploadFuncChannel="cos"
            :multiple="true"
            upload-tip="点击上传图片"
            help-text="建议上传 375*200px， jpg/png/jpge格式图片。"
            @done="handleDone"
            @delete="handerUpDel"
          />
          <EraUpload
            v-if="resrouceType === 'video'"
            :uploadType="resrouceType"
            :fileListData="fileUrlVideo"
            :showUploadList="true"
            uploadFuncChannel="cos"
            upload-tip="点击上传视频"
            :maxSize="1024"
            :maxNumber="1"
            :multiple="true"
            help-text="建议上传 16:9 、mp4/mov格式视频"
            @done="handleDoneVideo"
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
          <a-checkbox-group
            v-if="ideaVisible.id"
            v-model:value="formState.range"
            :options="plainOptions"
            disabled
          />
          <a-checkbox-group v-else v-model:value="formState.range" :options="plainOptions" />
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
  <!-- 查看评论 -->
  <AModal
    width="1000px"
    :title="commentModal.title"
    v-model:visible="commentModal.visible"
    :footer="null"
    destroy-on-close
  >
    <div class="p-5">
      <CommentAssignForm @rest="handlerRest" @submit="handlerSubmit" />

      <ATable :dataSource="assignData" :columns="answerColumns" bordered :pagination="false">
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
                <AButton v-if="record.isTop === 0 && record.level === 1" type="link">置顶</AButton>
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
              ><p class="overflow-ellipsis overflow-hidden ..." style="width: 120px">{{
                JSON.parse(record.comment)?.json
              }}</p></AButton>
          </template>
        </template>
      </ATable>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
            :total="total"
            :current="pageCurrent"
            :page-size="currentPageSize"
            @pagination="paginationsChange"
          />
      </div>
    </div>
  </AModal>
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
  import { reactive, ref, watch, onBeforeMount } from 'vue'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { ShoppingCartOutlined } from '@ant-design/icons-vue'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import {
    thinkListContainerListTableColumns,
    thinkListColumns,
  } from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
  import { Pattern } from '@vocen/shared'
  // 内容组件
  import CommentAssignForm from './component/CommentAssignForm.vue'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import VoContent from '/@/components/VoContent/VoContent.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import ThinkFilterForm from '/@/modules/ContentModule/view/ThinkManager/conponents/ThinkFilterForm.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { commentConfig } from '/@/modules/ContentModule/view/CircleManage/AnswerManage/data/commentColumns'
  import type { FormInstance } from 'ant-design-vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { isImageUrl } from 'ant-design-vue/es/upload/utils'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  //1
  const plainOptions = [
    { label: '供应商', value: 'supplier' },
    { label: '服务商', value: 'agent' },
    { label: '修理厂', value: 'garage' },
    { label: '集师傅', value: 'skilledWorker' },
    { label: '回收公司', value: 'recycling' },
    { label: '旧机买家', value: 'oldMachine' },
  ]
  //1
  const fileUrlVideo = ref([])
  const classData = ref([])
  const fileUrl = ref([])
  const resrouceType = ref('img')
  let columnData = ref([] as any[])
  let authorData = ref([] as any[])
  let categoryData = ref([] as any[])
  const formRef = ref<FormInstance | undefined>()
  const formState = reactive<FormState>({
    selectColumn: null,
    selectCategory: null,
    createTogether: null,
    inputIdeas: '',
    range: [],
    thumbs: '',
    author: null,
    uploadType: '',
  })

  interface FormState {
    selectColumn: any
    selectCategory: any
    createTogether: any
    inputIdeas: any
    range: any
    thumbs: any
    author: any
    uploadType: any
  }

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

  const { createMessage } = useMessage()

  let wareHouseOptions = ref([] as any[])
  // 修改“运营类别”的
  let tableData = ref([])

  const loadingCtxkey = 'handlerRow'
  const handlerAccessRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentIdeaApproved({ id: item.id })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        item.status = 1
        // loadTableData()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //驳回
  const rejectModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //驳回
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
    // alert(rejectModal.rejectReason)
    try {
      if (!rejectModal.rejectReason) {
        throw Error('拒绝内容必填')
      }
      rejectModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      adminHttp.COMMUNITY.communityContentIdeaReject({
        id: rejectModal.currentId,
        reason: rejectModal.rejectReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      const currentRow = tableData.value.filter((item) => item.id === rejectModal.currentId)[0]
      currentRow.status = 2
      loadTableData()

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

  const checkModal = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    confirmLoading: false,
    currentId: '',
  })
  //查看原因
  const showRejectReason = (item) => {
    // console.log(item, '原因')
    checkModal.currentItem = { ...item }
    checkModal.currentId = item.id
    checkModal.rejectReason = item.reason
    checkModal.visible = true
  }

  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
  const checkSplitType = (value) => {
    if (value.indexOf('|') > 0) {
      return '|'
    } else if (value.indexOf(',') > 0) {
      return ','
    } else {
      return ','
    }
  }

  const handlerRejectRowByModal = () => {
    openRejectDialog(detailModal.vo)
  }
  const shutDown = () => {
    checkModal.visible = false
  }
  const restDetailModel = () => {
    detailModal.currentId = ''
    detailModal.vo = {}
    detailModal.visible = false
  }

  const handlerAccessRowByModal = () => {
    detailModal.confirmLoading = true
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentIdeaApproved({ id: detailModal.currentId })
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

  // 查看详情community/content/idea/detail
  const openDetailDialog = async (item) => {
    detailModal.title = '想法详情'
    detailModal.currentId = item.id

    await adminHttp.COMMUNITY.communityContentIdeaDetail({ id: item.id }).then((res) => {
      console.log(res)
      detailModal.vo = res.data
      detailModal.visible = true
    })
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
  const tabColumns = ref(thinkListContainerListTableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  watch(activeKey, async (key) => {
    activeKey.value = key
    if (activeKey.value === 'one') {
      tabColumns.value = thinkListContainerListTableColumns
    } else {
      tabColumns.value = thinkListColumns
    }
    resetData()
  })
  const resetData = () => {
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    loadTableData()
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
    const { data } = await adminHttp.COMMUNITY.communityContentIdeaCondition(filterParams)
    tableLoading.value = false
    console.log(data.records)
    paginations.total = data.total
    tableData.value = data.records
  }

  onMountedOrActivated(() => {
    loadTableData()
    getClassDataEvent()
    getCategoryFunc()
    getOpRealNameList()
  })
  /** 查看评论 **/
  const commentModal = reactive({
    title: '评论列表',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
    id: '',
  })
  //查看评论/v1/community/content/video/query/comment
  const openDetailComment = async (item) => {
    console.log(item, 'item')
    commentModal.visible = true
    commentModal.id = item.id
    commentModal.currentId = item.contentId
    loadAssignData()
  }
  const answerColumns = ref(commentConfig.commentColumns)
  const assignData = ref([])

  // 分页
  const currentPageSize = ref<any>(5)
  const pageCurrent = ref<any>(1)
  const total = ref()
  const paginationsChange = ({ current, pageSize }) => {
    console.log(current, pageSize)
    pageCurrent.value = current
    currentPageSize.value = pageSize
    loadAssignData()
  }
  const loadAssignData = async () => {
    try {
      const filterParams = {
        ...commentData.value,
        pageSize: currentPageSize.value,
        pageNo: pageCurrent.value,
        id: commentModal.id,
        contentId: commentModal.currentId,
      }
      const { code, data } = await adminHttp.COMMUNITY.communityContentIdeaQueryComment(
        clearObjectUnalbeAttr(filterParams),
      )
      if (code === '20001') {
        total.value = data.total
        assignData.value = data.records
        classData.value = data.records.filter((item) => item.isTop === 1)

        console.log(classData.value.length, 'classData.value')
        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.current > 1 && tableData.value.length === 0) {
          paginations.current = paginations.current - 1
          loadAssignData()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 搜索
  const commentData = ref()
  const handlerSubmit = (values) => {
    pageCurrent.value = 1
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
        rejectModal.confirmLoading = false
      }
    } else {
      try {
        if (!deleteModal.deleteReason) {
          throw Error('删除内容必填')
        }
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        await adminHttp.COMMUNITY.communityContentIdeaDelete({
          id: deleteModal.currentId,
          reason: deleteModal.deleteReason,
        })
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        restDeleteModal()

        await loadTableData()
      } catch (e) {
        createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
      } finally {
        rejectModal.confirmLoading = false
      }
    }
  }
  /**删除*/
  //推荐v1/community/content/idea/cancel/recommend
  const handlerRecommend = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentIdeaCancelRecommend({
        id: record.id,
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
      const res = await adminHttp.COMMUNITY.communityContentIdeaRecommend({
        id: record.id,
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
      await adminHttp.COMMUNITY.communityContentIdeaOffsale({
        id: shelfModal.currentId,
        reason: shelfModal.deleteReason,
        isOffSale: 1,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      restShelfModal()

      await loadTableData()
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
      await adminHttp.COMMUNITY.communityContentIdeaOffsale({
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
  /**发布想法 */
  enum alertEnum {
    Edit = '修改想法',
    Add = '发布想法',
  }

  /** 想法 **/
  const ideaVisible = reactive({
    title: '',
    visible: false,
    id: '',
  })
  const showModal = (record, title) => {
    console.log(record, 'record')

    if (title == alertEnum.Add) {
      ideaVisible.title = '发布想法'
      formState.selectColumn = null
      formState.selectCategory = null
      formState.range = null
      formState.author = null
      formState.inputIdeas = ''
      formState.thumbs = ''
      fileUrl.value = []
      fileUrlVideo.value = []
      ideaVisible.id = ''
    } else {
      ideaVisible.title = '修改想法'
      formState.selectColumn = record.columnId
      formState.selectCategory = null
      formState.range = record.platformCode
      formState.author = record.userId
      formState.inputIdeas = record.content
      formState.thumbs = record.likeNum
      ideaVisible.id = record.id
      // const extString = record.fileUrl.split('|').pop().toLowerCase()
      const extString = record.fileUrl.split(checkSplitType(record.fileUrl))
      console.log(extString, '======')
      const isMp4 = extString?.[0].match(/.mp4/g)
      console.log(isMp4)
      if (!isMp4) {
        fileUrl.value = record.fileUrl.split(checkSplitType(record.fileUrl))
        resrouceType.value = 'img'
      } else {
        console.log('1111', extString)
        fileUrlVideo.value = record.fileUrl.split(checkSplitType(record.fileUrl))
        resrouceType.value = 'video'
      }
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
            title: '',
            columnId: formState.selectColumn,
            categoryId: formState.selectCategory,
            content: formState.inputIdeas,
            fileUrl:
              resrouceType.value === 'img' ? fileUrl.value.join('|') : fileUrlVideo.value.join('|'),
            likeCount: formState.thumbs,
            userId: formState.author,
            platformCodes: formState.range,
            businessType: '1',
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
      adminHttp.COMMUNITY.communityContentIdeaModify({
        id: ideaVisible.id,
        columnId: formState.selectColumn || '',
        categoryId: formState.selectCategory || '',
        content: formState.inputIdeas,
        fileUrl:
          resrouceType.value === 'img' ? fileUrl.value.join('|') : fileUrlVideo.value.join('|'),
        likeCount: formState.thumbs,
        userId: formState.author || '',
        platformCodes: formState.range,
      })
        .then(() => {
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          loadTableData()
          ideaVisible.visible = false
        })
        .catch((err) => {
          createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
        })
    }
  }
  //类别
  const getClassDataEvent = async () => {
    try {
      const res = await adminHttp.COMMUNITY.communityColumnCondition({
        pageSize: 99,
        isEnable: 0,
        businessType: 1,
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

  const getCategoryFunc = async () => {
    try {
      const res = await adminHttp.goodsCategoryList({
        pageSize: 999999,
        isEnable: 0,
      })
      if (res.code === '20001') {
        categoryData.value = []
        categoryData.value = res.data.records.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      } else {
        createMessage.error('操作失败')
      }
    } catch (err: any) {}
  }

  const handleDoneVideo = (info) => {
    if (resrouceType.value === 'img') {
      fileUrlVideo.value.push(info.file.filePath)
    } else {
      fileUrlVideo.value = [info.file.filePath, info.file.picUrl]
    }

    console.log(fileUrl, 'url地址')
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
      fileUrlVideo.value = []
    }
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
  /**发布想法 */

  /**修改 */
  // const changeModal = reactive({
  //   title: '修改回答',
  //   visible: false,
  //   vo: {},
  //   confirmLoading: false,
  //   currentId: '',
  //   comment: '',
  // })
  // const handlerChangeRow = (item) => {
  //   changeModal.visible = true
  //   changeModal.vo = item
  //   changeModal.comment = JSON.parse(item.comment).json
  //   changeModal.currentId = item.id
  // }
  // const changeAnswer = () => {
  //   createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
  //   adminHttp.COMMUNITY.communityContentAnswerModify({
  //     id: changeModal.currentId,
  //     comment: JSON.stringify(divEditBox.value.innerHTML),
  //   })
  //     .then(() => {
  //       createMessage.success({ content: `操作成功`, key: loadingCtxkey })
  //       loadTableData()
  //       changeModal.visible = false
  //     })
  //     .catch((err) => {
  //       createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
  //     })
  // }
  /**修改 */
  const thumbsChange = () => {
    if (!Pattern.isPositiveNumber(formState.thumbs)) {
      createMessage.error('请输入数字')
      formState.thumbs = ''
    }
  }
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
    padding: 24px;
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

  .rich-column {
    display: flex;

    .rich-resource {
      margin-right: 10px;
      cursor: pointer;
    }

    .rich-content {
    }
  }
</style>
