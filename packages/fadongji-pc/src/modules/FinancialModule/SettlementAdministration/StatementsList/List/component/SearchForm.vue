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
  import {filterFormSchemas} from '../data/configuration'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const [registerDefaultConfig, { getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormSchemas,
      labelWidth: 130,
      baseColProps: { span: 8 },
      autoSubmitOnEnter: true,
      actionColOptions: { span: 8,offset:16 },
      fieldMapToTime: [
        ['searchTime', ['startCreateDate', 'endCreateDate'], 'YYYY-MM-DD'],
        ['settlementTime', ['startBillTime', 'endBillTime'], 'YYYY-MM-DD'],
          // settlementTime
      ]

    });

  const emiter = defineEmits(['rest', 'submit'])


  const handlerRest = () => {
    emiter('rest',  getFieldsValue())
  };
  const handlerSubmit = (values) => {
    let data = values;
    if(data.startCreateDate && data.endCreateDate ){
        data.startCreateDate =  data.startCreateDate+' 00:00:00';
        data.endCreateDate =  data.endCreateDate+' 23:59:59';
    }
    if(data.startBillTime && data.endBillTime ){
      data.startBillTime =  data.startBillTime+' 00:00:00';
      data.endBillTime =  data.endBillTime+' 23:59:59';
    }
    emiter('submit',  values)
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
