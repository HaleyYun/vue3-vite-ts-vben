<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      name="avatar"
      :disabled="disabled || loading || fileList.length >= limit"
      list-type="picture-card"
      class="avatar-uploader"
      :custom-request="uploadImage"
      :show-upload-list="limit > 1"
      :before-upload="beforeUpload"
      :max-count="limit"
      @preview="handlePreview"
      @remove="removeHandler"
    >
      <div v-if="limit === 1">
        <div v-if="imageUrl" class="w-102px h-102px overflow-hidden">
          <img class="w-102px h-102px" :src="imageUrl" alt="avatar" />
        </div>
        <div v-else>
          <div v-if="loading">
            <LoadingOutlined />
            <div class="ant-upload-text">上传中...</div>
          </div>
          <div v-else>
            <PlusOutlined />
            <div class="ant-upload-text">上传</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <div v-if="loading">
            <LoadingOutlined />
            <div class="ant-upload-text">加载中...</div>
          </div>
          <div v-else>
            <PlusOutlined />
            <div class="ant-upload-text">上传</div>
          </div>
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" title="发票预览" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  //
  import { defineEmits, defineProps, ref } from 'vue'
  import { message } from 'ant-design-vue'
  // @ts-ignore
  import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
  import AdminHttp from '/@/utils/http/adminHttp'

  const emits = defineEmits(['success', 'update:value', 'mulSuccess', 'mulImgs', 'change'])
  const props = defineProps({
    limit: {
      type: [String, Number],
      default: 1,
    },
    type: {
      type: [String, Number],
      default: 2,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const previewVisible = ref(false)
  const previewImage = ref('')
  const loading = ref(false)
  const imageUrl = ref(props.value)
  const fileList = ref<any>([])

  const fileOcrData = ref<any>([])

  const handlePreview = async (file) => {
    console.log(file)
    previewImage.value = file.response.url
    previewVisible.value = true
  }

  const handleCancel = () => {
    previewVisible.value = false
  }

  //
  const uploadImage = async ({ file, onSuccess, onError }) => {
    // 自定义上传
    const formData: any = new FormData()
    formData.append('file', file)

    try {
      loading.value = true
      const { data, code } = await AdminHttp.CUSTOMER.apiInvoiceFileOcr(formData)
      loading.value = false
      console.log(code)
      if (+code === 20001) {
        message.success('发票图片识别成功')
        emits('success', data)
        imageUrl.value = data.imgUrl
        const target = data.vatInvoiceInfos.find((item) => item.name === '发票号码').value
        fileOcrData.value.push(target)
        emits('mulSuccess', fileOcrData.value.join(','))

        onSuccess({ url: data.imgUrl }, file)

        if (props.limit === 1) {
          emits('update:value', data.imgUrl)
          emits('change', data.imgUrl)
        } else {
          const urls = fileList.value.map((item) => item.response.url)
          emits('update:value', urls.join(','))
          emits('change', urls.join(','))
          emits('mulImgs', urls.join(','))
        }
        // emitsValue()
      } else {
        // message.error('图片不清晰或者非发票图片，图片识别失败')
        removeHandler(file)
      }
    } catch (e) {
      console.log(file)
      loading.value = false
      removeHandler(file)
      console.warn(e, 'FormUpload')
      message.error('图片不清晰或者非发票图片，图片识别失败')
      onError(e)
      // message.warning('图片上传失败')
    }
  }
  const removeHandler = (file) => {
    const uid = file.uid
    const index = fileList.value.findIndex((item) => item.uid === uid)
    fileOcrData.value.splice(index, 1)
    const imgIndex = fileList.value.findIndex((item) => item.uid === uid)
    fileList.value.splice(imgIndex, 1)
    const files = [...fileList.value]
    const img = files.map((item) => item.response.url)
    emits('mulSuccess', fileOcrData.value.length ? fileOcrData.value.join(',') : '')
    emits('mulImgs', img.length ? img.join(',') : '')
    emits('change', img.length ? img.join(',') : '')
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只允许图片格式上传!')
    }
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      message.error('图片不大于10MB!')
    }
    return isJpgOrPng && isLt2M
  }
</script>

<style scoped lang="less"></style>
