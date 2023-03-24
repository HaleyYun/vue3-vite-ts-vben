<template>
  <EraProForm
    modal-width="1000px"
    layout="inline"
    mode="modal"
    ref="eraProForm"
    :title="'添加' + text"
    @submit="handlerOpFormSave"
    @rest="handlerOpFormRest"
  >
    <template #modalButton>
      <AButton type="primary" @click="sendThink">发布{{ text }}</AButton>
    </template>
    <template #formContainer>
      <div class="p-4">
        <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
          <template #resourceSlot="{ model, field }">
            <div class="margin-b-10">
              <a-radio-group v-model:value="resrouceType">
                <a-radio value="img">图片</a-radio>
                <a-radio value="video">视频</a-radio>
              </a-radio-group>
            </div>
            <!--<EraUploadImage></EraUploadImage>-->
            <div>
              <EraUpload
                v-if="resrouceType === 'img'"
                :uploadType="resrouceType"
                :fileListData="fileUrl"
                :maxSize="50"
                :maxNumber="9"
                uploadFuncChannel="localStore"
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
                uploadFuncChannel="localStore"
                upload-tip="点击上传视频"
                :maxSize="200"
                :maxNumber="1"
                :multiple="true"
                help-text="建议上传 16:9 、mp4格式视频"
                @done="handleDone"
                @delete="handerUpDel"
              />
            </div>
          </template>

          <template #allowSlot="{ model, field }">
            <a-radio-group v-model:value="model[field]">
              <a-radio :value="0">全部可见</a-radio>
              <a-radio :value="1">仅供应商可见</a-radio>
              <a-radio :value="2">仅代理商可见</a-radio>
              <a-radio :value="3">仅投资人可见</a-radio>
            </a-radio-group>
            <!-- <div class="c7 margin-t-10">不勾选该选项则内容发布后全员可见。</div> -->
          </template>
        </BasicForm>
      </div>
    </template>
  </EraProForm>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { getOpFormConfig } from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { uploadFileFnByTencentCos } from '/@/api/sys/upload'

  const fileUrl = ref([])
  const { createMessage } = useMessage()
  const eraProForm = ref()
  const prop = defineProps({ type: { default: 'think' }, text: { default: '想法' } })
  const emit = defineEmits(['resetData'])

  let imgs = ref<string[]>([])
  let video = ref([])

  const handleDone = (info) => {
    console.log(info)
    const file = info.file
    if (resrouceType.value === 'img') {
      imgs.value.push(file.filePath)
    } else {
      video.value = [file.filePath, file.picUrl]
    }
  }

  const handerUpDel = (record) => {
    console.log({ record })
    if (resrouceType.value === 'img') {
      imgs.value.splice(record)
    } else {
      video.value = []
    }
  }

  const handerUpDelByPreview = (url: string) => {
    console.log({ url })
  }

  const handleSubmit = async (values: any) => {
    console.log(values)
    let fileUrl = resrouceType.value === 'img' ? imgs.value.join(',') : video.value.join(',')
    let params = { ...values, fileUrl }
    try {
      let res
      if (prop.type == 'think') {
        res = await adminHttp.CONTENTMENT.communityContentIdeaRelease(params)
      } else {
        res = await adminHttp.CONTENTMENT.communityContentQuestionRelease(params)
      }
      if (res.code == '20001') {
        console.log(eraProForm.value)
        eraProForm.value && eraProForm.value.hiddenModal()
        createMessage.success('操作成功')
        emit('resetData')
      }
    } catch (e) {
      console.log(e)
    }
  }
  const sendThink = () => {
    resetFields()
    eraProForm.value && eraProForm.value.showModal()
  }

  const handlerOpFormRest = () => {}

  const schemas: FormSchema[] = getOpFormConfig(prop.type)
  const [register, { submit: opFormSbumitFunc, resetFields }] = useForm({
    labelWidth: 100,
    schemas: schemas,
    showSubmitButton: false,
    showResetButton: false,
  })

  const handlerOpFormSave = async () => {
    opFormSbumitFunc()
  }

  const resrouceType = ref('img')
</script>
<style scoped lang="less"></style>
