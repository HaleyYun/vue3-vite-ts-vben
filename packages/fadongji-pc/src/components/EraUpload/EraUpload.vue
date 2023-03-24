<template>
  <div class="clearfix">
    <div class="container" :class="{ hidden: !showContainer }">
      <a-upload
        :accept="getAccept"
        :beforeUpload="beforeUpload"
        :multiple="multiple"
        :max-count="maxNumber"
        :customRequest="uploadRequest"
        v-model:file-list="fileList"
        :showUploadList="showUploadList"
        :list-type="listType"
        @preview="handlePreview"
        @change="handleChange"
        @remove="handlerDeleted"
      >
        <slot name="target">
          <div v-if="fileList.length < maxNumber">
            <plus-outlined />
            <div style="margin-top: 8px">{{ uploadTip }}</div>
          </div>
        </slot>
        <template #itemRender="{ file, fileList }">
          <div class="img-card">
            <div v-if="file.url" class="ant-upload-list-item-info" @click="handlePreview(file)">
              <img
                v-if="uploadFuncChannel === 'cos' && uploadType == 'video' && poster"
                :src="poster"
                @error="loadErrorHandler('poster')"
              />
              <img
                v-if="uploadFuncChannel === 'localStore' && uploadType == 'video'"
                :src="file.url + '&type=3'"
              />
              <img v-if="uploadType == 'video'" class="pic" src="../../assets/images/play.png" />
              <img v-else :src="file.url" @error="loadErrorHandler('img')" />
            </div>
            <div v-if="!file.url && file.status == 'uploading'">
              <loading-outlined />
              <div class="text-color text-gray-600 mt-8px">文件上传中</div>
            </div>
            <div v-if="file.status == 'error'">
              <div class="text-color text-gray-600 mt-8px">文件上传失败</div>
            </div>
            <span class="closeStyle">
              <close-circle-outlined
                style="color: #666; font-size: 16px"
                @click="handlerDeleted(file)"
              />
            </span>
          </div>
        </template>
      </a-upload>
      <div class="tips" v-if="showHelpText">{{ getHelpText }}</div>
    </div>
    <a-modal
      :visible="previewVisible"
      :width="1000"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
      destroy-On-Close
    >
      <div class="max-h-60vh">
        <video
          class="max-h-60vh w-full"
          v-if="uploadType == 'video'"
          controls
          autoplay
          :src="previewImage"
          :poster="previewImage + '&type=3'"
        ></video>
        <img
          class="max-h-60vh w-full"
          v-else
          alt="example"
          style="width: 100%"
          :src="previewImage"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
  import { PlusOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref, unref, computed, watchEffect } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { delParam } from '/@/utils'

  const { createMessage } = useMessage()
  import {
    fileImgUploadInfo,
    fileVideoUploadInfo,
    uploadFileFn,
    uploadFileFnByTencentCos,
    uploadLocalByUrl,
  } from '/@/api/sys/upload'
  import { loadCosImage } from '/@/utils'

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result)

      reader.onerror = (error) => reject(error)
    })
  }

  export default defineComponent({
    components: {
      PlusOutlined,
      CloseCircleOutlined,
      LoadingOutlined,
    },

    props: {
      listType: {
        type: String,
        default: 'picture-card',
      },
      uploadType: {
        type: String,
        default: 'img',
      },
      showContainer: {
        type: Boolean,
        default: true,
      },
      fileListData: {
        type: Array,
        default: () => [],
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
      const poster = ref('')
      const previewVisible = ref(false)
      const previewImage = ref('')
      const previewTitle = ref('')
      let fileList = ref([])
      const imgSuffix = ['.jpg', '.jpeg', '.png']
      const videoSuffix = ['.mp4', '.mov']
      const { createMessage } = useMessage()
      const getHelpText = computed(() => {
        const helpText = props.helpText
        if (helpText) {
          return helpText
        }
      })
      const getAccept = computed(() => {
        if (props.uploadType == 'img') {
          return imgSuffix.join(',')
        } else {
          return videoSuffix.join(',')
        }
      })

      const handleCancel = () => {
        previewVisible.value = false
        previewTitle.value = ''
      }

      const loadErrorHandler = (type = 'poster') => {
        if (type === 'poster') {
          poster.value = delParam(poster.value, 't').replace('?', '') + '?t=' + new Date().getTime()
        }
        if (type === 'img') {
          fileList.value = fileList.value.map((item) => {
            item.url = delParam(item.url, 't').replace('?', '') + '?t=' + new Date().getTime()
            return item
          })
        }
      }

      const beforeUpload = (file, fileList) => {
        if (props.beforeUploadFn) {
          return props.beforeUploadFn()
        }
        let type = file.name.split('.')
        let suffix = '.' + type[type.length - 1]
        if (getAccept.value.indexOf(suffix.toLocaleLowerCase()) == -1) {
          return false
        }

        // 上传前校验
        const { maxSize } = props
        // 设置最大值，则判断
        if (maxSize && file.size / 1024 / 1024 >= maxSize) {
          createMessage.error(`上传文件不能大于${maxSize}M`)
          console.log(file)
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

      const handleChange = (info) => {
        let type = info.file.name.split('.')
        let suffix = '.' + type[type.length - 1]
        if (getAccept.value.indexOf(suffix.toLocaleLowerCase()) == -1) {
          info.fileList = info.fileList.filter((item) => item.name != info.file.name)
          fileList.value = info.fileList
          createMessage.error(`上传文件类型错误`)
          return false
        }
        if (props.maxSize && info.file.size / 1024 / 1024 >= props.maxSize) {
          info.fileList = info.fileList.filter((item) => item.name != info.file.name)
          fileList.value = info.fileList
        }
        if (props.change) props.change(info)
        emit('change', info)
      }

      const handlerDeleted = (file) => {
        console.log(file)
        emit('delete', { url: file.url })
      }
      const updateChange = (file) => {
        console.log(fileList)
        let len = fileList.value.filter((item) => item.status === 'done').length
        emit('done', { file: file, isAll: len === fileList.value.length })
      }
      const uploadApiByLocalFileSystem = async (params) => {
        console.log('start up file')
        console.log(params)
        const url = await uploadFileFn({ file: params.file, data: { temporary: 0 } }, () => {})
          .then((res) => {
            updateChange(res.file)
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
        try {
          const { file } = await uploadFileFnByTencentCos({
            file: params.file,
            data: { temporary: 0 },
          })
          if (file) {
            updateChange(file)

            loadCosImage(file.picUrl).then((res) => {
              console.log(res, 'res')
              poster.value = file.picUrl
            })
            params.onSuccess({ url: file.filePath }, params.file)
          }
        } catch (e) {
          createMessage.error(`文件上传失败`)
          console.log(e)
          params.onError(e)
        }
      }

      const uploadFileImg = (params, type) => {
        if (type == 'img') {
          fileImgUploadInfo(params).then((res) => {
            updateChange(res)
          })
        } else if (type == 'video') {
          fileVideoUploadInfo(params).then((res) => {
            console.log(res)
            updateChange(res)
          })
        }
      }

      const uploadRequest = (params) => {
        switch (props.uploadFuncChannel) {
          case 'cos':
            uploadApiByCos(params)
            break
          case 'local':
            uploadApiByLocalFileSystem(params)
            break
          case 'localStore':
            uploadFileImg(params, props.uploadType)
            break
          default:
            break
        }
      }

      watchEffect(() => {
        //fileList.value = [{url: newValue}]
        console.log(unref(props.fileListData), 'yy')
        if (props.uploadType == 'img') {
          fileList.value = unref(props.fileListData).map((item) => {
            return {
              url: item,
              name: new Date().getTime(),
            }
          })
        } else if (props.uploadType == 'video' && unref(props.fileListData).length > 0) {
          fileList.value = [{ url: unref(props.fileListData)[0], name: new Date().getTime() }]
        } else {
          fileList.value = []
        }
        emit('change', unref(props.fileListData).join(','))
      })

      return {
        loadErrorHandler,
        poster,
        getHelpText,
        getAccept,
        previewVisible,
        previewImage,
        fileList,
        previewTitle,
        uploadRequest,
        handlerDeleted,
        handleChange,
        beforeUpload,
        handleCancel,
        handlePreview,
      }
    },
  })
</script>
<style lang="scss">
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-upload-list-picture-card-container {
    position: relative;
  }

  .img-card {
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    height: 100%;
    margin: 0;
    text-align: center;

    img {
      height: 100%;
      width: 100%;
    }

    .pic {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px !important;
      height: 30px !important;
      transform: translate(-50%, -50%);
    }

    .closeStyle {
      position: absolute;
      top: -10px;
      right: 0;
      opacity: 0;
    }
  }

  .img-card:hover {
    .closeStyle {
      opacity: 1;
    }
  }

  .hidden {
    position: fixed;
    left: 100%;
    top: 100%;
    z-index: -2;
  }

  .tips {
    color: #999;
  }
</style>
