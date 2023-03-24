<template>
    <div>
      <a-upload
        v-model:file-list="fileList"
        name="avatar"
        :disabled="disabled"
        list-type="picture-card"
        class="avatar-uploader"
        :custom-request="uploadImage"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :max-count="1"
        :accept="accept"
      >
        <div v-if="imageUrl" class="w-313px h-200px overflow-hidden">
          <img class="w-320px h-200px" :src="imageUrl" alt="avatar" />
        </div>
        <div v-else>
          <div v-if="loading">
              <LoadingOutlined />
            <div>上传中...</div>
          </div>
          <div v-else>
            <!-- <PlusOutlined />-->
            <div class="ant-upload-text"><img src="../../assets/images/cardCounter.png" alt="avatar" /></div>
          </div>
        </div>
      </a-upload>
    </div>
  </template>
  
  <script setup lang="ts">
    //
    import { defineProps, defineEmits, ref } from 'vue'
    import { message } from 'ant-design-vue'
    // @ts-ignore
    import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
    import AdminHttp from '/@/utils/http/adminHttp'
  
    const emits = defineEmits(['success', 'update:value'])
    const props = defineProps({
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
      accept: {
        type: String,
        default: 'image/*',
      },
    })
  
    const loading = ref(false)
    const imageUrl = ref(props.value)
    const fileList = ref([])
  
    //
    const uploadImage = async ({ file, onSuccess, onError }) => {
      // 自定义上传
      const formData: any = new FormData()
      formData.append('file', file)
      formData.append('type', props.type)
  
      try {
        loading.value = true
        const { data, code } = await AdminHttp.CUSTOMER.apiFileOcr(formData)
        loading.value = false
        console.log(code)
        if (+code === 20001) {
          message.success('图片上传成功')
          emits('success', data)
          // imageUrl.value = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          imageUrl.value = data.url
          emits('update:value', data.url)
          onSuccess({ url: data.url }, file)
        } else {
          message.error('图片识别失败，请重新上传')
        }
      } catch (e) {
        loading.value = false
        console.warn(e, 'FormUpload')
        message.error('图片识别失败，请重新上传')
        onError(e)
        // message.warning('图片上传失败')
      }
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
  
  <style scoped lang="less">
    ::v-deep(.ant-upload.ant-upload-select-picture-card){
    width: 310px;
    height: 200px;
    }
    .ant-upload-text{
      color: #8C8C8C;
      width: 313px;
      height: 200px;
    }
  </style>
  