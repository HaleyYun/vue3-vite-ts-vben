<template>
  <view>
    <u-upload-era
      :accept="accept"
      :camera="camera"
      :capture="capture"
      :compressed="compressed"
      :deletable="deletable"
      :disabled="disabled"
      :fileList="fileList"
      :height="height"
      :imageMode="imageMode"
      :maxCount="maxCount"
      :maxDuration="maxDuration"
      :maxSize="maxSize"
      :multiple="multiple"
      :name="name"
      :previewFullImage="previewFullImage"
      :previewImage="previewImage"
      :sizeType="sizeType"
      :uploadIcon="uploadIcon"
      :uploadIconColor="uploadIconColor"
      :uploadText="uploadText"
      :width="width"
      @afterRead="afterRead"
      @delete="deletePic"
    >
      <slot></slot>
    </u-upload-era>
  </view>
</template>

<script>
  import { uploadFile } from '@/common/helper'
  import props from './props.js'

  export default {
    name: 'VoUpload',
    mixins: [props],
    data() {
      return {}
    },
    watch: {
      // 监听文件列表的变化，重新整理内部数据
      fileList: {
        immediate: true,
        handler() {
          this.formatFileList()
        },
      },
    },
    methods: {
      formatFileList() {
        this.$emit('success', this.fileList)
      },
      // 删除图片
      deletePic(event) {
        this.fileList.splice(event.index, 1)
        this.$emit('delete', event.index)
      },
      // 新增图片
      async afterRead(event) {
        console.log(event, 'eventeventevent')
        let eventBlob = []

        // #ifdef APP-PLUS
        if (this.accept == 'video') {
          eventBlob = [event.file.tempFilePath]
        } else {
          eventBlob = event.file.tempFilePaths
        }

        // #endif
        // #ifndef APP-PLUS
        if (event.file.tempFile) {
          eventBlob.push(event.file.tempFile)
        } else if (event.file.tempFiles) {
          eventBlob = event.file.tempFiles
        }
        // #endif

        let fileListLen = this.fileList.length
        let lists = [].concat(eventBlob)
        lists.map((item) => {
          this[`fileList`].push({
            ...item,
            status: 'uploading',
            message: '上传中',
          })
        })

        console.log(this.fileList, '11')

        this.$emit('update:isUpload', true)

        // #ifndef APP-PLUS
        const result = await uploadFile({ imgs: eventBlob, isTencentCloud: this.isTencentCloud })
        // #endif
        // #ifdef APP-PLUS
        const result = await uploadFile({
          imgs: eventBlob,
          pathType: 'image.png',
          isPath: true,
          isTencentCloud: this.isTencentCloud,
        })
        // #endif


        for (let i = 0; i < lists.length; i++) {
          let item = this.fileList[fileListLen]
          this.fileList.splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: 'success',
              message: '',
              url: result[i].fileNameUrl,
              fileUrl: result[i].fileName,
            }),
          )
          fileListLen++
        }
        this.$emit('update:isUpload', false)

      },
    },
  }
</script>

<style lang="scss" scoped></style>
