<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'

  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'

  import { sleep } from '/@/utils/dateUtil'
  import { filterFormConfig } from '/@/modules/ContentModule/view/CircleManage/AnswerManage/data/AnswerListContainerData'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [
    registerDefaultConfig,
    { appendSchemaByField, removeSchemaByFiled, getFieldsValue, updateSchema },
  ] = createFormRegisterInstance({
    fieldMapToTime: [
      // data为时间组件在表单内的字段，startTime，endTime为转化后的开始时间于结束时间
      // 'YYYY-MM-DD'为时间格式，参考moment
      ['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
    ],
    schemas: filterFormConfig.baseColumns,
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    labelWidth: 120,
    actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    autoSubmitOnEnter: true,
  })
  formRegister.value = registerDefaultConfig
  // const currentTabIndex = props.currentTabInde
  watch(
    () => props.currentTabIndex,
    async (nval) => {
      showFilterForm.value = false
      await nextTick().then(() => {})
      sleep(10)
      showFilterForm.value = true
      await nextTick().then(() => {})
      console.log(`currentTabIndex is value change ${nval}`)
      // let schemas: FormSchema[] = []
      const fullFiledList: FormSchema[] = [
        ...filterFormConfig.accessColumns,
        ...filterFormConfig.rejectColumns,
      ]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (nval === 'one') {
      }
      if (nval === 'two') {
        filterFormConfig.accessColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
      if (nval === 'three') {
        filterFormConfig.rejectColumns.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
    },
    {
      immediate: true,
    },
  )

  const emiter = defineEmits(['rest', 'submit'])

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
  }
  const handlerFilterSubmit = (values) => {
    const obj = Object.assign({}, values)
    obj.source ? (obj.source = 'PC') : delete obj.source
    obj.isRecommend ? (obj.isRecommend = 1) : delete obj.isRecommend
    obj.isDeleted ? (obj.isDeleted = 1) : delete obj.isDeleted
    emiter('submit', { values: obj })
  }
</script>

<style lang="scss" scoped></style>
