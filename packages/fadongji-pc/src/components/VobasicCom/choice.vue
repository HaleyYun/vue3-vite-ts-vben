<template>
  <Select
    v-model:value="value"
    showSearch
    placeholder="选择水果"
    style="width: 200px"
    :options="options"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
  />
</template>
<script lang="ts">
  import { SelectTypes } from 'ant-design-vue/es/select'
  import { defineComponent, ref } from 'vue'
  import { Select } from 'ant-design-vue'
  export default defineComponent({
    components: { Select },
    setup() {
      const options = ref<SelectTypes['options']>([
        { value: '苹果', label: '苹果' },
        { value: '菠萝', label: '菠萝' },
        { value: '橘子', label: '橘子' },
      ])
      const handleChange = (value: string) => {
        console.log(`selected ${value}`)
      }
      const handleBlur = () => {
        console.log('blur')
      }
      const handleFocus = () => {
        console.log('focus')
      }
      const filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      return {
        value: ref<string | undefined>(undefined),
        filterOption,
        handleBlur,
        handleFocus,
        handleChange,
        options,
      }
    },
  })
</script>
