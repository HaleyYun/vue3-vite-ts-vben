<template>
  <div>
    <div>
      <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
    </div>
    <div class="mx-24px mt-72px mb-24px">
      <div class="my-24px bg-white p-24px pb-4px">
        <ProblemFilterForm
          @rest="handlerFilterRest"
          @submit="handlerFilterSubmit"
          :currentTabIndex="activeKey"
        />
      </div>
      <div class="p-24px bg-white">
        <!--<ProblemTable />-->
        <EraSwitchTable :total="paginations.total">
          <template #tableEdit>
            <!-- <ThinkOpForm type="problem" text="问题" @resetData="resetData" /> -->
            <AButton
              type="primary"
              @click="showModal"
              v-auth="'/v1/community/content/question/release'"
              >发布问题
            </AButton>
          </template>
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
                <template v-if="column.dataIndex === 'content'">
                  <!--@click="changeItem(record)"-->
                  <div>
                    <div class="rich-resource">
                      <div class="flex items-center">
                        <problemContent
                          v-if="record?.fileUrl.indexOf('.mp4') > -1"
                          :source="record?.fileUrl?.replaceAll(',', '|').split('|')[0]"
                          :poster="record?.fileUrl?.replaceAll(',', '|').split('|')[1]"
                          :title="null"
                          :content="null"
                        />
                        <div v-else>
                          <a
                            @click="openQuestion(record.fileUrl)"
                            v-if="record.fileUrl"
                            >查看问题</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="rich-content" @click="openDetailDialog(record)">
                      <div>
                        <div v-if="record.title" style="width: 100%" class="truncate ..."
                          >问题:{{ record.title }}</div
                        >
                        <div></div>
                        <div>
                          <div v-if="record.content" style="width: 100%" class="truncate .."
                            >补充:{{ record.content }}</div
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="column.dataIndex === 'status'">
                  <span v-if="record.status === 0">待审核</span>
                  <span v-else-if="record.status === 1">已通过</span>
                  <span v-else-if="record.status === 2">未通过</span>
                </template>
                <template v-if="column.dataIndex === 'operation'">
                  <!--@click="releaseQuest"-->
                  <!-- <AButton type="link" class="submit-btn">写回答</AButton> -->

                  <AButton
                    v-if="record.status === 0"
                    type="link"
                    @click="openDetailDialog(record)"
                    v-auth="'/v1/community/content/idea/detail'"
                    >查看详情
                  </AButton>
                  <APopconfirm
                    v-if="record.status === 0"
                    title="该操作将允许该问题在信息流中展示，确定操作吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerAccessRow(record)"
                  >
                    <AButton type="link" v-auth="'/v1/community/content/question/approved'"
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
                  <!-- <AButton v-if="record.status === 1" type="link" @click="openDetailComment(record)" v-auth="'/v1/community/content/question/query/comment'"
					>查看评论</AButton
				  > -->
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerDisabledRow(record)"
                    v-auth="'/v1/community/content/question/modify'"
                    >修改
                  </AButton>
                  <AButton
                    v-if="record.status === 1"
                    type="link"
                    @click="handlerDeletedRow(record)"
                    v-auth="'/v1/community/content/question/delete'"
                    >删除
                  </AButton>
                  <AButton
                    v-if="record.status === 1 || record.status === 0"
                    type="link"
                    @click="answerRow(record)"
                    v-auth="'/v1/community/content/answer/save'"
                  >
                    写回答
                  </AButton>
                  <AButton
                    v-if="record.status === 1 && record.isOffSale === 0"
                    type="link"
                    @click="handlerShelfRow(record)"
                    v-auth="'/v1/community/content/question/off/sale'"
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
                      type="link" danger
                      v-auth="'/v1/community/content/question/off/sale'"
                      >
                      上架
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
                      v-auth="'/v1/community/content/question/recommend'"
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
                      v-auth="'/v1/community/content/question/recommend'"
                      >推荐
                    </AButton>
                  </APopconfirm>

                  <AButton
                    v-if="record.status === 2"
                    type="link"
                    @click="showRejectReason(record)"
                    v-auth="'/v1/community/content/question/condition'"
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

      <AModal width="1000px" :title="detailModal.title" v-model:visible="detailModal.visible">
        <div class="padding-15 fz-16">
          <div style="background-color: #ececec; padding: 20px">
            <a-row :gutter="16">
            <a-col :span="10">发布时间:{{ detailModal.vo.createTime }}</a-col>
            <a-col :span="8">作者:{{ detailModal.vo.nickName }}</a-col>
            <a-col :span="6">发布人:{{ detailModal.vo.releaseNickName }}</a-col>
          </a-row>
          </div>
         
          <div class="show-row">
            <div class="text-gray-900 font-semibold ... pt-24px">问题</div>
            <div class="show-row__content font-medium ...">{{ detailModal.vo.title }}</div>
          </div>
          <div class="show-row">
            <div class="text-gray-900 font-semibold ... pt-24px">补充内容</div>
            <div class="show-row__content font-medium ...">{{ detailModal.vo.content }}</div>
          </div>
          <div>
            <div class="flex items-center">
              <div class="mt-10px" v-for="(item, index) in checkImg">
                <problemContent
                  :key="index"
                  :source="item"
                  :poster="checkImg[1]"
                  :title="null"
                  :content="null"
                />
              </div>
            </div>
          </div>
         
        </div>

        <template #footer>
          <div class="flex justify-center">
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
          </div>
        
        </template>
      </AModal>
    </div>
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
      title="删除原因"
      :zIndex="1001"
      v-model:visible="deleteModal.visible"
      :confirm-loading="deleteModal.confirmLoading"
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
      width="1000px"
      :title="commentModal.title"
      v-model:visible="commentModal.visible"
      :footer="null"
    >
      <div class="p-5">
        <CommentAssignForm @rest="handlerRest" @submit="handlerSubmit" />

        <ATable :dataSource="assignData" :columns="assignColumns" bordered :pagination="false">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <AButton type="link">删除</AButton>
            </template>
            <template v-if="column.dataIndex === 'comment'">
              <div>{{ JSON.parse(record.comment)?.json }}</div>
            </template>
          </template>
        </ATable>
        <div class="flex justify-end py-15px bg-white">
          <VoPagination
            :size="'default'"
            :total="paginations.total"
            :current="paginations.current"
            :page-size="paginations.pageSize"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </AModal>
    <!-- 修改 -->
    <AModal width="1000px" :title="changeModal.title" v-model:visible="changeModal.visible">
      <div class="padding-15 fz-16">
        <div class="show-row">
          <div class="show-row__label py-5px">问题</div>
          <div class="show-row__content py-5px">
            <a-textarea v-model:value="changeModal.vo.title" :rows="4" show-count :maxlength="50" />
          </div>
        </div>
        <div class="show-row">
          <div class="show-row__label py-5px">补充内容</div>
          <div class="show-row__content py-5px">
            <a-textarea
              v-model:value="changeModal.vo.content"
              :rows="4"
              show-count
              :maxlength="500"
            />
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

    <a-modal
      v-model:visible="ideaVisible"
      width="1000px"
      title="发布问题"
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
            name="title"
            label="请输入问题"
            :rules="[{ required: true, message: '请输入问题' }]"
          >
            <a-textarea
              v-model:value="formState.title"
              placeholder="请输入问题"
              :rows="4"
              show-count
              :maxlength="50"
            />
          </AFormItem>
          <AFormItem
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            name="inputIdeas"
            label="请输入补充内容"
          >
            <a-textarea
              v-model:value="formState.inputIdeas"
              placeholder="请输入补充内容"
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
    <!-- 写回答 -->
    <a-modal
      v-model:visible="answerVisible"
      width="1000px"
      title="写回答"
      @ok="answerOk"
      ok-text="发布"
      destroy-on-close
    >
      <div class="p-15px" @click.stop>
        <div class="px-20">
          <div class="show-row">
            <div class="show-row__label">问题</div>
            <div class="show-row__content">{{ detailModal.vo.title }}</div>
          </div>
          <div class="show-row">
            <div class="show-row__label">补充内容</div>
            <div class="show-row__content">{{ detailModal.vo.content }}</div>
          </div>
          <a-image-preview-group>
            <problemContent :source="checkImg[0]" :poster="checkImg[1]" :title="''" :content="''" />
          </a-image-preview-group>
        </div>
        <AForm ref="formRef" :model="formState" name="basic" autocomplete="off">
          <AFormItem
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            name="inputAnswer"
            label="请输入你的回答"
            :rules="[{ required: true, message: '请输入你的回答' }]"
          >
            <a-textarea
              v-model:value="formState.inputAnswer"
              placeholder="请输入你的回答"
              :rows="4"
              show-count
              :maxlength="500"
            />
          </AFormItem>
          <!-- <AFormItem
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
			  uploadFuncChannel="localStore"
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
			  uploadFuncChannel="localStore"
			  upload-tip="点击上传视频"
			  :maxSize="1024"
			  :maxNumber="1"
			  :multiple="true"
			  help-text="建议上传 16:9 、mp4/mov格式视频"
			  @done="handleDoneVideo"
			  @delete="handerUpDel"
			/>
		  </AFormItem> -->

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
              >
                <a-select
                  :options="authorData"
                  v-model:value="formState.author"
                  placeholder="请选择作者"
                />
              </AFormItem>
              <!--     :rules="[{ required: true, message: '请选择作者' }]" -->
            </a-col>
          </a-row>
        </AForm>
      </div>
    </a-modal>
    <AModal
      width="1200px"
      title="查看问题"
      v-model:visible="questionVisible"
      :footer="null"
      :zIndex="1000"
    >
      <div class="p-10 flex">
        <div v-for="(item, index) in questionDetail?.replaceAll(',', '|').split('|')">
          <problemContent :key="index" :source="item" :poster="item" :title="null" :content="null" />
        </div>
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import { Pattern } from '@vocen/shared'
  import { commentConfig } from '/@/modules/ContentModule/view/CircleManage/VideoManage/data/assignColumns'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import ProblemFilterForm from '/@/modules/ContentModule/view/CircleManage/ProblemManage/component/ProblemFilterForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import EraSwitchTable from '/@/components/EraSwitchTable/EraSwitchTable.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import { containerConfig } from '/@/modules/ContentModule/view/CircleManage/ProblemManage/data/ProblemListContainerData'
  import CommentAssignForm from './component/CommentAssignForm.vue'
  // 内容组件
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import VoContent from '/@/components/VoContent/VoContent.vue'
  import problemContent from '../ProblemManage/component/problemContent.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import type { FormInstance } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const plainOptions = [
    { label: '供应商', value: 'supplier' },
    { label: '服务商', value: 'agent' },
    { label: '修理厂', value: 'garage' },
    { label: '集师傅', value: 'skilledWorker' },
    { label: '回收公司', value: 'recycling' },
    { label: '旧机买家', value: 'oldMachine' },
  ]
  const platformItem = ref<any>()
  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const fileUrlVideo = ref([])
  const fileUrl = ref([])
  const checkImg = ref<any>([])
  const resrouceType = ref('img')
  const answerVisible = ref<any>(false)
  let columnData = ref([] as any[]) //栏目
  let authorData = ref([] as any[]) //作者
  let categoryData = ref([] as any[]) //类别
  const ideaVisible = ref<boolean>(false) //对话框默认值
  const formRef = ref<FormInstance | undefined>()
  const formState = reactive<FormState>({
    selectColumn: null,
    selectCategory: null,
    createTogether: null,
    inputIdeas: '',
    range: null,
    thumbs: '',
    author: null,
    uploadType: '',
    title: '',
    inputAnswer: '',
  })

  interface FormState {
    selectColumn: any
    selectCategory: any
    createTogether: any
    inputIdeas: any
    inputAnswer: any
    range: any
    thumbs: any
    author: any
    uploadType: any
    title: any
  }

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
  const checkSplitType = (value) => {
    if (value.indexOf('|') > 0) {
      return '|'
    } else if (value.indexOf(',') > 0) {
      return ','
    } else {
      return ','
    }
  }
  //communityContentQuestionGetOne
  const openDetailDialog = async (item) => {
    detailModal.title = '内容详情'
    detailModal.currentId = item.id
    adminHttp.COMMUNITY.communityContentIdeaDetail({ id: item.id }).then((res) => {
      console.log(res)
      if (res.data) {
        let splitType = checkSplitType(res.data?.fileUrl)
        checkImg.value = res.data?.fileUrl.split(splitType).map((item) => {
          return item
        })
        console.log(checkImg.value, 'checkImg.value')
      }
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
        loadTableData()
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
      loadTableData()
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
      filterParams.startTime = filterParams.time[0] + ' 00:00:00'
      filterParams.endTime = filterParams.time[1] + ' 23:59:59'
    }
    const { records, total } = await adminHttp.COMMUNITY.communityContentQuestionCondition(
      clearObjectUnalbeAttr(filterParams),
    )
      .then((res) => res.data)
      .catch((err) => {
        // console.log(err)
        console.log(`获取问题列表失败:${err.message}`)
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
    getCategoryFunc()
    getOpRealNameList()
  })

  //推荐v1/community/content/idea/cancel/recommend  。
  const handlerRecommend = async (record) => {
    try {
      await adminHttp.COMMUNITY.communityContentQuestionCancelRecommend({
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
      const res = await adminHttp.COMMUNITY.communityContentQuestionRecommend({
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
      await adminHttp.COMMUNITY.communityContentQuestionOffsale({
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
  //上架
  const putOn = async (record) => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentQuestionOffsale({
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
      deleteModal.confirmLoading = true
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.COMMUNITY.communityContentQuestionDelete({
        id: deleteModal.currentId,
        reason: deleteModal.deleteReason,
      })
      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      restDeleteModal()

      loadTableData()
    } catch (e) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      rejectModal.confirmLoading = false
    }
  }
  /**删除*/
  /** 查看评论 **/
  const commentModal = reactive({
    title: '评论列表',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
  })

  //查看评论/v1/community/content/video/query/comment
  const openDetailComment = async (item) => {
    commentModal.visible = true
    commentModal.currentId = item.id
    loadAssignData()
  }
  const assignColumns = ref(commentConfig.commentColumns)
  const assignData = ref([])
  const loadAssignData = async () => {
    try {
      const filterParams = {
        ...commentData.value,
        ...paginations,
        pageSize: paginations.pageSize,
        pageNo: paginations.current,
        id: commentModal.currentId,
      }
      const { code, data } = await adminHttp.COMMUNITY.communityContentQuestionQueryComment(
        clearObjectUnalbeAttr(filterParams),
      )
      if (code === '20001') {
        paginations.total = data.total
        assignData.value = data.records
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
  const commentData = ref({})
  const handlerSubmit = (values) => {
    paginations.current = 1
    commentData.value = {
      ...values,
      ...paginations,
    }
    loadAssignData()
  }
  // 重置
  const handlerRest = (values) => {
    paginations.current = 1
    commentData.value = {
      ...values,
      ...paginations,
    }
    loadAssignData()
  }
  // 查看评论
  /**修改 */
  const changeModal = reactive({
    title: '修改问题',
    visible: false,
    vo: {},
    confirmLoading: false,
    currentId: '',
    comment: '',
  })
  const handlerDisabledRow = (item) => {
    // console.log(item,'llll');

    changeModal.visible = true
    changeModal.vo = item
    // changeModal.comment = JSON.parse(item.comment)
    changeModal.currentId = item.id
  }
  const changeAnswer = () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    adminHttp.COMMUNITY.communityContentQuestionModify({
      id: changeModal.currentId,
      title: changeModal.vo?.title,
      content: changeModal.vo?.content,
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
  /**发布问题 */
  const showModal = () => {
    ideaVisible.value = true
    formState.selectColumn = null
    formState.selectCategory = null
    formState.range = null
    formState.author = null
    formState.inputIdeas = ''
    formState.thumbs = ''
    formState.title = ''
    fileUrl.value = []
    fileUrlVideo.value = []
  }
  // CONTENTMENT.communityContentIdeaRelease
  const handleOk = () => {
    formRef.value
      .validate()
      .then(() => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp.CONTENTMENT.communityContentIdeaReleaseBatch({
          title: formState.title,
          columnId: formState.selectColumn,
          categoryId: formState.selectCategory,
          content: formState.inputIdeas,
          fileUrl:
            resrouceType.value === 'img' ? fileUrl.value.join('|') : fileUrlVideo.value.join('|'),
          likeCount: formState.thumbs,
          userId: formState.author,
          platformCodes: formState.range,
          businessType: '0',
        })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            loadTableData()
            ideaVisible.value = false
            formState.selectColumn = null
            formState.selectCategory = null
            formState.range = null
            formState.author = null
            formState.inputIdeas = ''
            formState.thumbs = ''
            formState.title = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
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
  /**发布问题 */
  const thumbsChange = () => {
    if (!Pattern.isPositiveNumber(formState.thumbs)) {
      createMessage.error('请输入数字')
      formState.thumbs = ''
    }
  }

  //写回答
  const answerId = {
    id: '',
  }
  const answerRow = async (item) => {
    platformItem.value = item.platformCode
    answerId.id = item.id
    const { code, data } = await adminHttp.COMMUNITY.communityContentIdeaDetail({ id: item.id })
    if (+code === 20001) {
      if (data) {
        let splitType = checkSplitType(data?.fileUrl)
        checkImg.value = data?.fileUrl.split(splitType).map((item) => {
          return item
        })
        console.log(checkImg.value, 'checkImg.value')
      }
      detailModal.vo = data
    }
    formState.thumbs = ''
    answerVisible.value = true
  }
  //回答/v1/community/content/answer/save communityContentAnswerSave
  const answerOk = () => {
    formRef.value
      .validate()
      .then(() => {
        adminHttp.COMMUNITY.communityContentAnswerSave({
          // title: formState.title,
          contentId: answerId.id,
          // categoryId: formState.selectCategory,
          // comment: JSON.stringify(formState.inputAnswer),{"json": "你们好"}
          comment: JSON.stringify({ json: formState.inputAnswer }),
          // fileUrl:
          //   resrouceType.value === 'img' ? fileUrl.value.join(',') : fileUrlVideo.value.join(','),
          likeCount: formState.thumbs,
          userId: formState.author,
          platformCode: platformItem.value,
        })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            loadTableData()
            answerVisible.value = false
            formState.range = null
            formState.author = null
            formState.inputAnswer = ''
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
  }
  //查看问题
  const questionVisible = ref<boolean>(false)
  const questionDetail = ref<any>('')
  const openQuestion = (item) => {
    console.log(item, 'item')
    questionVisible.value = true
    questionDetail.value = item
  }
</script>

<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .rich-column {
    display: flex;

    .rich-resource {
      cursor: pointer;
    }

    .rich-content {
      word-break: break-all;
      white-space: break-spaces;
      overflow: hidden; /*超出隐藏*/
      text-overflow: ellipsis; /*文本溢出时显示省略标记*/
      -webkit-line-clamp: 2; /*文本占的行数,如果要设置2行加...则设置为2*/
      -webkit-box-orient: vertical; /*子代元素垂直显示*/
      white-space: nowrap;
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
