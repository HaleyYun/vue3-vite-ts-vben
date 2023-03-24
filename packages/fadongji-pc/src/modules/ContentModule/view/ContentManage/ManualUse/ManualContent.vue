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
        <a-select
          style="width: 25%"
          v-model:value="model[field]"
          placeholder="请选择角色"
          @change="changeCodeEvent(model[field], model)"
        >
          <a-select-option value="supplier">供应商</a-select-option>
          <a-select-option value="agent">服务商</a-select-option>
          <a-select-option value="garage">修理厂</a-select-option>
        </a-select>
      </template>

      <template #slotCategory="{ model, field }">
        <a-select
          style="width: 25%"
          :options="classData"
          v-model:value="model[field]"
          placeholder="请选择类别"
        />
      </template>

      <template #resourceSlot="{ model, field }">
        <div class="margin-b-10">
          <a-radio-group v-model:value="resrouceType" @change="radioChange">
            <a-radio value="img">图片</a-radio>
            <a-radio value="video">视频</a-radio>
          </a-radio-group>
        </div>
        <div style="width: 80%">
          <AFormItem>
            <EraUpload
              v-if="resrouceType === 'img'"
              :uploadType="resrouceType"
              :fileListData="fileUrl"
              :maxSize="50"
              :maxNumber="9"
              :multiple="true"
              upload-tip="点击上传图片"
              help-text="最多插入9张图片。"
              @done="handleDone"
              @delete="handerUpDel"
            />
            <EraUpload
              v-if="resrouceType === 'video'"
              :uploadType="resrouceType"
              :fileListData="fileUrl"
              :showUploadList="true"
              upload-tip="点击上传视频"
              :maxSize="200"
              :maxNumber="1"
              :multiple="true"
              help-text="建议上传 16:9 、mp4格式视频"
              @done="handleDone"
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
    <AButton type="primary" @click="createStudyCenterEvent">提交</AButton>
  </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, toRefs, onMounted } from 'vue'
  import { useForm, BasicForm } from '/@/components/Form'
  import { filterManualCenterDetailsForm } from '/@/modules/ContentModule/view/ContentManage/ManualUse/data/ManualCenterData'
  import { useContentWithOut } from '/@/store/modules/content'
  import { uploadFileFnByTencentCos } from '/@/api/sys/upload'
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
    name: 'StudyCenterDetails',
    components: {
      BasicForm,
      EraUpload,
    },
    setup() {
      const route = useRoute()
      let classData = ref([] as any[])
      const fileUrl = ref([])
      const VoWangEditorRef = ref()
      let imgs = ref<string[]>([])
      let video = ref('')
      const uploadCommonParams = {}
      const resrouceType = ref('img')
      let detail = userStore.getDetail
      const [register, { submit: opFormSbumitFunc, setFieldsValue }] = useForm({
        schemas: filterManualCenterDetailsForm,
        labelWidth: 120,
        showSubmitButton: false,
        showResetButton: false,
      })
      onMountedOrActivated(() => {
        const map = { platformCode: detail.platformCode }
        getClassDataEvent(map)
        console.log(route.query)
        if (route.query.id) {
          detail.fileUrl && (fileUrl.value = detail.fileUrl.split(','))
          console.log(fileUrl.value, 'jijjjjjj')
          if (detail.type == 2) {
            resrouceType.value = 'video'
          }
          setTimeout(() => {
            detail.content && VoWangEditorRef.value.setHtml(JSON.parse(detail.content).json)
          }, 300)
          setFieldsValue(detail)
        }
      })

      const toggleTheme = () => {
        const markDown = unref(markDownRef)
        if (!markDown) return
        const vditor = markDown.getVditor()
        vditor.setTheme('dark')
      }
      const radioChange = () => {
        fileUrl.value = []
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
          fileUrl.value = []
        }
      }

      const initCreateStudyCenterData = async () => {
        await opFormSbumitFunc()
        // const { code } adminHttp.CONTENTMENT.contentContentSave()
      }
      const handleSubmit = async (values: any) => {
        if (!VoWangEditorRef.value.getHtml()) {
          createMessage.error('编辑器不能为空值')
          return false
        }

        // console.log(values)
        // console.log(fileUrl.value)
        if (fileUrl.value.length == 0) {
          createMessage.error('上传文件不能为空值')
          return false
        }

        let map = {
          categoryId: values.categoryId,
          duration: 10,
          content: JSON.stringify({ json: VoWangEditorRef.value.getHtml() }),
          fileUrl: fileUrl.value.join(','),
          name: values.name,
          platformCode: values.platformCode,
          type: resrouceType.value === 'img' ? 1 : 2,
          isEnable: true,
        }

        try {
          if (route.query.id) {
            map.id = route.query.id
            const { code } = await adminHttp.CONTENTMENT.contentContentModify(map)
            if (code == '20001') {
              createMessage.success('创建成功')
              router.go(-1)
            } else {
              createMessage.error('创建失败')
            }
          } else {
            const { code } = await adminHttp.CONTENTMENT.contentContentSave(map)
            if (code == '20001') {
              createMessage.success('编辑成功')
              router.go(-1)
            } else {
              createMessage.error('编辑失败')
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
      const getClassDataEvent = async (map) => {
        try {
          const res = await adminHttp.CONTENTMENT.contentCategoryCondition(map)
          if (res.code === '20001') {
            classData.value = []
            classData.value = res.data.records.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          } else {
            createMessage.error('操作失败')
          }
        } catch (err: any) {}
      }
      const changeCodeEvent = (item, model) => {
        const map = { platformCode: item }
        model.categoryId = ''
        console.log(model.categoryId)
        getClassDataEvent(map)
      }

      return {
        handleDone,
        handerUpDel,
        radioChange,
        register,
        createStudyCenterEvent,
        cancelStepBeforePageFunc,
        handleSubmit,
        changeCodeEvent,
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
