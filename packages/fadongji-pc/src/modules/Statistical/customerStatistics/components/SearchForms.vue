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
  import { defineEmits, ref,defineProps,watch,nextTick,defineExpose } from 'vue'
  import {filterFormSchemas} from '../data/configuration.ts'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  const props = defineProps({
    activeKey:{
      type:String,
      default:''
    }
  })

  const [registerDefaultConfig, { getFieldsValue,setFieldsValue}] =
      createFormRegisterInstance({
        schemas: filterFormSchemas,
        labelWidth: 120,
        baseColProps: { span: 8 },
        actionColOptions: { span: 8,offset:16 },
        fieldMapToTime: [
          ['searchTime', ['orderStartTime', 'orderEndTime'], 'YYYY-MM-DD'],
        ]

      });

  const emiter = defineEmits(['rest', 'submit'])

  const handlerRest = () => {
    emiter('rest',  getFieldsValue())
  };
  const handlerSubmit = (values) => {
    let data = values;
    if(data.orderStartTime && data.orderEndTime ){
      data.orderStartTime =  data.orderStartTime+' 00:00:00';
      data.orderEndTime =  data.orderEndTime+' 23:59:59';
    }
    if (data.areaCodeSub && data.areaCodeSub.length > 0) {
      // 1：省，2：市，3：区
      data.level = data.areaCodeSub.length;
      data.areaCodeSub = data.areaCodeSub[data.areaCodeSub.length - 1]
    }
    emiter('submit',  values)
  }
  defineExpose({setFieldsValue})



</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
