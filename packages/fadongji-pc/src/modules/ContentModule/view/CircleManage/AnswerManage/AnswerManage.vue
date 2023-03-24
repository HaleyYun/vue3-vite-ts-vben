<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <AnswerFilterForm
          class="padding-24"
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="p-24px bg-white">
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit></template>
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
                <template v-if="column.dataIndex === 'questionAndContent'">
                  <div class="rich-column">
                    <div class="rich-resource">
                      <!-- <span>{{ record }}</span>  -->
                      <VoContent
                        v-if="record?.contentInfo?.fileUrl.indexOf('.mp4') > -1"
                        :source="record?.contentInfo?.fileUrl?.replaceAll(',', '|').split('|')[0]"
                        :poster="record?.contentInfo?.fileUrl?.replaceAll(',', '|').split('|')[1]"
                        :title="null"
                        :content="null"
                      />
                      <div v-else>
                        <a
                          @click="openQuestion(record.contentInfo)"
                          v-if="record.contentInfo.fileUrl"
                          >查看问题</a
                        >
                      </div>
                    </div>
                    <div class="rich-content ellipsis-2" v-if="record.contentInfo">
                      <a-tooltip placement="top">
                        <template #title>{{ record.contentInfo.title }} </template>
                      <div><span v-if="record.contentInfo.title">问题：</span>{{ record.contentInfo.title }}</div>
                    </a-tooltip>
                      <a-tooltip placement="bottom">
                      <template #title>{{ record.contentInfo.content }} </template>
                      <div class="pt-5px"><span v-if="record.contentInfo.content">补充：</span>{{ record.contentInfo.content }}</div>
                      </a-tooltip>
                    </div>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'comment'">
                  <div class="rich-resource ellipsis-2">
                    <a @click="openDetailDialog(record)" v-if="record.comment"> 查看回答 </a>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'creator'">
                  <!--@click="changeItem(record)"-->
                  <span>{{ record.creator }}</span> <span>{{ record.phone }}</span>
                </template>
                <!-- 0 未审核 ，1 审核通过，2审核不通过，默认0  -->
                <template v-if="column.dataIndex === 'status'">
                  <span v-if="record.status === 0">待审核</span>
                  <span v-else-if="record.status === 1">审核通过</span>
                  <span v-else-if="record.status === 2">审核不通过</span>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <!--@click="releaseQuest"-->

                  <AButton
                    v-if="record.status === 0"
                    type="link"
                    @click="openDetailDialog(record)"
                    v-auth="'/v1/community/content/answer/detail'"
                    >查看详情
                  </AButton>
                  <APopconfirm
                    v-if="record.status === 0"
                    title="该操作将允许该问题在信息流中展示，确定操作吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerAccessRow(record)"
                    v-auth="'/v1/community/content/answer/approved'"
                  >
                    <AButton type="link">审核通过</AButton>
                  </APopconfirm>
                  <AButton
                    v-if="record.status === 0"
                    type="link"
                    @click="openRejectDialog(record)"
                    v-auth="'/v1/community/content/answer/reject'"
                    >驳回
                  </AButton>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="openDetailComment(record)"
                    v-auth="'/v1/community/content/answer/query/comment'"
                    >查看评论
                  </AButton>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerChangeRow(record)"
                    v-auth="'/v1/community/content/answer/modify'"
                    >修改
                  </AButton>
                  <AButton
                    v-if="record.status === 1 && record.isOffSale === 0"
                    type="link"
                    @click="handlerShelfRow(record)"
                    v-auth="'/v1/community/content/answer/off/sale'"
                  >
                    下架
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
                      v-auth="'/v1/community/content/answer/off/sale'"
                      >上架</AButton
                    >
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
                      v-auth="'/v1/community/content/answer/recommend'"
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
                      v-auth="'/v1/community/content/answer/recommend'"
                      >推荐</AButton
                    >
                  </APopconfirm>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerDeletedRow(record)"
                    v-auth="'/v1/community/content/answer/delete'"
                    >删除
                  </AButton>
                  <AButton
                    v-if="record.status === 2"
                    type="link"
                    @click="showRejectReason(record)"
                    v-auth="'/v1/community/content/answer/condition'"
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
        width="1200px"
        :title="detailModal.title"
        v-model:visible="detailModal.visible"
        :zIndex="500"
        :footer="null"
      >
        <div class="padding-15 fz-16" style="height: 500px; overflow-y: auto">
          <div style="background-color: #ececec; padding: 20px">
              <a-row :gutter="16">
                <a-col :span="10">发布时间:{{ detailModal.vo.createTime }}</a-col>
                <a-col :span="8">作者:{{ detailModal.vo.nickName }}/{{ detailModal.vo.mobile }}</a-col>
                <a-col :span="6"
                  >发布人:{{ detailModal.vo.releaseNickName }}/{{
                    detailModal.vo.releaseMobile
                  }}</a-col>
              </a-row>
            </div>
          <div>
            <div class="show-row">
              <div class="text-gray-900 font-semibold ... pt-24px">问题</div>
              <div class="show-row__content py-5px"><span v-if="detailModal.vo.contentInfo.title">问题：</span>{{ detailModal.vo.contentInfo.title }}</div>
              <div class="show-row__content py-5px"><span v-if="detailModal.vo.contentInfo.content">补充：</span>{{ detailModal.vo.contentInfo.content }}</div>
              <div class="show-row__content py-5px">
                <div class="flex items-center">
                  <div class="m-10px flex">
                    <div
                      v-for="(item, index) in detailModal.vo.contentInfo?.fileUrl
                        ?.replaceAll(',', '|')
                        .split('|')"
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
              </div>
            </div>
            <div class="show-row">
              <div class="text-gray-900 font-semibold ... pt-15px">回答</div>
              <div class="show-row__content py-10px">
                <AButton @click="openDetailAnswer(detailModal.vo)" type="link">查看详情</AButton>
              </div>
    
            </div>
         
          </div>
        </div>

        <template #footer>
          <AButton v-if="detailModal.vo.status === 0" @click="handlerRejectRowByModal"
            >驳回</AButton
          >
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
      </AModal>
    </div>
    <AModal title="查看原因" :zIndex="1001" v-model:visible="reasonModal.visible" @ok="reasonShelf">
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
      title="删除原因"
      :zIndex="1001"
      v-model:visible="deleteModal.visible"
      @ok="handlerDeleteRow"
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
                  >置顶</AButton
                >
              </div>
              <div v-else>
                <APopconfirm
                  title="确定要置顶吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="topping(record)"
                >
                  <AButton v-if="record.isTop === 0 && record.level === 1" type="link"
                    >置顶</AButton
                  >
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
              <AButton type="link" @click="handlerDeletedRow(record)">删除</AButton>
            </template>
            <template v-if="column.dataIndex === 'comment'">
              <AButton type="text" @click="dialogComment(record)"
                ><p class="overflow-ellipsis overflow-hidden ..." style="width: 120px">{{
                  JSON.parse(record.comment)?.json
                }}</p></AButton
              >
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
    <!-- 修改 -->
    <AModal width="1000px" :title="changeModal.title" v-model:visible="changeModal.visible">
      <div class="padding-15 fz-16">
        <div class="show-row">
          <div class="show-row__label py-5px">问题</div>
          <div class="show-row__content py-5px">{{ changeModal.vo.contentInfo?.title }}</div>
          <div class="show-row__content py-5px">{{ changeModal.vo.contentInfo?.content }}</div>
          <div class="show-row__content py-5px">
            <VoContent
              :source="changeModal.vo.contentInfo?.fileUrl.split('|')[0]"
              :poster="
                changeModal.vo.contentInfo?.fileUrl.split('|')[1] ||
                changeModal.vo.contentInfo?.fileUrl.split('|')[0] + '&type=3'
              "
              :title="null"
              :content="null"
            />
          </div>
        </div>
        <div class="show-row">
          <div class="show-row__label py-5px">回答</div>
          <div class="show-row__content py-5px">
            <AButton @click="openDetailAnswer(changeModal.vo)" type="link">查看详情</AButton>
          </div>
        </div>
        <a-row>
          <a-col :span="8">发布时间:{{ changeModal.vo.createTime }}</a-col>
          <a-col :span="8">作者:{{ changeModal.vo.nickName }}/{{ changeModal.vo.mobile }}</a-col>
          <a-col :span="8"
            >发布人:{{ changeModal.vo.releaseNickName }}/{{ changeModal.vo.releaseMobile }}
          </a-col>
        </a-row>
      </div>

      <template #footer>
        <AButton @click="changeModal.visible = false">取消</AButton>
        <AButton type="primary" @click="changeAnswer">确认</AButton>
      </template>
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

    <AModal
      width="1200px"
      :title="detailAnswer.title"
      v-model:visible="detailAnswer.visible"
      :zIndex="1000"
      @ok="handleChange"
    >
      <div class="p-10">
        <EraEditor :height="800" :width="900" ref="VoWangEditorRef" />
      </div>
    </AModal>
    <AModal
      width="1200px"
      title="查看问题"
      v-model:visible="questionVisible"
      :footer="null"
      :zIndex="1000"
    >
      <div class="p-10 flex">
        <div v-for="(item, index) in questionDetail.fileUrl?.replaceAll(',', '|').split('|')">
          <VoContent :key="index" :source="item" :poster="item" :title="null" :content="null" />
        </div>
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, onBeforeMount } from 'vue'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import AnswerFilterForm from '/@/modules/ContentModule/view/CircleManage/AnswerManage/component/AnswerFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { containerConfig } from '/@/modules/ContentModule/view/CircleManage/AnswerManage/data/AnswerListContainerData'
  import CommentAssignForm from './component/CommentAssignForm.vue'
  import { commentConfig } from '/@/modules/ContentModule/view/CircleManage/AnswerManage/data/commentColumns'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  // 内容组件
  import VoContent from '/@/components/VoContent/VoContent.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  const classData = ref([])
  const divEditBox = ref<any>('')
  const commentParse = ref<any>('')
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  //回答详情弹窗
  const VoWangEditorRef = ref()
  const detailAnswer = reactive({
    title: '回答详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })
  const openDetailAnswer = (item) => {
    console.log(item, 'item.comment')
    detailAnswer.currentId = item.id
    let str = JSON.parse(item.comment).json || item.comment
    console.log(str, 'str')

    if (str) {
      // 匹配img自定义封面图标正则
      const reg2 = /<img[^<]*data-custom=[^>]*\.mp4"[^>]*>/g
      const imgReg = /http[^"]*\.jpg/g
      // 匹配视频地址正则
      const video = /video=.*\.mp4/g
      // 进行img转 video
      const afterHtmlStr = str.replace(reg2, (val) => {
        // 取出data-custom值
        const v = val.match(video)
        const poster = val.match(imgReg)
        const vs = v[0].replace('video=', '')

        return `<video style="width: 500px; height:300px;" controls src="${vs}" poster="${poster[0]}"  preload width="500" height="600"></video>`
      })
      commentParse.value = afterHtmlStr
    }
    console.log(commentParse.value, 'commentParse.value ')

    setTimeout(() => {
      VoWangEditorRef.value?.setHtml(commentParse.value)
    }, 300)
    detailAnswer.visible = true
  }
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
    await loadAssignData()
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
      const { code, data } = await adminHttp.COMMUNITY.communityContentAnswerQueryComment(
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

  /**修改 */
  const changeModal = reactive({
    title: '修改回答',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
    comment: '',
  })
  const handlerChangeRow = (item) => {
    changeModal.visible = true
    changeModal.vo = item
    changeModal.comment = JSON.parse(item.comment).json
    changeModal.currentId = item.id
  }
  const changeAnswer = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentAnswerModify({
      id: changeModal.currentId,
      comment: JSON.stringify(divEditBox.value.innerHTML),
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        loadTableData()
        changeModal.visible = false
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  /**修改 */

  /** detail modal start **/
  const detailModal = reactive({
    title: '查看详情',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })

  const handlerRejectRowByModal = () => {
    openRejectDialog(detailModal.vo)
  }

  const restDetailModel = () => {
    detailModal.currentId = ''
    detailModal.vo = {}
    detailModal.visible = false
  }
  //查看问题
  const questionVisible = ref<boolean>(false)
  const questionDetail = ref<any>('')
  const openQuestion = (item) => {
    console.log(item, 'item')
    questionVisible.value = true
    questionDetail.value = item
  }
  ///v1/community/content/answer/detail
  const openDetailDialog = async (item) => {
    detailModal.title = '回答详情'
    detailModal.currentId = item.id

    adminHttp.COMMUNITY.communityContentAnswerDetail({ id: item.id }).then((res) => {
      console.log(res)
      detailModal.vo = res.data
      detailModal.visible = true
    })
  }
  //修改
  const handleChange = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentAnswerModify({
        id: detailAnswer.currentId,
        comment: JSON.stringify({ json: VoWangEditorRef.value.getHtml() }),
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      detailAnswer.visible = false
      changeModal.visible = false
      detailModal.visible=false
      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  //审核
  const handlerAccessRowByModal = () => {
    detailModal.confirmLoading = true
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentAnswerApproved({ id: detailModal.currentId })
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

  /** 审核 /v1/community/content/answer/approved**/
  const handlerAccessRow = (item) => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentAnswerApproved({ id: item.id })
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
  })
  //删除弹框
  const handlerDeletedRow = (item) => {
    deleteModal.currentItem = { ...item }
    deleteModal.currentId = item.id
    deleteModal.deleteReason = ''
    deleteModal.visible = true
  }
  //删除按钮
  const handlerDeleteRow = async () => {
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
      // loadAssignData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
    }
  }
  /**删除*/
  //推荐v1/community/content/idea/cancel/recommend
  const handlerRecommend = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentAnswerCancelRecommend({
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
      const res = await adminHttp.COMMUNITY.communityContentAnswerRecommend({
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
  //上架
  const putOn = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentAnswerOffSale({
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
  //下架按钮
  const handlerShelf = async () => {
    try {
      if (!shelfModal.deleteReason) {
        throw Error('下架原因必填')
      }
      shelfModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentAnswerOffSale({
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
    reasonModal.deleteReason = item.reason
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
  //驳回/v1/community/content/answer/reject
  const handlerRejectRow = () => {
    try {
      if (!rejectModal.rejectReason) {
        throw Error('拒绝内容必填')
      }
      rejectModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      adminHttp.COMMUNITY.communityContentAnswerReject({
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
  let tabColumns = ref(containerConfig.tableColumns)
  const tableLoading = ref(false)
  const paginations = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  watch(activeKey, async (key) => {
    activeKey.value = key
    paginations.total = 0
    paginations.current = 1
    paginations.pageSize = 10
    if (activeKey.value === 'one') {
      tabColumns.value = containerConfig.tableColumns
    } else {
      tabColumns.value = containerConfig.tableColumnsPart
    }
    await loadTableData()
  })

  let tableData = ref([])

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    console.log(current, pageSize)
    paginations.current = current
    paginations.pageSize = pageSize
    loadTableData()
  }

  //初始化
  const statusAttrs = { one: 0, two: 1, three: 2 }
  const loadTableData = async () => {
    tableLoading.value = true
    const filterParams = {
      ...filterData.value,
      status: statusAttrs[activeKey.value],
      pageSize: paginations.pageSize,
      pageNo: paginations.current,
      orderType: 'DESC',
    }
    if (filterParams.time) {
      filterParams.startTime = filterParams.time[0] + ' 00:00:00'
      filterParams.endTime = filterParams.time[1] + ' 23:59:59'
    }
    const { data } = await adminHttp.COMMUNITY.communityContentAnswerCondition(
      clearObjectUnalbeAttr(filterParams),
    )
    tableLoading.value = false
    console.log(data.records)
    paginations.total = data.total
    tableData.value = data.records
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
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
  const dialog = reactive({
    visible: false,
    value: '',
  })
  const dialogComment = (record) => {
    dialog.visible = true
    dialog.value = JSON.parse(record.comment)?.json
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
  // 评论
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-container {
    background-color: white;
  }

  .rich-column {
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
