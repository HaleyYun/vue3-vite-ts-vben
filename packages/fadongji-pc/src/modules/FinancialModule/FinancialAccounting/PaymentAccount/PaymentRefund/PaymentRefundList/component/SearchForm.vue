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
  import { BasicForm } from '/@/components/Form/index'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const [registerDefaultConfig, { getFieldsValue }] = createFormRegisterInstance({
    schemas: filterFormSchemas,
    labelWidth: 130,
    baseColProps: { span: 8 },
    actionColOptions: { span: 8 },
    fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    autoSubmitOnEnter: true,
  })

  const emiter = defineEmits(['rest', 'submit'])

  const handlerRest = () => {
    emiter('rest', getFieldsValue())
  }
  const handlerSubmit = (values) => {
    let data = values
    if (data.startTime && data.endTime) {
      data.startTime = data.startTime + ' 00:00:00'
      data.endTime = data.endTime + ' 23:59:59'
    }
    emiter('submit', values)
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
