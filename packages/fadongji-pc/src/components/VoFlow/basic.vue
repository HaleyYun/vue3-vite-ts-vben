<template
  ><div class="containers"> <div class="canvas" ref="canvas"></div> </div
></template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, onMounted } from 'vue'
  // 引入相关的依赖
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import { xmlStr } from '../../../mock/xmlStr.js' // 这里是直接引用了xml字符串
  export default defineComponent({
    components: {},
    setup() {
      // as ComponetInternalInstance表示类型断言，ts时使用。否则报错，proxy为null
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
        // 获取到属性ref为“canvas”的dom节点
        const canvas = _this.$refs.canvas
        // 建模
        _this.bpmnModeler = new BpmnModeler({
          container: canvas,
        })
        // _this.createNewDiagram()
      }
      const createNewDiagram = () => {
        // 将字符串转换成图显示出来
        _this.bpmnModeler.importXML(xmlStr, (err) => {
          if (err) {
            // console.error(err)
          } else {
            // 这里是成功之后的回调, 可以在这里做一系列事情
            // success()
          }
        })
      }
      const success = () => {
        // console.log('创建成功!')
      }
      onMounted(() => {
        _this.init()
      })
      return {
        init,
        createNewDiagram,
        success,
      }
    },
  })
</script>

<style scoped>
  .containers {
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
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
