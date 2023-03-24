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
  import { filterFormConfig } from '/@/modules/ContentModule/view/CircleManage/ProblemManage/data/ProblemListContainerData'

  const props = defineProps({
    currentTabIndex: {
      type: String,
      default: '',
    },
  })

  let showFilterForm = ref(false)
  let formRegister = ref()
  const [registerDefaultConfig, { appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormConfig.baseColumns,
      labelWidth: 120,
      actionColOptions: { span: 8, offset: 16 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
      baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
      autoSubmitOnEnter: true,
    })
  formRegister.value = registerDefaultConfig
  // const currentTabIndex = props.currentTabIndex
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
        // schemas = [...filterFormSchemasByAwait]
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
    // if (values.source) {
    //   values.source = 'PC'
    // }else{
    //   values.source = ''
    // }
    // if (values.isRecommend) {
    //   values.isRecommend = 1
    // }else{
    //   values.isRecommend = ''
    // }
    // if (values.isDeleted) {
    //   values.isDeleted = 1
    // }else{
    //   values.isDeleted = ''
    // }
    // emiter('submit', { values })
    const obj = Object.assign({}, values)
    obj.source ? (obj.source = 'PC') : delete obj.source
    obj.isRecommend ? (obj.isRecommend = 1) : delete obj.isRecommend
    obj.isDeleted ? (obj.isDeleted = 1) : delete obj.isDeleted
    emiter('submit', { values: obj })
  }
</script>

<style lang="scss" scoped></style>
