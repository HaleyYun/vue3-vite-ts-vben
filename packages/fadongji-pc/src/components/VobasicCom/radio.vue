<template>
  <RadioGroup name="radioGroup" v-model:value="value">
    <Radio value="1">A</Radio>
    <Radio value="2">B</Radio>
    <Radio value="3">C</Radio>
    <Radio value="4">D</Radio>
  </RadioGroup>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Radio } from 'ant-design-vue'
  export default defineComponent({
    components: {
      RadioGroup: Radio.Group,
      Radio,
    },
    setup() {
      const value = ref<string>('1')
      return {
        value,
      }
    },
  })
</script>
