<template>
  <div class="fd-style">
    <a-layout class="fd-container">
      <a-layout-content class="fd-main">
        <a-layout>
          <a-layout-sider theme="light" :width="250">
            <div class="components">
              <ComponentGroup title="组件库" :fields="basicFields" :list="antd.basicComponents" />
              <ComponentGroup
                title="高级字段"
                :fields="advanceFields"
                :list="antd.advanceComponents"
              />
              <!-- <ComponentGroup
                title="布局字段"
                :fields="layoutFields"
                :list="antd.layoutComponents"
              /> -->
            </div>
          </a-layout-sider>
          <a-layout class="center-container">
            <Header
              v-bind="$props"
              @clear="handleClearContentItem()"
              @getJson="handleGetJsonComponents()"
              @getCode="handleGetCode()"
              @exportJson="handleExportJson('demo.json')"
              @importJson="handleImportJson()"
              @preview="handleReview()"
            />
            <a-layout-content :class="{ 'widget-empty': widgetForm.list }">
              <AntdWidgetForm
                ref="widgetFormRef"
                v-if="!resetJson"
                v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect"
              />
            </a-layout-content>
          </a-layout>
          <a-layout-sider theme="light" class="widget-config-container" :width="300">
            <a-layout>
              <a-layout-header>
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'widget' }"
                  @click="configTab = 'widget'"
                  >字段属性</div
                >
                <div
                  class="config-tab"
                  :class="{ active: configTab === 'form' }"
                  @click="configTab = 'form'"
                  >表单属性</div
                >
              </a-layout-header>
              <a-layout-content style="background-color: white">
                <AntdWidgetConfig
                  v-show="configTab === 'widget'"
                  v-model:select="widgetFormSelect"
                />
                <AntdFormConfig v-show="configTab === 'form'" v-model:config="widgetForm.config" />
              </a-layout-content>
            </a-layout>
          </a-layout-sider>
        </a-layout>
      </a-layout-content>
    </a-layout>

    <a-modal
      title="Json数据"
      :visible="visible"
      style="top: 20px"
      @cancel="handleCancel"
      :ok-button-props="{ style: { display: 'none' } }"
    >
      <div>
        <v-ace-editor
          v-model:value="JSONForm"
          lang="json"
          theme="chrome"
          :options="{ useWorker: true, showPrintMargin: false }"
          :readonly="readOnly"
          style="height: 700px"
        />
      </div>
    </a-modal>
    <!-- 
      codeModel:              “代码”组件
      importJsonModelVue：    “导入”组件
      previewData:            "预览"组件
     -->
    <codeModel ref="codeModalRef" />
    <importJsonModel ref="importJsonModelRef" @editPopJsImport="editPopJs" />
    <previewData ref="previewDataRef" :widgetForm="widgetForm" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, PropType, toRefs, ref } from 'vue'
  import ComponentGroup from '../components/ComponentGroup.vue'
  import Header from '../components/Header.vue'
  import AntdWidgetForm from './AntdWidgetForm.vue'
  import AntdWidgetConfig from './AntdWidgetConfig.vue'
  import AntdFormConfig from './AntdFormConfig.vue'
  import previewData from '../module/previewModule.vue' // 预览
  import { antd } from '../config'
  import { VAceEditor } from 'vue3-ace-editor'
  import codeModel from '../components/codeModal.vue'
  import { exportData } from '../config/model.js' // 导出Json
  import importJsonModel from '../module/importJsonModel.vue'
  import 'vue3-json-viewer/dist/index.css'
  import 'ace-builds/src-noconflict/mode-json'
  import 'ace-builds/src-noconflict/theme-chrome'
  import ace from 'ace-builds'
  import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url'
  ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl)
  export default defineComponent({
    name: 'AntdDesignForm',
    components: {
      ComponentGroup,
      Header,
      AntdWidgetForm,
      AntdWidgetConfig,
      AntdFormConfig,
      VAceEditor,
      codeModel,
      importJsonModel, // 导入“Json”数据
      previewData, // 预览“拖曳组件”
    },
    props: {
      preview: {
        type: Boolean,
        default: true,
      },
      generateCode: {
        type: Boolean,
        default: true,
      },
      generateJson: {
        type: Boolean,
        default: true,
      },
      upload: {
        type: Boolean,
        default: true,
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      basicFields: {
        type: Array as PropType<Array<string>>,
        default: () => [
          'input',
          'password',
          'textarea',
          'number',
          'radio',
          'checkbox',
          'time',
          'date',
          'rate',
          'color',
          'select',
          'switch',
          'slider',
          'text',
        ],
      },
      advanceFields: {
        type: Array as PropType<Array<string>>,
        default: () => ['blank', 'imgupload', 'editor', 'cascader'],
      },
      layoutFields: {
        type: Array as PropType<Array<string>>,
        default: () => ['grid'],
      },
    },
    setup() {
      const codeModalRef = ref<any>(null)
      const importJsonModelRef = ref<any>(null)
      const previewDataRef = ref<any>(null)
      const state = reactive({
        setoptions: {
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
          tabSize: 2,
          showPrintMargin: false,
          fontSize: 13,
        },
        lang: 'json', //解析json
        theme: 'chrome', //主题
        readOnly: true, //是否只读
        JSONForm: '',
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
        ModelForm: {
          list: [
            {
              label: '滑块',
              type: 'slider',
              options: {
                defaultValue: 0,
                disabled: false,
                required: false,
                min: 0,
                max: 100,
                step: 1,
                showInput: false,
                range: false,
                width: '',
                remoteFunc: 'func_5f4ff98de760429e996989df418129c8',
              },
              key: '5f4ff98de760429e996989df41812910',
              model: 'slider_5f4ff98de760429e996989df418129c8',
              rules: [],
            },
          ],
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
      const handleClearContentItem = () => {
        state.widgetForm.list = []
      }
      const handleGetJsonComponents = () => {
        state.JSONForm = JSON.stringify(state.widgetForm, null, '\t')
        state.visible = true
      }
      const handleCancel = () => {
        // 取消 “编辑” 弹框
        state.visible = false
      }
      const handleGetCode = () => {
        console.log('预览 Vue 或者 html 代码片段===', state.widgetForm)
        // 预览 Vue 或者 html 代码片段
        codeModalRef.value.getFormData(state.widgetForm)
      }
      const handleImportJson = () => {
        // 导入 Json数据，动态生成组件
        importJsonModelRef.value.getImportData(state.ModelForm)
      }
      const editPopJs = (data) => {
        // 导入 【模板】或者【本地】数据
        state.widgetForm = data
      }
      const handleReview = () => {
        // 预览 生成的“界面”效果
        previewDataRef.value.getPreViewData()
      }
      const initFail = () => {
        state.JSONForm = JSON.stringify(state.widgetForm, null, 2)
      }
      const handleExportJson = (type) => {
        exportData(JSON.stringify(state.widgetForm, null, 2), type)
      }
      return {
        ...toRefs(state),
        handleClearContentItem,
        handleGetJsonComponents,
        handleCancel,
        handleGetCode,
        initFail,
        handleExportJson,
        exportData,
        handleImportJson,
        editPopJs,
        handleReview,
        codeModalRef, // "生成代码"的Ref
        importJsonModelRef, // "导入"的Ref
        previewDataRef, // "预览"的Ref
      }
    },
  })
</script>
