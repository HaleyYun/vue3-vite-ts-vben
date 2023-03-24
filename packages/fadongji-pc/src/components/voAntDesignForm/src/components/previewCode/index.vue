<template>
  <div>
    <div class="json-box-9136076486841527">
      <div>
        <v-ace-editor
          :value="JSONForm"
          @init="initFail"
          lang="json"
          :theme="theme"
          :options="setoptions"
          :readonly="readOnly"
          style="height: 100%"
          class="ace-editor"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { VAceEditor } from 'vue3-ace-editor'
  import { codeVueFront } from '../../config/data.js'
  import { antd } from '../../config'
  import 'vue3-json-viewer/dist/index.css'
  export default defineComponent({
    name: 'PreviewCode',
    components: {
      VAceEditor,
    },
    props: {
      editorJson: {
        type: String,
        default: '',
      },
      fileFormat: {
        type: String,
        default: 'json',
      },
    },
    setup() {
      const state = reactive({
        setoptions: {
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          tabSize: 4,
          showPrintMargin: false,
          fontSize: 16,
        },
        lang: 'json', //解析json
        theme: 'chrome', //主题
        readOnly: true, //是否只读
        JSONForm: codeVueFront,
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
      const initFail = () => {
        state.JSONForm = codeVueFront
      }
      const editorInit = () => {
        // languagetools;
        // require('brace/mode/yaml');
        // require('brace/mode/javascript');
        // require('brace/mode/less');
        // require('brace/theme/tomorrow_night_blue');
        // require('brace/snippets/javascript');
      }
      return {
        ...toRefs(state),
        initFail,
        codeVueFront,
        editorInit,
      }
    },
  })
</script>
