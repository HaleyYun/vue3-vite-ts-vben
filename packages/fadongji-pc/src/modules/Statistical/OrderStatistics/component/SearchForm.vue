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
  import { defineEmits,defineExpose } from 'vue'
  import { filterFormSchemas } from '../data/configuration'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const emiter = defineEmits(['rest', 'submit'])

  const [registerDefaultConfig, { getFieldsValue,setFieldsValue }] = createFormRegisterInstance({
    schemas: filterFormSchemas,
    labelWidth: 130, // 设置form label
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    fieldMapToTime: [['searchTime', ['orderStartTime', 'orderEndTime'], 'YYYY-MM-DD']], // 用于将表单内时间区域的应设成 2 个字段
  })

  const handlerRest = () => {
    emiter('rest', getFieldsValue())
  }
  const handlerSubmit = (values) => {
    let data = values
    if (data.orderStartTime && data.orderEndTime) {
      data.orderStartTime = data.orderStartTime + ' 00:00:00'
      data.orderEndTime = data.orderEndTime + ' 23:59:59'
    }
    if (data.areaCodeSub && data.areaCodeSub.length > 0) {
      // 1：省，2：市，3：区
      data.level = data.areaCodeSub.length;
      data.areaCodeSub = data.areaCodeSub[data.areaCodeSub.length - 1]
    }
    emiter('submit', values)
  }
  defineExpose({setFieldsValue})

</script>

<style lang="scss"></style>
