<template>
  <div id="app">
    <div class="container">
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-container">
        <div class="bpmn-canvas" ref="canvas"></div>
        <!-- 工具栏显示的地方 -->
        <div class="bpmn-js-properties-panel" id="js-properties-panel"></div>
      </div>
      <!-- 把操作按钮写在这里面 -->
      <div class="action">
        <Upload action class="upload-demo demo" :before-upload="openBpmn">
          <Button>
            <UploadOutlined />
          </Button>
        </Upload>
        <Button class="new demo" @click="newDiagram"><IconFont type="icon-xinzeng" /></Button>
        <Button class="down demo" @click="downloadBpmn"><IconFont type="icon-xiazai" /></Button>
        <Button @click="downloadSvg"><IconFont type="icon-tupian" /></Button>
        <a hidden ref="downloadLink"></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import { Button, Upload } from 'ant-design-vue'
  import { UploadOutlined } from '@ant-design/icons-vue'
  // 工具栏相关
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

  // 汉化
  import customTranslate from '../VoBpmn/customTranslate'
  import { defineComponent, getCurrentInstance, onMounted } from 'vue'
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3288504_tza671ejqxo.js',
  })
  export default defineComponent({
    components: { Button, Upload, UploadOutlined, IconFont },
    setup() {
      const { proxy, ctx } = getCurrentInstance() as ComponentInternalInstance
      const _this = ctx
      proxy.$parent
      proxy.$refs
      proxy.$nextTick
      proxy.$attrs
      proxy.$data
      proxy.$el
      proxy.$emit
      proxy.$forceUpdate
      proxy.$options
      proxy.$props
      proxy.$root
      proxy.$slots
      proxy.$watch
      onMounted(() => {
        _this.init()
      })
      const newDiagram = () => {
        _this.createNewDiagram(_this.bpmnTemplate)
      }
      const downloadBpmn = () => {
        _this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
          if (!err) {
            // 获取文件名
            const name = `${_this.getFilename(xml)}.bpmn`
            // 将文件名以及数据交给下载方法
            _this.download({ name: name, data: xml })
          }
        })
      }
      const downloadSvg = () => {
        _this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
          if (!err) {
            // 获取文件名
            const name = `${_this.getFilename(xml)}.svg`

            // 从建模器画布中提取svg图形标签
            let context = ''
            const djsGroupAll = _this.$refs.canvas.querySelectorAll('.djs-group')
            for (let item of djsGroupAll) {
              context += item.innerHTML
            }
            // 获取svg的基本数据，长宽高
            const viewport = _this.$refs.canvas.querySelector('.viewport').getBBox()

            // 将标签和数据拼接成一个完整正常的svg图形
            const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `
            // 将文件名以及数据交给下载方法
            _this.download({ name: name, data: svg })
          }
        })
      }
      const openBpmn = (file) => {
        const reader = new FileReader()
        // 读取File对象中的文本信息，编码格式为UTF-8
        reader.readAsText(file, 'utf-8')
        reader.onload = () => {
          //读取完毕后将文本信息导入到Bpmn建模器
          _this.createNewDiagram(reader.result)
        }
        return false
      }
      const getFilename = (xml) => {
        let start = xml.indexOf('process')
        let filename = xml.substr(start, xml.indexOf('>'))
        filename = filename.substr(filename.indexOf('id') + 4)
        filename = filename.substr(0, filename.indexOf('"'))
        return filename
      }
      const download = ({ name = 'diagram.bpmn', data }) => {
        // 这里就获取到了之前设置的隐藏链接
        const downloadLink = _this.$refs.downloadLink
        // 把数据转换为URI，下载要用到的
        const encodedData = encodeURIComponent(data)

        if (data) {
          // 将数据给到链接
          downloadLink.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
          // 设置文件名
          downloadLink.download = name
          // 触发点击事件开始下载
          downloadLink.click()
        }
      }
      const init = () => {
        // 获取画布 element
        _this.canvas = _this.$refs.canvas

        // 将汉化包装成一个模块
        const customTranslateModule = {
          translate: ['value', customTranslate],
        }

        // 创建Bpmn对象
        _this.bpmnModeler = new BpmnModeler({
          // 设置bpmn的绘图容器为上门获取的画布 element
          container: _this.canvas,

          // 加入工具栏支持
          propertiesPanel: {
            parent: '#js-properties-panel',
          },
          additionalModules: [
            // 工具栏模块
            propertiesProviderModule,
            propertiesPanelModule,
            // 汉化模块
            customTranslateModule,
          ],
          moddleExtensions: {
            camunda: camundaModdleDescriptor,
          },
        })

        _this.createNewDiagram(_this.bpmnTemplate)
      }
      const createNewDiagram = (bpmn) => {
        // 将字符串转换成图显示出来;
        _this.bpmnModeler.importXML(bpmn, (err) => {
          if (err) {
            _this.$Message.error('打开模型出错,请确认该模型符合规范')
          }
        })
      }
      return {
        init,
        createNewDiagram,
        download,
        newDiagram,
        getFilename,
        downloadBpmn,
        downloadSvg,
        openBpmn,
        bpmnTemplate: `
          <?xml version="1.0" encoding="UTF-8"?>
          <definitions
              xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
              xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
              xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
              xmlns:xsd="http://www.w3.org/2001/XMLSchema"
              xmlns:activiti="http://activiti.org/bpmn"
              id="m1577635100724"
              name=""
              targetNamespace="http://www.activiti.org/testm1577635100724"
            >
            <process id="process" processType="None" isClosed="false" isExecutable="true">
              <extensionElements>
                <camunda:properties>
                  <camunda:property name="a" value="1" />
                </camunda:properties>
              </extensionElements>
              <startEvent id="_2" name="start" />
            </process>
            <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
              <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
                <bpmndi:BPMNShape id="BPMNShape__2" bpmnElement="_2">
                  <omgdc:Bounds x="144" y="368" width="32" height="32" />
                  <bpmndi:BPMNLabel>
                    <omgdc:Bounds x="149" y="400" width="23" height="14" />
                  </bpmndi:BPMNLabel>
                </bpmndi:BPMNShape>
              </bpmndi:BPMNPlane>
            </bpmndi:BPMNDiagram>
          </definitions>
      `,
      }
    },
  })
</script>

<style scoped>
  .bpmn-container {
    width: 100%;
    height: 100vh;
    display: flex;
  }

  .bpmn-canvas {
    width: calc(100% - 300px);
    height: 100vh;
  }

  .bpmn-js-properties-panel {
    width: 320px;
    height: inherit;
    overflow-y: auto;
  }

  .action {
    position: absolute;
    bottom: 88px;
    left: 20px;
    display: flex;
  }

  .demo {
    margin-right: 10px;
  }
</style>
