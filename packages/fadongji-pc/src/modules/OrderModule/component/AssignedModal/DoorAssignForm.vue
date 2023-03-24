<template>
  <BasicForm
    ref="opForm"
    @register="registerDefaultConfig"
    @submit="handlerSubmit"
    @reset="handlerRest"
  >
    <template #searchTime="{ model, field }">
      <FormSelectTime  v-model:homeTime="model[field]" ></FormSelectTime>
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
  import { defineEmits,defineExpose } from 'vue'
  import { filterFormSchemas } from './data'
  import { BasicForm } from '/@/components/Form'
  import {VoUtils} from '@vocen/shared'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import FormSelectTime from '/@/modules/components/FormSelectTime.vue'

  const emiter = defineEmits(['rest', 'submit'])

  const [registerDefaultConfig, { getFieldsValue,setFieldsValue }] = createFormRegisterInstance({
    schemas: filterFormSchemas,
    labelWidth: 100, // 设置form label
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    //fieldMapToTime: [['searchTime', ['homeStartTime', 'homeEndTime'], 'YYYY-MM-DD HH:mm:ss']], // 用于将表单内时间区域的应设成 2 个字段
  })
  const setFormValue = (homeStartTime,homeEndTime)=>{
    setFieldsValue({
      searchTime:[homeStartTime,homeEndTime],
      homeStartTime:homeStartTime,
      homeEndTime:homeEndTime
    })
  }

  const handlerRest = () => {
    console.log(getFieldsValue())
    emiter('rest', { values: getFieldsValue() })
  }
  const handlerSubmit = (values) => {
    let data = values
    // 这个时间选择和其他时间选择不一样，不要改
    console.log(data)
    if (data.searchTime &&data.searchTime[0] &&data.searchTime[1]) {
      if(data.searchTime[0].$d && data.searchTime[1].$d){
        data.homeStartTime = VoUtils.timeFormat(data.searchTime[0].$d, 'yyyy-mm-dd hh:MM:ss')
        data.homeEndTime = VoUtils.timeFormat(data.searchTime[1].$d, 'yyyy-mm-dd hh:MM:ss')
      }else {
        data.homeStartTime = data.searchTime[0]
        data.homeEndTime = data.searchTime[1]
      }
    }
    data.searchTime = undefined;

    emiter('submit', values)
  }
  defineExpose({setFormValue})
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
