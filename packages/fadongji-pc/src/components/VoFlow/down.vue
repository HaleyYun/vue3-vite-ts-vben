<template>
  <div class="action">
    <Upload action class="upload-demo" :before-upload="openBpmn">
      <Button>
        <UploadOutlined />
      </Button>
    </Upload>
    <Button type="primary" @click="downloadBpmn"><CloudDownloadOutlined /></Button>
    <a hidden ref="downloadLink"></a> </div
></template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted } from 'vue'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import { UploadOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue'
  import { Button, Upload } from 'ant-design-vue'
  export default defineComponent({
    components: { UploadOutlined, CloudDownloadOutlined, Button, Upload },
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
      const init = () => {
        // 获取画布 element
        _this.canvas = _this.$refs.canvas

        // 创建Bpmn对象
        _this.bpmnModeler = new BpmnModeler({
          // 设置bpmn的绘图容器为上门获取的画布 element
          container: _this.canvas,
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
      const getFilename = (xml) => {
        let start = xml.indexOf('process')
        let filename = xml.substr(start, xml.indexOf('>'))
        filename = filename.substr(filename.indexOf('id') + 4)
        filename = filename.substr(0, filename.indexOf('"'))
        return filename
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
      return {
        init,
        download,
        createNewDiagram,
        getFilename,
        openBpmn,
        downloadBpmn,
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
  .action {
    position: relative;
    bottom: 65px;
    left: 20px;
    display: flex;
  }

  .upload-demo {
    margin-right: 20px;
  }
</style>
