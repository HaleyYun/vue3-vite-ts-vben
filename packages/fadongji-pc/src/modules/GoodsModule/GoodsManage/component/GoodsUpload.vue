<template>
  <div class="clearfix">
    <div class="container" :class="{ hidden: !showContainer }">
      <a-upload
          :data="uploadParams"
          :beforeUpload="beforeUpload"
          :multiple="multiple"
          :maxCount="maxNumber"
          :customRequest="api"
          v-model:file-list="fileList"
          list-type="text"
          :show-upload-list="false"
          :list-type="listType"
          @preview="handlePreview"
          @change="handleChange"
          @remove="handlerDeleted"
      >
        <AButton type="primary">
          <CloudUploadOutlined />
          本地上传
        </AButton>
      </a-upload>
    </div>
    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    <a-alert
        v-if="showHelpText"
        :message="getHelpText"
        type="info"
        banner
        class="upload-modal-toolbar__text"
    />
  </div>
</template>
<script>
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, computed } from 'vue'
import { checkFileType, checkImgType, getBase64WithFile } from '/@/components/Upload/src/helper'
import { t } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
const { createMessage } = useMessage()
import { uploadFileFn, uploadFileFnByTencentCos } from '/@/api/sys/upload'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })
}

const uploadApiByLocalFileSystem = async (params) => {
  console.log('start up file')
  console.log(params)
  const url = await uploadFileFn({ file: params.file, data: { temporary: 0 } }, () => {})
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

const uploadApiByCos = async (params) => {
  console.log('start up file')
  console.log(params)
  const url = await uploadFileFnByTencentCos(
      { file: params.file, data: { temporary: 0 } },
      () => {},
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

export default defineComponent({
  components: {
    PlusOutlined,
    CloudUploadOutlined
  },

  props: {
    listType: {
      type: String,
      default: 'picture-card',
    },
    showContainer: {
      type: Boolean,
      default: true,
    },
    uploadTip: {
      type: String,
      default: '点击上传',
    },
    showHelpText: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
      default: '',
    },
    // 文件最大多少MB
    maxSize: {
      type: Number,
      default: 2,
    },
    // 最大数量的文件，Infinity不限制
    maxNumber: {
      type: Number,
      default: Infinity,
    },
    // 根据后缀，或者其他
    accept: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    uploadParams: {
      type: Object,
      default: () => {},
    },
    uploadApi: {
      type: Function,
      default: () => {},
    },
    beforeUploadFn: {
      type: Function,
      default: null,
    },
    showUploadList: {
      type: Boolean,
      default: true,
    },
    uploadFuncChannel: {
      type: String,
      default: 'cos',
    },
    change: {
      type: Function,
      default: null,
    },

    name: {
      type: String,
      default: 'file',
    },
    filename: {
      type: String,
      default: null,
    },
  },
  emits: ['change', 'delete', 'done', 'doneAll'],
  setup(props, { emit }) {
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')
    const fileList = ref([
      //{
      //  uid: '-1',
      //  name: 'image.png',
      //  status: 'done',
      //  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //},
    ])

    const { createMessage } = useMessage()

    const getHelpText = computed(() => {
      const helpText = props.helpText
      if (helpText) {
        return helpText
      }
      const helpTexts = []

      const accept = props.accept
      if (accept.length > 0) {
        helpTexts.push(t('component.upload.accept', [accept.join(',')]))
      }

      const maxSize = props.maxSize
      if (maxSize) {
        helpTexts.push(t('component.upload.maxSize', [maxSize]))
      }

      const maxNumber = props.maxNumber
      if (maxNumber && maxNumber !== Infinity) {
        helpTexts.push(t('component.upload.maxNumber', [maxNumber]))
      }
      return helpTexts.join('，')
    })

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }

    const beforeUpload = (file) => {
      console.log('beforeUploadFn')
      if (props.beforeUploadFn) {
        return props.beforeUploadFn()
      }

      // 上传前校验
      //const { size, name } = file
      const { maxSize, accept } = props
      //const accept = props.accept
      // 设置最大值，则判断
      if (maxSize && file.size / 1024 / 1024 >= maxSize) {
        createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]))
        return false
      }

      // 设置类型,则判断
      if (accept.length > 0 && !checkFileType(file, accept)) {
        createMessage.error(t('component.upload.acceptUpload', [accept.join(',')]))
        return false
      }
    }

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }

    const formatUploadItemSuccess = (info) => {
      return info.file.response?.url
    }
    const formatUploadListSuccess = (info) => {
      return info.fileList.map((item) => item.response?.url)
    }

    const handleChange = (info) => {
      if (info.file.status !== 'uploading') {
        //console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        //console.log(info.file, info.fileList)
        console.log(`${info.file.name} file uploaded successfully`)
        emit('done', {
          info,
          file: formatUploadItemSuccess(info),
        })
        let len = info.fileList.filter((item) => item.status === 'done').length
        if (len === info.fileList.length) {
          emit('doneAll', {
            info,
            files: formatUploadListSuccess(info),
          })
        }

        //createMessage.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        createMessage.error(`${info.file.name} file upload failed.`)
      }
      if (props.change) props.change(info)

      emit('change', info)
    }

    const handlerDeleted = (file) => {
      console.log('beforeUploadFn')
      if (props.onDeleteFn) {
        return props.onDeleteFn()
      }

      emit('delete', { file })
    }

    let api = ref(props.uploadApi)
    console.log(props.uploadFuncChannel)
    switch (props.uploadFuncChannel) {
      case 'cos':
        api = uploadApiByCos
        break
      case 'local':
        api = uploadApiByLocalFileSystem
        break
      default:
        break
    }

    return {
      api,
      handlerDeleted,
      handleChange,
      getHelpText,
      beforeUpload,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
    }
  },
})
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.hidden {
  position: fixed;
  left: 100%;
  top: 100%;
  z-index: -2;
}
</style>
