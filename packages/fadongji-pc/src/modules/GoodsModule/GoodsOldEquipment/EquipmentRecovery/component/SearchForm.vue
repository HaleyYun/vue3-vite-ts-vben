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
  import { defineEmits, onMounted, watch } from 'vue'
  import { filterFormSchemas } from '../data/configuration'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const emiter = defineEmits(['rest', 'submit'])
  const props = defineProps({
    activeKey: {
      type: [Number, String],
      default: '',
    },
  })

  const [registerDefaultConfig, { getFieldsValue, updateSchema }] = createFormRegisterInstance({
    schemas: filterFormSchemas,
    labelWidth: 130, // 设置form label
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8 }, // 操作按钮外层 Col 组件配置，offset 偏移多少 YYYY-MM-DD HH:mm:ss
    fieldMapToTime: [
      ['searchTimeOne', ['operateStartTime', 'operateEndTime'], 'YYYY-MM-DD'],
      ['searchTimeTwo', ['updateStartTime', 'updateEndTime'], 'YYYY-MM-DD'],
    ], // 用于将表单内时间区域的应设成 2 个字段
    autoSubmitOnEnter: true,
  })

  const handlerRest = () => {
    emiter('rest', getFieldsValue())
  }
  const handlerSubmit = (values) => {
    let data = values
    if (data.operateStartTime && data.operateEndTime) {
      data.operateStartTime = data.operateStartTime + ' 00:00:00'
      data.operateEndTime = data.operateEndTime + ' 23:59:59'
    }
    if (data.updateStartTime && data.updateEndTime) {
      data.updateStartTime = data.updateStartTime + ' 00:00:00'
      data.updateEndTime = data.updateEndTime + ' 23:59:59'
    }
    if (data.areaCode && data.areaCode.length > 0) {
      data.areaCode = data.areaCode[data.areaCode.length - 1]
    }
    emiter('submit', values)
  }

  const updateHandler = () => {
    if (props.activeKey === 'one') {
      updateSchema({
        field: 'searchTimeOne',
        ifShow: false,
      })
      updateSchema({
        field: 'searchTimeTwo',
        ifShow: true,
        label: '最后更新时间',
      })
    }
    if (props.activeKey === 'two') {
      updateSchema({
        field: 'searchTimeOne',
        ifShow: true,
        label: '启动回收时间',
      })
      updateSchema({
        field: 'searchTimeTwo',
        ifShow: false,
      })
    }
    if (props.activeKey === 'three') {
      updateSchema({
        field: 'searchTimeOne',
        label: '暂停回收时间',
        ifShow: true,
      })
      updateSchema({
        field: 'searchTimeTwo',
        ifShow: false,
      })
    }
  }

  onMountedOrActivated(() => {
    updateHandler()
  })

  watch(
    () => props.activeKey,
    () => {
      updateHandler()
    },
  )
</script>

<style lang="scss"></style>
