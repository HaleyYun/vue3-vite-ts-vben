<template>
  <div>
    <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :custom-request="uploadImage"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :max-count="1"
            :accept="accept"
    >
      <div v-if="imageUrl" class="w-102px h-102px overflow-hidden">
        <img class="w-102px h-102px" :src="imageUrl" alt="avatar" />
      </div>
      <div v-else>
        <div v-if="loading" >
          <LoadingOutlined />
          <div class="ant-upload-text">上传中...</div>
        </div>
        <div v-else>
          <PlusOutlined />
          <div class="ant-upload-text">上传</div>
        </div>
      </div>
    </a-upload>
  </div>
</template>

<script setup lang="ts">
  //
  import { defineProps, defineEmits, ref, watch } from 'vue'
  import { message } from 'ant-design-vue'
  // @ts-ignore
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
  import AdminHttp from '/@/utils/http/adminHttp'

  const emits = defineEmits(['success', 'update:value'])

  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    limit: {
      type: [String, Number],
      default: 10,
    },
    accept: {
      type: String,
      default: 'image/png,image/jpeg',
    },
  })

  const loading = ref(false)
  const imageUrl = ref(props.value)
  const fileList = ref([])

  watch(
      () => props.value,
      (val) => {
        imageUrl.value = val
      },
  )

  //
  const uploadImage = async ({ file, onSuccess }) => {
    // 自定义上传
    const formData: any = new FormData()
    formData.append('file', file)

    try {
      loading.value = true
      const { data, code } = await AdminHttp.FILE.fileImgUpload(formData)
      loading.value = false
      if (+code === 20001) {
        message.success('图片上传成功')
        emits('success', data)
        // imageUrl.value = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        imageUrl.value = data.filePath
        onSuccess({ url: data.filePath }, file)
        emits('update:value', data.filePath)
      }
    } catch (e) {
      console.warn(e, 'FormUpload')
      message.warning('图片上传失败')
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只允许图片格式上传!')
    }
    const isLt2M = file.size / 1024 / 1024 < props.limit
    if (!isLt2M) {
      message.error('图片不大于' + props.limit + 'MB!')
    }
    return isJpgOrPng && isLt2M
  }
</script>

<style scoped lang="less"></style>
