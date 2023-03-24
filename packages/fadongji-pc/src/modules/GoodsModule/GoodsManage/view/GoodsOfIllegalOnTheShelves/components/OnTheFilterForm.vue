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
  import { filterFormSchemasByAwait } from '/@/modules/GoodsModule/GoodsManage/view/GoodsOfIllegalOnTheShelves/data/OnTheFiterColumns'
  import { BasicForm, FormSchema } from '/@/components/Form'
  import { createFormRegisterInstance } from '/@/components/Form/src/helper'
  import { sleep } from '/@/utils/dateUtil'

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
    schemas: filterFormSchemasByAwait,
    labelWidth: 120,
    baseColProps: { span: 8 }, // 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
    actionColOptions: { span: 8, offset: 8 }, // 操作按钮外层 Col 组件配置，offset 偏移多少
    fieldMapToTime: [
        ['searchTime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
      ],
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
      const fullFiledList: FormSchema[] = []
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (nval === 'one') {
        // schemas = [...filterFormSchemasByAwait]
        // lastGoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
      }
      if (nval === 'two') {
        // hasNoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        removeSchemaByFiled('[startTime, endTime]')
      }
      if (nval === 'three') {
        // accessGoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        removeSchemaByFiled('[startTime, endTime]')
      }
      if (nval === 'four') {
        // hasViolationData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        removeSchemaByFiled('[startTime, endTime]')
      }
    },
    {
      immediate: true,
    },
  )

  const emiter = defineEmits(['rest', 'submit'])

  const handlerFilterRest = () => {
    emiter('rest', { values: getFieldsValue() })
    updateSchema({
      field: 'categoryType',
      componentProps: {
        options: [],
      },
    })
  }
  const handlerFilterSubmit = (values) => {
    console.log(values)
    let data = values
    if (data.startTime && data.endTime) {
      data.startTime = data.startTime + ' 00:00:00'
      data.endTime = data.endTime + ' 23:59:59'
    }
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
