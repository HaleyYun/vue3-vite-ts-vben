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
  import { defineEmits, ref,defineExpose } from 'vue'
  import {filterFormSchemas} from '../data/configuration.ts'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const [registerDefaultConfig, { getFieldsValue,resetFields }] =
    createFormRegisterInstance({
      schemas: filterFormSchemas,
      labelWidth: 40,
      baseColProps: { span: 8 },
      actionColOptions: { span: 8,offset:8},
      fieldMapToTime: [
        ['searchTime', ['createStartTime', 'createEndTime'], 'YYYY-MM-DD'],
      ]
    });


  const emiter = defineEmits(['rest', 'submit']);




  const handlerRest = () => {
    emiter('rest', getFieldsValue())
  };
  const handlerSubmit = (values) => {
    let data = values;
    console.log(data)
    if(data.createStartTime && data.createEndTime ){
        data.createStartTime =  data.createStartTime+' 00:00:00';
        data.createEndTime =  data.createEndTime+' 23:59:59';
    }
    emiter('submit', values)
  };
  defineExpose({resetFields})

</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
