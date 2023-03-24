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
  import { defineEmits, ref,defineProps,watch,nextTick } from 'vue'
  import {filterFormSchemas} from '../data/configuration.ts'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  const props = defineProps({
    activeKey:{
      type:String,
      default:''
    }
  })

  const [registerDefaultConfig, { getFieldsValue,updateSchema,resetFields}] =
      createFormRegisterInstance({
        schemas: filterFormSchemas,
        labelWidth: 120,
        baseColProps: { span: 8 },
        autoSubmitOnEnter: true,
        actionColOptions: { span: 8,offset:16 },
        fieldMapToTime: [
          ['searchTime', ['startConfirmDate', 'endConfirmDate'], 'YYYY-MM-DD'],
        ]

      });

  const emiter = defineEmits(['rest', 'submit'])

  const handlerRest = () => {
    emiter('rest',  getFieldsValue())
  };
  const handlerSubmit = (values) => {
    let data = values;
    if(data.startConfirmDate && data.endConfirmDate ){
      data.startConfirmDate =  data.startConfirmDate+' 00:00:00';
      data.endConfirmDate =  data.endConfirmDate+' 23:59:59';
    }
    emiter('submit',  values)
  }
  watch(()=>props.activeKey, (val)=>{
    nextTick(()=>{
      if(val == 11 ||val == 13){
        updateSchema([
          { field: 'companyName', label:'卖家名称' },
          { field: 'searchTime', label:'确认收货日期'},
        ]);
      }else if(val == 12){
        updateSchema([
          { field: 'companyName', label:'卖家名称' },
          { field: 'searchTime', label:'下单日期'},
        ]);
      }else {
        updateSchema([
          { field: 'companyName', label:'集师傅' },
          { field: 'searchTime', label:'下单日期'},
        ]);
      }
      resetFields()

    })


  },{immediate:true})
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
