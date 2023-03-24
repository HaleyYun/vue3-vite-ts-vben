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
  import {
    filterFormSchemasByAwait,
    hasNoneData,
    accessGoneData,
  } from '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/data/BrandContainerData'
  //  '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/data/BrandContainerData'
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
      baseColProps:{span:8},
      autoSubmitOnEnter: true,
      actionColOptions:{span:8},
      fieldMapToTime: [
        ['searchTime', ['createStartTime', 'createEndTime'], 'YYYY-MM-DD'],
      ],
    });
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
      const fullFiledList: FormSchema[] = [...hasNoneData, ...accessGoneData]
      fullFiledList.forEach((schema) => {
        removeSchemaByFiled(schema.field)
      })
      if (nval === 'one') {
        // schemas = [...filterFormSchemasByAwait]
      }
      if (nval === 'two') {
        hasNoneData.forEach((schema) => {
          appendSchemaByField(schema, 'phone')
        })
      }
      if (nval === 'three') {
        accessGoneData.forEach((schema) => {
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
    console.log(values)
    let data = values
    if (data.createStartTime && data.createEndTime) {
      data.createStartTime = data.createStartTime + ' 00:00:00'
      data.createEndTime = data.createEndTime + ' 23:59:59'
    }
    emiter('submit', { values })
  }
</script>

<style lang="scss" scoped></style>
