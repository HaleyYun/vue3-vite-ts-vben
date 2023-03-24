<template>
  <Upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-Upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :before-Upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-Upload-text">上传头像</div>
    </div>
  </Upload>
</template>
<script lang="ts">
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  import { defineComponent, ref } from 'vue'
  import { Upload } from 'ant-design-vue'

  interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
  }

  interface FileInfo {
    file: FileItem
    fileList: FileItem[]
  }

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
  export default defineComponent({
    components: {
      LoadingOutlined,
      PlusOutlined,
      Upload,
    },
    setup() {
      const fileList = ref([])
      const loading = ref<boolean>(false)
      const imageUrl = ref<string>('')

      const handleChange = (info: FileInfo) => {
        if (info.file.status === 'Uploading') {
          loading.value = true
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url
            loading.value = false
          })
        }
        if (info.file.status === 'error') {
          loading.value = false
          message.error('Upload error')
        }
      }

      const beforeUpload = (file: FileItem) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          message.error('You can only Upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
      }

      return {
        fileList,
        loading,
        imageUrl,
        handleChange,
        beforeUpload,
      }
    },
  })
</script>
<style>
  .avatar-uploader > .ant-Upload {
    width: 128px;
    height: 128px;
  }

  .ant-Upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-Upload-select-picture-card .ant-Upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
