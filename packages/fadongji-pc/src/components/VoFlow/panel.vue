<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>

<script lang="ts">
  // 引入相关的依赖
  // import BpmnViewer from 'bpmn-js'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  import { xmlStr } from '../../../mock/xmlStr.js'
  // 汉化
  import customTranslate from '../VoBpmn/customTranslate.js'
  import { defineComponent, getCurrentInstance, onMounted } from 'vue'
  export default defineComponent({
    components: {},
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

      const init = () => {
        // 获取到属性ref为“content”的dom节点
        _this.container = _this.$refs.content
        // 获取到属性ref为“canvas”的dom节点
        const canvas = _this.$refs.canvas
        // 将汉化包装成一个模块
        const customTranslateModule = {
          translate: ['value', customTranslate],
        }
        // 建模
        _this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加控制板
          propertiesPanel: {
            parent: '#js-properties-panel',
          },
          additionalModules: [
            // 左边工具栏以及节点
            propertiesProviderModule,
            // 右边的工具栏
            propertiesPanelModule,
            // 汉化模块
            customTranslateModule,
          ],
          moddleExtensions: {
            camunda: camundaModdleDescriptor,
          },
        })
        _this.createNewDiagram()
      }
      const createNewDiagram = () => {
        // 将字符串转换成图显示出来
        _this.bpmnModeler.importXML(xmlStr, (err) => {
          if (err) {
            // console.error(err)
          } else {
            // 这里是成功之后的回调, 可以在这里做一系列事情
            _this.success()
          }
        })
      }
      onMounted(() => {
        _this.init()
      })
      const success = () => {
        // console.log('创建成功!')
      }
      const addEventBusListener = () => {
        // 监听 element
        const eventBus = _this.bpmnModeler.get('eventBus')
        const eventTypes = ['element.click', 'element.changed', 'element.updateLabel']
        eventTypes.forEach(function (eventType) {
          eventBus.on(eventType, function (e) {
            console.log(eventType)
            if (!e || e.element.type == 'bpmn:Process') return
            if (eventType === 'element.changed') {
              // that.elementChanged(e)
            } else if (eventType === 'element.click') {
              console.log('点击了element', e)
              // if (e.element.type === 'bpmn:Task') {
              // }
            } else if (eventType === 'element.updateLabel') {
              console.log('element.updateLabel', e.element)
            }
          })
        })
      }
      return {
        createNewDiagram,
        success,
        addEventBusListener,
        init,
      }
    },
  })
</script>

<style scoped>
  .containers {
    background-color: #ffffff;
    width: 100%;
    height: calc(100vh - 52px);
  }

  .canvas {
    width: 100%;
    height: 100%;
  }

  .panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
</style>
