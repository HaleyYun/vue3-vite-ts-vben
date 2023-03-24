<template>
  <BasicForm
    ref="opForm"
    @register="registerDefaultConfig"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import {  defineEmits, ref } from 'vue'
  import { filterAssociatedForm } from '/@/modules/CustomerModule/AgentPages/view/AssociatedWithGarage/data/configuration'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { sleep } from '/@/utils/dateUtil'

  let formRegister = ref();
  const emiter = defineEmits(['rest', 'submit'])
  const [registerDefaultConfig, {  getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterAssociatedForm,
      labelWidth: 120,
      baseColProps: { span: 8 },
      actionColOptions: { span: 8,offset:8 },
      fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss']],
    });

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
  };
  const handlerFilterSubmit = (values) => {
    console.log(values)
    emiter('submit', { values })
  };
</script>

<style lang="scss" scoped></style>
