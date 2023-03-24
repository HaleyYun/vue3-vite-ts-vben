<template>
 <div>
  <div class="detail-bg m-24px single-page-verticalAllInner">
    <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
      <template #titleSlot="{ model, field, schema }">
        <AInput
          :placeholder="schema.componentProps.placeholder"
          v-model="model[field]"
          class="col-assets"
        />
      </template>
      <template #slotCode="{ model, field }">
        <a-select style="width: 25%" v-model:value="model[field]" placeholder="请选择角色" disabled>
          <a-select-option value="skilledWorker">集师傅</a-select-option>
        </a-select>
      </template>

      <template #slotCategory="{ model, field }">
        <a-select
          v-if="routeId"
          style="width: 25%"
          :options="classData"
          v-model:value="model[field]"
          placeholder="请选择类别"
        />
        <a-select
          v-else
          style="width: 25%"
          :options="classData"
          v-model:value="model[field]"
          mode="multiple"
          placeholder="请选择类别"
        />
      </template>

      <template #resourceSlot="{ model, field }">
        <div class="margin-b-10">
          <a-radio-group v-model:value="resrouceType" @change="radioChange()">
            <a-radio value="img">图文</a-radio>
            <a-radio value="video">视频</a-radio>
          </a-radio-group>
        </div>
        <div style="width: 80%">
          <AFormItem>
            <EraUpload
              v-if="resrouceType === 'img'"
              :uploadType="resrouceType"
              uploadFuncChannel="localStore"
              :fileListData="fileUrl"
              :maxSize="50"
              :maxNumber="1"
              :multiple="false"
              upload-tip="点击上传图片"
              help-text="建议上传 375*200px， jpg/png/jpge格式图片"
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
              :maxSize="200"
              :maxNumber="1"
              :multiple="false"
              help-text="建议上传 16:9 、mp4格式视频"
              @done="handleDoneVideo"
              @delete="handerUpDel"
            />
          </AFormItem>
        </div>
      </template>
      <template #contentSlot="{ model, field }">
        <div style="width: 80%">
          <EraEditor :height="300" :width="400" ref="VoWangEditorRef" />
        </div>
      </template>
    </BasicForm>
  </div>
  <div class="detail-bottom">
    <AButton type="primary" class="margin-r-10" @click="cancelStepBeforePageFunc">取消</AButton>
    <AButton
      type="primary"
      @click="createStudyCenterEvent"
      v-auth="'/v1/content/certificationCourse/save'"
      >提交
    </AButton>
  </div>
 </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, onMounted } from 'vue'
  import { useForm, BasicForm } from '/@/components/Form'
  import { CurriculumCenterDetailsForm } from '/@/modules/ContentModule/view/Authentication/data/CurriculumCenterData'
  import { useContentWithOut } from '/@/store/modules/content'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { fileImgUploadInfo, fileVideoUploadInfo } from '/@/api/sys/upload'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute } from 'vue-router'
  import { router } from '/@/router'

  const userStore = useContentWithOut()
  const { createMessage } = useMessage()

  import adminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name:'CurriculumContent',
    components: {
      BasicForm,
      EraUpload,
    },
    setup() {
      const route = useRoute()
      const routeId = route.query.id
      let classData = ref([] as any[])
      const fileUrl = ref([])
      const fileDuration = ref()
      const fileUrlVideo = ref([])
      const categoryId = ref([])
      const VoWangEditorRef = ref()
      let imgs = ref<string[]>([])
      let video = ref('')
      const uploadCommonParams = {}
      const resrouceType = ref('img')
      let detail = userStore.getDetail
      const [register, { submit, setFieldsValue, updateSchema }] = useForm({
        schemas: CurriculumCenterDetailsForm,
        labelWidth: 120,
        showSubmitButton: false,
        showResetButton: false,
      })
      watch(
        fileUrl,
        (val) => {
          setFieldsValue({
            fileUrl: val.join(','),
          })
        },
        { deep: true },
      )
      watch(
        fileUrlVideo,
        (val) => {
          setFieldsValue({
            fileUrl: val.join(','),
          })
        },
        { deep: true },
      )

      onMountedOrActivated(() => {
        getClassDataEvent()
        console.log(route.query)
        if (route.query.id) {
          detail.fileUrl && (fileUrl.value = detail.fileUrl.split(','))
          // setFieldsValue({
          //   categoryId: [detail.categoryId],
          // })
          if (detail.type == 2) {
            resrouceType.value = 'video'
            detail.fileUrl && (fileUrlVideo.value = detail.fileUrl.split(','))
          }
          setTimeout(() => {
            detail.content && VoWangEditorRef.value.setHtml(JSON.parse(detail.content).json)
          }, 300)

          setFieldsValue({
            categoryId: detail.categoryId,
            name: detail.name,
            isEnable: detail.isEnable,
            type: detail.type,
          })
        }

        if (route.query.id) {
          updateSchema({
            field: 'categoryId',
            ifShow: true,
          })
          updateSchema({
            field: 'categoryIds',
            ifShow: false,
          })
        } else {
          updateSchema({
            field: 'categoryIds',
            ifShow: true,
          })
          updateSchema({
            field: 'categoryId',
            ifShow: false,
          })
        }
        if (resrouceType.value === 'video') {
          updateSchema({
            field: 'content',
            ifShow: false,
          })
        } else {
          updateSchema({
            field: 'content',
            ifShow: true,
          })
        }
      })

      const toggleTheme = () => {
        const markDown = unref(markDownRef)
        if (!markDown) return
        const vditor = markDown.getVditor()
        vditor.setTheme('dark')
      }
      const radioChange = () => {
        if (resrouceType.value === 'video') {
          updateSchema({
            field: 'content',
            ifShow: false,
          })
          fileUrl.value = []
        } else {
          updateSchema({
            field: 'content',
            ifShow: true,
          })
          fileUrlVideo.value = []
        }

        // fileUrl.value = []
      }
      const handleDoneVideo = (info) => {
        if (resrouceType.value === 'img') {
          fileUrlVideo.value.push(info.file.filePath)
        } else {
          fileUrlVideo.value = [info.file.filePath, info.file.picUrl]
        }
        fileDuration.value = info.file.duration
        console.log(info.file.duration, '111url地址')
      }

      const handleDone = (info) => {
        if (resrouceType.value === 'img') {
          fileUrl.value.push(info.file.filePath)
        } else {
          fileUrl.value = [info.file.filePath, info.file.picUrl]
        }

        console.log(fileUrl, 'url地址')
      }
      const handerUpDel = (record) => {
        if (resrouceType.value === 'img') {
          console.log(record, 'img地址')
          fileUrl.value = fileUrl.value.filter((item) => item != record.url)
          // console.log(fileUrl.value)
        } else {
          fileUrlVideo.value = []
        }
      }

      const initCreateStudyCenterData = async () => {
        await submit()
        // const { code } adminHttp.CONTENTMENT.contentContentSave()
      }
      const handleSubmit = async (values: any) => {
        if (resrouceType.value === 'img') {
          if (VoWangEditorRef.value.getHtml() == '<p><br></p>') {
            createMessage.error('有内容未填写，请完成后再提交')
            return false
          }
        }

        let map = {
          categoryIds: values.categoryIds,
          duration: fileDuration.value,
          content:
            resrouceType.value === 'img'
              ? JSON.stringify({ json: VoWangEditorRef.value.getHtml() })
              : '{}',
          fileUrl: resrouceType.value === 'img' ? fileUrl.value[0] : fileUrlVideo.value[0],
          name: values.name,
          platformCode: values.platformCode,
          type: resrouceType.value === 'img' ? 1 : 2,
          isEnable: values.isEnable,
        }
        //编辑
        let editMap = {
          categoryId: values.categoryId,
          duration: fileDuration.value,
          content:
            resrouceType.value === 'img'
              ? JSON.stringify({ json: VoWangEditorRef.value.getHtml() })
              : '{}',
          fileUrl: resrouceType.value === 'img' ? fileUrl.value[0] : fileUrlVideo.value[0],
          name: values.name,
          platformCode: values.platformCode,
          type: resrouceType.value === 'img' ? 1 : 2,
          isEnable: values.isEnable,
          id: routeId,
        }
        try {
          if (route.query.id) {
            console.log(route.query.id)
            map.id = route.query.id
            const { code } = await adminHttp.CONTENT.contentCertificationCourseModify(editMap)
            if (code == '20001') {
              createMessage.success('编辑成功')
              router.go(-1)
            } else {
              createMessage.error('编辑失败')
            }
          } else {
            const { code } = await adminHttp.CONTENT.contentCertificationCourseSave(map)
            if (code == '20001') {
              createMessage.success('创建成功')
              router.go(-1)
            } else {
              createMessage.error('创建失败')
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      const createStudyCenterEvent = () => {
        initCreateStudyCenterData()
      }
      const cancelStepBeforePageFunc = () => {
        router.go(-1)
      }
      const getClassDataEvent = async () => {
        try {
          const res = await adminHttp.CONTENT.contentCertificationCourseCategoryCondition({
            platformCode: 'skilledWorker',
            isEnable: true,
          })
          if (res.code === '20001') {
            classData.value = []
            classData.value = res.data.records.map((item) => ({
              label: item.name,
              value: item.id,
            }))
            console.log(classData.value)
          } else {
            createMessage.error('操作失败')
          }
        } catch (err: any) {}
      }
      // const changeCodeEvent = (item, model) => {
      //   const map = { platformCode: 'skilledWorker' }
      //   model.categoryId = ''
      //   console.log(model.categoryId)
      //   getClassDataEvent(map)
      // }

      return {
        routeId,
        handleDone,
        handleDoneVideo,
        handerUpDel,
        radioChange,
        register,
        createStudyCenterEvent,
        cancelStepBeforePageFunc,
        handleSubmit,
        // changeCodeEvent,
        fileImgUploadInfo,
        fileVideoUploadInfo,
        classData,
        fileUrl,
        resrouceType,
        uploadCommonParams,
        imgs,
        video,
        detail,
        VoWangEditorRef,
        toggleTheme,
        categoryId,
        fileUrlVideo,
        fileDuration,
      }
    },
  })
</script>
<style lang="less">
  .col-assets {
    width: 30%;
  }

  .detail-bg {
    overflow: scroll;
    height: calc(100vh - 126px);
    background: #fff;
    padding: 15px;
  }

  .detail-bg::-webkit-scrollbar-track {
    background-color: #fff;
  }

  .detail-bottom {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background: #fff;
    padding: 15px 0;
  }
</style>
