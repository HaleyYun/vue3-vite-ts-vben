<template>
  <EraProForm
    title="申请售后"
    modal-width="1200px"
    layout="horizontal"
    mode="modal"
    @submit="handlerOpFormSave"
    @rest="handlerOpFormRest"
  >
    <template #modalButton>
      <AButton type="link">修改申请</AButton>
    </template>
    <template #formContainer>
      <div class="container p-4">
        <div class="left">
          <img
            class="inline-block mb-5"
            style="width: 200px; height: 200px"
            src="../../../../../../assets/images/assets.png"
            alt=""
          />
          <div class="mb-5">订单单号：XXXXXXXXXXXXXXXXX </div>
          <div>商品名称：这里是商品名称 </div>
        </div>
        <div class="right">
          <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
            <template #titleSlot="{ model, field, schema }">
              <AInput :placeholder="schema.componentProps.placeholder" v-model="model[field]" />
            </template>

            <template #resourceSlot="{ model, field }">
              <!--<EraUploadImage></EraUploadImage>-->
              <div >
                <EraUpload
                  v-if="resrouceType === 'img'"
                  :maxSize="50"
                  :maxNumber="1"
                  :uploadParams="uploadCommonParams"
                  :multiple="true"
                  :showUploadList="true"
                  :showHelpText="false"
                  upload-tip="上传"
                  help-text="请上传图片"
                  @change="handleChange"
                  @done="handleDone"
                  @delete="handerUpDel"
                  @preview-delete="handerUpDelByPreview"
                  :accept="['jpg', 'jpeg', 'png']"
                  :api="uploadApi"
                />
              </div>
            </template>

            <!-- <template #contentSlot="{ model, field }">
              <ATextarea v-model="model[field]" />
            </template> -->
            <template #goodsSlot="{ model, field }">
              <AInput prefix="￥" v-model="model[field]" disabled />
            </template>
            <template #refundSlot="{ model, field }">
              <AInput prefix="￥" v-model="model[field]" />
            </template>
          </BasicForm> </div
      ></div>
    </template>
  </EraProForm>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { useMessage } from '/@/hooks/web/useMessage'
  import EraProForm from '/@/components/EraProForm/EraProForm.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { opFormConfig } from '/@/modules/OrderModule/view/AgentOrder/AgentHandleOrder/data/HandContainerEdit'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { uploadFileFnByTencentCos } from '/@/api/sys/upload'

  const { createMessage } = useMessage()

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
    createMessage.success('click search,values:' + JSON.stringify(values))
  }

  //
  // const FORM_ITEM_LABEL_COL = { span: 3, offset: 0 }
  // const FORM_ITEM_WRAPPER_COL = { span: 12, offset: '' }

  // const content = ref('')

  const handlerOpFormRest = () => {}

  const schemas: FormSchema[] = opFormConfig
  const [register, { submit: opFormSbumitFunc }] = useForm({
    schemas: schemas,
    labelWidth: 120,
    showSubmitButton: false,
    showResetButton: false,
  })

  const handlerOpFormSave = async () => {
    opFormSbumitFunc()
    // const formData = this.$refs.opForm
    // try {
    //   //应急
    //   await adminHttp.$service
    //     .apiPost({
    //       ...values,
    //       url: adminHttp.getFullUrlByAdmin('community/content/idea/release'),
    //     })
    //     .then((res) => {
    //       console.log(res)
    //       // return res
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       console.log(`获取想法列表失败:${err.message}`)
    //       return []
    //     })
    // } catch (e) {}
  }

  const resrouceType = ref('img')
</script>
<style scoped lang="less">
  .container {
    display: flex;
    .left {
      // flex-grow: 3;
      width: 480px;
      padding: 10px;
      text-align: center;
    }
    .right {
      // flex-grow: 3;
      flex: 1;
    }
  }
</style>
