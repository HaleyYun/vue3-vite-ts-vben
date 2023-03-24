<template>
    <div class="Base-Form">
      <BasicForm
        ref="opForm"
        @register="registerDefaultConfig"
        @submit="handlerSubmit"
        @reset="handlerRest"
      />
    </div>
  </template>
  
  <script setup lang="ts">
    import { defineEmits } from 'vue'
    import { filterFormSchemas } from '../data/configuration'
    import { BasicForm } from '/@/components/Form'
    import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  
    const emiter = defineEmits(['rest', 'submit'])
  
    const [registerDefaultConfig, { getFieldsValue }] = createFormRegisterInstance({
      schemas: filterFormSchemas,
      labelWidth: 130, // 设置form label
      baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      actionColOptions: { span: 24 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
      fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']], // 用于将表单内时间区域的应设成 2 个字段
      autoSubmitOnEnter: true,
    })
  
    const handlerRest = () => {
      emiter('rest', getFieldsValue())
    }
    const handlerSubmit = (values) => {
      let data = values
      if (data.startTime && data.endTime) {
        data.startTime = data.startTime + ' 00:00:00'
        data.endTime = data.endTime + ' 23:59:59'
      }
      if (data.areaCode && data.areaCode.length > 0) {
        data.areaCode = data.areaCode[data.areaCode.length - 1]
      }
      emiter('submit', values)
    }
  </script>
  
  <style lang="scss"></style>
  