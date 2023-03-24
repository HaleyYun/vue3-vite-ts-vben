<template>
  <EraProForm
    ref='editPopRef'
    :title="props.title"
    layout="inline"
    mode="modal"
    @submit="handlerOpFormSave"
    @rest="handlerOpFormRest"
  >
    <template #modalButton>
      <slot name='slotContent'></slot>
    </template>
    <template #formContainer>
      <div class="p-4">
        <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
          <!--<template #titleSlot="{ model, field, schema }">-->
          <!--  <AInput :placeholder="schema.componentProps.placeholder" v-model="model[field]" />-->
          <!--</template>-->
          <!--<template #contentSlot="{ model, field }">-->
          <!--  <ATextarea v-model="model[field]" />-->
          <!--</template>-->
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
import { uploadFileFnByTencentCos } from '/@/api/sys/upload'
import { studyPopData } from '/@/modules/ContentModule/view/StudyCenter/data/studyPopData'
const { createMessage } = useMessage()
const props = defineProps({
  title: {
    type: String,
    default: '',
  }
})
const changeItemId = ref()
const emit = defineEmits(['refreshClass'])
const editPopRef = ref()
let imgs = ref<string[]>([])
let video = ref('')
const uploadCommonParams = {}

const onUploadProgress = function (evt) {
  // console.log(evt)
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
    })
  if (url) params.onSuccess({ url }, params.file)
}

const handleDone = (info) => {
  console.log(info.file)
  const url: string = info.file.response.url
  if (resrouceType.value === 'img') {
    imgs.value.push(url)
  } else {
    video.value = url
  }
  // createMessage.info(`已上传文件444`)
  // createMessage.info(`已上传文件${JSON.stringify(list)}`)
}

const handleChange = () => {
  // console.log(info.file)
  // createMessage.info(`已上传文件444`)
  // createMessage.info(`已上传文件${JSON.stringify(list)}`)
}
const handerUpDel = (record) => {
  console.log({
    record,
  })
}

const handerUpDelByPreview = (url: string) => {
  console.log({ url })
}

const handleSubmit = (values: any) => {
  if (props.title === '新增') {
    let isMonitor = false
    if (values.isEnable) {
      let isMonitor = true
    }
    const insertMap = {name: values.name, platformCode: values.platformCode, isEnable: isMonitor}
   adminHttp.CONTENTMENT.contentCategorySave(insertMap).then(res => {
     createMessage.success('分类创建成功')
     editPopRef.value.hiddenModal()
     resetFields()
     emit('refreshClass')
   }).catch(err => {
     createMessage.error('分类创建失败')
   })
  } else {
    let isMonitor = false
    if (values.isEnable) {
      let isMonitor = true
    }
    const changeMap = {name: values.name, platformCode: values.platformCode, isEnable: isMonitor, id: changeItemId.value}
    adminHttp.CONTENTMENT.contentCategoryModify(changeMap).then(res => {
      createMessage.success('分类修改成功')
      resetFields()
      editPopRef.value.hiddenModal()
      emit('refreshClass')
    }).catch(err => {
      createMessage.error('分类修改失败')
      resetFields()
    })
  }
}
const handlerOpFormRest = () => {
  resetFields()
}

const schemas: FormSchema[] = studyPopData
const [register, { submit: opFormSbumitFunc, resetFields, setFieldsValue,getFieldsValue }] = useForm({
  labelWidth: 100,
  schemas: schemas,
  showSubmitButton: false,
  showResetButton: false,
})
const setFormFieldsValue =(values: any) => {
  changeItemId.value = values.id
  setFieldsValue({
    name: values.name,
    platformCode: [values.platformCode],
    isEnable: values.isEnable
  })

}
const handlerOpFormSave = async () => {
  await opFormSbumitFunc()
}
const resrouceType = ref('img')
defineExpose({
  setFormFieldsValue
})
</script>
<style scoped lang="less"></style>
