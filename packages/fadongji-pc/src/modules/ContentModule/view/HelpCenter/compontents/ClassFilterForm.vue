+<template>
  <BasicForm
    ref="opForm"
    @register="formRegister"
    @submit="handlerFilterSubmit"
    @reset="handlerFilterRest"
  />
</template>

<script setup lang="ts">
  import { watch, defineProps, defineEmits, ref, nextTick } from 'vue'
  import { filterFormSchemasByAwait } from '/@/modules/ContentModule/view/HelpCenter/data/HelpFiterColumns'
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
  const [registerDefaultConfig, { appendSchemaByField, removeSchemaByFiled, getFieldsValue }] =
    createFormRegisterInstance({
      schemas: filterFormSchemasByAwait,
      labelWidth: 120,
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
        // removeSchemaByFiled('[startTime, endTime]')
      }
      if (nval === 'three') {
        // accessGoneData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        // removeSchemaByFiled('[startTime, endTime]')
      }
      if (nval === 'four') {
        // hasViolationData.forEach((schema) => {
        //   appendSchemaByField(schema, 'phone')
        // })
        // removeSchemaByFiled('[startTime, endTime]')
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
    console.log(values)
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
