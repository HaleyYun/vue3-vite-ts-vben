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
  import { defineEmits, watch } from 'vue'
  import { saleFormSchemas } from '../data/configuration'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const props = defineProps({
    status: {
      type: [String, Number],
      default: '',
    },
  })

  const emiter = defineEmits(['rest', 'submit'])

  const [registerDefaultConfig, { getFieldsValue, updateSchema }] = createFormRegisterInstance({
    schemas: saleFormSchemas,
    labelWidth: 130, // 设置form label
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    autoSubmitOnEnter: true,
    fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']], // 用于将表单内时间区域的应设成 2 个字段
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
  watch(
    () => props.status,
    (val) => {
      switch (val) {
        case 0:
          updateSchema({
            field: 'searchTime',
            label: '更新时间',
          })
          break
        case 1:
          updateSchema({
            field: 'searchTime',
            label: '提交时间',
          })
          break
        case 2:
          updateSchema({
            field: 'searchTime',
            label: '审核时间',
          })
          break

        case 3:
          updateSchema({
            field: 'searchTime',
            label: '上架时间',
          })
          break

        case 4:
          updateSchema({
            field: 'searchTime',
            label: '下架时间',
          })
          break
      }
    },
  )
</script>

<style lang="scss"></style>
