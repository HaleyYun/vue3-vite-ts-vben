<template>
  <div class="upload">
    <h1 class="titleUpload">Upload 上传</h1>
    <h2>上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。</h2>
  </div>
  <div class="uploadList">
    <h1> 点击上传,用户点击按钮弹出文件选择框。 </h1>
    <br />
    <Upload
      v-model:file-list="fileList"
      name="file"
      :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="headers"
      @change="handleChange"
    >
      <Button>
        <UploadOutlined />
        点击上传
      </Button>
    </Upload>
    <br />
    <br />
    <br />
    <br />
    <h1> 支持上传一个文件夹里的所有文件。 </h1>
    <br />
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
      <Button>
        <UploadOutlined />
        上传目录
      </Button>
    </Upload>
  </div>
</template>

<script lang="ts">
  import { message } from 'ant-design-vue'

  import { UploadOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref } from 'vue'
  interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
  }

  interface FileInfo {
    file: FileItem
    fileList: FileItem[]
  }
  export default defineComponent({
    components: { UploadOutlined},
    setup() {
      const handleChange = (info: FileInfo) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }

      const fileList = ref([])
      return {
        fileList,
        headers: {
          authorization: 'authorization-text',
        },
        handleChange,
      }
    },
  })
</script>

<style scoped>
  .upload {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleUpload {
    font-size: 30px;
  }

  .uploadList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
