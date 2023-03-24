<template>
  <div id="components-slider-demo-mark">
    <!-- <h4>included=true</h4> -->
    <Slider :marks="marks" v-model:value="value1" />
    <Slider range :marks="marks" v-model:value="value2" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, createVNode, ref } from 'vue'
  import { Slider } from 'ant-design-vue'
  export default defineComponent({
    components: {
      Slider,
    },
    setup() {
      const value1 = ref<number>(37)
      const value2 = ref<number[]>([26, 37])
      const value3 = ref<number>(37)
      const marks = ref<Record<number, any>>({
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50',
          },
          label: createVNode('strong', {}, '100°C'),
        },
      })

      return {
        value1,
        value2,
        value3,
        marks,
      }
    },
  })
</script>
<style scoped>
  #components-slider-demo-mark h4 {
    margin: 0 0 16px;
  }

  #components-slider-demo-mark .ant-slider-with-marks {
    margin-bottom: 44px;
  }
</style>
