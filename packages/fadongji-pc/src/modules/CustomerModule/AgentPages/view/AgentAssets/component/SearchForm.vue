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
  import { defineEmits, ref } from 'vue'
  import {filterFormSchemas} from '../data/configuration.ts'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const [registerDefaultConfig, { getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormSchemas,
      labelWidth: 130,
      baseColProps: { span: 8 },
      actionColOptions: { span: 8,offset:16},
      fieldMapToTime: [
        ['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
      ]

    });

  const emiter = defineEmits(['rest', 'submit'])


  const handlerRest = () => {
    emiter('rest',  getFieldsValue())
  };
  const handlerSubmit = (values) => {
    let data = values;
    emiter('submit', data)
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
