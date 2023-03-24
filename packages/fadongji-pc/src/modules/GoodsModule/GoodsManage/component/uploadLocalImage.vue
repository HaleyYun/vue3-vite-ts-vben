<template>
  <GoodsUpload
      :maxSize="50"
      :maxNumber="9"
      :uploadParams="uploadCommonParams"
      :multiple="true"
      upload-tip="点击上传图片"
      help-text="最多插入9张图片。"
      @change="handleChange"
      :show-upload-list="false"
      :show-help-text="false"
      @done="handleDone"
      @delete="handerUpDel"
      @preview-delete="handerUpDelByPreview"
      :accept="['jpg', 'jpeg', 'png']"
      :api="uploadApi"
  />
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { FormSchema, useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { opFormConfig } from '/@/modules/ContentModule/view/ThinkManager/data/ThinkListContainerData'
  import { uploadFileFnByTencentCos } from '/@/api/sys/upload'
import GoodsUpload from "/@/modules/GoodsModule/GoodsManage/component/GoodsUpload.vue";
// import EraUpload from "/@/components/EraUpload/EraUpload.vue";
//   import {storage} from "/@/components/VoGlobalRegister/VoGlobalRegister";
//   import {uploadInfo, uploadType} from "/@/modules/GoodsModule/GoodsManage/view/GoodsForm/data";

  const { createMessage } = useMessage()

  let imgs = ref<string[]>([])
  let video = ref('')
  const uploadCommonParams = {}

  const onUploadProgress = function (evt) {
    // console.log(evt)
  }

  const uploadApi = async (params) => {
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
    console.log(url, '=====url')
    if (url) params.onSuccess({ url }, params.file)
  }

  const handleDone = (info) => {
    createMessage.success('上传图片成功')
    // emit('uploadEnd')
  }

  const handleChange = ({ file, fileList }) => {
    console.log(file.status)
    const status = file.status;
    if (status === 'done') {
      console.log(' file.response.data===', file.response.data)
    } else if (status === 'error') {
      createMessage.error(`${file.name} file upload failed.`)
    }
    // createMessage.info(`已上传文件444`)
    // createMessage.info(`已上传文件${JSON.stringify(list)}`)
  }
  // const handleChange = () => {
  //
  //   // console.log(info.file)
  //   // createMessage.info(`已上传文件444`)
  //   // createMessage.info(`已上传文件${JSON.stringify(list)}`)
  // }
  const handerUpDel = (record) => {
    console.log({
      record,
    })
  }

  const handerUpDelByPreview = (url: string) => {
    console.log({ url })
  }
  const handleSubmit = (values: any) => {
    createMessage.success('click search,values:' + JSON.stringify(values))
  }

  //
  // const FORM_ITEM_LABEL_COL = { span: 3, offset: 0 }
  // const FORM_ITEM_WRAPPER_COL = { span: 12, offset: '' }

  // const content = ref('')

  const handlerOpFormRest = () => {}

  const schemas: FormSchema[] = opFormConfig
  const [register, { submit: opFormSbumitFunc }] = useForm({
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
