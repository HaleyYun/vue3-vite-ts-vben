<template>
  <Cascader v-model:value="value" :options="options" placeholder="输入内容" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Cascader } from 'ant-design-vue'
  interface Option {
    value: string
    label: string
    children?: Option[]
  }
  const options: Option[] = [
    {
      value: '河南',
      label: '河南',
      children: [
        {
          value: '郑州',
          label: '郑州',
          children: [
            {
              value: '郑东新区',
              label: '郑东新区',
            },
          ],
        },
      ],
    },
    {
      value: '江苏',
      label: '江苏',
      children: [
        {
          value: '南京',
          label: '南京',
          children: [
            {
              value: '中华门',
              label: '中华门',
            },
          ],
        },
      ],
    },
  ]
  export default defineComponent({
    components: { Cascader },
    setup() {
      return {
        value: ref<string[]>([]),
        options,
      }
    },
  })
</script>
