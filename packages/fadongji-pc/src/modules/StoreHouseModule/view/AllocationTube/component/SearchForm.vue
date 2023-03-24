<template>
  <BasicForm
    ref="opForm"
    @register="registerDefaultConfig"
    @submit="handlerSubmit"
    @reset="handlerRest"
  >
  </BasicForm>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'
  import { filterFormSchemas } from '../data/configuration'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const [registerDefaultConfig, { getFieldsValue}] = createFormRegisterInstance({
    schemas: filterFormSchemas,
    labelWidth: 100,
    baseColProps: { span: 8 },
    actionColOptions: { span: 8, offset: 16 },
    fieldMapToTime: [['searchTime', ['startApplyTime', 'endApplyTime'], 'YYYY-MM-DD HH:mm:ss']],
    autoSubmitOnEnter: true,
  })

  const emiter = defineEmits(['rest', 'submit'])

  const handlerRest = () => {
    emiter('rest', getFieldsValue())
  }
  const handlerSubmit = (values) => {
    let data = values
    if (data.searchTime) {
      data.startApplyTime = data.startApplyTime + ' 00:00:00'
      data.endApplyTime = data.endApplyTime + ' 00:00:00'
    }
    emiter('submit', data)
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
