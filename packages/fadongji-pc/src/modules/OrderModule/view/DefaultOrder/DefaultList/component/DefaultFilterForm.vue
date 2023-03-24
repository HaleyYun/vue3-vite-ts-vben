<template>
  <BasicForm
    ref="opForm"
    @register="registerDefaultConfig"
    @submit="handlerSubmit"
    @reset="handlerRest"
  >
    <template #DayInput="{ model, field }">
      <a-form-item style="margin-bottom: 0">
        <ARow getter="10">
          <ACol :span="11">
            <AInput class="!w-full" placeholder="逾期天数" v-model:value="startExpect" />
          </ACol>
          <ACol :span="2" class="text-center">~</ACol>
          <ACol :span="11">
            <AInput class="!w-full" placeholder="逾期天数" v-model:value="endExpect" />
          </ACol>
        </ARow>
      </a-form-item>
    </template>
  </BasicForm>
</template>

<script setup lang="ts">
  import { defineEmits, ref } from 'vue'
  import { assignFormSchemas } from '../data/DefaultContainerData'
  import { BasicForm } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  const emiter = defineEmits(['rest', 'submit'])
  const [registerDefaultConfig, { getFieldsValue }] = createFormRegisterInstance({
    schemas: assignFormSchemas,
    labelWidth: 130, // 设置form label
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    fieldMapToTime: [['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD']], // 用于将表单内时间区域的应设成 2 个字段
    autoSubmitOnEnter: true,
  })
  const startExpect = ref<any>('')
  const endExpect = ref<any>('')
  const handlerRest = () => {
    emiter('rest', { values: getFieldsValue() })
    startExpect.value = ''
    endExpect.value = ''
  }
  const handlerSubmit = (values) => {
    let data = values
    if (data.startTime && data.endTime) {
      data.startTime = data.startTime + ' 00:00:00'
      data.endTime = data.endTime + ' 23:59:59'
    }
    data.daysStartOverdue = startExpect.value
    data.daysEndOverdue = endExpect.value
    emiter('submit', values)
  }
</script>

<style lang="scss">
  ::v-deep(.ant-form-item):nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>
