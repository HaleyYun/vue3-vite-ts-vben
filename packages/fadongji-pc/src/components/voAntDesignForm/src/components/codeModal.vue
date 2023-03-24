<template>
  <a-modal
    title="代码"
    :footer="null"
    :visible="visible"
    @cancel="handleCancel"
    wrapClassName="code-modal-9136076486841527"
    style="top: 20px"
    width="850px"
    :destroyOnClose="true"
  >
    <a-tabs tabPosition="left" style="height: 100%">
      <a-tab-pane tab="VUE" key="1">
        <div>
          <v-ace-editor
            v-model:value="JSONForm"
            lang="html"
            theme="chrome"
            :options="{ useWorker: true, showPrintMargin: false }"
            :readonly="readOnly"
            style="height: 700px"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="HTML" key="2">
        <v-ace-editor
          v-model:value="htmlForm"
          lang="html"
          theme="chrome"
          :options="{ useWorker: true, showPrintMargin: false }"
          :readonly="readOnly"
          style="height: 700px"
        />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { antd } from '../config'
  import { VAceEditor } from 'vue3-ace-editor'
  import {
    codeVueFront,
    codeVueLast,
    codeNullLast,
    codeHtmlFront,
    codeHtmlLast,
  } from '../config/data.js'
  import 'ace-builds/src-noconflict/mode-html'
  import 'ace-builds/src-noconflict/theme-chrome'
  import ace from 'ace-builds'
  import workerhtmlUrlss from 'ace-builds/src-noconflict/worker-html?url'
  ace.config.setModuleUrl('ace/mode/html_worker', workerhtmlUrlss)
  interface codeModalMap {
    visible: Boolean
    editorVueJson: String
    editorHtmlJson: String
    jsonData: any
  }
  export default defineComponent({
    name: 'CodeModel',
    components: {
      VAceEditor,
    },
    setup() {
      const state = reactive({
        setoptions: {
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          tabSize: 6,
          showPrintMargin: false,
          fontSize: 14,
        },
        lang: 'html', //解析json
        theme: 'chrome', //主题
        readOnly: true, //是否只读
        JSONForm: '',
        htmlForm: '',
        antd,
        visible: false,
        resetJson: false,
        widgetForm: {
          list: [],
          config: {
            size: 'default',
            hideRequiredMark: false,
            layout: 'horizontal',
            labelAlign: 'right',
            labelCol: {
              span: 3,
              offset: 0,
            },
          },
        },
        widgetFormSelect: null,
        configTab: 'widget',
        previewVisible: false,
        jsonVisible: false,
        codeVisible: false,
        uploadVisible: false,
        remoteFuncs: {
          funcTest(resolve) {
            setTimeout(() => {
              const options = [
                { id: '1', name: 'name1' },
                { id: '2', name: 'name2' },
                { id: '3', name: 'name3' },
              ]

              resolve(options)
            }, 2000)
          },
          uploadCallBack(response, file, fileList) {
            console.log('callback', response, file, fileList)
          },
        },
        widgetModels: {},
        blank: '',
        htmlTemplate: '',
        vueTemplate: '',
        jsonTemplate: '',
        uploadEditor: null,
        jsonCopyValue: '',
        jsonClipboard: null,
        jsonEg: `
        {
          "list": [],
          "config": {
            "labelWidth": 100,
            "labelPosition": "top",
            "size": "small"
          }
        }
      `,
        codeActiveName: 'vue',
      })
      const codeModalData = reactive<codeModalMap>({
        visible: false,
        editorVueJson: '',
        editorHtmlJson: '',
        jsonData: {},
      })
      const handleCancel = () => {
        codeModalData.visible = false
      }
      const initFail = () => {}
      const getFormData = (data) => {
        codeModalData.visible = true
        state.JSONForm = codeVueFront + JSON.stringify(data.list) + codeNullLast
        state.htmlForm = codeHtmlFront + JSON.stringify(codeModalData.jsonData.list) + codeHtmlLast
        console.log('datadata11111===', state.JSONForm)
      }
      // watch(
      //   () => codeModalData.visible,
      //   () => {
      //     if (codeModalData.visible) {
      //       codeModalData.editorVueJson =
      //         codeVueFront + JSON.stringify(codeModalData.jsonData) + codeVueLast;
      //       codeModalData.editorHtmlJson =
      //         codeHtmlFront + JSON.stringify(codeModalData.jsonData) + codeHtmlLast;
      //     }
      //   },
      // );
      return {
        ...toRefs(state),
        ...toRefs(codeModalData),
        handleCancel,
        getFormData,
        initFail,
      }
    },
  })
</script>
