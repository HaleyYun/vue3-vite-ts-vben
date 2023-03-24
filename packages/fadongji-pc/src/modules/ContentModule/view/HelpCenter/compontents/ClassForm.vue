<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import { defineEmits, ref, nextTick } from 'vue'
  import { filterFormSchemasByAwait } from '/@/modules/ContentModule/view/HelpCenter/data/ClassColumns'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  let formRegister = ref()
  const [registerDefaultConfig, { getFieldsValue }] = createFormRegisterInstance({
    schemas: filterFormSchemasByAwait,
    labelWidth: 130,
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
  })
  formRegister.value = registerDefaultConfig

  const emiter = defineEmits(['rest', 'submit'])

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
  }
  const handlerFilterSubmit = (values) => {
    console.log(values)
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
