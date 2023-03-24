<template>
  <a-modal
    title="导入Json数据"
    :visible="visible"
    @cancel="handleCancel"
    wrapClassName="code-modal-9136076486841528"
    style="top: 20px"
    width="850px"
    :destroyOnClose="true"
  >
    <p class="hint-box">导入格式如下:</p>
    <v-ace-editor
      v-model:value="JSONForm"
      lang="json"
      theme="chrome"
      :options="{ useWorker: true, showPrintMargin: false }"
      :readonly="readOnly"
      style="height: 700px"
    />
    <template #footer>
      <a-upload
        action="/abc"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
        accept="application/json"
      >
        <a-button type="cancel" style="margin-right: 5px">导入</a-button>
      </a-upload>
      <a-button type="danger" @click.stop="editPopJsData(JSONForm)">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, nextTick, reactive, toRefs } from 'vue'
  import { VAceEditor } from 'vue3-ace-editor'
  import 'vue3-json-viewer/dist/index.css'
  import 'ace-builds/src-noconflict/mode-json'
  import 'ace-builds/src-noconflict/theme-chrome'
  import ace from 'ace-builds'
  import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'
  import { message } from 'ant-design-vue'
  ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl)
  export default defineComponent({
    name: 'ImportJsonModel',
    components: {
      VAceEditor,
    },
    emits: ['editPopJsImport'],
    setup(props, context) {
      const importJsItem = reactive({
        visible: false,
        JSONForm: '',
        readOnly: false,
        formData: null,
      })
      const handleCancel = () => {
        importJsItem.visible = false
      }
      const getImportData = (FormData) => {
        // 获取“导入”数据的Json
        importJsItem.JSONForm = JSON.stringify(FormData, null, '\t')
        importJsItem.visible = true
        importJsItem.formData = FormData
      }
      const editPopJsData = (data) => {
        const jsonObject = JSON.parse(data)
        nextTick(() => {
          context.emit('editPopJsImport', jsonObject)
        })
        importJsItem.visible = false
      }
      const beforeUpload = (e) => {
        console.log('props===', props)
        // 上传Json文件
        const reader = new FileReader()
        reader.readAsText(e)
        reader.onload = function (e) {
          const uploadExit: any = e.target?.result
          uploadFail(uploadExit)
        }
        return false
      }
      const uploadFail = (uploadExit) => {
        const judge = JSON.parse(uploadExit)
        if (uploadExit && judge.list.length > 0 && judge.config) {
          message.success(`上传成功.`)
          editPopJsData(uploadExit)
        } else {
          message.error(`上传内容为空或上传格式有误.`)
          importJsItem.visible = false
        }
      }
      return {
        ...toRefs(importJsItem),
        handleCancel,
        getImportData,
        editPopJsData,
        beforeUpload,
      }
    },
  })
</script>
<style scoped>
  .hint-box {
    margin-left: 47px;
    background: #e9e9e9;
    border-bottom: 2px solid #fff;
  }
</style>
